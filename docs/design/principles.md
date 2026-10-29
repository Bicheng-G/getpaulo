# Paulo Design Principles — the normative core

**Status:** LIVE · normative. Auto-loaded into every agent session.
**Read this when:** always in context. Binding for any change to child-facing UI, copy, reward
mechanics, or data semantics — at the strictness each rule carries ([#strictness](#strictness)).
**Update this when:** an invariant changes — via a record in
[`docs/decisions/`](../decisions/README.md) **and** explicit founder approval. Never rename or
renumber headings; code cites them as `principles.md#anchor`.
**The rest of the design system:** visual tokens/motion/layout → [system.md](system.md) ·
components → [components.md](components.md) · screen recipes & age bands → [screens.md](screens.md) ·
psychological moonshots → [moonshots.md](moonshots.md) · choice-moment interlude →
[interlude.md](interlude.md).
**Evidence base:** [../research/README.md](../research/README.md) maps claim → evidence grade →
ruling.

Paulo is not a reward chart, child-scoring system, or digital substitute for a caregiver. It is a
**low-friction practice layer for parent–child co-regulation**:

> A real moment happens → Paulo provides the smallest useful scaffold → the child chooses or acts →
> the consequence becomes visible → the family may reflect → support gradually fades.

The shipped app is evidence of current implementation, not design authority. Where code conflicts
with this file, the code should change (track it in `TODOS.md`).

## Decision hierarchy

1. Child safety, agency, privacy, and relational integrity
2. Invariants (this file)
3. Product semantics (this file)
4. Component and screen specifications ([components.md](components.md), [screens.md](screens.md))
5. Current implementation details
6. Aesthetic preference

## Strictness labels {#strictness}

| Label | Meaning | To change it |
|---|---|---|
| **Required** | Violating it makes Paulo a product we do not want to build | Record + founder sign-off |
| **Current** | Deliberate shipped pattern — the best answer we have, not a settled truth | Record |
| **Experimental** | Explicitly unresolved; being tested | Change freely, record the result |

A **Required** rule constrains an *outcome or harm*. A rule that names a colour, component, age,
duration or layout is a mechanism, belongs in the spec docs, and is at most **Current**. Every rule
below states the harm it prevents; a rule whose harm cannot be named is a habit, not a rule.

Records live in [`docs/decisions/`](../decisions/README.md), append-only. The amendment rule: *the
record is written before the code changes, and it must name what would make you change back.*
Adopted 2026-07-27 ([PDR-0001](../decisions/0001-layered-principles-and-amendment.md)); the
previous single-strictness text is in git history.

## Invariants

### The phone is a doorway, not the destination {#doorway}

**Required** · *Prevents:* Paulo competing with the family for the child's attention.
*Revisit if:* a ritual genuinely needs more than seconds to be understood at 4–5.

Paulo exists to improve an offline family moment. Child ritual flows should usually finish within
seconds. Session length is not a success metric. Prompt the interaction, then return attention to
the child and the physical environment. No engagement loops whose purpose is retention.

### The child owns the consequential choice {#child-owns-choice}

**Required** · *Prevents:* a compliance product wearing the costume of an agency product.
*Revisit if:* nothing — this is why Paulo exists. (Its *mechanisms* are revisable; this is not.)

The parent supplies truthful constraints and support. Paulo makes the alternatives and
consequences understandable. The child makes the final legitimate choice. "Enjoy now" and "move my
wish closer" must both be valid. The parent may clarify once, offer help, then stop lobbying.

Paulo is not value-neutral — it exists partly so children can practise waiting, and it may say so.
What it may not do is call something a choice when only one option is available, or when the other
is framed as failure. A two-button interface is not autonomy-supportive if visual or verbal
pressure still privileges one outcome. (Onboarding's guided demo:
[PDR-0003](../decisions/0003-onboarding-demo-is-guided-practice.md).)

### Choice symmetry: no pressure before, honest difference after {#choice-symmetry}

**Required** · *Prevents:* Paulo steering a child who is still deciding.
*Revisit if:* a child in family testing reads the post-choice difference as being told off — see
[PDR-0002](../decisions/0002-pre-choice-neutrality.md).

> **Before the child chooses,** Paulo must not make either option more attractive than the other.
> **After the child chooses,** Paulo shows what actually happened — including that the two
> outcomes genuinely feel different.

Pre-choice, this is structural, not decorative: one shared component and layout path renders both
cards, with equal footprint, media, type hierarchy and interaction weight, and consequences in
matched neutral strips. No amber, badge, glow, elevation or animation advantage on either card
before selection. Post-choice, the ledger change, the ready state and a milestone ceremony are
legitimate — they report a real event, and are bounded by [#anti-patterns](#anti-patterns).

Neither option may look morally superior at any point. Mechanism and enforcement:
[components.md#choice-pair](components.md) (**Current**).

### Support the regulation system; do not score the child {#no-scoring}

**Required** · *Prevents:* Paulo becoming a verdict on who a child is.
*Revisit if:* nothing.

Paulo may help a child pause, remember, choose a strategy, ask for help, or revisit an experience.
It must not infer a stable character trait from app behaviour. Prohibited:
resilience/confidence/discipline/kindness/self-control scores; "good decision" percentages;
rankings, leaderboards, sibling comparisons; diagnostic or personality claims.

### Regulate before reflecting {#regulate-first}

**Required** · *Prevents:* demanding cognition from a child who has none available.
*Revisit if:* nothing.

A dysregulated child should not be asked to explain, journal, or extract a lesson. Sequence: reduce
demand and language → restore enough calm for choice → reflect later, if useful.

### Evidence before identity {#evidence-not-identity}

**Required** · *Prevents:* fixed-trait framing the child then has to live up to or down to.
*Revisit if:* nothing.

Feedback describes observable action, difficulty, strategy, help, and consequence — never a trait.
Prefer "You tried another way after the first one did not work." Avoid "You are naturally
resilient." A repeated pattern may be surfaced cautiously only when grounded in multiple visible
records and reviewed by a parent.

### Promises and records must be reliable {#reliability}

**Required** · *Prevents:* the mechanism failing — a promise the family cannot trust teaches the
opposite of what Paulo is for. *Revisit if:* nothing.

Reliability is part of the developmental mechanism, not a backend detail. Wish rules cannot change
silently. Earned progress cannot disappear after sync or correction. Corrections are visible audit
events, not hidden rewrites. Redemption occurs promptly when the agreed condition is met, or the
delay and reason are explained. Resting, releasing, renaming, or reprioritising a wish must not
imply earlier effort was wasted. **A failed write is never rendered as success.**
Implementation invariants: [../engineering/architecture.md#ledger-invariants](../engineering/architecture.md).

### Money, contribution, and growth are different meanings {#three-channels}

**Required** · *Prevents:* one point economy that prices belonging, health and kindness.
*Revisit if:* nothing.

1. **Promise / Real Money** — actual family-promised saving, gifts, allowance, or clearly
   negotiated paid extra work.
2. **Contribution** — belonging, care, responsibility, effect on others and the shared environment.
3. **Growth Evidence** — mastery, strategy, persistence, recovery, asking for help, repair,
   reflection. Never spendable.

### Parent support is private and just in time {#private-parent-support}

**Required** · *Prevents:* the child watching an adult be coached about managing them.
*Revisit if:* parents report missing guidance they cannot find later, in a calm moment.

One useful sentence, immediately before or after the relevant moment, optional and dismissible,
jargon-free in the urgent state, designed to reduce talking.

### Low parent burden is part of the intervention {#low-burden}

**Required** · *Prevents:* an intervention only an unusually resourced parent can sustain.
*Revisit if:* a feature is genuinely impossible without parent input — then it is the *feature*
that is wrong.

Capture takes seconds. Reuse known information. Generate optional candidates rather than mandatory
logs. No daily journaling quota. No requirement to catalogue every chore, emotion, or decision.
This also rules out readiness quizzes, setup interviews, and configuration Paulo could infer or
simply not need.

### Scaffolds should fade {#fading}

**Current** · *Prevents:* dependence on the app being mistaken for progress.
*Revisit if:* fading is observed to destabilise a routine families rely on — the *rate* is a
hypothesis, the direction is not.

The long-term aim is increased child initiation and reduced adult/app assistance. Strategy prompts
may become favourites, then optional. Older or more capable children take more ownership.

### AI reflects; it does not define {#ai-reflects}

**Required** · *Prevents:* an unaccountable authority on who a child is.
*Revisit if:* nothing.

AI may organise evidence, suggest language, and reduce input friction. It may not: diagnose
emotion, temperament, mental health, learning ability, or personality; overwrite the family's typed
record (a suggestion may fill an untouched field, never a typed one); fabricate memories or
strengths; produce open-ended companion dependency; show an unreviewed identity narrative to the
child.

### Child data is unusually sensitive {#data-minimisation}

**Required** · *Prevents:* irreversible harm that no product benefit offsets.
*Revisit if:* nothing.

Photos, voice, wishes, family agreements, and developmental memories require minimisation and
parent control. Collect only what creates clear family value. Make export, deletion, and storage
behaviour understandable and **true** — "delete everything" must delete everything, "export
everything" must export everything. Keep raw media local where technically feasible. Sharing always
requires an adult action and gate.

### Psychological moonshots improve felt reality truthfully {#moonshots}

**Current** · *Prevents:* delight that is bought with accuracy.
*Revisit if:* a moonshot is shown to improve felt clarity while measurably degrading trust.

Small, truthful, low-cost interventions that disproportionately improve felt clarity, trust,
agency, care, and closure are first-class design work — see [moonshots.md](moonshots.md).

> Improve how the truth is experienced. Never improve the feeling by distorting the truth.

Moonshots cannot substitute for data integrity, accessibility, accurate balances, reliable sync,
reasonable latency, or honoured promises.

## Product semantics

### The pooled promise ledger {#pooled-ledger}

**Required** · *Prevents:* the UI implying allocations the data does not have.
*Revisit if:* families consistently expect per-wish allocation — then the *model* changes, not the
display.

Stars belong to the child's promise ledger, not permanently to one wish. One pooled balance;
multiple wishes may coexist; one may be focused. A wish is "ready" when the available balance meets
its target. Fulfilling spends the agreed stars; any remainder carries forward. The Wish Jar never
shows separate star rows per wish. The focused wish may visualise `min(balance / target, 1)`.

**Stars enter the ledger only through an actual family promise or real financial flow.** Ordinary
self-care, basic chores, kindness, school performance, and generic "good behaviour" do not produce
stars.

### Stars {#stars}

**Required** · *Prevents:* a goodness currency. *Revisit if:* nothing.

A concrete promise unit for wish progress. Not a goodness score, universal currency, badge count,
growth evidence, or payment for ordinary family membership. Each star's meaning is configured
honestly (e.g. one designated skipped ride, a fixed family contribution to the wish fund).

### Real-money translation {#money-ruling}

**Required** (guardrails) · **Current** (default off) · *Prevents:* a second wealth score, and
Paulo talking a family into monetising a practice that does not need money.
*Revisit if:* evidence emerges on early real-value exposure for 4–6s — grade it in
[../research/README.md](../research/README.md) first. See
[PDR-0004](../decisions/0004-money-readiness-not-age.md).

Real money is an optional secondary translation, never the primary child unit. **Required:**
parent-gated; stars stay dominant; never shown inside the hot Moment choice pair; visually
subordinate wherever it appears; the displayed amount must correspond to an actual family financial
commitment; no parallel "star wealth" vs money wealth. **Current:** default off, for simplicity —
not because money is developmentally harmful.

**Paulo does not assess readiness.** No age threshold enables, recommends, or hints at money mode
in either direction. Children of the same age differ enormously in what money means to them, and
the parent knows their child. Paulo explains what the setting changes; the parent decides.

### Temptation library {#temptations}

**Current** · *Prevents:* arbitrary game-economy values detached from the family's promise.
*Revisit if:* the 1–3 star band proves too coarse for real family rules.

Per child: a small library of common immediate experiences — 1–3-star value, one optional "usual",
active/inactive state, a photo or restrained Morandi fallback, a swap strip in the Moment. The
value corresponds to the family's explicit promise rule.

### Family rules {#family-rules}

**Required** (visibility and framing) · *Prevents:* hidden rule changes, and boundaries that read
as accusations. *Revisit if:* families need per-situation rules the current model cannot express.

Family rules make the future credible before a hot moment. They may define what one star means,
which situations qualify, daily designated choice chances, how targets work, what happens at ready,
how corrections are handled. Rules are visible, explainable, stable until deliberately changed,
framed as a shared family agreement, free of hidden penalties. A daily chance limit is a **practice
boundary**: when reached, the app neutrally states the agreement and exits — no implied wrongdoing,
no "anti-farming" language shown to families.

An optional child-authored **My Plan** recording may restate a process the child chose while calm:
breathe, see both legitimate choices, ask for help, or remember an already-used boundary. It is
never proof that the child owes Save or obedience; it never autoplays, becomes required setup, or
substitutes for adult co-regulation ([PDR-0007](../decisions/0007-family-is-a-promise-surface.md)).

### Multi-child family model {#multi-child}

**Required** (no comparison) · **Current** (no global switcher) · *Prevents:* siblings measured
against each other. *Revisit if:* the per-action context choice proves confusing in larger families.

Children have separate wishes, temptation libraries, balances, settings, avatar colours. The Moment
begins with "Who's choosing?" when more than one child exists. No persistent global profile
switcher — context is chosen at the action where ownership matters. **Never compare children's
balances, saves, choices, or Little Wins.** The Family tab is a shared promise-and-agreement
surface, not a child performance surface: a scoped child selector may change the agreement being
reviewed, while adding/editing/removing people and other sensitive administration stays behind its
parent-gated Settings entry ([PDR-0007](../decisions/0007-family-is-a-promise-surface.md)).

### Contribution and Growth Evidence {#contribution-growth}

**Required** · *Prevents:* paying a child for belonging. *Revisit if:* nothing.

Contribution features and Little Wins must not use the star ledger unless an **optional extra
project** has a clearly negotiated real-money value. Basic family contribution records effect and
belonging, not pay. Growth Evidence is never spendable. A thoughtful Play Now, asking for help,
revising a plan, recovering from disappointment, or trying again may all become meaningful evidence
— not just Save choices.

### Semantic colour: the amber ruling {#amber-ruling}

**Required** (the semantic) · **Current** (the allow/deny list) · *Prevents:* reward colour used as
persuasion. *Revisit if:* the palette changes such that amber is no longer the progress signal.

> Amber (`star`/`starDeep`) means **earned progress and milestones**. It is not selection colour,
> navigation colour, or recommendation colour, and it never appears on a choice before the child
> has chosen.

The specific allow/deny list — filled star slots, post-choice ledger change, ready state, milestone
glow, parent progress information; not tab tint, not generic links, not a pre-choice `+N★` badge,
not preselection — lives in [system.md#amber-usage](system.md). Two known violations are shipped
and tracked in `TODOS.md`.

One founder-approved illustration exception is deliberately narrower than this token semantic:
Home's supplied yellow character star depicts **wishes in general**, not a ledger star. It may
retain its authored colour and static glow on Home only; it may never reflect a balance, readiness,
recommendation, choice, Moment outcome or child identity
([PDR-0023](../decisions/0023-use-generated-home-heroes-and-a-general-wish-star.md)). If children
read it as earned progress, the character changes—the amber ruling does not.

## Voice essentials {#voice}

**Required** (honesty, no shame, no trait labels) · **Current** (the specific phrasings)
*Prevents:* adult praise from above, and words that do not mean what they say.

Child-facing: first-person or direct consequence language; concrete and short; one idea per screen;
sentence case; no adult praise from above; no fixed labels; no shame or urgency; one exclamation
maximum, reserved for milestone ceremony. **Words mean what they say** — "choice" implies a real
alternative, "everything" implies everything.

- Prefer: "My wish is ready." · "I chose this today." · "Two stars joined my promise." · "I tried a
  different way."
- Avoid: "Good boy." · "You made the right choice." · "You are so disciplined." · "Don't lose your
  progress." · "Are you sure you want to quit?"
- Choice language: **Play now** / "enjoy this today" · **Save for wish** / "move my wish closer".
  Never describe Play Now as giving up, wasting, or failing.

Parent-facing copy is plain, honest, actionable; distinguishes evidence from certainty; never
promises life outcomes from delay practice. AI copy is grounded in visible source records, cautious
in scope, editable/rejectable, parent-reviewed before becoming child-facing.

All user-facing copy resolves through `Localizable.xcstrings` with semantic keys for behaviourally
important strings ([../engineering/architecture.md#localisation](../engineering/architecture.md)).

## Anti-patterns — hard no {#anti-patterns}

**Required** unless marked. These are the failure modes of the invariants above, not separate rules.

- Pre-choice pressure: amber, reward glow, badges or elevation on one Moment card before the child
  chooses; generic amber navigation tint (**Current**).
- Streak loss, badge counts, leaderboards, sibling comparison.
- Universal points connecting money, chores, health, kindness, school, confidence; cash for basic
  family contribution by default.
- Money display in the hot Moment; any age-triggered money recommendation.
- Hidden parent deletion of earned progress; silent wish-rule or target changes; **a failed save,
  export, migration or erase presented as success**.
- Child scoring, diagnosis, AI personality labels; forced positivity; reflection demands during
  dysregulation; open-ended child AI companion.
- Confetti after routine Save events or as evidence Save is morally correct; casino-like particles,
  coins, loud reward sounds, looping celebration. (A genuine milestone may be celebrated once.)
- Scare modals, red threat styling, "are you sure?" guilt in child flows.
- Heavy black camera scrims obscuring the subject; tiny cut-out subjects in oversized white borders;
  vague repair menus where a direct action is possible (**Current**).
- Fake-instant AI; AI that overwrites typed input; emoji as functional UI iconography (**Current**).
- Fake progress bars, artificial delays, "AI is thinking" theatre; false reassurance about sync,
  balances, recognition, or fulfilment status.
- Moonshot language used to justify dark patterns, urgency, hidden persuasion, or Save-biased
  delight; "care theatre" creating parent work; cosmetic reassurance instead of fixing real
  failures.

## Feature design gate {#feature-gate}

**Quick gate** (small changes — copy, minor components, tweaks): one sentence each — (1) What real
family moment does this improve? (2) Does the child retain genuine agency, with no pressure before
the choice? (3) Does money/contribution/growth keep honest meaning?

**Full gate** (new features or mechanics):

> We believe **[feature]** will help **[specific user]** in **[real-world situation]** develop or
> apply **[target construct]** by **[mechanism]**. Evidence for the human mechanism is **[grade]**.
> We will know it is working when **[behavioural or relationship measure]**, and we will stop or
> revise it if **[falsification or guardrail condition]**.

Fill *[grade]* from [../research/README.md](../research/README.md). If the feature changes a rule
labelled **Current** or **Experimental**, write the record first
([../decisions/README.md#amendment-rule](../decisions/README.md)).

Review questions: real moment improved? · capability or parent action targeted? · behaviour change
beyond screen activity? · concretely understandable at 4–5? · expansion for 6–8 without forced
complexity? · genuine child agency? · honest money/contribution/growth meaning? ·
evidence-not-identity feedback? · tired-parent seconds? · prompt fading? · AI uniquely necessary? ·
falsification result? · pressure/bargaining/shame/gaming detection? · correction/exit/rest/repair
without losing trust? · what uncertainty could a small truthful intervention remove? · does any
moonshot preserve truth and agency?

## Final design thesis {#thesis}

For the child: wishes, real pictures, tactile choices, visible consequences, remembered stories,
growing ownership. For the parent: quiet cognitive infrastructure — preserving promises, reducing
decisions, supplying one useful sentence, aligning caregivers, helping ordinary moments become
evidence of agency.

> **Pause. Connect. See the choice. Act. Experience. Remember. Try again.**
