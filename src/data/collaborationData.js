/**
 * Portfolio Collaborative Construction Intro — Authoritative Data & Timeline Specification
 * - Exactly 10 Designer Cursors (Titles Only — No Personal Names)
 * - Exact 7-Phase Cinematic Sequence Matching Reference Video (41.5s Total Duration)
 * - Effective Layout Viewport Width Gating (>= 1024 CSS px, Touchscreen/Desktop-Site Compatible)
 * - Dynamic Teams of 2–4, Active vs. Subtly Dimmed Idle States, Collision-Free Curved Paths
 */

export const DESKTOP_MIN_WIDTH = 1024;
export const FINAL_INTRO_STAGE = 12;
export const REVEAL_INTRO_STAGE = 1;
export const TOTAL_INTRO_DURATION_MS = 41500;
export const MAX_INTRO_WATCHDOG_MS = 46000;
export const MAX_PARTICLE_CAP = 24;
export const LOW_POWER_PARTICLE_CAP = 8;

/**
 * Exact Sequential Animation Timeline:
 * - Phase 1: INTRO (0-4s, Stage 0)                - Black screen, 10 cursors appear & move smoothly.
 * - Phase 2: WEBSITE_REVEAL (4-7.5s, Stage 1)      - Black screen dissolves, website fades in smoothly.
 * - Phase 3: HERO_FOCUS (7.5-11s, Stage 2)        - Camera centers on Hero, cursors travel to Hero & pause.
 * - Phase 4: DESIGNER_ASSIGNMENT (11-14s, Stage 3) - Role labels & task descriptions assigned.
 * - Phase 5: HERO_CONSTRUCTION (14-24s, Stages 4-6):
 *            - Stage 4 (14-17s): Profile avatar & status badge framed & positioned.
 *            - Stage 5 (17-20.5s): Heading progressively typed word-by-word with typography selection box.
 *            - Stage 6 (20.5-24s): CTA buttons snap in, brand colors apply, stats count up.
 * - Phase 6: SECTION_CONSTRUCTION (24-38s, Stages 7-10):
 *            - Stage 7 (24-28s): About & Skills bento grid constructed.
 *            - Stage 8 (28-32.5s): Projects (GOC + National Admission Portal) constructed.
 *            - Stage 9 (32.5-35.5s): Achievements & Now section constructed.
 *            - Stage 10 (35.5-38s): Contact form & direct channels wired.
 * - Phase 7: FINAL_REVEAL & COMPLETE (38-41.5s+, Stages 11-12):
 *            - Stage 11 (38-41.5s): Final adjustments, ✓ Done, camera settles at top Hero, cursors fade out.
 *            - Stage 12 (41.5s+): Complete, interaction unlocked, real portfolio ready.
 */
export const INTRO_STAGE_TIMINGS = [
    { stage: 0, phase: 'INTRO', timelineWindow: '0-4s', startMs: 0, section: 'home', cameraScale: 0.94, fallbackY: 0 },
    { stage: 1, phase: 'WEBSITE_REVEAL', timelineWindow: '4-7.5s', startMs: 4000, section: 'home', cameraScale: 0.96, fallbackY: 0 },
    { stage: 2, phase: 'HERO_FOCUS', timelineWindow: '7.5-11s', startMs: 7500, section: 'home', cameraScale: 0.98, fallbackY: 0 },
    { stage: 3, phase: 'DESIGNER_ASSIGNMENT', timelineWindow: '11-14s', startMs: 11000, section: 'home', cameraScale: 0.985, fallbackY: 0 },
    { stage: 4, phase: 'HERO_CONSTRUCTION', timelineWindow: '14-17s', startMs: 14000, section: 'home', cameraScale: 1.0, fallbackY: 0 },
    { stage: 5, phase: 'HERO_CONSTRUCTION', timelineWindow: '17-20.5s', startMs: 17000, section: 'home', cameraScale: 1.0, fallbackY: 0 },
    { stage: 6, phase: 'HERO_CONSTRUCTION', timelineWindow: '20.5-24s', startMs: 20500, section: 'home', cameraScale: 1.0, fallbackY: 0 },
    { stage: 7, phase: 'SECTION_CONSTRUCTION', timelineWindow: '24-28s', startMs: 24000, section: 'about-bio', cameraScale: 0.96, fallbackY: 940 },
    { stage: 8, phase: 'SECTION_CONSTRUCTION', timelineWindow: '28-32.5s', startMs: 28000, section: 'projects-1', cameraScale: 0.96, fallbackY: 1860 },
    { stage: 9, phase: 'SECTION_CONSTRUCTION', timelineWindow: '32.5-35.5s', startMs: 32500, section: 'achievements', cameraScale: 0.96, fallbackY: 2820 },
    { stage: 10, phase: 'SECTION_CONSTRUCTION', timelineWindow: '35.5-38s', startMs: 35500, section: 'contact', cameraScale: 0.96, fallbackY: 3520 },
    { stage: 11, phase: 'FINAL_REVEAL', timelineWindow: '38-41.5s', startMs: 38000, section: 'home', cameraScale: 1.0, fallbackY: 0 },
    { stage: 12, phase: 'COMPLETE', timelineWindow: 'complete', startMs: 41500, section: 'home', cameraScale: 1.0, fallbackY: 0 },
];

export const REQUIRED_DESIGNER_TITLES = [
    'UI Designer',
    'UX Designer',
    'Visual Designer',
    'Layout Designer',
    'Typography Designer',
    'Motion Designer',
    'Interaction Designer',
    'Graphic Designer',
    'Frontend Designer',
    'Creative Director',
];

export const POINTER_SVG_PATHS = {
    classic: 'M4.5 3.5L19.2 10.1L12.1 12.7L9.5 19.9L4.5 3.5Z',
    sculpted: 'M4.2 3.2L19.6 9.8L12.6 12.4L10.1 19.8L4.2 3.2Z',
    precision: 'M4.8 3.6L18.8 10.4L11.9 12.6L9.4 19.5L4.8 3.6Z',
    angled: 'M4.4 3.4L19.4 10.6L12.0 13.0L9.2 20.0L4.4 3.4Z',
    minimal: 'M4.6 3.6L19.0 10.0L12.2 12.5L9.8 19.6L4.6 3.6Z',
};

export const FRAME_PLACEHOLDER_SHAPES = {
    resizeHandle: {
        id: 'figma-resize-handle-shape',
        viewBox: '0 0 8 8',
        width: 7,
        height: 7,
        path: 'M1 1H7V7H1V1Z',
    },
    frameWireframeIcon: {
        id: 'figma-frame-wireframe-icon',
        viewBox: '0 0 16 16',
        width: 12,
        height: 12,
        path: 'M3 1.5V14.5M13 1.5V14.5M1.5 3H14.5M1.5 13H14.5',
    },
    imagePlaceholderIcon: {
        id: 'figma-image-placeholder-icon',
        viewBox: '0 0 24 24',
        width: 24,
        height: 24,
        path: 'M4 5C4 4.44772 4.44772 4 5 4H19C19.5523 4 20 4.44772 20 5V19C20 19.5523 19.5523 20 19 20H5C4.44772 20 4 19.5523 4 19V5ZM8.5 10C9.32843 10 10 9.32843 10 8.5C10 7.67157 9.32843 7 8.5 7C7.67157 7 7 7.67157 7 8.5C7 9.32843 7.67157 10 8.5 10ZM6 17L10.5 12.5L13.5 15.5L16 13L18 17H6Z',
    },
};

export const INTRO_ASSET_MANIFEST = [
    {
        id: 'hero-avatar',
        src: '/profile.jpg',
        type: 'image',
        strategy: 'precache-eager',
        width: 56,
        height: 56,
        aspectRatio: '1 / 1',
        timeoutMs: 2000,
    },
    {
        id: 'project-goc-banner',
        src: '/goc.png',
        type: 'image',
        strategy: 'precache-decode',
        width: 1280,
        height: 720,
        aspectRatio: '16 / 9',
        timeoutMs: 2500,
    },
];

export const collaboratorsData = [
    {
        id: 'ui-designer',
        name: 'UI Designer',
        role: 'UI Designer',
        specialty: 'Hero Layout & Surface Polish',
        variant: 'classic',
        defaultActionLabel: 'UI Designer · Hero layout',
        color: '#3B82F6', // Electric Blue
        stages: [
            { x: 42, y: 44, actionLabel: 'UI Designer · Initializing', action: 'move', active: true, target: null },
            { x: 28, y: 34, actionLabel: 'UI Designer · Inspecting Canvas', action: 'move', active: true, target: null },
            { x: 22, y: 26, actionLabel: 'UI Designer · Settle at Hero', action: 'move', active: true, target: null },
            { x: 22, y: 26, actionLabel: 'UI Designer · Hero layout', action: 'select', active: true, target: null },
            { x: 20, y: 22, actionLabel: 'UI Designer · Framing Hero Structure', action: 'drag', active: true, target: 'heroFrame' },
            { x: 24, y: 38, actionLabel: 'UI Designer · Balancing Headline Space', action: 'select', active: true, target: null },
            { x: 22, y: 64, actionLabel: 'UI Designer · Styling Button Surfaces', action: 'select', active: true, target: 'cta' },
            { x: 18, y: 28, actionLabel: 'UI Designer · Framing Journey Card', action: 'drag', active: true, target: null },
            { x: 20, y: 30, actionLabel: 'UI Designer · Assembling Project Card', action: 'drag', active: true, target: null },
            { x: 22, y: 26, actionLabel: 'UI Designer · Observing Milestones', action: 'move', active: false, target: null },
            { x: 46, y: 30, actionLabel: 'UI Designer · Styling Contact Inputs', action: 'select', active: true, target: null },
            { x: 18, y: 20, actionLabel: 'UI Designer · ✓ Done', action: 'done', active: true, target: null },
            { x: 12, y: 16, actionLabel: 'UI Designer · ✓ Done', action: 'fadeout', active: false, target: null },
        ],
    },
    {
        id: 'ux-designer',
        name: 'UX Designer',
        role: 'UX Designer',
        specialty: 'Content Positioning & User Journeys',
        variant: 'sculpted',
        defaultActionLabel: 'UX Designer · Content positioning',
        color: '#8B5CF6', // Violet
        stages: [
            { x: 58, y: 42, actionLabel: 'UX Designer · Initializing', action: 'move', active: true, target: null },
            { x: 74, y: 36, actionLabel: 'UX Designer · Inspecting Hierarchy', action: 'move', active: true, target: null },
            { x: 76, y: 26, actionLabel: 'UX Designer · Settle at Hero', action: 'move', active: true, target: null },
            { x: 76, y: 26, actionLabel: 'UX Designer · Content positioning', action: 'select', active: true, target: null },
            { x: 72, y: 24, actionLabel: 'UX Designer · Positioning Bio Header', action: 'move', active: false, target: null },
            { x: 78, y: 50, actionLabel: 'UX Designer · Structuring Subtitle', action: 'type', active: true, target: 'subheadline' },
            { x: 80, y: 66, actionLabel: 'UX Designer · Verifying CTA Flow', action: 'select', active: true, target: null },
            { x: 62, y: 28, actionLabel: 'UX Designer · Ordering Education Flow', action: 'drag', active: true, target: null },
            { x: 76, y: 28, actionLabel: 'UX Designer · Reviewing Case Studies', action: 'move', active: false, target: null },
            { x: 64, y: 68, actionLabel: 'UX Designer · Structuring Initiatives', action: 'drag', active: true, target: null },
            { x: 76, y: 36, actionLabel: 'UX Designer · Validating Form UX', action: 'select', active: true, target: null },
            { x: 80, y: 22, actionLabel: 'UX Designer · ✓ Done', action: 'done', active: true, target: null },
            { x: 84, y: 16, actionLabel: 'UX Designer · ✓ Done', action: 'fadeout', active: false, target: null },
        ],
    },
    {
        id: 'visual-designer',
        name: 'Visual Designer',
        role: 'Visual Designer',
        specialty: 'Image Positioning & Atmosphere',
        variant: 'precision',
        defaultActionLabel: 'Visual Designer · Image positioning',
        color: '#14B8A6', // Teal
        stages: [
            { x: 38, y: 52, actionLabel: 'Visual Designer · Initializing', action: 'move', active: true, target: null },
            { x: 22, y: 58, actionLabel: 'Visual Designer · Calibrating Contrast', action: 'move', active: true, target: null },
            { x: 26, y: 44, actionLabel: 'Visual Designer · Settle at Hero', action: 'move', active: true, target: null },
            { x: 26, y: 44, actionLabel: 'Visual Designer · Image positioning', action: 'select', active: true, target: null },
            { x: 32, y: 22, actionLabel: 'Visual Designer · Positioning Avatar Frame', action: 'resize', active: true, target: 'profile' },
            { x: 18, y: 48, actionLabel: 'Visual Designer · Applying Accent Glow', action: 'drag', active: true, target: 'headline' },
            { x: 16, y: 62, actionLabel: 'Visual Designer · Tuning Glass Contrast', action: 'select', active: true, target: null },
            { x: 14, y: 58, actionLabel: 'Visual Designer · Balancing Glass Contrast', action: 'select', active: true, target: null },
            { x: 16, y: 42, actionLabel: 'Visual Designer · Balancing Card Shadows', action: 'drag', active: true, target: null },
            { x: 14, y: 48, actionLabel: 'Visual Designer · Applying Medal Amber', action: 'select', active: true, target: null },
            { x: 16, y: 54, actionLabel: 'Visual Designer · Refining Specular Highlights', action: 'click', active: true, target: null },
            { x: 16, y: 48, actionLabel: 'Visual Designer · ✓ Done', action: 'done', active: true, target: null },
            { x: 10, y: 48, actionLabel: 'Visual Designer · ✓ Done', action: 'fadeout', active: false, target: null },
        ],
    },
    {
        id: 'layout-designer',
        name: 'Layout Designer',
        role: 'Layout Designer',
        specialty: 'Spacing & Alignment Systems',
        variant: 'angled',
        defaultActionLabel: 'Layout Designer · Spacing & alignment',
        color: '#6366F1', // Indigo
        stages: [
            { x: 62, y: 48, actionLabel: 'Layout Designer · Initializing', action: 'move', active: true, target: null },
            { x: 44, y: 18, actionLabel: 'Layout Designer · Aligning Canvas Grid', action: 'move', active: true, target: null },
            { x: 30, y: 16, actionLabel: 'Layout Designer · Settle at Hero', action: 'move', active: true, target: null },
            { x: 30, y: 16, actionLabel: 'Layout Designer · Spacing & alignment', action: 'select', active: true, target: null },
            { x: 22, y: 14, actionLabel: 'Layout Designer · Resizing Hero Container', action: 'resize', active: true, target: 'heroFrame' },
            { x: 24, y: 40, actionLabel: 'Layout Designer · Aligning Headline Margins', action: 'drag', active: true, target: 'headline' },
            { x: 18, y: 78, actionLabel: 'Layout Designer · Resizing 3-Column Stats', action: 'resize', active: true, target: 'stats' },
            { x: 24, y: 20, actionLabel: 'Layout Designer · Resizing Bento Grid', action: 'resize', active: true, target: null },
            { x: 22, y: 20, actionLabel: 'Layout Designer · Resizing Project Layout', action: 'resize', active: true, target: null },
            { x: 22, y: 18, actionLabel: 'Layout Designer · Framing Milestone Grid', action: 'resize', active: true, target: null },
            { x: 24, y: 20, actionLabel: 'Layout Designer · Aligning Contact Columns', action: 'resize', active: true, target: null },
            { x: 24, y: 14, actionLabel: 'Layout Designer · ✓ Done', action: 'done', active: true, target: null },
            { x: 18, y: 10, actionLabel: 'Layout Designer · ✓ Done', action: 'fadeout', active: false, target: null },
        ],
    },
    {
        id: 'typography-designer',
        name: 'Typography Designer',
        role: 'Typography Designer',
        specialty: 'Heading Refinement & Type Scale',
        variant: 'minimal',
        defaultActionLabel: 'Typography Designer · Heading refinement',
        color: '#F59E0B', // Amber
        stages: [
            { x: 44, y: 56, actionLabel: 'Typography Designer · Initializing', action: 'move', active: true, target: null },
            { x: 62, y: 42, actionLabel: 'Typography Designer · Checking Type Scale', action: 'move', active: true, target: null },
            { x: 66, y: 34, actionLabel: 'Typography Designer · Settle at Hero', action: 'move', active: true, target: null },
            { x: 66, y: 34, actionLabel: 'Typography Designer · Heading refinement', action: 'select', active: true, target: null },
            { x: 64, y: 22, actionLabel: 'Typography Designer · Setting Profile Title', action: 'type', active: false, target: null },
            { x: 74, y: 36, actionLabel: 'Typography Designer · Typing Hero Headline', action: 'type', active: true, target: 'headline' },
            { x: 76, y: 40, actionLabel: 'Typography Designer · Refining H1 Kerning', action: 'select', active: true, target: null },
            { x: 48, y: 36, actionLabel: 'Typography Designer · Setting Journey Copy', action: 'type', active: true, target: null },
            { x: 56, y: 40, actionLabel: 'Typography Designer · Setting Project Titles', action: 'type', active: true, target: null },
            { x: 56, y: 30, actionLabel: 'Typography Designer · Setting Milestone Title', action: 'type', active: true, target: null },
            { x: 54, y: 22, actionLabel: 'Typography Designer · Setting Contact Heading', action: 'type', active: true, target: null },
            { x: 72, y: 30, actionLabel: 'Typography Designer · ✓ Done', action: 'done', active: true, target: null },
            { x: 80, y: 28, actionLabel: 'Typography Designer · ✓ Done', action: 'fadeout', active: false, target: null },
        ],
    },
    {
        id: 'motion-designer',
        name: 'Motion Designer',
        role: 'Motion Designer',
        specialty: 'Motion Refinement & Easing Curves',
        variant: 'sculpted',
        defaultActionLabel: 'Motion Designer · Motion refinement',
        color: '#A855F7', // Orchid Purple
        stages: [
            { x: 56, y: 56, actionLabel: 'Motion Designer · Initializing', action: 'move', active: true, target: null },
            { x: 80, y: 52, actionLabel: 'Motion Designer · Syncing Easing Curves', action: 'move', active: true, target: null },
            { x: 80, y: 46, actionLabel: 'Motion Designer · Settle at Hero', action: 'move', active: true, target: null },
            { x: 80, y: 46, actionLabel: 'Motion Designer · Motion refinement', action: 'select', active: true, target: null },
            { x: 82, y: 22, actionLabel: 'Motion Designer · Staging Avatar Spin', action: 'click', active: true, target: null },
            { x: 82, y: 38, actionLabel: 'Motion Designer · Pacing Staggered Reveal', action: 'move', active: false, target: null },
            { x: 80, y: 56, actionLabel: 'Motion Designer · Tuning Button Spring', action: 'click', active: true, target: null },
            { x: 78, y: 44, actionLabel: 'Motion Designer · Pacing Section Reveal', action: 'move', active: false, target: null },
            { x: 78, y: 48, actionLabel: 'Motion Designer · Tuning Hover Elevation', action: 'click', active: true, target: null },
            { x: 76, y: 36, actionLabel: 'Motion Designer · Smoothing Card Entrance', action: 'click', active: true, target: null },
            { x: 76, y: 46, actionLabel: 'Motion Designer · Calibrating Micro-Motion', action: 'click', active: true, target: null },
            { x: 80, y: 40, actionLabel: 'Motion Designer · ✓ Done', action: 'done', active: true, target: null },
            { x: 86, y: 42, actionLabel: 'Motion Designer · ✓ Done', action: 'fadeout', active: false, target: null },
        ],
    },
    {
        id: 'interaction-designer',
        name: 'Interaction Designer',
        role: 'Interaction Designer',
        specialty: 'Button Placement & Controls',
        variant: 'precision',
        defaultActionLabel: 'Interaction Designer · Button placement',
        color: '#06B6D4', // Cyan
        stages: [
            { x: 36, y: 62, actionLabel: 'Interaction Designer · Initializing', action: 'move', active: true, target: null },
            { x: 30, y: 72, actionLabel: 'Interaction Designer · Testing Input States', action: 'move', active: true, target: null },
            { x: 34, y: 64, actionLabel: 'Interaction Designer · Settle at Hero', action: 'move', active: true, target: null },
            { x: 34, y: 64, actionLabel: 'Interaction Designer · Button placement', action: 'select', active: true, target: null },
            { x: 26, y: 22, actionLabel: 'Interaction Designer · Wiring Status Indicator', action: 'click', active: false, target: null },
            { x: 28, y: 44, actionLabel: 'Interaction Designer · Preparing CTA Row', action: 'move', active: false, target: null },
            { x: 36, y: 70, actionLabel: 'Interaction Designer · Snapping CTA Buttons', action: 'drag', active: true, target: 'cta' },
            { x: 34, y: 74, actionLabel: 'Interaction Designer · Wiring Skill Tabs', action: 'click', active: true, target: null },
            { x: 36, y: 72, actionLabel: 'Interaction Designer · Binding Live Site Links', action: 'click', active: true, target: null },
            { x: 36, y: 76, actionLabel: 'Interaction Designer · Checking Status Badges', action: 'move', active: false, target: null },
            { x: 58, y: 74, actionLabel: 'Interaction Designer · Wiring Send Message CTA', action: 'drag', active: true, target: null },
            { x: 28, y: 68, actionLabel: 'Interaction Designer · ✓ Done', action: 'done', active: true, target: null },
            { x: 14, y: 76, actionLabel: 'Interaction Designer · ✓ Done', action: 'fadeout', active: false, target: null },
        ],
    },
    {
        id: 'graphic-designer',
        name: 'Graphic Designer',
        role: 'Graphic Designer',
        specialty: 'Visual Details & Media Framing',
        variant: 'classic',
        defaultActionLabel: 'Graphic Designer · Visual details',
        color: '#EC4899', // Rose
        stages: [
            { x: 64, y: 62, actionLabel: 'Graphic Designer · Initializing', action: 'move', active: true, target: null },
            { x: 24, y: 46, actionLabel: 'Graphic Designer · Preloading Visual Assets', action: 'move', active: true, target: null },
            { x: 42, y: 22, actionLabel: 'Graphic Designer · Settle at Hero', action: 'move', active: true, target: null },
            { x: 42, y: 22, actionLabel: 'Graphic Designer · Visual details', action: 'select', active: true, target: null },
            { x: 36, y: 18, actionLabel: 'Graphic Designer · Cropping Profile Avatar', action: 'resize', active: true, target: 'profile' },
            { x: 20, y: 34, actionLabel: 'Graphic Designer · Framing Avatar Ring', action: 'click', active: false, target: null },
            { x: 26, y: 64, actionLabel: 'Graphic Designer · Aligning Icon Details', action: 'click', active: true, target: null },
            { x: 26, y: 48, actionLabel: 'Graphic Designer · Placing Section Icons', action: 'click', active: false, target: null },
            { x: 26, y: 44, actionLabel: 'Graphic Designer · Placing /goc.png Preview', action: 'drag', active: true, target: null },
            { x: 28, y: 48, actionLabel: 'Graphic Designer · Framing Trophy Emblem', action: 'drag', active: true, target: null },
            { x: 24, y: 64, actionLabel: 'Graphic Designer · Aligning Channel Icons', action: 'click', active: true, target: null },
            { x: 22, y: 36, actionLabel: 'Graphic Designer · ✓ Done', action: 'done', active: true, target: null },
            { x: 12, y: 34, actionLabel: 'Graphic Designer · ✓ Done', action: 'fadeout', active: false, target: null },
        ],
    },
    {
        id: 'frontend-designer',
        name: 'Frontend Designer',
        role: 'Frontend Designer',
        specialty: 'Component Refinement & Stat Metrics',
        variant: 'angled',
        defaultActionLabel: 'Frontend Designer · Component refinement',
        color: '#10B981', // Emerald
        stages: [
            { x: 36, y: 70, actionLabel: 'Frontend Designer · Initializing', action: 'move', active: true, target: null },
            { x: 68, y: 76, actionLabel: 'Frontend Designer · Inspecting DOM Tree', action: 'move', active: true, target: null },
            { x: 68, y: 66, actionLabel: 'Frontend Designer · Settle at Hero', action: 'move', active: true, target: null },
            { x: 68, y: 66, actionLabel: 'Frontend Designer · Component refinement', action: 'select', active: true, target: null },
            { x: 62, y: 22, actionLabel: 'Frontend Designer · Mounting Profile Component', action: 'drag', active: false, target: null },
            { x: 74, y: 44, actionLabel: 'Frontend Designer · Mounting Text Elements', action: 'drag', active: false, target: null },
            { x: 76, y: 78, actionLabel: 'Frontend Designer · Building Stat Counters', action: 'drag', active: true, target: 'stats' },
            { x: 64, y: 66, actionLabel: 'Frontend Designer · Placing Skill Tag Pills', action: 'drag', active: true, target: null },
            { x: 62, y: 68, actionLabel: 'Frontend Designer · Adding Python & SQL Tags', action: 'drag', active: true, target: null },
            { x: 62, y: 78, actionLabel: 'Frontend Designer · Building Initiative Cards', action: 'drag', active: true, target: null },
            { x: 68, y: 64, actionLabel: 'Frontend Designer · Assembling Form Fields', action: 'drag', active: true, target: null },
            { x: 72, y: 72, actionLabel: 'Frontend Designer · ✓ Done', action: 'done', active: true, target: null },
            { x: 80, y: 78, actionLabel: 'Frontend Designer · ✓ Done', action: 'fadeout', active: false, target: null },
        ],
    },
    {
        id: 'creative-director',
        name: 'Creative Director',
        role: 'Creative Director',
        specialty: 'Final Review & Direction',
        variant: 'minimal',
        defaultActionLabel: 'Creative Director · Final review',
        color: '#60A5FA', // Sky Blue
        stages: [
            { x: 50, y: 38, actionLabel: 'Creative Director · Initializing', action: 'move', active: true, target: null },
            { x: 50, y: 16, actionLabel: 'Creative Director · Canvas Overview', action: 'move', active: true, target: null },
            { x: 50, y: 12, actionLabel: 'Creative Director · Settle at Hero', action: 'move', active: true, target: null },
            { x: 50, y: 12, actionLabel: 'Creative Director · Final review', action: 'select', active: true, target: null },
            { x: 50, y: 12, actionLabel: 'Creative Director · Approving Avatar Balance', action: 'move', active: false, target: null },
            { x: 50, y: 14, actionLabel: 'Creative Director · Reviewing Headline Tone', action: 'click', active: true, target: null },
            { x: 50, y: 14, actionLabel: 'Creative Director · Approving Hero Lockup', action: 'click', active: true, target: null },
            { x: 50, y: 16, actionLabel: 'Creative Director · Reviewing About Narrative', action: 'move', active: false, target: null },
            { x: 50, y: 16, actionLabel: 'Creative Director · Approving Case Studies', action: 'click', active: true, target: null },
            { x: 50, y: 16, actionLabel: 'Creative Director · Reviewing Achievements', action: 'move', active: false, target: null },
            { x: 50, y: 16, actionLabel: 'Creative Director · Verifying Channels', action: 'move', active: false, target: null },
            { x: 50, y: 14, actionLabel: 'Creative Director · Approved ✓ Done', action: 'done', active: true, target: null },
            { x: 50, y: 10, actionLabel: 'Creative Director · Approved ✓ Done', action: 'fadeout', active: false, target: null },
        ],
    },
];

export const SECTION_CONSTRUCTION_FRAMES = {
    7: [
        {
            id: 'frame-about-bio',
            label: 'Layout Designer · Narrative Card',
            color: '#6366F1',
            left: '10%',
            top: '24%',
            width: '46%',
            height: '58%',
            isResizing: true,
        },
        {
            id: 'frame-about-timeline',
            label: 'UX Designer · Academic Timeline',
            color: '#8B5CF6',
            left: '58%',
            top: '24%',
            width: '32%',
            height: '58%',
            isResizing: false,
        },
    ],
    8: [
        {
            id: 'frame-project-1',
            label: 'Graphic Designer · Grace of Christ Church Platform',
            color: '#EC4899',
            left: '10%',
            top: '24%',
            width: '80%',
            height: '60%',
            isResizing: true,
        },
    ],
    9: [
        {
            id: 'frame-milestone',
            label: 'Visual Designer · Inter-University Archery Championship',
            color: '#14B8A6',
            left: '10%',
            top: '18%',
            width: '80%',
            height: '44%',
            isResizing: false,
        },
        {
            id: 'frame-now',
            label: 'Frontend Designer · Current Initiatives',
            color: '#10B981',
            left: '10%',
            top: '66%',
            width: '80%',
            height: '26%',
            isResizing: false,
        },
    ],
    10: [
        {
            id: 'frame-contact-cards',
            label: 'Visual Designer · Direct Contact Channels',
            color: '#14B8A6',
            left: '10%',
            top: '26%',
            width: '31%',
            height: '60%',
            isResizing: false,
        },
        {
            id: 'frame-contact-form',
            label: 'Frontend Designer · Interactive Contact Form',
            color: '#10B981',
            left: '43%',
            top: '26%',
            width: '47%',
            height: '60%',
            isResizing: true,
        },
    ],
};

/**
 * Pure function returning the visual build progress of the portfolio for a given stage (0..12).
 */
export function getStageBuildState(stageIndex) {
    const clampedStage = Math.max(0, Math.min(stageIndex, FINAL_INTRO_STAGE));
    const timing = INTRO_STAGE_TIMINGS[clampedStage] || INTRO_STAGE_TIMINGS[FINAL_INTRO_STAGE];
    const isComplete = clampedStage >= FINAL_INTRO_STAGE;
    const isTransforming = clampedStage >= 11;

    return {
        stageIndex: clampedStage,
        phase: timing.phase,
        timelineWindow: timing.timelineWindow,
        activeSection: timing.section,
        cameraScale: timing.cameraScale,
        fallbackCameraY: timing.fallbackY,

        // Deep black backdrop is active during stage 0 ('INTRO'),
        // then dissolves smoothly in stage 1 ('WEBSITE_REVEAL') to reveal the real portfolio
        blackScreenOpacity: clampedStage === 0 ? 1 : 0,
        showBlackScreen: clampedStage <= 1,

        // Temporarily block ordinary page scrolling & pointer interaction during intro stages 0..11
        interactionLocked: !isComplete,

        // Show 10 designer cursors, trails, and minimal selection overlays during stages 0..11
        showCollaborationOverlay: !isComplete,
        overlayOpacity: clampedStage < 11 ? 1 : 0,

        // Hero wireframe placeholder frame (visible in stages 1..3 before elements are placed)
        showHeroFrame: clampedStage >= 1 && clampedStage < 11,

        // Progressive Hero construction (Stages 4–6 = 14–24s detailed Hero construction):
        // Stage 4: Profile Avatar & Status Badge (14.0s - 17.0s)
        showProfile: clampedStage >= 4,
        profileDragging: clampedStage === 4,

        // Stage 5: Progressive Headline Typing & Subtitle (17.0s - 20.5s)
        showHeadline: clampedStage >= 5,
        headlineWordsVisibleCount: clampedStage < 5 ? 0 : 5,
        headlineDragging: clampedStage === 5,
        showSubheadline: clampedStage >= 5,
        subheadlineDragging: clampedStage === 5,

        // Stage 6: CTA Buttons, Colors, and Stat Counters (20.5s - 24.0s)
        showCta: clampedStage >= 6,
        ctaDragging: clampedStage === 6,
        colorsApplied: clampedStage >= 6,
        showStats: clampedStage >= 6,
        statsDragging: clampedStage === 6,
        showScrollIndicator: clampedStage >= 6,

        // Section progression flags (Stages 7–10 = 24–38s remaining real sections):
        showAboutBio: clampedStage >= 7,
        showAboutSkills: clampedStage >= 7,
        showProjects1: clampedStage >= 8,
        showProjects2: clampedStage >= 8,
        showMilestones: clampedStage >= 9,
        showContact: clampedStage >= 10,

        canvasScale: clampedStage === 0 ? 0.94 : clampedStage === 1 ? 0.96 : clampedStage < 11 ? 0.985 : 1,
        isTransforming,
        isComplete,
    };
}

/**
 * Pure function returning a collaborator cursor's position, action label, prominence, and visual state at `stageIndex`.
 */
export function getCursorStageState(collaborator, stageIndex) {
    const clampedIdx = Math.max(0, Math.min(stageIndex, collaborator.stages.length - 1));
    const step = collaborator.stages[clampedIdx];
    const isFadingOut = stageIndex >= 11;
    const isActive = step.active !== false;

    return {
        x: step.x,
        y: step.y,
        actionLabel: step.actionLabel || collaborator.defaultActionLabel,
        action: step.action,
        active: isActive,
        isDone: step.action === 'done' || (step.actionLabel && step.actionLabel.includes('✓ Done')),
        isResizing: step.action === 'resize',
        target: step.target || null,
        // Flip label to the left of the pointer when near the right viewport edge to prevent clipping/collisions
        labelSide: step.x >= 68 ? 'left' : 'right',
        showExpandedAction: stageIndex >= 0 && !isFadingOut,
        // Active cursors are prominent (1.0); idle cursors subtly dim (0.5); all fade to 0 in stage 11 ('FINAL_REVEAL')
        opacity: isFadingOut ? 0 : isActive ? 1 : 0.5,
        scale: isFadingOut ? 0.88 : isActive ? 1 : 0.93,
    };
}

export function getEffectiveViewportWidth() {
    if (typeof window === 'undefined') return 1440;
    const docClientWidth =
        typeof document !== 'undefined' && document.documentElement
            ? document.documentElement.clientWidth || 0
            : 0;
    const winInnerWidth = window.innerWidth || 0;
    return Math.max(docClientWidth, winInnerWidth);
}

export function getCollaborationConfig(
    effectiveViewportWidth,
    prefersReducedMotion = false,
    hardwareConcurrency = 8
) {
    if (prefersReducedMotion) {
        return {
            mode: 'reduced-motion',
            enabled: false,
            sub1024BlurFadeIn: false,
            activeCollaborators: [],
            showMouseCursors: false,
            compactLabels: false,
            particleCap: 0,
            lowPowerMode: true,
        };
    }

    if (effectiveViewportWidth < DESKTOP_MIN_WIDTH) {
        return {
            mode: effectiveViewportWidth < 640 ? 'mobile' : 'tablet',
            enabled: false,
            sub1024BlurFadeIn: true,
            activeCollaborators: [],
            showMouseCursors: false,
            compactLabels: false,
            particleCap: 0,
            lowPowerMode: false,
        };
    }

    const isLowPower = typeof hardwareConcurrency === 'number' && hardwareConcurrency <= 4;

    return {
        mode: 'desktop',
        enabled: true,
        sub1024BlurFadeIn: false,
        activeCollaborators: collaboratorsData,
        showMouseCursors: true,
        compactLabels: false,
        particleCap: isLowPower ? LOW_POWER_PARTICLE_CAP : MAX_PARTICLE_CAP,
        lowPowerMode: isLowPower,
    };
}
