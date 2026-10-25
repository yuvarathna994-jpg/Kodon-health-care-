import { GoogleGenAI } from '@google/genai';
import { checkEmergencySymptoms, VERIFIED_ANALYTES } from './clinicalData';

const geminiApiKey = process.env.GEMINI_API_KEY;

let ai: GoogleGenAI | null = null;
if (geminiApiKey && geminiApiKey !== 'MY_GEMINI_API_KEY') {
  try {
    ai = new GoogleGenAI({
      apiKey: geminiApiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.warn('Gemini client initialization failed, fallback engine will be used:', err);
  }
}

const SYSTEM_INSTRUCTION_EN = `You are AI KODAN, an intelligent and medically responsible personal healthcare guide for KODON HEALTHCARE (Hyderabad, Telangana, India). Contact phone: 8333821121, Email: kodonhealthcare@gmail.com.
Core Clinical Directives:
1. You provide educational guidance on diagnostic tests, laboratory parameters, fasting requirements, and general wellness.
2. NEVER claim to be a licensed doctor. NEVER provide a definitive clinical diagnosis.
3. NEVER prescribe prescription medicines, dosages, or alter existing prescriptions.
4. When users present symptoms (e.g. fatigue, fever, weight loss), explain that multiple factors can cause them, ask limited relevant clarifying questions, and outline clinical investigations they can discuss with their physician.
5. If emergency warning signs (chest pain, stroke symptoms, acute dyspnea, severe bleeding, unconsciousness) are mentioned, IMMEDIATELY prioritize urgent emergency care (Call 108 or visit an emergency room) over any test booking or commerce.
6. Hyderabad Context: KODON HEALTHCARE provides certified doorstep blood sample collection across Hitec City, Gachibowli, Banjara Hills, Jubilee Hills, Kukatpally, Secunderabad, Kondapur, and all Hyderabad localities with 6-12 hour digital reports.
7. Tone: Compassionate, medically accurate, clear, trustworthy, and accessible.`;

const SYSTEM_INSTRUCTION_TE = `మీరు AI KODAN (ఏఐ కోడాన్), హైదరాబాద్, తెలంగాణలోని KODON HEALTHCARE వ్యక్తిగత ఆరోగ్య గైడ్.
వైద్య భద్రతా నిబంధనలు:
1. మీరు డయాగ్నస్టిక్ పరీక్షలు, రక్త పరీక్షల వివరాలు, మరియు ల్యాబ్ రిపోర్టుల అర్థాన్ని వివరించే సహాయక ఏఐ గైడ్. మీరు స్వయంగా వైద్యులు కారు.
2. ఎలాంటి ప్రిస్క్రిప్షన్ మందులను సిఫార్సు చేయవద్దు. ఖచ్చితమైన వ్యాధి నిర్ధారణ చేయవద్దు.
3. గుండె నొప్పి, ఊపిరాడకపోవడం, పక్షవాతం లక్షణాలు ఉంటే వెంటనే 108 లేదా సమీప ఆసుపత్రి ఎమర్జెన్సీ విభాగాన్ని సంప్రదించమని హెచ్చరించండి.
4. తెలుగు మరియు ఆంగ్ల పదాలను సులభంగా అర్థమయ్యే రీతిలో సమాధానం ఇవ్వండి.`;

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatResponse {
  reply: string;
  isEmergency: boolean;
  emergencyNotice?: string;
  suggestedActions?: { label: string; actionType: string; payload?: string }[];
  provider: 'gemini-3.8-flash' | 'clinical-rule-engine';
}

export async function processAiKodanChat(
  messages: ChatMessage[],
  language: 'en' | 'te' = 'en',
  userContext?: { recentTests?: string[]; locality?: string }
): Promise<ChatResponse> {
  const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user')?.content || '';

  // 1. Clinical Emergency Pre-Check (Highest Priority)
  const emergencyCheck = checkEmergencySymptoms(lastUserMessage);
  if (emergencyCheck.isEmergency) {
    const reply = language === 'te'
      ? `🚨 అత్యవసర హెచ్చరిక (Emergency Alert): మీరు తెలిపిన లక్షణాలు తీవ్రమైన వైద్య పరిస్థితిని సూచిస్తున్నాయి. దయచేసి వెంటనే 108 అంబులెన్స్ లేదా సమీప అత్యవసర చికిత్స కేంద్రాన్ని సంప్రదించండి. రొటీన్ పరీక్షల కోసం సమయం వృధా చేయవద్దు.`
      : emergencyCheck.advice;

    return {
      reply,
      isEmergency: true,
      emergencyNotice: emergencyCheck.advice,
      suggestedActions: [
        { label: 'Call 108 Ambulance Helpline', actionType: 'emergency_call', payload: '108' },
        { label: 'Emergency Hospital Locator', actionType: 'navigate', payload: 'hospitals' },
      ],
      provider: 'clinical-rule-engine',
    };
  }

  // 2. Try Gemini 3.8 Flash via @google/genai SDK on Server
  if (ai) {
    try {
      const systemInstruction = language === 'te' ? SYSTEM_INSTRUCTION_TE : SYSTEM_INSTRUCTION_EN;
      const conversationHistory = messages.map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: conversationHistory,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const replyText = response.text || '';
      if (replyText.trim().length > 0) {
        return {
          reply: replyText.trim(),
          isEmergency: false,
          suggestedActions: generateContextualActions(lastUserMessage, language),
          provider: 'gemini-3.8-flash',
        };
      }
    } catch (geminiError) {
      console.warn('Gemini generateContent error, executing intelligent clinical fallback:', geminiError);
    }
  }

  // 3. Robust Clinical Rule Fallback Engine
  return generateClinicalRuleFallback(lastUserMessage, language, userContext);
}

function generateContextualActions(query: string, language: 'en' | 'te') {
  const lower = query.toLowerCase();
  const actions: { label: string; actionType: string; payload?: string }[] = [];

  if (lower.includes('report') || lower.includes('result') || lower.includes('రిపోర్ట్')) {
    actions.push({
      label: language === 'te' ? 'ల్యాబ్ రిపోర్ట్ అప్‌లోడ్ చేయండి' : 'Upload Lab Report for Analysis',
      actionType: 'navigate',
      payload: 'report-explainer',
    });
  }

  if (lower.includes('price') || lower.includes('compare') || lower.includes('ధర')) {
    actions.push({
      label: language === 'te' ? 'ల్యాబ్ ధరల పోలిక చూడండి' : 'Compare Diagnostic Partner Prices',
      actionType: 'navigate',
      payload: 'diagnostics',
    });
  }

  if (lower.includes('kidney') || lower.includes('creatinine') || lower.includes('కిడ్నీ')) {
    actions.push({
      label: language === 'te' ? 'కిడ్నీ ఫంక్షన్ గైడ్' : 'Explore Kidney Function Tests',
      actionType: 'navigate',
      payload: 'kidney-guide',
    });
  }

  if (lower.includes('sugar') || lower.includes('diabet') || lower.includes('షుగర్')) {
    actions.push({
      label: language === 'te' ? 'షుగర్ ప్యాకేజీలు' : 'View HbA1c & Diabetes Packages',
      actionType: 'navigate',
      payload: 'packages',
    });
  }

  // Standard safe options
  actions.push({
    label: language === 'te' ? 'హైదరాబాద్ హోమ్ కలెక్షన్ బుక్ చేయండి' : 'Schedule Hyderabad Home Collection',
    actionType: 'open_booking',
  });
  actions.push({
    label: language === 'te' ? 'డాక్టర్ సంప్రదింపు అభ్యర్థించండి' : 'Request Doctor Consultation',
    actionType: 'navigate',
    payload: 'doctors',
  });

  return actions;
}

function generateClinicalRuleFallback(
  query: string,
  language: 'en' | 'te',
  userContext?: { recentTests?: string[]; locality?: string }
): ChatResponse {
  const lower = query.toLowerCase();

  // Fatigue / Tiredness
  if (lower.includes('tired') || lower.includes('fatigue') || lower.includes('weakness') || lower.includes('నీరసం')) {
    const textEn = `Frequent fatigue is a common symptom with many possible underlying causes, including inadequate sleep, high stress, nutritional deficiencies, thyroid irregularities, or early metabolic changes.
Possible initial investigations to discuss with your doctor:
1. Complete Blood Count (CBC) with ESR — to check for anemia or hidden low hemoglobin.
2. Thyroid Profile Total (T3, T4, TSH) — to evaluate whether an underactive thyroid (hypothyroidism) is slowing metabolism.
3. Vitamin D3 & Vitamin B12 — highly prevalent nutritional deficiencies in urban Hyderabad that cause muscle fatigue and low energy.
4. Fasting Blood Glucose & HbA1c — to check blood sugar baselines.
5. Serum Ferritin & Iron Studies — to assess cellular iron reserves.

Next step: Consult a clinician to evaluate your physical history. Would you like to view our full body screening package or schedule a phlebotomist home visit in Hyderabad?`;

    const textTe = `తరచుగా నీరసం మరియు అలసట అనేక కారణాల వల్ల రావచ్చు (రక్తహీనత, థైరాయిడ్ సమస్యలు, లేదా విటమిన్ లోపం).
మీరు వైద్యునితో చర్చించాల్సిన ప్రాథమిక పరీక్షలు:
1. కంప్లీట్ బ్లడ్ కౌంట్ (CBC) — హిమోగ్లోబిన్ మరియు రక్తహీనతను తనిఖీ చేస్తుంది.
2. థైరాయిడ్ ప్రొఫైల్ (TSH) — థైరాయిడ్ పనితీరును పరిశీలిస్తుంది.
3. విటమిన్ డి & విటమిన్ బి12 — ఎముకలు మరియు నరాల బలానికి కీలకం.
4. ఫాస్టింగ్ షుగర్ & HbA1c — మధుమేహ స్క్రీనింగ్.

మా సర్టిఫైడ్ టెక్నీషియన్ ద్వారా మీ ఇంట్లోనే రక్తం నమూనా సేకరణకు బుక్ చేయాలనుకుంటున్నారా?`;

    return {
      reply: language === 'te' ? textTe : textEn,
      isEmergency: false,
      suggestedActions: [
        { label: 'View KoDon Platinum Full Body', actionType: 'view_package', payload: 'pkg-platinum' },
        { label: 'Compare Partner Prices', actionType: 'navigate', payload: 'diagnostics' },
      ],
      provider: 'clinical-rule-engine',
    };
  }

  // Kidney inquiry
  if (lower.includes('kidney') || lower.includes('creatinine') || lower.includes('కిడ్నీ')) {
    const analyte = VERIFIED_ANALYTES.creatinine;
    const textEn = `Kidney Function Tests (KFT/RFT) measure how effectively your nephrons filter metabolic waste from the blood.
Key parameters include:
- Serum Creatinine (Normal: ${analyte.normalRange})
- Blood Urea Nitrogen (BUN) and Blood Urea
- Estimated Glomerular Filtration Rate (eGFR)
- Serum Electrolytes (Sodium, Potassium, Chloride)
- Urine Albumin-to-Creatinine Ratio (uACR) for early microvascular screening.

Note: Dehydration, heavy resistance training, or certain painkillers can temporarily elevate creatinine without permanent kidney disease. Always review abnormal results with a nephrologist or general physician.`;

    const textTe = `కిడ్నీ ఫంక్షన్ టెస్ట్స్ (KFT) మీ మూత్రపిండాల పనితీరును నిర్ధారిస్తాయి.
ప్రధాన పరీక్షలు: సీరం క్రియాటినిన్, బ్లడ్ యూరియా, ఎలక్ట్రోలైట్స్, మరియు eGFR.
నార్మల్ క్రియాటినిన్ లెవెల్ సాధారణంగా 0.6 నుండి 1.2 mg/dL మధ్య ఉంటుంది. నీరు తక్కువ తాగడం లేదా అధిక కసరత్తు వల్ల కూడా స్వల్ప మార్పులు రావచ్చు. ఫలితాలను వైద్యునితో ధృవీకరించుకోవాలి.`;

    return {
      reply: language === 'te' ? textTe : textEn,
      isEmergency: false,
      suggestedActions: [
        { label: 'Book Kidney Function Test (₹499)', actionType: 'add_test', payload: 'test-kft' },
        { label: 'Read Kidney Health Guide', actionType: 'navigate', payload: 'kidney-guide' },
      ],
      provider: 'clinical-rule-engine',
    };
  }

  // Liver inquiry
  if (lower.includes('liver') || lower.includes('sgpt') || lower.includes('sgot') || lower.includes('లివర్')) {
    const textEn = `Liver Function Tests (LFT) screen for hepatic enzyme levels, bile flow, and protein production:
- SGPT (ALT) & SGOT (AST): Enzymes that leak into circulation during liver stress or fatty infiltration.
- Total & Direct Bilirubin: Clearance of broken-down hemoglobin.
- Alkaline Phosphatase (ALP) & GGTP: Bile duct and hepatic clearance markers.
- Serum Albumin & Total Protein: Synthetic capacity of the liver.

Common non-alcoholic fatty liver disease (NAFLD) can be monitored with regular LFTs, lifestyle modifications, and an abdominal ultrasound scan.`;

    const textTe = `లివర్ ఫంక్షన్ టెస్ట్ (LFT) కాలేయ ఆరోగ్యాన్ని అంచనా వేస్తుంది.
ఇందులో SGPT, SGOT ఎంజైమ్‌లు, బిలిరుబిన్ (కామెర్లు నిర్ధారణకు) మరియు సీరం ప్రోటీన్స్ ఉంటాయి. ఫ్యాటీ లివర్ ఉన్నవారిలో SGPT స్థాయిలు పెరగవచ్చు. ఆరోగ్యకరమైన జీవనశైలి మరియు వైద్యుల సలహా అవసరం.`;

    return {
      reply: language === 'te' ? textTe : textEn,
      isEmergency: false,
      suggestedActions: [
        { label: 'Book LFT Comprehensive (₹499)', actionType: 'add_test', payload: 'test-lft' },
        { label: 'Explore Liver Health Guide', actionType: 'navigate', payload: 'liver-guide' },
      ],
      provider: 'clinical-rule-engine',
    };
  }

  // Diabetes inquiry
  if (lower.includes('sugar') || lower.includes('diabetes') || lower.includes('hba1c') || lower.includes('షుగర్')) {
    const textEn = `For diabetes evaluation and metabolic monitoring, clinical guidelines recommend:
- Fasting Blood Sugar (FBS): Requires 8-10 hours fasting (Normal: 70-99 mg/dL).
- HbA1c (Glycated Hemoglobin): Does not require fasting (Normal: below 5.7%; 5.7%-6.4% Prediabetes; >= 6.5% Diabetes). Reflects 3-month average glucose.
- Post-Prandial Blood Sugar (PPBS): Taken 2 hours after a standard meal.

Would you like to compare diabetic package prices across Tata 1mg, Thyrocare, and Apollo Diagnostics?`;

    const textTe = `షుగర్ (మధుమేహం) నియంత్రణకు రెండు కీలక పరీక్షలు ఉన్నాయి:
1. ఫాస్టింగ్ బ్లడ్ షుగర్ (8-10 గంటల ఉపవాసం అవసరం).
2. HbA1c - గత 3 నెలల సగటు షుగర్ స్థాయిని తెలియజేస్తుంది (ఉపవాసం అవసరం లేదు).
నార్మల్ HbA1c 5.7% కంటే తక్కువగా ఉండాలి.`;

    return {
      reply: language === 'te' ? textTe : textEn,
      isEmergency: false,
      suggestedActions: [
        { label: 'Book HbA1c Test (₹349)', actionType: 'add_test', payload: 'test-hba1c' },
        { label: 'View Diabetic Health Package', actionType: 'view_package', payload: 'pkg-cardiac-diabetes' },
      ],
      provider: 'clinical-rule-engine',
    };
  }

  // General helpful response
  const generalEn = `Namaste! I am AI KODAN, your personal healthcare guide at KODON HEALTHCARE Hyderabad.
I can help you:
1. Understand diagnostic test parameters and fasting preparation.
2. Compare verified pricing across Tata 1mg, Thyrocare, Healthians, and Apollo Diagnostics.
3. Explain laboratory test reports in simple English and Telugu.
4. Schedule painless doorstep phlebotomy with cold-chain sample transit across Hyderabad.
5. Request teleconsultations, radiology scans, or medicine assistance.

How can I assist your health journey today? (Feel free to ask in English or Telugu).`;

  const generalTe = `నమస్కారం! నేను AI KODAN, కోడాన్ హెల్త్‌కేర్ పర్సనల్ హెల్త్‌కేర్ అసిస్టెంట్.
నేను మీకు సహాయం చేయగలను:
1. రక్త పరీక్షల వివరాలు మరియు ఉపవాస నియమాలు తెలుసుకోవడం.
2. టాటా 1mg, థైరోకేర్, అపోలో డయాగ్నస్టిక్స్ ధరలను సరిపోల్చడం.
3. మీ ల్యాబ్ రిపోర్టులను సులభంగా అర్థం చేసుకోవడం.
4. హైదరాబాద్ నగరంలో ఉచిత హోమ్ బ్లడ్ శాంపిల్ కలెక్షన్ బుక్ చేయడం.

మీకు ఏ సమాచారం కావాలి? దయచేసి అడగండి.`;

  return {
    reply: language === 'te' ? generalTe : generalEn,
    isEmergency: false,
    suggestedActions: [
      { label: 'Compare Diagnostic Test Prices', actionType: 'navigate', payload: 'diagnostics' },
      { label: 'Explain My Lab Report', actionType: 'navigate', payload: 'report-explainer' },
      { label: 'View Full Body Checkup Packages', actionType: 'navigate', payload: 'packages' },
    ],
    provider: 'clinical-rule-engine',
  };
}
