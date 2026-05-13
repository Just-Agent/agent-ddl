import { useParams, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Trophy,
  Monitor,
  GraduationCap,
  Calendar,
  DollarSign,
  Layers,
  CheckCircle,
  ExternalLink,
  Share2,
  Clock,
  Mail,
  Box,
  FileText,
  Code,
  BarChart3,
  Check,
  X,
  Info,
  ChevronRight,
  Database,
  Terminal,
  Cpu,
  BookOpen,
  MessageCircle,
} from 'lucide-react';
import { competitions, getRelatedCompetitions } from '@/data/competitions';
import type { Competition, CompetitionType, EvaluationMode } from '@/data/competitions';
import CompetitionCard from '@/components/CompetitionCard';

function getDaysRemaining(deadline: string): number {
  const now = new Date().getTime();
  const end = new Date(deadline).getTime();
  return Math.ceil((end - now) / (1000 * 60 * 60 * 24));
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

const typeConfig: Record<CompetitionType, { icon: typeof Trophy; bg: string; text: string; border: string; label: string }> = {
  Benchmark: {
    icon: Trophy,
    bg: 'bg-[rgba(0,229,255,0.12)]',
    text: 'text-[#22D3EE]',
    border: 'border-[rgba(34,211,238,0.3)]',
    label: 'Benchmark',
  },
  Hackathon: {
    icon: Monitor,
    bg: 'bg-[rgba(255,107,53,0.12)]',
    text: 'text-[#FF6B35]',
    border: 'border-[rgba(255,107,53,0.3)]',
    label: 'Hackathon',
  },
  Academic: {
    icon: GraduationCap,
    bg: 'bg-[rgba(167,139,250,0.12)]',
    text: 'text-[#A78BFA]',
    border: 'border-[rgba(167,139,250,0.3)]',
    label: 'Academic',
  },
};

const evalConfig: Record<EvaluationMode, { bg: string; text: string; label: string }> = {
  Automated: { bg: 'bg-[rgba(0,229,255,0.12)]', text: 'text-[#00E5FF]', label: 'Automated Benchmark' },
  Human: { bg: 'bg-[rgba(255,107,53,0.12)]', text: 'text-[#FF6B35]', label: 'Human Jury' },
  Hybrid: { bg: 'bg-[rgba(167,139,250,0.12)]', text: 'text-[#A78BFA]', label: 'Hybrid' },
};

function getPhaseStatus(phaseDeadline: string, prevDeadline?: string): 'past' | 'current' | 'upcoming' {
  const now = new Date().getTime();
  const deadline = new Date(phaseDeadline).getTime();
  const prev = prevDeadline ? new Date(prevDeadline).getTime() : 0;
  if (deadline < now) return 'past';
  if (prev < now && deadline > now) return 'current';
  if (!prevDeadline && deadline > now) return 'current';
  return 'upcoming';
}

/* ─── Animated Section Wrapper ─── */
function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ─── Main Page Component ─── */
export default function CompetitionDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const competition = competitions.find((c) => c.id === id);

  if (!competition) {
    return (
      <div className="min-h-[100dvh] bg-[#080A1A] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-[Space_Grotesk] font-bold text-[#E2E8F0] mb-4">Competition Not Found</h1>
          <p className="text-[#94A3B8] mb-6">The competition you are looking for does not exist.</p>
          <button
            onClick={() => navigate('/competitions')}
            className="px-6 py-2.5 rounded-lg bg-[#00E5FF] text-[#080A1A] font-medium hover:bg-[#33EAFF] transition-all"
          >
            Browse All Competitions
          </button>
        </div>
      </div>
    );
  }

  const days = getDaysRemaining(competition.deadline);
  const typeInfo = typeConfig[competition.type];
  const evalInfo = evalConfig[competition.evaluationMode];
  const TypeIcon = typeInfo.icon;
  const related = getRelatedCompetitions(competition, 3);

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Fallback
    }
  };

  const handleCalendar = () => {
    const title = encodeURIComponent(competition.title);
    const date = new Date(competition.deadline);
    const dateStr = date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dateStr}/${dateStr}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-[100dvh] bg-[#080A1A]">
      {/* ── Hero Header ── */}
      <section className="relative bg-gradient-to-b from-[#080A1A] to-[#0E1233] pt-[120px] pb-[60px]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            onClick={() => navigate('/competitions')}
            className="flex items-center gap-2 text-[13px] text-[#00E5FF] hover:underline mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            All Competitions
          </motion.button>

          {/* Type Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4"
          >
            <span className={`inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.06em] px-3 py-1.5 rounded ${typeInfo.bg} ${typeInfo.text} border ${typeInfo.border}`}>
              <TypeIcon className="w-4 h-4" />
              {typeInfo.label}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="font-[Space_Grotesk] font-bold text-[48px] md:text-[64px] leading-[1.05] tracking-[-0.03em] text-[#E2E8F0] max-w-[900px] mb-3"
          >
            {competition.title}
          </motion.h1>

          {/* Subtitle */}
          {competition.subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-[18px] leading-[1.7] text-[#94A3B8] max-w-[700px] mb-4"
            >
              {competition.subtitle}
            </motion.p>
          )}

          {/* Description fallback when no subtitle */}
          {!competition.subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-[18px] leading-[1.7] text-[#94A3B8] max-w-[700px] mb-4 line-clamp-2"
            >
              {competition.description}
            </motion.p>
          )}

          {/* Meta Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center gap-3 mb-6"
          >
            <span className="px-3 py-1.5 rounded-lg bg-[#1A2040] text-[#E2E8F0] text-[13px] font-medium">
              {competition.platform}
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-[#1A2040] text-[#E2E8F0] text-[13px] font-medium">
              {competition.location}
            </span>
            <span className={`text-[11px] font-medium uppercase tracking-[0.06em] px-2.5 py-1 rounded ${evalInfo.bg} ${evalInfo.text}`}>
              {evalInfo.label}
            </span>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap gap-3 mb-8"
          >
            {competition.websiteUrl && (
              <a
                href={competition.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#00E5FF] text-[#080A1A] font-medium hover:bg-[#33EAFF] hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Register Now <ExternalLink className="w-4 h-4" />
              </a>
            )}
            <button
              onClick={handleCalendar}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#00E5FF] text-[#00E5FF] hover:bg-[rgba(0,229,255,0.12)] transition-all"
            >
              <Calendar className="w-4 h-4" />
              Add to Calendar
            </button>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[rgba(255,255,255,0.12)] text-[#94A3B8] hover:border-[rgba(255,255,255,0.3)] hover:text-[#E2E8F0] transition-all"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4 text-[#64748B]" />
                <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-[#64748B]">Deadline</span>
              </div>
              <span className="font-mono text-[12px] font-medium tracking-[0.04em] text-[#E2E8F0]">{formatDate(competition.deadline)}</span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Layers className="w-4 h-4 text-[#64748B]" />
                <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-[#64748B]">Tracks</span>
              </div>
              <span className="font-mono text-[12px] font-medium tracking-[0.04em] text-[#E2E8F0]">
                {competition.tracks ? `${competition.tracks.length} Tracks` : '1 Track'}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Trophy className="w-4 h-4 text-[#64748B]" />
                <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-[#64748B]">Prize</span>
              </div>
              <span className="font-mono text-[12px] font-medium tracking-[0.04em] text-[#E2E8F0]">{competition.prizePool}</span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-[#64748B]" />
                <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-[#64748B]">Days Left</span>
              </div>
              <span className={`font-mono text-[12px] font-medium tracking-[0.04em] ${days < 0 ? 'text-[#64748B]' : days < 7 ? 'text-[#FBBF24]' : 'text-[#34D399]'}`}>
                {days < 0 ? 'Ended' : `${days} days`}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Overview Section ── */}
      <Section className="py-[60px] bg-[#080A1A]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-10">
            {/* Left: Description */}
            <div>
              <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-[#00E5FF]">Overview</span>
              <p className="mt-6 text-[15px] leading-[1.65] text-[#E2E8F0]">{competition.description}</p>
              {competition.extendedDescription && (
                <p className="mt-4 text-[15px] leading-[1.65] text-[#94A3B8]">{competition.extendedDescription}</p>
              )}

              {/* Key Dates */}
              {competition.phases.length > 0 && (
                <div className="mt-8 space-y-4">
                  {competition.phases.map((phase) => (
                    <div key={phase.name} className="flex items-start gap-3 text-[15px]">
                      <Calendar className="w-4 h-4 text-[#00E5FF] mt-0.5 shrink-0" />
                      <div>
                        <span className="text-[#E2E8F0]">{phase.name}: </span>
                        <span className="font-mono text-[13px] text-[#94A3B8]">{formatDate(phase.deadline)}</span>
                        {phase.description && <p className="text-[13px] text-[#64748B] mt-0.5">{phase.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Key Info Card */}
            <div className="bg-[#1A2040] border border-[rgba(255,255,255,0.06)] rounded-xl p-7">
              <h3 className="font-[Space_Grotesk] font-semibold text-[20px] leading-[1.3] tracking-[-0.01em] text-[#E2E8F0] mb-6">
                Key Information
              </h3>
              <div className="space-y-4">
                {competition.organizer && (
                  <div className="pb-4 border-b border-[rgba(255,255,255,0.06)]">
                    <span className="block text-[11px] font-medium uppercase tracking-[0.06em] text-[#64748B] mb-1">Organizer</span>
                    <span className="text-[15px] text-[#E2E8F0]">{competition.organizer}</span>
                  </div>
                )}
                <div className="pb-4 border-b border-[rgba(255,255,255,0.06)]">
                  <span className="block text-[11px] font-medium uppercase tracking-[0.06em] text-[#64748B] mb-1">Evaluation</span>
                  <span className="text-[15px] text-[#E2E8F0]">{evalInfo.label}</span>
                </div>
                {competition.submissionType && (
                  <div className="pb-4 border-b border-[rgba(255,255,255,0.06)]">
                    <span className="block text-[11px] font-medium uppercase tracking-[0.06em] text-[#64748B] mb-1">Submission Type</span>
                    <span className="text-[15px] text-[#E2E8F0] flex items-center gap-2">
                      <Box className="w-4 h-4 text-[#00E5FF]" />
                      {competition.submissionType}
                    </span>
                  </div>
                )}
                {competition.eligibility && (
                  <div className="pb-4 border-b border-[rgba(255,255,255,0.06)]">
                    <span className="block text-[11px] font-medium uppercase tracking-[0.06em] text-[#64748B] mb-1">Eligibility</span>
                    <span className="text-[15px] text-[#E2E8F0]">{competition.eligibility}</span>
                  </div>
                )}
                <div className="pb-4 border-b border-[rgba(255,255,255,0.06)]">
                  <span className="block text-[11px] font-medium uppercase tracking-[0.06em] text-[#64748B] mb-1">Status</span>
                  <span className="text-[15px] text-[#E2E8F0] flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${competition.status === 'Open' ? 'bg-[#34D399]' : competition.status === 'Closing Soon' ? 'bg-[#FBBF24]' : 'bg-[#64748B]'}`} />
                    {competition.status}
                  </span>
                </div>
                {competition.contact && (
                  <div>
                    <span className="block text-[11px] font-medium uppercase tracking-[0.06em] text-[#64748B] mb-1">Contact</span>
                    <a href={`mailto:${competition.contact}`} className="text-[15px] text-[#00E5FF] hover:underline flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {competition.contact}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Tracks Section ── */}
      {competition.tracks && competition.tracks.length > 0 && (
        <Section className="py-[80px] bg-[#0E1233]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-[Space_Grotesk] font-bold text-[48px] md:text-[32px] leading-[1.1] tracking-[-0.02em] text-[#E2E8F0] mb-3">
              Tracks & Benchmarks
            </h2>
            <p className="text-[18px] leading-[1.7] text-[#94A3B8] mb-10 max-w-[640px]">
              Multiple evaluation tracks with different focus areas and constraints.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {competition.tracks.map((track, i) => (
                <motion.div
                  key={track.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                  className="bg-gradient-to-br from-[#1A2040] to-[#141B36] border border-[rgba(255,255,255,0.06)] rounded-xl p-8 hover:-translate-y-0.5 hover:border-[rgba(255,255,255,0.12)] transition-all"
                  style={{ borderLeftWidth: '4px', borderLeftColor: i === 0 ? '#00E5FF' : '#FF6B35' }}
                >
                  <span className={`inline-block text-[11px] font-medium uppercase tracking-[0.06em] px-2.5 py-1 rounded mb-4 ${i === 0 ? 'bg-[rgba(0,229,255,0.12)] text-[#00E5FF]' : 'bg-[rgba(255,107,53,0.12)] text-[#FF6B35]'}`}>
                    Track {i + 1}
                  </span>
                  <h3 className="font-[Space_Grotesk] font-semibold text-[20px] leading-[1.3] tracking-[-0.01em] text-[#E2E8F0] mb-3">
                    {track.name}
                  </h3>
                  <p className="text-[15px] leading-[1.65] text-[#94A3B8] mb-5">{track.description}</p>
                  {track.metrics && track.metrics.length > 0 && (
                    <div className="bg-[#080A1A] rounded-lg p-4 space-y-2">
                      {track.metrics.map((metric) => (
                        <p key={metric} className="font-mono text-[13px] text-[#00E5FF]">{metric}</p>
                      ))}
                    </div>
                  )}
                  {track.constraints && (
                    <p className="mt-4 font-mono text-[12px] text-[#FBBF24]">{track.constraints}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* ── Phases Timeline ── */}
      <Section className="py-[80px] bg-[#0E1233]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[Space_Grotesk] font-bold text-[48px] md:text-[32px] leading-[1.1] tracking-[-0.02em] text-[#E2E8F0] mb-3">
            Competition Timeline
          </h2>
          <p className="text-[18px] leading-[1.7] text-[#94A3B8] mb-10">Key dates and milestones</p>
          <div className="relative max-w-[600px]">
            {/* Vertical line */}
            <div className="absolute left-[5px] top-0 bottom-0 w-[2px] bg-[rgba(255,255,255,0.06)]" />
            <div className="space-y-8">
              {competition.phases.map((phase, i) => {
                const status = getPhaseStatus(phase.deadline, i > 0 ? competition.phases[i - 1].deadline : undefined);
                const isNextMajor = status === 'current' || (status === 'upcoming' && (i === 0 || getPhaseStatus(competition.phases[i - 1].deadline, i > 1 ? competition.phases[i - 2].deadline : undefined) === 'past'));
                return (
                  <motion.div
                    key={phase.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="relative pl-8"
                  >
                    {/* Node */}
                    <div
                      className={`absolute left-0 top-1 w-3 h-3 rounded-full border-2 ${
                        status === 'past'
                          ? 'bg-[#64748B] border-[#64748B]'
                          : status === 'current'
                          ? 'bg-[#00E5FF] border-[#00E5FF] shadow-[0_0_8px_rgba(0,229,255,0.5)]'
                          : 'bg-[#1A2040] border-[#00E5FF]'
                      }`}
                    />
                    <span className={`font-mono text-[13px] ${isNextMajor ? 'text-[#00E5FF]' : status === 'past' ? 'text-[#64748B]' : 'text-[#94A3B8]'}`}>
                      {formatDate(phase.deadline)}
                    </span>
                    <h4 className="text-[15px] font-semibold text-[#E2E8F0] mt-0.5">{phase.name}</h4>
                    {phase.description && <p className="text-[13px] text-[#94A3B8] mt-1">{phase.description}</p>}
                    {status === 'current' && (
                      <span className="inline-flex items-center gap-1 mt-1 text-[11px] text-[#00E5FF] font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
                        Current Phase
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </Section>

      {/* ── Submission Requirements ── */}
      {competition.submissionType && (
        <Section className="py-[80px] bg-[#080A1A]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-[Space_Grotesk] font-bold text-[48px] md:text-[32px] leading-[1.1] tracking-[-0.02em] text-[#E2E8F0] mb-3">
              Submission Requirements
            </h2>
            <p className="text-[18px] leading-[1.7] text-[#94A3B8] mb-10">What you need to prepare for your submission</p>
            <div className="space-y-4">
              {[
                { icon: Box, title: 'Model / System', detail: `Submit your solution as ${competition.submissionType}. Ensure all required artifacts are included.` },
                { icon: FileText, title: 'Technical Documentation', detail: 'Include documentation describing your approach, architecture, and any external resources used.' },
                { icon: Code, title: 'Code Repository', detail: 'Provide access to a code repository with complete training and inference code.' },
                { icon: BarChart3, title: 'Self-Reported Results', detail: 'Run the official evaluation script and report all metrics. Final scoring may use a held-out test set.' },
              ].map((req, i) => (
                <motion.div
                  key={req.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="flex items-start gap-4 bg-[#1A2040] border border-[rgba(255,255,255,0.06)] rounded-lg p-5 hover:border-[rgba(255,255,255,0.12)] transition-all"
                >
                  <req.icon className="w-6 h-6 text-[#00E5FF] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-[15px] font-semibold text-[#E2E8F0] mb-1">{req.title}</h4>
                    <p className="text-[15px] leading-[1.65] text-[#94A3B8]">{req.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* ── Model Constraints & Rules ── */}
      {(competition.modelConstraints || competition.allowedFrameworks) && (
        <Section className="py-[80px] bg-[#0E1233]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-[Space_Grotesk] font-bold text-[48px] md:text-[32px] leading-[1.1] tracking-[-0.02em] text-[#E2E8F0] mb-3">
              Model Constraints & Rules
            </h2>
            <p className="text-[18px] leading-[1.7] text-[#94A3B8] mb-10">Allowed models, frameworks, and competition rules</p>
            <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8">
              {/* Left: Allowed */}
              <div>
                {competition.modelConstraints && (
                  <div className="mb-6">
                    <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-[#00E5FF] mb-3 block">Allowed Models</span>
                    <div className="space-y-3">
                      {competition.modelConstraints.map((m) => (
                        <div key={m} className="flex items-center gap-2 text-[15px] text-[#E2E8F0]">
                          <Check className="w-4 h-4 text-[#34D399]" />
                          {m}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {competition.allowedFrameworks && (
                  <div>
                    <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-[#00E5FF] mb-3 block">Allowed Frameworks</span>
                    <div className="flex flex-wrap gap-2">
                      {competition.allowedFrameworks.map((fw) => (
                        <span key={fw} className="text-[11px] font-medium uppercase tracking-[0.06em] px-3 py-1.5 rounded bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] text-[#64748B] hover:bg-[rgba(255,255,255,0.08)] transition-all">
                          {fw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {/* Right: Rules */}
              <div className="bg-[#1A2040] border border-[rgba(255,255,255,0.06)] rounded-xl p-7">
                <h3 className="font-[Space_Grotesk] font-semibold text-[20px] leading-[1.3] tracking-[-0.01em] text-[#E2E8F0] mb-5">
                  Competition Rules
                </h3>
                <div className="space-y-4">
                  {[
                    { icon: X, color: 'text-[#FF6B35]', text: 'No manual labeling of test set' },
                    { icon: X, color: 'text-[#FF6B35]', text: 'No external human annotators during inference' },
                    { icon: Info, color: 'text-[#00E5FF]', text: 'Maximum 3 submissions per track' },
                    { icon: Check, color: 'text-[#34D399]', text: 'Must disclose all external data sources' },
                    { icon: Check, color: 'text-[#34D399]', text: 'Winners must open-source their solution' },
                    { icon: X, color: 'text-[#FF6B35]', text: 'Plagiarism results in disqualification' },
                  ].map((rule, i) => (
                    <div key={i} className="flex items-start gap-3 text-[15px] text-[#E2E8F0]">
                      <rule.icon className={`w-4 h-4 shrink-0 mt-0.5 ${rule.color}`} />
                      {rule.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>
      )}

      {/* ── Related Competitions ── */}
      {related.length > 0 && (
        <section className="py-[80px] bg-[#080A1A]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-[Space_Grotesk] font-bold text-[48px] md:text-[32px] leading-[1.1] tracking-[-0.02em] text-[#E2E8F0] mb-3">
              You Might Also Like
            </h2>
            <p className="text-[18px] leading-[1.7] text-[#94A3B8] mb-10">Similar competitions based on type and theme</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((c, i) => (
                <CompetitionCard key={c.id} competition={c} index={i} compact />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
