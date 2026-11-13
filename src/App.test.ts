import test from 'node:test';
import assert from 'node:assert/strict';
import {
  KANPUR_SERVICES,
  INSTALL_STEPS,
  filterKanpurServices,
  calculateEstimate,
} from './App';

test('filterKanpurServices returns all services for All category', () => {
  const result = filterKanpurServices(KANPUR_SERVICES, 'All');
  assert.equal(result.length, KANPUR_SERVICES.length);
});

test('filterKanpurServices filters by specific trade category', () => {
  const electrical = filterKanpurServices(KANPUR_SERVICES, 'Electrical');
  assert.equal(electrical.length, 1);
  assert.equal(electrical[0].id, 'electrician-wiring');

  const finishing = filterKanpurServices(KANPUR_SERVICES, 'Finishing');
  assert.equal(finishing.length, 2);
});

test('calculateEstimate multiplies rate and clamps invalid quantities safely', () => {
  assert.equal(calculateEstimate(750, 2), 1500);
  assert.equal(calculateEstimate(18, 100), 1800);
  assert.equal(calculateEstimate(300, 0), 300);
  assert.equal(calculateEstimate(300, -5), 300);
  assert.equal(calculateEstimate(300, Number.NaN), 300);
});

test('3-step install guide matches required Hindi-English instructions', () => {
  assert.equal(INSTALL_STEPS.length, 3);
  assert.equal(INSTALL_STEPS[0].title, '1. Download dabayein');
  assert.equal(INSTALL_STEPS[1].title, '2. File kholein');
  assert.equal(INSTALL_STEPS[2].title, '3. Install karein');
});
