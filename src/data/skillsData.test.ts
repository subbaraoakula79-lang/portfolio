import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { skillCategoriesData, educationData, heroStatsData, aboutContentData } from './skillsData';

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
