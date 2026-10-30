import { test } from 'node:test'
import assert from 'node:assert/strict'
import { DEFAULT_SAVINGS_INPUT, estimateSavings } from './value-calculator.ts'

test('defaults give 25/3 hours and 250 value', () => {
  const r = estimateSavings(DEFAULT_SAVINGS_INPUT)
  assert.ok(Math.abs(r.hoursSaved - 25 / 3) < 1e-9)
  assert.equal(r.laborTimeValue, 250)
})

test('zero volume gives zero output', () => {
  const r = estimateSavings({ ...DEFAULT_SAVINGS_INPUT, volume: 0 })
  assert.deepEqual(r, { hoursSaved: 0, laborTimeValue: 0 })
})

test('reductionFraction above 1 is clamped to 1', () => {
  const r = estimateSavings({ ...DEFAULT_SAVINGS_INPUT, reductionFraction: 1.5 })
  assert.ok(Math.abs(r.hoursSaved - 50 / 3) < 1e-9)
})

test('NaN volume gives zero output', () => {
  const r = estimateSavings({ ...DEFAULT_SAVINGS_INPUT, volume: NaN })
  assert.deepEqual(r, { hoursSaved: 0, laborTimeValue: 0 })
})

test('negative volume gives zero output', () => {
  const r = estimateSavings({ ...DEFAULT_SAVINGS_INPUT, volume: -10 })
  assert.deepEqual(r, { hoursSaved: 0, laborTimeValue: 0 })
})
