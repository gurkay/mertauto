import { store } from "@/app/lib/features/store";
import { isEmriDetayGetir, isEmriGetir } from "@/app/lib/features/isEmirleri/isEmirleriCreateAsyncThunk";

export async function getIsEmri(id: string) {

  if (!id) return null;
  const result = await store.dispatch(isEmriGetir(Number(id)));
  return result.payload;
}

export async function getIsEmriDetaylar(id: string) {
  if (!id) return [];
  const result = await store.dispatch(isEmriDetayGetir(Number(id)));
  return result.payload || [];
} 