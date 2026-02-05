import { Subtitles } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

interface SubtitleTrack {
  id: string;
  label: string;
  language: string;
  src: string;
}

interface SubtitlesControlProps {
  tracks: SubtitleTrack[];
  activeTrack: string | null;
  onTrackChange: (trackId: string | null) => void;
}

const SubtitlesControl = ({ tracks, activeTrack, onTrackChange }: SubtitlesControlProps) => {
  const hasSubtitles = tracks.length > 0;
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      const el = containerRef.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) {
        setOpen(false);
      }
    };

    window.addEventListener("mousedown", onPointerDown);
    window.addEventListener("touchstart", onPointerDown);
    return () => {
      window.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("touchstart", onPointerDown);
    };
  }, [open]);

  const handleTrackChange = (trackId: string | null) => {
    onTrackChange(trackId);
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
        <button
          type="button"
          className={cn(
            "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 w-10",
            "text-foreground/80 hover:text-foreground hover:bg-white/10",
            activeTrack && "text-primary",
          )}
          title="Subtitles"
          aria-haspopup="menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <Subtitles className="w-5 h-5 md:w-6 md:h-6" />
        </button>

      {open ? (
        <div
          role="menu"
          className={cn(
            "absolute right-0 mt-2 z-50 w-48 rounded-md border bg-card/95 p-2 text-foreground shadow-md backdrop-blur-sm",
            "border-border",
          )}
        >
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground px-2 py-1 font-medium">
            Subtitles
          </p>
          
          <button
            type="button"
            onClick={() => handleTrackChange(null)}
            className={cn(
              "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
              activeTrack === null
                ? "bg-primary text-primary-foreground"
                : "hover:bg-secondary text-foreground"
            )}
          >
            Off
          </button>
          
          {hasSubtitles ? (
            tracks.map((track) => (
              <button
                key={track.id}
                type="button"
                onClick={() => handleTrackChange(track.id)}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                  activeTrack === track.id
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-secondary text-foreground"
                )}
              >
                {track.label}
              </button>
            ))
          ) : (
            <p className="px-3 py-2 text-sm text-muted-foreground italic">
              No subtitles available
            </p>
          )}
        </div>
        </div>
      ) : null}
    </div>
  );
};

export default SubtitlesControl;
