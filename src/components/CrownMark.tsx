type CrownMarkProps = {
  className?: string;
  title?: string;
};

export function CrownMark({ className = "h-10 w-10", title = "QUEEN" }: CrownMarkProps) {
  return (
    <svg
      aria-label={title}
      className={className}
      fill="none"
      role="img"
      viewBox="0 0 72 72"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <path d="M14 25.5 24.5 33 36 17l11.5 16L58 25.5l-4.5 26H18.5L14 25.5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.25" />
      <path d="M19.5 43.5h33M21 56h30" stroke="currentColor" strokeLinecap="round" strokeWidth="2.25" />
      <circle cx="14" cy="25.5" fill="currentColor" r="2.4" />
      <circle cx="36" cy="17" fill="currentColor" r="2.4" />
      <circle cx="58" cy="25.5" fill="currentColor" r="2.4" />
    </svg>
  );
}
