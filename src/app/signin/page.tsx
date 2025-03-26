import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { providerMap, signIn } from "@/lib/auth/auth";
import { auth } from "@/lib/auth/auth-helpers";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export default async function SignInPage(props: {
  searchParams: Promise<{ callbackUrl: string | undefined }>;
}) {
  const user = await auth();

  if (user) {
    redirect("/");
  }

  return (
    <div className="mx-auto flex flex-col gap-4 max-w-3xl w-full min-h-full p-4">
      <form
        className="flex flex-col gap-4"
        action={async (formData) => {
          "use server";
          try {
            await signIn("resend", formData);
          } catch (error) {
            if (error instanceof AuthError) {
              console.error(error);
            }
            throw error;
          }
        }}
      >
        <label htmlFor="email">
          Email
          <Input name="email" id="email" />
        </label>
        <label htmlFor="password">
          Password
          <Input name="password" id="password" />
        </label>
        <div>
          <Button type="submit">
            <span>Sign in</span>
          </Button>
        </div>
      </form>
      {Object.values(providerMap).map((provider) => (
        <form
          key={provider.id}
          action={async () => {
            "use server";
            const searchParams = await props.searchParams;
            try {
              await signIn(provider.id, {
                redirectTo: searchParams?.callbackUrl ?? "",
              });
            } catch (error) {
              // Signin can fail for a number of reasons, such as the user
              // not existing, or the user not having the correct role.
              // In some cases, you may want to redirect to a custom error
              if (error instanceof AuthError) {
                console.error(error);
              }

              // Otherwise if a redirects happens Next.js can handle it
              // so you can just re-thrown the error and let Next.js handle it.
              // Docs:
              // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
              throw error;
            }
          }}
        >
          <Button type="submit">
            <span>Sign in with {provider.name}</span>
          </Button>
        </form>
      ))}
    </div>
  );
}
