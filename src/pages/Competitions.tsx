import { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  X,
  RotateCcw,
  ChevronDown,
  Trophy,
  Monitor,
  GraduationCap,
  SlidersHorizontal,
} from 'lucide-react';
import { competitions } from '@/data/competitions';
import type { Competition, CompetitionType, EvaluationMode } from '@/data/competitions';
import CompetitionCard from '@/components/CompetitionCard';

/* ─── Types ─── */
type SortOption = 'deadline' | 'prize' | 'name' | 'type';
type StatusFilter = 'all' | 'open' | 'closing-soon' | 'tbd';

interface Filters {
  search: string;
  types: CompetitionType[];
  evaluationModes: EvaluationMode[];
  status: StatusFilter;
  platform: string;
  sort: SortOption;
}

const PLATFORMS = ['All', 'Devpost', 'IJCAI', 'DoraHacks', 'Kaggle', 'HuggingFace', 'Google Cloud', 'Lablab', 'Academic', 'Other'];

const SORT_LABELS: Record<SortOption, string> = {
  deadline: 'Nearest Deadline',
  prize: 'Prize Pool (high to low)',
  name: 'Name A-Z',
  type: 'Type',
};

/* ─── Helpers ─── */
function parsePrize(prize: string): number {
  if (prize === 'N/A' || prize === 'TBD') return 0;
  const match = prize.replace(/[^0-9.]/g, '');
  return match ? parseFloat(match) : 0;
}

function getDaysRemaining(deadline: string): number {
  const now = new Date().getTime();
  const end = new Date(deadline).getTime();
  return Math.ceil((end - now) / (1000 * 60 * 60 * 24));
}

/* ─── Filter Bar Component ─── */
function FilterBar({
  filters,
  onChange,
  activeCount,
  onReset,
}: {
  filters: Filters;
  onChange: (f: Filters) => void;
  activeCount: number;
  onReset: () => void;
}) {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const toggleType = useCallback(
    (type: CompetitionType) => {
      onChange({
        ...filters,
        types: filters.types.includes(type)
          ? filters.types.filter((t) => t !== type)
          : [...filters.types, type],
      });
    },
    [filters, onChange]
  );

  const toggleEval = useCallback(
    (mode: EvaluationMode) => {
      onChange({
        ...filters,
        evaluationModes: filters.evaluationModes.includes(mode)
          ? filters.evaluationModes.filter((m) => m !== mode)
          : [...filters.evaluationModes, mode],
      });
    },
    [filters, onChange]
  );

  const typeButtons: { type: CompetitionType; label: string; icon: typeof Trophy }[] = [
    { type: 'Benchmark', label: 'Benchmark', icon: Trophy },
    { type: 'Hackathon', label: 'Hackathon', icon: Monitor },
    { type: 'Academic', label: 'Academic', icon: GraduationCap },
  ];

  const evalButtons: { mode: EvaluationMode; label: string }[] = [
    { mode: 'Automated', label: 'Automated' },
    { mode: 'Human', label: 'Human Jury' },
    { mode: 'Hybrid', label: 'Hybrid' },
  ];

  return (
    <div className="sticky top-0 z-40 bg-[#0E1233]/90 backdrop-blur-xl border-b border-[rgba(255,255,255,0.06)]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Desktop + Mobile Layout */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="relative flex-shrink-0 w-full sm:w-[280px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
            <input
              type="text"
              placeholder="Search competitions..."
              value={filters.search}
              onChange={(e) => onChange({ ...filters, search: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#1A2040] border border-[rgba(255,255,255,0.06)] text-[15px] text-[#E2E8F0] placeholder-[#64748B] focus:outline-none focus:border-[#00E5FF] focus:shadow-[0_0_0_3px_rgba(0,229,255,0.15)] transition-all"
            />
            {filters.search && (
              <button onClick={() => onChange({ ...filters, search: '' })} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#E2E8F0]">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Type Filters */}
          <div className="hidden md:flex items-center gap-2">
            <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-[#64748B] mr-1">Type</span>
            {typeButtons.map(({ type, label, icon: Icon }) => (
              <button
                key={type}
                onClick={() => toggleType(type)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-medium uppercase tracking-[0.06em] border transition-all ${
                  filters.types.includes(type)
                    ? 'bg-[rgba(0,229,255,0.12)] border-[#00E5FF] text-[#00E5FF]'
                    : 'bg-transparent border-[rgba(255,255,255,0.06)] text-[#94A3B8] hover:border-[rgba(255,255,255,0.3)] hover:text-[#E2E8F0]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            ))}
          </div>

          {/* Eval Filters */}
          <div className="hidden lg:flex items-center gap-2">
            <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-[#64748B] mr-1">Evaluation</span>
            {evalButtons.map(({ mode, label }) => (
              <button
                key={mode}
                onClick={() => toggleEval(mode)}
                className={`px-3 py-1.5 rounded-md text-[11px] font-medium uppercase tracking-[0.06em] border transition-all ${
                  filters.evaluationModes.includes(mode)
                    ? 'bg-[rgba(0,229,255,0.12)] border-[#00E5FF] text-[#00E5FF]'
                    : 'bg-transparent border-[rgba(255,255,255,0.06)] text-[#94A3B8] hover:border-[rgba(255,255,255,0.3)] hover:text-[#E2E8F0]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Platform Dropdown */}
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-[#64748B] mr-1">Platform</span>
            <div className="relative">
              <select
                value={filters.platform}
                onChange={(e) => onChange({ ...filters, platform: e.target.value })}
                className="appearance-none pl-3 pr-8 py-1.5 rounded-md bg-[#1A2040] border border-[rgba(255,255,255,0.06)] text-[13px] text-[#E2E8F0] focus:outline-none focus:border-[#00E5FF] cursor-pointer"
              >
                {PLATFORMS.map((p) => (
                  <option key={p} value={p === 'All' ? '' : p}>{p}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#64748B] pointer-events-none" />
            </div>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-[#64748B]">Sort</span>
            <div className="relative">
              <select
                value={filters.sort}
                onChange={(e) => onChange({ ...filters, sort: e.target.value as SortOption })}
                className="appearance-none pl-3 pr-8 py-1.5 rounded-md bg-[#1A2040] border border-[rgba(255,255,255,0.06)] text-[13px] text-[#E2E8F0] focus:outline-none focus:border-[#00E5FF] cursor-pointer"
              >
                {(Object.keys(SORT_LABELS) as SortOption[]).map((key) => (
                  <option key={key} value={key}>{SORT_LABELS[key]}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#64748B] pointer-events-none" />
            </div>
          </div>

          {/* Reset */}
          {activeCount > 0 && (
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-medium uppercase tracking-[0.06em] text-[#FF6B35] hover:bg-[rgba(255,107,53,0.12)] transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset ({activeCount})
            </button>
          )}

          {/* Mobile filter toggle */}
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="md:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-medium uppercase tracking-[0.06em] border border-[rgba(255,255,255,0.06)] text-[#94A3B8]"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Filters
          </button>
        </div>

        {/* Mobile filters */}
        <AnimatePresence>
          {showMobileFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden mt-4 space-y-4"
            >
              {/* Type */}
              <div>
                <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-[#64748B] mb-2 block">Type</span>
                <div className="flex flex-wrap gap-2">
                  {typeButtons.map(({ type, label, icon: Icon }) => (
                    <button
                      key={type}
                      onClick={() => toggleType(type)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-medium uppercase tracking-[0.06em] border transition-all ${
                        filters.types.includes(type)
                          ? 'bg-[rgba(0,229,255,0.12)] border-[#00E5FF] text-[#00E5FF]'
                          : 'bg-transparent border-[rgba(255,255,255,0.06)] text-[#94A3B8]'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              {/* Eval */}
              <div>
                <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-[#64748B] mb-2 block">Evaluation</span>
                <div className="flex flex-wrap gap-2">
                  {evalButtons.map(({ mode, label }) => (
                    <button
                      key={mode}
                      onClick={() => toggleEval(mode)}
                      className={`px-3 py-1.5 rounded-md text-[11px] font-medium uppercase tracking-[0.06em] border transition-all ${
                        filters.evaluationModes.includes(mode)
                          ? 'bg-[rgba(0,229,255,0.12)] border-[#00E5FF] text-[#00E5FF]'
                          : 'bg-transparent border-[rgba(255,255,255,0.06)] text-[#94A3B8]'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              {/* Platform */}
              <div>
                <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-[#64748B] mb-2 block">Platform</span>
                <select
                  value={filters.platform}
                  onChange={(e) => onChange({ ...filters, platform: e.target.value })}
                  className="w-full pl-3 pr-8 py-2 rounded-md bg-[#1A2040] border border-[rgba(255,255,255,0.06)] text-[13px] text-[#E2E8F0]"
                >
                  {PLATFORMS.map((p) => (
                    <option key={p} value={p === 'All' ? '' : p}>{p}</option>
                  ))}
                </select>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
const defaultFilters: Filters = {
  search: '',
  types: ['Benchmark', 'Hackathon', 'Academic'],
  evaluationModes: ['Automated', 'Human', 'Hybrid'],
  status: 'all',
  platform: '',
  sort: 'deadline',
};

export default function Competitions() {
  const [filters, setFilters] = useState<Filters>({ ...defaultFilters });

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.search) count++;
    if (filters.types.length !== 3) count++;
    if (filters.evaluationModes.length !== 3) count++;
    if (filters.platform) count++;
    return count;
  }, [filters]);

  const filteredCompetitions = useMemo(() => {
    let result = competitions.filter((c) => {
      // Type filter
      if (!filters.types.includes(c.type)) return false;
      // Evaluation filter
      if (!filters.evaluationModes.includes(c.evaluationMode)) return false;
      // Platform filter
      if (filters.platform && c.platform !== filters.platform) return false;
      // Search
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const inTitle = c.title.toLowerCase().includes(q);
        const inTheme = c.theme.some((t) => t.toLowerCase().includes(q));
        const inPlatform = c.platform.toLowerCase().includes(q);
        if (!inTitle && !inTheme && !inPlatform) return false;
      }
      return true;
    });

    // Sort
    switch (filters.sort) {
      case 'deadline':
        result = result.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
        break;
      case 'prize':
        result = result.sort((a, b) => parsePrize(b.prizePool) - parsePrize(a.prizePool));
        break;
      case 'name':
        result = result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'type':
        result = result.sort((a, b) => a.type.localeCompare(b.type));
        break;
    }

    return result;
  }, [filters]);

  // Stats
  const stats = useMemo(() => {
    const active = competitions.filter((c) => c.status !== 'Ended').length;
    const benchmarkCount = competitions.filter((c) => c.type === 'Benchmark').length;
    const hackathonCount = competitions.filter((c) => c.type === 'Hackathon').length;
    const academicCount = competitions.filter((c) => c.type === 'Academic').length;
    const platformCount = new Set(competitions.map((c) => c.platform)).size;
    return { active, benchmarkCount, hackathonCount, academicCount, platformCount };
  }, []);

  const handleReset = useCallback(() => {
    setFilters({ ...defaultFilters });
  }, []);

  return (
    <div className="min-h-[100dvh] bg-[#080A1A]">
      {/* ── Page Header ── */}
      <section className="relative bg-gradient-to-b from-[#080A1A] to-[#0E1233] pt-[100px] pb-[60px]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="block text-[11px] font-medium uppercase tracking-[0.15em] text-[#00E5FF] mb-4"
          >
            Discover Challenges
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="font-[Space_Grotesk] font-bold text-[40px] md:text-[64px] leading-[1.05] tracking-[-0.03em] text-[#E2E8F0] mb-4"
          >
            AI Agent Competitions
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="text-[18px] leading-[1.7] text-[#94A3B8] max-w-[640px] mb-6"
          >
            Browse every active AI agent competition and benchmark challenge. Filter by type, evaluation method, and more.
          </motion.p>

          {/* Stats Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-3"
          >
            {[
              { label: `${stats.active} Active`, bg: 'bg-[rgba(0,229,255,0.12)]', text: 'text-[#00E5FF]' },
              { label: `${stats.benchmarkCount} Benchmark`, bg: 'bg-[#1A2040]', text: 'text-[#94A3B8]' },
              { label: `${stats.hackathonCount} Hackathon`, bg: 'bg-[#1A2040]', text: 'text-[#94A3B8]' },
              { label: `${stats.academicCount} Academic`, bg: 'bg-[#1A2040]', text: 'text-[#94A3B8]' },
              { label: `${stats.platformCount} Platforms`, bg: 'bg-[#1A2040]', text: 'text-[#94A3B8]' },
            ].map((pill, i) => (
              <motion.span
                key={pill.label}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.06 }}
                className={`inline-flex items-center px-4 py-2 rounded-lg ${pill.bg} ${pill.text} text-[13px] font-medium`}
              >
                {pill.label}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Filter Bar ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <FilterBar filters={filters} onChange={setFilters} activeCount={activeFilterCount} onReset={handleReset} />
      </motion.div>

      {/* ── Competition Grid ── */}
      <section className="py-10 pb-20 bg-[#080A1A]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Result count */}
          <p className="text-[13px] text-[#64748B] font-mono mb-6">
            Showing {filteredCompetitions.length} competition{filteredCompetitions.length !== 1 ? 's' : ''}
          </p>

          {filteredCompetitions.length === 0 ? (
            /* Empty State */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <Search className="w-12 h-12 text-[#64748B] mb-4" />
              <h3 className="font-[Space_Grotesk] font-semibold text-[20px] leading-[1.3] tracking-[-0.01em] text-[#E2E8F0] mb-2">
                No competitions match your filters
              </h3>
              <p className="text-[15px] text-[#94A3B8] mb-6">
                Try adjusting your filter criteria
              </p>
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#00E5FF] text-[#00E5FF] hover:bg-[rgba(0,229,255,0.12)] transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                Reset Filters
              </button>
            </motion.div>
          ) : (
            /* Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCompetitions.map((competition, i) => (
                <CompetitionCard key={competition.id} competition={competition} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
