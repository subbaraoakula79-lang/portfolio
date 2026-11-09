import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── 10 Professional Simulated Designers ─────────────────────────
// Exactly 10 designer identities with distinct titles, coordinated
// palette (blue, violet, teal, amber, indigo, etc.), and specialized tasks.
const DESIGNERS = [
  {
    id: 'ui-designer',
    role: 'UI Designer',
    color: '#3B82F6', // Electric Blue
    initialX: 20,
    initialY: 26,
    tasks: [
      'UI Designer · Building Hero',
      'UI Designer · Styling Button Surfaces',
      'UI Designer · Assembling Card UI',
      'UI Designer · Refining Card Borders',
      'UI Designer · Surface Polish ✓ Done',
    ],
    defaultTask: 'UI Designer · Building Hero',
  },
  {
    id: 'ux-designer',
    role: 'UX Designer',
    color: '#8B5CF6', // Violet
    initialX: 78,
    initialY: 22,
    tasks: [
      'UX Designer · Mapping Hierarchy',
      'UX Designer · Structuring Content Flow',
      'UX Designer · Verifying CTA Journey',
      'UX Designer · Validating Form UX',
      'UX Designer · Flow Verified ✓ Done',
    ],
    defaultTask: 'UX Designer · Mapping Flow',
  },
  {
    id: 'visual-designer',
    role: 'Visual Designer',
    color: '#14B8A6', // Teal
    initialX: 16,
    initialY: 54,
    tasks: [
      'Visual Designer · Calibrating Contrast',
      'Visual Designer · Balancing Glassmorphism',
      'Visual Designer · Sampling Ambient Glow',
      'Visual Designer · Tuning Specular Highlights',
      'Visual Designer · Palette ✓ Done',
    ],
    defaultTask: 'Visual Designer · Tuning Palette',
  },
  {
    id: 'layout-designer',
    role: 'Layout Designer',
    color: '#6366F1', // Indigo
    initialX: 26,
    initialY: 16,
    tasks: [
      'Layout Designer · Aligning Grid',
      'Layout Designer · Resizing Hero Frame',
      'Layout Designer · Checking Section Rhythm',
      'Layout Designer · Aligning Bento Columns',
      'Layout Designer · Grid Locked ✓ Done',
    ],
    defaultTask: 'Layout Designer · Aligning Grid',
  },
  {
    id: 'typography-designer',
    role: 'Typography Designer',
    color: '#F59E0B', // Amber
    initialX: 68,
    initialY: 34,
    tasks: [
      'Typography Designer · Refining H1 Kerning',
      'Typography Designer · Auditing Line Heights',
      'Typography Designer · Setting Type Scale',
      'Typography Designer · Balancing Editorial Copy',
      'Typography Designer · Type Scale ✓ Done',
    ],
    defaultTask: 'Typography Designer · Setting Type',
  },
  {
    id: 'motion-designer',
    role: 'Motion Designer',
    color: '#A855F7', // Orchid Purple
    initialX: 82,
    initialY: 48,
    tasks: [
      'Motion Designer · Tuning Button Spring',
      'Motion Designer · Calibrating Micro-Motion',
      'Motion Designer · Smoothing Card Entrance',
      'Motion Designer · Pacing Hover Transitions',
      'Motion Designer · Easing Curves ✓ Done',
    ],
    defaultTask: 'Motion Designer · Tuning Easing',
  },
  {
    id: 'interaction-designer',
    role: 'Interaction Designer',
    color: '#06B6D4', // Cyan
    initialX: 34,
    initialY: 66,
    tasks: [
      'Interaction Designer · Wiring Controls',
      'Interaction Designer · Testing Hover States',
      'Interaction Designer · Snapping CTA Buttons',
      'Interaction Designer · Verifying Focus Rings',
      'Interaction Designer · Controls ✓ Done',
    ],
    defaultTask: 'Interaction Designer · Wiring Controls',
  },
  {
    id: 'graphic-designer',
    role: 'Graphic Designer',
    color: '#EC4899', // Rose
    initialX: 24,
    initialY: 44,
    tasks: [
      'Graphic Designer · Framing Media',
      'Graphic Designer · Cropping Profile Avatar',
      'Graphic Designer · Placing GOC Preview',
      'Graphic Designer · Verifying Image Ratio',
      'Graphic Designer · Media Assets ✓ Done',
    ],
    defaultTask: 'Graphic Designer · Framing Media',
  },
  {
    id: 'frontend-designer',
    role: 'Frontend Designer',
    color: '#10B981', // Emerald
    initialX: 72,
    initialY: 72,
    tasks: [
      'Frontend Designer · Building Components',
      'Frontend Designer · Mounting MagneticButton',
      'Frontend Designer · Placing Skill Tag Pills',
      'Frontend Designer · Auditing Responsive DOM',
      'Frontend Designer · Components ✓ Done',
    ],
    defaultTask: 'Frontend Designer · Building Components',
  },
  {
    id: 'creative-director',
    role: 'Creative Director',
    color: '#60A5FA', // Sky Blue
    initialX: 50,
    initialY: 14,
    tasks: [
      'Creative Director · Directing Build',
      'Creative Director · Reviewing Visual Cohesion',
      'Creative Director · Approving Hero Lockup',
      'Creative Director · Inspecting Design Quality',
      'Creative Director · Sign-off ✓ Approved',
    ],
    defaultTask: 'Creative Director · Directing Build',
  },
];

// ─── Semantic Portfolio Focal Zones (Coordinates in Viewport %) ──
// These map to key portfolio areas across desktop/laptop viewports:
const FOCAL_ZONES = [
  {
    id: 'hero-title',
    name: 'Hero Heading',
    x: 50,
    y: 34,
    radius: 12,
    selectionBox: { w: 46, h: 14, label: 'Hero Headline · Typography' },
  },
  {
    id: 'hero-cta',
    name: 'Hero CTA & Actions',
    x: 40,
    y: 68,
    radius: 10,
    selectionBox: { w: 36, h: 12, label: 'Primary CTA · Button Surfaces' },
  },
  {
    id: 'hero-stats',
    name: 'Metrics & Stats',
    x: 52,
    y: 84,
    radius: 12,
    selectionBox: { w: 48, h: 10, label: 'Performance Metrics' },
  },
  {
    id: 'project-goc',
    name: 'GOC Project Card',
    x: 32,
    y: 48,
    radius: 14,
    selectionBox: { w: 40, h: 26, label: 'Featured Project · GOC Ministry' },
  },
  {
    id: 'about-skills',
    name: 'Skills Bento Grid',
    x: 68,
    y: 52,
    radius: 14,
    selectionBox: { w: 42, h: 26, label: 'Technical Stack · Skill Pills' },
  },
  {
    id: 'navbar-zone',
    name: 'Navigation Bar',
    x: 50,
    y: 8,
    radius: 16,
    selectionBox: { w: 54, h: 7, label: 'Floating Glass Navbar' },
  },
];

// ─── Collaborative Mission Profiles ──────────────────────────────
// Teams of 2–4 designers collaborating on real portfolio areas:
const COLLABORATIVE_MISSIONS = [
  {
    id: 'mission-hero-cta',
    zoneId: 'hero-cta',
    team: ['ui-designer', 'interaction-designer', 'motion-designer'],
    taskIndex: 1, // 'Styling Button Surfaces', 'Testing Hover States', 'Tuning Button Spring'
    selectionColor: '#06B6D4',
  },
  {
    id: 'mission-typography',
    zoneId: 'hero-title',
    team: ['typography-designer', 'ux-designer', 'creative-director'],
    taskIndex: 0, // 'Refining H1 Kerning', 'Mapping Hierarchy', 'Directing Build'
    selectionColor: '#F59E0B',
  },
  {
    id: 'mission-project-card',
    zoneId: 'project-goc',
    team: ['graphic-designer', 'visual-designer', 'layout-designer'],
    taskIndex: 2, // 'Placing GOC Preview', 'Sampling Ambient Glow', 'Checking Section Rhythm'
    selectionColor: '#EC4899',
  },
  {
    id: 'mission-components',
    zoneId: 'about-skills',
    team: ['frontend-designer', 'layout-designer', 'ui-designer'],
    taskIndex: 2, // 'Placing Skill Tag Pills', 'Aligning Bento Columns', 'Assembling Card UI'
    selectionColor: '#10B981',
  },
  {
    id: 'mission-navbar',
    zoneId: 'navbar-zone',
    team: ['ui-designer', 'interaction-designer', 'creative-director'],
    taskIndex: 0,
    selectionColor: '#3B82F6',
  },
];

// ─── Helper Functions ────────────────────────────────────────────
const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

const randBetween = (min, max) => min + Math.random() * (max - min);

// ─── Professional Design Tool Pointer SVG ────────────────────────
const FigmaPointerIcon = ({ color, isActive }) => (
  <svg
    width="19"
    height="23"
    viewBox="0 0 19 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="block select-none"
    style={{
      filter: isActive
        ? `drop-shadow(0 3px 8px ${color}66) drop-shadow(0 1px 3px rgba(0,0,0,0.5))`
        : 'drop-shadow(0 1px 3px rgba(0,0,0,0.4))',
      transition: 'filter 0.3s ease',
    }}
  >
    {/* Crisp macOS / Figma arrow geometry with white contrast outline */}
    <path
      d="M1.5 0.75L1.5 18.25L6.0 14.0L10.2 21.75L13.0 20.25L8.7 12.75L14.75 12.75L1.5 0.75Z"
      fill={color}
      stroke="#ffffff"
      strokeWidth="1.5"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  </svg>
);

// ─── Single Designer Cursor Component ────────────────────────────
const DesignerCursor = ({
  designer,
  x,
  y,
  isActive,
  actionLabel,
  isClicking,
}) => {
  // Edge boundary checks to flip label dynamically and prevent clipping
  const flipLeft = x > 74; // Near right edge -> flip to left of cursor
  const flipUp = y > 84;   // Near bottom edge -> flip above cursor

  return (
    <motion.div
      className="pointer-events-none absolute top-0 left-0 select-none z-30"
      style={{ willChange: 'transform' }}
      animate={{
        x: `${x}vw`,
        y: `${y}vh`,
        opacity: isActive ? 1 : 0.55,
        scale: isActive ? 1 : 0.92,
      }}
      transition={{
        type: 'spring',
        stiffness: 30,
        damping: 15,
        mass: 1,
      }}
      aria-hidden="true"
    >
      {/* Click / Action Ripple at Cursor Tip */}
      <AnimatePresence>
        {isClicking && (
          <motion.div
            key={`ripple-${designer.id}`}
            initial={{ scale: 0.3, opacity: 0.85 }}
            animate={{ scale: 2.2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute -top-2.5 -left-2.5 w-6 h-6 rounded-full"
            style={{
              border: `1.5px solid ${designer.color}`,
              backgroundColor: `${designer.color}22`,
            }}
          />
        )}
      </AnimatePresence>

      {/* Pointer Icon */}
      <motion.div
        animate={{ scale: isClicking ? 0.92 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="relative"
      >
        <FigmaPointerIcon color={designer.color} isActive={isActive} />

        {/* Compact Pill-shaped Role / Task Label */}
        <motion.div
          className={`absolute whitespace-nowrap transition-all duration-300 ${
            flipUp ? '-top-6' : 'top-4'
          } ${
            flipLeft
              ? 'right-4 origin-top-right'
              : 'left-3.5 origin-top-left'
          }`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{ duration: 0.25 }}
        >
          <div
            className="inline-flex items-center gap-1.5 px-2.5 py-[3px] rounded-full text-[10.5px] font-medium text-white shadow-lg tracking-tight"
            style={{
              backgroundColor: designer.color,
              boxShadow: isActive
                ? `0 3px 12px ${designer.color}50, 0 1px 4px rgba(0,0,0,0.3)`
                : '0 2px 6px rgba(0,0,0,0.3)',
              filter: isActive ? 'none' : 'saturate(0.85)',
              border: '1px solid rgba(255,255,255,0.18)',
            }}
          >
            <span className="font-semibold">{actionLabel}</span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// ─── Subtle Temporary Collaborative Selection Box ────────────────
const SelectionBoxOverlay = ({ box, color }) => {
  if (!box) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.99 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-none absolute rounded-xl z-20"
      style={{
        left: `${box.left}vw`,
        top: `${box.top}vh`,
        width: `${box.width}vw`,
        height: `${box.height}vh`,
        border: `1.25px dashed ${color}88`,
        backgroundColor: `${color}06`,
      }}
      aria-hidden="true"
    >
      {/* Compact Tag in Top Left */}
      <div
        className="absolute -top-3.5 left-2.5 px-2 py-0.5 rounded text-[9.5px] font-mono font-medium text-white shadow-sm flex items-center gap-1"
        style={{ backgroundColor: color }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        <span>{box.label}</span>
      </div>
    </motion.div>
  );
};

// ─── Main Standalone Simulated Cursors Component ─────────────────
const SimulatedCursors = () => {
  // Reduced-motion & screen size check
  const isReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const [isEnabled, setIsEnabled] = useState(!isReducedMotion);
  const [activeIntroRunning, setActiveIntroRunning] = useState(false);

  // Per-designer interactive state: { x, y, isActive, actionLabel, isClicking }
  const [designerStates, setDesignerStates] = useState(() => {
    const initial = {};
    DESIGNERS.forEach((d) => {
      initial[d.id] = {
        x: d.initialX,
        y: d.initialY,
        isActive: true,
        actionLabel: d.defaultTask,
        isClicking: false,
      };
    });
    return initial;
  });

  // Current active collaborative selection box
  const [activeSelectionBox, setActiveSelectionBox] = useState(null);

  const mountedRef = useRef(true);
  const timersRef = useRef([]);

  // Check if existing full-intro is active so we never double-render cursors
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const checkIntro = () => {
      const isIntro =
        document.documentElement.getAttribute('data-portfolio-intro-active') === 'true';
      setActiveIntroRunning(isIntro);
    };

    checkIntro();

    const observer = new MutationObserver(() => {
      checkIntro();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-portfolio-intro-active', 'data-hero-intro'],
    });

    return () => observer.disconnect();
  }, []);

  // Listen for reduced motion preference changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e) => setIsEnabled(!e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Handle viewport resize: ensure all cursors remain strictly within boundaries
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const onResize = () => {
      if (!mountedRef.current) return;
      setDesignerStates((prev) => {
        const next = { ...prev };
        Object.keys(next).forEach((id) => {
          next[id] = {
            ...next[id],
            x: clamp(next[id].x, 10, 88),
            y: clamp(next[id].y, 10, 88),
          };
        });
        return next;
      });
    };

    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Safe timeout helper
  const addTimeout = useCallback((fn, delay) => {
    if (!mountedRef.current) return;
    const id = setTimeout(() => {
      if (mountedRef.current) fn();
    }, delay);
    timersRef.current.push(id);
    return id;
  }, []);

  // ─── Coordinated Movement Engine ────────────────────────────────
  useEffect(() => {
    if (!isEnabled || activeIntroRunning) return;
    mountedRef.current = true;

    let missionIndex = 0;

    const triggerNextMission = () => {
      if (!mountedRef.current) return;

      const mission = COLLABORATIVE_MISSIONS[missionIndex % COLLABORATIVE_MISSIONS.length];
      missionIndex += 1;

      const zone = FOCAL_ZONES.find((z) => z.id === mission.zoneId) || FOCAL_ZONES[0];

      // Update active selection box for the zone
      if (zone.selectionBox) {
        setActiveSelectionBox({
          left: clamp(zone.x - zone.selectionBox.w / 2, 8, 88 - zone.selectionBox.w),
          top: clamp(zone.y - zone.selectionBox.h / 2, 8, 88 - zone.selectionBox.h),
          width: zone.selectionBox.w,
          height: zone.selectionBox.h,
          label: zone.selectionBox.label,
          color: mission.selectionColor,
        });
      }

      // Update designers in the mission team
      setDesignerStates((prev) => {
        const next = { ...prev };

        // 1. Team members: converge towards the focal zone with organic spread
        mission.team.forEach((designerId, idx) => {
          const designer = DESIGNERS.find((d) => d.id === designerId);
          if (!designer) return;

          // Jittered position inside the target zone
          const angle = (idx / mission.team.length) * Math.PI * 2 + randBetween(-0.4, 0.4);
          const dist = randBetween(3, zone.radius * 0.7);
          const targetX = clamp(zone.x + Math.cos(angle) * dist, 12, 86);
          const targetY = clamp(zone.y + Math.sin(angle) * dist, 12, 86);

          const task =
            designer.tasks[mission.taskIndex % designer.tasks.length] || designer.defaultTask;

          next[designerId] = {
            ...next[designerId],
            x: targetX,
            y: targetY,
            isActive: true,
            actionLabel: task,
            isClicking: true,
          };

          // Reset click ripple after 650ms
          addTimeout(() => {
            if (!mountedRef.current) return;
            setDesignerStates((curr) => ({
              ...curr,
              [designerId]: {
                ...curr[designerId],
                isClicking: false,
              },
            }));
          }, 650);
        });

        // 2. Non-team members: gently drift to perimeter / idle observation spots
        DESIGNERS.forEach((d) => {
          if (!mission.team.includes(d.id)) {
            // Pick a perimeter wandering spot
            const wanderX = clamp(d.initialX + randBetween(-12, 12), 10, 88);
            const wanderY = clamp(d.initialY + randBetween(-10, 10), 10, 88);

            next[d.id] = {
              ...next[d.id],
              x: wanderX,
              y: wanderY,
              isActive: false, // subtly dimmed
              actionLabel: d.role, // compact role-only label
              isClicking: false,
            };
          }
        });

        return next;
      });

      // After 5.5s of team collaboration: team members show '✓ Done'
      addTimeout(() => {
        if (!mountedRef.current) return;
        setDesignerStates((prev) => {
          const next = { ...prev };
          mission.team.forEach((designerId) => {
            const designer = DESIGNERS.find((d) => d.id === designerId);
            if (designer && next[designerId]) {
              next[designerId] = {
                ...next[designerId],
                actionLabel: `${designer.role} · ✓ Done`,
                isClicking: true,
              };
            }
          });
          return next;
        });

        // Reset click ripple
        addTimeout(() => {
          if (!mountedRef.current) return;
          setDesignerStates((prev) => {
            const next = { ...prev };
            mission.team.forEach((designerId) => {
              if (next[designerId]) {
                next[designerId] = {
                  ...next[designerId],
                  isClicking: false,
                };
              }
            });
            return next;
          });
        }, 600);
      }, 5500);

      // Fade out selection box at 7.5s
      addTimeout(() => {
        if (!mountedRef.current) return;
        setActiveSelectionBox(null);
      }, 7500);

      // Schedule next collaborative mission in 8.5–10.5 seconds
      const nextInterval = randBetween(8500, 10500);
      addTimeout(triggerNextMission, nextInterval);
    };

    // Stagger initial launch slightly so the page mounts cleanly first
    const initialTimer = addTimeout(triggerNextMission, 1200);

    return () => {
      mountedRef.current = false;
      clearTimeout(initialTimer);
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, [isEnabled, activeIntroRunning, addTimeout]);

  // Don't render anything if reduced motion is enabled or full intro is currently active
  if (!isEnabled || activeIntroRunning) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      {/* Subtle Collaborative Selection Box on Focused Zone */}
      <AnimatePresence>
        {activeSelectionBox && (
          <SelectionBoxOverlay
            key="active-selection-box"
            box={activeSelectionBox}
            color={activeSelectionBox.color}
          />
        )}
      </AnimatePresence>

      {/* Exactly 10 Animated Multiplayer Designer Cursors */}
      {DESIGNERS.map((designer) => {
        const state = designerStates[designer.id] || {
          x: designer.initialX,
          y: designer.initialY,
          isActive: true,
          actionLabel: designer.defaultTask,
          isClicking: false,
        };

        return (
          <DesignerCursor
            key={designer.id}
            designer={designer}
            x={state.x}
            y={state.y}
            isActive={state.isActive}
            actionLabel={state.actionLabel}
            isClicking={state.isClicking}
          />
        );
      })}
    </div>
  );
};

export default SimulatedCursors;
