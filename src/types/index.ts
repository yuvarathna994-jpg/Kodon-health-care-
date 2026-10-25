export interface PathologyTest {
  id: string;
  name: string;
  category: 'diabetes' | 'thyroid' | 'vitamins' | 'fever' | 'organ' | 'cardiac' | 'allergy' | 'hormones' | 'urine';
  categoryLabel: string;
  price: number;
  originalPrice: number;
  parametersCount: number;
  parametersSummary: string;
  fastingRequirement: string;
  turnaroundTime: string;
  sampleType: string;
  description: string;
}

export interface HealthPackage {
  id: string;
  name: string;
  badge?: string;
  isPopular?: boolean;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  fastingRequirement: string;
  totalParameters: number;
  recommendedFor: string;
  turnaroundTime: string;
  description: string;
  categories: {
    title: string;
    tests: string[];
  }[];
}

export interface CartItem {
  id: string;
  itemType: 'package' | 'test' | 'radiology' | 'consultation' | 'membership';
  referenceId: string;
  name: string;
  price: number;
  parametersCount: number;
  fastingRequirement: string;
  partner?: string;
  discountApplied?: number;
}

export interface HyderabadHub {
  name: string;
  pincode: string;
  region: 'West Hyderabad' | 'Central Hyderabad' | 'North Hyderabad' | 'East Hyderabad' | 'South Hyderabad';
  dispatchTimeMins: number;
  hubName: string;
  activePhlebotomists: number;
}

export interface BookingSubmission {
  bookingId: string;
  patientName: string;
  age: string;
  gender: string;
  phone: string;
  email?: string;
  address: string;
  landmark?: string;
  pincode: string;
  locality: string;
  date: string;
  timeSlot: string;
  paymentMethod: 'pay_on_collection' | 'online_upi';
  items: CartItem[];
  totalAmount: number;
  createdAt: string;
  status: 'confirmed' | 'technician_assigned' | 'in_transit' | 'sample_collected' | 'analyzing' | 'report_ready';
}

export interface PartnerPriceOffer {
  partnerId: 'kodon' | 'lupin' | 'tata1mg' | 'thyrocare' | 'healthians' | 'apollo' | 'sprint';
  partnerName: string;
  testName: string;
  originalPrice: number;
  offerPrice: number;
  kodonDiscountEligible: boolean;
  kodonDiscountAmount: number;
  collectionCharge: number;
  finalPayable: number;
  lastVerified: string;
  availability: 'Available' | 'Verification Required' | 'Limited Slots';
  accreditation: string;
}

export interface BiomarkerReading {
  id: string;
  date: string; // e.g. "2026-04-12"
  label: string; // e.g. "Apr 2026"
  value: number;
  unit: string;
  labName: string;
  notes?: string;
}

export interface HealthTrendBiomarker {
  id: string;
  name: string;
  category: 'diabetes' | 'kidney' | 'liver' | 'cardiac' | 'thyroid' | 'vitamins';
  unit: string;
  normalRangeText: string;
  targetMin: number;
  targetMax: number;
  lowerIsBetter: boolean;
  description: string;
  readings: BiomarkerReading[];
}

export interface DiagnosticCategoryLibraryItem {
  id: string;
  name: string;
  iconType: string;
  simpleExplanation: string;
  whatItMeasures: string;
  whyClinicianRequests: string;
  preparationRequirements: string;
  partnerOffers: PartnerPriceOffer[];
  keyParameters: string[];
}

export interface RadiologyService {
  id: string;
  name: string;
  modality: 'X-Ray' | 'Ultrasound' | 'CT Scan' | 'MRI' | 'Mammography' | 'Doppler' | 'ECG' | '2D Echo';
  provider: string;
  verifiedPrice: number;
  locations: string[];
  preparation: string;
  contrastRequired: boolean;
  radiationNotice: string;
  available: boolean;
}

export interface DoctorProfile {
  id: string;
  name: string;
  qualification: string;
  registrationNumber: string;
  specialty: string;
  experienceYears: number;
  languages: string[];
  hospitalAffiliation: string;
  location: string;
  teleconsultationFee: number;
  inPersonFee: number;
  nextAvailableSlot: string;
}

export interface AnalyteReportExtraction {
  testName: string;
  value: string;
  unit: string;
  referenceRange: string;
  flag: 'normal' | 'high' | 'low';
  category: string;
  whatItMeasures: string;
  generalExplanation: string;
  questionsForDoctor: string[];
}

export interface MembershipPlan {
  id: 'premium' | 'vip';
  name: string;
  priceMonthly: number;
  priceAnnual: number;
  benefits: string[];
  badge: string;
  highlight: string;
}
