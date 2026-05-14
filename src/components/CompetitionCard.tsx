import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { Trophy, Monitor, GraduationCap, DollarSign, Calendar, ArrowRight } from 'lucide-react';
import type { Competition } from '@/data/competitions';

interface CompetitionCardProps {
  competition: Competition;
  index?: number;
  compact?: boolean;
}

interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isEnded: boolean;
}

function getCountdownParts(deadline: string): CountdownParts {
  const diff = new Date(deadline).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isEnded: true };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isEnded: false,
  };
}

function useLiveCountdown(deadline: string): CountdownParts {
  const [countdown, setCountdown] = useState(() => getCountdownParts(deadline));

  useEffect(() => {
    setCountdown(getCountdownParts(deadline));
    const timer = window.setInterval(() => setCountdown(getCountdownParts(deadline)), 1000);
    return () => window.clearInterval(timer);
  }, [deadline]);

  return countdown;
}

function getUrgencyColor(countdown: CountdownParts): string {
  if (countdown.isEnded) return 'text-[#64748B]';
  if (countdown.days < 7) return 'text-[#FBBF24]';
  return 'text-[#34D399]';
}

function formatCountdown(countdown: CountdownParts): string {
  if (countdown.isEnded) return 'Ended';
  return `${countdown.days}d ${String(countdown.hours).padStart(2, '0')}h ${String(countdown.minutes).padStart(2, '0')}m ${String(countdown.seconds).padStart(2, '0')}s`;
}

const typeConfig = {
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

const evalConfig = {
  Automated: { bg: 'bg-[rgba(0,229,255,0.12)]', text: 'text-[#00E5FF]', label: 'Automated' },
  Human: { bg: 'bg-[rgba(255,107,53,0.12)]', text: 'text-[#FF6B35]', label: 'Human Jury' },
  Hybrid: { bg: 'bg-[rgba(167,139,250,0.12)]', text: 'text-[#A78BFA]', label: 'Hybrid' },
};

export default function CompetitionCard({ competition, index = 0, compact = false }: CompetitionCardProps) {
  const navigate = useNavigate();
  const countdown = useLiveCountdown(competition.deadline);
  const urgencyClass = getUrgencyColor(countdown);
  const typeInfo = typeConfig[competition.type];
  const evalInfo = evalConfig[competition.evaluationMode];
  const TypeIcon = typeInfo.icon;

  const displayTags = useMemo(() => competition.tags.slice(0, 3), [competition.tags]);
  const extraTags = competition.tags.length > 3 ? competition.tags.length - 3 : 0;

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        onClick={() => navigate(`/competition/${competition.id}`)}
        className="cursor-pointer group rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1A2040] hover:border-[rgba(255,255,255,0.12)] hover:shadow-[0_12px_40px_rgba(0,229,255,0.08)] transition-all duration-300 hover:-translate-y-1 p-5"
      >
        <div className="flex items-center justify-between mb-3">
          <span className={`inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.06em] px-2.5 py-1 rounded ${typeInfo.bg} ${typeInfo.text} border ${typeInfo.border}`}>
            <TypeIcon className="w-3.5 h-3.5" />
            {typeInfo.label}
          </span>
          <span className={`font-mono text-[12px] font-medium tracking-[0.04em] ${urgencyClass}`}>
            {formatCountdown(countdown)}
          </span>
        </div>
        <h3 className="font-[Space_Grotesk] font-semibold text-[16px] leading-[1.3] tracking-[-0.01em] text-[#E2E8F0] mb-2 line-clamp-2">
          {competition.title}
        </h3>
        <div className="flex items-center gap-2 text-[13px] text-[#64748B] font-mono">
          <span>{competition.platform}</span>
          <span>·</span>
          <span>{competition.location}</span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      onClick={() => navigate(`/competition/${competition.id}`)}
      className="cursor-pointer group rounded-xl border border-[rgba(255,255,255,0.06)] bg-gradient-to-br from-[#1A2040] to-[#141B36] hover:border-[rgba(255,255,255,0.12)] hover:shadow-[0_12px_40px_rgba(0,229,255,0.08)] transition-all duration-300 hover:-translate-y-1 p-6 flex flex-col"
    >
      {/* Header: type badge + deadline */}
      <div className="flex items-center justify-between mb-3">
        <span className={`inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.06em] px-2.5 py-1 rounded ${typeInfo.bg} ${typeInfo.text} border ${typeInfo.border}`}>
          <TypeIcon className="w-3.5 h-3.5" />
          {typeInfo.label}
        </span>
        <span className={`font-mono text-[13px] font-medium tracking-[0.02em] ${urgencyClass}`}>
          <Calendar className="w-3.5 h-3.5 inline mr-1" />
          {formatCountdown(countdown)}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-[Space_Grotesk] font-semibold text-[20px] leading-[1.3] tracking-[-0.01em] text-[#E2E8F0] mb-2 line-clamp-2">
        {competition.title}
      </h3>

      {/* Theme line */}
      <p className="text-[15px] leading-[1.65] text-[#94A3B8] mb-3 line-clamp-1">
        {competition.theme.join(', ')}
      </p>

      {/* Meta row: platform + location */}
      <div className="flex items-center gap-2 text-[13px] text-[#64748B] font-mono mb-4">
        <span>{competition.platform}</span>
        <span>·</span>
        <span>{competition.location}</span>
      </div>

      {/* Metrics row: prize + eval mode */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-[12px] font-medium tracking-[0.04em] text-[#E2E8F0] flex items-center gap-1">
          <DollarSign className="w-3.5 h-3.5 text-[#FBBF24]" />
          {competition.prizePool}
        </span>
        <span className={`text-[11px] font-medium uppercase tracking-[0.06em] px-2.5 py-1 rounded ${evalInfo.bg} ${evalInfo.text}`}>
          {evalInfo.label}
        </span>
      </div>

      {/* Tags row */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {displayTags.map((tag) => (
          <span
            key={tag}
            className="text-[11px] font-medium uppercase tracking-[0.06em] px-2 py-1 rounded bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] text-[#64748B]"
          >
            {tag}
          </span>
        ))}
        {extraTags > 0 && (
          <span className="text-[11px] font-medium uppercase tracking-[0.06em] px-2 py-1 rounded text-[#64748B]">
            +{extraTags}
          </span>
        )}
      </div>

      {/* Footer: countdown + view details */}
      <div className="mt-auto flex items-center justify-between pt-4 border-t border-[rgba(255,255,255,0.06)]">
        <span className="font-mono text-[12px] font-medium tracking-[0.04em] text-[#E2E8F0] border border-[#00E5FF] rounded px-2.5 py-1">
          {countdown.isEnded ? 'ENDED' : formatCountdown(countdown)}
        </span>
        <span className="text-[13px] text-[#00E5FF] font-medium flex items-center gap-1 group-hover:underline">
          View Details <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </motion.div>
  );
}
