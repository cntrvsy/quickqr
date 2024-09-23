import { z } from 'zod';

// form schema
export const urlSchema = z.object({
    url: z.string().url({ message: 'Invalid URL' }),
})

export type UrlSchema = typeof urlSchema