import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  Plus,
  CheckCircle2,
  AlertCircle,
  Activity,
  Award,
  Sparkles,
  Info,
  ArrowRight,
  RefreshCw,
  Building2,
  FileText,
} from 'lucide-react';
import { HealthTrendBiomarker, BiomarkerReading } from '../types';
import {
  INITIAL_HEALTH_TRENDS,
  loadStoredHealthTrends,
  saveHealthTrendsToStorage,
} from '../data/healthTrendsData';

interface HealthTrendsTrackerProps {
  onBookTest?: (testName: string) => void;
  onConsultDoctor?: () => void;
}

export const HealthTrendsTracker: React.FC<HealthTrendsTrackerProps> = ({
  onBookTest,
  onConsultDoctor,
}) => {
  const [trends, setTrends] = useState<HealthTrendBiomarker[]>([]);
  const [selectedBiomarkerId, setSelectedBiomarkerId] = useState<string>('hba1c');
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  // New reading form state
  const [newDate, setNewDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [newValue, setNewValue] = useState<string>('');
  const [newLab, setNewLab] = useState<string>('Lupin Diagnostics');
  const [newNotes, setNewNotes] = useState<string>('');
  const [formError, setFormError] = useState<string>('');

  useEffect(() => {
    const loaded = loadStoredHealthTrends();
    setTrends(loaded);
  }, []);

  const activeBiomarker = trends.find((b) => b.id === selectedBiomarkerId) || trends[0];

  const handleAddReading = (e: React.FormEvent) => {
    e.preventDefault();
    const valNum = parseFloat(newValue);
    if (isNaN(valNum) || valNum <= 0) {
      setFormError('Please enter a valid numeric test result');
      return;
    }
    if (!newDate) {
      setFormError('Please select the date of your report');
      return;
    }

    const formattedLabel = new Date(newDate).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    const newReading: BiomarkerReading = {
      id: `reading-${Date.now()}`,
      date: newDate,
      label: formattedLabel,
      value: valNum,
      unit: activeBiomarker.unit,
      labName: newLab,
      notes: newNotes.trim() || undefined,
    };

    const updatedTrends = trends.map((b) => {
      if (b.id === activeBiomarker.id) {
        const sortedReadings = [...b.readings, newReading].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        return {
          ...b,
          readings: sortedReadings,
        };
      }
      return b;
    });

    setTrends(updatedTrends);
    saveHealthTrendsToStorage(updatedTrends);
    setNewValue('');
    setNewNotes('');
    setShowAddForm(false);
    setFormError('');
  };

  const handleResetDefaults = () => {
    setTrends(INITIAL_HEALTH_TRENDS);
    saveHealthTrendsToStorage(INITIAL_HEALTH_TRENDS);
  };

  if (!activeBiomarker) return null;

  const readings = activeBiomarker.readings;
  const firstReading = readings[0];
  const latestReading = readings[readings.length - 1];

  // Improvement analysis
  const delta = latestReading && firstReading ? latestReading.value - firstReading.value : 0;
  const percentageChange = firstReading ? ((delta / firstReading.value) * 100).toFixed(1) : '0';

  let isImproved = false;
  if (activeBiomarker.lowerIsBetter) {
    isImproved = delta < 0; // lower is better (e.g. HbA1c reduced from 7.4% to 6.2%)
  } else {
    isImproved = delta > 0; // higher is better (e.g. Vitamin D raised from 14 to 36)
  }

  const isLatestNormal =
    latestReading.value >= activeBiomarker.targetMin &&
    latestReading.value <= activeBiomarker.targetMax;

  // Chart coordinate calculations
  const values = readings.map((r) => r.value);
  const minVal = Math.min(...values, activeBiomarker.targetMin) * 0.85;
  const maxVal = Math.max(...values, activeBiomarker.targetMax) * 1.15;
  const range = maxVal - minVal || 1;

  const svgWidth = 600;
  const svgHeight = 220;
  const paddingX = 50;
  const paddingY = 30;
  const plotWidth = svgWidth - paddingX * 2;
  const plotHeight = svgHeight - paddingY * 2;

  const getCoordinates = (index: number, val: number) => {
    const x =
      readings.length === 1
        ? paddingX + plotWidth / 2
        : paddingX + (index / (readings.length - 1)) * plotWidth;
    const y = svgHeight - paddingY - ((val - minVal) / range) * plotHeight;
    return { x, y };
  };

  const points = readings.map((r, i) => getCoordinates(i, r.value));
  const pathD = points.reduce(
    (acc, pt, i) => (i === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`),
    ''
  );

  // Normal range target band Y coords
  const targetMinY = svgHeight - paddingY - ((activeBiomarker.targetMin - minVal) / range) * plotHeight;
  const targetMaxY = svgHeight - paddingY - ((activeBiomarker.targetMax - minVal) / range) * plotHeight;
  const bandTop = Math.min(targetMinY, targetMaxY);
  const bandHeight = Math.abs(targetMinY - targetMaxY);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
      
      {/* Header and Biomarker Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#087F8C] uppercase tracking-wider mb-1">
            <Activity className="w-4 h-4 text-[#13A879]" />
            <span>Past Reports Longitudinal Analysis & Storage</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#10243A] tracking-tight">
            Biomarker Improvement Tracker
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            Store and track past pathology reports from KoDon, Lupin Diagnostics, Apollo, and other certified labs with automated clinical progress delta.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#087F8C] hover:bg-[#066570] text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Past Report Result</span>
          </button>

          <button
            onClick={handleResetDefaults}
            title="Reset to default longitudinal data"
            className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Biomarker Pill Buttons */}
      <div className="flex items-center gap-2 mt-6 overflow-x-auto no-scrollbar pb-2">
        {trends.map((b) => {
          const isSelected = b.id === selectedBiomarkerId;
          return (
            <button
              key={b.id}
              onClick={() => {
                setSelectedBiomarkerId(b.id);
                setShowAddForm(false);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#10243A] text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {b.name.split(' (')[0]}
            </button>
          );
        })}
      </div>

      {/* Add New Result Form (Collapsible) */}
      {showAddForm && (
        <form
          onSubmit={handleAddReading}
          className="mt-6 p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4"
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <span className="text-xs font-bold text-slate-800">
              Log Result for {activeBiomarker.name}
            </span>
            <span className="text-[11px] text-slate-500">Unit: {activeBiomarker.unit}</span>
          </div>

          <div className="grid sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Report Date
              </label>
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#087F8C]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Measured Value ({activeBiomarker.unit})
              </label>
              <input
                type="number"
                step="0.01"
                placeholder={`e.g. ${activeBiomarker.targetMax}`}
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#087F8C]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Testing Laboratory
              </label>
              <select
                value={newLab}
                onChange={(e) => setNewLab(e.target.value)}
                className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#087F8C] cursor-pointer"
              >
                <option value="KoDon Health Care">KoDon Health Care</option>
                <option value="Lupin Diagnostics">Lupin Diagnostics</option>
                <option value="Apollo Diagnostics">Apollo Diagnostics</option>
                <option value="Tata 1mg">Tata 1mg</option>
                <option value="Thyrocare">Thyrocare</option>
                <option value="Healthians">Healthians</option>
                <option value="Sprint Diagnostics">Sprint Diagnostics</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Physician or Lifestyle Note (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g., Post-exercise fasting test or after prescribed supplement dosage..."
              value={newNotes}
              onChange={(e) => setNewNotes(e.target.value)}
              className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#087F8C]"
            />
          </div>

          {formError && <p className="text-xs text-rose-600 font-medium">{formError}</p>}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#10243A] hover:bg-[#087F8C] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Save to Health Timeline
            </button>
          </div>
        </form>
      )}

      {/* Improvement Status Banner & Key Metrics */}
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        
        {/* Metric 1: Latest Value */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div className="text-[11px] font-semibold text-slate-500">Latest Recorded Level</div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl sm:text-3xl font-black text-[#10243A] tabular-nums">
              {latestReading.value}
            </span>
            <span className="text-xs font-bold text-slate-600">{activeBiomarker.unit}</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs">
            {isLatestNormal ? (
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Within Desirable Target
              </span>
            ) : (
              <span className="text-amber-700 font-bold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                Attention Warranted
              </span>
            )}
          </div>
        </div>

        {/* Metric 2: Improvement Delta */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div className="text-[11px] font-semibold text-slate-500">Longitudinal Trend Progress</div>
          <div className="flex items-baseline gap-2 mt-1">
            <span
              className={`text-2xl sm:text-3xl font-black tabular-nums ${
                isImproved ? 'text-emerald-600' : 'text-slate-700'
              }`}
            >
              {delta > 0 ? `+${delta.toFixed(2)}` : delta.toFixed(2)}
            </span>
            <span className="text-xs font-bold text-slate-600">{activeBiomarker.unit}</span>
          </div>
          <div className="mt-2 flex items-center gap-1 text-xs">
            {isImproved ? (
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                <span>{percentageChange}% Improvement</span>
              </span>
            ) : (
              <span className="text-slate-600 font-medium">
                Baseline stable over {readings.length} tests
              </span>
            )}
          </div>
        </div>

        {/* Metric 3: Clinical Reference Range */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div className="text-[11px] font-semibold text-slate-500">Target Clinical Range</div>
          <div className="text-xs font-bold text-slate-800 mt-2 leading-relaxed">
            {activeBiomarker.normalRangeText}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Optimal Target: {activeBiomarker.targetMin} - {activeBiomarker.targetMax} {activeBiomarker.unit}
          </div>
        </div>

      </div>

      {/* SVG Interactive Trend Graph */}
      <div className="mt-8 bg-slate-900 text-white p-5 sm:p-6 rounded-3xl relative overflow-hidden shadow-inner">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-xs text-slate-200">
              {activeBiomarker.name} Progression Curve
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/30 border border-emerald-400"></span>
              Optimal Zone
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-0.5 bg-emerald-400"></span>
              Biomarker Curve
            </span>
          </div>
        </div>

        {/* SVG Canvas */}
        <div className="w-full overflow-x-auto py-2">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full h-52 select-none"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Target Normal Band Background */}
            <rect
              x={paddingX}
              y={bandTop}
              width={plotWidth}
              height={Math.max(bandHeight, 10)}
              fill="rgba(16, 185, 129, 0.12)"
              rx="4"
            />
            <text
              x={paddingX + 6}
              y={bandTop + 14}
              fill="#34d399"
              fontSize="10"
              fontWeight="600"
            >
              Normal Target ({activeBiomarker.targetMin} - {activeBiomarker.targetMax})
            </text>

            {/* Shaded Area under Curve */}
            {points.length > 1 && (
              <path
                d={`${pathD} L ${points[points.length - 1].x} ${svgHeight - paddingY} L ${points[0].x} ${svgHeight - paddingY} Z`}
                fill="url(#curveGradient)"
              />
            )}

            {/* Curve Line */}
            <path
              d={pathD}
              fill="none"
              stroke="#10b981"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data Point Dots & Labels */}
            {readings.map((reading, i) => {
              const { x, y } = getCoordinates(i, reading.value);
              const isLatest = i === readings.length - 1;
              return (
                <g key={reading.id}>
                  {/* Outer Pulsing Ring on latest */}
                  {isLatest && (
                    <circle
                      cx={x}
                      cy={y}
                      r="9"
                      fill="none"
                      stroke="#34d399"
                      strokeWidth="1.5"
                      opacity="0.6"
                    />
                  )}
                  {/* Dot */}
                  <circle
                    cx={x}
                    cy={y}
                    r="5.5"
                    fill={isLatest ? '#34d399' : '#087F8C'}
                    stroke="#0f172a"
                    strokeWidth="2"
                  />
                  {/* Value Label */}
                  <text
                    x={x}
                    y={y - 12}
                    textAnchor="middle"
                    fill="#f8fafc"
                    fontSize="11"
                    fontWeight="700"
                  >
                    {reading.value} {reading.unit}
                  </text>
                  {/* Date Label on X Axis */}
                  <text
                    x={x}
                    y={svgHeight - 10}
                    textAnchor="middle"
                    fill="#94a3b8"
                    fontSize="10"
                  >
                    {reading.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Reading History Table / Cards below chart */}
        <div className="mt-4 pt-4 border-t border-slate-800 grid sm:grid-cols-3 gap-3">
          {readings.map((reading, idx) => (
            <div
              key={reading.id}
              className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 text-xs space-y-1"
            >
              <div className="flex items-center justify-between text-slate-400 text-[11px]">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  {reading.label}
                </span>
                <span className="font-semibold text-teal-300 flex items-center gap-1">
                  <Building2 className="w-3 h-3" />
                  {reading.labName}
                </span>
              </div>
              <div className="text-base font-bold text-white tabular-nums">
                {reading.value} {reading.unit}
              </div>
              {reading.notes && (
                <div className="text-[11px] text-slate-300 line-clamp-1 italic">
                  "{reading.notes}"
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Clinical Guidance Footnote & Quick Next Steps */}
      <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-2 text-xs text-slate-500 max-w-xl">
          <Info className="w-4 h-4 text-[#087F8C] shrink-0 mt-0.5" />
          <span>
            {activeBiomarker.description} All diagnostic records are stored privately in your browser and sync across KoDon consultations.
          </span>
        </div>

        <div className="flex items-center gap-2">
          {onBookTest && (
            <button
              onClick={() => onBookTest(activeBiomarker.name)}
              className="px-4 py-2 bg-[#10243A] hover:bg-[#087F8C] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Schedule Repeat Test (15% Off)
            </button>
          )}
          {onConsultDoctor && (
            <button
              onClick={onConsultDoctor}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Discuss with MD
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
