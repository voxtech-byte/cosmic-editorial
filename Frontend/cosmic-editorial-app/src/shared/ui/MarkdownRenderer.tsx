import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
}

/** Renders AI responses as formatted Markdown with tables, code, and styling */
export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="text-xl font-bold text-text-primary mt-4 mb-2 font-[Space_Grotesk,sans-serif]">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-lg font-bold text-text-primary mt-3 mb-2 font-[Space_Grotesk,sans-serif]">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-base font-bold text-text-primary mt-2 mb-1 font-[Space_Grotesk,sans-serif]">{children}</h3>
        ),
        p: ({ children }) => (
          <p className="text-sm md:text-base text-text-muted leading-relaxed mb-3">{children}</p>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-text-primary">{children}</strong>
        ),
        em: ({ children }) => (
          <em className="italic text-reflection">{children}</em>
        ),
        ul: ({ children }) => (
          <ul className="list-disc list-inside space-y-1 mb-3 text-text-muted text-sm">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside space-y-1 mb-3 text-text-muted text-sm">{children}</ol>
        ),
        code: ({ children, className }) => {
          const isBlock = className?.includes('language-');
          if (isBlock) {
            return (
              <pre className="bg-space-void rounded-xl p-4 overflow-x-auto my-3 border border-border-faint">
                <code className="text-xs md:text-sm font-mono text-science">{children}</code>
              </pre>
            );
          }
          return (
            <code className="bg-surface-high text-science px-1.5 py-0.5 rounded text-sm font-mono">
              {children}
            </code>
          );
        },
        blockquote: ({ children }) => (
          <blockquote className="border-s-4 border-reflection/30 ps-4 my-3 italic text-text-muted">
            {children}
          </blockquote>
        ),
        table: ({ children }) => (
          <div className="overflow-x-auto my-3">
            <table className="w-full text-sm border-collapse">{children}</table>
          </div>
        ),
        th: ({ children }) => (
          <th className="text-start p-2 border-b border-border text-text-primary font-semibold text-xs uppercase tracking-wider">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="p-2 border-b border-border-faint text-text-muted">{children}</td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
