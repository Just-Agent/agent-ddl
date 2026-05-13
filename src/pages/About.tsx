import { motion } from "framer-motion";
import {
  Layers,
  CheckCircle,
  Cpu,
  GitBranch,
  BarChart3,
  Globe,
  Target,
  Search,
  CheckCheck,
  Database,
  RefreshCw,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router";

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
  hidden: { opacity: 0, y: 30 },
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

const slideX = {
  hidden: (dir: number) => ({ opacity: 0, x: dir * 30 }),
  visible: (d: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay: d, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

/* ------------------------------------------------------------------ */
/*  Feature card data                                                 */
/* ------------------------------------------------------------------ */

const features = [
  {
    icon: Layers,
    title: "Competition Types",
    description:
      "We categorize every competition into Benchmark Challenges, Hackathons, and Academic Tracks — so you can find the format that matches your goals.",
  },
  {
    icon: CheckCircle,
    title: "Evaluation Methods",
    description:
      "Automated benchmark scoring, human jury review, or hybrid approaches — we track how each competition judges submissions so you know what to optimize for.",
  },
  {
    icon: Cpu,
    title: "Model Constraints",
    description:
      "Which LLM models are allowed? Parameter limits? API-only or weights submission? We document every constraint so you can choose competitions that fit your stack.",
  },
  {
    icon: GitBranch,
    title: "Multi-Track Events",
    description:
      "Competitions with multiple parallel tracks (like CAR-bench's Open Track + Cerebras Track) get individual entries with specific benchmark details.",
  },
  {
    icon: BarChart3,
    title: "Public Leaderboards",
    description:
      "Live leaderboards, final rankings, or upcoming — we track the status and surface top performers so you can benchmark against the best.",
  },
  {
    icon: Globe,
    title: "Multi-Platform",
    description:
      "Data from Devpost, IJCAI, DoraHacks, Lablab.ai, Kaggle, HuggingFace, Google Cloud, and more — all in one place.",
  },
];

/* ------------------------------------------------------------------ */
/*  Platform data                                                     */
/* ------------------------------------------------------------------ */

const platforms = [
  {
    name: "Devpost",
    description: "General AI and agent hackathons",
    count: "10 competitions",
    countColor: "text-[#00E5FF]",
    status: "Active",
    statusColor: "text-[#34D399]",
  },
  {
    name: "IJCAI / NeurIPS / ICML",
    description: "Competition tracks at top AI conferences",
    count: "3 competitions",
    countColor: "text-[#00E5FF]",
    status: "Active",
    statusColor: "text-[#34D399]",
  },
  {
    name: "DoraHacks",
    description: "Web3 and open-source agent challenges",
    count: "2 competitions",
    countColor: "text-[#00E5FF]",
    status: "Active",
    statusColor: "text-[#34D399]",
  },
  {
    name: "Lablab.ai",
    description: "AI Agent builder competitions",
    count: "Tracked",
    countColor: "text-[#64748B]",
    status: "Planned",
    statusColor: "text-[#94A3B8]",
  },
  {
    name: "Kaggle",
    description: "ML and agent competitions with leaderboards",
    count: "Tracked",
    countColor: "text-[#64748B]",
    status: "Planned",
    statusColor: "text-[#94A3B8]",
  },
  {
    name: "HuggingFace",
    description: "Open leaderboards and model evaluations",
    count: "Tracked",
    countColor: "text-[#64748B]",
    status: "Planned",
    statusColor: "text-[#94A3B8]",
  },
  {
    name: "Google Cloud",
    description: "Enterprise AI and agent challenges",
    count: "1 competition",
    countColor: "text-[#00E5FF]",
    status: "Active",
    statusColor: "text-[#34D399]",
  },
];

/* ------------------------------------------------------------------ */
/*  Methodology steps                                                 */
/* ------------------------------------------------------------------ */

const methodologySteps = [
  {
    step: "Step 1",
    title: "Discover",
    description:
      "We run automated crawlers across 7+ platforms daily, scanning for new AI agent competitions, benchmark challenges, and academic tracks. Our NLP pipeline filters for agent-specific keywords and themes.",
    icon: Search,
  },
  {
    step: "Step 2",
    title: "Verify",
    description:
      "Every discovered competition is manually reviewed by our team. We verify deadlines, prize pools, evaluation methods, and submission requirements directly from official sources.",
    icon: CheckCheck,
  },
  {
    step: "Step 3",
    title: "Enrich",
    description:
      "We classify each competition by type, evaluation mode, model constraints, and framework requirements. Multi-track competitions get individual track entries with specific benchmark details.",
    icon: Database,
  },
  {
    step: "Step 4",
    title: "Update",
    description:
      "Deadlines change, tracks get added, prizes get updated. We monitor every tracked competition for changes and update our database within 24 hours of any modification.",
    icon: RefreshCw,
  },
];

/* ------------------------------------------------------------------ */
/*  Coverage stats                                                    */
/* ------------------------------------------------------------------ */

const coverageStats = [
  {
    value: "15+",
    label: "Competitions",
    description: "Currently tracked and open for submissions",
  },
  {
    value: "7",
    label: "Platforms",
    description: "Continuous automated scanning",
  },
  {
    value: "$300K+",
    label: "Total Prizes",
    description: "Combined prize pool across all competitions",
  },
  {
    value: "3",
    label: "Competition Types",
    description: "Benchmark, Hackathon, Academic Track",
  },
];

/* ------------------------------------------------------------------ */
/*  Platform initials for the visual grid                             */
/* ------------------------------------------------------------------ */

const platformInitials = [
  "Dv", "Ij", "DH", "Kg", "HF", "GC", "LL", "Ne", "IC",
];

/* ------------------------------------------------------------------ */
/*  Feature Card                                                      */
/* ------------------------------------------------------------------ */

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      variants={staggerItem}
      className={cn(
        "rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1A2040] p-7",
        "transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
        "hover:-translate-y-0.5 hover:border-[rgba(255,255,255,0.12)]"
      )}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[rgba(0,229,255,0.12)]">
        <Icon className="h-5 w-5 text-[#00E5FF]" />
      </div>
      <h4 className="mt-4 font-semibold text-[20px] leading-[1.3] tracking-[-0.01em] text-[#E2E8F0]">
        {title}
      </h4>
      <p className="mt-2 text-[15px] leading-[1.65] text-[#94A3B8]">
        {description}
      </p>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Timeline Step                                                     */
/* ------------------------------------------------------------------ */

function TimelineStep({
  step,
  title,
  description,
  icon: Icon,
  isLast,
  index,
}: {
  step: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  isLast: boolean;
  index: number;
}) {
  return (
    <motion.div
      variants={staggerItem}
      custom={index * 0.1}
      className="relative flex gap-6"
    >
      {/* Timeline line + dot */}
      <div className="flex flex-col items-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(0,229,255,0.12)] border border-[rgba(0,229,255,0.2)] z-10">
          <Icon className="h-4 w-4 text-[#00E5FF]" />
        </div>
        {!isLast && (
          <div className="mt-2 w-[2px] flex-1 bg-gradient-to-b from-[rgba(0,229,255,0.3)] to-transparent min-h-[40px]" />
        )}
      </div>

      {/* Content */}
      <div className={cn("pb-10", isLast && "pb-0")}>
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-[#00E5FF]">
          {step}
        </span>
        <h4 className="mt-1 font-semibold text-[18px] leading-[1.3] text-[#E2E8F0]">
          {title}
        </h4>
        <p className="mt-2 text-[15px] leading-[1.65] text-[#94A3B8] max-w-[560px]">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page Component                                               */
/* ------------------------------------------------------------------ */

export default function About() {
  return (
    <div className="min-h-[100dvh] bg-[#080A1A]">
      {/* ============================================================ */}
      {/*  Section 1: Page Header                                      */}
      {/* ============================================================ */}
      <section className="bg-gradient-to-b from-[#080A1A] to-[#0E1233] pt-[120px] pb-20">
        <div className="mx-auto max-w-[1280px] px-6 text-center">
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
              About Agent-DDL
            </motion.p>

            <motion.h1
              variants={fadeUp}
              custom={0.4}
              className="mt-4 font-bold text-[64px] leading-[1.05] tracking-[-0.03em] text-[#E2E8F0] max-md:text-[40px] mx-auto max-w-[800px]"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              The Home for AI Agent Competitions
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={0.6}
              className="mt-4 text-[18px] leading-[1.7] text-[#94A3B8] mx-auto max-w-[640px]"
            >
              We track every AI agent competition, benchmark challenge, and academic evaluation — so
              researchers and builders never miss an opportunity to push the frontier.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={0.8}
              className="mt-8 flex items-center justify-center gap-4 flex-wrap"
            >
              <Link
                to="/competitions"
                className={cn(
                  "inline-flex items-center gap-2 rounded-lg bg-[#00E5FF] px-6 py-3 text-[15px] font-semibold text-[#080A1A]",
                  "transition-all duration-200 hover:bg-[#33EAFF] hover:scale-[1.02] active:scale-[0.98]"
                )}
              >
                Browse Competitions <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/leaderboards"
                className={cn(
                  "inline-flex items-center gap-2 rounded-lg border border-[#00E5FF] bg-transparent px-6 py-3 text-[15px] font-semibold text-[#00E5FF]",
                  "transition-all duration-200 hover:bg-[rgba(0,229,255,0.12)]"
                )}
              >
                View Leaderboards <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Section 2: Mission                                          */}
      {/* ============================================================ */}
      <section className="bg-[#080A1A] py-[100px]">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="grid grid-cols-[55%_45%] gap-12 items-center max-lg:grid-cols-1">
            {/* Left - Text */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={staggerContainer}
            >
              <motion.p
                variants={fadeUp}
                custom={0}
                className="text-[11px] font-medium uppercase tracking-[0.1em] text-[#00E5FF]"
              >
                Our Mission
              </motion.p>
              <motion.h2
                variants={fadeUp}
                custom={0.1}
                className="mt-4 font-bold text-[48px] leading-[1.1] tracking-[-0.02em] text-[#E2E8F0] max-md:text-[32px]"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                Why Agent-DDL Exists
              </motion.h2>
              <motion.p
                variants={fadeUp}
                custom={0.2}
                className="mt-6 text-[15px] leading-[1.7] text-[#E2E8F0]"
              >
                The AI agent ecosystem is exploding. Every week, new competitions launch across
                Devpost, academic conferences, DoraHacks, Kaggle, and enterprise platforms. But
                there's no central place to discover them.
              </motion.p>
              <motion.p
                variants={fadeUp}
                custom={0.3}
                className="mt-5 text-[15px] leading-[1.7] text-[#94A3B8]"
              >
                We built Agent-DDL to solve this. We're the most comprehensive directory of AI agent
                competitions and benchmark challenges — tracking deadlines, leaderboards, evaluation
                methods, and submission requirements across every major platform.
              </motion.p>
              <motion.p
                variants={fadeUp}
                custom={0.4}
                className="mt-5 text-[15px] leading-[1.7] text-[#94A3B8]"
              >
                Whether you're a researcher looking for the next benchmark to beat, a builder
                hunting for hackathons with real prizes, or a student seeking academic challenges —
                Agent-DDL is your starting point.
              </motion.p>
            </motion.div>

            {/* Right - Visual */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className={cn(
                "rounded-2xl border border-[rgba(255,255,255,0.06)] bg-gradient-to-br from-[#1A2040] to-[#141B36] p-10",
                "flex flex-col items-center"
              )}
            >
              {/* Large decorative icon */}
              <div className="relative flex h-32 w-32 items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-[rgba(0,229,255,0.08)] blur-2xl" />
                <Target className="relative h-16 w-16 text-[#00E5FF]" />
              </div>

              {/* Platform grid */}
              <div className="mt-8 grid grid-cols-3 gap-3">
                {platformInitials.map((initial, i) => (
                  <motion.div
                    key={initial}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.04 }}
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-lg bg-[#080A1A] border border-[rgba(255,255,255,0.06)]",
                      i === 4 && "border-[rgba(0,229,255,0.3)] bg-[rgba(0,229,255,0.08)]"
                    )}
                  >
                    <span
                      className={cn(
                        "font-mono text-[12px] font-medium tracking-[0.02em]",
                        i === 4 ? "text-[#00E5FF]" : "text-[#94A3B8]"
                      )}
                    >
                      {initial}
                    </span>
                  </motion.div>
                ))}
              </div>

              <p className="mt-6 text-center font-mono text-[13px] tracking-[0.02em] text-[#64748B]">
                9 platforms, 15+ active competitions, continuous monitoring
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Section 3: What We Track                                    */}
      {/* ============================================================ */}
      <section className="bg-[#0E1233] py-[100px]">
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
              What We Track
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={0.1}
              className="mt-4 text-[18px] leading-[1.7] text-[#94A3B8]"
            >
              Comprehensive coverage of every dimension that matters
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="mt-16 grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1"
          >
            {features.map((f) => (
              <FeatureCard key={f.title} icon={f.icon} title={f.title} description={f.description} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Section 4: Data Sources                                     */}
      {/* ============================================================ */}
      <section className="bg-[#080A1A] py-[100px]">
        <div className="mx-auto max-w-[1280px] px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="font-bold text-[48px] leading-[1.1] tracking-[-0.02em] text-[#E2E8F0] max-md:text-[32px]"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Where Our Data Comes From
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={0.1}
              className="mt-4 text-[18px] leading-[1.7] text-[#94A3B8]"
            >
              We monitor these platforms 24/7 to find every agent competition
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="mt-12 flex flex-col gap-3"
          >
            {platforms.map((p, i) => (
              <motion.div
                key={p.name}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
                  },
                }}
                className={cn(
                  "flex items-center justify-between rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1A2040] px-6 py-5",
                  "transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
                  "hover:border-[rgba(255,255,255,0.12)] hover:translate-x-1"
                )}
              >
                <div>
                  <div className="flex items-center gap-3">
                    <h4 className="text-[15px] font-semibold text-[#E2E8F0]">{p.name}</h4>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.06em]",
                        p.statusColor
                      )}
                    >
                      <span className={cn("h-1.5 w-1.5 rounded-full", p.status === "Active" ? "bg-[#34D399]" : "bg-[#94A3B8]")} />
                      {p.status === "Active" ? "Active monitoring" : "Planned"}
                    </span>
                  </div>
                  <p className="mt-1 text-[13px] font-mono tracking-[0.02em] text-[#64748B]">
                    {p.description}
                  </p>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <span className={cn("font-mono text-[14px] font-medium tracking-[0.02em]", p.countColor)}>
                    {p.count}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Section 5: Methodology                                      */}
      {/* ============================================================ */}
      <section className="bg-[#0E1233] py-[100px]">
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
              How We Work
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={0.1}
              className="mt-4 text-[18px] leading-[1.7] text-[#94A3B8]"
            >
              Our process for discovering and verifying competitions
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
            className="mt-16 max-w-[720px] mx-auto"
          >
            {methodologySteps.map((s, i) => (
              <TimelineStep
                key={s.step}
                step={s.step}
                title={s.title}
                description={s.description}
                icon={s.icon}
                isLast={i === methodologySteps.length - 1}
                index={i}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Section 6: Coverage Stats                                   */}
      {/* ============================================================ */}
      <section className="bg-[#080A1A] py-20">
        <div className="mx-auto max-w-[1280px] px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="text-center font-bold text-[48px] leading-[1.1] tracking-[-0.02em] text-[#E2E8F0] max-md:text-[32px]"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Coverage Stats
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="mt-12 grid grid-cols-4 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1"
          >
            {coverageStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                custom={i * 0.1}
                className={cn(
                  "rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1A2040] p-8 text-center",
                  "transition-all duration-300 hover:border-[rgba(255,255,255,0.12)]"
                )}
              >
                <div
                  className="font-bold text-[48px] leading-[1.1] tracking-[-0.02em] text-[#00E5FF] max-md:text-[36px]"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  {stat.value}
                </div>
                <div className="mt-2 text-[15px] leading-[1.65] text-[#94A3B8]">{stat.label}</div>
                <div className="mt-1 font-mono text-[12px] tracking-[0.04em] text-[#64748B]">
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Section 7: CTA                                              */}
      {/* ============================================================ */}
      <section className="bg-gradient-to-br from-[#0E1233] via-[#1A2040] to-[#0E1233] py-[100px]">
        <div className="mx-auto max-w-[800px] px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="font-bold text-[48px] leading-[1.1] tracking-[-0.02em] text-[#E2E8F0] max-md:text-[32px]"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Ready to Find Your Next Challenge?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={0.2}
              className="mt-4 text-[18px] leading-[1.7] text-[#94A3B8] mx-auto max-w-[560px]"
            >
              Browse all active AI agent competitions and benchmark challenges. Filter by type,
              evaluation method, and deadline to find the perfect match.
            </motion.p>
            <motion.div variants={fadeUp} custom={0.4} className="mt-8">
              <Link
                to="/competitions"
                className={cn(
                  "inline-flex items-center gap-2 rounded-lg bg-[#00E5FF] px-8 py-3.5 text-[16px] font-semibold text-[#080A1A]",
                  "transition-all duration-200 hover:bg-[#33EAFF] hover:scale-[1.02] active:scale-[0.98]"
                )}
              >
                Explore Competitions <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
            <motion.p variants={fadeUp} custom={0.5} className="mt-4">
              <span className="text-[15px] text-[#94A3B8]">
                Want to contribute?{" "}
                <a
                  href="mailto:submit@agentddl.com"
                  className="text-[#00E5FF] hover:underline transition-colors"
                >
                  Submit a competition →
                </a>
              </span>
            </motion.p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
