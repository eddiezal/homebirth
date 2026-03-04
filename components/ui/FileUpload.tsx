"use client";

interface FileUploadProps {
  label: string;
  hint?: string;
  onFileSelect?: (file: File) => void;
  accept?: string;
  className?: string;
}

export function FileUpload({
  label,
  hint,
  onFileSelect,
  accept = "image/*",
  className = "",
}: FileUploadProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file && onFileSelect) {
      onFileSelect(file);
    }
  }

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-heading">{label}</label>
      <div className="mt-1.5 flex items-center gap-4">
        <label className="cursor-pointer rounded-[8px] border border-dashed border-card-border px-6 py-4 text-center transition-colors hover:border-primary">
          <input
            type="file"
            accept={accept}
            onChange={handleChange}
            className="hidden"
          />
          <div className="flex flex-col items-center gap-1">
            <svg
              className="h-6 w-6 text-muted"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            <span className="text-sm text-muted">
              Click to upload
            </span>
          </div>
        </label>
      </div>
      {hint && (
        <p className="mt-1 text-xs text-muted">{hint}</p>
      )}
    </div>
  );
}
