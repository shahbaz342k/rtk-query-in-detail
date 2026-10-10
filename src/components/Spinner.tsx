type SpinnerSize = "sm" | "md" | "lg" | "xl";

interface SpinnerProps {
  size?: SpinnerSize;
  label?: string;
  fullScreen?: boolean;
  className?: string;
}

const sizeMap: Record<SpinnerSize, string> = {
  sm: "h-6 w-6 border-2",
  md: "h-10 w-10 border-[3px]",
  lg: "h-14 w-14 border-4",
  xl: "h-20 w-20 border-[5px]",
};

const textSizeMap: Record<SpinnerSize, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
};

export default function Spinner({
  size = "md",
  label,
  fullScreen = false,
  className = "",
}: SpinnerProps) {
  const spinner = (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <div className="relative flex items-center justify-center">
        <div
          className={`absolute rounded-full blur-md opacity-40 animate-pulse bg-gradient-to-tr from-indigo-500 via-fuchsia-500 to-cyan-400 ${sizeMap[size]}`}
        />
        <div
          className={`relative rounded-full animate-spin border-solid border-transparent bg-gradient-to-tr from-indigo-500 via-fuchsia-500 to-cyan-400 ${sizeMap[size]}`}
          style={{
            WebkitMask:
              "radial-gradient(farthest-side, transparent calc(100% - 4px), #000 0)",
            mask: "radial-gradient(farthest-side, transparent calc(100% - 4px), #000 0)",
          }}
        />
      </div>
      {label && (
        <p className={`font-medium text-gray-500 dark:text-gray-300 animate-pulse ${textSizeMap[size]}`}>
          {label}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm">
        {spinner}
      </div>
    );
  }

  return spinner;
}
