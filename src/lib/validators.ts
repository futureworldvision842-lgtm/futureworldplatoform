import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const proposalSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  level: z.enum(["SOCIETY", "CITY", "COUNTRY", "GLOBAL"]),
  endDate: z.string(),
  societyId: z.string().optional(),
  cityId: z.string().optional(),
  countryId: z.string().optional(),
});

export const voteSchema = z.object({
  proposalId: z.string(),
  choice: z.enum(["YES", "NO", "ABSTAIN"]),
});

export const transactionSchema = z.object({
  toUserId: z.string(),
  amount: z.number().positive("Amount must be positive"),
  type: z.enum(["TRANSFER", "DONATION", "PAYMENT", "TAX", "REFUND", "SALARY"]),
  description: z.string().optional(),
});

export const postSchema = z.object({
  content: z.string().min(1, "Content is required"),
  type: z.enum(["DISCUSSION", "ANNOUNCEMENT", "ISSUE", "IDEA", "EVENT"]),
  societyId: z.string().optional(),
});

export const societySchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  type: z.enum(["MOSQUE", "CHURCH", "TEMPLE", "COMMUNITY", "OTHER"]),
  description: z.string(),
  address: z.string(),
  cityName: z.string(),
  countryName: z.string(),
});

export const businessSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string(),
  category: z.string(),
});

export const serviceSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string(),
  price: z.number().min(0),
  category: z.string(),
  location: z.string(),
});

export const donationCampaignSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  targetAmount: z.number().positive("Target amount must be positive"),
  level: z.enum(["SOCIETY", "CITY", "COUNTRY", "GLOBAL"]),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ProposalInput = z.infer<typeof proposalSchema>;
export type VoteInput = z.infer<typeof voteSchema>;
export type TransactionInput = z.infer<typeof transactionSchema>;
export type PostInput = z.infer<typeof postSchema>;
export type SocietyInput = z.infer<typeof societySchema>;
export type BusinessInput = z.infer<typeof businessSchema>;
export type ServiceInput = z.infer<typeof serviceSchema>;
