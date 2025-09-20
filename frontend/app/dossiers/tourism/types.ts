export interface OwnerInfo {
  nom: string;
  prenom: string;
  typePiece: string;
  numero: string;
  telephone: string;
  email: string;
  adresse: string;
  qualite: string; // Investisseur ou représentant légal
  registreCommerce?: string; // Pour personne morale
}

export interface EstablishmentInfo {
  type: string; // Type d'établissement
  categorie: string; // Catégorie d'établissement
  enseigneCommerciale: string;
  dateOuverturePrevue: string;
  registreCommerce: string;
  ice: string;
  numeroCNSS: string;
  telephone: string;
  email: string;
  siteWeb?: string;
  region: string;
  province: string;
}

export interface UploadedFiles {
  cni: Array<{
    id: string;
    filename: string;
    originalName: string;
    documentType: string;
    size: number;
    mimetype: string;
    url: string;
    uploadedAt: string;
  }>;
  titreFoncier: Array<{
    id: string;
    filename: string;
    originalName: string;
    documentType: string;
    size: number;
    mimetype: string;
    url: string;
    uploadedAt: string;
  }>;
  permisHabiter: Array<{
    id: string;
    filename: string;
    originalName: string;
    documentType: string;
    size: number;
    mimetype: string;
    url: string;
    uploadedAt: string;
  }>;
  assurance: Array<{
    id: string;
    filename: string;
    originalName: string;
    documentType: string;
    size: number;
    mimetype: string;
    url: string;
    uploadedAt: string;
  }>;
  photos: Array<{
    id: string;
    filename: string;
    originalName: string;
    documentType: string;
    size: number;
    mimetype: string;
    url: string;
    uploadedAt: string;
  }>;
}

export interface QuestionnaireAnswers {
  [key: string]: any;
}

export interface FormErrors {
  [key: string]: string;
}

export interface StepErrors {
  [key: number]: string[];
}

export interface TourismDossier {
  id: number;
  userId: number;
  status: string;
  currentStep: number;
  ownerInfo?: OwnerInfo;
  establishmentInfo?: EstablishmentInfo;
  propertyDetails?: any;
  complianceAnswers?: QuestionnaireAnswers;
  uploadedFiles?: any[];
  uploadedPhotos?: any[];
  paymentIntentId?: string;
  paymentStatus?: string;
  amountPaid?: number;
  createdAt: string;
  updatedAt: string;
}
