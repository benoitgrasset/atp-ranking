import { signOut } from "@/lib/auth/auth";
import { auth } from "@/lib/auth/auth-helpers";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export async function AuthButton() {
  const user = await auth();

  if (!user) {
    return (
      <Link className={buttonVariants({ variant: "outline" })} href="/signin">
        Sign In
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>{user.name ?? user.email}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <form>
            <Button
              formAction={async () => {
                await signOut();
                revalidatePath("/");
              }}
            >
              Sign Out
            </Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
