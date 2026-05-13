import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  UploadCloud,
  Activity,
  BarChart2,
  RefreshCw,
  Trophy,
  Users,
  Clock,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { competitions, type Competition } from "@/data/competitions";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Animation variants                                                */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: d, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (d: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay: d, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

const statusConfig = {
  Live: {
    dotClass: "bg-[#34D399]",
    textClass: "text-[#34D399]",
    pulse: true,
  },
  Final: {
    dotClass: "bg-[#64748B]",
    textClass: "text-[#64748B]",
    pulse: false,
  },
  Upcoming: {
    dotClass: "bg-[#FBBF24]",
    textClass: "text-[#FBBF24]",
    pulse: false,
  },
};

const typeBadgeColors: Record<string, { bg: string; text: string; border: string }> = {
  Benchmark: {
    bg: "bg-[rgba(0,229,255,0.12)]",
    text: "text-[#22D3EE]",
    border: "border-[rgba(34,211,238,0.3)]",
  },
  Hackathon: {
    bg: "bg-[rgba(255,107,53,0.12)]",
    text: "text-[#FF6B35]",
    border: "border-[rgba(255,107,53,0.3)]",
  },
  Academic: {
    bg: "bg-[rgba(167,139,250,0.12)]",
    text: "text-[#A78BFA]",
    border: "border-[rgba(167,139,250,0.3)]",
  },
};

const evalBadgeColors: Record<string, { bg: string; text: string }> = {
  "Automated Benchmark": { bg: "bg-[rgba(0,229,255,0.12)]", text: "text-[#00E5FF]" },
  "Human Jury": { bg: "bg-[rgba(255,107,53,0.12)]", text: "text-[#FF6B35]" },
  Hybrid: { bg: "bg-[rgba(167,139,250,0.12)]", text: "text-[#A78BFA]" },
};

function getLeaderboardStatus(comp: Competition): "Live" | "Final" | "Upcoming" {
  return comp.status;
}

/* ------------------------------------------------------------------ */
/*  Leaderboard Card                                                  */
/* ------------------------------------------------------------------ */

function LeaderboardCard({ comp }: { comp: Competition }) {
  const status = getLeaderboardStatus(comp);
  const sConf = statusConfig[status];
  const tConf = typeBadgeColors[comp.type];
  const eConf = evalBadgeColors[comp.evaluationMode];

  return (
    <motion.div
      variants={staggerItem}
      className={cn(
        "group relative rounded-xl border border-[rgba(255,255,255,0.06)] bg-gradient-to-br from-[#1A2040] to-[#141B36] p-7",
        "transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
        "hover:-translate-y-1 hover:border-[rgba(255,255,255,0.12)] hover:shadow-[0_12px_40px_rgba(0,229,255,0.06)]"
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold text-[20px] leading-[1.3] tracking-[-0.01em] text-[#E2E8F0] group-hover:text-[#00E5FF] transition-colors duration-200">
          {comp.name}
        </h3>
        <div className="flex items-center gap-2 shrink-0">
          <span
            className={cn(
              "inline-block h-2 w-2 rounded-full",
              sConf.dotClass,
              sConf.pulse && "animate-pulse"
            )}
          />
          <span className={cn("text-[11px] font-medium uppercase tracking-[0.06em]", sConf.textClass)}>
            {status}
          </span>
        </div>
      </div>

      {/* Type + Evaluation badges */}
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <span
          className={cn(
            "inline-flex items-center rounded border px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-[0.06em]",
            tConf.bg,
            tConf.text,
            tConf.border
          )}
        >
          {comp.type === "Benchmark" && <Trophy className="mr-1 h-3 w-3" />}
          {comp.type}
        </span>
        <span
          className={cn(
            "inline-flex items-center rounded px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-[0.06em]",
            eConf.bg,
            eConf.text
          )}
        >
          {comp.evaluationMode}
        </span>
      </div>

      {/* Description */}
      <p className="mt-3 text-[15px] leading-[1.65] text-[#94A3B8] line-clamp-2">
        {comp.description}
      </p>

      {/* Metrics grid */}
      <div className="mt-5 grid grid-cols-3 gap-3">
        <div>
          <div className="text-[11px] font-medium uppercase tracking-[0.06em] text-[#64748B]">
            Top Score
          </div>
          <div className="mt-1 font-mono text-[18px] font-medium text-[#00E5FF]">
            {comp.topScore ?? "—"}
          </div>
        </div>
        <div>
          <div className="text-[11px] font-medium uppercase tracking-[0.06em] text-[#64748B]">
            Entries
          </div>
          <div className="mt-1 font-mono text-[18px] font-medium text-[#E2E8F0]">
            {comp.entries.toLocaleString()}
          </div>
        </div>
        <div>
          <div className="text-[11px] font-medium uppercase tracking-[0.06em] text-[#64748B]">
            Updated
          </div>
          <div className="mt-1 font-mono text-[14px] font-medium text-[#94A3B8]">
            {comp.lastUpdated}
          </div>
        </div>
      </div>

      {/* Top 3 Preview (only for Live/Final with entries) */}
      {(status === "Live" || status === "Final") && comp.entries > 0 && comp.top3 && (
        <div className="mt-5">
          <div className="text-[11px] font-medium uppercase tracking-[0.06em] text-[#64748B] mb-2">
            Top 3
          </div>
          <div className="flex flex-col gap-2">
            {comp.top3.map((entry) => {
              const medalColors = [
                "bg-[rgba(251,191,36,0.15)] text-[#FBBF24]",
                "bg-[rgba(192,192,192,0.1)] text-[#C0C0C0]",
                "bg-[rgba(205,127,50,0.15)] text-[#CD7F32]",
              ];
              const medals = ["🥇", "🥈", "🥉"];
              return (
                <div
                  key={entry.rank}
                  className="flex items-center justify-between rounded-md bg-[#080A1A]/50 px-3 py-2"
                >
                  <div className="flex items-center gap-2">
                    <span className={cn("flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold", medalColors[entry.rank - 1])}>
                      {entry.rank}
                    </span>
                    <span className="text-[15px] text-[#E2E8F0]">{entry.team}</span>
                  </div>
                  <span className="font-mono text-[13px] font-medium tracking-[0.02em] text-[#E2E8F0]">
                    {entry.score}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty state for live with no entries */}
      {status === "Live" && comp.entries === 0 && (
        <div className="mt-5 rounded-md bg-[#080A1A]/50 px-3 py-4 text-center">
          <span className="text-[13px] font-mono tracking-[0.02em] text-[#64748B]">
            Be the first to submit
          </span>
        </div>
      )}

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between border-t border-[rgba(255,255,255,0.06)] pt-4">
        <span className="flex items-center gap-1 text-[13px] font-medium tracking-[0.02em] text-[#00E5FF] cursor-pointer hover:underline">
          View Leaderboard <ArrowRight className="h-3.5 w-3.5" />
        </span>
        <span className="text-[13px] font-mono tracking-[0.02em] text-[#64748B]">
          on {comp.platform}
        </span>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  How It Works Step                                                 */
/* ------------------------------------------------------------------ */

function HowStep({
  icon: Icon,
  number,
  title,
  description,
  delay,
}: {
  icon: React.ComponentType<{ className?: string }>;
  number: string;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <motion.div
      variants={staggerItem}
      custom={delay}
      className="relative flex flex-col items-center text-center"
    >
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(0,229,255,0.12)] border border-[rgba(0,229,255,0.2)]">
        <Icon className="h-6 w-6 text-[#00E5FF]" />
      </div>
      <div className="text-[32px] font-bold leading-[1.1] text-[rgba(0,229,255,0.2)] font-[Space_Grotesk]">
        {number}
      </div>
      <h4 className="mt-2 font-semibold text-[20px] leading-[1.3] tracking-[-0.01em] text-[#E2E8F0]">
        {title}
      </h4>
      <p className="mt-2 text-[15px] leading-[1.65] text-[#94A3B8] max-w-[260px]">
        {description}
      </p>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page Component                                               */
/* ------------------------------------------------------------------ */

export default function Leaderboards() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [typeFilters, setTypeFilters] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<"updated" | "name">("updated");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const statusOptions = ["Live", "Final", "Upcoming"] as const;
  const typeOptions = ["Benchmark", "Hackathon", "Academic"] as const;

  const toggleType = (t: string) => {
    setTypeFilters((prev) => {
      const next = new Set(prev);
      if (next.has(t)) next.delete(t);
      else next.add(t);
      return next;
    });
  };

  const filtered = useMemo(() => {
    let list = [...competitions];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.platform.toLowerCase().includes(q)
      );
    }

    if (statusFilter) {
      list = list.filter((c) => c.status === statusFilter);
    }

    if (typeFilters.size > 0) {
      list = list.filter((c) => typeFilters.has(c.type));
    }

    if (sortBy === "name") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }
    // "updated" keeps default order (design order)

    return list;
  }, [search, statusFilter, typeFilters, sortBy]);

  const liveCount = competitions.filter((c) => c.status === "Live").length;
  const totalCount = competitions.length;

  return (
    <div className="min-h-[100dvh] bg-[#080A1A]">
      {/* ============================================================ */}
      {/*  Section 1: Page Header                                      */}
      {/* ============================================================ */}
      <section className="bg-gradient-to-b from-[#080A1A] to-[#0E1233] pt-[100px] pb-[60px]">
        <div className="mx-auto max-w-[1280px] px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.p
              variants={fadeUp}
              custom={0.2}
              className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#00E5FF]"
            >
              Live Rankings
            </motion.p>

            <motion.h1
              variants={fadeUp}
              custom={0.4}
              className="mt-4 font-bold text-[64px] leading-[1.05] tracking-[-0.03em] text-[#E2E8F0] max-md:text-[40px]"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Agent Benchmark Leaderboards
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={0.6}
              className="mt-4 text-[18px] leading-[1.7] text-[#94A3B8] max-w-[640px]"
            >
              Track public leaderboards for AI agent competitions. Real-time and final
              rankings for benchmark challenges and hackathons.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={0.8}
              className="mt-6 flex flex-wrap gap-4"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-[rgba(52,211,153,0.15)] px-4 py-2 text-[13px] font-mono tracking-[0.02em] text-[#34D399]">
                <span className="h-2 w-2 rounded-full bg-[#34D399] animate-pulse" />
                {liveCount} Live
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#1A2040] px-4 py-2 text-[13px] font-mono tracking-[0.02em] text-[#94A3B8]">
                {competitions.filter((c) => c.status === "Final").length} Final
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#1A2040] px-4 py-2 text-[13px] font-mono tracking-[0.02em] text-[#94A3B8]">
                {competitions.filter((c) => c.status === "Upcoming").length} Upcoming
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Section 2: Filter Bar                                       */}
      {/* ============================================================ */}
      <section className="sticky top-0 z-40 border-b border-[rgba(255,255,255,0.06)] bg-[#0E1233]/85 backdrop-blur-[12px]">
        <div className="mx-auto max-w-[1280px] px-6 py-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="flex flex-wrap items-center gap-4"
          >
            {/* Search */}
            <div className="relative flex-shrink-0 w-[280px] max-md:w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748B]" />
              <input
                type="text"
                placeholder="Search leaderboards..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={cn(
                  "w-full rounded-lg border border-[rgba(255,255,255,0.06)] bg-[#1A2040] py-2.5 pl-10 pr-4",
                  "text-[15px] text-[#E2E8F0] placeholder-[#64748B] outline-none",
                  "focus:border-[#00E5FF] focus:shadow-[0_0_0_3px_rgba(0,229,255,0.15)]",
                  "transition-all duration-200"
                )}
              />
            </div>

            {/* Status filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-[#64748B] mr-1">
                Status
              </span>
              {statusOptions.map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter((prev) => (prev === s ? null : s))}
                  className={cn(
                    "rounded px-3 py-1.5 text-[13px] font-medium transition-all duration-200",
                    statusFilter === s
                      ? "bg-[rgba(0,229,255,0.12)] border border-[#00E5FF] text-[#00E5FF]"
                      : "bg-transparent border border-[rgba(255,255,255,0.06)] text-[#94A3B8] hover:border-[rgba(255,255,255,0.12)] hover:text-[#E2E8F0]"
                  )}
                >
                  {s === "Live" && (
                    <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[#34D399] animate-pulse" />
                  )}
                  {s}
                </button>
              ))}
            </div>

            {/* Type filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-[#64748B] mr-1">
                Type
              </span>
              {typeOptions.map((t) => (
                <button
                  key={t}
                  onClick={() => toggleType(t)}
                  className={cn(
                    "rounded px-3 py-1.5 text-[13px] font-medium transition-all duration-200",
                    typeFilters.has(t)
                      ? "bg-[rgba(0,229,255,0.12)] border border-[#00E5FF] text-[#00E5FF]"
                      : "bg-transparent border border-[rgba(255,255,255,0.06)] text-[#94A3B8] hover:border-[rgba(255,255,255,0.12)] hover:text-[#E2E8F0]"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="relative ml-auto max-md:ml-0">
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className={cn(
                  "flex items-center gap-2 rounded-lg border border-[rgba(255,255,255,0.06)] bg-[#1A2040] px-4 py-2.5",
                  "text-[13px] font-medium text-[#94A3B8] hover:text-[#E2E8F0] transition-colors"
                )}
              >
                {sortBy === "updated" ? "Recently Updated" : "Competition Name"}
                <ChevronDown className="h-4 w-4" />
              </button>
              <AnimatePresence>
                {showSortDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 z-50 min-w-[200px] rounded-lg border border-[rgba(255,255,255,0.12)] bg-[#1A2040] shadow-xl py-1"
                  >
                    <button
                      onClick={() => { setSortBy("updated"); setShowSortDropdown(false); }}
                      className={cn(
                        "block w-full px-4 py-2 text-left text-[13px] transition-colors",
                        sortBy === "updated" ? "text-[#00E5FF] bg-[rgba(0,229,255,0.08)]" : "text-[#94A3B8] hover:bg-[rgba(255,255,255,0.04)]"
                      )}
                    >
                      Recently Updated
                    </button>
                    <button
                      onClick={() => { setSortBy("name"); setShowSortDropdown(false); }}
                      className={cn(
                        "block w-full px-4 py-2 text-left text-[13px] transition-colors",
                        sortBy === "name" ? "text-[#00E5FF] bg-[rgba(0,229,255,0.08)]" : "text-[#94A3B8] hover:bg-[rgba(255,255,255,0.04)]"
                      )}
                    >
                      Competition Name
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Section 3: Leaderboard Grid                                 */}
      {/* ============================================================ */}
      <section className="bg-[#080A1A] pt-10 pb-20">
        <div className="mx-auto max-w-[1280px] px-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-6 font-mono text-[13px] tracking-[0.02em] text-[#64748B]"
          >
            Showing {filtered.length} leaderboards
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid grid-cols-2 gap-6 max-md:grid-cols-1"
          >
            {filtered.map((comp) => (
              <LeaderboardCard key={comp.id} comp={comp} />
            ))}
          </motion.div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center py-20"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1A2040]">
                <Search className="h-8 w-8 text-[#64748B]" />
              </div>
              <p className="mt-4 text-[18px] font-semibold text-[#E2E8F0]">
                No leaderboards found
              </p>
              <p className="mt-2 text-[15px] text-[#94A3B8]">
                Try adjusting your search or filters
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Section 4: How It Works                                     */}
      {/* ============================================================ */}
      <section className="bg-[#0E1233] py-20">
        <div className="mx-auto max-w-[1280px] px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="font-bold text-[48px] leading-[1.1] tracking-[-0.02em] text-[#E2E8F0] max-md:text-[32px]"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              How Leaderboards Work
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={0.1}
              className="mt-4 text-[18px] leading-[1.7] text-[#94A3B8]"
            >
              Understanding rankings across different competition types
            </motion.p>
          </motion.div>

          {/* Steps with connecting line */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
            className="relative mt-16"
          >
            {/* Dashed connecting line - desktop only */}
            <div className="absolute top-[60px] left-[12.5%] right-[12.5%] hidden md:block">
              <div className="h-[2px] w-full border-t-2 border-dashed border-[rgba(255,255,255,0.06)]" />
            </div>

            <div className="grid grid-cols-4 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
              <HowStep
                icon={UploadCloud}
                number="01"
                title="Submit Your Agent"
                description="Upload model weights, provide an API endpoint, or submit benchmark results depending on the competition requirements."
                delay={0}
              />
              <HowStep
                icon={Activity}
                number="02"
                title="Automated Evaluation"
                description="For benchmark challenges, your submission is automatically scored against the test suite. Results appear within minutes."
                delay={0.15}
              />
              <HowStep
                icon={BarChart2}
                number="03"
                title="See Your Ranking"
                description="Your score and rank appear on the public leaderboard. Track your position relative to other participants in real-time."
                delay={0.3}
              />
              <HowStep
                icon={RefreshCw}
                number="04"
                title="Iterate & Improve"
                description="Most competitions allow multiple submissions. Refine your approach and climb the leaderboard before the deadline."
                delay={0.45}
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
