import { X } from "lucide-react";

interface KeyboardShortcutsOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const shortcuts = [
  { key: "Space", action: "Play / Pause" },
  { key: "←", action: "Rewind 5 seconds" },
  { key: "→", action: "Forward 5 seconds" },
  { key: "F", action: "Toggle fullscreen" },
  { key: "M", action: "Mute / Unmute" },
  { key: "C", action: "Toggle subtitles" },
  { key: "Esc", action: "Exit fullscreen" },
  { key: "?", action: "Show shortcuts" },
];

const KeyboardShortcutsOverlay = ({ isOpen, onClose }: KeyboardShortcutsOverlayProps) => {
  if (!isOpen) return null;

  return (
    <div 
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-card border border-border rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Keyboard Shortcuts</h2>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-muted-foreground hover:text-foreground hover:bg-accent"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-3">
          {shortcuts.map(({ key, action }) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-muted-foreground">{action}</span>
              <kbd className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-md font-mono text-sm border border-border">
                {key}
              </kbd>
            </div>
          ))}
        </div>
        
        <p className="mt-6 text-xs text-muted-foreground text-center">
          Press <kbd className="px-1.5 py-0.5 bg-secondary rounded text-xs">?</kbd> or click outside to close
        </p>
      </div>
    </div>
  );
};

export default KeyboardShortcutsOverlay;
