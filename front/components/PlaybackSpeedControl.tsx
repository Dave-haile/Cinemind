import { useState } from "react";
import { Gauge } from "lucide-react";

interface PlaybackSpeedControlProps {
  speed: number;
  onSpeedChange: (speed: number) => void;
}

const SPEED_OPTIONS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

const PlaybackSpeedControl = ({
  speed,
  onSpeedChange,
}: PlaybackSpeedControlProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSpeedSelect = (newSpeed: number) => {
    onSpeedChange(newSpeed);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="text-foreground/80 hover:text-foreground hover:bg-white/10 relative flex h-9 w-9 items-center justify-center rounded-md border border-transparent bg-transparent text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        title="Playback Speed"
      >
        {speed !== 1 ? (
          <span className="text-xs font-bold">{speed}x</span>
        ) : (
          <Gauge className="w-5 h-5 md:w-6 md:h-6" />
        )}
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-1/2 z-50 mb-2 w-32 -translate-x-1/2 rounded-md border border-border bg-card/95 p-2 text-foreground shadow-lg backdrop-blur-md">
          <div className="space-y-1">
            <p className="mb-2 text-center text-xs font-medium text-muted-foreground">
              Playback Speed
            </p>
            {SPEED_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleSpeedSelect(option)}
                className={`w-full px-3 py-1.5 text-left text-sm rounded-md transition-colors hover:bg-secondary 
                  ${speed === option ? "bg-primary text-primary-foreground font-medium" : "text-foreground"}
                `}
              >
                {option === 1 ? "Normal" : `${option}x`}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaybackSpeedControl;