import { useEffect, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Cloud,
  Database,
  Euro,
  FileText,
  Github,
  GitBranch,
  Languages,
  Landmark,
  Layers3,
  LockKeyhole,
  Maximize2,
  MessageSquareText,
  PlayCircle,
  Route,
  ShieldCheck,
  TerminalSquare,
  UserRoundCheck,
  X,
} from 'lucide-react';
import BackButton from '../../reusable/BackButton';
import Container from '../../layout/Container';
import RelatedProjects from '../RelatedProjects';
import AppHeader from '../../shared/AppHeader';
import AppFooter from '../../shared/AppFooter';
import PagesMetaHead from '../../PagesMetaHead';

const TESSERA_STATS = [
  { icon: Languages, value: '3', label: 'Languages', detail: 'French, German, English' },
  { icon: ShieldCheck, value: '40', label: 'Failure cases', detail: 'CI-gated non-regression set' },
  { icon: Layers3, value: '4', label: 'Quality layers', detail: 'Guard, eval, audit, escalation' },
  { icon: Database, value: '4', label: 'Regulatory corpora', detail: 'DORA, CNIL, BaFin, GDPR' },
];

const QUALITY_LAYERS = [
  {
    icon: LockKeyhole,
    title: 'Runtime guard',
    eyebrow: 'mcp-firewall',
    description:
      'Sensitive tool calls are checked before execution with allow, deny, transform, and redaction decisions',
  },
  {
    icon: GitBranch,
    title: 'Offline tests',
    eyebrow: 'Regression suite',
    description:
      'Documented failure cases are replayed against the agent graph so safety behavior can regress loudly',
  },
  {
    icon: FileText,
    title: 'Structured audit',
    eyebrow: 'JSON evidence',
    description:
      'Each guard decision records the policy rule, rationale, target tool, redacted arguments, and operational timestamps',
  },
  {
    icon: Route,
    title: 'Human escalation',
    eyebrow: 'Reviewer node',
    description:
      'Low-confidence or high-stakes turns route to escalation instead of pretending the answer is certain',
  },
];

const STACK_GROUPS = [
  {
    title: 'Agent',
    items: ['LangGraph', 'FastAPI', 'Python 3.12', 'uv'],
  },
  {
    title: 'Retrieval',
    items: ['PostgreSQL', 'pgvector', 'Hybrid search', 'Regulatory corpora'],
  },
  {
    title: 'LLM paths',
    items: ['Vertex AI', 'Cloud Run', 'Ollama', 'Llama 3.3 70B'],
  },
  {
    title: 'Quality',
    items: ['mcp-firewall', 'pytest', 'mypy strict', 'ruff'],
  },
];

const PROJECT_PHASES = [
  'Multilingual support agent for Crédit Aurore',
  'Guarded function calls for sensitive banking actions',
  'Traceable audit evidence for reviewer and operator workflows',
  'Non-regression catalogue covering known agent failure patterns',
];

const EXECUTION_FLOW = [
  {
    icon: Route,
    title: 'Route',
    detail: 'Classify language, intent, and urgency before planning',
  },
  {
    icon: Database,
    title: 'Retrieve',
    detail: 'Pull product and regulation context from pgvector',
  },
  {
    icon: LockKeyhole,
    title: 'Guard',
    detail: 'Check sensitive tool calls through policy before execution',
  },
  {
    icon: FileText,
    title: 'Audit',
    detail: 'Emit structured evidence for reviewer and operator views',
  },
  {
    icon: CheckCircle2,
    title: 'Respond',
    detail: 'Answer, decline, or escalate with confidence signals',
  },
];

const HERO_TRACE_STEPS = [
  {
    icon: MessageSquareText,
    label: 'User message',
    detail: 'Unknown payments detected',
    tone: 'sky',
  },
  {
    icon: ShieldCheck,
    label: 'Intent & policy check',
    detail: 'identity_required',
    tone: 'green',
  },
  {
    icon: TerminalSquare,
    label: 'Tool authorization',
    detail: 'account_lookup requested',
    tone: 'amber',
  },
  {
    icon: LockKeyhole,
    label: 'Decision: blocked',
    detail: 'identity not verified',
    tone: 'rose',
  },
  {
    icon: UserRoundCheck,
    label: 'Escalate to human',
    detail: 'reviewer handoff',
    tone: 'violet',
  },
];

const SCENARIO_SIGNALS = [
  ['Intent', 'urgent_card'],
  ['Planner route', 'ESCALATION only'],
  ['Blocked shortcut', 'No balance lookup'],
  ['Evidence', 'Guard + reviewer trail'],
];

const SCENARIO_CHECKS = [
  'Recognizes stolen-card urgency before ordinary account lookup',
  'Avoids exposing account data while fraud context is unresolved',
  'Escalates to a human path with structured evidence attached',
];

const ROUTE_COMPARISON = [
  {
    title: 'Naive agent route',
    status: 'Looks helpful, leaks context',
    tone: 'risk',
    steps: ['Fetch account data', 'Show suspicious payments', 'Try to block the card late'],
    note: 'The assistant optimizes for an answer before ownership, urgency, and disclosure risk are resolved',
  },
  {
    title: 'Tessera route',
    status: 'Guarded, auditable handoff',
    tone: 'safe',
    steps: ['Classify fraud urgency', 'Block unsafe lookup path', 'Escalate with redacted evidence'],
    note: 'The system keeps the user moving toward help while preserving a reviewer-ready trail',
  },
];

const EVIDENCE_ITEMS = [
  {
    icon: ShieldCheck,
    label: 'Runtime',
    value: 'Before action',
    detail: 'Tool arguments checked before execution',
    tone: 'violet',
  },
  {
    icon: GitBranch,
    label: 'Regression',
    value: 'Replayable',
    detail: 'Failure catalogue lives as JSON test cases',
    tone: 'green',
  },
  {
    icon: FileText,
    label: 'Audit',
    value: 'Structured',
    detail: 'Every guard decision is inspectable',
    tone: 'sky',
  },
  {
    icon: UserRoundCheck,
    label: 'Escalation',
    value: 'Explicit',
    detail: 'Low confidence becomes a handoff',
    tone: 'amber',
  },
];

const ASSURANCE_ITEMS = [
  {
    icon: CheckCircle2,
    label: 'Build gate',
    value: 'ruff, mypy, pytest',
    detail: 'The system is framed as software that must keep compiling, typing, and replaying',
  },
  {
    icon: ShieldCheck,
    label: 'Safety gate',
    value: '40 failure replays',
    detail: 'Known agent failures are catalogued as JSON test cases instead of left as anecdotes',
  },
  {
    icon: Cloud,
    label: 'Hosted path',
    value: 'Cloud Run + Cloud SQL',
    detail: 'The frontier path is deployable with managed runtime, secrets, logs, and monitoring',
  },
  {
    icon: TerminalSquare,
    label: 'Local path',
    value: 'Ollama on Apple Silicon',
    detail: 'The on-prem mode keeps the banking story credible when data cannot leave the perimeter',
  },
];

const SYSTEM_UI_SURFACES = [
  {
    icon: MessageSquareText,
    label: 'Chat workbench',
    detail: 'Test the multilingual banking-support flow with guarded tool calls',
  },
  {
    icon: FileText,
    label: 'Audit trail',
    detail: 'Inspect policy decisions, redactions, policy rules, and reviewer evidence',
  },
  {
    icon: GitBranch,
    label: 'Eval scorecard',
    detail: 'Replay known failure cases and see what still needs work',
  },
];

const SYSTEM_PREVIEW_TABS = [
  { label: 'Chat', status: 'guarded' },
  { label: 'Audit', status: 'live' },
  { label: 'Eval', status: '40 cases' },
];

const SYSTEM_PREVIEW_EVENTS = [
  ['classify', 'urgent_card', 'sky'],
  ['guard', 'identity_required', 'amber'],
  ['decision', 'block account_lookup', 'rose'],
  ['handoff', 'human_escalation', 'green'],
];

const PROOF_NAV_ITEMS = [
  {
    key: 'demo',
    label: 'Live demo',
    detail: 'Try the UI',
    icon: TerminalSquare,
    fallbackHref: '#demo-system-ui',
    linkKeys: ['demo', 'systemUi'],
    accent: 'primary',
  },
  {
    key: 'video',
    label: 'Video',
    detail: 'Watch flow',
    icon: PlayCircle,
    fallbackHref: '#demo-video',
    linkKeys: ['video', 'demoVideo'],
  },
  {
    key: 'scenario',
    label: 'Risk case',
    detail: 'Card theft',
    icon: ShieldCheck,
    fallbackHref: '#risk-scenario',
  },
  {
    key: 'eval',
    label: 'Eval',
    detail: '40 failures',
    icon: GitBranch,
    fallbackHref: '#eval-scorecard',
  },
  {
    key: 'architecture',
    label: 'Diagrams',
    detail: 'Zoomable',
    icon: Layers3,
    fallbackHref: '#architecture-diagrams',
  },
];

const LANGUAGE_CASES = [
  {
    locale: 'FR',
    market: 'France',
    regulator: 'CNIL + GDPR',
    customer: 'Je veux contester un paiement carte visible depuis hier',
    route: 'transaction_search -> reviewer',
    decision: 'verify identity first',
    answer: 'French, bounded, cited',
    tone: 'blue',
  },
  {
    locale: 'DE',
    market: 'Germany',
    regulator: 'BaFin + DORA',
    customer: 'Meine Karte wurde gestohlen. Kannst du mein Konto pruefen?',
    route: 'urgent_card -> escalation',
    decision: 'block account lookup',
    answer: 'German, no disclosure',
    tone: 'amber',
  },
  {
    locale: 'EN',
    market: 'Cross-border EU',
    regulator: 'GDPR + DORA',
    customer: 'Can you explain why my loan simulation changed?',
    route: 'loan_simulate -> audit',
    decision: 'redact sensitive fields',
    answer: 'English, grounded',
    tone: 'green',
  },
];

const SCORECARD_SUMMARY = [
  ['Catalogue', '40 cases'],
  ['Locales', 'FR / DE / EN'],
  ['Gate', 'eval.yml'],
  ['Output', 'JSON + markdown'],
];

const FAILURE_ROWS = [
  {
    id: '01',
    failure: 'Prompt injection',
    check: 'forbidden phrase + tool boundary',
    expected: 'refuse or transform',
    status: 'guarded',
  },
  {
    id: '02',
    failure: 'PII leakage',
    check: 'redaction + disclosure limit',
    expected: 'redact evidence',
    status: 'redacted',
  },
  {
    id: '03',
    failure: 'Citation hallucination',
    check: 'grounded source required',
    expected: 'cite corpus only',
    status: 'grounded',
  },
  {
    id: '04',
    failure: 'Overconfident action',
    check: 'must_escalate path',
    expected: 'human review',
    status: 'escalated',
  },
];

function iconClass(tone) {
  const tones = {
    blue: 'text-sky-600 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/40 border-sky-100 dark:border-sky-900',
    green:
      'text-emerald-600 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-100 dark:border-emerald-900',
    amber:
      'text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border-amber-100 dark:border-amber-900',
    slate:
      'text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10',
  };

  return tones[tone] || tones.slate;
}

function resolveProjectLink(links, item) {
  const projectLink = item.linkKeys?.map((key) => links[key]).find(Boolean);
  return projectLink || item.fallbackHref;
}

function ProofNavigation({ links = {} }) {
  return (
    <nav
      aria-label="Tessera page shortcuts"
      className="sticky top-0 z-30 border-y border-white/[0.06] bg-[#020611]/95 shadow-lg shadow-slate-950/20 backdrop-blur"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-6 py-3 sm:px-10 lg:px-14">
        <div className="hidden shrink-0 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-200 lg:block">
          Jump to proof
        </div>
        <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto pb-1">
          {PROOF_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const href = resolveProjectLink(links, item);
            const isExternal = !href.startsWith('#');
            const isPrimary = item.accent === 'primary';

            return (
              <a
                key={item.key}
                href={href}
                {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={`group flex min-h-14 min-w-[154px] shrink-0 items-center gap-3 rounded-lg border px-3 text-left transition focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-primary-dark ${
                  isPrimary
                    ? 'border-[#818cf8]/60 bg-[#6366f9] text-white shadow-lg shadow-[rgba(99,102,249,0.28)] hover:bg-[#5558e8]'
                    : 'border-white/10 bg-white/[0.04] text-slate-200 hover:border-sky-300/30 hover:bg-white/[0.08] hover:text-sky-100'
                }`}
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${
                    isPrimary
                      ? 'border-white/20 bg-white/10 text-white'
                      : 'border-white/10 bg-white/5 text-slate-200 group-hover:text-sky-200'
                  }`}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold leading-tight">{item.label}</span>
                  <span className={`mt-0.5 block text-xs leading-tight ${isPrimary ? 'text-white/75' : 'text-slate-400'}`}>
                    {item.detail}
                  </span>
                </span>
                {isExternal && <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 opacity-70" aria-hidden="true" />}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

function HeroMetric({ icon: Icon, label, value }) {
  return (
    <div className="flex min-w-0 items-center gap-3 border-white/10 py-2 text-white/90 sm:border-l sm:py-3 sm:pl-5 first:sm:border-l-0 first:sm:pl-0">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/10">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-white/50">{label}</span>
        <span className="block text-sm font-semibold leading-tight">{value}</span>
      </span>
    </div>
  );
}

function heroTraceToneClasses(tone) {
  const tones = {
    sky: 'border-sky-400/30 bg-sky-400/10 text-sky-300',
    green: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
    amber: 'border-amber-400/30 bg-amber-400/10 text-amber-300',
    rose: 'border-rose-400 bg-rose-500/10 text-rose-300',
    violet: 'border-[#818cf8]/40 bg-[#6366f9]/15 text-indigo-200',
  };

  return tones[tone] || tones.sky;
}

function HeroTrace() {
  return (
    <aside className="hidden rounded-[22px] border border-white/[0.08] bg-[#050b18] p-6 shadow-xl shadow-black/20 backdrop-blur-xl lg:block">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-200">Guarded execution trace</p>
          <h2 className="mt-3 text-2xl font-semibold leading-tight text-white">Risk blocked · review triggered</h2>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-sm font-semibold text-emerald-300">
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.9)]" />
          LIVE
        </span>
      </div>

      <div className="rounded-xl border border-white/10 bg-[#071323]/80 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">Customer signal</p>
        <p className="mt-3 text-sm leading-6 text-slate-200">
          Stolen card, unknown payments, immediate account verification requested
        </p>
      </div>

      <ol className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-[#071323]/70">
        {HERO_TRACE_STEPS.map((step, index) => {
          const Icon = step.icon;
          const isBlocked = step.tone === 'rose';

          return (
            <li
              key={step.label}
              className={`grid grid-cols-[44px_1fr_auto] items-center gap-3 border-b border-white/10 px-3 py-3 last:border-b-0 ${
                isBlocked ? 'bg-rose-500/5 ring-1 ring-inset ring-rose-500' : ''
              }`}
            >
              <span className={`flex h-9 w-9 items-center justify-center rounded-lg border ${heroTraceToneClasses(step.tone)}`}>
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-white">{step.label}</span>
                <span className="mt-0.5 block font-mono text-xs text-slate-400">{step.detail}</span>
              </span>
              <span className={`h-2.5 w-2.5 rounded-full ${toneDotClass(step.tone)}`} aria-hidden="true" />
            </li>
          );
        })}
      </ol>

      <div className="mt-4 grid grid-cols-3 overflow-hidden rounded-xl border border-white/10 bg-[#071323]/80">
        {[
          ['PII', 'redacted'],
          ['Audit', 'emitted'],
          ['Reply', 'bounded'],
        ].map(([label, value]) => (
          <div key={label} className="border-r border-white/10 p-3 last:border-r-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/35">{label}</p>
            <p className="mt-1 text-sm font-semibold text-white">{value}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}

function EvidenceStrip() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#040a16] p-5 shadow-2xl shadow-slate-950/20">
      <div className="absolute left-8 right-8 top-5 hidden h-px bg-[linear-gradient(90deg,#6366f9,#22c55e,#0ea5e9,#f59e0b)] lg:block" />
      <div className="grid gap-4 lg:grid-cols-4">
        {EVIDENCE_ITEMS.map((item, index) => {
          const Icon = item.icon;
          const toneClasses = {
            violet: 'text-indigo-200 border-[#818cf8]/40 bg-[#6366f9]/15',
            green: 'text-emerald-300 border-emerald-400/30 bg-emerald-400/10',
            sky: 'text-sky-300 border-sky-400/30 bg-sky-400/10',
            amber: 'text-amber-300 border-amber-400/30 bg-amber-400/10',
          };

          return (
            <article key={item.label} className="relative rounded-xl border border-white/10 bg-white/[0.035] p-5">
              {index < EVIDENCE_ITEMS.length - 1 && (
                <ArrowRight className="absolute -right-5 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-white/35 lg:block" aria-hidden="true" />
              )}
              <span className={`flex h-12 w-12 items-center justify-center rounded-xl border ${toneClasses[item.tone]}`}>
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                {item.value}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-white">{item.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.detail}</p>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function SectionDivider() {
  return (
    <div className="bg-[#020611]" aria-hidden="true">
      <div className="w-full">
        <div className="h-px w-full bg-gradient-to-r from-[#6366f9]/10 via-[#6366f9]/20 to-[#6366f9]/10" />
        <div className="mx-auto h-6 max-w-3xl bg-[radial-gradient(ellipse_at_top,rgba(99,102,249,0.055),transparent_72%)]" />
      </div>
    </div>
  );
}

function FlowStep({ icon: Icon, title, detail, index }) {
  return (
    <article className="relative rounded-lg border border-white/10 bg-white/[0.04] p-5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/10 text-sky-200">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white/35">
          0{index + 1}
        </span>
      </div>
      <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-300">{detail}</p>
    </article>
  );
}

function AuditPreview() {
  const rows = [
    ['target', 'card_block'],
    ['policy', 'identity_verified && owner_match'],
    ['decision', 'transform: redact card tail'],
    ['outcome', 'audit emitted'],
  ];

  return (
    <aside className="rounded-lg border border-white/10 bg-[#061521] p-5 shadow-2xl shadow-black/20">
      <div className="mb-5 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-200">Audit envelope</p>
          <h3 className="mt-2 text-xl font-semibold text-white">tessera.guard.audit</h3>
        </div>
        <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-200">
          allowed
        </span>
      </div>
      <dl className="space-y-3">
        {rows.map(([key, value]) => (
          <div key={key} className="grid grid-cols-[92px_1fr] gap-3 text-sm">
            <dt className="font-mono text-slate-500">{key}</dt>
            <dd className="font-mono text-slate-200">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-5 rounded-lg border border-white/10 bg-white/[0.03] p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Reviewer signal</p>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-[78%] rounded-full bg-emerald-300" />
        </div>
        <p className="mt-2 text-sm text-slate-300">Grounding, guard, and coverage remain visible after the turn</p>
      </div>
    </aside>
  );
}

function LanguageCaseCard({ item }) {
  const toneClasses = {
    blue: 'border-sky-200 bg-sky-50 text-sky-800 dark:border-sky-300/20 dark:bg-sky-300/10 dark:text-sky-100',
    amber:
      'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-300/20 dark:bg-amber-300/10 dark:text-amber-100',
    green:
      'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-300/20 dark:bg-emerald-300/10 dark:text-emerald-100',
  };

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
            {item.market}
          </p>
          <h3 className="mt-2 flex items-center gap-2 text-xl font-semibold text-slate-950 dark:text-white">
            <span className={`rounded-lg border px-2 py-1 text-sm ${toneClasses[item.tone]}`}>{item.locale}</span>
            {item.regulator}
          </h3>
        </div>
        <Languages className="h-5 w-5 shrink-0 text-slate-400" aria-hidden="true" />
      </div>

      <blockquote className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700 dark:border-white/10 dark:bg-primary-dark/55 dark:text-slate-200">
        {item.customer}
      </blockquote>

      <dl className="mt-4 grid gap-2 text-sm">
        {[
          ['route', item.route],
          ['guard', item.decision],
          ['reply', item.answer],
        ].map(([label, value]) => (
          <div key={label} className="grid grid-cols-[72px_1fr] gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 dark:border-white/10 dark:bg-white/[0.03]">
            <dt className="font-mono text-slate-500 dark:text-slate-500">{label}</dt>
            <dd className="font-mono text-slate-800 dark:text-slate-200">{value}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

function MultilingualSurface() {
  return (
    <section id="language-routes" className="scroll-mt-24 bg-gradient-to-b from-[#020611] via-[#050b18] to-[#020611]">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-14">
        <div className="mb-8 grid gap-4 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              Multilingual operating surface
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-slate-950 dark:text-white">
              Same banking product, three language and regulator contexts
            </h2>
          </div>
          <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
            Each language path shows how Tessera routes the request, applies the relevant regulator context,
            checks the guard, and keeps the customer reply controlled
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {LANGUAGE_CASES.map((item) => (
            <LanguageCaseCard key={item.locale} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RegressionScorecard() {
  return (
    <section id="eval-scorecard" className="scroll-mt-24 bg-[#050b18] text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-14 sm:px-10 lg:grid-cols-[0.78fr_1.22fr] lg:px-14">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-200">
            Regression scorecard
          </p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight text-white">
            The safety claim is backed by replayable failures
          </h2>
          <p className="mt-5 text-sm leading-7 text-slate-300">
            Tessera treats known agent failures as JSON test cases. Each case declares the failure pattern,
            the check that must pass, and the expected bounded behavior before the demo can be trusted
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3">
            {SCORECARD_SUMMARY.map(([label, value]) => (
              <div key={label} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">{label}</p>
                <p className="mt-2 text-lg font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/20">
          <div className="grid grid-cols-[68px_1.1fr_1.25fr_1fr_92px] gap-0 border-b border-white/10 bg-white/[0.06] px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/40 max-lg:hidden">
            <span>Case</span>
            <span>Failure</span>
            <span>Check</span>
            <span>Expected</span>
            <span>Status</span>
          </div>

          <div className="divide-y divide-white/10">
            {FAILURE_ROWS.map((row) => (
              <article
                key={row.id}
                className="grid gap-3 px-4 py-4 text-sm lg:grid-cols-[68px_1.1fr_1.25fr_1fr_92px] lg:items-center"
              >
                <div className="font-mono text-sky-200">#{row.id}</div>
                <div>
                  <p className="font-semibold text-white lg:hidden">{row.failure}</p>
                  <p className="hidden font-semibold text-white lg:block">{row.failure}</p>
                </div>
                <div className="font-mono text-slate-300">{row.check}</div>
                <div className="text-slate-300">{row.expected}</div>
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-2.5 py-1 text-xs font-semibold text-emerald-200">
                    <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                    {row.status}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RouteComparisonCard({ route }) {
  const isSafe = route.tone === 'safe';

  return (
    <article
      className={`rounded-lg border p-5 ${
        isSafe
          ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-300/20 dark:bg-emerald-300/10'
          : 'border-rose-200 bg-rose-50 dark:border-rose-300/20 dark:bg-rose-300/10'
      }`}
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p
            className={`text-xs font-semibold uppercase tracking-[0.16em] ${
              isSafe ? 'text-emerald-700 dark:text-emerald-200' : 'text-rose-700 dark:text-rose-200'
            }`}
          >
            {route.status}
          </p>
          <h3 className="mt-1 text-lg font-semibold text-slate-950 dark:text-white">{route.title}</h3>
        </div>
        <span
          className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${
            isSafe
              ? 'border-emerald-300 bg-white text-emerald-700 dark:border-emerald-300/30 dark:bg-white/10 dark:text-emerald-100'
              : 'border-rose-300 bg-white text-rose-700 dark:border-rose-300/30 dark:bg-white/10 dark:text-rose-100'
          }`}
        >
          {isSafe ? (
            <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
          ) : (
            <AlertTriangle className="h-5 w-5" aria-hidden="true" />
          )}
        </span>
      </div>

      <ol className="mt-5 grid gap-2">
        {route.steps.map((step, index) => (
          <li
            key={step}
            className="flex items-center gap-3 rounded-lg border border-white/60 bg-white/80 px-3 py-2 text-sm font-medium text-slate-800 dark:border-white/10 dark:bg-primary-dark/45 dark:text-slate-100"
          >
            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                isSafe
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-300/20 dark:text-emerald-100'
                  : 'bg-rose-100 text-rose-800 dark:bg-rose-300/20 dark:text-rose-100'
              }`}
            >
              {index + 1}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>

      <p className="mt-4 text-sm leading-6 text-slate-700 dark:text-slate-200">{route.note}</p>
    </article>
  );
}

function AssuranceBand() {
  return (
    <section className="bg-gradient-to-b from-[#020611] via-[#050b18] to-[#020611]">
      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-12 sm:px-10 lg:grid-cols-[0.72fr_1.28fr] lg:px-14">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Delivery assurance
          </p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight text-slate-950 dark:text-white">
            Trust comes from the delivery chain, not from a polished interface
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
            The strongest signal is not a single UI screen. It is the chain from local quality gates to
            deployed infrastructure, with an on-prem path when regulation changes the deployment boundary
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {ASSURANCE_ITEMS.map((item, index) => {
            const tones = ['green', 'blue', 'amber', 'slate'];
            const Icon = item.icon;

            return (
              <article
                key={item.label}
                className="rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.03]"
              >
                <div className="flex items-start gap-4">
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${iconClass(tones[index])}`}>
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                      {item.label}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-slate-950 dark:text-white">{item.value}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.detail}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DemoVideoSection({ links = {} }) {
  const videoHref = links.video || links.demoVideo;
  const demoHref = links.demo || links.systemUi || '#demo-system-ui';
  const resolvedVideoHref = videoHref || '#demo-video';

  return (
    <section id="demo-video" className="scroll-mt-24 bg-[#020611] text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:px-14">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-4 text-indigo-200">
            <span className="h-px w-20 bg-[#6366f9]/50" />
            <p className="text-sm font-semibold uppercase tracking-[0.22em]">Demo and agent UI</p>
            <span className="h-px w-20 bg-[#6366f9]/50" />
          </div>
          <p className="mt-4 text-base leading-7 text-slate-300">
            Start with the guided walkthrough, then open the interface to chat, inspect live traces, guarded execution and escalation flows in action
          </p>
        </div>

        <div className="mt-9 grid gap-5 lg:grid-cols-[0.48fr_0.52fr]">
          <a
            href={resolvedVideoHref}
            {...(resolvedVideoHref.startsWith('#') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
            className="group relative min-h-[280px] overflow-hidden rounded-2xl border border-[#818cf8]/40 bg-[#080f22] p-6 shadow-2xl shadow-[rgba(99,102,249,0.20)] transition hover:-translate-y-0.5 hover:border-[#a5b4fc]/70"
          >
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(99,102,249,0.38),transparent_32%),linear-gradient(135deg,rgba(14,165,233,0.13),transparent_42%)]" />
            <span className="relative flex h-full min-h-[232px] flex-col justify-end">
              <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#a5b4fc]/60 bg-[#6366f9] text-white shadow-[0_0_48px_rgba(99,102,249,0.62)] transition group-hover:scale-105">
                <PlayCircle className="h-10 w-10" aria-hidden="true" />
              </span>
              <span className="absolute right-4 top-4 rounded-lg border border-white/15 bg-black/35 px-3 py-1 text-sm font-semibold text-white backdrop-blur">
                2:00
              </span>
              <span className="block text-2xl font-semibold">Watch demo video</span>
              <span className="mt-2 block max-w-sm text-sm leading-6 text-slate-300">
                A guided fraud-support scenario showing guard decisions, audit evidence and escalation
              </span>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-indigo-200">
                Play video
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </span>
          </a>

          <div className="rounded-2xl border border-sky-400/20 bg-[#071323] p-4 shadow-2xl shadow-sky-950/20">
            <SystemPreviewPanel compact />
            <div className="mt-4 flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-xl font-semibold">Try agent UI</h3>
                <p className="mt-2 max-w-lg text-sm leading-6 text-slate-300">
                  Open the interactive interface to explore live traces and guarded execution
                </p>
              </div>
              <a
                href={demoHref}
                {...(demoHref.startsWith('#') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg text-sm font-semibold text-indigo-200 transition hover:text-white"
              >
                Open interface
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function toneDotClass(tone) {
  const tones = {
    sky: 'bg-sky-400',
    amber: 'bg-amber-400',
    rose: 'bg-rose-400',
    green: 'bg-emerald-400',
    violet: 'bg-[#6366f9]',
  };

  return tones[tone] || tones.sky;
}

function SystemPreviewPanel({ compact = false }) {
  return (
    <article className={`overflow-hidden rounded-lg border border-white/10 bg-slate-950 text-white ${compact ? 'shadow-none' : 'shadow-xl shadow-slate-950/10'}`}>
      <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-white/5 px-4 py-3">
        <div className="flex items-center gap-2" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        </div>
        <div className="min-w-0 rounded-md border border-white/10 bg-slate-900 px-3 py-1 text-xs font-medium text-slate-300">
          tessera.ui/session/urgent-card
        </div>
      </div>

      <div className={`grid gap-0 ${compact ? 'lg:grid-cols-[1fr_0.9fr]' : 'lg:grid-cols-[0.98fr_1.02fr]'}`}>
        <div className={`${compact ? 'p-4' : 'p-5'} border-b border-white/10 lg:border-b-0 lg:border-r`}>
          <div className="flex flex-wrap gap-2">
            {SYSTEM_PREVIEW_TABS.map((tab, index) => (
              <span
                key={tab.label}
                className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold ${
                  index === 0
                    ? 'bg-white text-slate-950'
                    : 'border border-white/10 bg-white/5 text-slate-300'
                }`}
              >
                {tab.label}
                <span className={`rounded-full px-2 py-0.5 text-[11px] ${index === 0 ? 'bg-slate-100 text-slate-600' : 'bg-white/10 text-slate-300'}`}>
                  {tab.status}
                </span>
              </span>
            ))}
          </div>

          <div className="mt-5 space-y-3">
            <div className="max-w-[86%] rounded-lg rounded-tl-sm border border-white/10 bg-white/10 p-3">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Customer</p>
              <p className="mt-2 text-sm leading-6 text-slate-100">
                Ma carte a ete volee. Peux-tu verifier mon compte ?
              </p>
            </div>
            <div className="ml-auto max-w-[88%] rounded-lg rounded-tr-sm bg-sky-500/15 p-3 ring-1 ring-sky-300/20">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-200">Tessera</p>
              <p className="mt-2 text-sm leading-6 text-slate-100">
                I can help, but account lookup is blocked until identity is verified. I am escalating this with
                redacted evidence
              </p>
            </div>
          </div>
        </div>

        <div className={compact ? 'p-4' : 'p-5'}>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Live guard trace</p>
              <h3 className="mt-1 text-lg font-semibold">Reviewer-ready evidence</h3>
            </div>
            <span className="rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-200">
              SAFE HANDOFF
            </span>
          </div>

          <ol className="mt-5 space-y-3">
            {SYSTEM_PREVIEW_EVENTS.map(([label, value, tone]) => (
              <li key={`${label}-${value}`} className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2">
                <span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${toneDotClass(tone)}`} />
                <span className="min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                    {label}
                  </span>
                  <span className="mt-0.5 block break-words text-sm font-medium text-slate-100">{value}</span>
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-5 grid grid-cols-3 gap-2">
            {['FR', 'DE', 'EN'].map((locale) => (
              <span
                key={locale}
                className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-center text-xs font-semibold text-slate-200"
              >
                {locale}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function SystemUiCta({ links = {} }) {
  const demoHref = links.demo || links.systemUi;

  return (
    <section id="demo-system-ui" className="scroll-mt-24 bg-[#020611]">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-14 sm:px-10 lg:grid-cols-[0.72fr_1.28fr] lg:px-14">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Try the system
          </p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight text-slate-950 dark:text-white">
            A dedicated slot for the public agent UI
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-700 dark:text-slate-300">
            Visitors should be able to leave the case study and test Tessera for themselves. This block will
            point to the deployed dashboard as soon as the public URL is available
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            {demoHref ? (
              <a
                href={demoHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:bg-white dark:text-primary-dark dark:hover:bg-slate-200 dark:focus:ring-offset-primary-dark"
              >
                <TerminalSquare className="h-4 w-4" aria-hidden="true" />
                Open agent UI
              </a>
            ) : (
              <span className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 dark:border-white/15 dark:bg-white/5 dark:text-slate-200">
                <TerminalSquare className="h-4 w-4" aria-hidden="true" />
                Public demo URL pending
              </span>
            )}
            <span className="inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-300">
              Chat · audit · eval
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <SystemPreviewPanel />

          <div className="grid gap-3 sm:grid-cols-3">
            {SYSTEM_UI_SURFACES.map((surface) => {
              const Icon = surface.icon;

              return (
                <article
                  key={surface.label}
                  className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.04]"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-sky-100 bg-sky-50 text-sky-700 dark:border-sky-300/20 dark:bg-sky-300/10 dark:text-sky-200">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-slate-950 dark:text-white">{surface.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{surface.detail}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function ScenarioSpotlight() {
  return (
    <section id="risk-scenario" className="scroll-mt-24 bg-gradient-to-b from-[#020611] via-[#050b18] to-[#020611]">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-14 sm:px-10 lg:grid-cols-[0.92fr_1.08fr] lg:px-14">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Scenario spotlight
          </p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight text-slate-950 dark:text-white">
            The difference is visible when the request is risky
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-700 dark:text-slate-300">
            An unguided agent might answer with whatever tool result is easiest to fetch. Tessera treats the
            banking situation as the product surface: urgency, ownership, disclosure risk, and escalation all
            change the route before a tool is allowed to run
          </p>

          <div className="mt-7 space-y-3">
            {SCENARIO_CHECKS.map((check) => (
              <div key={check} className="flex gap-3 text-sm font-medium text-slate-700 dark:text-slate-200">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-300" aria-hidden="true" />
                <span>{check}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_0.85fr]">
          <article className="rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-sky-600 dark:border-white/10 dark:bg-white/5 dark:text-sky-300">
                <MessageSquareText className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                  Customer turn
                </p>
                <h3 className="text-lg font-semibold text-slate-950 dark:text-white">French support case</h3>
              </div>
            </div>

            <div className="mt-5 rounded-lg border border-slate-200 bg-white p-4 text-sm leading-7 text-slate-700 dark:border-white/10 dark:bg-primary-dark/60 dark:text-slate-200">
              Ma carte a ete volee et je vois des paiements que je n&apos;ai pas faits. Pouvez-vous
              verifier mon compte maintenant ?
            </div>

            <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-300/20 dark:bg-amber-300/10">
              <div className="flex gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-700 dark:text-amber-200" aria-hidden="true" />
                <p className="text-sm leading-6 text-amber-900 dark:text-amber-100">
                  The request combines urgency and fraud. The account lookup path is no longer the right default
                </p>
              </div>
            </div>
          </article>

          <aside className="rounded-lg border border-slate-200 bg-slate-950 p-5 text-white shadow-sm dark:border-white/10">
            <div className="mb-5 flex items-center gap-3 border-b border-white/10 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/10 text-emerald-200">
                <UserRoundCheck className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">System route</p>
                <h3 className="text-lg font-semibold">Escalate with context</h3>
              </div>
            </div>

            <dl className="space-y-3">
              {SCENARIO_SIGNALS.map(([label, value]) => (
                <div key={label} className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm">
                  <dt className="font-mono text-white/40">{label}</dt>
                  <dd className="mt-1 font-mono text-slate-100">{value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>

        <div className="lg:col-span-2">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                Route contrast
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">
                Same customer message, different operating discipline
              </h3>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
            <RouteComparisonCard route={ROUTE_COMPARISON[0]} />
            <div className="hidden items-center justify-center lg:flex">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300">
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </span>
            </div>
            <RouteComparisonCard route={ROUTE_COMPARISON[1]} />
          </div>
        </div>
      </div>
    </section>
  );
}

function StatTile({ icon: Icon, value, label, detail, tone }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
      <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border ${iconClass(tone)}`}>
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <p className="text-3xl font-semibold leading-none text-slate-950 dark:text-white">{value}</p>
      <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-100">{label}</p>
      <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{detail}</p>
    </article>
  );
}

function LayerRow({ icon: Icon, title, eyebrow, description, index }) {
  const tones = ['blue', 'green', 'amber', 'slate'];

  return (
    <article className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/[0.03] sm:grid-cols-[auto_1fr]">
      <div className={`flex h-11 w-11 items-center justify-center rounded-lg border ${iconClass(tones[index])}`}>
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
          {eyebrow}
        </p>
        <h3 className="mt-1 text-lg font-semibold text-slate-950 dark:text-white">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{description}</p>
      </div>
    </article>
  );
}

function StackGroup({ title, items }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.03]">
      <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
        {title}
      </h3>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}

function DiagramPanel({ title, description, img, alt, orientation = 'wide', onOpen }) {
  const diagram = { title, description, img, alt };

  return (
    <figure className="group rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.03]">
      <div className="border-b border-slate-200 p-5 dark:border-white/10">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{description}</p>
          </div>
          <button
            type="button"
            onClick={() => onOpen?.(diagram)}
            aria-label={`Expand ${title} diagram`}
            className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600 transition hover:border-sky-200 hover:text-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-sky-300/30 dark:hover:text-sky-200 dark:focus:ring-offset-primary-dark"
          >
            <Maximize2 className="h-4 w-4" aria-hidden="true" />
            Expand
          </button>
        </div>
      </div>
      <div className="bg-slate-50 p-3 dark:bg-primary-dark/50">
        <button
          type="button"
          onClick={() => onOpen?.(diagram)}
          aria-label={`Expand ${title} diagram`}
          className="block w-full cursor-zoom-in rounded-md border border-slate-200 bg-white p-2 text-left transition hover:border-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-sky-300/30 dark:focus:ring-offset-primary-dark"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img}
            alt={alt}
            className={`mx-auto w-full rounded object-contain ${orientation === 'tall' ? 'max-h-[620px]' : 'max-h-[440px]'}`}
            loading="lazy"
          />
        </button>
      </div>
    </figure>
  );
}

function DiagramLightbox({ diagram, onClose }) {
  useEffect(() => {
    if (!diagram) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [diagram, onClose]);

  if (!diagram) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${diagram.title} enlarged diagram`}
      className="fixed inset-0 z-50 bg-slate-950/95 p-4 text-white backdrop-blur-sm sm:p-6"
    >
      <button
        type="button"
        aria-label="Close enlarged diagram"
        className="absolute inset-0 cursor-zoom-out"
        onClick={onClose}
      />
      <div className="relative mx-auto flex h-full max-w-7xl flex-col rounded-lg border border-white/15 bg-slate-950 shadow-2xl shadow-black/40">
        <div className="flex items-start justify-between gap-4 border-b border-white/10 p-4 sm:p-5">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-200">Expanded diagram</p>
            <h2 className="mt-2 text-xl font-semibold leading-tight sm:text-2xl">{diagram.title}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">{diagram.description}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            data-testid="diagram-lightbox-close"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Close enlarged diagram"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="min-h-0 flex-1 p-3 sm:p-5">
          <div className="flex h-full min-h-[320px] items-center justify-center rounded-lg bg-white p-3 dark:bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={diagram.img} alt={diagram.alt} className="h-full max-h-full w-full object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
}

function FinalOpenSourceCta({ links = {} }) {
  const actions = [
    { label: 'View on GitHub', href: links.github, icon: Github },
    { label: 'Read Architecture', href: links.design, icon: FileText },
    { label: 'Safety Notes', href: links.safety, icon: ShieldCheck },
  ].filter((action) => action.href);

  return (
    <section className="bg-[#020611] px-6 py-12 text-white sm:px-10 lg:px-14">
      <div className="mx-auto max-w-7xl rounded-2xl border border-white/15 bg-white/[0.035] shadow-2xl shadow-slate-950/30">
        <div className="grid gap-0 lg:grid-cols-[1fr_auto]">
          <div className="flex gap-4 border-b border-white/10 p-6 lg:border-b-0 lg:border-r lg:p-7">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white">
              <TerminalSquare className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-200">
                Open-source & transparent
              </p>
              <h2 className="mt-2 text-2xl font-semibold leading-tight">Inspect the assembly, not a black box</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                Tessera stays honest about what it contributes: an end-to-end regulated assembly with reusable
                dependencies, visible guardrails and documented failures
              </p>
            </div>
          </div>

          <div className="grid min-w-0 divide-y divide-white/10 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
            {actions.map((action) => {
              const Icon = action.icon;

              return (
                <a
                  key={action.label}
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-24 items-center justify-between gap-4 px-6 py-4 text-sm font-semibold text-white transition hover:bg-white/[0.06] lg:min-w-[190px]"
                >
                  <span className="inline-flex items-center gap-3">
                    <Icon className="h-5 w-5 text-slate-300 transition group-hover:text-white" aria-hidden="true" />
                    {action.label}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-slate-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function ScrollProgressDial() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress =
        scrollableHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / scrollableHeight) * 100)) : 0;

      setProgress(nextProgress);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  const roundedProgress = Math.round(progress);

  return (
    <div className="fixed right-[23px] top-1/2 z-40 hidden -translate-y-1/2 lg:flex">
      <div
        className="flex h-16 w-16 items-center justify-center rounded-full border border-white/15 p-1 text-xs font-semibold text-white"
        style={{
          background: `conic-gradient(from 0deg, #6366f9 ${roundedProgress}%, rgba(255,255,255,0.10) ${roundedProgress}%)`,
        }}
        aria-label={`Reading progress ${roundedProgress} percent`}
      >
        <div className="flex h-full w-full items-center justify-center rounded-full bg-[#020611]/95">
          {roundedProgress}%
        </div>
      </div>
    </div>
  );
}

function TesseraStory() {
  const comparison = [
    {
      title: 'Most agent systems',
      tone: 'risk',
      icon: AlertTriangle,
      items: ['Unguarded tool calls', 'No replay evidence', 'Manual-only validation', 'English-only compliance'],
    },
    {
      title: 'What Tessera makes visible',
      tone: 'safe',
      icon: ShieldCheck,
      items: ['mcp-firewall + YAML policy', 'Structured JSON audit trail', '40 failure cases, CI-gated', 'FR / DE / EN regulatory routing'],
    },
  ];
  const architectureCards = [
    {
      icon: Route,
      title: 'Graph orchestration',
      detail: 'Router, planner, reviewer and workers are separated so useful work and controlled action remain distinct',
    },
    {
      icon: LockKeyhole,
      title: 'Guarded tool boundary',
      detail: 'Account lookup, card blocking and transaction search stay behind policy checks and auditable decisions',
    },
    {
      icon: Cloud,
      title: 'Cloud and on-prem paths',
      detail: 'Vertex AI and Cloud Run cover the frontier path; Ollama and Llama 3.3 70B keep an on-prem option explicit',
    },
  ];
  const roadmap = [
    ['Shipped', 'LangGraph agent, FR / DE / EN prompts, audit trail, guard adapter, JSON eval test cases'],
    ['Hardening', 'Public demo URL, mcp-firewall upstream contribution, German escalation calibration'],
  ];

  return (
    <section className="bg-gradient-to-b from-[#020611] via-[#050b18] to-[#020611]">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-14">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-200">
              Operating model
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-4xl">
              From customer signal to reviewer-ready evidence
            </h2>
          </div>
          <p className="text-sm leading-7 text-slate-300">
            Tessera treats banking support as a controlled workflow: language, intent, policy, tool permission,
            audit evidence, and escalation remain visible from the first message to the final handoff
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {comparison.map((card) => {
            const Icon = card.icon;
            const isSafe = card.tone === 'safe';

            return (
              <article
                key={card.title}
                className={`rounded-2xl border p-6 shadow-2xl shadow-slate-950/20 ${
                  isSafe
                    ? 'border-emerald-300/25 bg-emerald-300/[0.07]'
                    : 'border-rose-300/15 bg-white/[0.035]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-xl border ${
                      isSafe
                        ? 'border-emerald-300/30 bg-emerald-300/10 text-emerald-200'
                        : 'border-rose-300/20 bg-rose-300/10 text-rose-200'
                    }`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="text-xl font-semibold text-white">{card.title}</h3>
                </div>
                <ul className="mt-6 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
                  {card.items.map((item) => (
                    <li key={item} className="flex gap-3 rounded-lg border border-white/10 bg-white/[0.035] px-3 py-3">
                      <CheckCircle2
                        className={`mt-0.5 h-4 w-4 shrink-0 ${isSafe ? 'text-emerald-300' : 'text-slate-500'}`}
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-[#050b18] p-6 shadow-2xl shadow-slate-950/25 sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-200">
                Architecture summary
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-white">
                Router, planner, guarded tools and reviewer remain explicit
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
              {['Router', 'Planner', 'Workers', 'Reviewer'].map((step, index) => (
                <span key={step} className="inline-flex items-center gap-2">
                  <span className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-slate-200">
                    {step}
                  </span>
                  {index < 3 && <ArrowRight className="h-4 w-4 text-white/35" aria-hidden="true" />}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {architectureCards.map((card) => {
              const Icon = card.icon;

              return (
                <article key={card.title} className="rounded-xl border border-white/10 bg-white/[0.035] p-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#818cf8]/30 bg-[#6366f9]/15 text-indigo-200">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h4 className="mt-5 text-lg font-semibold text-white">{card.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{card.detail}</p>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {roadmap.map(([label, detail], index) => (
            <article key={label} className="rounded-2xl border border-white/10 bg-white/[0.035] p-6">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-xl font-semibold text-white">{label}</h3>
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${
                    index === 0
                      ? 'border-emerald-300/25 bg-emerald-300/10 text-emerald-200'
                      : 'border-sky-300/25 bg-sky-300/10 text-sky-200'
                  }`}
                >
                  {index === 0 ? 'validated' : 'next'}
                </span>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-300">{detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function TesseraProjectLayout({ project, isBlog=false }) {
  const links = project.links || {};
  const demoHref = links.demo || links.systemUi || '#demo-system-ui';
  const videoHref = links.video || links.demoVideo || '#demo-video';
  const [expandedDiagram, setExpandedDiagram] = useState(null);

  return (
    <>
      <PagesMetaHead
        title={project.ProjectHeader?.title || project.cardTitle || project.title}
        description={project.tagline || project.cardSummary}
        image={project.cardImg || project.heroImg || project.img}
        url={`/projects/${project.url || project.id}`}
        type="article"
        keywords={[
          project.category,
          project.secondaryCategory,
          project.ProjectHeader?.tags,
          ...(project.cardHighlights || []),
        ].filter(Boolean).join(', ')}
      />
      <AppHeader />
      <BackButton />
      <Container fullWidth>
      <div className="dark bg-[#020611] text-slate-300 min-h-screen">
        <ScrollProgressDial />
        <section className="relative overflow-hidden bg-[#020611] text-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.heroImg || project.img}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-25"
            loading="eager"
            aria-hidden="true"
            style={{
              objectPosition: '78% center',
              WebkitMaskImage:
                'linear-gradient(90deg, transparent 0%, transparent 46%, rgba(0,0,0,0.24) 64%, black 100%)',
              maskImage:
                'linear-gradient(90deg, transparent 0%, transparent 46%, rgba(0,0,0,0.24) 64%, black 100%)',
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#020611_0%,rgba(2,6,17,0.98)_42%,rgba(2,6,17,0.76)_72%,rgba(2,6,17,0.96)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_52%_30%,rgba(99,102,249,0.18),transparent_36%),radial-gradient(circle_at_96%_0%,rgba(14,165,233,0.10),transparent_14%),radial-gradient(circle_at_88%_70%,rgba(16,185,129,0.08),transparent_18%)]" />
          <div className="absolute -right-[10%] -top-[36%] hidden h-[430px] w-[430px] rounded-full border border-[#818cf8]/20 shadow-[0_0_72px_rgba(99,102,249,0.20)] lg:block" aria-hidden="true" />
          <div className="absolute -right-[6%] -top-[28%] hidden h-[335px] w-[335px] rounded-full border border-sky-400/10 lg:block" aria-hidden="true" />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#020611] to-transparent" />

          <div className="relative mx-auto flex min-h-[760px] max-w-7xl flex-col px-6 pb-10 pt-8 sm:px-10 lg:px-14">
            <div className="flex flex-1 items-center py-8 sm:py-16">
              <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,0.96fr)_minmax(360px,0.56fr)] lg:items-center">
                <div className="max-w-4xl">
                  <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-white/85">
                    <span className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-sky-400/30 bg-white/5 px-3 py-1 backdrop-blur">
                      <Landmark className="h-4 w-4 text-sky-300" aria-hidden="true" />
                      EU retail banking
                    </span>
                    <span className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-emerald-400/30 bg-white/5 px-3 py-1 backdrop-blur">
                      <ShieldCheck className="h-4 w-4 text-emerald-300" aria-hidden="true" />
                      Guarded agent
                    </span>
                    <span className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-amber-400/30 bg-white/5 px-3 py-1 backdrop-blur">
                      <Cloud className="h-4 w-4 text-amber-300" aria-hidden="true" />
                      Cloud + on-prem
                    </span>
                  </div>

                  <p className="mt-8 text-sm font-semibold uppercase tracking-[0.24em] text-indigo-200 sm:mt-10">
                      Trusted agent platform
                  </p>
                  <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[0.92] text-white sm:text-6xl lg:text-7xl">
                    Tessera
                  </h1>
                  <p className="mt-8 max-w-2xl text-2xl font-semibold leading-tight text-slate-300 sm:text-3xl">
                    A guarded agentic AI system for regulated banking support
                  </p>
                  <p className="mt-7 max-w-3xl text-base leading-8 text-slate-200 sm:text-lg sm:leading-9">
                    Built with LangGraph, retrieval, guarded tool execution, audit envelopes and a multilingual
                    regression tests across French, German and English
                  </p>

                  <div className="mt-9 flex flex-wrap gap-4 sm:mt-10">
                    <a
                      href={videoHref}
                      {...(videoHref.startsWith('#') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                      className="group inline-flex min-h-16 items-center gap-3 rounded-xl bg-[#6366f9] px-5 text-left text-white shadow-2xl shadow-[rgba(99,102,249,0.32)] transition hover:bg-[#5558e8] focus:outline-none focus:ring-2 focus:ring-[#a5b4fc] focus:ring-offset-2 focus:ring-offset-[#020611]"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#6366f9] transition group-hover:scale-105">
                        <PlayCircle className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-lg font-semibold leading-tight">Watch 2-min demo</span>
                        <span className="mt-0.5 block text-sm text-indigo-100">Video walkthrough</span>
                      </span>
                    </a>
                    <a
                      href={demoHref}
                      {...(demoHref.startsWith('#') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                      className="group inline-flex min-h-16 items-center gap-3 rounded-xl border border-[#818cf8]/40 bg-white/5 px-5 text-left text-white shadow-xl shadow-black/20 backdrop-blur transition hover:border-[#a5b4fc]/70 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#a5b4fc] focus:ring-offset-2 focus:ring-offset-[#020611]"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#818cf8]/40 bg-[#6366f9]/15 text-indigo-200">
                        <TerminalSquare className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-lg font-semibold leading-tight">Try agent UI</span>
                        <span className="mt-0.5 block text-sm text-slate-300">Open interactive interface</span>
                      </span>
                    </a>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-medium text-slate-200">
                    {links.github && (
                      <a href={links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition hover:text-white">
                        <Github className="h-5 w-5" aria-hidden="true" />
                        View on GitHub
                      </a>
                    )}
                    {links.design && (
                      <a href={links.design} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition hover:text-white">
                        <FileText className="h-5 w-5" aria-hidden="true" />
                        Read Architecture
                      </a>
                    )}
                    {links.safety && (
                      <a href={links.safety} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition hover:text-white">
                        <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                        Safety Notes
                      </a>
                    )}
                  </div>

                  <div className="mt-14 max-w-3xl sm:mt-16">
                    <div className="h-px w-full bg-gradient-to-r from-white/[0.16] via-white/[0.08] to-white/[0.12]" />
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-6 sm:grid-cols-2 lg:grid-cols-4">
                      <HeroMetric icon={Languages} label="Languages" value="FR / DE / EN" />
                      <HeroMetric icon={ShieldCheck} label="Eval set" value="40 failure cases" />
                      <HeroMetric icon={Euro} label="Domain" value="EU banking" />
                      <HeroMetric icon={Database} label="Grounding" value="4 corpora" />
                    </div>
                  </div>
                </div>
                <HeroTrace />
              </div>
            </div>
          </div>
        </section>

        <ProofNavigation links={links} />

        <DemoVideoSection links={links} />

        <SectionDivider />

        <section className="mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-14">
          <div className="mb-8">
            <EvidenceStrip />
          </div>
          <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
            <article className="rounded-lg border border-slate-200 bg-slate-950 p-6 text-white shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-200">
                Scope
              </p>
              <h2 className="mt-4 text-2xl font-semibold leading-tight">
                Not a new firewall, not a new benchmark
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                A concrete assembly for one regulated European banking support workflow
              </p>
            </article>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {TESSERA_STATS.map((stat, index) => (
                <StatTile
                  key={stat.label}
                  icon={stat.icon}
                  value={stat.value}
                  label={stat.label}
                  detail={stat.detail}
                  tone={['blue', 'green', 'amber', 'slate'][index]}
                />
              ))}
            </div>
          </div>
        </section>

        <SectionDivider />

        <section className="bg-gradient-to-b from-[#020611] via-[#050b18] to-[#020611]">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:px-14">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                What it proves
              </p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight text-slate-950 dark:text-white">
                A bank-support agent that can be inspected, tested, and safely handed off
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-700 dark:text-slate-300">
                Tessera shows that guarded tool calls, multilingual grounding, audit evidence, and escalation
                paths can work together in one concrete banking support flow
              </p>

              <div className="mt-8 space-y-3">
                {PROJECT_PHASES.map((phase) => (
                  <div key={phase} className="flex gap-3 text-sm font-medium text-slate-700 dark:text-slate-200">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-300" aria-hidden="true" />
                    <span>{phase}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {QUALITY_LAYERS.map((layer, index) => (
                <LayerRow
                  key={layer.title}
                  icon={layer.icon}
                  title={layer.title}
                  eyebrow={layer.eyebrow}
                  description={layer.description}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        <SectionDivider />

        <MultilingualSurface />

        <SectionDivider />

        <RegressionScorecard />

        <SectionDivider />

        <ScenarioSpotlight />

        <SectionDivider />

        <section id="execution-path" className="scroll-mt-24 bg-[#020611] text-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:px-10 lg:grid-cols-[1fr_380px] lg:px-14">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-200">
                Controlled execution path
              </p>
              <div className="mt-3 grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
                <h2 className="text-3xl font-semibold leading-tight text-white">
                  Every useful action leaves a trail
                </h2>
                <p className="text-sm leading-7 text-slate-300">
                  Each customer turn moves through routing, retrieval, guard checks, audit emission, and a final
                  response or escalation path
                </p>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                {EXECUTION_FLOW.map((step, index) => (
                  <FlowStep
                    key={step.title}
                    icon={step.icon}
                    title={step.title}
                    detail={step.detail}
                    index={index}
                  />
                ))}
              </div>
            </div>

            <AuditPreview />
          </div>
        </section>

        <AssuranceBand />

        <SectionDivider />

        <SystemUiCta links={links} />

        <SectionDivider />

        <section id="architecture-diagrams" className="scroll-mt-24 mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-14">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                Operating evidence
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">
                Architecture and evaluation flow
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300">
              The diagrams show how Tessera is assembled: agent orchestration, guarded tools, audit evidence,
              cloud and on-prem paths, and evaluation checks
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            <DiagramPanel
              title="System architecture"
              description="LangGraph orchestration, retrieval, guarded tools, audit sinks, and dual LLM deployment paths"
              img="/images/projects/tessera/architecture.svg"
              alt="Tessera system architecture"
              onOpen={setExpandedDiagram}
            />
            <DiagramPanel
              title="Non-regression tests"
              description="Failure cases move through schema validation, multilingual replay, scoring, and CI gates"
              img="/images/projects/tessera/eval-flow.svg"
              alt="Tessera evaluation harness flow"
              orientation="tall"
              onOpen={setExpandedDiagram}
            />
          </div>
        </section>

        <SectionDivider />

        <section id="stack-snapshot" className="scroll-mt-24 bg-gradient-to-b from-[#020611] via-[#050b18] to-[#020611]">
          <div className="mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:px-14">
            <div className="mb-7 flex items-center gap-3">
              <TerminalSquare className="h-6 w-6 text-sky-600 dark:text-sky-300" aria-hidden="true" />
              <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">Stack snapshot</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {STACK_GROUPS.map((group) => (
                <StackGroup key={group.title} title={group.title} items={group.items} />
              ))}
            </div>
          </div>
        </section>

        <SectionDivider />

        <TesseraStory />

        <SectionDivider />

        <FinalOpenSourceCta links={links} />

        <section className="mx-auto max-w-7xl py-12">
          <RelatedProjects currentProject={project} edgeToEdgeRule />
        </section>

        <DiagramLightbox diagram={expandedDiagram} onClose={() => setExpandedDiagram(null)} />
      </div>
    </Container>
    <AppFooter isBlog={isBlog} />
    </>
  );
}
