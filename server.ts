import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { processAiKodanChat } from './server/aiService';
import { checkEmergencySymptoms, VERIFIED_ANALYTES } from './server/clinicalData';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = express();
  app.use(express.json({ limit: '15mb' }));

  // Request logger for AI audit and privacy (stripping PII)
  app.use((req, res, next) => {
    if (req.path.startsWith('/api/ai')) {
      console.log(`[AI-AUDIT] ${req.method} ${req.path} at ${new Date().toISOString()}`);
    }
    next();
  });

  // Health check endpoint
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({
      status: 'healthy',
      brand: 'KODON HEALTHCARE',
      aiEngine: 'AI KODAN',
      location: 'Hyderabad, Telangana, India',
      supportPhone: '8333821121',
      supportEmail: 'kodonhealthcare@gmail.com',
      geminiConfigured: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY'),
    });
  });

  // AI KODAN Conversational Chat Route
  app.post('/api/ai/chat', async (req: Request, res: Response) => {
    try {
      const { messages, language = 'en', userContext } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'Messages array is required' });
      }

      const result = await processAiKodanChat(messages, language, userContext);
      return res.json(result);
    } catch (err: any) {
      console.error('Error in /api/ai/chat:', err);
      return res.status(500).json({
        error: 'Failed to process AI chat response',
        fallback: 'Our medical concierge is available at +91 8333821121 for immediate assistance.',
      });
    }
  });

  // AI Symptom Guidance & Clinical Triage Route
  app.post('/api/ai/symptom-triage', async (req: Request, res: Response) => {
    try {
      const { symptomDescription, duration, age, gender, language = 'en' } = req.body;
      if (!symptomDescription) {
        return res.status(400).json({ error: 'Symptom description is required' });
      }

      // Check immediate red flags
      const emergency = checkEmergencySymptoms(symptomDescription);
      if (emergency.isEmergency) {
        return res.json({
          isEmergency: true,
          emergencyAlert: emergency.advice,
          emergencyHelpline: emergency.emergencyNumber,
          investigations: [],
          disclaimer: 'This symptom indicates an urgent medical situation. Do not delay emergency medical care.',
        });
      }

      // Format query for AI KODAN chat
      const triagePrompt = `Patient profile: Age ${age || 'Not specified'}, Gender ${gender || 'Not specified'}, Duration: ${duration || 'Recent'}.
Symptom description: "${symptomDescription}".
Please provide:
1. Limited clarifying questions to think about.
2. An explanation of common non-urgent causes.
3. Possible laboratory or diagnostic investigations to discuss with their clinician.
4. Specific guidance that this is educational information, not a formal diagnosis.`;

      const result = await processAiKodanChat(
        [{ role: 'user', content: triagePrompt }],
        language
      );

      return res.json({
        isEmergency: false,
        guidance: result.reply,
        suggestedActions: result.suggestedActions,
        disclaimer: 'AI KODAN provides educational guidance only. A qualified physician must evaluate your clinical history before determining appropriate testing or diagnosis.',
      });
    } catch (err: any) {
      console.error('Error in /api/ai/symptom-triage:', err);
      return res.status(500).json({ error: 'Triage processing failed' });
    }
  });

  // AI Test Report Explainer Route
  app.post('/api/ai/report-explain', async (req: Request, res: Response) => {
    try {
      const { rawReportText, extractedAnalytes = [], language = 'en' } = req.body;

      // Match analytes with verified clinical reference database
      const analyzedResults = extractedAnalytes.map((item: any) => {
        const key = item.testKey?.toLowerCase() || '';
        const found = Object.values(VERIFIED_ANALYTES).find(
          (a) => a.aliases.includes(key) || a.name.toLowerCase().includes(key)
        );

        let flag: 'normal' | 'high' | 'low' = 'normal';
        const numVal = parseFloat(item.value);

        // Simple threshold flagging if numeric
        if (found && !isNaN(numVal)) {
          if (found.name.includes('HbA1c')) {
            if (numVal >= 6.5) flag = 'high';
            else if (numVal >= 5.7) flag = 'high';
          } else if (found.name.includes('Creatinine')) {
            if (numVal > 1.3) flag = 'high';
            else if (numVal < 0.5) flag = 'low';
          } else if (found.name.includes('Fasting Blood Glucose')) {
            if (numVal > 100) flag = 'high';
            else if (numVal < 70) flag = 'low';
          } else if (found.name.includes('Hemoglobin')) {
            if (numVal < 12.0) flag = 'low';
          } else if (found.name.includes('TSH')) {
            if (numVal > 4.5) flag = 'high';
            else if (numVal < 0.45) flag = 'low';
          } else if (found.name.includes('Vitamin D')) {
            if (numVal < 20) flag = 'low';
          } else if (found.name.includes('Vitamin B12')) {
            if (numVal < 200) flag = 'low';
          }
        }

        return {
          testName: found ? found.name : item.testName || 'Laboratory Biomarker',
          value: item.value,
          unit: found ? found.unit : item.unit || '',
          referenceRange: found ? found.normalRange : item.referenceRange || 'Lab-specific',
          flag,
          category: found ? found.category : 'General Diagnostics',
          whatItMeasures: found ? found.whatItMeasures : 'Standard clinical analyte.',
          generalExplanation:
            flag === 'high'
              ? found?.highExplanation || 'Value exceeds standard baseline reference interval.'
              : flag === 'low'
              ? found?.lowExplanation || 'Value is below standard baseline reference interval.'
              : 'Within standard reference range reported by accredited laboratory.',
          questionsForDoctor: found?.questionsForDoctor || [
            'How does this result correlate with my symptoms and medical history?',
          ],
        };
      });

      const summaryEn = `Report analysis complete: ${analyzedResults.length} parameter(s) evaluated against standard clinical reference intervals. Please remember that reference intervals vary by laboratory methodology, age, and individual health context. Always consult your treating doctor for definitive clinical diagnosis.`;
      const summaryTe = `రిపోర్ట్ విశ్లేషణ పూర్తయింది: ${analyzedResults.length} పరీక్షా ఫలితాలు పరిశీలించబడ్డాయి. ల్యాబ్ పద్ధతి మరియు వయస్సు ఆధారంగా నార్మల్ రేంజ్‌లు మారవచ్చు. పూర్తి వివరాలకు మీ వైద్యుడిని సంప్రదించండి.`;

      return res.json({
        summary: language === 'te' ? summaryTe : summaryEn,
        results: analyzedResults,
        disclaimer: 'This AI educational report explanation is not a medical diagnosis. Never alter or discontinue prescribed medication without your doctor’s direct supervision.',
      });
    } catch (err: any) {
      console.error('Error in /api/ai/report-explain:', err);
      return res.status(500).json({ error: 'Report explanation failed' });
    }
  });

  // Multi-Partner Diagnostic Price Comparison Data Route
  app.get('/api/partners/compare', (req: Request, res: Response) => {
    res.json({
      lastVerified: '2026-10-25',
      partners: [
        { id: 'kodon', name: 'KoDon Health Care', isDirect: true, homePickupFee: 0, turnaroundHrs: '6-10' },
        { id: 'lupin', name: 'Lupin Diagnostics', isDirect: false, homePickupFee: 0, turnaroundHrs: '8-14' },
        { id: 'tata1mg', name: 'Tata 1mg', isDirect: false, homePickupFee: 100, turnaroundHrs: '12-24' },
        { id: 'thyrocare', name: 'Thyrocare Technologies', isDirect: false, homePickupFee: 150, turnaroundHrs: '24-36' },
        { id: 'healthians', name: 'Healthians', isDirect: false, homePickupFee: 0, turnaroundHrs: '12-24' },
        { id: 'apollo', name: 'Apollo Diagnostics', isDirect: false, homePickupFee: 200, turnaroundHrs: '8-12' },
        { id: 'sprint', name: 'Sprint Diagnostics & Radiology', isDirect: false, homePickupFee: 100, turnaroundHrs: '6-12' },
      ],
      discountRules: {
        kodonMemberDiscountPercent: 15,
        eligibilityNote: 'Configurable 15% KODON discount applied once to authorized base test prices.',
      },
    });
  });

  // Mount Vite or static server
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`[KODON] Server running on port ${PORT} (Prod: ${isProd})`);
  });
}

bootstrap().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
