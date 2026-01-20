// Types partagés pour l'application

import { 
  UserRole, 
  AccountStatus, 
  DeviceTechnology, 
  DeviceStatus,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
  DocumentType,
  DocumentAccessLevel,
  TicketStatus,
  TicketPriority,
  TicketCategory,
  TrainingStatus
} from "@prisma/client";

// Types utilisateur
export interface UserWithProfile {
  id: string;
  email: string;
  role: UserRole;
  status: AccountStatus;
  companyName: string | null;
  siret: string | null;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
}

// Types appareils
export interface DeviceWithDetails {
  id: string;
  name: string;
  slug: string;
  technology: DeviceTechnology;
  shortDescription: string;
  description: string;
  indications: string;
  benefits: string;
  expectedResults: string;
  specifications: string;
  certifications: string;
  imageUrl: string | null;
  galleryUrls: string;
  videoUrl: string | null;
  basePrice: number | null;
  status: DeviceStatus;
  featured: boolean;
}

// Types commandes
export interface OrderWithItems {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  orderDate: Date;
  items: Array<{
    device: {
      name: string;
      imageUrl: string | null;
    };
    quantity: number;
    unitPrice: number;
  }>;
}

// Types SAV
export interface SupportTicketWithMessages {
  id: string;
  ticketNumber: string;
  subject: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: Date;
  messages: Array<{
    content: string;
    authorName: string;
    createdAt: Date;
  }>;
}

// Types documents
export interface Document {
  id: string;
  title: string;
  type: DocumentType;
  fileUrl: string;
  uploadedAt: Date;
  accessLevel: DocumentAccessLevel;
}

// Navigation
export interface NavItem {
  title: string;
  href: string;
  description?: string;
}

// Form types
export interface ContactFormData {
  companyName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

export interface QuoteRequestData {
  deviceId?: string;
  companyName: string;
  email: string;
  phone: string;
  message?: string;
}