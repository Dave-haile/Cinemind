import { useCallback, useEffect, useRef, useState } from "react";

interface VideoProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
  videoRef: React.RefObject<HTMLVideoElement>;
}

const VideoProgressBar = ({
  currentTime,
  duration,
  onSeek,
  videoRef,
}: VideoProgressBarProps) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const previewVideoRef = useRef<HTMLVideoElement>(null);

  const [isHovering, setIsHovering] = useState(false);
  const [hoverPosition, setHoverPosition] = useState(0);
  const [hoverTime, setHoverTime] = useState(0);
  const [previewReady, setPreviewReady] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const calculateTimeFromPosition = useCallback(
    (clientX: number) => {
      if (!progressRef.current || duration <= 0) return 0;

      const rect = progressRef.current.getBoundingClientRect();
      const position = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percentage = position / rect.width;
      return percentage * duration;
    },
    [duration]
  );

  const updatePreview = useCallback(
    (time: number) => {
      const previewVideo = previewVideoRef.current;
      const canvas = previewCanvasRef.current;

      if (!previewVideo || !canvas || !previewReady) return;

      previewVideo.currentTime = time;
    },
    [previewReady]
  );

  const handlePreviewFrame = useCallback(() => {
    const previewVideo = previewVideoRef.current;
    const canvas = previewCanvasRef.current;

    if (!previewVideo || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(previewVideo, 0, 0, canvas.width, canvas.height);
  }, []);

  useEffect(() => {
    const previewVideo = previewVideoRef.current;
    if (!previewVideo) return;

    const handleSeeked = () => handlePreviewFrame();
    previewVideo.addEventListener("seeked", handleSeeked);

    return () => previewVideo.removeEventListener("seeked", handleSeeked);
  }, [handlePreviewFrame]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!progressRef.current) return;

      const rect = progressRef.current.getBoundingClientRect();
      const position = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const time = calculateTimeFromPosition(e.clientX);

      setHoverPosition(position);
      setHoverTime(time);
      updatePreview(time);

      if (isDragging) {
        onSeek(time);
      }
    },
    [calculateTimeFromPosition, isDragging, onSeek, updatePreview]
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const time = calculateTimeFromPosition(e.clientX);
    onSeek(time);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseUp = () => setIsDragging(false);
      window.addEventListener("mouseup", handleGlobalMouseUp);
      return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
    }
  }, [isDragging]);

  useEffect(() => {
    const mainVideo = videoRef.current;
    const previewVideo = previewVideoRef.current;

    if (mainVideo && previewVideo && mainVideo.src) {
      previewVideo.src = mainVideo.src;
      previewVideo.preload = "metadata";

      const handleLoadedData = () => setPreviewReady(true);
      previewVideo.addEventListener("loadeddata", handleLoadedData);

      return () => previewVideo.removeEventListener("loadeddata", handleLoadedData);
    }
  }, [videoRef]);

  const previewWidth = 160;
  const previewHeight = 90;

  return (
    <div className="relative group">
      <video
        ref={previewVideoRef}
        className="hidden"
        muted
        playsInline
        preload="metadata"
      />

      {isHovering && duration > 0 && (
        <div
          className="absolute bottom-full mb-3 transform -translate-x-1/2 z-50 pointer-events-none"
          style={{
            left: Math.max(
              previewWidth / 2,
              Math.min(
                hoverPosition,
                // eslint-disable-next-line react-hooks/refs
                (progressRef.current?.offsetWidth || 0) - previewWidth / 2
              )
            ),
          }}
        >
          <div className="bg-card border border-border rounded-lg overflow-hidden shadow-xl">
            <canvas
              ref={previewCanvasRef}
              width={previewWidth}
              height={previewHeight}
              className="bg-secondary"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-2">
              <p className="text-center text-sm font-mono text-foreground font-medium">
                {formatTime(hoverTime)}
              </p>
            </div>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-3 h-3 bg-card border-r border-b border-border rotate-45" />
        </div>
      )}

      <div
        ref={progressRef}
        className="relative h-1 group-hover:h-2 transition-all duration-200 bg-white/20 rounded-full cursor-pointer"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
          setIsDragging(false);
        }}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <div
          className="absolute inset-y-0 left-0 bg-white/30 rounded-full"
          style={{ width: `${progress + 10}%` }}
        />

        <div
          className="absolute inset-y-0 left-0 bg-primary rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />

        {isHovering && (
          <div
            className="absolute inset-y-0 w-0.5 bg-white/60"
            style={{ left: hoverPosition }}
          />
        )}

        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 rounded-full bg-primary shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100"
          style={{ left: `calc(${progress}% - 6px)` }}
        />
      </div>
    </div>
  );
};

export default VideoProgressBar;

// pr 15-00333
// pr 12-00457
// pr 14-00235

// istv-lhv-2018-00082
// giv-lhv-2018-00303
// giv-msp-2018-00055

// grv-lhv-2018-00299
// grv-msp-2018-00173