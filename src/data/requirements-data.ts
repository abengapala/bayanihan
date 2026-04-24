import { AssistanceType, AgencyContact } from './types';

// ── Shared base requirements (reused across channels) ──────
const medCert = (prefix: string) => ({
  id: `${prefix}-med-cert`,
  label: 'Medical Certificate / Clinical Abstract / Medical Abstract',
  note: 'Na may kompletong pangalan ng doctor, lisensya at pirma. Ang petsa ng dokumento ay dapat hindi lalagpas ng 3 buwan.',
  isRequired: true,
});

const processorId = (prefix: string) => ({
  id: `${prefix}-processor-id`,
  label: 'Dalawang (2) kopya ng valid ID ng magpo-proseso',
  note: null,
  isRequired: true,
});

const patientId = (prefix: string) => ({
  id: `${prefix}-patient-id`,
  label: 'Isang (1) kopya ng valid ID ng pasyente',
  note: null,
  isRequired: true,
});

const authorization = (prefix: string) => ({
  id: `${prefix}-authorization`,
  label: 'Awtorisasyon ng pasyente at kopya ng kanyang valid ID',
  note: 'Kung ang nagpo-proseso ay kamaganak, katrabaho, o kaibigan ng pasyente — hindi ang pasyente mismo.',
  isRequired: false,
});

const socialCase = (prefix: string) => ({
  id: `${prefix}-social-case`,
  label: 'Social Case Study Report',
  note: 'Makukuha sa City/Municipal Social Welfare and Development Office ng inyong lugar o sa Medical Social Service ng ospital.',
  isRequired: true,
});

const endorsement = (prefix: string) => ({
  id: `${prefix}-endorsement`,
  label: 'Endorsement Letter mula sa Social Service ng ospital',
  note: null,
  isRequired: true,
});

const soa = (prefix: string) => ({
  id: `${prefix}-soa`,
  label: 'Statement of Account (SOA) o Hospital Bill',
  note: 'Na may buong pangalan at pirma ng billing clerk. Hindi lalagpas ng 3 buwan mula nang ibinigay ng billing section.',
  isRequired: true,
});

const promissoryNote = (prefix: string) => ({
  id: `${prefix}-pn`,
  label: 'Promissory Note (PN) o Certificate of Balance',
  note: 'Na may buong pangalan at pirma ng credit and collection officer. Siguraduhing magkapareho ang halaga sa PN at SOA.',
  isRequired: true,
});

const barangayCert = (prefix: string) => ({
  id: `${prefix}-brgy`,
  label: 'Barangay Certificate of Indigency',
  note: 'Libre ito sa inyong Barangay Hall. Hindi palaging kailangan ngunit malaking tulong para mapabilis ang pag-apruba.',
  isRequired: false,
});

export const assistanceTypes: AssistanceType[] = [

  // ── 1. HOSPITAL BILL ────────────────────────────────────────
  {
    id: 'hospital-bill',
    title: 'Para sa Hospital Bill',
    titleEnglish: 'For Hospital Bill',
    icon: '🏥',
    providerRequirements: [
      {
        channel: 'pcso',
        label: 'PCSO MAP',
        icon: '🎫',
        requirements: [
          { id: 'hb-pcso-form', label: 'PCSO MAP Application Form (para sa walk-in)', note: 'Makukuha sa PCSO branch. Para sa online: mag-upload na lang ng requirements sa portal.', isRequired: true },
          medCert('hb-pcso'),
          soa('hb-pcso'),
          { id: 'hb-pcso-msw', label: 'MSW Endorsement / Referral Letter mula sa ospital', note: 'Hindi palaging kailangan ngunit malaking tulong.', isRequired: false },
          processorId('hb-pcso'),
          patientId('hb-pcso'),
          authorization('hb-pcso'),
        ],
      },
      {
        channel: 'dswd',
        label: 'DSWD AICS',
        icon: '🏛️',
        requirements: [
          medCert('hb-dswd'),
          soa('hb-dswd'),
          endorsement('hb-dswd'),
          promissoryNote('hb-dswd'),
          processorId('hb-dswd'),
          patientId('hb-dswd'),
          socialCase('hb-dswd'),
          barangayCert('hb-dswd'),
          authorization('hb-dswd'),
        ],
      },
      {
        channel: 'senator',
        label: 'Senador / Party-list',
        icon: '📧',
        requirements: [
          medCert('hb-sen'),
          soa('hb-sen'),
          endorsement('hb-sen'),
          promissoryNote('hb-sen'),
          processorId('hb-sen'),
          patientId('hb-sen'),
          socialCase('hb-sen'),
          authorization('hb-sen'),
        ],
      },
    ],
  },

  // ── 2. GAMOT (MEDICINE) ─────────────────────────────────────
  {
    id: 'gamot',
    title: 'Para sa Gamot',
    titleEnglish: 'For Medicine',
    icon: '💊',
    providerRequirements: [
      {
        channel: 'pcso',
        label: 'PCSO MAP',
        icon: '🎫',
        requirements: [
          { id: 'gm-pcso-form', label: 'PCSO MAP Application Form (para sa walk-in)', note: 'Makukuha sa PCSO branch.', isRequired: true },
          medCert('gm-pcso'),
          { id: 'gm-pcso-reseta', label: 'Orihinal na Reseta ng Doktor', note: 'Na may lisensyang numero at pirma ng doktor. Hindi tatanggapin ang photocopy.', isRequired: true },
          { id: 'gm-pcso-quotation', label: 'Quotation mula sa botika (3 suppliers kung wala sa ospital)', note: 'May petsa at buong pangalan at pirma ng otorisadong tao.', isRequired: true },
          processorId('gm-pcso'),
          patientId('gm-pcso'),
          authorization('gm-pcso'),
        ],
      },
      {
        channel: 'dswd',
        label: 'DSWD AICS',
        icon: '🏛️',
        requirements: [
          medCert('gm-dswd'),
          { id: 'gm-dswd-reseta', label: 'Reseta ng mga gamot', note: 'Na may kompletong pangalan ng doktor, lisensya at pirma. Hindi lalagpas ng 1 buwan.', isRequired: true },
          { id: 'gm-dswd-quotation', label: 'Quotation mula sa botika', note: 'May petsa at buong pangalan at pirma ng otorisadong tao.', isRequired: true },
          processorId('gm-dswd'),
          patientId('gm-dswd'),
          barangayCert('gm-dswd'),
          authorization('gm-dswd'),
        ],
      },
      {
        channel: 'senator',
        label: 'Senador / Party-list',
        icon: '📧',
        requirements: [
          medCert('gm-sen'),
          { id: 'gm-sen-reseta', label: 'Reseta ng mga gamot', note: 'Na may kompletong pangalan ng doktor, lisensya at pirma.', isRequired: true },
          { id: 'gm-sen-quotation', label: 'Quotation mula sa botika', note: 'May petsa at buong pangalan at pirma ng otorisadong tao.', isRequired: true },
          processorId('gm-sen'),
          patientId('gm-sen'),
          authorization('gm-sen'),
        ],
      },
    ],
  },

  // ── 3. LABORATORY / MEDICAL PROCEDURE ──────────────────────
  {
    id: 'laboratory',
    title: 'Para sa Laboratory o Medical Procedure',
    titleEnglish: 'For Laboratory Request or Medical Procedure',
    icon: '🔬',
    providerRequirements: [
      {
        channel: 'pcso',
        label: 'PCSO MAP',
        icon: '🎫',
        requirements: [
          { id: 'lab-pcso-form', label: 'PCSO MAP Application Form (para sa walk-in)', note: 'Makukuha sa PCSO branch.', isRequired: true },
          medCert('lab-pcso'),
          { id: 'lab-pcso-request', label: 'Laboratory Request / Medical Order', note: 'Na may kompletong pangalan ng doktor, lisensya at pirma.', isRequired: true },
          { id: 'lab-pcso-quotation', label: 'Quotation mula sa hospital o diagnostic clinic', note: 'May petsa at pirma ng otorisadong tao.', isRequired: true },
          processorId('lab-pcso'),
          patientId('lab-pcso'),
          authorization('lab-pcso'),
        ],
      },
      {
        channel: 'dswd',
        label: 'DSWD AICS',
        icon: '🏛️',
        requirements: [
          medCert('lab-dswd'),
          { id: 'lab-dswd-request', label: 'Laboratory request', note: 'Na may kompletong pangalan ng doktor, lisensya at pirma. Hindi lalagpas ng 3 buwan.', isRequired: true },
          { id: 'lab-dswd-quotation', label: 'Quotation mula sa hospital o diagnostic clinic', note: 'Kung saan ipapagawa ang pagsusuri.', isRequired: true },
          processorId('lab-dswd'),
          patientId('lab-dswd'),
          barangayCert('lab-dswd'),
          authorization('lab-dswd'),
        ],
      },
      {
        channel: 'senator',
        label: 'Senador / Party-list',
        icon: '📧',
        requirements: [
          medCert('lab-sen'),
          { id: 'lab-sen-request', label: 'Laboratory request', note: 'Na may kompletong pangalan ng doktor, lisensya at pirma.', isRequired: true },
          { id: 'lab-sen-quotation', label: 'Quotation mula sa hospital o diagnostic clinic', note: 'May petsa at pirma ng otorisadong tao.', isRequired: true },
          processorId('lab-sen'),
          patientId('lab-sen'),
          authorization('lab-sen'),
        ],
      },
    ],
  },

  // ── 4. IMPLANT DEVICE ───────────────────────────────────────
  {
    id: 'implant',
    title: 'Para sa Implant Device',
    titleEnglish: 'For Implant Device',
    icon: '🦴',
    providerRequirements: [
      {
        channel: 'pcso',
        label: 'PCSO MAP',
        icon: '🎫',
        requirements: [
          { id: 'im-pcso-form', label: 'PCSO MAP Application Form (para sa walk-in)', note: 'Makukuha sa PCSO branch.', isRequired: true },
          medCert('im-pcso'),
          { id: 'im-pcso-reseta', label: 'Reseta ng bakal / implant', note: 'Na may kompletong pangalan ng doktor, lisensya at pirma.', isRequired: true },
          { id: 'im-pcso-quotation', label: 'Quotation mula sa supplier ng implant', note: 'May petsa at pirma ng otorisadong tao.', isRequired: true },
          processorId('im-pcso'),
          patientId('im-pcso'),
          authorization('im-pcso'),
        ],
      },
      {
        channel: 'dswd',
        label: 'DSWD AICS',
        icon: '🏛️',
        requirements: [
          medCert('im-dswd'),
          { id: 'im-dswd-reseta', label: 'Reseta ng bakal / implant', note: 'Na may kompletong pangalan ng doktor, lisensya at pirma.', isRequired: true },
          { id: 'im-dswd-quotation', label: 'Quotation mula sa supplier ng implant', note: 'May petsa at pirma ng otorisadong tao.', isRequired: true },
          processorId('im-dswd'),
          patientId('im-dswd'),
          socialCase('im-dswd'),
          barangayCert('im-dswd'),
          authorization('im-dswd'),
        ],
      },
      {
        channel: 'senator',
        label: 'Senador / Party-list',
        icon: '📧',
        requirements: [
          medCert('im-sen'),
          { id: 'im-sen-reseta', label: 'Reseta ng bakal / implant', note: 'Na may kompletong pangalan ng doktor, lisensya at pirma.', isRequired: true },
          { id: 'im-sen-quotation', label: 'Quotation mula sa supplier ng implant', note: 'May petsa at pirma ng otorisadong tao.', isRequired: true },
          processorId('im-sen'),
          patientId('im-sen'),
          socialCase('im-sen'),
          authorization('im-sen'),
        ],
      },
    ],
  },

  // ── 5. THERAPY ──────────────────────────────────────────────
  {
    id: 'therapy',
    title: 'Para sa Therapy',
    titleEnglish: 'For Therapy',
    icon: '🧠',
    providerRequirements: [
      {
        channel: 'pcso',
        label: 'PCSO MAP',
        icon: '🎫',
        requirements: [
          { id: 'th-pcso-form', label: 'PCSO MAP Application Form (para sa walk-in)', note: 'Makukuha sa PCSO branch.', isRequired: true },
          medCert('th-pcso'),
          { id: 'th-pcso-request', label: 'Request ng therapy mula sa doktor', note: 'Hindi lalagpas ng 3 buwan.', isRequired: true },
          { id: 'th-pcso-quotation', label: 'Quotation mula sa clinic / ospital', note: 'May petsa at pirma ng otorisadong tao.', isRequired: true },
          processorId('th-pcso'),
          patientId('th-pcso'),
          authorization('th-pcso'),
        ],
      },
      {
        channel: 'dswd',
        label: 'DSWD AICS',
        icon: '🏛️',
        requirements: [
          medCert('th-dswd'),
          { id: 'th-dswd-request', label: 'Request ng therapy mula sa doktor', note: 'Hindi lalagpas ng 3 buwan.', isRequired: true },
          { id: 'th-dswd-quotation', label: 'Quotation mula sa clinic / ospital', note: 'May petsa at pirma ng otorisadong tao.', isRequired: true },
          processorId('th-dswd'),
          patientId('th-dswd'),
          socialCase('th-dswd'),
          barangayCert('th-dswd'),
          authorization('th-dswd'),
        ],
      },
      {
        channel: 'senator',
        label: 'Senador / Party-list',
        icon: '📧',
        requirements: [
          medCert('th-sen'),
          { id: 'th-sen-request', label: 'Request ng therapy mula sa doktor', note: 'Hindi lalagpas ng 3 buwan.', isRequired: true },
          { id: 'th-sen-quotation', label: 'Quotation mula sa clinic / ospital', note: 'May petsa at pirma ng otorisadong tao.', isRequired: true },
          processorId('th-sen'),
          patientId('th-sen'),
          socialCase('th-sen'),
          authorization('th-sen'),
        ],
      },
    ],
  },

  // ── 6. CHEMO DRUGS ──────────────────────────────────────────
  {
    id: 'chemo',
    title: 'Para sa Chemo Drugs o Chemo Meds',
    titleEnglish: 'For Chemotherapy Drugs or Medicines',
    icon: '🎗️',
    providerRequirements: [
      {
        channel: 'pcso',
        label: 'PCSO MAP',
        icon: '🎫',
        requirements: [
          { id: 'ch-pcso-form', label: 'PCSO MAP Application Form (para sa walk-in)', note: 'Makukuha sa PCSO branch.', isRequired: true },
          medCert('ch-pcso'),
          { id: 'ch-pcso-protocol', label: 'Oncologist Certificate at Treatment Protocol', note: 'Dapat nakalagay ang uri ng cancer, stage, at chemotherapy regimen.', isRequired: true },
          { id: 'ch-pcso-biopsy', label: 'Histopathology Report / Biopsy Result', note: 'Pormal na patunay ng cancer diagnosis mula sa Pathology Department.', isRequired: true },
          { id: 'ch-pcso-quotation', label: 'Drug Quotation mula sa Hospital Pharmacy o espesyalisadong botika', note: 'Maaaring 3 quotation kung hindi available sa ospital.', isRequired: true },
          processorId('ch-pcso'),
          patientId('ch-pcso'),
          authorization('ch-pcso'),
        ],
      },
      {
        channel: 'dswd',
        label: 'DSWD AICS',
        icon: '🏛️',
        requirements: [
          medCert('ch-dswd'),
          { id: 'ch-dswd-protocol', label: 'Treatment Protocol o Reseta ng chemo drugs', note: 'Hindi lalagpas ng 3 buwan.', isRequired: true },
          { id: 'ch-dswd-quotation', label: 'Quotation mula sa hospital o botika', note: 'May petsa at pirma ng otorisadong tao.', isRequired: true },
          processorId('ch-dswd'),
          patientId('ch-dswd'),
          socialCase('ch-dswd'),
          barangayCert('ch-dswd'),
          authorization('ch-dswd'),
        ],
      },
      {
        channel: 'senator',
        label: 'Senador / Party-list',
        icon: '📧',
        requirements: [
          medCert('ch-sen'),
          { id: 'ch-sen-protocol', label: 'Treatment Protocol o Reseta ng chemo drugs', note: 'Hindi lalagpas ng 3 buwan.', isRequired: true },
          { id: 'ch-sen-quotation', label: 'Quotation mula sa hospital o botika', note: 'May petsa at pirma ng otorisadong tao.', isRequired: true },
          processorId('ch-sen'),
          patientId('ch-sen'),
          socialCase('ch-sen'),
          authorization('ch-sen'),
        ],
      },
    ],
  },

  // ── 7. DIALYSIS ─────────────────────────────────────────────
  {
    id: 'dialysis',
    title: 'Para sa Dialysis',
    titleEnglish: 'For Dialysis',
    icon: '🩺',
    providerRequirements: [
      {
        channel: 'pcso',
        label: 'PCSO MAP',
        icon: '🎫',
        requirements: [
          { id: 'di-pcso-form', label: 'PCSO MAP Application Form (para sa walk-in)', note: 'Makukuha sa PCSO branch.', isRequired: true },
          medCert('di-pcso'),
          { id: 'di-pcso-nephro', label: "Nephrologist's Certificate / Clinical Abstract", note: 'Dapat nakalagay ang bilang ng sessions bawat linggo at diagnosis (CKD stage, ESRD, etc.).', isRequired: true },
          { id: 'di-pcso-acceptance', label: 'Certificate of Acceptance mula sa Dialysis Center', note: 'Para malaman ng PCSO kung saan ipapadala ang Guarantee Letter.', isRequired: true },
          { id: 'di-pcso-labs', label: 'Pinakabagong Lab Results (BUN, Creatinine, CBC)', note: 'Hindi hihigit sa 3 buwan. Mula sa laboratory ng ospital o clinic.', isRequired: true },
          processorId('di-pcso'),
          patientId('di-pcso'),
          authorization('di-pcso'),
        ],
      },
      {
        channel: 'dswd',
        label: 'DSWD AICS',
        icon: '🏛️',
        requirements: [
          medCert('di-dswd'),
          { id: 'di-dswd-reseta', label: 'Reseta ng mga gamot para sa dialysis', note: 'Na may kompletong pangalan ng doktor, lisensya at pirma. Hindi lalagpas ng 1 buwan.', isRequired: true },
          { id: 'di-dswd-quotation', label: 'Quotation mula sa botika o dialysis facility', note: 'May petsa at pirma ng otorisadong tao.', isRequired: true },
          processorId('di-dswd'),
          patientId('di-dswd'),
          socialCase('di-dswd'),
          barangayCert('di-dswd'),
          authorization('di-dswd'),
        ],
      },
      {
        channel: 'senator',
        label: 'Senador / Party-list',
        icon: '📧',
        requirements: [
          medCert('di-sen'),
          { id: 'di-sen-nephro', label: "Nephrologist's Certificate / Clinical Abstract", note: 'Dapat nakalagay ang diagnosis at bilang ng sessions.', isRequired: true },
          { id: 'di-sen-quotation', label: 'Quotation mula sa dialysis facility', note: 'May petsa at pirma ng otorisadong tao.', isRequired: true },
          processorId('di-sen'),
          patientId('di-sen'),
          socialCase('di-sen'),
          authorization('di-sen'),
        ],
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
  note: 'Kung ang inyong ospital ay sakop ng Malasakit Center, mas mabuting pumunta muna sa Medical Social Service (MSS) para ma-endorso sa DSWD desk ng Malasakit Center.',
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
    note: 'Para sa mga nakatanggap na ng tulong mula sa DSWD ngunit may natitirang balanse pa sa hospital bill.',
  },
];
