"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

interface MarkdownBodyProps {
  content: string;
}

const mdComponents: Components = {
  // Render markdown images with their natural aspect ratio and no dimension collapse.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- strip react-markdown's AST `node` so it isn't spread onto the DOM element
  img({ src, alt, title, node, ...props }) {
    if (!src) return null;

    return (
      <span className="markdown-image-frame">
        <img
          {...props}
          src={src}
          alt={alt ?? ""}
          title={title ?? undefined}
          loading="lazy"
          decoding="async"
          className="markdown-image"
        />
      </span>
    );
  },
  // Stop <p> from wrapping images (avoids invalid <p><img> HTML nesting)
  p({ children, ...props }) {
    const childArray = Array.isArray(children) ? children : [children];
    const hasOnlyImage = childArray.every(
      (child) =>
        child === null ||
        child === undefined ||
        (typeof child === "string" && child.trim() === "") ||
        (child !== null &&
          typeof child === "object" &&
          "type" in (child as object) &&
          (child as { type: unknown }).type === "img")
    );
    if (hasOnlyImage) {
      return <>{children}</>;
    }
    return <p {...props}>{children}</p>;
  },
};

export default function MarkdownBody({ content }: MarkdownBodyProps) {
  return (
    <div className="blog-prose prose prose-invert max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
