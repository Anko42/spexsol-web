export type SavingsInput = {
  volume: number // items per month
  minutesPerItem: number // manual handling time per item
  hourlyCost: number // loaded cost per hour, unit-less
  reductionFraction: number // 0..1 share of handling time removed
}
export type SavingsOutput = { hoursSaved: number; laborTimeValue: number }

export const DEFAULT_SAVINGS_INPUT: SavingsInput = {
  volume: 100,
  minutesPerItem: 10,
  hourlyCost: 30,
  reductionFraction: 0.5,
}

// Empty or invalid form input arrives as NaN; treat it (and negatives) as 0.
const nonNegative = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0)

export function estimateSavings(i: SavingsInput): SavingsOutput {
  const reduction = Math.min(nonNegative(i.reductionFraction), 1)
  const minutesSaved =
    nonNegative(i.volume) * nonNegative(i.minutesPerItem) * reduction
  // Divide by 60 last so round inputs give exact values (100 x 10 x 0.5 x 30 / 60 = 250).
  return {
    hoursSaved: minutesSaved / 60,
    laborTimeValue: (minutesSaved * nonNegative(i.hourlyCost)) / 60,
  }
}
