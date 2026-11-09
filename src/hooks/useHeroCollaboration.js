import { useEffect, useState, useRef, useCallback } from 'react';
import { useReducedMotion } from 'framer-motion';
import {
    DESKTOP_MIN_WIDTH,
    FINAL_INTRO_STAGE,
    MAX_INTRO_WATCHDOG_MS,
    INTRO_STAGE_TIMINGS,
    INTRO_ASSET_MANIFEST,
    collaboratorsData,
    getEffectiveViewportWidth,
    getStageBuildState,
    getCursorStageState,
    getCollaborationConfig,
} from '../data/collaborationData';

// Module-level decoded bitmap reference cache to prevent GC eviction during black-screen transition
const decodedImageCache = new Map();

function shouldSkipIntro(effectiveWidth, prefersReducedMotion) {
    if (prefersReducedMotion) return true;
    if (effectiveWidth < DESKTOP_MIN_WIDTH) return true;
    if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        if (params.get('autostart') === '1' || params.get('fallback') === '1') {
            return true;
        }
    }
    return false;
}

/**
 * Preloads and decodes an image asset into memory with a bounded timeout so it is
 * already decoded in GPU/bitmap cache before transitioning from the black screen.
 */
export function precacheAndDecodeImage(src, width, height, timeoutMs = 2000) {
    if (typeof Image === 'undefined') {
        return Promise.resolve(true);
    }
    if (decodedImageCache.has(src)) {
        return Promise.resolve(true);
    }

    return new Promise((resolve) => {
        let settled = false;
        const finish = (ok, imgInstance) => {
            if (!settled) {
                settled = true;
                if (ok && imgInstance) {
                    decodedImageCache.set(src, imgInstance);
                }
                resolve(ok);
            }
        };

        const timer = setTimeout(() => finish(false, null), timeoutMs);
        const img = new Image(width, height);
        img.decoding = 'async';
        img.src = src;

        if (typeof img.decode === 'function') {
            img.decode()
                .then(() => {
                    clearTimeout(timer);
                    finish(true, img);
                })
                .catch(() => {
                    img.onload = () => {
                        clearTimeout(timer);
                        finish(true, img);
                    };
                    img.onerror = () => {
                        clearTimeout(timer);
                        finish(false, null);
                    };
                });
        } else {
            img.onload = () => {
                clearTimeout(timer);
                finish(true, img);
            };
            img.onerror = () => {
                clearTimeout(timer);
                finish(false, null);
            };
        }
    });
}

function computeSectionCameraY(sectionKey, fallbackY = 0) {
    if (typeof document === 'undefined' || typeof window === 'undefined') {
        return fallbackY;
    }

    if (sectionKey === 'home') {
        return 0;
    }

    if (sectionKey === 'about-bio') {
        const el = document.getElementById('about');
        if (!el) return fallbackY;
        return Math.max(0, el.offsetTop);
    }

    if (sectionKey === 'projects-1') {
        const el = document.getElementById('projects');
        if (!el) return fallbackY;
        return Math.max(0, el.offsetTop);
    }

    if (sectionKey === 'achievements') {
        const el = document.getElementById('achievements');
        if (!el) return fallbackY;
        return Math.max(0, el.offsetTop);
    }

    if (sectionKey === 'contact') {
        const el = document.getElementById('contact');
        if (!el) return fallbackY;
        return Math.max(0, el.offsetTop);
    }

    return fallbackY;
}

/**
 * 41.5-Second Exact 7-Phase Sequential Collaborative Portfolio Construction Controller Hook.
 * - Follows the exact reference video sequence:
 *   Cursors move -> Website fades in -> Cursors travel to Hero -> Cursors pause ->
 *   Designers receive assignments -> Actual Hero construction -> Remaining sections -> Final reveal.
 */
export function useHeroCollaboration() {
    const prefersReducedMotion = useReducedMotion();
    const [viewportWidth, setViewportWidth] = useState(() => getEffectiveViewportWidth());
    const [fallbackTriggered, setFallbackTriggered] = useState(false);
    const [assetsPrecached, setAssetsPrecached] = useState(() => decodedImageCache.size > 0);
    

    const hardwareConcurrency =
        typeof navigator !== 'undefined' && typeof navigator.hardwareConcurrency === 'number'
            ? navigator.hardwareConcurrency
            : 8;

    const skipIntro =
        fallbackTriggered || shouldSkipIntro(viewportWidth, !!prefersReducedMotion);

    const [rawStageIndex, setRawStageIndex] = useState(() => {
        const initialWidth = getEffectiveViewportWidth();
        const initialSkip = shouldSkipIntro(initialWidth, !!prefersReducedMotion);
        const initialPhase = initialSkip ? 'COMPLETE' : 'INTRO';
        if (typeof document !== 'undefined') {
            document.documentElement.setAttribute('data-hero-intro', initialPhase);
            document.documentElement.setAttribute(
                'data-portfolio-intro-active',
                initialSkip ? 'false' : 'true'
            );
            document.documentElement.setAttribute(
                'data-sub1024-fade',
                initialWidth < DESKTOP_MIN_WIDTH && !prefersReducedMotion ? 'true' : 'false'
            );
        }
        return initialSkip ? FINAL_INTRO_STAGE : 0;
    });

    const stageIndex = skipIntro ? FINAL_INTRO_STAGE : rawStageIndex;
    const baseBuildState = getStageBuildState(stageIndex);
    const config = getCollaborationConfig(
        viewportWidth,
        !!prefersReducedMotion,
        hardwareConcurrency
    );
    const cameraRafRef = useRef(null);
    const timersRef = useRef([]);

    // Progressive headline typing controller during Stage 5 (17.0s - 20.5s)
    const [typingProgress, setTypingProgress] = useState(0);

    useEffect(() => {
        if (skipIntro || stageIndex !== 5) return;

        const t0 = setTimeout(() => setTypingProgress(1), 50);
        const t1 = setTimeout(() => setTypingProgress(2), 550);
        const t2 = setTimeout(() => setTypingProgress(3), 1150);
        const t3 = setTimeout(() => setTypingProgress(4), 1750);
        const t4 = setTimeout(() => setTypingProgress(5), 2350);
        return () => {
            clearTimeout(t0);
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            clearTimeout(t4);
        };
    }, [stageIndex, skipIntro]);

    const buildState = {
        ...baseBuildState,
        headlineWordsVisibleCount: skipIntro || stageIndex > 5 ? 5 : stageIndex === 5 ? typingProgress : 0,
    };

    // Safe Failure Fallback terminator
    const terminateIntroSafely = useCallback(() => {
        timersRef.current.forEach(clearTimeout);
        timersRef.current = [];
        if (cameraRafRef.current) {
            cancelAnimationFrame(cameraRafRef.current);
            cameraRafRef.current = null;
        }
        setFallbackTriggered(true);
        setRawStageIndex(FINAL_INTRO_STAGE);
        if (typeof window !== 'undefined' && typeof document !== 'undefined') {
            document.body.style.overflow = '';
            document.documentElement.style.scrollBehavior = '';
            document.documentElement.setAttribute('data-hero-intro', 'COMPLETE');
            document.documentElement.setAttribute('data-portfolio-intro-active', 'false');
            window.scrollTo(0, 0);
        }
    }, []);

    // Expose programmatic fallback trigger
    useEffect(() => {
        if (typeof window === 'undefined') return;
        window.__triggerIntroFallback = terminateIntroSafely;
        const handleRuntimeError = () => {
            if (!buildState.isComplete) {
                terminateIntroSafely();
            }
        };
        window.addEventListener('error', handleRuntimeError);
        return () => {
            delete window.__triggerIntroFallback;
            window.removeEventListener('error', handleRuntimeError);
        };
    }, [buildState.isComplete, terminateIntroSafely]);

    // Pre-cache assets during the initial black screen ('INTRO')
    useEffect(() => {
        let cancelled = false;
        const imageAssets = INTRO_ASSET_MANIFEST.filter((item) => item.type === 'image');

        const imagePromises = imageAssets.map((asset) =>
            precacheAndDecodeImage(asset.src, asset.width, asset.height, asset.timeoutMs || 2000)
        );
        const fontPromise =
            typeof document !== 'undefined' && document.fonts && document.fonts.ready
                ? Promise.race([
                      document.fonts.ready,
                      new Promise((resolve) => setTimeout(resolve, 1500)),
                  ])
                : Promise.resolve();

        Promise.all([...imagePromises, fontPromise]).then(() => {
            if (!cancelled) {
                setAssetsPrecached(true);
                if (typeof document !== 'undefined') {
                    document.documentElement.setAttribute('data-intro-assets-cached', 'true');
                }
            }
        });

        return () => {
            cancelled = true;
        };
    }, []);

    // Track effective viewport width; cancel intro if resized < 1024 CSS px
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const handleResize = () => {
            const effectiveWidth = getEffectiveViewportWidth();
            setViewportWidth(effectiveWidth);
            if (typeof document !== 'undefined') {
                document.documentElement.setAttribute(
                    'data-sub1024-fade',
                    effectiveWidth < DESKTOP_MIN_WIDTH && !prefersReducedMotion ? 'true' : 'false'
                );
            }
            if (effectiveWidth < DESKTOP_MIN_WIDTH) {
                terminateIntroSafely();
            }
        };
        window.addEventListener('resize', handleResize, { passive: true });
        return () => window.removeEventListener('resize', handleResize);
    }, [prefersReducedMotion, terminateIntroSafely]);

    // Sync intro phase attribute to <html>
    useEffect(() => {
        if (typeof document !== 'undefined') {
            document.documentElement.setAttribute('data-hero-intro', buildState.phase);
            document.documentElement.setAttribute(
                'data-portfolio-intro-active',
                buildState.isComplete ? 'false' : 'true'
            );
        }
    }, [buildState.phase, buildState.isComplete]);

    // Smooth camera pan choreography across sections
    useEffect(() => {
        if (typeof window === 'undefined' || typeof document === 'undefined') return;

        if (cameraRafRef.current) {
            cancelAnimationFrame(cameraRafRef.current);
            cameraRafRef.current = null;
        }

        if (buildState.isComplete) {
            document.documentElement.style.scrollBehavior = '';
            return;
        }

        const targetY = computeSectionCameraY(
            buildState.activeSection,
            buildState.fallbackCameraY
        );
        const startY = window.scrollY || 0;
        const deltaY = targetY - startY;

        if (Math.abs(deltaY) < 2) {
            window.scrollTo(0, targetY);
            return;
        }

        const durationMs = stageIndex >= 11 ? 1600 : 1300;
        const startTime = performance.now();
        document.documentElement.style.scrollBehavior = 'auto';

        const stepCamera = (now) => {
            const elapsed = Math.max(0, now - startTime);
            const progress = Math.min(elapsed / durationMs, 1);
            const eased =
                progress < 0.5
                    ? 4 * progress * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 3) / 2;

            window.scrollTo(0, Math.round(startY + deltaY * eased));

            if (progress < 1) {
                cameraRafRef.current = requestAnimationFrame(stepCamera);
            } else {
                cameraRafRef.current = null;
            }
        };

        cameraRafRef.current = requestAnimationFrame(stepCamera);

        return () => {
            if (cameraRafRef.current) {
                cancelAnimationFrame(cameraRafRef.current);
                cameraRafRef.current = null;
            }
        };
    }, [stageIndex, buildState.activeSection, buildState.fallbackCameraY, buildState.isComplete]);

    // Block manual scrolling & keyboard scroll during intro (restores on completion)
    useEffect(() => {
        if (typeof window === 'undefined' || typeof document === 'undefined') return;

        if (!buildState.interactionLocked) {
            document.body.style.overflow = '';
            document.documentElement.style.scrollBehavior = '';
            return;
        }

        document.body.style.overflow = 'hidden';

        const preventScroll = (e) => {
            e.preventDefault();
        };
        const preventKeyScroll = (e) => {
            const blockedKeys = [
                ' ',
                'PageDown',
                'PageUp',
                'ArrowDown',
                'ArrowUp',
                'Home',
                'End',
                'Tab',
            ];
            if (blockedKeys.includes(e.key)) {
                e.preventDefault();
            }
        };

        window.addEventListener('wheel', preventScroll, { passive: false });
        window.addEventListener('touchmove', preventScroll, { passive: false });
        window.addEventListener('keydown', preventKeyScroll, { passive: false });

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('wheel', preventScroll);
            window.removeEventListener('touchmove', preventScroll);
            window.removeEventListener('keydown', preventKeyScroll);
        };
    }, [buildState.interactionLocked]);

    // Schedule the 41.5-second collaborative construction timeline + safety watchdog
    useEffect(() => {
        if (skipIntro) {
            return;
        }

        window.scrollTo(0, 0);

        const stageTimers = INTRO_STAGE_TIMINGS.filter((item) => item.stage > 0).map((item) =>
            setTimeout(() => {
                setRawStageIndex(item.stage);
            }, item.startMs)
        );

        const watchdogTimer = setTimeout(() => {
            terminateIntroSafely();
        }, MAX_INTRO_WATCHDOG_MS);

        timersRef.current = [...stageTimers, watchdogTimer];

        return () => {
            timersRef.current.forEach(clearTimeout);
            timersRef.current = [];
        };
    }, [skipIntro, terminateIntroSafely]);

    // Compute minimal Hero selection outlines during Stages 4..6 (Hero construction)
    const elementStates = {};
    if (stageIndex >= 4 && stageIndex <= 6) {
        for (const collab of collaboratorsData) {
            const cursorState = getCursorStageState(collab, stageIndex);
            if (cursorState.target && cursorState.active) {
                const prev = elementStates[cursorState.target];
                elementStates[cursorState.target] = {
                    isActive: true,
                    isDragging: Boolean(prev?.isDragging || cursorState.action === 'drag'),
                    isResizing: Boolean(prev?.isResizing || cursorState.isResizing),
                    color: prev?.isResizing ? prev.color : collab.color,
                    layerLabel: prev?.isResizing ? prev.layerLabel : cursorState.actionLabel,
                };
            }
        }
    }

    return {
        stageIndex,
        phase: buildState.phase,
        buildState,
        config,
        elementStates,
        assetsPrecached,
        terminateIntroSafely,
    };
}
