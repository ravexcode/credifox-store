import type { NextRequest } from "next/server";

import { catchError } from "@/utils/catch-error";

import Response from "@/utils/responses";

import {
  getStoragedById,
  updateStoraged,
  deleteStoraged
} from "@/code/modules/api/storaged.module";

type Params = { params: Promise<{ id: string }> }

export async function GET(
  req: NextRequest,
  { params } : Params
){
  try {
    const { id } = await params;

    return await getStoragedById({ id });

  } catch (e) {
    return catchError(e);
  }
}

export async function PUT(
  req: NextRequest,
  { params } : Params
){
  try {
    const { id } = await params;

    if(!id) {
      return new Response().badRequest();
    }

    return await updateStoraged({ req, id });
  } catch (e) {
    return catchError(e);
  }
}

export async function DELETE(
  req: NextRequest,
  { params } : Params
){
  try {
    const { id } = await params;

    if(!id) {
      return new Response().badRequest();
    }

    return await deleteStoraged({ id });
  } catch (e) {
    return catchError(e);
  }
}
