type CreateData = {
  storaged: StoragedBasic;
  token: string;
}

type GetByIdData = {
  id: string;
}

type UpdateData = {
  id: string;
  storaged: Partial<StoragedBasic>;
  token: string;
}

type DeleteData = {
  id: string;
  token: string;
}

import { verifyAuth } from "@/code/repository/api/auth";
import { type StoragedBasic, createStoraged, getAllStoraged, getStoragedById, updateStoraged, deleteStoraged } from "@/code/repository/api/storaged";

export async function createStoragedController(data: CreateData): Promise<{
  message: string;
  storaged?: StoragedBasic;
  error?: string;
  status: number;
}> {
  const verify = await verifyAuth(data.token);

  if(verify.status >= 205) return verify;

  const storaged = await createStoraged(data.storaged);

  return {
    message: "Storaged created",
    storaged,
    status: 201
  }
}

export async function getStoragedController(): Promise<{
  message: string;
  storaged?: StoragedBasic[];
  error?: string;
  status: number;
}> {
  const storaged = await getAllStoraged();

  return {
    message: "Storaged retrieved",
    storaged,
    status: 200
  }
}

export async function getStoragedByIdController(data: GetByIdData): Promise<{
  message: string;
  storaged?: StoragedBasic | null;
  error?: string;
  status: number;
}> {
  const storaged = await getStoragedById(data.id);

  if(!storaged) {
    return {
      message: "Storaged not found",
      error: "Not found",
      status: 404
    }
  }

  return {
    message: "Storaged retrieved",
    storaged,
    status: 200
  }
}

export async function updateStoragedController(data: UpdateData): Promise<{
  message: string;
  storaged?: StoragedBasic;
  error?: string;
  status: number;
}> {
  const verify = await verifyAuth(data.token);

  if(verify.status >= 205) return verify;

  const storaged = await updateStoraged(data.id, data.storaged);

  return {
    message: "Storaged updated",
    storaged,
    status: 200
  }
}

export async function deleteStoragedController(data: DeleteData): Promise<{
  message: string;
  storaged?: StoragedBasic;
  error?: string;
  status: number;
}> {
  const verify = await verifyAuth(data.token);

  if(verify.status >= 205) return verify;

  const storaged = await deleteStoraged(data.id);

  return {
    message: "Storaged deleted",
    storaged,
    status: 200
  }
}
