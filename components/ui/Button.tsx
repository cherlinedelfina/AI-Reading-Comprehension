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
        "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50",
        "disabled:cursor-not-allowed disabled:opacity-100 disabled:bg-slate-100 disabled:text-slate-400 disabled:hover:bg-slate-100",
        className
      )}
    >
      {children}
    </button>
  );
}
