import clsx from "clsx";

export function Button({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={clsx(
        "rounded-xl px-4 py-2 text-sm font-medium shadow-sm transition disabled:opacity-50",
        "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50",
        className
      )}
    >
      {children}
    </button>
  );
}
