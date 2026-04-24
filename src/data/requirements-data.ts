import { AssistanceType, AgencyContact } from './types';

export const assistanceTypes: AssistanceType[] = [

  // ── 1. HOSPITAL BILL ──
  {
    id: 'hospital-bill',
    title: 'Para sa Hospital Bill',
    titleEnglish: 'For Hospital Bill',
    icon: '🏥',
    requirements: [
      {
        id: 'hb-medical-cert',
        label: 'Medical Certificate / Clinical Abstract / Medical Abstract',
        note: 'Na may kompletong pangalan ng doctor, lisensya at pirma. Ang petsa ng dokumento ay dapat hindi lalagpas ng 3 buwan simula ng ito ay ibinigay ng doktor.',
        isRequired: true,
      },
      {
        id: 'hb-soa',
        label: 'Statement of Account (SOA) o Hospital Bill',
        note: 'Na may buong pangalan at pirma ng billing clerk ng ospital. Ang petsa ng dokumento ay dapat hindi lalagpas ng 3 buwan simula ng itong ay ibinigay ng billing section.',
        isRequired: true,
      },
      {
        id: 'hb-endorsement',
        label: 'Endorsement Letter mula sa social service ng ospital',
        note: null,
        isRequired: true,
      },
      {
        id: 'hb-promissory',
        label: 'Promissory Note (PN) o Certificate of Balance',
        note: 'Na may buong pangalan at pirma ng credit and collection officer, nakasaad ang petsa (Due Date) kung hanggang kailan babayaran ang pagkakautang kung ang pasyente ay nakalabas na ng ospital. Siguraduhin lamang na magkapareho ang halaga ng balanse na nakasulat sa PN at sa SOA.',
        isRequired: true,
      },
      {
        id: 'hb-processor-id',
        label: 'Dalawang kopya ng valid ID ng magpo-proseso',
        note: null,
        isRequired: true,
      },
      {
        id: 'hb-patient-id',
        label: 'Isang kopya ng ID ng pasyente',
        note: null,
        isRequired: true,
      },
      {
        id: 'hb-social-case',
        label: 'Social Case Study Report',
        note: 'Na makukuha sa City/Municipal Social Welfare and Development Office kung saan kayo residente o sa Medical Social Service ng ospital.',
        isRequired: true,
      },
      {
        id: 'hb-authorization',
        label: 'Awtorisasyon ng pasyente at kopya ng kanyang valid ID',
        note: 'Kung ang kliyente ay kinasama, kamaganak, katrabaho, o kaibigan ng pasyente.',
        isRequired: false,
      },
    ],
  },

  // ── 2. GAMOT (MEDICINE) ──
  {
    id: 'gamot',
    title: 'Para sa Gamot',
    titleEnglish: 'For Medicine',
    icon: '💊',
    requirements: [
      {
        id: 'gm-medical-cert',
        label: 'Medical Certificate / Clinical Abstract / Medical Abstract',
        note: 'Na may kompletong pangalan ng doctor, lisensya at pirma. Ang petsa ng dokumento ay dapat hindi lalagpas ng 3 buwan simula ng ito ay ibinigay ng doktor.',
        isRequired: true,
      },
      {
        id: 'gm-reseta',
        label: 'Reseta ng mga gamot',
        note: 'Na may kompletong pangalan ng doktor, lisensya at pirma. Ang petsa ng dokumento ay dapat hindi lalagpas ng buwan simula ng ito ay ibinigay ng doktor.',
        isRequired: true,
      },
      {
        id: 'gm-quotation',
        label: 'Quotation mula sa botika kung saan bibilhin ang gamot',
        note: 'May petsa at buong pangalan at pirma ng otorisadong tao.',
        isRequired: true,
      },
      {
        id: 'gm-processor-id',
        label: 'Dalawang kopya ng valid ID ng nagpoproseso',
        note: null,
        isRequired: true,
      },
      {
        id: 'gm-patient-id',
        label: 'Isang kopya ng ID ng pasyente',
        note: null,
        isRequired: true,
      },
      {
        id: 'gm-authorization',
        label: 'Awtorisasyon ng pasyente at kopya ng kanyang valid ID',
        note: 'Kung ang kliyente ay kinasama, kamaganak, katrabaho, o kaibigan ng pasyente.',
        isRequired: false,
      },
    ],
  },

  // ── 3. LABORATORY REQUEST / MEDICAL PROCEDURE ──
  {
    id: 'laboratory',
    title: 'Para sa Laboratory Request o Medical Procedure',
    titleEnglish: 'For Laboratory Request or Medical Procedure',
    icon: '🔬',
    requirements: [
      {
        id: 'lab-medical-cert',
        label: 'Medical Certificate / Clinical Abstract / Medical Abstract',
        note: 'Na may kompletong pangalan ng doctor, lisensya at pirma. Ang petsa ng dokumento ay dapat hindi lalagpas ng 3 buwan simula ng ito ay ibinigay ng doktor.',
        isRequired: true,
      },
      {
        id: 'lab-request',
        label: 'Laboratory request',
        note: 'Na may kompletong pangalan ng doktor, lisensya at pirma. Ang petsa ng dokumento ay dapat hindi lalagpas ng 3 buwan simula ng ito ay ibigay ng doktor.',
        isRequired: true,
      },
      {
        id: 'lab-quotation',
        label: 'Quotation mula sa hospital o diagnostic clinic',
        note: 'Kung saan ipapagawa ang pagsusuri. May petsa at buong pangalan at pirma ng otorisadong tao.',
        isRequired: true,
      },
      {
        id: 'lab-processor-id',
        label: 'Dalawang kopya ng valid ID ng magpoproseso',
        note: null,
        isRequired: true,
      },
      {
        id: 'lab-patient-id',
        label: 'Isang kopya ng ID ng pasyente',
        note: null,
        isRequired: true,
      },
      {
        id: 'lab-authorization',
        label: 'Awtorisasyon ng pasyente at kopya ng kanyang valid ID',
        note: 'Kung ang kliyente ay kinasama, kamaganak, katrabaho, o kaibigan ng pasyente.',
        isRequired: false,
      },
    ],
  },

  // ── 4. IMPLANT DEVICE ──
  {
    id: 'implant',
    title: 'Para sa Implant Device',
    titleEnglish: 'For Implant Device',
    icon: '🦴',
    requirements: [
      {
        id: 'im-medical-cert',
        label: 'Medical Certificate / Clinical Abstract / Medical Abstract',
        note: 'Na may kompletong pangalan ng doctor, lisensya at pirma. Ang petsa ng dokumento ay dapat hindi lalagpas ng 3 buwan simula ng ito ay ibinigay ng doktor.',
        isRequired: true,
      },
      {
        id: 'im-reseta-bakal',
        label: 'Reseta ng bakal',
        note: 'Na may kompletong pangalan ng doktor, lisensya at pirma. Ang petsa ng dokumento ay dapat hindi lalagpas ng 3 buwan simula ng ito ay ibinigay ng doktor.',
        isRequired: true,
      },
      {
        id: 'im-quotation',
        label: 'Quotation mula sa supplier kung saan bibilhin ang bakal',
        note: 'May petsa at buong pangalan at pirma ng otorisadong tao.',
        isRequired: true,
      },
      {
        id: 'im-processor-id',
        label: 'Dalawang kopya ng valid ID ng magpoproseso',
        note: null,
        isRequired: true,
      },
      {
        id: 'im-patient-id',
        label: 'Isang kopya ng ID ng pasyente',
        note: null,
        isRequired: true,
      },
      {
        id: 'im-social-case',
        label: 'Social Case Study Report',
        note: 'Na maaaring makuha sa City/Municipal Social Welfare and Development Office sa inyong lokal na pamahalaan o Municipyo.',
        isRequired: true,
      },
      {
        id: 'im-authorization',
        label: 'Awtorisasyon ng pasyente at kopya ng kanyang valid ID',
        note: 'Kung ang kliyente ay kinasama, kamaganak, katrabaho, o kaibigan ng pasyente.',
        isRequired: false,
      },
    ],
  },

  // ── 5. THERAPY ──
  {
    id: 'therapy',
    title: 'Para sa Therapy',
    titleEnglish: 'For Therapy',
    icon: '🧠',
    requirements: [
      {
        id: 'th-medical-cert',
        label: 'Medical Certificate / Clinical Abstract / Medical Abstract',
        note: 'Na may kompletong pangalan ng doctor, lisensya at pirma. Ang petsa ng dokumento ay dapat hindi lalagpas ng 3 buwan simula ng ito ay ibinigay ng doktor.',
        isRequired: true,
      },
      {
        id: 'th-request',
        label: 'Request ng therapy',
        note: 'Ang petsa ng dokumento ay dapat hindi lalagpas ng 3 buwan simula ng ito ay ibinigay ng doktor.',
        isRequired: true,
      },
      {
        id: 'th-quotation',
        label: 'Quotation mula sa hospital o diagnostic clinic',
        note: 'Kung saan ipapagawa ang pagsusuri. May petsa at buong pangalan at pirma ng otorisadong tao.',
        isRequired: true,
      },
      {
        id: 'th-processor-id',
        label: 'Dalawang kopya ng valid ID ng magpoproseso',
        note: null,
        isRequired: true,
      },
      {
        id: 'th-patient-id',
        label: 'Isang kopya ng ID ng pasyente',
        note: null,
        isRequired: true,
      },
      {
        id: 'th-social-case',
        label: 'Social Case Study Report',
        note: 'Na makukuha sa City/Municipal Social Welfare and Development Office kung saan kayo residente o sa Medical Social Service ng ospital.',
        isRequired: true,
      },
      {
        id: 'th-authorization',
        label: 'Awtorisasyon ng pasyente at kopya ng kanyang valid ID',
        note: 'Kung ang kliyente ay kinasama, kamaganak, katrabaho, o kaibigan ng pasyente.',
        isRequired: false,
      },
    ],
  },

  // ── 6. CHEMO DRUGS / CHEMO MEDS ──
  {
    id: 'chemo',
    title: 'Para sa Chemo Drugs o Chemo Meds',
    titleEnglish: 'For Chemotherapy Drugs or Medicines',
    icon: '🎗️',
    requirements: [
      {
        id: 'ch-medical-cert',
        label: 'Medical Certificate / Clinical Abstract / Medical Abstract',
        note: 'Na may kompletong pangalan ng doctor, lisensya at pirma. Ang petsa ng dokumento ay dapat hindi lalagpas ng 3 buwan simula ng ito ay ibinigay ng doktor.',
        isRequired: true,
      },
      {
        id: 'ch-treatment-protocol',
        label: 'Treatment Protocol or reseta',
        note: 'Ang petsa ng dokumento ay dapat hindi lalagpas ng 3 buwan simula ng ito ay ibinigay ng doktor.',
        isRequired: true,
      },
      {
        id: 'ch-quotation',
        label: 'Quotation mula sa hospital o botika kung saan bibilhin ang gamot',
        note: 'May petsa at buong pangalan at pirma ng otorisadong tao.',
        isRequired: true,
      },
      {
        id: 'ch-processor-id',
        label: 'Dalawang kopya ng valid ID ng magpoproseso',
        note: null,
        isRequired: true,
      },
      {
        id: 'ch-patient-id',
        label: 'Isang kopya ng ID ng pasyente',
        note: null,
        isRequired: true,
      },
      {
        id: 'ch-social-case',
        label: 'Social Case Study Report',
        note: 'Na makukuha sa City/Municipal Social Welfare and Development Office kung saan kayo residente o sa Medical Social Service ng ospital.',
        isRequired: true,
      },
      {
        id: 'ch-authorization',
        label: 'Awtorisasyon ng pasyente at kopya ng kanyang valid ID',
        note: 'Kung ang kliyente ay kinasama, kamaganak, katrabaho, o kaibigan ng pasyente.',
        isRequired: false,
      },
    ],
  },

  // ── 7. DIALYSIS ──
  {
    id: 'dialysis',
    title: 'Para sa Dialysis',
    titleEnglish: 'For Dialysis',
    icon: '🩺',
    requirements: [
      {
        id: 'di-medical-cert',
        label: 'Medical Certificate / Clinical Abstract / Medical Abstract',
        note: 'Na may kompletong pangalan ng doctor, lisensya at pirma. Ang petsa ng dokumento ay dapat hindi lalagpas ng 3 buwan simula ng ito ay ibinigay ng doktor.',
        isRequired: true,
      },
      {
        id: 'di-reseta',
        label: 'Reseta ng mga gamot',
        note: 'Na may kompletong pangalan ng doktor, lisensya at pirma. Ang petsa ng dokumento ay dapat hindi lalagpas ng buwan simula ng ito ay ibinigay ng doktor.',
        isRequired: true,
      },
      {
        id: 'di-quotation',
        label: 'Quotation mula sa botika o pasilidad sa dialysis',
        note: 'Kung saan bibilhin ang gamot. May petsa at buong pangalan at pirma ng otorisadong tao.',
        isRequired: true,
      },
      {
        id: 'di-processor-id',
        label: 'Dalawang kopya ng valid ID ng magpoproseso',
        note: null,
        isRequired: true,
      },
      {
        id: 'di-patient-id',
        label: 'Isang kopya ng ID ng pasyente',
        note: null,
        isRequired: true,
      },
      {
        id: 'di-social-case',
        label: 'Social Case Study Report',
        note: 'Na makukuha sa City/Municipal Social Welfare and Development Office kung saan kayo residente o sa Medical Social Service ng ospital.',
        isRequired: true,
      },
      {
        id: 'di-authorization',
        label: 'Awtorisasyon ng pasyente at kopya ng kanyang valid ID',
        note: 'Kung ang kliyente ay kinasama, kamaganak, katrabaho, o kaibigan ng pasyente.',
        isRequired: false,
      },
    ],
  },
];

// ════════════════════════════════════════════
// DSWD CONTACT INFORMATION
// ════════════════════════════════════════════

export const dswdContact = {
  name: 'DSWD Crisis Intervention Program (CIP)',
  email: 'ciu@dswd.gov.ph',
  telephone: ['8-951-7433', '8-962-2813'],
  trunkLines: '8-931-81-01 to 07',
  localNumbers: ['10140', '10143', '10144', '10235'],
  website: 'https://www.dswd.gov.ph',
  facebook: 'https://www.facebook.com/dswdserves',
  twitter: '@dswdserves',
  instagram: '@dswdphilippines',
  note: 'Kung ang inyong ospital ay sakop ng Malasakit Center, mas mabuting kayo ay diretsong pumunta sa Medical Social Service (MSS) para ma-endorso sa DSWD desk ng Malasakit Center na nasa mismong ospital at mangyari pong sundin ang kanilang tagubilin at tamang proseso na ibibigay.',
};

// ════════════════════════════════════════════
// ADDITIONAL AGENCIES
// ════════════════════════════════════════════

export const additionalAgencies: AgencyContact[] = [
  {
    id: 'doh-maifip',
    name: 'DOH MAIFIP Program',
    fullName: 'Medical Assistance to Indigent and Financially Incapacitated Patients',
    telephone: ['(632) 8651-7800', '(632) 165-364'],
    mobile: ['+63 936-992-5513 (GLOBE)', '+63 920-658-4698 (SMART)'],
    email: 'callcenter@doh.gov.ph',
    note: 'Para sa mga pasyenteng mahirap at hindi kayang bayaran ang ospital.',
  },
  {
    id: 'pcso-map',
    name: 'PCSO Medical Assistance Program (MAP)',
    fullName: 'PCSO Medical Services Department',
    telephone: ['(02) 8441-2065', '(02) 8441-2612'],
    email: 'msd@pcso.gov.ph',
    note: 'Para sa mga nakatanggap na ng tulong pinansyal mula sa DSWD ngunit may natitirang balanse pa sa hospital bill, maaari pa ring humingi ng karagdagang tulong.',
  },
];
