import { HealthTrendBiomarker, BiomarkerReading } from '../types';

export const INITIAL_HEALTH_TRENDS: HealthTrendBiomarker[] = [
  {
    id: 'hba1c',
    name: 'HbA1c (Glycated Hemoglobin)',
    category: 'diabetes',
    unit: '%',
    normalRangeText: '< 5.7% (Normal), 5.7 - 6.4% (Prediabetes)',
    targetMin: 4.5,
    targetMax: 5.7,
    lowerIsBetter: true,
    description: 'Reflects your average blood glucose levels over the past 2 to 3 months.',
    readings: [
      {
        id: 'hba1c-1',
        date: '2026-04-10',
        label: '10 Apr 2026',
        value: 7.4,
        unit: '%',
        labName: 'KoDon Health Care',
        notes: 'Initial checkup after fatigue and thirst symptoms.',
      },
      {
        id: 'hba1c-2',
        date: '2026-07-15',
        label: '15 Jul 2026',
        value: 6.8,
        unit: '%',
        labName: 'Lupin Diagnostics',
        notes: 'Follow-up after diet changes and brisk walking.',
      },
      {
        id: 'hba1c-3',
        date: '2026-10-18',
        label: '18 Oct 2026',
        value: 6.2,
        unit: '%',
        labName: 'KoDon Health Care',
        notes: 'Remarkable improvement towards prediabetes threshold.',
      },
    ],
  },
  {
    id: 'vitamin_d',
    name: 'Vitamin D (25-OH Total)',
    category: 'vitamins',
    unit: 'ng/mL',
    normalRangeText: '30 - 100 ng/mL (Optimal), < 20 ng/mL (Deficient)',
    targetMin: 30,
    targetMax: 80,
    lowerIsBetter: false,
    description: 'Crucial for calcium absorption, bone strength, musculoskeletal recovery, and immune defenses.',
    readings: [
      {
        id: 'vitd-1',
        date: '2026-02-12',
        label: '12 Feb 2026',
        value: 14.2,
        unit: 'ng/mL',
        labName: 'Lupin Diagnostics',
        notes: 'Severe deficiency flagged during winter checkup.',
      },
      {
        id: 'vitd-2',
        date: '2026-06-08',
        label: '08 Jun 2026',
        value: 23.5,
        unit: 'ng/mL',
        labName: 'KoDon Health Care',
        notes: 'Partial recovery after oral cholecalciferol supplements.',
      },
      {
        id: 'vitd-3',
        date: '2026-10-18',
        label: '18 Oct 2026',
        value: 36.8,
        unit: 'ng/mL',
        labName: 'KoDon Health Care',
        notes: 'Optimal healthy range achieved.',
      },
    ],
  },
  {
    id: 'creatinine',
    name: 'Serum Creatinine (Kidney Filter)',
    category: 'kidney',
    unit: 'mg/dL',
    normalRangeText: '0.6 - 1.2 mg/dL (Normal Renal Function)',
    targetMin: 0.6,
    targetMax: 1.1,
    lowerIsBetter: true,
    description: 'Primary marker of glomerular filtration rate and kidney waste clearance efficiency.',
    readings: [
      {
        id: 'cr-1',
        date: '2026-03-05',
        label: '05 Mar 2026',
        value: 1.35,
        unit: 'mg/dL',
        labName: 'Apollo Diagnostics',
        notes: 'Mild elevation noticed during dehydration.',
      },
      {
        id: 'cr-2',
        date: '2026-06-20',
        label: '20 Jun 2026',
        value: 1.1,
        unit: 'mg/dL',
        labName: 'KoDon Health Care',
        notes: 'Improved hydration and nephrology review.',
      },
      {
        id: 'cr-3',
        date: '2026-10-18',
        label: '18 Oct 2026',
        value: 0.92,
        unit: 'mg/dL',
        labName: 'KoDon Health Care',
        notes: 'Normal healthy baseline restored.',
      },
    ],
  },
  {
    id: 'cholesterol',
    name: 'Total Cholesterol',
    category: 'cardiac',
    unit: 'mg/dL',
    normalRangeText: '< 200 mg/dL (Desirable), 200 - 239 mg/dL (Borderline)',
    targetMin: 120,
    targetMax: 199,
    lowerIsBetter: true,
    description: 'Circulating lipid levels that evaluate cardiovascular risk and arterial plaque vulnerability.',
    readings: [
      {
        id: 'tc-1',
        date: '2026-01-22',
        label: '22 Jan 2026',
        value: 238,
        unit: 'mg/dL',
        labName: 'Thyrocare',
        notes: 'Borderline elevated total cholesterol.',
      },
      {
        id: 'tc-2',
        date: '2026-05-14',
        label: '14 May 2026',
        value: 215,
        unit: 'mg/dL',
        labName: 'Lupin Diagnostics',
        notes: 'Reduced trans fats & increased dietary fiber.',
      },
      {
        id: 'tc-3',
        date: '2026-10-18',
        label: '18 Oct 2026',
        value: 186,
        unit: 'mg/dL',
        labName: 'KoDon Health Care',
        notes: 'Safely within the optimal desirable range.',
      },
    ],
  },
  {
    id: 'tsh',
    name: 'Ultrasensitive TSH (Thyroid)',
    category: 'thyroid',
    unit: 'mIU/L',
    normalRangeText: '0.45 - 4.5 mIU/L (Euthyroid State)',
    targetMin: 0.45,
    targetMax: 4.5,
    lowerIsBetter: false,
    description: 'Pituitary messenger hormone regulating metabolic speed, thermal control, and energy expenditure.',
    readings: [
      {
        id: 'tsh-1',
        date: '2026-02-18',
        label: '18 Feb 2026',
        value: 5.8,
        unit: 'mIU/L',
        labName: 'Tata 1mg',
        notes: 'Subclinical hypothyroidism flagged.',
      },
      {
        id: 'tsh-2',
        date: '2026-06-15',
        label: '15 Jun 2026',
        value: 3.9,
        unit: 'mIU/L',
        labName: 'KoDon Health Care',
        notes: 'Normalized with morning thyroid management.',
      },
      {
        id: 'tsh-3',
        date: '2026-10-18',
        label: '18 Oct 2026',
        value: 2.6,
        unit: 'mIU/L',
        labName: 'Lupin Diagnostics',
        notes: 'Stable euthyroid profile confirmed.',
      },
    ],
  },
];

const STORAGE_KEY = 'kodon_health_biomarker_trends_v2';

export function loadStoredHealthTrends(): HealthTrendBiomarker[] {
  if (typeof window === 'undefined') return INITIAL_HEALTH_TRENDS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_HEALTH_TRENDS));
      return INITIAL_HEALTH_TRENDS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_HEALTH_TRENDS;
  } catch (e) {
    console.error('Failed to parse stored health trends', e);
    return INITIAL_HEALTH_TRENDS;
  }
}

export function saveHealthTrendsToStorage(data: HealthTrendBiomarker[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save health trends', e);
  }
}
