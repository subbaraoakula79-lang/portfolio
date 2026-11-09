/**
 * Portfolio Collaborative Construction Intro — Authoritative Data & Timeline Specification
 * - 10 Designer Cursors (Titles Only — No Personal Names)
 * - 32.5-Second Total Duration (Within the 30–35s Specification Window)
 * - Effective Layout Viewport Width Gating (>= 1024 CSS px, Touchscreen/Desktop-Site Compatible)
 * - Dynamic Teams of 2–4, Active vs. Subtly Dimmed Idle States, Collision-Free Curved Paths
 */

export const DESKTOP_MIN_WIDTH = 1024;
export const FINAL_INTRO_STAGE = 12;
export const REVEAL_INTRO_STAGE = 11;
export const TOTAL_INTRO_DURATION_MS = 32500;
export const MAX_INTRO_WATCHDOG_MS = 36500;
export const MAX_PARTICLE_CAP = 24;
export const LOW_POWER_PARTICLE_CAP = 8;

/**
 * 30–35s (32.5s) 6-Phase Narrative Timeline:
 * - 0–3s   (Stage 0):        Black/violet atmosphere & 10 cursors appear clustered.
 * - 3–7s   (Stage 1):        Cursors spread along curved paths and form dynamic teams.
 * - 7–14s  (Stages 2–3):     Detailed Hero construction (avatar, badge, H1 typing, subtitle, CTA snap, stats, gradient).
 * - 14–24s (Stages 4–7):     Remaining real sections built collaboratively (#about, #projects, #achievements + NowSection, #contact).
 * - 24–29s (Stages 8–9):     Micro-adjustments, alignment, spacing, shadow refinement, and polish ("✓ Done").
 * - 29–35s (Stages 10–11):   Completed overview and cinematic transition to actual website (finishing at 32.5s, Stage 12).
 */
export const INTRO_STAGE_TIMINGS = [
    { stage: 0, phase: 'atmosphere', timelineWindow: '0-3s', startMs: 0, section: 'home', cameraScale: 0.93, fallbackY: 0 },
    { stage: 1, phase: 'teams', timelineWindow: '3-7s', startMs: 3000, section: 'home', cameraScale: 0.955, fallbackY: 0 },
    { stage: 2, phase: 'hero-structure', timelineWindow: '7-14s', startMs: 7000, section: 'home', cameraScale: 0.97, fallbackY: 0 },
    { stage: 3, phase: 'hero-refinement', timelineWindow: '7-14s', startMs: 10500, section: 'home', cameraScale: 0.98, fallbackY: 0 },
    { stage: 4, phase: 'section-about', timelineWindow: '14-24s', startMs: 14000, section: 'about-bio', cameraScale: 0.955, fallbackY: 940 },
    { stage: 5, phase: 'section-projects', timelineWindow: '14-24s', startMs: 16600, section: 'projects-1', cameraScale: 0.95, fallbackY: 1860 },
    { stage: 6, phase: 'section-milestones', timelineWindow: '14-24s', startMs: 19400, section: 'achievements', cameraScale: 0.95, fallbackY: 2820 },
    { stage: 7, phase: 'section-contact', timelineWindow: '14-24s', startMs: 21800, section: 'contact', cameraScale: 0.95, fallbackY: 3520 },
    { stage: 8, phase: 'polish-sections', timelineWindow: '24-29s', startMs: 24000, section: 'projects-2', cameraScale: 0.96, fallbackY: 2240 },
    { stage: 9, phase: 'polish-hero', timelineWindow: '24-29s', startMs: 26600, section: 'home', cameraScale: 0.975, fallbackY: 0 },
    { stage: 10, phase: 'overview', timelineWindow: '29-35s', startMs: 29000, section: 'home', cameraScale: 0.95, fallbackY: 0 },
    { stage: 11, phase: 'reveal', timelineWindow: '29-35s', startMs: 31000, section: 'home', cameraScale: 1, fallbackY: 0 },
    { stage: 12, phase: 'complete', timelineWindow: 'complete', startMs: 32500, section: 'home', cameraScale: 1, fallbackY: 0 },
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

/**
 * Pre-cached SVG Pointer Shape Variants & Placeholder Frame/Icon Shapes.
 * Pre-rendered in a zero-dimension <svg><defs> sprite sheet during Stage 0 ('atmosphere')
 * on the black screen so zero layout shift occurs when elements reveal.
 */
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
    {
        id: 'cursor-pointer-defs',
        src: '#figma-animation-asset-defs',
        type: 'svg-sprite',
        strategy: 'precache-dom',
        width: 20,
        height: 20,
        aspectRatio: '1 / 1',
    },
    {
        id: 'frame-placeholder-shapes',
        src: '#figma-frame-wireframe-icon',
        type: 'svg-placeholder',
        strategy: 'precache-dom',
        width: 12,
        height: 12,
        aspectRatio: '1 / 1',
    },
];

/**
 * Ten Custom Collaborator Cursors (Titles Only — No Personal Names).
 * Coordinates in every stage are arranged with >= 6% vertical or horizontal separation
 * to prevent label collisions and avoid covering central copy.
 */
export const collaboratorsData = [
    {
        id: 'ui-designer',
        name: 'UI Designer',
        role: 'UI Designer',
        specialty: 'Interface Components & Surface Polish',
        variant: 'classic',
        defaultActionLabel: 'UI Designer · Building Hero',
        color: '#3B82F6', // Electric Blue
        stages: [
            { x: 40, y: 38, actionLabel: 'UI Designer · Ready', action: 'gather', active: true, target: null },
            { x: 18, y: 20, actionLabel: 'UI Designer · Forming Hero Team', action: 'move', active: true, target: null },
            { x: 18, y: 22, actionLabel: 'UI Designer · Building Hero Badge', action: 'drag', active: true, target: null },
            { x: 16, y: 64, actionLabel: 'UI Designer · Styling Button Surfaces', action: 'select', active: true, target: null },
            { x: 16, y: 28, actionLabel: 'UI Designer · Framing Journey Card', action: 'drag', active: true, target: null },
            { x: 16, y: 30, actionLabel: 'UI Designer · Assembling Project Card', action: 'drag', active: true, target: null },
            { x: 18, y: 26, actionLabel: 'UI Designer · Observing Milestones', action: 'move', active: false, target: null },
            { x: 48, y: 30, actionLabel: 'UI Designer · Styling Contact Inputs', action: 'select', active: true, target: null },
            { x: 20, y: 28, actionLabel: 'UI Designer · Refining Card Borders', action: 'select', active: true, target: null },
            { x: 22, y: 24, actionLabel: 'UI Designer · Surface Polish ✓ Done', action: 'done', active: true, target: null },
            { x: 16, y: 20, actionLabel: 'UI Designer · ✓ Done', action: 'done', active: false, target: null },
            { x: 12, y: 16, actionLabel: 'UI Designer · ✓ Done', action: 'fadeout', active: false, target: null },
        ],
    },
    {
        id: 'ux-designer',
        name: 'UX Designer',
        role: 'UX Designer',
        specialty: 'Information Architecture & User Flows',
        variant: 'sculpted',
        defaultActionLabel: 'UX Designer · Mapping Flow',
        color: '#8B5CF6', // Violet
        stages: [
            { x: 58, y: 38, actionLabel: 'UX Designer · Ready', action: 'gather', active: true, target: null },
            { x: 78, y: 20, actionLabel: 'UX Designer · Mapping Hierarchy', action: 'move', active: true, target: null },
            { x: 78, y: 50, actionLabel: 'UX Designer · Structuring Subtitle', action: 'type', active: true, target: 'subheadline' },
            { x: 80, y: 66, actionLabel: 'UX Designer · Verifying CTA Flow', action: 'select', active: false, target: null },
            { x: 62, y: 28, actionLabel: 'UX Designer · Ordering Education Flow', action: 'drag', active: true, target: null },
            { x: 76, y: 28, actionLabel: 'UX Designer · Reviewing Case Studies', action: 'move', active: false, target: null },
            { x: 64, y: 68, actionLabel: 'UX Designer · Structuring Initiatives', action: 'drag', active: true, target: null },
            { x: 76, y: 36, actionLabel: 'UX Designer · Validating Form UX', action: 'select', active: true, target: null },
            { x: 74, y: 30, actionLabel: 'UX Designer · Checking Navigation Flow', action: 'move', active: false, target: null },
            { x: 76, y: 24, actionLabel: 'UX Designer · Flow Verified ✓ Done', action: 'done', active: true, target: null },
            { x: 80, y: 20, actionLabel: 'UX Designer · ✓ Done', action: 'done', active: false, target: null },
            { x: 84, y: 16, actionLabel: 'UX Designer · ✓ Done', action: 'fadeout', active: false, target: null },
        ],
    },
    {
        id: 'visual-designer',
        name: 'Visual Designer',
        role: 'Visual Designer',
        specialty: 'Color Atmosphere, Contrast & Gradients',
        variant: 'precision',
        defaultActionLabel: 'Visual Designer · Tuning Palette',
        color: '#14B8A6', // Teal
        stages: [
            { x: 36, y: 45, actionLabel: 'Visual Designer · Ready', action: 'gather', active: true, target: null },
            { x: 16, y: 52, actionLabel: 'Visual Designer · Calibrating Contrast', action: 'move', active: true, target: null },
            { x: 16, y: 40, actionLabel: 'Visual Designer · Sampling Violet Glow', action: 'click', active: false, target: null },
            { x: 16, y: 48, actionLabel: 'Visual Designer · Applying Accent Gradient', action: 'drag', active: true, target: 'headline' },
            { x: 14, y: 62, actionLabel: 'Visual Designer · Tuning Glass Contrast', action: 'select', active: true, target: null },
            { x: 14, y: 58, actionLabel: 'Visual Designer · Balancing Card Shadows', action: 'select', active: true, target: null },
            { x: 16, y: 42, actionLabel: 'Visual Designer · Applying Medal Amber', action: 'drag', active: true, target: null },
            { x: 14, y: 48, actionLabel: 'Visual Designer · Styling Social Accents', action: 'select', active: true, target: null },
            { x: 16, y: 54, actionLabel: 'Visual Designer · Refining Specular Highlights', action: 'click', active: true, target: null },
            { x: 18, y: 48, actionLabel: 'Visual Designer · Palette ✓ Done', action: 'done', active: true, target: null },
            { x: 14, y: 48, actionLabel: 'Visual Designer · ✓ Done', action: 'done', active: false, target: null },
            { x: 10, y: 48, actionLabel: 'Visual Designer · ✓ Done', action: 'fadeout', active: false, target: null },
        ],
    },
    {
        id: 'layout-designer',
        name: 'Layout Designer',
        role: 'Layout Designer',
        specialty: 'Grid Systems, Spacing & Alignment',
        variant: 'angled',
        defaultActionLabel: 'Layout Designer · Aligning Grid',
        color: '#6366F1', // Indigo
        stages: [
            { x: 60, y: 45, actionLabel: 'Layout Designer · Ready', action: 'gather', active: true, target: null },
            { x: 24, y: 12, actionLabel: 'Layout Designer · Setting Hero Grid', action: 'move', active: true, target: null },
            { x: 16, y: 12, actionLabel: 'Layout Designer · Resizing Hero Frame', action: 'resize', active: true, target: 'heroFrame' },
            { x: 16, y: 80, actionLabel: 'Layout Designer · Resizing 3-Column Stats', action: 'resize', active: true, target: 'stats' },
            { x: 24, y: 20, actionLabel: 'Layout Designer · Resizing 12-Col Bento Grid', action: 'resize', active: true, target: null },
            { x: 22, y: 20, actionLabel: 'Layout Designer · Resizing Project Layout', action: 'resize', active: true, target: null },
            { x: 22, y: 18, actionLabel: 'Layout Designer · Framing Milestone Grid', action: 'resize', active: true, target: null },
            { x: 18, y: 20, actionLabel: 'Layout Designer · Aligning Contact Columns', action: 'resize', active: true, target: null },
            { x: 24, y: 20, actionLabel: 'Layout Designer · Checking Section Rhythm', action: 'select', active: true, target: null },
            { x: 26, y: 16, actionLabel: 'Layout Designer · Grid Locked ✓ Done', action: 'done', active: true, target: null },
            { x: 22, y: 12, actionLabel: 'Layout Designer · ✓ Done', action: 'done', active: false, target: null },
            { x: 18, y: 10, actionLabel: 'Layout Designer · ✓ Done', action: 'fadeout', active: false, target: null },
        ],
    },
    {
        id: 'typography-designer',
        name: 'Typography Designer',
        role: 'Typography Designer',
        specialty: 'Type Scale, Kerning & Editorial Copy',
        variant: 'minimal',
        defaultActionLabel: 'Typography Designer · Setting Type',
        color: '#F59E0B', // Amber
        stages: [
            { x: 40, y: 52, actionLabel: 'Typography Designer · Ready', action: 'gather', active: true, target: null },
            { x: 76, y: 32, actionLabel: 'Typography Designer · Preparing Type Scale', action: 'move', active: true, target: null },
            { x: 78, y: 34, actionLabel: 'Typography Designer · Typing Hero Headline', action: 'type', active: true, target: 'headline' },
            { x: 78, y: 38, actionLabel: 'Typography Designer · Refining H1 Kerning', action: 'select', active: true, target: null },
            { x: 46, y: 36, actionLabel: 'Typography Designer · Revealing Journey Copy', action: 'type', active: true, target: null },
            { x: 56, y: 40, actionLabel: 'Typography Designer · Setting Case Study Copy', action: 'type', active: true, target: null },
            { x: 56, y: 30, actionLabel: 'Typography Designer · Setting Milestone Title', action: 'type', active: true, target: null },
            { x: 54, y: 20, actionLabel: 'Typography Designer · Setting Contact Heading', action: 'type', active: true, target: null },
            { x: 62, y: 38, actionLabel: 'Typography Designer · Auditing Line Heights', action: 'select', active: true, target: null },
            { x: 68, y: 32, actionLabel: 'Typography Designer · Type Scale ✓ Done', action: 'done', active: true, target: null },
            { x: 74, y: 30, actionLabel: 'Typography Designer · ✓ Done', action: 'done', active: false, target: null },
            { x: 80, y: 28, actionLabel: 'Typography Designer · ✓ Done', action: 'fadeout', active: false, target: null },
        ],
    },
    {
        id: 'motion-designer',
        name: 'Motion Designer',
        role: 'Motion Designer',
        specialty: 'Choreography, Easing & Transitions',
        variant: 'sculpted',
        defaultActionLabel: 'Motion Designer · Tuning Easing',
        color: '#A855F7', // Orchid Purple
        stages: [
            { x: 58, y: 52, actionLabel: 'Motion Designer · Ready', action: 'gather', active: true, target: null },
            { x: 82, y: 44, actionLabel: 'Motion Designer · Syncing Camera Curve', action: 'move', active: true, target: null },
            { x: 82, y: 22, actionLabel: 'Motion Designer · Staging Avatar Spin', action: 'click', active: false, target: null },
            { x: 82, y: 54, actionLabel: 'Motion Designer · Tuning Button Spring', action: 'click', active: true, target: null },
            { x: 78, y: 44, actionLabel: 'Motion Designer · Pacing Section Reveal', action: 'move', active: false, target: null },
            { x: 78, y: 48, actionLabel: 'Motion Designer · Tuning Hover Elevation', action: 'click', active: true, target: null },
            { x: 76, y: 36, actionLabel: 'Motion Designer · Smoothing Card Entrance', action: 'click', active: true, target: null },
            { x: 78, y: 52, actionLabel: 'Motion Designer · Coordinating Transitions', action: 'move', active: false, target: null },
            { x: 76, y: 46, actionLabel: 'Motion Designer · Calibrating Micro-Motion', action: 'click', active: true, target: null },
            { x: 78, y: 42, actionLabel: 'Motion Designer · Easing Curves ✓ Done', action: 'done', active: true, target: null },
            { x: 82, y: 42, actionLabel: 'Motion Designer · ✓ Done', action: 'done', active: false, target: null },
            { x: 86, y: 42, actionLabel: 'Motion Designer · ✓ Done', action: 'fadeout', active: false, target: null },
        ],
    },
    {
        id: 'interaction-designer',
        name: 'Interaction Designer',
        role: 'Interaction Designer',
        specialty: 'Interactive Controls, States & Feedback',
        variant: 'precision',
        defaultActionLabel: 'Interaction Designer · Wiring Controls',
        color: '#06B6D4', // Cyan
        stages: [
            { x: 36, y: 59, actionLabel: 'Interaction Designer · Ready', action: 'gather', active: true, target: null },
            { x: 20, y: 68, actionLabel: 'Interaction Designer · Forming Controls Team', action: 'move', active: true, target: null },
            { x: 18, y: 62, actionLabel: 'Interaction Designer · Preparing CTA Row', action: 'move', active: false, target: null },
            { x: 34, y: 72, actionLabel: 'Interaction Designer · Snapping CTA Buttons', action: 'drag', active: true, target: 'cta' },
            { x: 34, y: 74, actionLabel: 'Interaction Designer · Wiring Skill Tabs', action: 'click', active: true, target: null },
            { x: 36, y: 72, actionLabel: 'Interaction Designer · Binding Live Site Links', action: 'click', active: true, target: null },
            { x: 36, y: 76, actionLabel: 'Interaction Designer · Checking Status Badges', action: 'move', active: false, target: null },
            { x: 58, y: 74, actionLabel: 'Interaction Designer · Wiring Send Message CTA', action: 'drag', active: true, target: null },
            { x: 38, y: 70, actionLabel: 'Interaction Designer · Verifying Focus Rings', action: 'click', active: true, target: null },
            { x: 32, y: 68, actionLabel: 'Interaction Designer · Controls ✓ Done', action: 'done', active: true, target: null },
            { x: 20, y: 72, actionLabel: 'Interaction Designer · ✓ Done', action: 'done', active: false, target: null },
            { x: 14, y: 76, actionLabel: 'Interaction Designer · ✓ Done', action: 'fadeout', active: false, target: null },
        ],
    },
    {
        id: 'graphic-designer',
        name: 'Graphic Designer',
        role: 'Graphic Designer',
        specialty: 'Media Framing, Imagery & Visual Assets',
        variant: 'classic',
        defaultActionLabel: 'Graphic Designer · Framing Media',
        color: '#EC4899', // Rose
        stages: [
            { x: 60, y: 59, actionLabel: 'Graphic Designer · Ready', action: 'gather', active: true, target: null },
            { x: 34, y: 26, actionLabel: 'Graphic Designer · Preloading Media Assets', action: 'move', active: true, target: null },
            { x: 36, y: 18, actionLabel: 'Graphic Designer · Cropping Profile Avatar', action: 'resize', active: true, target: 'profile' },
            { x: 16, y: 30, actionLabel: 'Graphic Designer · Framing Avatar Ring', action: 'click', active: false, target: null },
            { x: 26, y: 48, actionLabel: 'Graphic Designer · Placing Section Icons', action: 'click', active: false, target: null },
            { x: 26, y: 44, actionLabel: 'Graphic Designer · Placing /goc.png Preview', action: 'drag', active: true, target: null },
            { x: 28, y: 48, actionLabel: 'Graphic Designer · Framing Trophy Emblem', action: 'drag', active: true, target: null },
            { x: 24, y: 64, actionLabel: 'Graphic Designer · Aligning Channel Icons', action: 'click', active: true, target: null },
            { x: 28, y: 44, actionLabel: 'Graphic Designer · Verifying Image Aspect', action: 'select', active: true, target: null },
            { x: 24, y: 36, actionLabel: 'Graphic Designer · Media Assets ✓ Done', action: 'done', active: true, target: null },
            { x: 16, y: 34, actionLabel: 'Graphic Designer · ✓ Done', action: 'done', active: false, target: null },
            { x: 12, y: 34, actionLabel: 'Graphic Designer · ✓ Done', action: 'fadeout', active: false, target: null },
        ],
    },
    {
        id: 'frontend-designer',
        name: 'Frontend Designer',
        role: 'Frontend Designer',
        specialty: 'Component Architecture, Pills & Metrics',
        variant: 'angled',
        defaultActionLabel: 'Frontend Designer · Building Components',
        color: '#10B981', // Emerald
        stages: [
            { x: 36, y: 66, actionLabel: 'Frontend Designer · Ready', action: 'gather', active: true, target: null },
            { x: 76, y: 74, actionLabel: 'Frontend Designer · Preparing Components', action: 'move', active: true, target: null },
            { x: 78, y: 72, actionLabel: 'Frontend Designer · Mounting MagneticButton', action: 'drag', active: false, target: null },
            { x: 78, y: 80, actionLabel: 'Frontend Designer · Building Stat Counters', action: 'drag', active: true, target: null },
            { x: 64, y: 66, actionLabel: 'Frontend Designer · Placing Skill Tag Pills', action: 'drag', active: true, target: null },
            { x: 62, y: 68, actionLabel: 'Frontend Designer · Adding Python & SQL Tags', action: 'drag', active: true, target: null },
            { x: 62, y: 78, actionLabel: 'Frontend Designer · Building Initiative Cards', action: 'drag', active: true, target: null },
            { x: 68, y: 64, actionLabel: 'Frontend Designer · Assembling Form Fields', action: 'drag', active: true, target: null },
            { x: 64, y: 68, actionLabel: 'Frontend Designer · Auditing Responsive DOM', action: 'select', active: true, target: null },
            { x: 64, y: 76, actionLabel: 'Frontend Designer · Components ✓ Done', action: 'done', active: true, target: null },
            { x: 74, y: 74, actionLabel: 'Frontend Designer · ✓ Done', action: 'done', active: false, target: null },
            { x: 80, y: 78, actionLabel: 'Frontend Designer · ✓ Done', action: 'fadeout', active: false, target: null },
        ],
    },
    {
        id: 'creative-director',
        name: 'Creative Director',
        role: 'Creative Director',
        specialty: 'Art Direction, Cohesion & Final Sign-Off',
        variant: 'minimal',
        defaultActionLabel: 'Creative Director · Directing Build',
        color: '#60A5FA', // Sky Blue
        stages: [
            { x: 58, y: 66, actionLabel: 'Creative Director · Ready', action: 'gather', active: true, target: null },
            { x: 50, y: 10, actionLabel: 'Creative Director · Coordinating Teams', action: 'move', active: true, target: null },
            { x: 50, y: 10, actionLabel: 'Creative Director · Reviewing Hero Balance', action: 'move', active: false, target: null },
            { x: 50, y: 12, actionLabel: 'Creative Director · Approving Hero Lockup', action: 'click', active: true, target: null },
            { x: 50, y: 16, actionLabel: 'Creative Director · Reviewing About Narrative', action: 'move', active: false, target: null },
            { x: 50, y: 16, actionLabel: 'Creative Director · Approving Case Studies', action: 'click', active: true, target: null },
            { x: 50, y: 14, actionLabel: 'Creative Director · Reviewing Milestones', action: 'move', active: false, target: null },
            { x: 50, y: 14, actionLabel: 'Creative Director · Approving Contact Section', action: 'click', active: false, target: null },
            { x: 50, y: 16, actionLabel: 'Creative Director · Final Polish Inspection', action: 'select', active: true, target: null },
            { x: 50, y: 14, actionLabel: 'Creative Director · Art Direction ✓ Done', action: 'done', active: true, target: null },
            { x: 50, y: 12, actionLabel: 'Creative Director · Portfolio Ready ✓ Done', action: 'done', active: true, target: null },
            { x: 50, y: 8, actionLabel: 'Creative Director · ✓ Done', action: 'fadeout', active: false, target: null },
        ],
    },
];

/**
 * Viewport-relative minimal selection outlines rendered during Stages 4..8.
 * Specification rule: "Selection is minimal: colored outline and role label; handles only during resize."
 */
export const SECTION_CONSTRUCTION_FRAMES = {
    4: [
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
    5: [
        {
            id: 'frame-project-1',
            label: 'Layout Designer · Grace of Christ Church Platform',
            color: '#6366F1',
            left: '10%',
            top: '24%',
            width: '80%',
            height: '60%',
            isResizing: true,
        },
    ],
    6: [
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
    7: [
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
    8: [
        {
            id: 'frame-project-2',
            label: 'UI Designer · National Admission Portal · Polish',
            color: '#3B82F6',
            left: '10%',
            top: '22%',
            width: '80%',
            height: '58%',
            isResizing: false,
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
    const isTransforming = clampedStage >= REVEAL_INTRO_STAGE;

    return {
        stageIndex: clampedStage,
        phase: timing.phase,
        timelineWindow: timing.timelineWindow,
        activeSection: timing.section,
        cameraScale: timing.cameraScale,
        fallbackCameraY: timing.fallbackY,

        // Deep black/violet backdrop stays active during stages 0..10, then dissolves smoothly in stage 11 ('reveal')
        blackScreenOpacity: clampedStage < REVEAL_INTRO_STAGE ? 1 : 0,
        showBlackScreen: !isComplete,

        // Temporarily block ordinary page scrolling & pointer interaction during stages 0..11
        interactionLocked: !isComplete,

        // Show 10 designer cursors, trails, and minimal selection overlays during stages 0..11
        showCollaborationOverlay: !isComplete,
        overlayOpacity: clampedStage < REVEAL_INTRO_STAGE ? 1 : 0,

        // Progressive Hero element build flags (Stages 2–3 = 7–14s detailed Hero construction):
        showHeroFrame: clampedStage >= 1 && clampedStage < REVEAL_INTRO_STAGE,
        showProfile: clampedStage >= 2,
        profileDragging: clampedStage === 2,
        showHeadline: clampedStage >= 2,
        headlineWordsVisibleCount: clampedStage < 2 ? 0 : 5,
        headlineDragging: clampedStage === 2,
        showSubheadline: clampedStage >= 2,
        subheadlineDragging: clampedStage === 2,
        showCta: clampedStage >= 3,
        ctaDragging: clampedStage === 3,
        colorsApplied: clampedStage >= 3,
        showStats: clampedStage >= 3,
        statsDragging: clampedStage === 3,
        showScrollIndicator: clampedStage >= 9,

        // Section progression flags (Stages 4–7 = 14–24s remaining real sections):
        showAboutBio: clampedStage >= 4,
        showAboutSkills: clampedStage >= 4,
        showProjects1: clampedStage >= 5,
        showProjects2: clampedStage >= 5,
        showMilestones: clampedStage >= 6,
        showContact: clampedStage >= 7,

        canvasScale: clampedStage === 0 ? 0.94 : clampedStage === 1 ? 0.96 : clampedStage < 10 ? 0.985 : 1,
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
    const isFadingOut = stageIndex >= REVEAL_INTRO_STAGE;
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
        // Active cursors are prominent (1.0); idle cursors subtly dim (0.48); all fade to 0 in stage 11 ('reveal')
        opacity: isFadingOut ? 0 : isActive ? 1 : 0.48,
        scale: isFadingOut ? 0.88 : isActive ? 1 : 0.93,
    };
}

/**
 * Returns the effective CSS layout viewport width.
 * Uses `document.documentElement.clientWidth` and `window.innerWidth` so a mobile phone
 * in "Desktop Site" mode (>= 1024 CSS px) is accurately detected as desktop-width.
 */
export function getEffectiveViewportWidth() {
    if (typeof window === 'undefined') return 1440;
    const docClientWidth =
        typeof document !== 'undefined' && document.documentElement
            ? document.documentElement.clientWidth || 0
            : 0;
    const winInnerWidth = window.innerWidth || 0;
    return Math.max(docClientWidth, winInnerWidth);
}

/**
 * Responsive Gating Rule from Specification:
 * - Use effective layout viewport width, NOT user-agent or pointer type.
 * - At >= 1024 CSS px, run the full 10-cursor intro (including a phone using Desktop Site when its effective viewport >= 1024px).
 * - Below 1024 CSS px, skip the desktop intro and show the existing website with a subtle blur-to-clear fade-in.
 * - Touchscreen alone must NEVER disable the intro.
 */
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
