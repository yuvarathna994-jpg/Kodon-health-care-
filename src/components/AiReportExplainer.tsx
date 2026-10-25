import React, { useState } from 'react';
import {
  FileText,
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Download,
  Trash2,
  Globe,
  Sparkles,
  HelpCircle,
  Shield,
  FileCheck2,
  TrendingUp,
  Activity,
} from 'lucide-react';
import { AnalyteReportExtraction } from '../types';
import { HealthTrendsTracker } from './HealthTrendsTracker';

interface AiReportExplainerProps {
  onScheduleTest?: (testName: string) => void;
  onConsultDoctor?: () => void;
}

export const AiReportExplainer: React.FC<AiReportExplainerProps> = ({
  onScheduleTest,
  onConsultDoctor,
}) => {
  const [activeView, setActiveView] = useState<'explain' | 'trends'>('explain');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [language, setLanguage] = useState<'en' | 'te'>('en');
  const [analyzing, setAnalyzing] = useState(false);
  const [hasConfirmedExtraction, setHasConfirmedExtraction] = useState(false);

  // Extracted analytes editable by user before deep clinical analysis
  const [extractedAnalytes, setExtractedAnalytes] = useState<
    { testKey: string; testName: string; value: string; unit: string; referenceRange: string }[]
  >([
    { testKey: 'hba1c', testName: 'HbA1c (Glycated Hemoglobin)', value: '6.8', unit: '%', referenceRange: '< 5.7%' },
    { testKey: 'vitamin_d', testName: 'Vitamin D (25-OH Total)', value: '16.4', unit: 'ng/mL', referenceRange: '30 - 100 ng/mL' },
    { testKey: 'creatinine', testName: 'Serum Creatinine', value: '0.9', unit: 'mg/dL', referenceRange: '0.6 - 1.2 mg/dL' },
    { testKey: 'tsh', testName: 'Thyroid Stimulating Hormone (TSH)', value: '3.1', unit: 'mIU/L', referenceRange: '0.45 - 4.5 mIU/L' },
  ]);

  const [analysisResults, setAnalysisResults] = useState<AnalyteReportExtraction[] | null>(null);
  const [summaryText, setSummaryText] = useState<string>('');
  const [demoSelected, setDemoSelected] = useState<string>('diabetic-deficiency');

  const sampleDemoReports = [
    {
      id: 'diabetic-deficiency',
      title: 'Sample Report A: High HbA1c & Low Vitamin D',
      analytes: [
        { testKey: 'hba1c', testName: 'HbA1c', value: '6.8', unit: '%', referenceRange: '< 5.7%' },
        { testKey: 'vitamin_d', testName: 'Vitamin D (25-OH)', value: '16.4', unit: 'ng/mL', referenceRange: '30 - 100 ng/mL' },
        { testKey: 'creatinine', testName: 'Serum Creatinine', value: '0.9', unit: 'mg/dL', referenceRange: '0.6 - 1.2 mg/dL' },
      ],
    },
    {
      id: 'elevated-liver-enzymes',
      title: 'Sample Report B: Elevated SGPT/ALT & Mild Cholesterol',
      analytes: [
        { testKey: 'sgpt_alt', testName: 'SGPT / ALT', value: '68', unit: 'U/L', referenceRange: '7 - 56 U/L' },
        { testKey: 'cholesterol_total', testName: 'Total Cholesterol', value: '235', unit: 'mg/dL', referenceRange: '< 200 mg/dL' },
        { testKey: 'bilirubin_total', testName: 'Total Bilirubin', value: '0.9', unit: 'mg/dL', referenceRange: '0.2 - 1.2 mg/dL' },
      ],
    },
    {
      id: 'normal-wellness',
      title: 'Sample Report C: Normal Routine Wellness Screen',
      analytes: [
        { testKey: 'hemoglobin', testName: 'Hemoglobin', value: '14.2', unit: 'g/dL', referenceRange: '13.0 - 17.0 g/dL' },
        { testKey: 'tsh', testName: 'TSH', value: '2.4', unit: 'mIU/L', referenceRange: '0.45 - 4.5 mIU/L' },
        { testKey: 'creatinine', testName: 'Serum Creatinine', value: '0.8', unit: 'mg/dL', referenceRange: '0.6 - 1.2 mg/dL' },
      ],
    },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
      setAnalysisResults(null);
      setHasConfirmedExtraction(false);
    }
  };

  const handleSelectDemo = (demoId: string) => {
    const demo = sampleDemoReports.find((d) => d.id === demoId);
    if (demo) {
      setDemoSelected(demoId);
      setExtractedAnalytes(demo.analytes);
      setAnalysisResults(null);
      setHasConfirmedExtraction(false);
    }
  };

  const handleAnalyze = async () => {
    setAnalyzing(true);
    try {
      const response = await fetch('/api/ai/report-explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          extractedAnalytes,
          language,
        }),
      });

      const data = await response.json();
      setAnalysisResults(data.results || []);
      setSummaryText(data.summary || '');
      setHasConfirmedExtraction(true);
    } catch (err) {
      console.error('Report analysis error:', err);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleDeleteData = () => {
    setUploadedFile(null);
    setAnalysisResults(null);
    setHasConfirmedExtraction(false);
  };

  const handleDownloadEducationalSummary = () => {
    if (!analysisResults) return;
    const content = `KODON HEALTHCARE — AI KODAN EDUCATIONAL REPORT EXPLANATION
Date: ${new Date().toLocaleDateString('en-IN')}
Language: ${language === 'te' ? 'Telugu / English' : 'English'}
Disclaimers: This document is an educational explanation of reported values. It is NOT a medical diagnosis.

SUMMARY:
${summaryText}

ANALYTE EVALUATION:
${analysisResults
  .map(
    (item, idx) => `
${idx + 1}. ${item.testName}
   - Reported Value: ${item.value} ${item.unit}
   - Laboratory Reference Range: ${item.referenceRange}
   - Status: ${item.flag.toUpperCase()}
   - What It Measures: ${item.whatItMeasures}
   - Clinical Insight: ${item.generalExplanation}
   - Questions to Ask Your Doctor:
     ${item.questionsForDoctor.map((q) => `* ${q}`).join('\n     ')}
`
  )
  .join('\n')}

For clinical support, consultation, or home blood sample pickup in Hyderabad, call +91 83338 21121 or email kodonhealthcare@gmail.com.
`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `KODON_Report_Education_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="report-explainer" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs uppercase font-bold tracking-wider text-[#087F8C]">
              Understand My Lab Report
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#10243A] mt-1 tracking-tight">
              AI Test Report Explainer
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Upload blood or pathology reports from any accredited Hyderabad laboratory. AI KODAN parses values, explains what each parameter measures, and provides doctor discussion points in English and Telugu.
            </p>
          </div>

          {/* Language Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600">Explanation Language:</span>
            <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  language === 'en' ? 'bg-[#087F8C] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('te')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  language === 'te' ? 'bg-[#087F8C] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                తెలుగు (Telugu)
              </button>
            </div>
          </div>
        </div>

        {/* View Switcher: Single Report Explanation vs Longitudinal Health Improvement Graph */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
          <div className="inline-flex p-1 bg-slate-100 rounded-2xl border border-slate-200">
            <button
              onClick={() => setActiveView('explain')}
              className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeView === 'explain'
                  ? 'bg-[#10243A] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileCheck2 className="w-4 h-4 text-emerald-400" />
              <span>AI Report Explainer (Single Upload)</span>
            </button>
            <button
              onClick={() => setActiveView('trends')}
              className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeView === 'trends'
                  ? 'bg-[#10243A] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-[#087F8C]" />
              <span>Past Reports & Improvement Graph</span>
            </button>
          </div>

          <div className="text-xs text-slate-500 flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#087F8C]" />
            <span>NABL & ICMR Validated Diagnostic Parsing</span>
          </div>
        </div>

        {activeView === 'trends' ? (
          <HealthTrendsTracker
            onBookTest={onScheduleTest}
            onConsultDoctor={onConsultDoctor}
          />
        ) : (
          /* Upload & Demo Selector Grid */
          <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Upload / Demo selection */}
          <div className="lg:col-span-5 space-y-5">
            <div className="p-6 rounded-2xl border-2 border-dashed border-slate-300 hover:border-[#087F8C] bg-slate-50 text-center transition-colors">
              <UploadCloud className="w-10 h-10 text-[#087F8C] mx-auto mb-2" />
              <h3 className="text-sm font-bold text-slate-900">Upload PDF or Image Report</h3>
              <p className="text-[11px] text-slate-500 mt-1">
                Upload your lab slip (PDF, JPG, PNG). Data stays confidential and can be deleted anytime.
              </p>

              <label className="mt-4 inline-block bg-[#10243A] hover:bg-[#087F8C] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs">
                Browse Report File
                <input
                  type="file"
                  accept="application/pdf,image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              {uploadedFile && (
                <div className="mt-3 p-2 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800 flex items-center justify-between">
                  <span className="truncate max-w-[200px] font-semibold">{uploadedFile.name}</span>
                  <button onClick={handleDeleteData} className="text-rose-600 p-1 hover:underline">
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Quick Demo Pre-loaded Reports */}
            <div className="bg-[#F4F8FB] p-5 rounded-2xl border border-slate-200">
              <div className="text-xs font-bold text-slate-800 mb-2.5 flex items-center gap-1.5">
                <FileCheck2 className="w-4 h-4 text-[#087F8C]" />
                <span>Or Explore With Verified Sample Reports:</span>
              </div>
              <div className="space-y-2">
                {sampleDemoReports.map((demo) => {
                  const isSelected = demoSelected === demo.id;
                  return (
                    <button
                      key={demo.id}
                      onClick={() => handleSelectDemo(demo.id)}
                      className={`w-full text-left p-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#087F8C] bg-white text-[#087F8C] shadow-xs ring-1 ring-[#087F8C]/30'
                          : 'border-slate-200 bg-white/70 hover:bg-white text-slate-700'
                      }`}
                    >
                      {demo.title}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Educational Disclaimer */}
            <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
              <Shield className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <p className="text-[11px] leading-relaxed">
                <strong>Medical Responsibility:</strong> Laboratory reference ranges vary by analyzer methodology, age, sex, and fasting duration. This tool explains concepts in layman terms and does not replace your treating doctor's clinical judgment.
              </p>
            </div>
          </div>

          {/* Right Column: Analyte Confirmation & AI Explanation Output */}
          <div className="lg:col-span-7">
            
            {/* Step 1: Confirmation Table */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 mb-6">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    Extracted Analytes & Reference Intervals
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Verify values before AI analysis (you can edit any value if OCR was uncertain)
                  </p>
                </div>
                <button
                  onClick={handleAnalyze}
                  disabled={analyzing}
                  className="bg-[#087F8C] hover:bg-[#066570] disabled:bg-slate-300 text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{analyzing ? 'Analyzing...' : 'Generate AI Explanation'}</span>
                </button>
              </div>

              <div className="space-y-2 max-h-56 overflow-y-auto">
                {extractedAnalytes.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs"
                  >
                    <span className="font-semibold text-slate-800 flex-1 truncate">{item.testName}</span>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        value={item.value}
                        onChange={(e) => {
                          const updated = [...extractedAnalytes];
                          updated[idx].value = e.target.value;
                          setExtractedAnalytes(updated);
                        }}
                        className="w-16 px-2 py-1 text-xs border border-slate-200 rounded font-bold text-slate-900 text-center bg-slate-50"
                      />
                      <span className="text-slate-500 text-[11px] w-12">{item.unit}</span>
                      <span className="text-slate-400 text-[11px]">Ref: {item.referenceRange}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 2: Clinical Output View */}
            {analysisResults && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5 animate-in fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <h3 className="font-bold text-slate-900 text-base">
                      {language === 'te' ? 'ల్యాబ్ రిపోర్ట్ విశ్లేషణ' : 'Educational Diagnostic Breakdown'}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleDownloadEducationalSummary}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Summary</span>
                    </button>
                    <button
                      onClick={handleDeleteData}
                      title="Clear analysis & delete session"
                      className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-[#F4F8FB] rounded-xl text-xs text-slate-700 leading-relaxed border border-slate-200/60">
                  {summaryText}
                </div>

                <div className="space-y-4">
                  {analysisResults.map((result, idx) => {
                    const isHigh = result.flag === 'high';
                    const isLow = result.flag === 'low';
                    const isNormal = result.flag === 'normal';

                    return (
                      <div
                        key={idx}
                        className={`p-4 rounded-2xl border ${
                          isHigh
                            ? 'border-amber-300 bg-amber-50/20'
                            : isLow
                            ? 'border-blue-300 bg-blue-50/20'
                            : 'border-slate-200 bg-white'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="text-[11px] font-semibold text-slate-400">
                              {result.category}
                            </div>
                            <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                              {result.testName}
                            </h4>
                          </div>

                          <span
                            className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                              isHigh
                                ? 'bg-amber-100 text-amber-800'
                                : isLow
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {isHigh
                              ? language === 'te'
                                ? 'ఎక్కువ (High)'
                                : 'Above Reference Range'
                              : isLow
                              ? language === 'te'
                                ? 'తక్కువ (Low)'
                                : 'Below Reference Range'
                              : language === 'te'
                              ? 'సాధారణం (Normal)'
                              : 'Within Normal Range'}
                          </span>
                        </div>

                        <div className="mt-3 flex items-baseline gap-3 text-xs">
                          <div>
                            <span className="text-slate-500">Reported Value: </span>
                            <span className="font-bold text-slate-900 tabular-nums">
                              {result.value} {result.unit}
                            </span>
                          </div>
                          <span className="text-slate-300">·</span>
                          <div>
                            <span className="text-slate-500">Reference Interval: </span>
                            <span className="text-slate-700 tabular-nums">{result.referenceRange}</span>
                          </div>
                        </div>

                        <div className="mt-2.5 text-xs text-slate-600 leading-relaxed">
                          <strong>What it measures:</strong> {result.whatItMeasures}
                        </div>

                        <div className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                          <strong>General insight:</strong> {result.generalExplanation}
                        </div>

                        {result.questionsForDoctor && result.questionsForDoctor.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-slate-100">
                            <div className="text-[11px] font-bold text-slate-700 flex items-center gap-1 mb-1">
                              <HelpCircle className="w-3.5 h-3.5 text-[#087F8C]" />
                              <span>Questions to discuss with your doctor:</span>
                            </div>
                            <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                              {result.questionsForDoctor.map((q, qIdx) => (
                                <li key={qIdx}>{q}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Footer action strip */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <span className="text-slate-500">Need clinical correlation?</span>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    {onConsultDoctor && (
                      <button
                        onClick={onConsultDoctor}
                        className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-[#10243A] hover:bg-slate-800 text-white font-bold transition-colors cursor-pointer"
                      >
                        Book Doctor Consultation
                      </button>
                    )}
                    {onScheduleTest && (
                      <button
                        onClick={() => onScheduleTest('Follow-up Test')}
                        className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-[#087F8C] hover:bg-[#066570] text-white font-bold transition-colors cursor-pointer"
                      >
                        Book Retest / Home Pickup
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {!analysisResults && (
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 text-center text-slate-400">
                <FileText className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                <h4 className="font-bold text-slate-700 text-sm">No report analyzed yet</h4>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  Click 'Generate AI Explanation' above or select a sample report to see how AI KODAN explains your diagnostic values.
                </p>
              </div>
            )}

          </div>

        </div>
        )}

      </div>
    </section>
  );
};
