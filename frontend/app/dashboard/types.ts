export interface Dossier {
  id: number;
  status: string;
  currentStep: number;
  createdAt: string;
  amountPaid?: number;
  type: 'company' | 'tourism';
  
  // Company fields
  companyName?: string;
  headquarters?: string;
  capital?: number;
  selectedBank?: string;
  activities?: string[];
  proposedNames?: string[];
  associates?: any[];
  raisonSociale?: string;
  formeJuridique?: string;
  nationalite?: string;
  adresseSiege?: string;
  villeSiege?: string;
  professionActivite?: string;
  telephone?: string;
  fax?: string;
  email?: string;
  numeroArticleTaxeProfessionnelle?: string;
  numeroArticleTaxeServicesCommunaux?: string;
  numeroAffiliationCNSS?: string;
  numeroRegistreCommerce?: string;
  villeRegistreCommerce?: string;
  referenceDepotDeclaration?: string;
  dateDepotDeclaration?: string;
  
  // Tourism fields
  establishmentName?: string;
  establishmentType?: string;
  address?: string;
  city?: string;
  capacity?: number;
  ownerInfo?: any;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  priceNote?: string;
  features: string[];
  href: string;
  icon: React.ReactNode;
  gradient: string;
  buttonStyle: string;
  // Discount fields
  originalPrice?: string;
  discountPercentage?: number;
  discountAmount?: number;
  hasDiscount?: boolean;
}

export type ActiveTab = 'services' | 'dossiers';

export interface DashboardStats {
  totalDossiers: number;
  completedDossiers: number;
  inProgressDossiers: number;
}

export interface DiscountTier {
  tier: number;
  minDossiers: number;
  discountPercentage: number;
  description: string;
}

export interface DiscountCalculation {
  originalPrice: number;
  discountPercentage: number;
  discountAmount: number;
  finalPrice: number;
  reason: string;
  tier: number;
}

export interface UserDiscountStatus {
  completedDossiers: number;
  currentTier: DiscountTier;
  nextTier?: DiscountTier;
  dossiersToNextTier: number;
  availableDiscounts: {
    company: DiscountCalculation;
    tourism: DiscountCalculation;
  };
}
