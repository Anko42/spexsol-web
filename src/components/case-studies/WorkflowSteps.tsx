interface Step {
  title: string
  body: string
}

/** Numbered 4-stage workflow. One column on phones, four on desktop, hairline rail between. */
export function WorkflowSteps({ steps }: { steps: Step[] }) {
  return (
    <ol className="grid grid-cols-1 gap-px overflow-hidden rounded-[20px] bg-line-soft shadow-[0_0_0_1px_var(--line-soft)] sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, i) => (
        <li key={step.title} className="relative flex flex-col gap-4 bg-surface p-6">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[12px] tabular-nums text-fg-muted">
              {String(i + 1).padStart(2, '0')}
            </span>
            {i < steps.length - 1 && (
              <span aria-hidden="true" className="text-[16px] text-fg-muted">
                →
              </span>
            )}
          </div>
          <div>
            <h3 className="text-[18px] font-semibold leading-tight tracking-[-0.02em] text-fg">
              {step.title}
            </h3>
            <p className="mt-2 text-[14px] leading-6 text-fg-muted">{step.body}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
