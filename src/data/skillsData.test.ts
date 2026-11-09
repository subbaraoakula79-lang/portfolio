import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { skillCategoriesData, educationData, heroStatsData, aboutContentData } from './skillsData';
import {
    collaboratorsData,
    REQUIRED_DESIGNER_TITLES,
    INTRO_STAGE_TIMINGS,
    TOTAL_INTRO_DURATION_MS,
    FINAL_INTRO_STAGE,
    REVEAL_INTRO_STAGE,
    MAX_PARTICLE_CAP,
    LOW_POWER_PARTICLE_CAP,
    SECTION_CONSTRUCTION_FRAMES,
    POINTER_SVG_PATHS,
    FRAME_PLACEHOLDER_SHAPES,
    INTRO_ASSET_MANIFEST,
    getStageBuildState,
    getCursorStageState,
    getCollaborationConfig,
} from './collaborationData';

test('Programming Languages category contains only Java and Python, and REST API is completely removed', () => {
    const progCategory = skillCategoriesData.find(c => c.label === 'Programming Languages');
    assert.ok(progCategory, 'Programming Languages category should exist');
    assert.deepEqual(progCategory.skills, ['Java', 'Python']);

    const allSkills = skillCategoriesData.flatMap(c => c.skills);
    assert.equal(allSkills.includes('REST API'), false, 'REST API must be completely removed');
    assert.equal(allSkills.includes('REST APIs'), false, 'REST APIs must not be present');
});

test('Problem Solving category includes Debugging and preserves Problem Solving and LeetCode without Data Structures or Algorithms', () => {
    const allSkills = skillCategoriesData.flatMap(c => c.skills);
    assert.equal(allSkills.includes('Data Structures'), false, 'Data Structures must be removed');
    assert.equal(allSkills.includes('Algorithms'), false, 'Algorithms must be removed');

    const coreCategory = skillCategoriesData.find(c => c.id === 'core');
    assert.ok(coreCategory, 'Problem Solving category should exist');
    assert.deepEqual(coreCategory.skills, ['Problem Solving', 'Debugging', 'LeetCode']);
});

test('Old resume is removed and new resume PDF is stored in public assets', () => {
    assert.equal(fs.existsSync(path.resolve('public/resume.png')), false, 'Old public/resume.png must be removed');
    assert.equal(fs.existsSync(path.resolve('resume.png')), false, 'Old root resume.png must be removed');
    assert.equal(fs.existsSync(path.resolve('public/new-resume.pdf')), true, 'New public/new-resume.pdf must exist');
    const stat = fs.statSync(path.resolve('public/new-resume.pdf'));
    assert.ok(stat.size > 1000, 'new-resume.pdf should be non-empty');
});

test('BSc Information Technology education status is updated to 2nd Year Ongoing', () => {
    const bsc = educationData.find(e => e.level === 'BSc Information Technology');
    assert.ok(bsc, 'BSc Information Technology entry should exist');
    assert.equal(bsc.status, '2nd Year Ongoing');
});

test('Hero stats display 2 Featured Projects', () => {
    const projStat = heroStatsData.find(s => s.label === 'Featured Projects');
    assert.ok(projStat, 'Featured Projects stat should exist');
    assert.equal(projStat.value, '2');
    assert.equal(projStat.suffix, '');
});

test('About section label is About Me and heading is A Little About Me with the updated 3-paragraph bio', () => {
    assert.equal(aboutContentData.sectionLabel, 'About Me');
    assert.equal(`${aboutContentData.headingPrefix} ${aboutContentData.headingHighlight}`, 'A Little About Me');
    assert.equal(aboutContentData.paragraphs.length, 3);
    assert.ok(aboutContentData.paragraphs[0].includes('intersection of technology and design'));
    assert.ok(aboutContentData.paragraphs[1].includes('simplicity is the ultimate sophistication'));
    assert.ok(aboutContentData.paragraphs[2].includes('competing in archery'));
});

test('Ten designer cursors use exact role titles only (no personal names), unique colors, pointer variants, and collision-free stages', () => {
    assert.equal(collaboratorsData.length, 10, 'Must define exactly 10 designer cursors');
    const actualNames = collaboratorsData.map(c => c.name);
    assert.deepEqual(actualNames, REQUIRED_DESIGNER_TITLES);

    const uniqueColors = new Set(collaboratorsData.map(c => c.color));
    assert.equal(uniqueColors.size, 10, 'All 10 cursors must have distinct coordinated colors');

    const variants = new Set(collaboratorsData.map(c => c.variant));
    assert.ok(variants.size >= 4, 'Cursors must include subtle pointer shape variations');

    // Verify no personal names ("Sanjay") appear in cursor titles or labels
    for (const collab of collaboratorsData) {
        assert.equal(collab.name.toLowerCase().includes('sanjay'), false);
        for (const step of collab.stages) {
            assert.equal(step.actionLabel.toLowerCase().includes('sanjay'), false);
        }
    }

    // Verify collision-free coordinates across active stages 0..10
    for (let st = 0; st <= 10; st++) {
        for (let i = 0; i < collaboratorsData.length; i++) {
            for (let j = i + 1; j < collaboratorsData.length; j++) {
                const a = getCursorStageState(collaboratorsData[i], st);
                const b = getCursorStageState(collaboratorsData[j], st);
                const dist = Math.hypot(a.x - b.x, a.y - b.y);
                assert.ok(
                    dist >= 5.5,
                    `Stage ${st}: ${collaboratorsData[i].name} and ${collaboratorsData[j].name} are too close (${dist.toFixed(1)}%)`
                );
            }
        }
    }

    // Verify active cursors are prominent (opacity 1) and idle cursors subtly dim (0.48)
    const activeSample = getCursorStageState(collaboratorsData[0], 2);
    const idleSample = getCursorStageState(collaboratorsData[2], 2);
    assert.equal(activeSample.active, true);
    assert.equal(activeSample.opacity, 1);
    assert.equal(idleSample.active, false);
    assert.equal(idleSample.opacity, 0.48);
});

test('Responsive gating uses effective layout viewport width (>= 1024 CSS px), supporting phone Desktop Site and sub-1024 blur fade-in', () => {
    const desktop1440 = getCollaborationConfig(1440, false, 8);
    assert.equal(desktop1440.mode, 'desktop');
    assert.equal(desktop1440.enabled, true);
    assert.equal(desktop1440.activeCollaborators.length, 10);
    assert.equal(desktop1440.particleCap, MAX_PARTICLE_CAP);
    assert.equal(desktop1440.lowPowerMode, false);

    // Phone using "Desktop Site" mode with effective viewport width >= 1024 CSS px
    const phoneDesktopSite = getCollaborationConfig(1024, false, 4);
    assert.equal(phoneDesktopSite.enabled, true, 'Phone in Desktop Site mode (>= 1024px) must run the full intro');
    assert.equal(phoneDesktopSite.lowPowerMode, true, '4-core device enables adaptive low-power particle cap');
    assert.equal(phoneDesktopSite.particleCap, LOW_POWER_PARTICLE_CAP);

    // Below 1024 CSS px: skip desktop intro and enable subtle blur-to-clear fade-in
    const tablet768 = getCollaborationConfig(768, false, 8);
    assert.equal(tablet768.enabled, false);
    assert.equal(tablet768.sub1024BlurFadeIn, true);

    const mobile390 = getCollaborationConfig(390, false, 8);
    assert.equal(mobile390.enabled, false);
    assert.equal(mobile390.sub1024BlurFadeIn, true);

    const reduced = getCollaborationConfig(1440, true, 8);
    assert.equal(reduced.enabled, false);
    assert.equal(reduced.sub1024BlurFadeIn, false);
});

test('30-35 second (32.5s) timeline follows exact 0-3s, 3-7s, 7-14s, 14-24s, 24-29s, and 29-35s specification windows', () => {
    assert.ok(
        TOTAL_INTRO_DURATION_MS >= 30000 && TOTAL_INTRO_DURATION_MS <= 35000,
        'Total intro duration must be between 30 and 35 seconds (32,500ms)'
    );
    assert.equal(INTRO_STAGE_TIMINGS[0].startMs, 0);
    assert.equal(INTRO_STAGE_TIMINGS[1].startMs, 3000, '3-7s team formation begins at 3.0s');
    assert.equal(INTRO_STAGE_TIMINGS[2].startMs, 7000, '7-14s detailed Hero construction begins at 7.0s');
    assert.equal(INTRO_STAGE_TIMINGS[4].startMs, 14000, '14-24s remaining sections build begins at 14.0s');
    assert.equal(INTRO_STAGE_TIMINGS[8].startMs, 24000, '24-29s micro-adjustments & polish begins at 24.0s');
    assert.equal(INTRO_STAGE_TIMINGS[10].startMs, 29000, '29-35s overview & transition begins at 29.0s');
    assert.equal(INTRO_STAGE_TIMINGS[FINAL_INTRO_STAGE].startMs, TOTAL_INTRO_DURATION_MS);

    // 0-3s (Stage 0 'atmosphere'): 10 cursors clustered, Hero content not yet revealed
    const s0 = getStageBuildState(0);
    assert.equal(s0.phase, 'atmosphere');
    assert.equal(s0.blackScreenOpacity, 1);
    assert.equal(s0.showProfile, false);
    assert.equal(s0.showHeadline, false);

    // 7-14s (Stages 2-3): Hero constructed progressively
    const s2 = getStageBuildState(2);
    assert.equal(s2.showProfile, true);
    assert.equal(s2.showHeadline, true);
    assert.equal(s2.showSubheadline, true);
    assert.equal(s2.showCta, false);

    const s3 = getStageBuildState(3);
    assert.equal(s3.showCta, true);
    assert.equal(s3.colorsApplied, true);
    assert.equal(s3.showStats, true);

    // 14-24s (Stages 4-7): Remaining real sections built in exact order
    assert.equal(getStageBuildState(4).activeSection, 'about-bio');
    assert.equal(getStageBuildState(5).activeSection, 'projects-1');
    assert.equal(getStageBuildState(6).activeSection, 'achievements');
    assert.equal(getStageBuildState(7).activeSection, 'contact');

    // Selection is minimal; resize handles appear ONLY on frames with isResizing === true
    const aboutFrames = SECTION_CONSTRUCTION_FRAMES[4];
    assert.equal(aboutFrames[0].isResizing, true);
    assert.equal(aboutFrames[1].isResizing, false);

    // 29-35s (Stages 10-12): Overview -> Reveal -> Complete
    const sReveal = getStageBuildState(REVEAL_INTRO_STAGE);
    assert.equal(sReveal.blackScreenOpacity, 0);
    assert.equal(sReveal.overlayOpacity, 0);
    for (const collab of collaboratorsData) {
        const cReveal = getCursorStageState(collab, REVEAL_INTRO_STAGE);
        assert.equal(cReveal.opacity, 0, `${collab.name} must fade out to 0 in reveal stage`);
    }

    const sComplete = getStageBuildState(FINAL_INTRO_STAGE);
    assert.equal(sComplete.isComplete, true);
    assert.equal(sComplete.interactionLocked, false);
    assert.equal(sComplete.showCollaborationOverlay, false);
    assert.equal(sComplete.showBlackScreen, false);
});

test('All animation sequence assets, placeholder icons, and frame shapes define pre-caching/lazy-loading strategies and reserved intrinsic dimensions to prevent layout shift', () => {
    assert.ok(INTRO_ASSET_MANIFEST.length >= 4, 'Asset manifest must cover hero image, project image, cursor SVGs, and frame shapes');

    for (const asset of INTRO_ASSET_MANIFEST) {
        assert.ok(asset.id && asset.src, 'Every asset must have an id and src');
        assert.ok(asset.width > 0 && asset.height > 0, `Asset ${asset.id} must reserve positive width and height`);
        assert.ok(asset.aspectRatio && asset.aspectRatio.includes('/'), `Asset ${asset.id} must specify an explicit aspect ratio`);
        assert.ok(
            ['precache-eager', 'precache-decode', 'precache-dom'].includes(asset.strategy),
            `Asset ${asset.id} must use a valid pre-cache or lazy-load strategy`
        );
    }

    // Verify all 5 cursor pointer variants have pre-cached SVG paths
    for (const variant of ['classic', 'sculpted', 'precision', 'angled', 'minimal']) {
        assert.ok(
            typeof POINTER_SVG_PATHS[variant] === 'string' && POINTER_SVG_PATHS[variant].startsWith('M'),
            `Pointer variant ${variant} must have a pre-cached SVG path`
        );
    }

    // Verify frame placeholder shapes (resizeHandle, frameWireframeIcon, imagePlaceholderIcon) have explicit viewBoxes and geometry
    assert.equal(FRAME_PLACEHOLDER_SHAPES.resizeHandle.width, 7);
    assert.equal(FRAME_PLACEHOLDER_SHAPES.resizeHandle.height, 7);
    assert.equal(FRAME_PLACEHOLDER_SHAPES.frameWireframeIcon.id, 'figma-frame-wireframe-icon');
    assert.equal(FRAME_PLACEHOLDER_SHAPES.imagePlaceholderIcon.id, 'figma-image-placeholder-icon');
});

