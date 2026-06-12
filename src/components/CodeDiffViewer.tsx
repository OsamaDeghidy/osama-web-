import React, { useState, useMemo } from "react";
import { Check, Columns, List, ChevronRight, Copy, Terminal } from "lucide-react";
import Prism from "prismjs";
import "prismjs/components/prism-python";

interface AlignedDiffRow {
  left: {
    type: "removed" | "unchanged" | "empty";
    value: string;
    lineNum?: number;
  };
  right: {
    type: "added" | "unchanged" | "empty";
    value: string;
    lineNum?: number;
  };
}

interface InlineDiffItem {
  type: "added" | "removed" | "unchanged";
  value: string;
  originalLineNum?: number;
  optimizedLineNum?: number;
}

interface CodeDiffViewerProps {
  originalCode: string;
  optimizedCode: string;
}

function HighlightPythonLine({ line, isRemoved, isAdded }: { line: string; isRemoved?: boolean; isAdded?: boolean }) {
  if (!line.trim()) {
    return <span>{line || " "}</span>;
  }

  // Access registered python syntax from Prism
  const lang = Prism.languages.python || Prism.languages.javascript;
  if (!lang) {
    return <span>{line}</span>;
  }

  try {
    const tokens = Prism.tokenize(line, lang);

    const renderToken = (token: string | Prism.Token, idx: number): React.ReactNode => {
      if (typeof token === "string") {
        return <span key={idx}>{token}</span>;
      }

      const type = token.type;
      const content = token.content;

      let className = "text-zinc-300";

      if (isRemoved) {
        // Reddish faded colors for deleted code lines
        switch (type) {
          case "comment":
            className = "text-red-900/50 italic";
            break;
          case "keyword":
            className = "text-red-400/80 font-semibold";
            break;
          case "string":
            className = "text-red-300/80";
            break;
          case "function":
          case "class-name":
            className = "text-red-400/90";
            break;
          default:
            className = "text-red-400/70";
        }
      } else if (isAdded) {
        // Bright emerald accented highlighting for added/optimized line sections
        switch (type) {
          case "comment":
            className = "text-emerald-600/60 italic";
            break;
          case "string":
            className = "text-amber-200 font-medium";
            break;
          case "keyword":
            className = "text-cyan-400 font-semibold";
            break;
          case "function":
            className = "text-emerald-400 font-bold";
            break;
          case "class-name":
            className = "text-teal-300 font-bold";
            break;
          case "number":
            className = "text-cyan-300 font-medium";
            break;
          case "operator":
            className = "text-emerald-500 font-bold";
            break;
          case "builtin":
            className = "text-emerald-350 font-medium";
            break;
          default:
            className = "text-emerald-300 font-medium";
        }
      } else {
        // Standard rich theme code color
        switch (type) {
          case "comment":
            className = "text-zinc-650 italic";
            break;
          case "string":
            className = "text-amber-200/95 font-medium";
            break;
          case "keyword":
            className = "text-cyan-400 font-semibold";
            break;
          case "function":
            className = "text-emerald-400 font-medium";
            break;
          case "class-name":
            className = "text-teal-300 font-bold";
            break;
          case "number":
            className = "text-indigo-300 font-medium";
            break;
          case "operator":
            className = "text-zinc-450";
            break;
          case "boolean":
            className = "text-blue-400 font-semibold";
            break;
          case "builtin":
            className = "text-blue-300 font-medium";
            break;
          case "decorator":
            className = "text-pink-400 font-medium";
            break;
          case "punctuation":
            className = "text-zinc-550";
            break;
          default:
            className = "text-zinc-300";
        }
      }

      if (Array.isArray(content)) {
        return (
          <span key={idx} className={className}>
            {content.map((item, childIdx) => renderToken(item, childIdx))}
          </span>
        );
      } else if (typeof content === "object") {
        return (
          <span key={idx} className={className}>
            {renderToken(content, 0)}
          </span>
        );
      } else {
        return (
          <span key={idx} className={className}>
            {content}
          </span>
        );
      }
    };

    return <>{tokens.map((t, idx) => renderToken(t, idx))}</>;
  } catch (err) {
    return <span>{line}</span>;
  }
}

export function CodeDiffViewer({ originalCode, optimizedCode }: CodeDiffViewerProps) {
  const [viewMode, setViewMode] = useState<"side-by-side" | "inline">("side-by-side");
  const [copied, setCopied] = useState(false);

  // Compute the diff rows using LCS (Longest Common Subsequence)
  const { alignedRows, inlineItems } = useMemo(() => {
    const X = originalCode.split(/\r?\n/);
    const Y = optimizedCode.split(/\r?\n/);
    const n = X.length;
    const m = Y.length;

    // dp[i][j] stores length of LCS
    const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));

    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= m; j++) {
        if (X[i - 1] === Y[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
      }
    }

    // Backtrack to get alignment
    let i = n;
    let j = m;
    const alignedRev: AlignedDiffRow[] = [];
    const inlineRev: InlineDiffItem[] = [];

    while (i > 0 || j > 0) {
      if (i > 0 && j > 0 && X[i - 1] === Y[j - 1]) {
        const lineVal = X[i - 1];
        alignedRev.push({
          left: { type: "unchanged", value: lineVal, lineNum: i },
          right: { type: "unchanged", value: lineVal, lineNum: j },
        });
        inlineRev.push({
          type: "unchanged",
          value: lineVal,
          originalLineNum: i,
          optimizedLineNum: j,
        });
        i--;
        j--;
      } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
        const lineVal = Y[j - 1];
        alignedRev.push({
          left: { type: "empty", value: "" },
          right: { type: "added", value: lineVal, lineNum: j },
        });
        inlineRev.push({
          type: "added",
          value: lineVal,
          optimizedLineNum: j,
        });
        j--;
      } else {
        const lineVal = X[i - 1];
        alignedRev.push({
          left: { type: "removed", value: lineVal, lineNum: i },
          right: { type: "empty", value: "" },
        });
        inlineRev.push({
          type: "removed",
          value: lineVal,
          originalLineNum: i,
        });
        i--;
      }
    }

    return {
      alignedRows: alignedRev.reverse(),
      inlineItems: inlineRev.reverse(),
    };
  }, [originalCode, optimizedCode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(optimizedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-[#0a0a0d] border border-zinc-900 rounded-xl overflow-hidden flex flex-col shadow-lg">
      {/* Header controls */}
      <div className="bg-zinc-900/40 px-4 py-2.5 border-b border-zinc-950 flex flex-wrap gap-2 items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="h-3.5 w-3.5 text-cyan-400" />
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">
            Interactive Diff Inspector
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode toggler */}
          <div className="flex bg-zinc-950 rounded-lg p-0.5 border border-zinc-900">
            <button
              onClick={() => setViewMode("side-by-side")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[9px] font-mono uppercase tracking-wider transition-all ${
                viewMode === "side-by-side"
                  ? "bg-cyan-500 text-zinc-950 font-black"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
              title="Side-by-side view"
            >
              <Columns className="h-3 w-3" />
              <span className="hidden sm:inline">Split</span>
            </button>
            <button
              onClick={() => setViewMode("inline")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[9px] font-mono uppercase tracking-wider transition-all ${
                viewMode === "inline"
                  ? "bg-cyan-500 text-zinc-950 font-black"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
              title="Unified inline view"
            >
              <List className="h-3 w-3" />
              <span className="hidden sm:inline">Unified</span>
            </button>
          </div>

          {/* Copy optimized code */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-[9px] font-mono uppercase tracking-wider bg-zinc-900 hover:bg-zinc-800 border border-zinc-800/80 hover:border-zinc-700/80 rounded-lg px-2.5 py-1 text-zinc-400 hover:text-white transition-all"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 text-emerald-400" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code diff display zone */}
      <div className="text-[11px] font-mono overflow-auto max-h-[460px] custom-scrollbar selection:bg-cyan-500/20">
        {viewMode === "side-by-side" ? (
          <div className="min-w-[650px] grid grid-cols-2 divide-x divide-zinc-900 border-b border-zinc-900/50">
            {/* Left side: Original */}
            <div className="flex flex-col bg-[#08080a]/30">
              <div className="sticky top-0 bg-zinc-950/90 backdrop-blur-sm px-4 py-1.5 border-b border-zinc-900/80 text-[9px] text-zinc-500 uppercase tracking-widest font-bold flex justify-between">
                <span>Original Code</span>
                <span className="text-red-400 font-normal">[-] Deletion Lines</span>
              </div>
              <div className="pt-2 pb-4">
                {alignedRows.map((row, idx) => {
                  const isRemoved = row.left.type === "removed";
                  const isEmpty = row.left.type === "empty";
                  return (
                    <div
                      key={`left-${idx}`}
                      className={`group flex items-start transition-colors duration-150 ${
                        isRemoved
                          ? "bg-red-950/15 border-l-2 border-red-500/50"
                          : isEmpty
                          ? "bg-zinc-950/30 opacity-20"
                          : "hover:bg-zinc-900/20"
                      }`}
                    >
                      {/* Line number */}
                      <span className="w-10 text-right pr-3 select-none text-[9px] text-zinc-500 font-bold font-mono pt-0.5">
                        {row.left.lineNum || ""}
                      </span>
                      {/* Sign */}
                      <span className="w-4 select-none text-center font-bold font-mono pt-0.5 max-sm:text-[9px] text-red-500/80">
                        {isRemoved ? "-" : " "}
                      </span>
                      {/* Code line content */}
                      <pre className={`flex-1 overflow-x-auto pr-4 whitespace-pre pt-0.5 ${
                        isRemoved ? "text-red-400 line-through decoration-red-900/50" : "text-zinc-500"
                      }`}>
                        <HighlightPythonLine line={row.left.value} isRemoved={isRemoved} />
                      </pre>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right side: Optimized */}
            <div className="flex flex-col bg-[#090a0d]/30">
              <div className="sticky top-0 bg-zinc-950/90 backdrop-blur-sm px-4 py-1.5 border-b border-zinc-900/80 text-[9px] text-zinc-500 uppercase tracking-widest font-bold flex justify-between">
                <span>Optimized Code</span>
                <span className="text-emerald-400 font-normal">[+] Addition Lines</span>
              </div>
              <div className="pt-2 pb-4">
                {alignedRows.map((row, idx) => {
                  const isAdded = row.right.type === "added";
                  const isEmpty = row.right.type === "empty";
                  return (
                    <div
                      key={`right-${idx}`}
                      className={`group flex items-start transition-colors duration-150 ${
                        isAdded
                          ? "bg-emerald-950/15 border-l-2 border-emerald-500/50 font-medium"
                          : isEmpty
                          ? "bg-zinc-950/30 opacity-20"
                          : "hover:bg-zinc-900/20"
                      }`}
                    >
                      {/* Line number */}
                      <span className="w-10 text-right pr-3 select-none text-[9px] text-zinc-500 font-bold font-mono pt-0.5">
                        {row.right.lineNum || ""}
                      </span>
                      {/* Sign */}
                      <span className="w-4 select-none text-center font-bold font-mono pt-0.5 max-sm:text-[9px] text-emerald-500/85">
                        {isAdded ? "+" : " "}
                      </span>
                      {/* Code line content */}
                      <pre className={`flex-1 overflow-x-auto pr-4 whitespace-pre pt-0.5 ${
                        isAdded ? "text-emerald-400" : "text-zinc-300"
                      }`}>
                        <HighlightPythonLine line={row.right.value} isAdded={isAdded} />
                      </pre>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* Unified / Inline view */
          <div className="w-full flex flex-col bg-[#08080a]/40 divide-y divide-zinc-950/40">
            <div className="sticky top-0 bg-zinc-950/90 backdrop-blur-sm px-4 py-1.5 border-b border-zinc-900/80 text-[9px] text-zinc-500 uppercase tracking-widest font-bold flex gap-4">
              <span>Unified Diff Map</span>
              <div className="flex gap-3">
                <span className="text-red-400">[-] Red means Legacy / Deleted</span>
                <span className="text-emerald-400">[+] Green means Refactored / Added</span>
              </div>
            </div>

            <div className="pt-2 pb-4">
              {inlineItems.map((item, idx) => {
                const isRemoved = item.type === "removed";
                const isAdded = item.type === "added";
                return (
                  <div
                    key={`inline-${idx}`}
                    className={`group flex items-start transition-colors duration-150 ${
                      isRemoved
                        ? "bg-red-950/15 border-l-2 border-red-500/50"
                        : isAdded
                        ? "bg-emerald-950/15 border-l-2 border-emerald-500/50"
                        : "hover:bg-zinc-900/20"
                    }`}
                  >
                    {/* Line numbers (Original vs Optimized) */}
                    <span className="w-8 text-right pr-1 select-none text-[8.5px] text-zinc-500 font-bold font-mono pt-0.5">
                      {item.originalLineNum || ""}
                    </span>
                    <span className="w-8 text-right pr-2.5 select-none text-[8.5px] text-zinc-500 font-bold font-mono pt-0.5">
                      {item.optimizedLineNum || ""}
                    </span>
                    {/* Sign */}
                    <span className={`w-4 select-none text-center font-bold font-mono pt-0.5 max-sm:text-[9px] ${
                      isRemoved ? "text-red-500/80" : isAdded ? "text-emerald-500/80" : "text-zinc-500"
                    }`}>
                      {isRemoved ? "-" : isAdded ? "+" : " "}
                    </span>
                    {/* Code content */}
                    <pre className={`flex-1 overflow-x-auto pr-4 whitespace-pre pt-0.5 ${
                      isRemoved
                        ? "text-red-400 line-through decoration-red-900/40"
                        : isAdded
                        ? "text-emerald-400 font-medium"
                        : "text-zinc-400"
                    }`}>
                      <HighlightPythonLine line={item.value} isRemoved={isRemoved} isAdded={isAdded} />
                    </pre>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Legend / Info Footer */}
      <div className="bg-zinc-900/20 px-4 py-2 border-t border-zinc-900 text-[10px] text-zinc-500 flex items-center gap-1.5 font-mono">
        <span className="inline-block w-2.5 h-2.5 bg-red-950/60 border border-red-900/40 rounded-sm"></span>
        <span className="mr-4">Deletions Highlighted</span>
        <span className="inline-block w-2.5 h-2.5 bg-emerald-950/60 border border-emerald-900/40 rounded-sm"></span>
        <span>Additions / Performance Fixes Highlighted</span>
      </div>
    </div>
  );
}
