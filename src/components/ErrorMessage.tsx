// src/components/common/ErrorMessage.tsx

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

function ErrorMessage({
  message,
  onRetry,
  className = '',
}: ErrorMessageProps) {
  return (
    <div
      className={`rounded-lg border border-error-500/30 bg-error-500/10 p-4 ${className}`}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-error-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-sm text-error-400">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-2 text-sm text-primary-400 hover:text-primary-300 underline"
            >
              Try again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ErrorMessage;
