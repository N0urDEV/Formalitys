export interface Associate {
  nom: string;
  prenom: string;
  typePiece: string;
  numero: string;
  genre: string;
  nationalite: string;
  adresse: string;
  telephone: string;
  email: string;
  isGerant: boolean;
}

export interface CompanyData {
  companyName: string;
  activities: string[];
  proposedNames: string[];
  headquarters: string;
  capital: number;
  selectedBank: string;
  // Share distribution per associate (percentage of share capital)
  shares?: number[];
  // Additional company information
  formeJuridique: string;
  nationalite: string;
  adresseSiege: string;
  villeSiege: string;
  professionActivite: string;
  telephone: string;
  fax: string;
  email: string;
  numeroArticleTaxeProfessionnelle: string;
  numeroArticleTaxeServicesCommunaux: string;
  numeroAffiliationCNSS: string;
  numeroRegistreCommerce: string;
  villeRegistreCommerce: string;
  referenceDepotDeclaration: string;
  dateDepotDeclaration: string;
  autresActivite: string;
  chiffreAffairesMensuelHt?: number;
  embauchePrevue?: boolean;
  nbSalaries?: number;
}

export interface UploadedFiles {
  [key: string]: File[];
}

export interface FormErrors {
  [key: string]: string;
}

export interface StepErrors {
  [key: number]: string[];
}

export interface CompanyDossier {
  id: number;
  userId: number;
  status: string;
  currentStep: number;
  associates?: Associate[];
  companyName?: string;
  activities?: string[];
  proposedNames?: string[];
  headquarters?: string;
  capital?: number;
  selectedBank?: string;
  shares?: number[];
  // Additional company information
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
  autresActivite?: string;
  chiffreAffairesMensuelHt?: number;
  embauchePrevue?: boolean;
  nbSalaries?: number;
  uploadedFiles?: any[];
  paymentIntentId?: string;
  paymentStatus?: string;
  amountPaid?: number;
  createdAt: string;
  updatedAt: string;
}
