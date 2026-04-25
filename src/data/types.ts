// ============================================================
// Bayanihan Health Portal — TypeScript Types
// Mirrors Supabase database schema exactly
// ============================================================

export type ProviderType = 'government' | 'senator' | 'party_list' | 'ngo' | 'lgu';
export type ProviderStatus = 'active' | 'temporarily_closed' | 'no_funds' | 'seasonal';
export type CoverageScope = 'national' | 'regional' | 'provincial' | 'city';
export type HospitalTypeEnum = 'public' | 'private' | 'both';
export type AssistanceCategory = 'surgery' | 'chemotherapy' | 'dialysis' | 'medicines' | 'confinement' | 'others';
export type PatientStatus = 'confined' | 'outpatient' | 'either';
export type LegislatorType = 'senator' | 'party_list_rep' | 'district_rep' | 'executive';
export type HospitalType = 'public' | 'private' | 'government_corporate';
export type OfficeStatus = 'active' | 'closed' | 'relocated';
export type FlagReason = 'wrong_info' | 'office_closed' | 'email_invalid' | 'other';

export interface AssistanceRequirement {
  id: string;
  label: string;       // Filipino label
  label_en: string;    // English label
  note: string | null; // Filipino note
  note_en: string | null; // English note
  isRequired: boolean;
}

export type ProviderChannel = 'pcso' | 'dswd' | 'senator';

export interface ProviderRequirements {
  channel: ProviderChannel;
  label: string;
  icon: string;
  requirements: AssistanceRequirement[];
}

export interface AssistanceType {
  id: string;
  title: string;
  titleEnglish: string;
  icon: string;
  providerRequirements: ProviderRequirements[];
}

export interface AgencyContact {
  id: string;
  name: string;
  fullName: string;
  telephone: string[];
  mobile?: string[];
  email: string;
  note: string;
}

export interface AssistanceProvider {
  id: string;
  name_en: string;
  name_fil: string;
  acronym: string;
  provider_type: ProviderType;
  logo_url: string | null;
  hotline_numbers: string[];
  email_gl_request: string | null;
  facebook_page_url: string | null;
  website_url: string | null;
  status: ProviderStatus;
  status_note: string | null;
  operating_hours: string | null;
  walk_in_accepted: boolean;
  coverage_scope: CoverageScope;
  eligibility_notes: string | null;
  max_assistance_amount: number | null;
  last_verified_at: string;
  verified_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface Requirement {
  id: string;
  provider_id: string;
  hospital_type: HospitalTypeEnum;
  assistance_category: AssistanceCategory;
  patient_status: PatientStatus;
  document_name_en: string;
  document_name_fil: string;
  is_required: boolean;
  copies_needed: number;
  needs_notarization: boolean;
  where_to_get: string;
  tip_fil: string | null;
  sort_order: number;
}

export interface OfficeLocation {
  id: string;
  provider_id: string;
  branch_name: string;
  address_line: string;
  barangay: string | null;
  city_municipality: string;
  province: string;
  region: string;
  coordinates: { lat: number; lng: number };
  google_maps_url: string | null;
  is_malasakit_center: boolean;
  host_hospital_name: string | null;
  landmark_description: string | null;
  accessible_via_public_transit: boolean;
  transit_directions_fil: string | null;
  floor_room_number: string | null;
  contact_number: string | null;
  status: OfficeStatus;
  last_verified_at: string;
}

export interface Legislator {
  id: string;
  full_name: string;
  preferred_name: string;
  legislator_type: LegislatorType;
  party_list_or_party: string | null;
  photo_url: string | null;
  offers_medical_gl: boolean;
  program_name: string | null;
  gl_email: string | null;
  gl_email_secondary: string | null;
  email_subject_format: string;
  facebook_page_url: string | null;
  office_address: string | null;
  office_hotline: string | null;
  constituency_required: boolean;
  indigency_required: boolean;
  max_amount_per_request: number | null;
  processing_days_estimate: number | null;
  currently_accepting: boolean;
  last_verified_at: string;
}

export interface Hospital {
  id: string;
  name: string;
  hospital_type: HospitalType;
  doh_license_number: string | null;
  address: string;
  city_municipality: string;
  region: string;
  coordinates: { lat: number; lng: number };
  emergency_hotline: string | null;
  has_malasakit_center: boolean;
  malasakit_floor_room: string | null;
  accepts_philhealth: boolean;
  indigent_services_available: boolean;
  social_worker_contact: string | null;
  google_maps_url?: string | null;
}

export interface CommunityFlag {
  id: string;
  record_type: string;
  record_id: string;
  flag_reason: FlagReason;
  user_note: string | null;
  created_at: string;
  resolved: boolean;
}

// Wizard state
export interface WizardState {
  currentStep: number;
  patientStatus: PatientStatus | null;
  hospitalType: HospitalTypeEnum | null;
  assistanceCategory: AssistanceCategory | null;
  checkedDocuments: string[];
  userLocation: { lat: number; lng: number } | null;
  nearestOffices: (OfficeLocation & { distance?: number; provider?: AssistanceProvider })[];
}
