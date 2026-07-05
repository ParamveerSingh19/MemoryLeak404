import React from "react";
export default function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div
      key={toast.id}
      className={`ml-toast ml-toast--${toast.kind}`}
      data-testid={`toast-${toast.kind}`}
      role="status"
      aria-live="polite"
    >
      <span className="ml-toast__prefix">
        {toast.kind === "match" ? ">>" : "!!"}
      </span>
      <span className="ml-toast__msg">{toast.msg}</span>
    </div>
  );
}
