import { NextResponse } from "next/server";

export function catchError(e: unknown){
  if(e instanceof Error) {
    return NextResponse.json({
      message: e.message,
      error: e.cause
    }, {
      status: 500
    });
  }

  console.error(e);
  return NextResponse.json({
    message: "Server error",
    error: "Unexpected error"
  }, {
    status: 500
  });
}