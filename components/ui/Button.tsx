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
        "rounded-xl px-4 py-2 text-sm font-medium shadow-sm transition",
        "border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50",
        className
      )}
    >
      {children}
    </button>
  );
}
