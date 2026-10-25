import React, { useState } from 'react';
import { X, BookOpen, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

interface EducationalGuidesModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: 'kidney' | 'liver' | 'cardiac' | 'diabetes';
  onNavigateTest: (testId: string) => void;
}

export const EducationalGuidesModal: React.FC<EducationalGuidesModalProps> = ({
  isOpen,
  onClose,
  initialTopic = 'kidney',
  onNavigateTest,
}) => {
  const [activeTopic, setActiveTopic] = useState<'kidney' | 'liver' | 'cardiac' | 'diabetes'>(
    initialTopic
  );

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-[#10243A]/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative border border-slate-200 my-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#087F8C]" />
            <h3 className="text-base font-bold text-[#10243A]">
              Clinical Diagnostic Knowledge Library
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Topic Selector Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl my-4 overflow-x-auto">
          <button
            onClick={() => setActiveTopic('kidney')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer shrink-0 ${
              activeTopic === 'kidney' ? 'bg-[#087F8C] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Kidney (KFT / RFT)
          </button>
          <button
            onClick={() => setActiveTopic('liver')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer shrink-0 ${
              activeTopic === 'liver' ? 'bg-[#087F8C] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Liver (LFT)
          </button>
          <button
            onClick={() => setActiveTopic('cardiac')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer shrink-0 ${
              activeTopic === 'cardiac' ? 'bg-[#087F8C] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Cardiac Markers
          </button>
          <button
            onClick={() => setActiveTopic('diabetes')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer shrink-0 ${
              activeTopic === 'diabetes' ? 'bg-[#087F8C] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Diabetes & Glucose
          </button>
        </div>

        {/* Content Topics */}
        <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
          {activeTopic === 'kidney' && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900">
                Understanding Kidney Function Tests (KFT / RFT)
              </h4>
              <p>
                The kidneys filter approximately 180 liters of fluid each day to excrete toxins and maintain acid-base balance. A standard KFT panel evaluates:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                <li><strong>Serum Creatinine:</strong> Breakdown product of muscle phosphocreatine. Normal range: 0.6–1.2 mg/dL.</li>
                <li><strong>Blood Urea & BUN:</strong> Byproduct of dietary protein metabolism synthesized in the liver and cleared by kidneys.</li>
                <li><strong>Estimated Glomerular Filtration Rate (eGFR):</strong> Algorithmic calculation of nephron filtration speed based on age, gender, and creatinine.</li>
                <li><strong>Urine Albumin-to-Creatinine Ratio (uACR):</strong> Detects microscopic albumin leakage, the earliest sign of diabetic nephropathy.</li>
              </ul>
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900">
                <strong>Clinical Limitation:</strong> Serum creatinine can be falsely elevated by dehydration, rigorous gym workouts, high-protein cooked meat meals, or creatine supplements without true chronic kidney disease. A nephrologist should interpret results alongside clinical symptoms.
              </div>
            </div>
          )}

          {activeTopic === 'liver' && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900">
                Understanding Liver Function Tests (LFT)
              </h4>
              <p>
                The liver is your body's primary biochemical factory. An LFT measures cellular enzyme integrity and bile processing:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                <li><strong>SGPT / ALT:</strong> Highly specific to liver cells; elevates in non-alcoholic fatty liver disease (NAFLD), viral hepatitis, and drug interactions.</li>
                <li><strong>SGOT / AST:</strong> Found in liver, cardiac tissue, and muscles. Evaluated alongside ALT.</li>
                <li><strong>Total & Direct Bilirubin:</strong> Yellow pigment formed from broken-down red blood cells; elevations cause clinical jaundice.</li>
                <li><strong>Alkaline Phosphatase (ALP) & GGTP:</strong> Markers of biliary tract flow and cholestasis.</li>
                <li><strong>Serum Albumin:</strong> Reflects the liver's capacity to synthesize critical blood proteins.</li>
              </ul>
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900">
                <strong>Clinical Limitation:</strong> Normal liver enzymes do not completely exclude mild hepatic steatosis or cirrhosis; ultrasound imaging and physical examination provide essential context.
              </div>
            </div>
          )}

          {activeTopic === 'cardiac' && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900">
                Cardiovascular Assessment & Biomarkers
              </h4>
              <p>
                Comprehensive cardiac evaluation involves lipid fractions, inflammatory biomarkers, and clinical examinations:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                <li><strong>Lipid Profile:</strong> Total Cholesterol, LDL (atherogenic bad cholesterol), HDL (protective good cholesterol), and Triglycerides.</li>
                <li><strong>hs-CRP (High-Sensitivity C-Reactive Protein):</strong> Measures low-grade arterial wall inflammation.</li>
                <li><strong>Homocysteine & Apolipoprotein B:</strong> Advanced atherogenic markers requested by cardiologists for young patients with strong family history.</li>
                <li><strong>12-Lead ECG & 2D Echocardiography:</strong> Non-invasive imaging of electrical conduction and myocardial contraction.</li>
              </ul>
              <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-rose-900">
                <strong>Important Guidance:</strong> Cardiac biomarkers are NOT routine screening tests for every healthy individual. Do not rely on blood tests to rule out acute chest pain or angina; sudden chest pain requires immediate emergency evaluation (Call 108).
              </div>
            </div>
          )}

          {activeTopic === 'diabetes' && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900">
                Diabetes Diagnosis & Glycemic Monitoring
              </h4>
              <p>
                Accurate diabetes assessment combines fasting baselines with long-term glycated hemoglobin indexes:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                <li><strong>Fasting Blood Glucose (FBS):</strong> Plasma sugar after 8 to 10 hours overnight fasting (Normal &lt; 100 mg/dL).</li>
                <li><strong>HbA1c:</strong> Proportion of hemoglobin bonded to glucose over 90 days. Normal &lt; 5.7%; Prediabetes 5.7%–6.4%; Diabetes &ge; 6.5%.</li>
                <li><strong>Post-Prandial Blood Sugar (PPBS):</strong> Measures glucose clearance 2 hours after a standard meal.</li>
              </ul>
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900">
                <strong>Clinical Limitation:</strong> Hemoglobinopathies, iron-deficiency anemia, or recent blood transfusions can alter HbA1c values independent of real blood glucose. Always verify with your diabetologist.
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">Written by KODON MD Pathology Advisory</span>
          <button
            onClick={() => {
              onClose();
              onNavigateTest(activeTopic);
            }}
            className="px-4 py-2 bg-[#087F8C] hover:bg-[#066570] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span>Explore {activeTopic.toUpperCase()} Tests & Packages</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
