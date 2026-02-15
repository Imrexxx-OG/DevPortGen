"use client";

import { useState } from "react";

export default function CopyLinkButton({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    const url = `${window.location.origin}/p/${slug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copyLink}
      className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 px-3 py-1 rounded transition-colors"
    >
      {copied ? "✓ Copied!" : "Copy Link"}
    </button>
  );
}