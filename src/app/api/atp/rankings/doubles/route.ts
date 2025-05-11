import { LIMIT } from "@/shared";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const country = req.nextUrl.searchParams.get("country") || "all";
  const limit: number = Number(req.nextUrl.searchParams.get("limit")) || LIMIT;

  try {
    return NextResponse.json("doubles", { status: 200 });
  } catch (error) {
    console.error("❌ Error getting players from the DataBase ⛁", error);
    return NextResponse.json(
      {
        success: false,
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
