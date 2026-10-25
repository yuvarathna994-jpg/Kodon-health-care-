export interface ClinicalEmergencyCheck {
  isEmergency: boolean;
  emergencyType?: string;
  advice: string;
  emergencyNumber: string;
}

export const EMERGENCY_KEYWORDS = [
  'chest pain',
  'heart attack',
  'crushing chest pressure',
  'left arm pain',
  'sudden severe headache',
  'paralysis',
  'facial drooping',
  'slurred speech',
  'difficulty breathing',
  'gasping for air',
  'coughing blood',
  'unconscious',
  'fainting repeatedly',
  'seizure',
  'severe burn',
  'high fever with stiff neck',
  'severe allergic reaction',
  'anaphylaxis',
  'suicide',
  'suicidal',
];

export function checkEmergencySymptoms(text: string): ClinicalEmergencyCheck {
  const lower = text.toLowerCase();
  for (const kw of EMERGENCY_KEYWORDS) {
    if (lower.includes(kw)) {
      return {
        isEmergency: true,
        emergencyType: kw,
        advice: `EMERGENCY ALERT: The symptoms you described ("${kw}") could indicate a life-threatening medical emergency. Please seek immediate emergency medical care or call 108 (National Ambulance Helpline in Hyderabad) or visit the nearest emergency room immediately. Do not delay urgent care to schedule routine blood tests.`,
        emergencyNumber: '108 (Ambulance) / 112 (National Emergency)',
      };
    }
  }
  return {
    isEmergency: false,
    advice: '',
    emergencyNumber: '108',
  };
}

export interface AnalyteReference {
  name: string;
  aliases: string[];
  unit: string;
  normalRange: string;
  category: string;
  whatItMeasures: string;
  highExplanation: string;
  lowExplanation: string;
  questionsForDoctor: string[];
}

export const VERIFIED_ANALYTES: Record<string, AnalyteReference> = {
  hba1c: {
    name: 'HbA1c (Glycated Hemoglobin)',
    aliases: ['hba1c', 'glycated hemoglobin', 'a1c'],
    unit: '%',
    normalRange: 'Below 5.7% (Normal), 5.7% - 6.4% (Prediabetes), >= 6.5% (Diabetes)',
    category: 'Diabetes Assessment',
    whatItMeasures: 'Average blood glucose level attached to hemoglobin proteins over the past 90 days.',
    highExplanation: 'Elevated HbA1c points to sustained hyperglycemia (elevated blood sugar) or prediabetes/diabetes.',
    lowExplanation: 'Unusually low HbA1c can occur with chronic anemia, recent blood loss, or severe hypoglycemia.',
    questionsForDoctor: [
      'What is my individualized HbA1c target based on my age and medical history?',
      'Do I need lifestyle modifications, medication review, or fasting/postprandial glucose tracking?',
    ],
  },
  fbs: {
    name: 'Fasting Blood Glucose (FBS)',
    aliases: ['fbs', 'fasting blood sugar', 'fasting glucose'],
    unit: 'mg/dL',
    normalRange: '70 - 99 mg/dL',
    category: 'Diabetes Assessment',
    whatItMeasures: 'Baseline blood plasma sugar level after at least 8 to 10 hours of fasting.',
    highExplanation: 'Fasting glucose above 100 mg/dL may indicate impaired fasting glucose or diabetes.',
    lowExplanation: 'Levels below 70 mg/dL indicate hypoglycemia, which can cause shakiness, sweating, or lightheadedness.',
    questionsForDoctor: [
      'Should we verify this with a post-prandial (PPBS) or HbA1c test?',
      'How does my timing of medication affect this reading?',
    ],
  },
  creatinine: {
    name: 'Serum Creatinine',
    aliases: ['creatinine', 'serum creatinine'],
    unit: 'mg/dL',
    normalRange: '0.6 - 1.2 mg/dL (Adults)',
    category: 'Kidney Function Test',
    whatItMeasures: 'A natural muscle breakdown waste product filtered exclusively by healthy kidney glomeruli.',
    highExplanation: 'Elevated levels may reflect reduced renal filtration, dehydration, strenuous exercise, or certain medications.',
    lowExplanation: 'Lower levels are often associated with low muscle mass, strict vegetarian diet, or advanced age.',
    questionsForDoctor: [
      'What is my calculated estimated Glomerular Filtration Rate (eGFR)?',
      'Should I do a Urine Albumin-Creatinine Ratio (uACR) test to check microvascular kidney health?',
    ],
  },
  egfr: {
    name: 'Estimated Glomerular Filtration Rate (eGFR)',
    aliases: ['egfr', 'gfr'],
    unit: 'mL/min/1.73m²',
    normalRange: '> 90 mL/min/1.73m² (Normal)',
    category: 'Kidney Function Test',
    whatItMeasures: 'Calculated efficiency of kidney nephrons filtering blood per minute.',
    highExplanation: 'Normal kidney filtration efficiency.',
    lowExplanation: 'Values below 60 mL/min for 3+ months indicate chronic kidney disease (CKD) stages.',
    questionsForDoctor: [
      'What stage of kidney function does my eGFR represent?',
      'Are any of my current prescription medications nephrotoxic?',
    ],
  },
  sgpt_alt: {
    name: 'SGPT / ALT (Alanine Aminotransferase)',
    aliases: ['sgpt', 'alt', 'alanine aminotransferase'],
    unit: 'U/L',
    normalRange: '7 - 56 U/L',
    category: 'Liver Function Test',
    whatItMeasures: 'Enzyme produced inside liver cells (hepatocytes); leaks into bloodstream during hepatic stress.',
    highExplanation: 'Can indicate fatty liver (NAFLD), viral hepatitis, alcohol use, or medication reaction.',
    lowExplanation: 'Low values are normal and clinically insignificant.',
    questionsForDoctor: [
      'Is my elevated SGPT related to fatty liver or medications I am taking?',
      'Do I need an abdominal ultrasound scan?',
    ],
  },
  sgot_ast: {
    name: 'SGOT / AST (Aspartate Aminotransferase)',
    aliases: ['sgot', 'ast', 'aspartate aminotransferase'],
    unit: 'U/L',
    normalRange: '10 - 40 U/L',
    category: 'Liver & Heart Function',
    whatItMeasures: 'Enzyme present in liver, heart, and skeletal muscle cells.',
    highExplanation: 'May reflect liver inflammation, muscle injury, strenuous workouts, or cardiac tissue stress.',
    lowExplanation: 'Low values are healthy and standard.',
    questionsForDoctor: [
      'What is my AST to ALT ratio?',
      'Should we check cardiac or muscle enzymes like CK-MB if muscle soreness is present?',
    ],
  },
  bilirubin_total: {
    name: 'Bilirubin Total',
    aliases: ['bilirubin', 'total bilirubin'],
    unit: 'mg/dL',
    normalRange: '0.2 - 1.2 mg/dL',
    category: 'Liver Function Test',
    whatItMeasures: 'Yellow breakdown byproduct of red blood cell hemoglobin processed and cleared by the liver.',
    highExplanation: 'Values above 1.5 - 2.0 mg/dL can cause mild scleral jaundice, bile duct obstruction, or hemolysis (e.g. Gilbert syndrome).',
    lowExplanation: 'Low bilirubin has no negative diagnostic significance.',
    questionsForDoctor: [
      'Is the elevation in conjugated (direct) or unconjugated (indirect) bilirubin?',
      'Do I have any bile flow or gallstone concerns?',
    ],
  },
  tsh: {
    name: 'Thyroid Stimulating Hormone (TSH)',
    aliases: ['tsh', 'thyroid stimulating hormone'],
    unit: 'mIU/L',
    normalRange: '0.45 - 4.5 mIU/L',
    category: 'Thyroid Profile',
    whatItMeasures: 'Pituitary gland hormone signaling the thyroid gland to produce metabolic hormones T3 and T4.',
    highExplanation: 'Elevated TSH indicates primary hypothyroidism (underactive thyroid), causing tiredness, weight gain, or cold sensitivity.',
    lowExplanation: 'Suppressed TSH indicates hyperthyroidism (overactive thyroid), causing palpitations, heat intolerance, or anxiety.',
    questionsForDoctor: [
      'Should we check Free T3 and Free T4 levels?',
      'Could my symptoms of fatigue and weight change be directly tied to this TSH reading?',
    ],
  },
  hemoglobin: {
    name: 'Hemoglobin (Hb)',
    aliases: ['hemoglobin', 'hb'],
    unit: 'g/dL',
    normalRange: '13.0 - 17.0 g/dL (Men), 12.0 - 15.5 g/dL (Women)',
    category: 'Complete Blood Count (CBC)',
    whatItMeasures: 'Iron-rich oxygen-transporting protein inside red blood cells.',
    highExplanation: 'Can be caused by chronic dehydration, smoking, high altitude, or polycythemia.',
    lowExplanation: 'Indicates anemia, which leads to fatigue, pale conjunctiva, shortness of breath, and brain fog.',
    questionsForDoctor: [
      'Is my low hemoglobin due to iron deficiency, B12 deficiency, or blood loss?',
      'Should we test Serum Ferritin and Iron profile?',
    ],
  },
  platelets: {
    name: 'Platelet Count',
    aliases: ['platelets', 'platelet count', 'thrombocytes'],
    unit: 'cells/mcL',
    normalRange: '150,000 - 450,000 /mcL',
    category: 'Complete Blood Count (CBC)',
    whatItMeasures: 'Cell fragments essential for normal blood clotting and vascular repair.',
    highExplanation: 'Thrombocytosis can be an inflammatory response or bone marrow condition.',
    lowExplanation: 'Thrombocytopenia can occur during acute viral fevers (e.g., Dengue), immune disorders, or spleen enlargement.',
    questionsForDoctor: [
      'Do I need rapid Dengue NS1 testing if I currently have a fever?',
      'Should I repeat the count within 24-48 hours to check trend?',
    ],
  },
  vitamin_d: {
    name: 'Vitamin D (25-OH Total)',
    aliases: ['vitamin d', 'vit d', '25-oh vitamin d'],
    unit: 'ng/mL',
    normalRange: '30 - 100 ng/mL (Sufficient), 20 - 30 (Insufficient), < 20 (Deficient)',
    category: 'Vitamins & Bone Health',
    whatItMeasures: 'Circulating storage form of Vitamin D essential for calcium homeostasis and immune regulation.',
    highExplanation: 'Excessive levels from high-dose unregulated supplementation.',
    lowExplanation: 'Extremely common in indoor urban dwellers, leading to bone ache, joint pain, muscle weakness, and fatigue.',
    questionsForDoctor: [
      'What weekly oral therapeutic supplement dose (e.g. 60,000 IU) do you recommend for me?',
      'Should I combine it with calcium intake?',
    ],
  },
  vitamin_b12: {
    name: 'Vitamin B12 (Cyanocobalamin)',
    aliases: ['vitamin b12', 'vit b12', 'b12', 'cobalamin'],
    unit: 'pg/mL',
    normalRange: '200 - 900 pg/mL',
    category: 'Vitamins & Nerve Health',
    whatItMeasures: 'Essential co-factor for neurological myelin sheath maintenance and red blood cell maturation.',
    highExplanation: 'High levels can happen with liver disease or high supplementation.',
    lowExplanation: 'Causes peripheral neuropathy (tingling in feet/hands), memory lapses, glossitis (sore tongue), and megaloblastic anemia.',
    questionsForDoctor: [
      'Does my vegetarian/vegan diet require oral or sublingual B12 maintenance?',
      'Could my hand/foot tingling be caused by this level?',
    ],
  },
  cholesterol_total: {
    name: 'Total Cholesterol',
    aliases: ['cholesterol', 'total cholesterol'],
    unit: 'mg/dL',
    normalRange: '< 200 mg/dL (Desirable), 200 - 239 (Borderline), >= 240 (High)',
    category: 'Lipid Profile',
    whatItMeasures: 'Sum of all circulating cholesterol lipoproteins in the bloodstream.',
    highExplanation: 'Contributes to arterial atheroma plaque deposition, elevating coronary artery disease risk.',
    lowExplanation: 'Very low levels are seen in severe malnutrition or chronic malabsorption.',
    questionsForDoctor: [
      'What is my LDL (bad) vs HDL (good) cholesterol breakdown?',
      'What is my 10-year cardiovascular risk score?',
    ],
  },
};
