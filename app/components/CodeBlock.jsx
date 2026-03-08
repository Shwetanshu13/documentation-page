"use client";

import { useEffect, useMemo, useRef } from "react";
import Prism from "prismjs";

// Languages used across docs
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-json";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";

export default function CodeBlock({ code, language = "bash" }) {
  const codeRef = useRef(null);

  const normalizedCode = useMemo(() => {
    if (typeof code !== "string") return "";
    return code.endsWith("\n") ? code : code + "\n";
  }, [code]);

  useEffect(() => {
    if (!codeRef.current) return;
    Prism.highlightElement(codeRef.current);
  }, [normalizedCode, language]);

  return (
    <pre className="code-block" data-language={language}>
      <code ref={codeRef} className={`language-${language}`}>
        {normalizedCode}
      </code>
    </pre>
  );
}
