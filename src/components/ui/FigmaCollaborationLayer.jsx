import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    POINTER_SVG_PATHS,
    FRAME_PLACEHOLDER_SHAPES,
    SECTION_CONSTRUCTION_FRAMES,
    getCursorStageState,
} from '../../data/collaborationData';

/**
 * Pre-cached SVG Sprite Sheet mounted at Stage 0 on the black screen.
 * Pre-registers all cursor pointer geometries, wireframe frame icons, image placeholder icons,
 * and resize handle shapes with zero layout footprint so no SVG/icon asset causes layout shift.
 */
export const FigmaAnimationAssetDefs = () => (
    <svg
        id="figma-animation-asset-defs"
        data-testid="figma-animation-asset-defs"
        width="0"
        height="0"
        className="pointer-events-none fixed top-0 left-0 w-0 h-0 overflow-hidden opacity-0"
        aria-hidden="true"
        focusable="false"
    >
        <defs>
            {Object.entries(POINTER_SVG_PATHS).map(([variant, d]) => (
                <path key={variant} id={`cursor-shape-${variant}`} d={d} />
            ))}
            <path
                id={FRAME_PLACEHOLDER_SHAPES.resizeHandle.id}
                d={FRAME_PLACEHOLDER_SHAPES.resizeHandle.path}
            />
            <path
                id={FRAME_PLACEHOLDER_SHAPES.frameWireframeIcon.id}
                d={FRAME_PLACEHOLDER_SHAPES.frameWireframeIcon.path}
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
            />
            <path
                id={FRAME_PLACEHOLDER_SHAPES.imagePlaceholderIcon.id}
                d={FRAME_PLACEHOLDER_SHAPES.imagePlaceholderIcon.path}
                fill="currentColor"
            />
        </defs>
    </svg>
);

/**
 * Deep black (#030306) full-screen opening backdrop with extremely subtle violet ambient light.
 * Dissolves smoothly in Stage 11 ('reveal') to reveal the live portfolio theme background.
 */
export const FigmaCollaborationBackdrop = ({ buildState, config }) => {
    if (!config?.enabled || !buildState.showBlackScreen) return null;

    const backdrop = (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: buildState.blackScreenOpacity }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none fixed inset-0 z-30"
            style={{
                backgroundColor: '#030306',
                backgroundImage:
                    'radial-gradient(ellipse 68% 54% at 50% 46%, rgba(109, 40, 217, 0.085) 0%, rgba(79, 70, 229, 0.03) 45%, rgba(0, 0, 0, 0) 75%)',
                contain: 'strict',
                willChange: 'opacity',
            }}
            data-testid="figma-intro-blackscreen"
            data-blackscreen-opacity={buildState.blackScreenOpacity}
            aria-hidden="true"
        />
    );

    return typeof document !== 'undefined'
        ? createPortal(backdrop, document.body)
        : backdrop;
};

/**
 * Minimal Selection Outline + Role Label + Contextual Resize Handles (ONLY during resize).
 * Specification: "Selection is minimal: colored outline and role label; handles only during resize."
 * Uses `contain: layout style` and absolute positioning so toggling outlines never shifts layout.
 */
export const FigmaSelectionFrame = ({
    children,
    isActive = false,
    isDragging = false,
    isResizing = false,
    color = '#6366f1',
    layerLabel = 'Layout Designer',
    className = '',
    testId = undefined,
}) => {
    return (
        <motion.div
            animate={
                isDragging
                    ? { x: [8, 0], y: [6, 0] }
                    : isResizing
                      ? { scale: [0.985, 1] }
                      : { x: 0, y: 0, scale: 1 }
            }
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className={`relative ${className}`}
            style={{ contain: 'layout style' }}
            data-selection-active={isActive ? 'true' : 'false'}
            data-selection-resizing={isResizing ? 'true' : 'false'}
            data-testid={testId}
        >
            {children}

            <AnimatePresence>
                {isActive && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="pointer-events-none absolute -inset-2 sm:-inset-3 rounded-lg z-20"
                        style={{
                            border: `1.25px solid ${color}cc`,
                            background: isDragging || isResizing ? `${color}08` : 'transparent',
                        }}
                        aria-hidden="true"
                    >
                        {/* Compact Role + Action Label with Pre-Cached Frame Icon */}
                        <div
                            className="absolute -top-5 left-0 h-[18px] flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-medium text-white whitespace-nowrap shadow-xs"
                            style={{ backgroundColor: color }}
                        >
                            <svg
                                width="10"
                                height="10"
                                viewBox="0 0 16 16"
                                className="w-[10px] h-[10px] shrink-0 opacity-90"
                                aria-hidden="true"
                            >
                                <use href={`#${FRAME_PLACEHOLDER_SHAPES.frameWireframeIcon.id}`} />
                            </svg>
                            <span>{layerLabel}</span>
                        </div>

                        {/* Corner Handles ONLY During Resize */}
                        {isResizing && (
                            <>
                                <span
                                    className="absolute -top-[3.5px] -left-[3.5px] w-[7px] h-[7px] bg-white rounded-[1px]"
                                    style={{ border: `1.5px solid ${color}` }}
                                    data-testid="resize-handle"
                                />
                                <span
                                    className="absolute -top-[3.5px] -right-[3.5px] w-[7px] h-[7px] bg-white rounded-[1px]"
                                    style={{ border: `1.5px solid ${color}` }}
                                    data-testid="resize-handle"
                                />
                                <span
                                    className="absolute -bottom-[3.5px] -left-[3.5px] w-[7px] h-[7px] bg-white rounded-[1px]"
                                    style={{ border: `1.5px solid ${color}` }}
                                    data-testid="resize-handle"
                                />
                                <span
                                    className="absolute -bottom-[3.5px] -right-[3.5px] w-[7px] h-[7px] bg-white rounded-[1px]"
                                    style={{ border: `1.5px solid ${color}` }}
                                    data-testid="resize-handle"
                                />
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

/**
 * Viewport-relative Minimal Selection Outline rendered over active sections during Stages 4..8.
 * Shows corner handles ONLY when `frame.isResizing === true`.
 */
const ViewportSectionSelectionBox = ({ frame }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.985, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
                left: frame.left,
                top: frame.top,
                width: frame.width,
                height: frame.height,
                border: `1.25px solid ${frame.color}bf`,
                background: frame.isResizing ? `${frame.color}07` : 'transparent',
                contain: 'layout style',
            }}
            className="pointer-events-none absolute rounded-xl z-20"
            data-testid={frame.id}
            data-selection-active="true"
            data-selection-resizing={frame.isResizing ? 'true' : 'false'}
            aria-hidden="true"
        >
            <div
                className="absolute -top-5 left-0 h-[18px] flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-medium text-white whitespace-nowrap shadow-xs"
                style={{ backgroundColor: frame.color }}
            >
                <svg
                    width="10"
                    height="10"
                    viewBox="0 0 16 16"
                    className="w-[10px] h-[10px] shrink-0 opacity-90"
                    aria-hidden="true"
                >
                    <use href={`#${FRAME_PLACEHOLDER_SHAPES.frameWireframeIcon.id}`} />
                </svg>
                <span>{frame.label}</span>
            </div>

            {frame.isResizing && (
                <>
                    <span
                        className="absolute -top-[3.5px] -left-[3.5px] w-[7px] h-[7px] bg-white rounded-[1px]"
                        style={{ border: `1.5px solid ${frame.color}` }}
                        data-testid="resize-handle"
                    />
                    <span
                        className="absolute -top-[3.5px] -right-[3.5px] w-[7px] h-[7px] bg-white rounded-[1px]"
                        style={{ border: `1.5px solid ${frame.color}` }}
                        data-testid="resize-handle"
                    />
                    <span
                        className="absolute -bottom-[3.5px] -left-[3.5px] w-[7px] h-[7px] bg-white rounded-[1px]"
                        style={{ border: `1.5px solid ${frame.color}` }}
                        data-testid="resize-handle"
                    />
                    <span
                        className="absolute -bottom-[3.5px] -right-[3.5px] w-[7px] h-[7px] bg-white rounded-[1px]"
                        style={{ border: `1.5px solid ${frame.color}` }}
                        data-testid="resize-handle"
                    />
                </>
            )}
        </motion.div>
    );
};

/**
 * Hardware-accelerated Canvas rendering short glowing cursor trails & strictly capped tiny fading particles.
 * Runs entirely in requestAnimationFrame with zero per-frame React state updates.
 * Automatically adapts intensity to cursor speed, fades quickly at rest, and scales down on weaker devices.
 */
const CursorTrailsCanvas = ({ collaborators, stageIndex, particleCap, lowPowerMode }) => {
    const canvasRef = useRef(null);
    const stageRef = useRef(stageIndex);

    useEffect(() => {
        stageRef.current = stageIndex;
    }, [stageIndex]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let rafId = null;
        let width = window.innerWidth || 1440;
        let height = window.innerHeight || 900;
        canvas.width = width;
        canvas.height = height;

        const handleResize = () => {
            width = window.innerWidth || 1440;
            height = window.innerHeight || 900;
            canvas.width = width;
            canvas.height = height;
        };
        window.addEventListener('resize', handleResize, { passive: true });

        // Initialize per-cursor smooth curved interpolation state & 6-point trail ring buffer
        const cursorTrackers = collaborators.map((collab, idx) => {
            const initStep = getCursorStageState(collab, stageRef.current);
            const px = (initStep.x / 100) * width;
            const py = (initStep.y / 100) * height;
            return {
                id: collab.id,
                color: collab.color,
                index: idx,
                currX: px,
                currY: py,
                startX: px,
                startY: py,
                targetX: px,
                targetY: py,
                ctrlX: px,
                ctrlY: py,
                lastStage: stageRef.current,
                moveStartTime: performance.now(),
                moveDuration: 1150,
                speed: 0,
                active: initStep.active,
                opacity: initStep.opacity,
                trail: [{ x: px, y: py, alpha: 0 }],
            };
        });

        const particles = [];
        let adaptiveLowPower = lowPowerMode;
        let slowFrameStreak = 0;
        let lastFrameTime = performance.now();

        const renderFrame = (now) => {
            const dt = Math.max(1, now - lastFrameTime);
            lastFrameTime = now;

            // Adaptive performance check: degrade nonessential particles if consecutive frames exceed 55ms
            if (dt > 55) {
                slowFrameStreak += 1;
                if (slowFrameStreak > 8) {
                    adaptiveLowPower = true;
                }
            } else {
                slowFrameStreak = Math.max(0, slowFrameStreak - 1);
            }

            ctx.clearRect(0, 0, width, height);
            const currentStage = stageRef.current;
            const effectiveParticleCap = adaptiveLowPower ? Math.min(6, particleCap) : particleCap;

            for (const tracker of cursorTrackers) {
                const collab = collaborators[tracker.index];
                const state = getCursorStageState(collab, currentStage);

                if (tracker.lastStage !== currentStage) {
                    tracker.lastStage = currentStage;
                    tracker.startX = tracker.currX;
                    tracker.startY = tracker.currY;
                    tracker.targetX = (state.x / 100) * width;
                    tracker.targetY = (state.y / 100) * height;
                    // Subtle perpendicular offset for smooth curved quadratic Bezier trajectories
                    const dx = tracker.targetX - tracker.startX;
                    const dy = tracker.targetY - tracker.startY;
                    const bend = (tracker.index % 2 === 0 ? 1 : -1) * 0.14;
                    tracker.ctrlX = (tracker.startX + tracker.targetX) * 0.5 - dy * bend;
                    tracker.ctrlY = (tracker.startY + tracker.targetY) * 0.5 + dx * bend;
                    tracker.moveStartTime = now;
                    tracker.moveDuration = 950 + (tracker.index % 4) * 90;
                }

                const tRaw = Math.min(1, Math.max(0, (now - tracker.moveStartTime) / tracker.moveDuration));
                const t = tRaw < 0.5 ? 4 * tRaw * tRaw * tRaw : 1 - Math.pow(-2 * tRaw + 2, 3) / 2;
                const inv = 1 - t;
                const nextX =
                    inv * inv * tracker.startX +
                    2 * inv * t * tracker.ctrlX +
                    t * t * tracker.targetX;
                const nextY =
                    inv * inv * tracker.startY +
                    2 * inv * t * tracker.ctrlY +
                    t * t * tracker.targetY;

                const vx = nextX - tracker.currX;
                const vy = nextY - tracker.currY;
                tracker.speed = Math.hypot(vx, vy);
                tracker.currX = nextX;
                tracker.currY = nextY;
                tracker.active = state.active;
                tracker.opacity = state.opacity;

                tracker.trail.unshift({ x: nextX, y: nextY });
                const maxTrailPoints = adaptiveLowPower ? 4 : 7;
                if (tracker.trail.length > maxTrailPoints) {
                    tracker.trail.length = maxTrailPoints;
                }

                if (tracker.speed > 0.35 && tracker.opacity > 0.05 && tracker.trail.length > 1) {
                    const speedFactor = Math.min(1, tracker.speed / 12);
                    ctx.save();
                    ctx.beginPath();
                    ctx.moveTo(tracker.trail[0].x + 4, tracker.trail[0].y + 4);
                    for (let i = 1; i < tracker.trail.length; i++) {
                        ctx.lineTo(tracker.trail[i].x + 4, tracker.trail[i].y + 4);
                    }
                    ctx.strokeStyle = tracker.color;
                    ctx.globalAlpha = speedFactor * 0.36 * tracker.opacity;
                    ctx.lineWidth = tracker.active ? 2.2 : 1.4;
                    ctx.lineCap = 'round';
                    ctx.lineJoin = 'round';
                    ctx.stroke();
                    ctx.restore();

                    if (
                        !adaptiveLowPower &&
                        tracker.speed > 3.2 &&
                        particles.length < effectiveParticleCap &&
                        Math.random() < 0.22
                    ) {
                        particles.push({
                            x: nextX + 4,
                            y: nextY + 4,
                            vx: -vx * 0.08 + (Math.random() - 0.5) * 0.4,
                            vy: -vy * 0.08 + (Math.random() - 0.5) * 0.4,
                            alpha: 0.55 * tracker.opacity,
                            radius: 1.4,
                            color: tracker.color,
                        });
                    }
                }
            }

            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.alpha -= 0.032;
                if (p.alpha <= 0.02) {
                    particles.splice(i, 1);
                    continue;
                }
                ctx.save();
                ctx.globalAlpha = p.alpha;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }

            rafId = requestAnimationFrame(renderFrame);
        };

        rafId = requestAnimationFrame(renderFrame);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, [collaborators, particleCap, lowPowerMode]);

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none absolute inset-0 w-full h-full z-25"
            data-testid="cursor-trails-canvas"
            aria-hidden="true"
        />
    );
};

/**
 * Single Custom Designer Cursor referencing the pre-cached `#cursor-shape-{variant}` SVG definition.
 */
const CollaboratorCursor = ({ collaborator, stageIndex }) => {
    const cursorState = getCursorStageState(collaborator, stageIndex);
    const isInteracting =
        cursorState.action === 'click' ||
        cursorState.action === 'drag' ||
        cursorState.action === 'resize' ||
        cursorState.action === 'type';
    const variantKey = POINTER_SVG_PATHS[collaborator.variant]
        ? collaborator.variant
        : 'classic';

    return (
        <motion.div
            className="pointer-events-none absolute top-0 left-0 w-[20px] h-[20px] z-30 select-none"
            style={{ willChange: 'transform, opacity' }}
            initial={{
                x: `${collaborator.stages[0].x}vw`,
                y: `${collaborator.stages[0].y}vh`,
                opacity: 0.95,
                scale: 0.92,
            }}
            animate={{
                x: `${cursorState.x}vw`,
                y: `${cursorState.y}vh`,
                opacity: cursorState.opacity,
                scale: cursorState.scale,
            }}
            exit={{ opacity: 0, scale: 0.86, transition: { duration: 0.4 } }}
            transition={{
                duration: stageIndex === 0 ? 0.45 : 1.05,
                ease: [0.22, 1, 0.36, 1],
            }}
            data-testid={`collab-cursor-${collaborator.id}`}
            data-cursor-role={collaborator.role}
            data-cursor-active={cursorState.active ? 'true' : 'false'}
            data-cursor-stage={stageIndex}
            data-cursor-x={cursorState.x}
            data-cursor-y={cursorState.y}
            data-label-side={cursorState.labelSide}
            aria-hidden="true"
        >
            {/* Subtle Click / Action Ripple at Cursor Tip */}
            <AnimatePresence>
                {isInteracting && cursorState.active && cursorState.opacity > 0 && (
                    <motion.div
                        key={`ripple-${stageIndex}`}
                        initial={{ scale: 0.3, opacity: 0.75 }}
                        animate={{ scale: 2.1, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.65, ease: 'easeOut' }}
                        className="absolute -top-2.5 -left-2.5 w-6 h-6 rounded-full"
                        style={{
                            border: `1.5px solid ${collaborator.color}`,
                            backgroundColor: `${collaborator.color}20`,
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Pointer SVG + Compact Role & Live Action Label */}
            <motion.div
                animate={{
                    scale: isInteracting && cursorState.active ? 0.93 : 1,
                }}
                transition={{ type: 'spring', stiffness: 420, damping: 26 }}
                className="relative w-[20px] h-[20px]"
            >
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-[20px] h-[20px] block"
                    style={{
                        filter: cursorState.active
                            ? `drop-shadow(0 3px 8px ${collaborator.color}55)`
                            : 'drop-shadow(0 2px 4px rgba(0,0,0,0.6))',
                    }}
                >
                    <use
                        href={`#cursor-shape-${variantKey}`}
                        fill={collaborator.color}
                        stroke="#ffffff"
                        strokeWidth="1.6"
                        strokeLinejoin="round"
                    />
                </svg>

                {/* Compact Role + Live Action Pill (Flips side near right edge to avoid collisions) */}
                <motion.div
                    initial={{ opacity: 0.9, scale: 0.94 }}
                    animate={{
                        opacity: cursorState.opacity,
                        scale: 1,
                    }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className={`absolute top-3.5 h-[22px] ${
                        cursorState.labelSide === 'left'
                            ? 'right-5 origin-top-right'
                            : 'left-4 origin-top-left'
                    } px-2.5 py-0.5 rounded-full text-[10.5px] font-medium text-white whitespace-nowrap flex items-center gap-1.5`}
                    style={{
                        backgroundColor: collaborator.color,
                        boxShadow: cursorState.active
                            ? `0 4px 14px ${collaborator.color}45`
                            : '0 2px 8px rgba(0,0,0,0.35)',
                    }}
                    data-testid={`collab-label-${collaborator.id}`}
                >
                    <span className="font-semibold tracking-tight leading-none">
                        {cursorState.actionLabel}
                    </span>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

/**
 * Full-Viewport 10-Cursor Collaborative Construction Overlay.
 * Unmounts completely at Stage 12 ('complete') or immediately below 1024 CSS px.
 */
export const FigmaCollaborationOverlay = ({ stageIndex, buildState, config }) => {
    if (!config?.enabled || !buildState.showCollaborationOverlay) {
        return null;
    }

    const activeSectionFrames = SECTION_CONSTRUCTION_FRAMES[stageIndex] || [];

    const overlay = (
        <>
            {/* Pre-cached SVG Pointer & Frame Placeholder Sprite Sheet */}
            <FigmaAnimationAssetDefs />

            {/* Temporary pointer interaction blocker during desktop intro (restores cleanly on completion) */}
            {buildState.interactionLocked && (
                <div
                    className="fixed inset-0 z-50 pointer-events-auto select-none"
                    data-testid="intro-interaction-lock"
                    aria-hidden="true"
                />
            )}

            <motion.div
                animate={{ opacity: buildState.overlayOpacity }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-none fixed inset-0 overflow-hidden z-40"
                style={{ contain: 'strict' }}
                data-testid="figma-collab-overlay"
                data-collab-mode={config.mode}
                data-collab-phase={buildState.phase}
                data-collab-window={buildState.timelineWindow}
                data-collab-stage={stageIndex}
                data-low-power={config.lowPowerMode ? 'true' : 'false'}
                aria-hidden="true"
            >
                {/* Short Glowing Trails & Strictly Capped Tiny Fading Particles Canvas */}
                <CursorTrailsCanvas
                    collaborators={config.activeCollaborators}
                    stageIndex={stageIndex}
                    particleCap={config.particleCap}
                    lowPowerMode={config.lowPowerMode}
                />

                {/* Minimal Section Selection Outlines (Stages 4..8) */}
                <AnimatePresence mode="sync">
                    {activeSectionFrames.map((frame) => (
                        <ViewportSectionSelectionBox
                            key={`${stageIndex}-${frame.id}`}
                            frame={frame}
                        />
                    ))}
                </AnimatePresence>

                {/* All 10 Custom Designer Cursors */}
                {config.showMouseCursors &&
                    config.activeCollaborators.map((collab) => (
                        <CollaboratorCursor
                            key={collab.id}
                            collaborator={collab}
                            stageIndex={stageIndex}
                        />
                    ))}
            </motion.div>
        </>
    );

    return typeof document !== 'undefined'
        ? createPortal(overlay, document.body)
        : overlay;
};
