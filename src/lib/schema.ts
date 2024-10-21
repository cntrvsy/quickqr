import { z } from 'zod';

// form schema
export const urlSchema = z.object({
    string: z.string().min(3)
})

export type UrlSchema = typeof urlSchema