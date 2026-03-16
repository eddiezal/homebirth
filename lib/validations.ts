import { z } from "zod";

export const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Please enter a valid email address");

export const nameSchema = z
  .string()
  .min(1, "Name is required")
  .max(100, "Name is too long");

export const phoneSchema = z
  .string()
  .min(1, "Phone is required")
  .max(20, "Phone number is too long");

export const zipSchema = z
  .string()
  .regex(/^\d{5}$/, "Please enter a valid 5-digit zip code");

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters");

export const consultRequestSchema = z.object({
  providerId: z.string().uuid(),
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  matchScore: z.number().int().min(0).max(100),
  matchReasons: z.array(z.string()),
  password: passwordSchema.optional(),
});

export const messageSchema = z.object({
  consultId: z.string().uuid(),
  sender: z.enum(["parent", "provider"]),
  content: z.string().min(1, "Message cannot be empty").max(5000),
});

export const providerResponseSchema = z.object({
  consultId: z.string().uuid(),
  message: z.string().max(5000),
  slots: z
    .array(
      z.object({
        id: z.string(),
        day: z.string(),
        time: z.string(),
        duration: z.string().optional(),
      })
    )
    .optional(),
});

export const waitlistSchema = z.object({
  email: emailSchema,
  zip: zipSchema,
  city: z.string().optional(),
  state: z.string().optional(),
});

export const providerProfileSchema = z.object({
  tagline: z.string().max(200).optional(),
  philosophy: z.string().max(2000).optional(),
  specialties: z.array(z.string()).optional(),
  values_tags: z.array(z.string()).optional(),
  birth_settings: z.array(z.string()).optional(),
  fee_min: z.number().min(0).optional(),
  fee_max: z.number().min(0).optional(),
  whats_included: z.array(z.string()).optional(),
  payment_options: z.array(z.string()).optional(),
  insurance_accepted: z.array(z.string()).optional(),
});
