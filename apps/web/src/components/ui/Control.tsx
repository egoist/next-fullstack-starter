export const Control = ({
  children,
  label,
  labelRight,
  desc,
  className,
}: {
  children: React.ReactNode
  label?: React.ReactNode
  labelRight?: React.ReactNode
  desc?: React.ReactNode
  className?: string
}) => {
  return (
    <div className={className}>
      {label && (
        <div className="mb-1 flex items-center justify-between">
          <label className="font-medium text-sm">{label}</label>
          {labelRight}
        </div>
      )}
      {desc && <div className="text-xs text-slate-400 mb-1">{desc}</div>}
      {children}
    </div>
  )
}
