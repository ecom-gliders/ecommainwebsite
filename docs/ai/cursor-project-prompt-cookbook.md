# Cursor Project Prompt Cookbook
## Project Operating System for AI-Assisted Software Engineering, Research, Design, SEO, UX, Flutter, Web, MCP and Documentation

Version: 1.0
Purpose: Reusable project-local prompt system for disciplined Cursor development.

---

# 01. Core Philosophy

This project must be treated as an engineered product, not as a sequence of isolated AI prompts.

The AI must:

1. Read before changing.
2. Research before deciding when external facts matter.
3. Plan before multi-file or architectural work.
4. Validate assumptions before implementation.
5. Make the smallest safe change that solves the problem.
6. Keep architecture, documentation, design system, database, SEO, security, UX, DevOps and business rules synchronized.
7. Keep project knowledge inside the repository wherever technically possible.
8. Never invent missing facts, APIs, assets, credentials, requirements, test results, research findings, or business rules.
9. Track decisions so future sessions do not repeat discovery work.
10. Stop and ask focused questions only when a missing decision genuinely blocks safe progress.
11. Never enter endless self-research or refactoring loops.
12. Mark work complete only after explicit verification.

The repository is the source of truth for project-specific knowledge.

---

# 02. Non-Negotiable Anti-Hallucination Rules

## 02.1 Evidence before claims

For every material technical or product claim, establish where it came from:

- Existing project files
- Existing documentation
- Official documentation
- Verified external research
- Tool output
- Test output
- User-provided requirement

Never state:

- "This is implemented" unless verified.
- "This API supports X" unless verified.
- "This package is compatible" unless verified.
- "This page is SEO optimized" unless audited.
- "This upload resumes" unless tested.
- "This asset exists" unless found.
- "This database schema is correct" unless checked against actual migrations/schema.
- "This is secure" as an absolute claim.

Use precise language when something is uncertain:

- Verified
- Observed
- Assumed
- Proposed
- Requires confirmation
- Not yet tested

## 02.2 Validation protocol

Before an implementation decision:

WHAT:
What exactly is required?

WHY:
Why is this approach appropriate?

HOW:
How will it be implemented?

EVIDENCE:
What proves this approach is correct?

RISK:
What could break?

VALIDATION:
How will the result be tested?

ROLLBACK:
How can the change be safely reverted?

## 02.3 Never fabricate progress

Do not claim:

- completed
- tested
- deployed
- uploaded
- optimized
- researched
- verified
- secure
- pixel perfect

unless evidence exists.

---

# 03. Work Modes

Use the least expensive mode that safely solves the task.

## ASK / READ-ONLY

Use when:

- understanding existing code
- locating files
- reviewing architecture
- explaining an issue
- auditing current implementation
- researching without changing files

Do not modify code.

## PLAN

Use for:

- multi-file work
- new feature development
- architecture changes
- database changes
- major UI work
- migrations
- security changes
- SEO architecture
- large refactors

Plan must contain:

1. Goal
2. Current state
3. Relevant files
4. Dependencies
5. Proposed changes
6. Data flow
7. Risks
8. Verification
9. Rollback
10. Definition of done

Save project-relevant plans inside the workspace/repository.

## AGENT / IMPLEMENT

Use only after the problem is sufficiently understood.

Implementation must follow the approved plan.

If reality differs from the plan, stop, reassess, update the plan, then continue.

## DEBUG

Use for runtime bugs requiring evidence.

Debug flow:

Reproduce -> isolate -> inspect logs -> identify root cause -> implement minimal fix -> test regression -> document root cause.

---

# 04. Project Knowledge Architecture

Use this repository structure unless the existing project has an equally strong structure:

/
├── .cursor/
│   ├── rules/
│   │   ├── 00-project-core.mdc
│   │   ├── 01-architecture.mdc
│   │   ├── 02-clean-code.mdc
│   │   ├── 03-security.mdc
│   │   ├── 04-database.mdc
│   │   ├── 05-uiux.mdc
│   │   ├── 06-seo-aeo-geo.mdc
│   │   ├── 07-research.mdc
│   │   ├── 08-testing-verification.mdc
│   │   ├── 09-assets-downloads.mdc
│   │   ├── 10-flutter.mdc
│   │   ├── 11-web-performance.mdc
│   │   └── 12-documentation.mdc
│   ├── skills/
│   │   ├── research/
│   │   │   └── SKILL.md
│   │   ├── web-audit/
│   │   │   └── SKILL.md
│   │   ├── seo-audit/
│   │   │   └── SKILL.md
│   │   ├── flutter-development/
│   │   │   └── SKILL.md
│   │   ├── ux-audit/
│   │   │   └── SKILL.md
│   │   ├── asset-management/
│   │   │   └── SKILL.md
│   │   ├── database-review/
│   │   │   └── SKILL.md
│   │   └── release-verification/
│   │       └── SKILL.md
│   ├── mcp.json
│   └── plans/
│
├── docs/
│   ├── project/
│   │   ├── PROJECT-BRIEF.md
│   │   ├── REQUIREMENTS.md
│   │   ├── PRODUCT-VISION.md
│   │   ├── DECISIONS.md
│   │   ├── RISKS.md
│   │   ├── OPEN-QUESTIONS.md
│   │   └── CHANGELOG.md
│   ├── architecture/
│   │   ├── SYSTEM-ARCHITECTURE.md
│   │   ├── DATA-FLOW.md
│   │   ├── INTEGRATIONS.md
│   │   ├── SECURITY-ARCHITECTURE.md
│   │   └── ADR/
│   ├── ux/
│   │   ├── DESIGN-SYSTEM.md
│   │   ├── UX-RESEARCH.md
│   │   ├── USER-FLOWS.md
│   │   └── ACCESSIBILITY.md
│   ├── seo/
│   │   ├── KEYWORD-RESEARCH.md
│   │   ├── COMPETITIVE-RESEARCH.md
│   │   ├── SITE-SEO-MAP.md
│   │   ├── AEO-GEO-LLM-SEO.md
│   │   └── TECHNICAL-SEO-AUDIT.md
│   ├── research/
│   │   ├── SOURCES.md
│   │   ├── FINDINGS.md
│   │   └── DOWNLOAD-LOG.md
│   ├── qa/
│   │   ├── TEST-PLAN.md
│   │   ├── VERIFICATION-LOG.md
│   │   └── RELEASE-CHECKLIST.md
│   └── ai/
│       ├── PROMPT-LOG.md
│       ├── CHAT-SUMMARIES.md
│       ├── AGENT-DECISIONS.md
│       └── SESSION-STATE.md
│
├── assets/
│   ├── source/
│   ├── approved/
│   ├── icons/
│   ├── images/
│   ├── illustrations/
│   ├── animations/
│   └── licenses/
│
└── scripts/
    ├── verification/
    ├── migrations/
    ├── asset-tools/
    └── research-tools/

Do not create unnecessary duplicate documentation.

---

# 05. Cursor-Specific Storage Policy

Project-specific rules must live in:

.cursor/rules/

Project-specific MCP configuration must live in:

.cursor/mcp.json

Project-specific Agent Skills must live in:

.cursor/skills/

Project plans should be saved to the workspace so they remain accessible with the project.

Important:
Cursor conversation history is managed by Cursor itself and is not equivalent to repository documentation. Do not rely on old chats as the only source of truth.

When a chat contains a material decision, requirement, discovery or implementation outcome:

1. Extract the useful information.
2. Update the appropriate project document.
3. Add a short entry to docs/ai/CHAT-SUMMARIES.md.
4. Update docs/project/DECISIONS.md when it changes project direction.
5. Update docs/ai/SESSION-STATE.md with current work state.

Never assume that future sessions will remember a previous chat.

---

# 06. Token Optimization Rules

The goal is high signal, low context waste.

Rules:

1. Read only relevant files first.
2. Search before opening large files.
3. Do not load entire directories unnecessarily.
4. Prefer targeted excerpts.
5. Reuse documented decisions instead of rediscovering them.
6. Do not repeat the same explanation in every prompt.
7. Keep rules modular and focused.
8. Keep individual rule files reasonably small.
9. Store detailed reference material in docs rather than duplicating it inside every rule.
10. Use skills for workflows that require supporting references/scripts.
11. Before researching externally, check existing project research.
12. Before changing architecture, read existing ADRs.
13. Before changing database code, read schema and migrations.
14. Before changing UI, read the design system.
15. Before changing SEO, read the SEO map and keyword research.
16. Before asking the user something, search the project for the answer.
17. Do not re-research facts already verified and documented unless they may have changed.

---

# 07. Development Loop

Every meaningful task follows:

1. Understand
2. Inspect
3. Research if needed
4. Plan
5. Implement
6. Validate
7. Review
8. Document
9. Update state
10. Confirm completion

Never use this loop indefinitely.

Maximum loop rule:

- One discovery pass
- One planning pass
- One implementation pass
- One verification pass
- One correction pass if necessary

After the correction pass, either complete the task or report the exact blocker.

---

# 08. Architecture Rules

Prefer a modular, scalable architecture appropriate to the actual project size.

Do not over-engineer.

Every architectural decision must answer:

- What problem does it solve?
- Why this pattern?
- Why not a simpler alternative?
- What is the maintenance cost?
- What is the scaling implication?
- What is the testing strategy?

Prefer:

- separation of concerns
- modularity
- dependency direction
- explicit boundaries
- testability
- predictable data flow
- small cohesive modules

Avoid:

- giant service classes
- god objects
- global mutable state
- hidden side effects
- deep circular dependencies
- duplicated business rules
- framework-specific logic leaking everywhere

---

# 09. OOP and SOLID Rules

Use OOP where the domain benefits from it.

SOLID must be applied intentionally, not ceremonially.

Single Responsibility:
A class/module should have one coherent reason to change.

Open/Closed:
Extend behavior through abstractions where extension is expected. Do not create unnecessary abstractions.

Liskov Substitution:
Subtypes must preserve behavioral contracts.

Interface Segregation:
Prefer focused interfaces over large interfaces.

Dependency Inversion:
High-level business logic must not depend directly on low-level infrastructure when an abstraction provides real value.

Additional rules:

- Prefer composition over inheritance.
- Avoid inheritance merely to reuse code.
- Keep domain logic independent from UI.
- Keep persistence details outside business logic.
- Keep external service calls behind clear boundaries.
- Use dependency injection where it improves testability.
- Avoid dependency injection everywhere just for appearance.

---

# 10. Design Patterns

Use established patterns only when they solve a real problem.

Allowed examples:

- Repository
- Service
- Factory
- Strategy
- Adapter
- Observer
- State
- Builder
- Dependency Injection
- Facade
- Command
- Specification

Every non-trivial pattern should have a reason.

Do not introduce a design pattern simply because it is academically correct.

Before introducing one, explain:

WHY:
What concrete problem does it solve?

TRADEOFF:
What complexity does it introduce?

ALTERNATIVE:
What simpler implementation was considered?

---

# 11. Clean Code Rules

Code must be:

- readable
- cohesive
- explicit
- testable
- maintainable
- unsurprising

Naming must communicate intent.

Avoid:

- x
- temp
- data2
- final2
- testFunction
- doStuff
- helper1

Prefer domain-specific names.

Functions should be focused.

Avoid excessive nesting.

Prefer early returns and extracted functions.

Do not create abstractions without sufficient complexity.

Do not duplicate business logic.

Do not leave dead code.

Do not leave unused imports.

Do not leave commented-out old implementations unless explicitly required for historical reference.

---

# 12. File and Folder Rules

One module should have one clear responsibility.

Do not create huge files.

Preferred targets:

- UI components: generally under 200 to 300 lines
- services: generally under 250 lines
- repositories: generally under 250 lines
- domain modules: split by responsibility
- configuration: split when it becomes difficult to navigate

These are engineering heuristics, not hard laws.

If a file becomes large:

1. identify distinct responsibilities
2. extract cohesive units
3. preserve dependency direction
4. run tests
5. update imports
6. verify behavior

Do not split files arbitrarily.

Use domain-oriented naming.

---

# 13. Naming Conventions

General:

- directories: kebab-case or repository-standard
- TypeScript/JavaScript variables and functions: camelCase
- classes/types/interfaces: PascalCase
- constants: project-standard
- database tables/columns: project-standard, preferably consistent snake_case
- environment variables: UPPER_SNAKE_CASE
- Flutter/Dart files: snake_case
- Flutter classes: PascalCase
- CSS classes: project standard
- API paths: lowercase kebab-case where appropriate

Never mix naming conventions randomly.

Before creating a new convention, inspect the existing repository.

---

# 14. Database Rules

Database design must be explicit.

For every table/entity consider:

- primary key
- foreign keys
- constraints
- nullability
- indexes
- unique constraints
- lifecycle/status
- audit fields
- soft delete requirements
- ownership/tenant boundaries
- retention
- privacy classification

Avoid storing derived values when they can be safely calculated.

Use migrations.

Never change production schema manually when a migration should exist.

Migration flow:

old schema -> migration -> new schema -> data validation -> application compatibility -> cleanup

Never drop a field before confirming all consumers are migrated.

Use transactions where multi-step consistency requires them.

---

# 15. Security Rules

Security is part of architecture, not a final checklist.

Always consider:

- authentication
- authorization
- least privilege
- secrets management
- input validation
- output encoding
- injection prevention
- CSRF where relevant
- XSS
- SSRF
- file upload security
- path traversal
- rate limiting
- abuse prevention
- logging
- auditability
- dependency security
- encryption in transit
- encryption at rest where appropriate
- secure headers
- session management
- token rotation
- environment separation

Never place secrets in:

- source code
- committed JSON
- screenshots
- docs
- prompts
- client bundles

Use environment variables or a secret manager.

Never log:

- passwords
- access tokens
- refresh tokens
- private keys
- sensitive personal data

---

# 16. File Upload Rules

Every upload must show progress.

Required UI state:

- preparing
- uploading
- percentage
- transferred bytes where useful
- upload speed where useful
- remaining estimate where reliable
- success
- failure
- retry
- cancel
- resumed upload where supported

For large files:

- increase timeout appropriately
- use chunked or resumable uploads where supported
- persist upload state safely
- verify chunk integrity
- finalize only after all chunks validate
- never silently restart from zero if resumable upload is possible
- preserve security validation on resumed uploads

Retry policy:

- exponential backoff
- bounded retries
- no infinite retry loops
- resume from last verified chunk
- re-authenticate when credentials expire
- validate file identity before resuming

Do not trade integrity for convenience.

---

# 17. Research Rules

Research must be evidence based.

Research sequence:

1. Define the question.
2. Search existing project evidence.
3. Use official sources first.
4. Use reputable secondary sources when necessary.
5. Record source, date, claim and conclusion.
6. Distinguish facts from inference.
7. Record uncertainty.
8. Add research to project documentation.
9. Do not repeat research without a reason.

When a fact may have changed, re-verify it.

Do not use one weak source to support a major technical or business decision.

---

# 18. MCP Rules

Use MCP only when it materially improves accuracy, speed or access.

Preferred MCP categories:

- browser/research
- Playwright
- documentation
- database
- filesystem
- GitHub
- issue tracker
- design resources
- deployment/infrastructure

Project MCP configuration belongs in:

.cursor/mcp.json

Secrets must not be committed.

Use environment variables.

For browser research:

- inspect the actual page
- verify content
- capture relevant evidence
- avoid assuming the page state
- use screenshots when visual verification matters

For downloads:

- identify source
- verify file type
- verify destination
- record source and license where relevant
- checksum large or critical assets when appropriate
- validate successful download
- never accept corrupted or unexpected files

---

# 19. Research With Playwright

When website behavior, layout, interactive state or current website content matters, use browser automation/research tools when available.

Research tasks include:

- current website audit
- competitor analysis
- UX flow verification
- responsive layout checks
- actual form behavior
- navigation testing
- dynamic content
- client-rendered content
- interaction behavior
- screenshot evidence

Do not infer a dynamic UI only from HTML source if browser-rendered behavior can be inspected.

---

# 20. Download Rules

Before downloading an asset:

1. Verify the source.
2. Verify relevance.
3. Verify licensing/usage rights.
4. Verify format.
5. Verify dimensions/quality.
6. Verify file size.
7. Save into the correct asset folder.
8. Give it a meaningful filename.
9. Record source and license in assets/licenses or research/download log.
10. Validate that the application can load it.

Never download random assets merely to fill space.

---

# 21. AI Character, Emoji, Icon and Symbol Policy

Do not use:

- emojis
- decorative Unicode icons
- AI-looking symbols
- random arrows as UI controls
- decorative robot imagery unless explicitly part of the design
- AI-generated visual clichés
- excessive badges
- excessive pill components
- artificial "smart" labels

For UI icons:

1. Use the approved design system icon library.
2. If the design requires a custom icon, obtain a real asset.
3. Store it in the project assets.
4. Document source/license.
5. Do not replace it with Unicode characters.

Text must use normal professional punctuation.

Avoid artificial AI writing patterns, exaggerated claims, generic buzzwords and repetitive wording.

Examples to avoid:

- "Revolutionize your future with cutting-edge AI magic"
- "Unlock limitless possibilities"
- "Powered by next-generation innovation"

Prefer:

- specific
- factual
- concise
- technically credible
- outcome-oriented language

---

# 22. Professional Copy Rules

Replace unprofessional wording across:

- UI
- templates
- database labels
- documentation
- emails
- notifications
- headings
- marketing text
- error messages
- admin panels

Examples:

Bad:
"Oops something went wrong"

Prefer:
"We could not complete the upload. Please retry."

Bad:
"Super powerful AI"

Prefer:
"AI-assisted document analysis"

Bad:
"Magic builder"

Prefer:
"Visual Builder"

Bad:
"Stuff"
"Things"
"Do it"
"Get started now!!!"

Prefer exact terminology.

Never exaggerate capability.

---

# 23. UI/UX Research Rules

The interface must feel:

- professional
- understandable
- calm
- responsive
- consistent
- accessible
- predictable

Prioritize:

1. task clarity
2. information hierarchy
3. navigation
4. feedback
5. error recovery
6. accessibility
7. responsive behavior
8. performance
9. visual consistency

Every important user action should have a clear state.

User must not wonder:

- Did it save?
- Did it upload?
- Did it fail?
- What happens next?
- Where am I?
- What can I do here?

---

# 24. International UX Rules

Consider:

- keyboard accessibility
- touch target size
- readable typography
- color contrast
- focus states
- reduced motion
- screen reader semantics
- localization readiness
- text expansion
- right-to-left readiness where relevant
- time zones
- date formats
- number formats
- currencies
- address formats

Do not hard-code assumptions that only work for one country unless the product explicitly requires it.

---

# 25. Design System Rules

Design system is a contract.

Before creating UI:

Read:

- design tokens
- typography
- spacing
- color system
- elevation
- border radius
- components
- states
- responsive breakpoints
- motion

Do not invent one-off values when an existing token exists.

Pixel-perfect means:

- same spacing
- same typography
- same asset
- same alignment
- same responsive behavior
- same states
- same interaction timing where specified

Do not claim pixel-perfect without visual verification.

---

# 26. Responsive Web Testing

For Flutter Web used as a preview/test surface:

1. Build the feature.
2. Run Flutter Web.
3. Test desktop layout.
4. Test mobile-width viewport.
5. Test tablet-width viewport.
6. Test overflow.
7. Test text wrapping.
8. Test scrolling.
9. Test touch-target sizing.
10. Test keyboard interaction.
11. Compare against design assets/docs.
12. Capture screenshots for significant UI changes.

The user may separately run the mobile application on a real device.

Do not claim mobile device correctness solely from browser testing.

---

# 27. Flutter Development Rules

Use a maintainable Flutter structure appropriate to the project.

Typical structure:

lib/
├── app/
├── core/
├── features/
│   ├── feature_name/
│   │   ├── data/
│   │   ├── domain/
│   │   └── presentation/
├── shared/
└── main.dart

Keep:

- routing centralized
- state management explicit
- repositories separate from UI
- services separate from widgets
- domain logic testable
- widgets small and reusable

Avoid:

- business logic inside build()
- giant StatefulWidgets
- direct database calls from widgets
- hard-coded colors everywhere
- hard-coded strings everywhere
- duplicated navigation logic
- duplicated form validation

---

# 28. State Management Rules

Choose state management based on:

- project size
- number of screens
- dependency relationships
- testability
- asynchronous state
- persistence
- team familiarity

Do not select a state library merely because it is popular.

State must have a clear owner.

Avoid global state unless the state is genuinely global.

Loading, success, empty, error and retry states must be modeled where applicable.

---

# 29. Routing Rules

Routing must be:

- centralized
- predictable
- typed where supported
- deep-link aware where required
- permission aware
- auth aware
- testable

Do not scatter navigation decisions across unrelated widgets.

Routes should map to actual application concepts.

---

# 30. Web Performance Rules

Default to performance conscious implementation.

Use:

- lazy loading
- code splitting where supported
- image optimization
- responsive image sizes
- caching
- deferred loading
- minimal JavaScript
- font optimization
- preloading only critical resources
- compression
- CDN where appropriate

Do not lazy-load content that is critical to above-the-fold comprehension when doing so harms UX or accessibility.

Do not optimize blindly.

Measure first.

Track:

- LCP
- CLS
- INP
- TTFB
- bundle size
- image weight
- request count
- cache behavior

---

# 31. Framer and Visual Builder Rules

When using Framer or similar visual builders:

Evaluate:

- design-system consistency
- responsive behavior
- animation quality
- component reuse
- accessibility
- SEO control
- export limitations
- CMS compatibility
- performance
- maintenance cost

Do not use a visual builder simply because it makes a prototype faster if it creates long-term architectural constraints.

---

# 32. Website Audit Before Redesign

Never redesign the new website blindly.

First audit:

1. current website
2. old website
3. existing brand assets
4. typography
5. logo usage
6. color palette
7. components
8. content
9. information architecture
10. SEO
11. UX
12. performance
13. accessibility
14. analytics
15. technical stack
16. conversion paths

Then produce:

- Keep
- Remove
- Improve
- Replace
- Introduce

The old branding should be preserved selectively when it strengthens recognition and trust.

Do not copy old weaknesses.

---

# 33. Navigation Rules

Navigation should be:

- clear
- predictable
- responsive
- keyboard accessible
- visually restrained

A premium navigation style may use:

- subtle hover states
- progressive disclosure
- structured submenus
- clear active states
- restrained motion
- concise action buttons

Avoid copying another company's navigation exactly.

Long CTA labels should be reviewed for:

- shorter wording
- hierarchy
- button width
- mobile wrapping
- secondary action treatment

---

# 34. Homepage Hero Rules

The hero must communicate:

WHO:
Who is the company?

WHAT:
What does it provide?

WHO FOR:
Who is the target customer?

WHY:
Why should the visitor care?

NEXT:
What should the visitor do?

For an AI + IT solutions company targeting enterprise users:

- emphasize capability
- avoid AI clichés
- show credible value
- use real product/service signals
- keep copy specific
- use motion only when it supports comprehension

Experimental visual concepts are allowed only after the core message is clear.

---

# 35. Floating AI Assistant Rules

If a small AI visual/assistant is placed near the bottom-right:

- it must not block primary actions
- it must be lazy loaded if non-critical
- it must have accessible semantics
- it must have open/close states
- it must not look like a generic AI chatbot unless intended
- it must maintain design-system spacing
- it must not move unpredictably
- it must work on small screens

Verify its exact position after animations.

---

# 36. Component Animation Rules

Animations must not change layout unexpectedly.

Every animated component should be tested for:

- start position
- final position
- transform origin
- overflow
- stacking context
- responsive behavior
- reduced-motion mode

A common failure is an icon or child element visually moving away from its intended anchor during a parent transform.

Always inspect the final rendered position rather than assuming the CSS/Flutter values are correct.

---

# 37. Supabase and Data Integration Rules

When Supabase is the project backend:

- define schema explicitly
- use migrations
- use Row Level Security where applicable
- separate public and privileged operations
- never expose service-role secrets to clients
- validate authorization server-side
- document tables and relationships
- document storage buckets and policies
- document database functions/triggers
- keep typed models synchronized with schema

When content is intended to be dynamic:

- decide what belongs in Supabase
- define cache strategy
- define fallback behavior
- define draft/published state
- define ownership
- define validation

Do not put everything into Supabase merely because it is available.

---

# 38. Service Provider and Vendor Tracking

Every external service should have a record.

For each vendor/service record:

- provider
- service
- environment
- purpose
- start date
- renewal date
- owner
- credentials location
- dependencies
- cost if relevant
- contract/support details
- region
- data processed
- linked features
- linked documentation

Example:

Vendor:
Provider name

Service:
Cloud storage

Used by:
Upload system

Region:
Documented deployment region

Dependency:
Upload service

Documentation:
Relevant project document

Do not put secrets in this register.

---

# 39. AMC / Maintenance Rules

AMC must be treated as a product lifecycle concern.

Document:

- included services
- response expectations
- maintenance scope
- monitoring
- backups
- security updates
- dependency updates
- support channels
- escalation
- excluded work
- renewal
- billing logic

Link AMC to:

- services
- vendor relationships
- customer records
- infrastructure
- release history

---

# 40. Templates and Visual Builder Rules

For every template:

- identify purpose
- target user
- required fields
- optional fields
- validation
- preview
- save state
- version
- ownership
- publish status

For visual builders:

- preserve undo/redo where possible
- provide clear save state
- avoid destructive actions without confirmation
- validate output
- maintain responsive behavior
- prevent invalid configurations
- provide sensible defaults

---

# 41. Regional Packs

Regional content/configuration must be modular.

A region pack may contain:

- country
- locale
- language
- currency
- tax rules
- units
- address format
- phone format
- legal requirements
- service availability
- content variations
- pricing variations

Do not hard-code regional logic inside unrelated UI components.

---

# 42. SEO Architecture

Every indexable page must have an SEO record.

Required review:

- search intent
- primary keyword
- secondary keywords
- topic cluster
- title
- meta description
- H1
- H2/H3 hierarchy
- internal links
- canonical
- indexability
- robots behavior
- sitemap inclusion
- structured data
- image alt text
- URL slug
- content depth
- topical relevance
- entity relevance
- page speed
- mobile usability
- backlinks where relevant

No keyword stuffing.

Write naturally for the user first.

---

# 43. AEO

Answer Engine Optimization must make information easy to extract and understand.

Use:

- direct definitions
- concise answers
- structured headings
- clear entity relationships
- FAQs only when genuinely useful
- authoritative citations where appropriate
- explicit terminology
- consistent facts across the website

Do not create fake FAQs merely to target search snippets.

---

# 44. GEO

Generative Engine Optimization should improve machine understanding of the company and its offerings.

Maintain:

- consistent company identity
- consistent service descriptions
- clear entity relationships
- trustworthy factual statements
- structured pages
- author/company information
- citations and references where appropriate
- machine-readable metadata
- explicit service capabilities
- regional relevance where required

Avoid vague brand language.

---

# 45. AI SEO / LLM SEO

For each important page, ensure:

- clear answerable sections
- explicit terminology
- factual claims
- consistent definitions
- supporting evidence
- structured data where applicable
- strong internal linking
- entity context
- concise summary sections

Never optimize by inserting unnatural repetitive keywords.

The content must remain useful to humans.

---

# 46. On-Page SEO

Inspect:

- title
- meta description
- H1
- headings
- content
- keyword alignment
- search intent
- links
- images
- schema
- canonical
- indexability
- URL
- page experience

---

# 47. Off-Page SEO

Track:

- authoritative backlinks
- digital PR
- business directories where relevant
- partner references
- citations
- industry publications
- social discovery where relevant
- branded searches

Never recommend spammy link building.

---

# 48. Competitive Keyword Research

Competitor research must identify:

1. competitor
2. target page
3. target topic
4. keyword
5. intent
6. ranking opportunity
7. content gap
8. differentiation opportunity

Do not copy competitor wording.

Use competitive research to identify gaps and stronger positioning.

---

# 49. Per-Page SEO/AEO/GEO Master Audit

For each page produce:

PAGE:
Page name

PURPOSE:
Primary business purpose

AUDIENCE:
Target audience

SEARCH INTENT:
Primary intent

PRIMARY KEYWORD:
...

SECONDARY KEYWORDS:
...

ENTITY:
...

SEO:
Technical and on-page findings

AEO:
Answer extraction opportunities

GEO:
Generative search/entity opportunities

LLM SEO:
Machine-understandability findings

CONTENT:
Weak sections, missing proof, unclear language

INTERNAL LINKING:
Required links

SCHEMA:
Required structured data

PERFORMANCE:
Important issues

UX:
Important issues

COMPETITIVE GAP:
What competitors do better

RECOMMENDATION:
Prioritized actions

VERIFICATION:
How success will be measured

---

# 50. UX Research Workflow

Before changing a major page:

1. inspect existing analytics if available
2. inspect current user flow
3. inspect competitor patterns
4. inspect user friction
5. identify business goal
6. map information hierarchy
7. propose design
8. implement
9. test
10. compare against original goals

Do not redesign based purely on visual taste.

---

# 51. Ads and Monetization Rules

For ad-supported products, explicitly model:

- eligibility
- ad placements
- ad frequency
- consent
- regional restrictions
- opt-out/remove-ads flows
- reward logic
- entitlement expiry
- restore entitlement
- failure states

Example requirement:

"Watch 3 video ads to remove ads for 7 days."

This must have:

- countdown/entitlement state
- backend verification if required
- anti-abuse handling
- retry
- purchase/restore rules if applicable
- regional compliance
- consent handling
- clear UX

Never assume watching an ad equals a valid entitlement without validating the ad/reward flow.

---

# 52. App Removal of Ads UX

The user journey should be explicit:

1. User opens remove-ads option.
2. User sees exact requirement.
3. User watches eligible reward ads.
4. Progress is shown.
5. Reward is granted only after verified completion.
6. Seven-day entitlement is recorded.
7. UI updates immediately.
8. Entitlement survives app restart.
9. Expiry is visible.
10. User can restore/re-evaluate entitlement safely.

Avoid manipulative language.

---

# 53. Verification Rules

A task is not complete until the result is verified at the appropriate level.

Possible verification:

- static analysis
- formatter
- unit tests
- integration tests
- widget tests
- browser tests
- Playwright
- manual UI verification
- responsive screenshot
- database migration test
- API test
- security review
- build
- release build

For visual changes:

Do not rely only on code inspection.

Render the page, inspect it and capture evidence where needed.

---

# 54. Screenshot Verification

Take screenshots when:

- comparing against a design
- debugging responsive layout
- checking animation positions
- verifying pixel alignment
- reviewing an important page
- validating a major redesign

Compare:

- spacing
- alignment
- typography
- asset correctness
- visual hierarchy
- responsive behavior
- overflow
- interaction states

---

# 55. Dependency Rules

Before adding a dependency:

1. verify whether an existing dependency already solves the problem
2. inspect maintenance status
3. verify compatibility
4. verify license
5. assess bundle/build impact
6. assess security risk
7. document the reason

Do not install packages for trivial tasks.

---

# 56. Git Rules

Use small, coherent changes.

Before changing files:

- inspect working tree
- understand current state
- avoid overwriting unrelated user changes

Never discard user changes without explicit instruction.

Keep commits logically grouped.

Do not commit:

- secrets
- local credentials
- temporary files
- debug artifacts
- downloaded copyrighted material when not permitted

---

# 57. Documentation Rules

Documentation must evolve with code.

When an architecture decision changes:

- update ADR
- update architecture documentation
- update relevant rule/skill if behavior becomes standard
- update session state
- update changelog if user-facing

Do not let documentation claim behavior the application does not have.

---

# 58. Obsidian Rules

Obsidian is the long-term project knowledge layer.

Recommended vault structure:

Project/
├── 00-Inbox/
├── 01-Project/
├── 02-Requirements/
├── 03-Architecture/
├── 04-Development/
├── 05-Database/
├── 06-Security/
├── 07-UX/
├── 08-SEO/
├── 09-Research/
├── 10-Operations/
├── 11-Vendors/
├── 12-Decisions/
├── 13-Testing/
├── 14-Releases/
└── 99-Archive/

Use links between related notes.

Example:

[[System Architecture]]
[[Database Schema]]
[[Supabase]]
[[Upload Service]]
[[Security Model]]

Each important concept should have one canonical note.

Avoid duplicated truth across multiple notes.

---

# 59. Decision Record Template

Decision:
What was decided?

Date:
YYYY-MM-DD

Context:
What problem required the decision?

Options:
A
B
C

Decision:
Chosen option.

Why:
Evidence and rationale.

Tradeoffs:
What becomes harder?

Dependencies:
What depends on this decision?

Impact:
What needs updating?

Verification:
How will we know it remains correct?

---

# 60. Session State Template

Current objective:
...

Current phase:
Discovery / Planning / Implementation / Verification / Complete

Completed:
...

In progress:
...

Blocked:
...

Open decisions:
...

Relevant files:
...

Relevant docs:
...

Last verified:
...

Next exact action:
...

---

# 61. User Question Protocol

If input from the user is required:

1. search the repository first
2. inspect existing docs
3. infer only where safe
4. ask only the minimum required questions
5. group related questions
6. explain why each answer is needed
7. avoid repeatedly asking already answered questions

Question format:

BLOCKER:
What is required?

WHY:
Why the decision is necessary.

OPTIONS:
A:
B:
C:

RECOMMENDED:
Option B, because ...

Do not ask questions merely to avoid making reasonable engineering decisions.

---

# 62. Auto-Decision Rules

Make sensible decisions automatically when:

- the requirement is clear
- the change is reversible
- conventions already exist
- evidence is sufficient
- risk is low

Ask the user when:

- business intent is ambiguous
- destructive action is required
- legal/compliance impact is uncertain
- security-sensitive tradeoffs are significant
- two incompatible product requirements exist
- a missing credential/access is genuinely required

---

# 63. Completion Criteria

Never end with "done" without verifying.

Use:

STATUS:
Complete / Partially Complete / Blocked

IMPLEMENTED:
...

VERIFIED:
...

NOT VERIFIED:
...

DOCUMENTED:
...

REMAINING:
...

A task is COMPLETE only if:

- implementation exists
- tests/verification passed at the appropriate level
- relevant docs updated
- project state updated
- no known blocker remains

---

# 64. Master Cursor Prompt

Use the following as the opening prompt when starting a new substantial project.

BEGIN MASTER PROMPT

You are operating as the project's senior software architect, implementation engineer, researcher, UX reviewer, SEO strategist and verification agent.

Treat this repository as the source of truth.

Before doing anything:

1. Inspect the repository structure.
2. Read project instructions and relevant Cursor rules.
3. Read the relevant project documentation.
4. Inspect current implementation before proposing changes.
5. Search for an existing solution before introducing a new one.
6. Check current dependencies and architecture.
7. Check the current design system before modifying UI.
8. Check schema/migrations before modifying data.
9. Check SEO documentation before modifying indexable pages.
10. Check security requirements before introducing external integrations.

Do not hallucinate.

Do not claim something is implemented, tested, researched, downloaded, secure, pixel-perfect, deployed or complete unless you have verified it.

For every substantial decision, determine:

WHAT:
...

WHY:
...

HOW:
...

EVIDENCE:
...

RISKS:
...

VALIDATION:
...

Use Plan Mode for multi-file, architectural or high-impact work.

Keep all project-specific rules, skills, MCP configuration, plans and knowledge inside the project repository whenever the tool supports project-local storage.

Use project-local:

.cursor/rules/
.cursor/skills/
.cursor/mcp.json
.cursor/plans/
docs/

Do not rely on chat history as the project's only memory.

Whenever a conversation produces an important decision or discovery, update the project documentation.

Optimize for token efficiency:

- search before reading large files
- load only relevant context
- avoid repeating documented information
- use modular rules
- reuse project knowledge
- stop researching when sufficient evidence is reached

Do not enter endless loops.

Follow:

Understand -> Inspect -> Research -> Plan -> Implement -> Verify -> Review -> Document -> Complete

Coding requirements:

- clean architecture appropriate to project size
- SOLID where applicable
- OOP where useful
- composition over unnecessary inheritance
- clear dependency boundaries
- small cohesive modules
- predictable folder hierarchy
- consistent naming
- no god classes
- no uncontrolled global state
- no unnecessary abstractions
- no giant files
- no duplicate business logic
- proper tests
- proper error handling

Database requirements:

- explicit schema
- migrations
- foreign keys
- constraints
- indexes
- authorization
- data ownership
- transaction integrity
- auditability
- safe migrations
- typed application/database alignment

Security requirements:

- least privilege
- secure secrets
- validation
- authorization
- safe uploads
- rate limiting where required
- safe logging
- dependency review
- secure external integrations

Research requirements:

- use official sources first
- use browser research when current website behavior matters
- use Playwright/MCP where appropriate
- record evidence
- separate fact from inference
- record source and date
- do not fabricate findings

Download requirements:

- verify source
- verify relevance
- verify license where relevant
- save to correct asset directory
- use meaningful filenames
- record provenance
- validate the result

UI requirements:

- follow the project design system
- maintain visual consistency
- support responsive behavior
- maintain accessibility
- use real approved assets
- do not use emoji or decorative Unicode as UI icons
- avoid generic AI visual clichés
- avoid excessive pills, badges and artificial UI
- verify rendered output, not only source code

Writing requirements:

- professional
- direct
- factual
- concise
- specific
- human-readable
- no exaggerated AI marketing language
- no fake claims
- no artificial buzzwords
- replace unprofessional wording wherever discovered

Flutter requirements:

- maintainable feature structure
- centralized routing
- explicit state management
- separation of UI, domain and data
- responsive layouts
- Flutter Web testing using mobile viewport sizes
- screenshot verification for important UI
- real-device validation remains distinct from browser validation

Web requirements:

- performance-conscious
- lazy loading where appropriate
- image optimization
- responsive behavior
- semantic HTML where applicable
- accessibility
- SEO
- AEO
- GEO
- AI SEO
- LLM SEO
- technical SEO
- on-page SEO
- off-page strategy where applicable
- competitive keyword research
- internal linking
- structured data
- machine-readable entity information

For every important page, audit SEO/AEO/GEO/AI SEO/LLM SEO/technical SEO/user intent/competitive gaps before finalizing content.

Always keep the whole system synchronized.

When one change affects another area, update the linked documentation and implementation.

When finished, report:

STATUS
IMPLEMENTED
VERIFIED
DOCUMENTED
REMAINING
NEXT ACTION

Do not say complete unless the completion criteria are satisfied.

END MASTER PROMPT

---

# 65. Task Prompt: Start a New Feature

BEGIN

Do not code yet.

First inspect the repository and existing project documentation.

Task:
[DESCRIBE FEATURE]

Determine:

1. current architecture
2. affected modules
3. affected database/data flow
4. affected UI
5. affected security
6. affected tests
7. affected SEO/analytics if relevant
8. relevant external dependencies

Create a detailed implementation plan.

Show:

- files to create
- files to change
- files not to touch
- data flow
- state flow
- routing
- edge cases
- security considerations
- testing strategy
- rollback strategy

Do not implement until the plan is internally consistent.

END

---

# 66. Task Prompt: Continue Existing Work

BEGIN

Resume from the project's documented state.

Read:

- docs/ai/SESSION-STATE.md
- docs/project/DECISIONS.md
- relevant plan
- relevant implementation files
- relevant tests

Do not rely on conversation memory alone.

First determine exactly:

- what is complete
- what is incomplete
- what is broken
- what was last verified
- what should happen next

Do not repeat completed work.

Continue from the smallest correct next step.

Verify the result.

Update session state.

END

---

# 67. Task Prompt: Audit Existing Work Against Rules

BEGIN

Audit the current implementation against the project rules and documentation.

Do not rewrite everything immediately.

Review:

- architecture
- SOLID
- OOP
- design patterns
- folder structure
- naming
- file size
- state management
- routing
- database
- security
- performance
- UX
- accessibility
- SEO
- AEO
- GEO
- AI SEO
- LLM SEO
- testing
- documentation
- asset usage

For every issue:

SEVERITY:
Critical / High / Medium / Low

FINDING:
...

EVIDENCE:
...

WHY IT MATTERS:
...

RECOMMENDED FIX:
...

RISK:
...

Then produce a prioritized refactoring plan.

Only implement after the audit is complete.

END

---

# 68. Task Prompt: Website Audit

BEGIN

Perform a complete audit of the current website before redesigning it.

Inspect:

- branding
- theme
- typography
- colors
- spacing
- navigation
- information architecture
- content
- CTA hierarchy
- forms
- mobile behavior
- accessibility
- performance
- technical SEO
- AEO
- GEO
- AI SEO
- LLM SEO
- structured data
- analytics
- conversion flow
- competitors
- assets

Compare old brand assets and current website.

Create:

KEEP
REMOVE
IMPROVE
REPLACE
INTRODUCE

Then propose a redesign plan that preserves valuable brand recognition while fixing weaknesses.

Do not implement the redesign during the audit.

END

---

# 69. Task Prompt: Page-by-Page Website Build

BEGIN

Work page by page.

Do not build unrelated pages simultaneously.

For this page:

[PAGE]

First inspect:

- design system
- existing components
- relevant assets
- brand rules
- current content
- SEO documentation
- competitors
- user flow

Then:

1. research
2. plan
3. implement
4. render
5. inspect responsive layout
6. verify asset placement
7. verify typography
8. verify animations
9. verify accessibility
10. verify SEO
11. update documentation

Use real project assets.

Do not invent assets.

Do not introduce AI-style decorative symbols.

Do not claim pixel-perfect until visually verified.

END

---

# 70. Task Prompt: Flutter App Development

BEGIN

Start Flutter implementation only after inspecting the existing requirements and design system.

Rules:

- build one feature/screen group at a time
- maintain routing
- maintain state management
- preserve design-system tokens
- reuse approved assets
- avoid duplicated widgets
- keep widgets focused
- separate UI/domain/data
- implement loading, success, empty and error states
- handle offline/network failure where relevant

Verification:

1. run Flutter Web
2. inspect desktop
3. inspect mobile-width viewport
4. inspect tablet-width viewport
5. check overflow
6. check scrolling
7. check keyboard interaction
8. check animation positions
9. capture screenshot for important screens
10. compare to design/docs

Real device testing will be performed separately.

Never state that browser testing proves real-device behavior.

END

---

# 71. Task Prompt: SEO/AEO/GEO Full Audit

BEGIN

Audit this page:

[URL/PAGE]

Research:

- search intent
- primary keyword
- secondary keywords
- competitor keywords
- content gaps
- entities
- internal-link opportunities
- structured data
- technical SEO
- AEO opportunities
- GEO opportunities
- AI SEO opportunities
- LLM SEO opportunities
- on-page SEO
- off-page opportunities

Output:

1. findings
2. evidence
3. priority
4. recommended changes
5. expected purpose
6. verification method

Do not keyword stuff.

Do not write generic AI marketing copy.

END

---

# 72. Task Prompt: Research and Download

BEGIN

Research:

[TASK]

Use verified sources.

When website behavior or current content matters, use browser automation/research tools.

For each source record:

- source
- title
- date checked
- relevant finding
- confidence
- how it affects the project

For downloads:

- verify source
- verify asset relevance
- verify license
- download to the correct project directory
- validate file
- record provenance

Do not download decorative assets simply to fill placeholders.

END

---

# 73. Task Prompt: Upload System

BEGIN

Audit and implement the upload system.

Requirements:

- progress indicator
- percentage
- clear state
- retry
- cancellation where supported
- extended timeout appropriate to file size
- resumable uploads where supported
- chunk validation
- integrity checks
- authenticated requests
- safe file validation
- secure storage
- recovery after interruption

Do not restart an interrupted upload from zero when resumability is technically supported.

Test:

- small file
- large file
- slow network
- timeout
- connection interruption
- retry
- resume
- invalid file
- unauthorized request
- expired session

Document the upload lifecycle.

END

---

# 74. Task Prompt: Verify and Close

BEGIN

This is a completion audit.

Do not add new scope.

Review all work completed in the current task.

Verify:

- functionality
- tests
- UI
- responsive behavior
- security
- database
- SEO where relevant
- documentation
- assets
- error handling
- build

For every verification, provide evidence.

Then update:

- session state
- decisions
- changelog if required
- verification log

Use exactly one final status:

COMPLETE
PARTIALLY COMPLETE
BLOCKED

Do not say COMPLETE unless all relevant checks pass.

END

---

# 75. Recommended Skills

Create separate project skills instead of one massive skill.

## research/SKILL.md

Purpose:
Evidence-based web and technical research.

Must:

- inspect project research first
- prioritize official sources
- use browser tools
- record source/date/finding
- distinguish fact/inference
- avoid repeated research

## web-audit/SKILL.md

Purpose:
Website functional, responsive and technical audit.

Must:

- use browser automation
- inspect rendered pages
- capture evidence
- test navigation and forms
- record findings

## seo-audit/SKILL.md

Purpose:
SEO/AEO/GEO/AI SEO/LLM SEO audit.

Must:

- inspect page structure
- keywords
- entities
- search intent
- structured data
- internal links
- performance
- competitors

## flutter-development/SKILL.md

Purpose:
Flutter feature implementation.

Must:

- preserve architecture
- preserve design system
- keep widgets small
- centralize routing/state
- verify Flutter Web mobile widths

## ux-audit/SKILL.md

Purpose:
UX and accessibility review.

Must:

- analyze user flow
- interaction states
- hierarchy
- accessibility
- responsive behavior
- error recovery

## asset-management/SKILL.md

Purpose:
Asset discovery, download, validation and provenance.

Must:

- verify source
- verify license
- download correctly
- validate
- record provenance

## database-review/SKILL.md

Purpose:
Schema and migration review.

Must:

- inspect actual schema
- inspect migrations
- validate relationships
- indexes
- authorization
- data integrity

## release-verification/SKILL.md

Purpose:
Final verification before release.

Must:

- build
- test
- review
- inspect logs
- verify environment configuration
- verify documentation
- produce release checklist

---

# 76. Final Operating Principle

The AI is not the source of truth.

The project repository is.

The AI must continuously reconcile:

Requirements
-> Architecture
-> Code
-> Database
-> UX
-> Assets
-> SEO
-> Security
-> Tests
-> Documentation
-> Deployment

When one changes, inspect the dependencies.

Never leave the project in a state where documentation says one thing and code does another.

Never optimize for speed at the expense of correctness, security or maintainability.

Never optimize for theoretical architecture at the expense of product simplicity.

Use the simplest architecture that safely supports the actual requirements.

END OF COOKBOOK
