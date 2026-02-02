import { z } from "zod"

const eventBaseSchema = {
  title: z.string().min(1, "Event title is required"),

  description: z.string().optional(),
  images: z.array(z.string().url()).default([]),

  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional(),

  // hybrid location fields
  placeId: z
    .string()
    .regex(/^[a-fA-F0-9]{24}$/, "Invalid ObjectId")
    .nullable()
    .optional(),
  venue: z.string().optional(),

  price: z.string().optional(),

  url: z.string().url().optional(),

  source: z.any().optional()
}

export const eventSystemCreateSchema = z
  .object({
    ...eventBaseSchema,
    approved: z.boolean().optional()
  })
  .superRefine((data, ctx) => {
    if (!data.source) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Source info is required",
        path: ["source"],
      })
    }

    if (data.endDate && data.endDate < data.startDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "End date must be after start date",
        path: ["endDate"],
      })
    }
  })