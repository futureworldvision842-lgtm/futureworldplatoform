// ============================================
// G.A.I.G.S. Platform Type Definitions
// ============================================

export type UserRole = 
  | "USER" 
  | "SOCIETY_ADMIN" 
  | "CITY_ADMIN" 
  | "COUNTRY_ADMIN" 
  | "GLOBAL_ADMIN" 
  | "SUPER_ADMIN";

export type SocietyType = "MOSQUE" | "CHURCH" | "TEMPLE" | "COMMUNITY" | "OTHER";

export type ProposalLevel = "SOCIETY" | "CITY" | "COUNTRY" | "GLOBAL";

export type ProposalStatus = "DRAFT" | "ACTIVE" | "CLOSED" | "APPROVED" | "REJECTED";

export type VoteChoice = "YES" | "NO" | "ABSTAIN";

export type TransactionType = "TRANSFER" | "DONATION" | "PAYMENT" | "TAX" | "REFUND" | "SALARY";

export type WalletType = "PERSONAL" | "BUSINESS" | "SOCIETY";

export type ServiceStatus = "ACTIVE" | "PAUSED" | "COMPLETED" | "CANCELLED";

export type NotificationType = 
  | "VOTE" 
  | "TRANSACTION" 
  | "ANNOUNCEMENT" 
  | "SYSTEM" 
  | "AI_INSIGHT"
  | "DONATION"
  | "SERVICE";

export type PostType = "DISCUSSION" | "ANNOUNCEMENT" | "ISSUE" | "IDEA" | "EVENT";

export type DonationCampaignStatus = "ACTIVE" | "COMPLETED" | "PAUSED" | "CANCELLED";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  phone?: string;
  skills: string[];
  role: UserRole;
  verified: boolean;
  walletBalance: number;
  societyId?: string;
  cityId?: string;
  countryId?: string;
  createdAt: string;
}

export interface Society {
  id: string;
  name: string;
  type: SocietyType;
  description: string;
  address: string;
  city: string;
  country: string;
  latitude?: number;
  longitude?: number;
  adminId: string;
  membersCount: number;
  fundsBalance: number;
  createdAt: string;
}

export interface Proposal {
  id: string;
  title: string;
  description: string;
  level: ProposalLevel;
  status: ProposalStatus;
  createdBy: string;
  societyId?: string;
  cityId?: string;
  countryId?: string;
  aiAnalysis?: string;
  yesVotes: number;
  noVotes: number;
  abstainVotes: number;
  totalVotes: number;
  startDate: string;
  endDate: string;
  createdAt: string;
}

export interface Vote {
  id: string;
  proposalId: string;
  odlId: string;
  choice: VoteChoice;
  blockchainHash: string;
  createdAt: string;
}

export interface Transaction {
  id: string;
  fromUserId: string;
  toUserId: string;
  amount: number;
  type: TransactionType;
  description: string;
  blockchainHash: string;
  verified: boolean;
  createdAt: string;
}

export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  currency: string;
  type: WalletType;
}

export interface Business {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  category: string;
  verified: boolean;
  rating: number;
  createdAt: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  providerId: string;
  businessId?: string;
  category: string;
  location: string;
  status: ServiceStatus;
}

export interface Post {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  societyId?: string;
  type: PostType;
  likes: number;
  commentsCount: number;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  link?: string;
  createdAt: string;
}

export interface DonationCampaign {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  raisedAmount: number;
  level: ProposalLevel;
  status: DonationCampaignStatus;
  createdBy: string;
  createdAt: string;
}

export interface DashboardStats {
  totalUsers: number;
  totalSocieties: number;
  totalVotesCast: number;
  totalFundsTracked: number;
  activeProposals: number;
  activeCampaigns: number;
}

export interface GovernanceLevel {
  level: ProposalLevel;
  name: string;
  icon: string;
  description: string;
  stats: {
    members: number;
    proposals: number;
    funds: number;
  };
}
