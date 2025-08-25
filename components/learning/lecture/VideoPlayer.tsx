'use client';

import React, { useRef, useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import { getYouTubeVideoId } from '@/lib/youtube';
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaExpand,
  FaCompress,
  FaForward,
  FaBackward,
} from 'react-icons/fa';

function formatTime(time: number): string {
  const minutes = Math.floor(time / 60).toString().padStart(2, '0');
  const seconds = Math.floor(time % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

export default function VideoPlayer({ url }: { url: string }) {

  const videoId = getYouTubeVideoId(url);
  if (!videoId) return <p>Invalid YouTube URL</p>;

  const playerRef = useRef<any>(null);
  const iframeRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [qualityLevels, setQualityLevels] = useState<string[]>([]);
  const [currentQuality, setCurrentQuality] = useState<string>('');
  const [isMini, setIsMini] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setIsMini(rect.bottom < 0);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handlePlayPause = () => {
    if (!playerRef.current) return;
    const player = playerRef.current;
    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
    setIsPlaying(!isPlaying);
  };

  const handleMuteToggle = () => {
    const player = playerRef.current;
    if (isMuted) {
      player.unMute();
    } else {
      player.mute();
    }
    setIsMuted(!isMuted);
  };

  const handleForward = () => {
    const player = playerRef.current;
    const current = player.getCurrentTime();
    player.seekTo(current + 10, true);
  };

  const handleRewind = () => {
    const player = playerRef.current;
    const current = player.getCurrentTime();
    player.seekTo(current - 10, true);
  };

  const handleContainerClick = () => setShowControls(!showControls);

  const resetControlsTimer = () => {
    setShowControls(true);
    clearTimeout((window as any).controlTimer);
    (window as any).controlTimer = setTimeout(() => setShowControls(false), 3000);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!playerRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = clickX / rect.width;
    const newTime = newProgress * duration;
    playerRef.current.seekTo(newTime, true);
    setCurrentTime(newTime);
    setProgress(newProgress * 100);
  };

  const handleProgressDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isDragging || !playerRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const dragX = e.clientX - rect.left;
    const newProgress = Math.max(0, Math.min(1, dragX / rect.width));
    const newTime = newProgress * duration;
    playerRef.current.seekTo(newTime, true);
    setCurrentTime(newTime);
    setProgress(newProgress * 100);
  };

  const onReady = (event: any) => {
    const player = event.target;
    playerRef.current = player;
    iframeRef.current = player.getIframe();
    setDuration(player.getDuration());
    player.playVideo();
    setIsPlaying(true);
    setTimeout(() => {
      player.unMute();
      setIsMuted(false);
    }, 500);
    const levels = player.getAvailableQualityLevels();
    setQualityLevels(levels);
    setCurrentQuality(levels.includes('auto') ? 'auto' : levels[0]);
    const update = () => {
      const time = player.getCurrentTime();
      const dur = player.getDuration();
      setCurrentTime(time);
      setProgress((time / dur) * 100);
      requestAnimationFrame(update);
    };
    update();
  };

  const onStateChange = (event: any) => {
    const state = event.data;
    switch (state) {
      case 1:
        setHasStarted(true);
        setIsPlaying(true);
        break;
      case 2:
      case 0:
        setIsPlaying(false);
        break;
    }
  };

  const opts = {
    playerVars: {
      autoplay: 1,
      controls: 0,
      modestbranding: 1,
      mute: 1,
      rel: 0,
      fs: 0,
      showinfo: 0,
    },
  };

  return (
    <div
      ref={containerRef}
      className={`relative bg-black overflow-hidden rounded-xl shadow-md transition-all duration-500
        ${isFullscreen ? 'fixed inset-0 z-50' : isMini ? 'fixed bottom-4 right-4 w-64 h-36 z-40' : 'w-full max-w-[768px] h-[220px] sm:h-[300px] md:h-[400px] lg:h-[500px]  aspect-video mx-auto'}`}
      onClick={handleContainerClick}
      onMouseMove={resetControlsTimer}
    >
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={onReady}
        onStateChange={onStateChange}
        className="absolute inset-0 z-10"
        iframeClassName="w-full h-full pointer-events-none"
      />

      {(showControls || !isPlaying) && hasStarted && (
        <div className="absolute inset-0 z-30 flex items-center justify-center gap-6">
          <button onClick={(e) => { e.stopPropagation(); handleRewind(); }} className="bg-black/60 p-3 rounded-full text-white">
            <FaBackward size={24} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); handlePlayPause(); }} className="bg-black/60 p-4 rounded-full text-white">
            {isPlaying ? <FaPause size={28} /> : <FaPlay size={28} />}
          </button>
          <button onClick={(e) => { e.stopPropagation(); handleForward(); }} className="bg-black/60 p-3 rounded-full text-white">
            <FaForward size={24} />
          </button>
        </div>
      )}

      <div
        className={`absolute bottom-0 left-0 right-0 z-30 bg-black/70 backdrop-blur-md transition-opacity duration-300
          ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'} px-2 py-2 text-xs sm:text-sm`}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button onClick={(e) => { e.stopPropagation(); handlePlayPause(); }} className="text-white">
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button onClick={(e) => { e.stopPropagation(); handleMuteToggle(); }} className="text-white">
              {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>
            <span className="text-white">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={currentQuality}
              onChange={(e) => {
                const quality = e.target.value;
                setCurrentQuality(quality);
                playerRef.current.setPlaybackQuality(quality);
              }}
              className="text-white bg-transparent border border-white rounded px-1"
              onClick={(e) => e.stopPropagation()}
            >
              {qualityLevels.map((q) => (
                <option key={q} value={q}>{q}</option>
              ))}
            </select>
            <button onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }} className="text-white">
              {isFullscreen ? <FaCompress /> : <FaExpand />}
            </button>
          </div>
        </div>
        <div
          className="w-full h-1 bg-gray-600 mt-2 relative cursor-pointer"
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseMove={handleProgressDrag}
          onClick={(e) => { e.stopPropagation(); handleProgressClick(e); }}
        >
          <div
            className="h-1 bg-red-500 absolute top-0 left-0"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}