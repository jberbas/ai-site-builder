// components/editor/Sidebar.tsx
import type { FC } from "react";

const navSectionClasses =
  "mt-6 text-xs font-semibold uppercase tracking-wide text-slate-400 px-3";

const navItemClasses =
  "flex items-center gap-2 px-3 py-2 rounded-lg text-sm cursor-pointer select-none transition-colors hover:bg-slate-800/70 hover:text-slate-50";

type NavItem = {
  label: string;
  icon: string;
  active?: boolean;
};

const primaryItems: NavItem[] = [
  { label: "Pages", icon: "📄", active: true },
  { label: "Design", icon: "🎨" },
  { label: "Assets", icon: "🗂️" },
];

const assistantItems: NavItem[] = [
  { label: "AI Chat", icon: "🤖" },
  { label: "Prompts", icon: "💬" },
];

const accountItems: NavItem[] = [{ label: "Settings", icon: "⚙️" }];

export const Sidebar: FC = () => {
  return (
    <aside className="hidden md:flex w-64 flex-col border-r border-slate-800 bg-slate-950/95 backdrop-blur-lg">
      {/* Logo / Brand */}
      <div className="h-16 flex items-center px-4 border-b border-slate-800">
        <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 shadow-lg shadow-cyan-500/40 flex items-center justify-center text-xl">
          ⚡
        </div>
        <div className="ml-3 leading-tight">
          <div className="text-sm font-semibold tracking-wide">
            Nebula Sites
          </div>
          <div className="text-[11px] text-slate-400">AI Website Studio</div>
        </div>
      </div>

      {/* Scrollable nav area */}
      <div className="flex-1 overflow-y-auto py-4 space-y-6">
        {/* Workspace */}
        <div>
          <div className={navSectionClasses}>Workspace</div>
          <nav className="mt-2 space-y-1">
            {primaryItems.map((item) => (
              <button
                key={item.label}
                type="button"
                className={`${navItemClasses} ${
                  item.active
                    ? "bg-slate-800/80 text-slate-50"
                    : "text-slate-300"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
                {item.active && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Assistant */}
        <div>
          <div className={navSectionClasses}>Assistant</div>
          <nav className="mt-2 space-y-1">
            {assistantItems.map((item) => (
              <button
                key={item.label}
                type="button"
                className={`${navItemClasses} text-slate-300`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Account */}
        <div>
          <div className={navSectionClasses}>Account</div>
          <nav className="mt-2 space-y-1">
            {accountItems.map((item) => (
              <button
                key={item.label}
                type="button"
                className={`${navItemClasses} text-slate-300`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Bottom project switcher / status */}
      <div className="border-t border-slate-800 px-3 py-3 text-xs text-slate-400 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
          <span>Live editor</span>
        </div>
        <span className="text-[11px] px-2 py-1 rounded-full bg-slate-900 border border-slate-700/70">
          Beta
        </span>
      </div>
    </aside>
  );
};
