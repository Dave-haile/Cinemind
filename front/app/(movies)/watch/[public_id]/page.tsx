"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft,
    Maximize,
    Minimize,
    Pause,
    PictureInPicture2,
    Play,
    RotateCcw,
    RotateCw,
    SkipBack,
    SkipForward,
    Volume2,
    VolumeX,
} from "lucide-react";
import Image from "next/image";
import VideoProgressBar from "@/components/VideoProgressBar";
import PlaybackSpeedControl from "@/components/PlaybackSpeedControl";
import { cn } from "@/lib/utils";
import { Movie } from "@/types";

const WatchMovie = () => {
    const params = useParams<{ public_id: string }>();
    const router = useRouter();
    const publicId = params?.public_id ?? "";

    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [movie, setMovie] = useState<Movie | null>(null);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isPiP, setIsPiP] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);

    const controlsTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

    useEffect(() => {
        if (!publicId) {
            setLoading(false);
            return;
        }
        const abort = new AbortController();
        const fetchData = async () => {
            try {
                const [movieRes, listRes] = await Promise.all([
                    fetch(`/api/movies/${publicId}`, { signal: abort.signal }),
                    fetch(`/api/movies?limit=50`, { signal: abort.signal }),
                ]);
                if (movieRes.ok) {
                    const data = await movieRes.json();
                    setMovie(data);
                }
                if (listRes.ok) {
                    const listData = await listRes.json();
                    const list = Array.isArray(listData)
                        ? listData
                        : listData?.data ?? [];
                    setMovies(list);
                }
            } catch (e) {
                if ((e as Error).name !== "AbortError") {
                    console.error("Failed to fetch watch data:", e);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        return () => abort.abort();
    }, [publicId]);

    const currentIndex = movies.findIndex(
        (movieItem: Movie) => movieItem.public_id === publicId
    );
    const prevMovie = currentIndex > 0 ? movies[currentIndex - 1] : null;
    const nextMovie =
        currentIndex >= 0 && currentIndex < movies.length - 1
            ? movies[currentIndex + 1]
            : null;

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        video.playbackRate = playbackSpeed;
        video.volume = isMuted ? 0 : volume;
    }, [isMuted, playbackSpeed, volume]);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () =>
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleEnterPiP = () => setIsPiP(true);
        const handleLeavePiP = () => setIsPiP(false);

        video.addEventListener("enterpictureinpicture", handleEnterPiP);
        video.addEventListener("leavepictureinpicture", handleLeavePiP);

        return () => {
            video.removeEventListener("enterpictureinpicture", handleEnterPiP);
            video.removeEventListener("leavepictureinpicture", handleLeavePiP);
        };
    }, []);

    const showControlsTemporarily = () => {
        setShowControls(true);
        if (controlsTimeoutRef.current) {
            clearTimeout(controlsTimeoutRef.current);
        }
        controlsTimeoutRef.current = setTimeout(() => {
            setShowControls(false);
        }, 3000);
    };

    const togglePlay = () => {
        const video = videoRef.current;
        if (!video) return;

        if (!video.paused && !video.ended) {
            video.pause();
        } else {
            const playPromise = video.play();
            if (playPromise && typeof playPromise.catch === "function") {
                playPromise.catch((error) => {
                    console.error("Video play() failed:", error);
                });
            }
        }
        showControlsTemporarily();
    };

    const skip = (seconds: number) => {
        const video = videoRef.current;
        if (!video) return;
        const end = Number.isFinite(duration) ? duration : video.duration;
        const maxTime = Number.isFinite(end) ? end : 0;
        video.currentTime = Math.max(
            0,
            Math.min(video.currentTime + seconds, maxTime || Infinity)
        );
        showControlsTemporarily();
    };

    const handleSeek = (time: number) => {
        const video = videoRef.current;
        if (!video) return;
        video.currentTime = time;
        setCurrentTime(time);
    };

    const handleSpeedChange = (speed: number) => {
        const video = videoRef.current;
        if (!video) return;
        video.playbackRate = speed;
        setPlaybackSpeed(speed);
    };

    const handleVolumeChange = (value: number[]) => {
        const video = videoRef.current;
        if (!video) return;
        const newVolume = value[0];
        video.volume = newVolume;
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
    };

    const toggleMute = () => {
        const video = videoRef.current;
        if (!video) return;

        if (isMuted) {
            video.volume = volume || 1;
            setIsMuted(false);
        } else {
            video.volume = 0;
            setIsMuted(true);
        }
    };

    const toggleFullscreen = async () => {
        if (!containerRef.current) return;

        if (!document.fullscreenElement) {
            await containerRef.current.requestFullscreen();
        } else {
            await document.exitFullscreen();
        }
    };

    const togglePiP = async () => {
        const video = videoRef.current;
        if (!video) return;

        try {
            if (document.pictureInPictureElement) {
                await document.exitPictureInPicture();
            } else if (document.pictureInPictureEnabled) {
                await video.requestPictureInPicture();
            }
        } catch (error) {
            console.error("PiP error:", error);
        }
    };

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            switch (e.key) {
                case " ":
                    e.preventDefault();
                    togglePlay();
                    break;
                case "ArrowLeft":
                    skip(-5);
                    break;
                case "ArrowRight":
                    skip(5);
                    break;
                case "f":
                    void toggleFullscreen();
                    break;
                case "m":
                    toggleMute();
                    break;
                case "Escape":
                    if (isFullscreen) {
                        void toggleFullscreen();
                    }
                    break;
                default:
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [isFullscreen, isPlaying, duration, volume]);

    const isPiPSupported =
        typeof document !== "undefined" && "pictureInPictureEnabled" in document;

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

    const navigateToMovie = (nextPublicId: string) => {
        router.push(`/watch/${nextPublicId}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!movie) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Movie not found</h1>
                    <Link href="/" className="text-primary hover:underline">
                        Go back home
                    </Link>
                </div>
            </div>
        );
    }

    const videoUrl = movie.video_url;

    return (
        <div
            ref={containerRef}
            className="min-h-screen bg-black flex flex-col"
            onMouseMove={showControlsTemporarily}
            onTouchStart={showControlsTemporarily}
        >
            <div className="relative flex-1 flex items-center justify-center">
                <video
                    ref={videoRef}
                    src={videoUrl}
                    className="w-full h-full object-contain max-h-screen"
                    onClick={togglePlay}
                    onTimeUpdate={(e) =>
                        setCurrentTime((e.currentTarget as HTMLVideoElement).currentTime)
                    }
                    onLoadedMetadata={(e) => {
                        const v = e.currentTarget as HTMLVideoElement;
                        setDuration(v.duration);
                        setIsLoading(false);
                    }}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onWaiting={() => setIsLoading(true)}
                    onCanPlay={() => setIsLoading(false)}
                    playsInline
                />

                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20 pointer-events-none">
                        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                )}

                <div
                    className={cn(
                        "absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 z-20",
                        showControls ? "opacity-100" : "opacity-0"
                    )}
                >
                    <button
                        onClick={togglePlay}
                        className="gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-[hsl(240_10%_4%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(0_72%_51%)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[hsl(0_72%_51%)] text-[hsl(0_0%_100%)] hover:bg-[hsl(0_72%_51%/0.9)] px-8 w-20 h-20 md:w-24 md:h-24 bg-primary/80 backdrop-blur-sm flex items-center justify-center pointer-events-auto hover:bg-primary transition-colors"
                    >
                        {isPlaying ? (
                            <>
                                <Pause className="w-10 h-10 md:w-12 md:h-12 text-primary-foreground" />
                            </>
                        ) : (
                            <Play className="w-10 h-10 md:w-12 md:h-12 text-primary-foreground ml-1" />
                        )}
                    </button>
                </div>

                <div
                    className={cn(
                        "absolute top-0 left-0 right-0 p-4 md:p-6 bg-linear-to-b from-black/80 to-transparent transition-opacity duration-300 z-20",
                        showControls ? "opacity-100" : "opacity-0"
                    )}
                >
                    <div className="flex items-center gap-4">
                        <Link
                            href={`/movie/${publicId}`}
                            className="flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
                            <span className="hidden sm:inline">Back to Details</span>
                        </Link>
                        <div className="flex-1 text-center">
                            <h1 className="text-lg md:text-xl font-semibold truncate">
                                {movie.title}
                            </h1>
                        </div>
                        <div className="w-24 hidden sm:block" />
                    </div>
                </div>

                <div
                    className={cn(
                        "absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/90 via-black/60 to-transparent transition-opacity duration-300 z-20",
                        showControls ? "opacity-100" : "opacity-0"
                    )}
                >
                    <div className="px-4 md:px-6 pb-2">
                        <VideoProgressBar
                            currentTime={currentTime}
                            duration={duration}
                            onSeek={handleSeek}
                            videoRef={videoRef as React.RefObject<HTMLVideoElement>}
                        />
                    </div>

                    <div className="px-4 md:px-6 pb-4 md:pb-6 flex items-center justify-between gap-2 md:gap-4">
                        <div className="flex items-center gap-1 md:gap-2">
                            <button
                                onClick={() =>
                                    prevMovie && navigateToMovie(prevMovie.public_id)
                                }
                                disabled={!prevMovie}
                                className="text-foreground/80 hover:text-foreground hover:bg-white/10 disabled:opacity-30"
                            >
                                <SkipBack className="w-5 h-5 md:w-6 md:h-6" />
                            </button>

                            <button
                                onClick={() => skip(-5)}
                                className="text-foreground/80 hover:text-foreground hover:bg-white/10"
                            >
                                <RotateCcw className="w-5 h-5 md:w-6 md:h-6" />
                            </button>

                            <button
                                onClick={togglePlay}
                                className="text-foreground/80 hover:text-foreground hover:bg-white/10"
                            >
                                {isPlaying ? (
                                    <Pause className="w-6 h-6 md:w-7 md:h-7" />
                                ) : (
                                    <Play className="w-6 h-6 md:w-7 md:h-7" />
                                )}
                            </button>

                            <button
                                onClick={() => skip(5)}
                                className="text-foreground/80 hover:text-foreground hover:bg-white/10"
                            >
                                <RotateCw className="w-5 h-5 md:w-6 md:h-6" />
                            </button>

                            <button
                                onClick={() =>
                                    nextMovie && navigateToMovie(nextMovie.public_id)
                                }
                                disabled={!nextMovie}
                                className="text-foreground/80 hover:text-foreground hover:bg-white/10 disabled:opacity-30"
                            >
                                <SkipForward className="w-5 h-5 md:w-6 md:h-6" />
                            </button>

                            <div className="hidden sm:flex items-center gap-2 ml-2">
                                <button
                                    onClick={toggleMute}
                                    className="text-foreground/80 hover:text-foreground hover:bg-white/10"
                                >
                                    {isMuted ? (
                                        <VolumeX className="w-5 h-5 md:w-6 md:h-6" />
                                    ) : (
                                        <Volume2 className="w-5 h-5 md:w-6 md:h-6" />
                                    )}
                                </button>
                                <input
                                    type="range"
                                    min={0}
                                    max={1}
                                    step={0.1}
                                    value={isMuted ? 0 : volume}
                                    onChange={(e) =>
                                        handleVolumeChange([Number(e.target.value)])
                                    }
                                    className="w-20 md:w-24 h-2 rounded-full appearance-none bg-white/20 accent-primary cursor-pointer"
                                />
                            </div>
                        </div>

                        <div className="text-sm md:text-base text-foreground/80 font-mono">
                            {formatTime(currentTime)} / {formatTime(duration)}
                        </div>

                        <div className="flex items-center gap-1 md:gap-2">
                            <button
                                onClick={toggleMute}
                                className="sm:hidden text-foreground/80 hover:text-foreground hover:bg-white/10"
                            >
                                {isMuted ? (
                                    <VolumeX className="w-5 h-5" />
                                ) : (
                                    <Volume2 className="w-5 h-5" />
                                )}
                            </button>

                            <PlaybackSpeedControl
                                speed={playbackSpeed}
                                onSpeedChange={handleSpeedChange}
                            />

                            {isPiPSupported && (
                                <button
                                    onClick={togglePiP}
                                    className={cn(
                                        "text-foreground/80 hover:text-foreground hover:bg-white/10",
                                        isPiP && "text-primary"
                                    )}
                                    title="Picture-in-Picture"
                                >
                                    <PictureInPicture2 className="w-5 h-5 md:w-6 md:h-6" />
                                </button>
                            )}

                            <button
                                onClick={toggleFullscreen}
                                className="text-foreground/80 hover:text-foreground hover:bg-white/10"
                            >
                                {isFullscreen ? (
                                    <Minimize className="w-5 h-5 md:w-6 md:h-6" />
                                ) : (
                                    <Maximize className="w-5 h-5 md:w-6 md:h-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="absolute inset-0 flex pointer-events-none z-10">
                    <div
                        className="flex-1 flex items-center justify-center pointer-events-auto"
                        onClick={() => skip(-5)}
                        aria-label="Rewind 5 seconds"
                    />
                    <div className="flex-1 pointer-events-none" />
                    <div
                        className="flex-1 flex items-center justify-center pointer-events-auto"
                        onClick={() => skip(5)}
                        aria-label="Forward 5 seconds"
                    />
                </div>
            </div>

            {!isFullscreen && (
                <div className="bg-card border-t border-border p-4">
                    <div className="container mx-auto flex items-center gap-4">
                        <div className="relative w-12 h-16 md:w-16 md:h-20 shrink-0 rounded overflow-hidden">
                            <Image
                                fill
                                src={movie.cover_img ?? "/placeholder-poster.png"}
                                alt={movie.title}
                                className="object-cover"
                                sizes="(max-width: 768px) 48px, 64px"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h2 className="font-semibold truncate">{movie.title}</h2>
                            <p className="text-sm text-muted-foreground">
                                {movie.release_year} • {movie.genres?.join(", ") ?? ""}
                            </p>
                        </div>
                        {nextMovie && (
                            <div className="hidden md:flex items-center gap-3">
                                <span className="text-sm text-muted-foreground">Up Next:</span>
                                <button
                                    onClick={() => navigateToMovie(nextMovie.public_id)}
                                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-colors"
                                >
                                    <div className="relative w-10 h-14 shrink-0 rounded overflow-hidden">
                                        <Image
                                            fill
                                            src={nextMovie.cover_img ?? "/placeholder-poster.png"}
                                            alt={nextMovie.title}
                                            className="object-cover"
                                            sizes="40px"
                                        />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-medium text-sm truncate max-w-32">
                                            {nextMovie.title}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {nextMovie.release_year}
                                        </p>
                                    </div>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default WatchMovie;