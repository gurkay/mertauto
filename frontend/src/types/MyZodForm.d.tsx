import { z } from "zod";

// Form validation schema
export const isEmriSchema = z.object({
    id: z.string().optional(),
    isEmirNo: z.string().optional(),
    aracKm: z.number().optional(),
    arac_id: z.string().optional(),
    teknisyen_id: z.string().optional(),
    danisman_id: z.string().optional(),
    aracDurumu_id: z.string().optional(),
    yapilanIslem_id: z.string().optional(),
    iskonto: z.number().optional(),
    musteriTalep: z.string().optional(),
    servisIslemOnNotlari: z.string().optional(),
    servisIslemBitisNotlari: z.string().optional(),
    servisIslemGizliNotlari: z.string().optional(),
});

// Form validation schema for parts and labor
export const parcaIscilikSchema = z.object({
    yapilanIslemAdi: z.string().optional(),
    birimFiyati: z.number().optional(),
    birim: z.string().optional(),
    miktar: z.number().optional(),
});

export type IsEmriFormData = z.infer<typeof isEmriSchema>;
export type ParcaIscilikFormData = z.infer<typeof parcaIscilikSchema>;