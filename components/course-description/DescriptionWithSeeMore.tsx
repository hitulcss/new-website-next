import React, { useState } from "react";


export default function DescriptionWithSeeMore({ html }: { html: string }) {
  const [expanded, setExpanded] = useState(false);
  // Remove HTML tags for word count, but keep original for rendering
  const textOnly = html.replace(/<[^>]+>/g, ' ');
  const words = textOnly.trim().split(/\s+/);
  const shortText = words.slice(0, 100).join(' ');
  const isLong = words.length > 100;

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: expanded ? html : html.substring(0, html.indexOf(shortText) + shortText.length) }} />
      {isLong && (
        <button
          className="flex items-center gap-1 text-orange-600 font-medium mt-2 focus:outline-none"
          onClick={() => setExpanded((prev) => !prev)}
          aria-label={expanded ? 'Collapse description' : 'Expand description'}
        >
          <span className="text-sm">{expanded ? 'Show less' : 'Show more'}</span>
          <svg
            className={`w-5 h-5 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      )}
    </div>
  );
}
