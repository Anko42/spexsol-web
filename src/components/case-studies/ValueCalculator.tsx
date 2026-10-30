import { useState, type ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import {
  DEFAULT_SAVINGS_INPUT,
  estimateSavings,
  type SavingsInput,
} from '~/lib/value-calculator'

/** Illustrative time-savings scenario with visible, adjustable assumptions. Local state only. */
export function ValueCalculator() {
  const { t } = useTranslation('caseStudies')
  const [input, setInput] = useState<SavingsInput>(DEFAULT_SAVINGS_INPUT)
  const { hoursSaved, laborTimeValue } = estimateSavings(input)

  // Empty field -> NaN -> helper clamps to 0.
  const set = (key: keyof SavingsInput, scale = 1) => (e: ChangeEvent<HTMLInputElement>) =>
    setInput((prev) => ({ ...prev, [key]: e.target.valueAsNumber / scale }))

  const fields = [
    { id: 'calc-volume', label: t('calculator.inputs.volume'), value: input.volume, onChange: set('volume'), step: 1 },
    { id: 'calc-minutes', label: t('calculator.inputs.minutesPerItem'), value: input.minutesPerItem, onChange: set('minutesPerItem'), step: 1 },
    { id: 'calc-cost', label: t('calculator.inputs.hourlyCost'), value: input.hourlyCost, onChange: set('hourlyCost'), step: 1 },
    {
      id: 'calc-reduction',
      label: t('calculator.inputs.reduction'),
      // Round so 0.55 shows as 55, not 55.00000000000001.
      value: Math.round(input.reductionFraction * 1e4) / 100,
      onChange: set('reductionFraction', 100),
      max: 100,
      step: 5,
    },
  ]

  return (
    <section className="mt-8 rounded-[16px] bg-surface p-6 shadow-[0_0_0_1px_var(--line-soft)] sm:p-8">
      <h2 className="text-[24px] font-semibold leading-tight tracking-[-0.025em] text-fg">{t('calculator.title')}</h2>
      <p className="mt-2 text-fg-muted">{t('calculator.disclaimer')}</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {fields.map((f) => (
          <div key={f.id} className="flex flex-col gap-2">
            <Label htmlFor={f.id}>{f.label}</Label>
            <Input
              id={f.id}
              type="number"
              inputMode="decimal"
              min={0}
              max={f.max}
              step={f.step}
              value={Number.isNaN(f.value) ? '' : f.value}
              onChange={f.onChange}
              aria-invalid={f.value < 0 || (f.max !== undefined && f.value > f.max) || undefined}
            />
          </div>
        ))}
      </div>
      <dl className="mt-6 grid gap-4 sm:grid-cols-2" aria-live="polite">
        <div>
          <dt className="text-[13px] text-fg-muted">{t('calculator.outputs.hours')}</dt>
          <dd className="text-[24px] font-semibold tabular-nums text-fg">{hoursSaved.toFixed(1)} h</dd>
        </div>
        <div>
          <dt className="text-[13px] text-fg-muted">{t('calculator.outputs.value')}</dt>
          <dd className="text-[24px] font-semibold tabular-nums text-fg">{Math.round(laborTimeValue)}</dd>
        </div>
      </dl>
      <p className="mt-4 text-[13px] text-fg-muted">{t('calculator.assumptions')}</p>
    </section>
  )
}
