# Company Dossier - Création de Société

This directory contains the refactored company dossier creation flow, following the same modular structure as the tourism dossier.

## Structure

```
company/
├── components/
│   ├── ProgressBar.tsx          # Progress indicator component
│   ├── Navigation.tsx           # Navigation buttons component
│   ├── FormInput.tsx            # Reusable input component
│   ├── FormSelect.tsx           # Reusable select component
│   └── steps/
│       ├── Step1Associates.tsx      # Step 1: Associate information
│       ├── Step2Configuration.tsx   # Step 2: Company configuration
│       ├── Step3Payment.tsx         # Step 3: Payment step
│       ├── Step4CompanyDetails.tsx  # Step 4: Company details and documents
│       └── Step5Final.tsx           # Step 5: Final step with PDF download
├── hooks/
│   ├── useCompanyDossier.ts     # Main hook for dossier state management
│   └── useValidation.ts         # Validation logic hook
├── types.ts                     # TypeScript interfaces
├── page.tsx                     # Main page component
└── README.md                    # This file
```

## Components

### Main Components

- **ProgressBar**: Shows the current step and progress through the 5-step process
- **Navigation**: Handles previous/next navigation with proper validation
- **FormInput**: Reusable input component with error handling
- **FormSelect**: Reusable select component with error handling

### Step Components

1. **Step1Associates**: Collects information about company associates
   - Dynamic associate addition/removal (max 5)
   - Form validation for each associate
   - Manager designation

2. **Step2Configuration**: Company configuration options
   - Headquarters selection (domicile, domiciliation, local rental)
   - Price calculation and display
   - Bank selection for domiciliation

3. **Step3Payment**: Payment step
   - Price summary
   - Redirects to payment page

4. **Step4CompanyDetails**: Company details and document upload
   - Company name and proposed names
   - Activity selection (max 3)
   - Capital selection
   - Document upload

5. **Step5Final**: Final step with processing status
   - Processing timeline
   - PDF download functionality

## Hooks

### useCompanyDossier
Main hook that manages:
- Dossier state and API calls
- Associate management
- Company data management
- File upload handling
- PDF generation

### useValidation
Handles form validation:
- Step-specific validation functions
- Error state management
- Field error clearing

## Types

Defines TypeScript interfaces for:
- `Associate`: Associate information structure
- `CompanyData`: Company configuration data
- `CompanyDossier`: Complete dossier structure
- `FormErrors` & `StepErrors`: Error handling types

## Usage

The main page component (`page.tsx`) orchestrates the entire flow:
1. Uses hooks for state management
2. Renders appropriate step component based on current step
3. Handles navigation and validation
4. Manages loading states

## Key Features

- **Modular Architecture**: Each step is a separate component
- **Reusable Components**: FormInput and FormSelect for consistency
- **Type Safety**: Full TypeScript support
- **Validation**: Comprehensive form validation with error display
- **State Management**: Centralized state management through hooks
- **Responsive Design**: Mobile-friendly interface
- **Error Handling**: User-friendly error messages and validation

## API Integration

- Creates/loads company dossiers via `/dossiers/company` endpoint
- Saves step data via PUT requests
- Handles file uploads via `/uploads/multiple` endpoint
- Generates PDFs via `/pdf/company/{id}` endpoint
- Integrates with payment flow via `/payment/company/{id}`

## Styling

Uses Tailwind CSS with custom design system:
- Primary color: `#007ea7` (blue)
- Secondary color: `#00171f` (dark blue)
- Custom fonts: Gascogne Serial (serif) and Satoshi (sans-serif)
- Glassmorphism effects with backdrop blur
- Smooth transitions and hover effects
