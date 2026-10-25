import { MembershipPlan } from '../types';

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'premium',
    name: 'KODON PREMIUM',
    priceMonthly: 49,
    priceAnnual: 499,
    badge: 'Individual Wellness',
    highlight: 'Priority home blood collection & unlimited AI report explanations',
    benefits: [
      'Zero Phlebotomy Home Collection Fees on every booking across Hyderabad',
      'Unlimited AI KODAN Report Explanations in English & Telugu',
      'Configurable 15% discount on partner diagnostic testing (Tata 1mg, Thyrocare, Apollo)',
      'Digital Health Vault & Report Trend Tracker for 1 individual',
      'WhatsApp Fasting Reminders & 6:00 AM priority scheduling',
      'Dedicated Customer Support Desk (+91 83338 21121)',
    ],
  },
  {
    id: 'vip',
    name: 'KODON VIP',
    priceMonthly: 149,
    priceAnnual: 1499,
    badge: 'Whole Family Care',
    highlight: 'Complete household coverage (up to 4 family members) + teleconsult discount',
    benefits: [
      'All KODON Premium features for up to 4 family members (parents, spouse, children)',
      '2 Free Doctor Teleconsultations per year with MD Specialists',
      'Guaranteed 45-Minute Emergency Phlebotomist Dispatch in Hitec City, Gachibowli, & Banjara Hills',
      'Priority Pathology Processing with 6-Hour Express Digital WhatsApp delivery',
      'Dedicated Personal Medical Coordinator for hospital outpatient assistance',
      'Quarterly Preventive Screening Calendar with automated WhatsApp fasting scheduling',
      '15% Extra Savings on verified Sprint Diagnostics Radiology (CT, MRI, Ultrasound)',
    ],
  },
];
