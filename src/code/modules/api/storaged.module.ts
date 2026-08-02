import { NextRequest } from "next/server"

import { SessionCacheManager } from "@/code/services/session.service";

import Response from "@/utils/responses";

import {
  createStoragedService,
  getStoragedService,
  getStoragedByIdService,
  updateStoragedService,
  deleteStoragedService
} from "@services/api/storaged.service";

type CreateData = {
  req: NextRequest;
}

type GetByIdData = {
  id: string;
}

type UpdateData = {
  req: NextRequest;
  id: string;
}

type DeleteData = {
  id: string;
}

export async function createStoraged(data: CreateData) {
  const token = await SessionCacheManager.get();

  if(!token) return new Response().notProvided();

  return await createStoragedService({
    token,
    req: data.req
  });
}

export async function getStoraged() {
  return await getStoragedService();
}

export async function getStoragedById(data: GetByIdData) {
  return await getStoragedByIdService({
    id: data.id
  });
}

export async function updateStoraged(data: UpdateData) {
  const token = await SessionCacheManager.get();

  if(!token) return new Response().notProvided();

  return await updateStoragedService({
    token,
    req: data.req,
    id: data.id
  });
}

export async function deleteStoraged(data: DeleteData) {
  const token = await SessionCacheManager.get();

  if(!token) return new Response().notProvided();

  return await deleteStoragedService({
    token,
    id: data.id
  });
}
