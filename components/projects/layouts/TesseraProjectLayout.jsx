import { useMemo, useState } from 'react';
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
  MessageSquareText,
  Route,
  ShieldCheck,
  TerminalSquare,
  UserRoundCheck,
} from 'lucide-react';
import BackButton from '../../reusable/BackButton';
import Container from '../../layout/Container';
import ProjectMarkdown from '../ProjectMarkdown';
import RelatedProjects from '../RelatedProjects';

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
      'Sensitive tool calls are checked before execution with allow, deny, transform, and redaction decisions.',
  },
  {
    icon: GitBranch,
    title: 'Offline harness',
    eyebrow: 'Promptfoo-style regression',
    description:
      'Documented failure cases are replayed against the agent graph so safety behavior can regress loudly.',
  },
  {
    icon: FileText,
    title: 'Structured audit',
    eyebrow: 'JSON evidence',
    description:
      'Guard outcomes keep rule ids, rationale, target tool, redacted arguments, and operational timestamps.',
  },
  {
    icon: Route,
    title: 'Human escalation',
    eyebrow: 'Reviewer node',
    description:
      'Low-confidence or high-stakes turns route to escalation instead of pretending the answer is certain.',
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
    detail: 'Classify language, intent, and urgency before planning.',
  },
  {
    icon: Database,
    title: 'Retrieve',
    detail: 'Pull product and regulation context from pgvector.',
  },
  {
    icon: LockKeyhole,
    title: 'Guard',
    detail: 'Check sensitive tool calls through policy before execution.',
  },
  {
    icon: FileText,
    title: 'Audit',
    detail: 'Emit structured evidence for reviewer and operator views.',
  },
  {
    icon: CheckCircle2,
    title: 'Respond',
    detail: 'Answer, decline, or escalate with confidence signals.',
  },
];

const HERO_TRACE_ROWS = [
  ['language', 'fr-FR'],
  ['intent', 'urgent_card'],
  ['policy', 'identity_required'],
  ['tool', 'account_lookup'],
  ['decision', 'blocked'],
  ['next', 'human_escalation'],
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
    title: 'Naive demo route',
    status: 'Looks helpful, leaks context',
    tone: 'risk',
    steps: ['Fetch account data', 'Show suspicious payments', 'Try to block the card late'],
    note: 'The assistant optimizes for an answer before ownership, urgency, and disclosure risk are resolved.',
  },
  {
    title: 'Tessera route',
    status: 'Guarded, auditable handoff',
    tone: 'safe',
    steps: ['Classify fraud urgency', 'Block unsafe lookup path', 'Escalate with redacted evidence'],
    note: 'The system keeps the user moving toward help while preserving a reviewer-ready trail.',
  },
];

const EVIDENCE_ITEMS = [
  {
    label: 'Runtime',
    value: 'Pre-flight',
    detail: 'Tool arguments checked before execution',
  },
  {
    label: 'Regression',
    value: 'Replayable',
    detail: 'Failure catalogue lives as JSON fixtures',
  },
  {
    label: 'Audit',
    value: 'Structured',
    detail: 'Every guard decision is inspectable',
  },
  {
    label: 'Escalation',
    value: 'Explicit',
    detail: 'Low confidence becomes a handoff',
  },
];

const ASSURANCE_ITEMS = [
  {
    icon: CheckCircle2,
    label: 'Build gate',
    value: 'ruff, mypy, pytest',
    detail: 'The demo is framed as software that must keep compiling, typing, and replaying.',
  },
  {
    icon: ShieldCheck,
    label: 'Safety gate',
    value: '40 failure replays',
    detail: 'Known agent failures are catalogued as fixtures instead of left as anecdotes.',
  },
  {
    icon: Cloud,
    label: 'Hosted path',
    value: 'Cloud Run + Cloud SQL',
    detail: 'The frontier path is deployable with managed runtime, secrets, logs, and monitoring.',
  },
  {
    icon: TerminalSquare,
    label: 'Local path',
    value: 'Ollama on Apple Silicon',
    detail: 'The on-prem mode keeps the banking story credible when data cannot leave the perimeter.',
  },
];

const LANGUAGE_CASES = [
  {
    locale: 'FR',
    market: 'France',
    regulator: 'CNIL + GDPR',
    customer: 'Je veux contester un paiement carte visible depuis hier.',
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

function ActionLink({ href, children, variant = 'primary', icon: Icon = ArrowUpRight }) {
  const base =
    'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-primary-dark';
  const variants = {
    primary:
      'bg-white text-slate-950 hover:bg-slate-200 focus:ring-white dark:bg-white dark:text-primary-dark dark:hover:bg-slate-200',
    secondary:
      'border border-white/20 bg-white/10 text-white hover:border-white/40 hover:bg-white/15 focus:ring-white/40 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10',
  };

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} ${variants[variant]}`}>
      <Icon className="h-4 w-4" aria-hidden="true" />
      {children}
    </a>
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

function HeroTrace() {
  return (
    <aside className="hidden rounded-lg border border-white/15 bg-slate-950/70 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl lg:block">
      <div className="mb-5 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-200">Live guard trace</p>
          <h2 className="mt-2 text-xl font-semibold text-white">Fraud turn pre-flight</h2>
        </div>
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
        </div>
      </div>

      <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">Customer signal</p>
        <p className="mt-3 text-sm leading-6 text-slate-200">
          Stolen card, unknown payments, immediate account verification requested.
        </p>
      </div>

      <dl className="mt-4 space-y-2">
        {HERO_TRACE_ROWS.map(([label, value]) => {
          const isBlocked = value === 'blocked';
          const isEscalation = value === 'human_escalation';

          return (
            <div
              key={label}
              className="grid grid-cols-[112px_1fr] items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm"
            >
              <dt className="font-mono text-white/40">{label}</dt>
              <dd
                className={`font-mono ${
                  isBlocked
                    ? 'text-amber-200'
                    : isEscalation
                      ? 'text-emerald-200'
                      : 'text-slate-100'
                }`}
              >
                {value}
              </dd>
            </div>
          );
        })}
      </dl>

      <div className="mt-5 grid grid-cols-3 overflow-hidden rounded-lg border border-white/10">
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
    <div className="grid overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.03] sm:grid-cols-2 lg:grid-cols-4">
      {EVIDENCE_ITEMS.map((item) => (
        <div key={item.label} className="border-b border-slate-200 p-5 last:border-b-0 dark:border-white/10 sm:odd:border-r lg:border-b-0 lg:border-r lg:last:border-r-0">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
            {item.label}
          </p>
          <p className="mt-2 text-xl font-semibold text-slate-950 dark:text-white">{item.value}</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.detail}</p>
        </div>
      ))}
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
        <p className="mt-2 text-sm text-slate-300">Grounding, guard, and coverage remain visible after the turn.</p>
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
    <section className="border-b border-slate-200 bg-white dark:border-white/10 dark:bg-primary-dark">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-14">
        <div className="mb-8 grid gap-4 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              Multilingual operating surface
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-slate-950 dark:text-white">
              Same banking product, three language and regulator contexts.
            </h2>
          </div>
          <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
            The page now makes the multilingual promise inspectable: language routing, regulatory grounding,
            guard decisions, and response boundaries are shown as part of the same operating surface.
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
    <section className="bg-[#071927] text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-14 sm:px-10 lg:grid-cols-[0.78fr_1.22fr] lg:px-14">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-200">
            Regression scorecard
          </p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight text-white">
            The safety claim is backed by replayable failures.
          </h2>
          <p className="mt-5 text-sm leading-7 text-slate-300">
            Tessera treats known agent failures as product fixtures. Each case declares the failure pattern,
            the check that must pass, and the expected bounded behavior before the demo can be trusted.
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
    <section className="border-b border-slate-200 bg-white dark:border-white/10 dark:bg-primary-dark">
      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-12 sm:px-10 lg:grid-cols-[0.72fr_1.28fr] lg:px-14">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Delivery assurance
          </p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight text-slate-950 dark:text-white">
            The case study now shows how the demo earns trust.
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
            The strongest signal is not a single UI screen. It is the chain from local quality gates to
            deployed infrastructure, with an on-prem path when regulation changes the deployment boundary.
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

function ScenarioSpotlight() {
  return (
    <section className="border-y border-slate-200 bg-white dark:border-white/10 dark:bg-primary-dark">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-14 sm:px-10 lg:grid-cols-[0.92fr_1.08fr] lg:px-14">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Scenario spotlight
          </p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight text-slate-950 dark:text-white">
            The difference is visible when the request is risky.
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-700 dark:text-slate-300">
            A normal demo might answer with whatever tool result is easiest to fetch. Tessera treats the
            banking situation as the product surface: urgency, ownership, disclosure risk, and escalation all
            change the route before a tool is allowed to run.
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
                  The request combines urgency and fraud. The account lookup path is no longer the right default.
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
                Same customer message, different operating discipline.
              </h3>
            </div>
            <p className="max-w-lg text-sm leading-6 text-slate-600 dark:text-slate-300">
              This makes the hidden product decision visible: answering faster is not always safer.
            </p>
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

function DiagramPanel({ title, description, img, alt, orientation = 'wide' }) {
  return (
    <figure className="rounded-lg border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
      <div className="border-b border-slate-200 p-5 dark:border-white/10">
        <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{description}</p>
      </div>
      <div className="bg-slate-50 p-3 dark:bg-primary-dark/50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img}
          alt={alt}
          className={`mx-auto w-full rounded-md object-contain ${orientation === 'tall' ? 'max-h-[620px]' : 'max-h-[440px]'}`}
          loading="lazy"
        />
      </div>
    </figure>
  );
}

function TesseraTabs({ project }) {
  const tabs = useMemo(() => project.ProjectTabs || [], [project]);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  if (!tabs.length) {
    return null;
  }

  return (
    <section className="border-y border-slate-200 bg-white dark:border-white/10 dark:bg-primary-dark">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 sm:px-10 lg:grid-cols-[250px_1fr] lg:px-14">
        <div className="min-w-0">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Case notes
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white">
            How the project holds together
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            A compact read of the product, architecture, safety posture, and shipping status.
          </p>
        </div>

        <div className="min-w-0">
          <div className="flex max-w-full gap-2 overflow-x-auto border-b border-slate-200 pb-2 dark:border-white/10" role="tablist">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={activeTab === tab}
                onClick={() => setActiveTab(tab)}
                className={`min-h-10 shrink-0 rounded-lg px-3 text-sm font-semibold transition ${
                  activeTab === tab
                    ? 'bg-slate-950 text-white dark:bg-white dark:text-primary-dark'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="mt-7 text-base leading-relaxed text-slate-800 dark:text-slate-200">
            {activeTab in project.ProjectInfo && (
              <ProjectMarkdown>{project.ProjectInfo[activeTab]}</ProjectMarkdown>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function TesseraProjectLayout({ project }) {
  const links = project.links || {};

  return (
    <Container fullWidth>
      <div className="bg-white text-slate-900 dark:bg-primary-dark dark:text-slate-100">
        <section className="relative overflow-hidden bg-[#071927] text-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.heroImg || project.img}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-45"
            loading="eager"
            aria-hidden="true"
            style={{
              objectPosition: '72% center',
              WebkitMaskImage:
                'linear-gradient(90deg, transparent 0%, transparent 30%, rgba(0,0,0,0.28) 48%, black 78%)',
              maskImage:
                'linear-gradient(90deg, transparent 0%, transparent 30%, rgba(0,0,0,0.28) 48%, black 78%)',
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#071927_0%,rgba(7,25,39,0.99)_42%,rgba(7,25,39,0.82)_66%,rgba(7,25,39,0.58)_100%)]" />
          <div className="absolute inset-y-0 left-0 w-full bg-[radial-gradient(circle_at_28%_48%,rgba(14,165,233,0.10),transparent_34%)]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#071927] to-transparent" />

          <div className="relative mx-auto flex min-h-[760px] max-w-7xl flex-col px-6 pb-10 pt-8 sm:px-10 lg:px-14">
            <div className="w-fit rounded-full bg-white/10 shadow-lg shadow-black/20 backdrop-blur">
              <BackButton />
            </div>

            <div className="flex flex-1 items-center py-8 sm:py-16">
              <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.55fr)] lg:items-center">
                <div className="max-w-4xl">
                  <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-white/85">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 backdrop-blur">
                      <Landmark className="h-4 w-4 text-sky-300" aria-hidden="true" />
                      EU retail banking
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 backdrop-blur">
                      <ShieldCheck className="h-4 w-4 text-emerald-300" aria-hidden="true" />
                      Guarded agent
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 backdrop-blur">
                      <Cloud className="h-4 w-4 text-amber-300" aria-hidden="true" />
                      Cloud + on-prem
                    </span>
                  </div>

                  <p className="mt-6 text-sm font-semibold uppercase tracking-[0.24em] text-white/55 sm:mt-8">
                    Flagship open-source project
                  </p>
                  <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-none text-white sm:text-6xl lg:text-7xl">
                    Tessera
                  </h1>
                  <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-100 sm:mt-6 sm:text-xl">
                    {project.tagline}
                  </p>

                  <div className="mt-7 flex flex-wrap gap-3 sm:mt-9">
                    {links.github && (
                      <ActionLink href={links.github} icon={Github}>
                        GitHub repository
                      </ActionLink>
                    )}
                    {links.design && (
                      <ActionLink href={links.design} icon={FileText} variant="secondary">
                        Design document
                      </ActionLink>
                    )}
                    {links.safety && (
                      <ActionLink href={links.safety} icon={ShieldCheck} variant="secondary">
                        Safety document
                      </ActionLink>
                    )}
                  </div>

                  <div className="mt-6 grid max-w-4xl grid-cols-2 gap-x-4 gap-y-2 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
                    <HeroMetric icon={Languages} label="Languages" value="FR / DE / EN" />
                    <HeroMetric icon={ShieldCheck} label="Eval set" value="40 failure cases" />
                    <HeroMetric icon={Euro} label="Domain" value="EU banking" />
                    <HeroMetric icon={Database} label="Grounding" value="4 corpora" />
                  </div>
                </div>
                <HeroTrace />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-14">
          <div className="mb-8">
            <EvidenceStrip />
          </div>
          <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
            <article className="rounded-lg border border-slate-200 bg-slate-950 p-6 text-white shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-200">
                Honest positioning
              </p>
              <h2 className="mt-4 text-2xl font-semibold leading-tight">
                Not a new firewall. Not a new benchmark. A complete regulated assembly.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                The value is the end-to-end wiring: runtime guard, regression harness, audit evidence,
                and escalation semantics for one specific European banking support workflow.
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

        <section className="border-y border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-[#0a2032]">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:px-14">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                What it proves
              </p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight text-slate-950 dark:text-white">
                A bank-support agent that is built to be inspected.
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-700 dark:text-slate-300">
                Tessera is intentionally not framed as a new framework. The work is the production assembly:
                guarded tool calls, reproducible failure tests, audit evidence, and escalation paths for a
                multilingual European banking workflow.
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

        <MultilingualSurface />

        <RegressionScorecard />

        <ScenarioSpotlight />

        <section className="bg-[#071927] text-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:px-10 lg:grid-cols-[1fr_380px] lg:px-14">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-200">
                Controlled execution path
              </p>
              <div className="mt-3 grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
                <h2 className="text-3xl font-semibold leading-tight text-white">
                  Every useful action leaves a trail.
                </h2>
                <p className="text-sm leading-7 text-slate-300">
                  The page now shows the operating contract, not only the architecture: each turn moves through
                  routing, retrieval, guard checks, audit emission, and a final response or escalation path.
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

        <section className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-14">
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
              The page keeps the project anchored in diagrams and constraints instead of vague AI claims.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            <DiagramPanel
              title="System architecture"
              description="LangGraph orchestration, retrieval, guarded tools, audit sinks, and dual LLM deployment paths."
              img="/images/projects/tessera/architecture.svg"
              alt="Tessera system architecture"
            />
            <DiagramPanel
              title="Non-regression harness"
              description="Failure cases move through schema validation, multilingual replay, scoring, and CI gates."
              img="/images/projects/tessera/eval-flow.svg"
              alt="Tessera evaluation harness flow"
              orientation="tall"
            />
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-[#071927]">
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

        <TesseraTabs project={project} />

        <section className="mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:px-14">
          <RelatedProjects currentProject={project} />
        </section>
      </div>
    </Container>
  );
}
