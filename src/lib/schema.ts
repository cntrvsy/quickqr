import { z } from 'zod';

//types
export type DownloadFormat = "svg" | "png" | "jpg" | "jpeg" | "webp";
export type ErrorCorrectionLevel = "L" | "M" | "Q" | "H";


// form schema
export const urlSchema = z.object({
    url: z.string().min(3),
    downloadFormat: z.string().nonempty(),
    errorCorrectionLevel: z.string().nonempty(),
    logoSize: z.number().min(1).max(25),
})

export type UrlSchema = typeof urlSchema