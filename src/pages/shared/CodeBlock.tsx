import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
}

/* Very lightweight manual tokenizer for TSX/CSS snippets */
function highlight(code: string, lang: string): string {
  if (lang === "css") return highlightCss(code);
  return highlightTsx(code);
}

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function highlightCss(raw: string): string {
  return esc(raw)
    .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="t-cmt">$1</span>')
    .replace(/(--sk-[\w-]+)/g, '<span class="t-tok">$1</span>')
    .replace(/(var\()/g, '<span class="t-fn">$1</span>')
    .replace(/(#[0-9a-fA-F]{3,8})\b/g, '<span class="t-num">$1</span>')
    .replace(/(\d+(?:px|rem|em|%|deg|s|ms))/g, '<span class="t-num">$1</span>');
}

function highlightTsx(raw: string): string {
  const lines = raw.split("\n");
  return lines
    .map((line) => {
      let l = esc(line);

      /* Comments */
      l = l.replace(/(\/\/.*$)/gm, '<span class="t-cmt">$1</span>');

      /* Strings */
      l = l.replace(/(&quot;[^&]*&quot;|&#39;[^&]*&#39;|`[^`]*`)/g, '<span class="t-str">$1</span>');

      /* CSS variable references inside strings already wrapped */
      l = l.replace(/(?<![<\/\w])(--sk-[\w-]+)/g, '<span class="t-tok">$1</span>');

      /* TS types after : */
      l = l.replace(/: (string|number|boolean|React\.CSSProperties|CSSProperties|ButtonVariant|ButtonSize|InputState|BadgeVariant|ProductCardLayout)(\b)/g,
        ': <span class="t-type">$1</span>$2');

      /* Keywords */
      l = l.replace(/\b(import|export|from|type|interface|const|let|var|function|return|if|else|true|false|undefined|null|default)\b/g,
        '<span class="t-kw">$1</span>');

      /* JSX tags */
      l = l.replace(/(&lt;\/?)([\w.]+)/g, '$1<span class="t-tag">$2</span>');

      /* JSX attributes */
      l = l.replace(/\s([\w-]+)(?==)/g, ' <span class="t-attr">$1</span>');

      /* Function names */
      l = l.replace(/\b([A-Z][a-zA-Z]+)(?=\(|&lt;)/g, '<span class="t-fn">$1</span>');

      return l;
    })
    .join("\n");
}

export function CodeBlock({ code, language = "tsx" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="code-block">
      <div className="code-block-header">
        <span className="code-block-lang">{language}</span>
        <button className={`code-copy-btn${copied ? " copied" : ""}`} onClick={handleCopy}>
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? "Copiado" : "Copiar"}
        </button>
      </div>
      <pre
        dangerouslySetInnerHTML={{ __html: highlight(code, language) }}
      />
    </div>
  );
}
