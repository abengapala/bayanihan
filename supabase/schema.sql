-- Enable PostGIS for geospatial queries
CREATE EXTENSION IF NOT EXISTS postgis;

-- Custom Enums
CREATE TYPE provider_type_enum AS ENUM ('government', 'senator', 'party_list', 'ngo', 'lgu');
CREATE TYPE provider_status_enum AS ENUM ('active', 'temporarily_closed', 'no_funds', 'seasonal');
CREATE TYPE coverage_scope_enum AS ENUM ('national', 'regional', 'provincial', 'city');
CREATE TYPE hospital_type_enum AS ENUM ('public', 'private', 'both');
CREATE TYPE assistance_category_enum AS ENUM ('surgery', 'chemotherapy', 'dialysis', 'medicines', 'confinement', 'others');
CREATE TYPE patient_status_enum AS ENUM ('confined', 'outpatient', 'either');
CREATE TYPE office_status_enum AS ENUM ('active', 'closed', 'relocated');
CREATE TYPE legislator_type_enum AS ENUM ('senator', 'party_list_rep', 'district_rep');
CREATE TYPE institution_hospital_type_enum AS ENUM ('public', 'private', 'government_corporate');
CREATE TYPE flag_reason_enum AS ENUM ('wrong_info', 'office_closed', 'email_invalid', 'other');

-- 1. Assistance Providers
CREATE TABLE assistance_providers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_en TEXT NOT NULL,
    name_fil TEXT NOT NULL,
    acronym TEXT NOT NULL,
    provider_type provider_type_enum NOT NULL,
    logo_url TEXT,
    hotline_numbers TEXT[] DEFAULT '{}',
    email_gl_request TEXT,
    facebook_page_url TEXT,
    website_url TEXT,
    status provider_status_enum DEFAULT 'active',
    status_note TEXT,
    operating_hours TEXT,
    walk_in_accepted BOOLEAN DEFAULT true,
    coverage_scope coverage_scope_enum NOT NULL,
    eligibility_notes TEXT,
    max_assistance_amount NUMERIC,
    last_verified_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    verified_by TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 2. Requirements
CREATE TABLE requirements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    provider_id UUID REFERENCES assistance_providers(id) ON DELETE CASCADE,
    hospital_type hospital_type_enum NOT NULL,
    assistance_category assistance_category_enum NOT NULL,
    patient_status patient_status_enum NOT NULL,
    document_name_en TEXT NOT NULL,
    document_name_fil TEXT NOT NULL,
    is_required BOOLEAN DEFAULT true,
    copies_needed INTEGER DEFAULT 1,
    needs_notarization BOOLEAN DEFAULT false,
    where_to_get TEXT NOT NULL,
    tip_fil TEXT,
    sort_order INTEGER DEFAULT 0
);

-- 3. Office Locations
CREATE TABLE office_locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    provider_id UUID REFERENCES assistance_providers(id) ON DELETE CASCADE,
    branch_name TEXT NOT NULL,
    address_line TEXT NOT NULL,
    barangay TEXT,
    city_municipality TEXT NOT NULL,
    province TEXT NOT NULL,
    region TEXT NOT NULL,
    coordinates geometry(Point, 4326),
    google_maps_url TEXT,
    is_malasakit_center BOOLEAN DEFAULT false,
    host_hospital_name TEXT,
    landmark_description TEXT,
    accessible_via_public_transit BOOLEAN DEFAULT true,
    transit_directions_fil TEXT,
    floor_room_number TEXT,
    contact_number TEXT,
    status office_status_enum DEFAULT 'active',
    last_verified_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 4. Legislators
CREATE TABLE legislators (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    preferred_name TEXT NOT NULL,
    legislator_type legislator_type_enum NOT NULL,
    party_list_or_party TEXT,
    photo_url TEXT,
    offers_medical_gl BOOLEAN DEFAULT true,
    program_name TEXT,
    gl_email TEXT,
    gl_email_secondary TEXT,
    email_subject_format TEXT,
    facebook_page_url TEXT,
    office_address TEXT,
    office_hotline TEXT,
    constituency_required BOOLEAN DEFAULT false,
    indigency_required BOOLEAN DEFAULT true,
    max_amount_per_request NUMERIC,
    processing_days_estimate INTEGER,
    currently_accepting BOOLEAN DEFAULT true,
    last_verified_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 5. Hospitals
CREATE TABLE hospitals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    hospital_type institution_hospital_type_enum NOT NULL,
    doh_license_number TEXT,
    address TEXT NOT NULL,
    city_municipality TEXT NOT NULL,
    region TEXT NOT NULL,
    coordinates geometry(Point, 4326),
    emergency_hotline TEXT,
    has_malasakit_center BOOLEAN DEFAULT false,
    malasakit_floor_room TEXT,
    accepts_philhealth BOOLEAN DEFAULT true,
    indigent_services_available BOOLEAN DEFAULT true,
    social_worker_contact TEXT
);

-- 6. Community Flags
CREATE TABLE community_flags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    record_type TEXT NOT NULL,
    record_id UUID NOT NULL,
    flag_reason flag_reason_enum NOT NULL,
    user_note TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    resolved BOOLEAN DEFAULT false
);

-- Create Geo Indexes
CREATE INDEX IF NOT EXISTS office_locations_coordinates_idx ON office_locations USING GIST (coordinates);
CREATE INDEX IF NOT EXISTS hospitals_coordinates_idx ON hospitals USING GIST (coordinates);

-- Common Lookup Indexes
CREATE INDEX IF NOT EXISTS requirements_lookup_idx ON requirements (hospital_type, assistance_category, patient_status);
CREATE INDEX IF NOT EXISTS legislators_gl_idx ON legislators (offers_medical_gl, currently_accepting);
CREATE INDEX IF NOT EXISTS office_provider_idx ON office_locations (provider_id);
