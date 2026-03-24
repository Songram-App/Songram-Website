import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  IoAdd,
  IoCloudUpload,
  IoPause,
  IoPlay,
  IoSparkles,
  IoVolumeHigh,
  IoVolumeMute,
} from 'react-icons/io5';

interface DawPreviewProps {
  onRequestSignup: () => void;
}

interface DemoTrack {
  id: string;
  name: string;
  colorClass: string;
  filePath: string;
  clipStart: number;
  clipDuration: number;
  volume: number;
  muted: boolean;
  waveform: number[];
}

interface DragGhostState {
  trackId: string;
  clientX: number;
  clientY: number;
  width: number;
}

const TIMELINE_SECONDS = 24;
const DRAG_AXIS_LOCK_THRESHOLD = 10;
const DRAG_VERTICAL_BIAS = 4;

const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

const formatTime = (seconds: number): string => {
  const rounded = Math.max(0, seconds);
  const mins = Math.floor(rounded / 60);
  const secs = Math.floor(rounded % 60)
    .toString()
    .padStart(2, '0');
  return `${mins}:${secs}`;
};

const createWaveform = (seed: number): number[] =>
  Array.from({ length: 30 }, (_, index) => {
    const a = Math.sin(seed * 12 + index * 0.67) * 0.45;
    const b = Math.cos(seed * 7 + index * 1.12) * 0.35;
    return clamp(0.15 + a + b + 0.45, 0.08, 1);
  });

const INITIAL_TRACKS: DemoTrack[] = [
  {
    id: 'drums',
    name: 'Drums',
    colorClass: 'from-violet-500/80 to-violet-300/80',
    filePath: '/Drum.m4a',
    clipStart: 1.2,
    clipDuration: 8.6,
    volume: 0.8,
    muted: false,
    waveform: createWaveform(1),
  },
  {
    id: 'guitar',
    name: 'Guitar',
    colorClass: 'from-fuchsia-500/75 to-purple-300/75',
    filePath: '/Guitar.m4a',
    clipStart: 6.3,
    clipDuration: 10,
    volume: 0.68,
    muted: false,
    waveform: createWaveform(2),
  },
  {
    id: 'melody',
    name: 'Melody',
    colorClass: 'from-indigo-500/70 to-purple-300/70',
    filePath: '/Melody.m4a',
    clipStart: 11.1,
    clipDuration: 9.5,
    volume: 0.72,
    muted: false,
    waveform: createWaveform(3),
  },
];

const DawPreview: React.FC<DawPreviewProps> = ({ onRequestSignup }) => {
  const [tracks, setTracks] = useState<DemoTrack[]>(INITIAL_TRACKS);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playheadSeconds, setPlayheadSeconds] = useState(0);
  const [timelineWidth, setTimelineWidth] = useState(0);
  const [assistantPrompt, setAssistantPrompt] = useState('');
  const [assistantReferences, setAssistantReferences] = useState<string[]>([]);
  const [isAssistantDropActive, setIsAssistantDropActive] = useState(false);
  const [dragGhost, setDragGhost] = useState<DragGhostState | null>(null);

  const timelineRef = useRef<HTMLDivElement | null>(null);
  const assistantDropRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<{
    trackId: string;
    startX: number;
    startY: number;
    clipWidth: number;
    startClipStart: number;
    axis: 'pending' | 'horizontal' | 'vertical';
  } | null>(null);
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});
  const frameRef = useRef<number | null>(null);
  const playbackStartedAtRef = useRef<number | null>(null);
  const playheadAtPlaybackStartRef = useRef(0);

  const playheadPercent = useMemo(() => (playheadSeconds / TIMELINE_SECONDS) * 100, [playheadSeconds]);

  const setTrackAudioRef = useCallback((trackId: string, node: HTMLAudioElement | null) => {
    if (node) {
      audioRefs.current[trackId] = node;
      node.preload = 'auto';
    } else {
      delete audioRefs.current[trackId];
    }
  }, []);

  const syncAudioToTimeline = useCallback(
    (timeOnTimeline: number, shouldPlay: boolean) => {
      tracks.forEach((track) => {
        const audio = audioRefs.current[track.id];
        if (!audio) return;

        const clipEnd = track.clipStart + track.clipDuration;
        const inClipWindow = timeOnTimeline >= track.clipStart && timeOnTimeline <= clipEnd;

        if (!inClipWindow || track.muted) {
          if (!audio.paused) audio.pause();
          return;
        }

        const relativeTime = Math.max(0, timeOnTimeline - track.clipStart);
        const duration = Number.isFinite(audio.duration) ? audio.duration : 0;
        const desiredTime = duration > 0 ? relativeTime % duration : relativeTime;

        if (Math.abs(audio.currentTime - desiredTime) > 0.25) {
          audio.currentTime = desiredTime;
        }

        const nextVolume = track.volume;
        if (Math.abs(audio.volume - nextVolume) > 0.01) {
          audio.volume = nextVolume;
        }

        if (shouldPlay) {
          if (audio.paused) {
            void audio.play().catch(() => undefined);
          }
        } else if (!audio.paused) {
          audio.pause();
        }
      });
    },
    [tracks],
  );

  const seekTimeline = useCallback(
    (nextTime: number) => {
      const clamped = clamp(nextTime, 0, TIMELINE_SECONDS);
      setPlayheadSeconds(clamped);
      syncAudioToTimeline(clamped, isPlaying);

      if (isPlaying) {
        playheadAtPlaybackStartRef.current = clamped;
        playbackStartedAtRef.current = performance.now();
      }
    },
    [isPlaying, syncAudioToTimeline],
  );

  const togglePlayPause = useCallback(() => {
    setIsPlaying((previous) => {
      const next = !previous;
      if (next) {
        playheadAtPlaybackStartRef.current = playheadSeconds;
        playbackStartedAtRef.current = performance.now();
        syncAudioToTimeline(playheadSeconds, true);
      } else {
        syncAudioToTimeline(playheadSeconds, false);
      }
      return next;
    });
  }, [playheadSeconds, syncAudioToTimeline]);

  const toggleMuteTrack = useCallback((trackId: string) => {
    setTracks((previous) =>
      previous.map((track) => (track.id === trackId ? { ...track, muted: !track.muted } : track)),
    );
  }, []);

  const updateTrackVolume = useCallback((trackId: string, nextVolume: number) => {
    setTracks((previous) =>
      previous.map((track) =>
        track.id === trackId ? { ...track, volume: clamp(nextVolume, 0, 1) } : track,
      ),
    );
  }, []);

  const addAssistantReference = useCallback(
    (trackId: string) => {
      const referencedTrack = tracks.find((track) => track.id === trackId);
      if (!referencedTrack) return;

      setAssistantReferences((previous) =>
        previous.includes(trackId) ? previous : [...previous, trackId],
      );
      setAssistantPrompt((previous) =>
        previous.trim().length > 0
          ? previous
          : `Help me enhance the ${referencedTrack.name.toLowerCase()} track.`,
      );
    },
    [tracks],
  );

  const isAssistantDropTarget = useCallback((clientX: number, clientY: number) => {
    const target = assistantDropRef.current;
    if (!target) return false;
    const rect = target.getBoundingClientRect();
    return (
      clientX >= rect.left &&
      clientX <= rect.right &&
      clientY >= rect.top &&
      clientY <= rect.bottom
    );
  }, []);

  const cancelDragging = useCallback(() => {
    dragRef.current = null;
    setIsAssistantDropActive(false);
    setDragGhost(null);
  }, []);

  const finishDragging = useCallback((clientX: number, clientY: number) => {
    const dragState = dragRef.current;
    if (!dragState) {
      setIsAssistantDropActive(false);
      setDragGhost(null);
      return;
    }

    if (dragState.axis === 'vertical' && isAssistantDropTarget(clientX, clientY)) {
      addAssistantReference(dragState.trackId);
    }

    dragRef.current = null;
    setIsAssistantDropActive(false);
    setDragGhost(null);
  }, [addAssistantReference, isAssistantDropTarget]);

  useEffect(() => {
    const timelineElement = timelineRef.current;
    if (!timelineElement) return;

    const updateWidth = () => {
      setTimelineWidth(timelineElement.clientWidth);
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);

    if (typeof ResizeObserver === 'undefined') {
      return () => window.removeEventListener('resize', updateWidth);
    }

    const observer = new ResizeObserver(updateWidth);
    observer.observe(timelineElement);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      const dragState = dragRef.current;
      if (!dragState) return;

      if (event.buttons === 0) {
        finishDragging(event.clientX, event.clientY);
        return;
      }

      const deltaX = event.clientX - dragState.startX;
      const deltaY = event.clientY - dragState.startY;
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);

      let activeDragState = dragState;
      if (dragState.axis === 'pending' && (absX >= DRAG_AXIS_LOCK_THRESHOLD || absY >= DRAG_AXIS_LOCK_THRESHOLD)) {
        const nextAxis: 'horizontal' | 'vertical' =
          absY > absX + DRAG_VERTICAL_BIAS ? 'vertical' : 'horizontal';
        activeDragState = { ...dragState, axis: nextAxis };
        dragRef.current = activeDragState;
      }

      if (activeDragState.axis === 'horizontal' && timelineWidth > 0) {
        const deltaSeconds = (deltaX / timelineWidth) * TIMELINE_SECONDS;
        setTracks((previous) =>
          previous.map((track) => {
            if (track.id !== activeDragState.trackId) return track;
            const maxStart = TIMELINE_SECONDS - track.clipDuration;
            return {
              ...track,
              clipStart: clamp(activeDragState.startClipStart + deltaSeconds, 0, Math.max(0, maxStart)),
            };
          }),
        );
      }

      if (activeDragState.axis === 'vertical') {
        setIsAssistantDropActive(isAssistantDropTarget(event.clientX, event.clientY));
        setDragGhost((previous) =>
          previous
            ? {
                ...previous,
                clientX: event.clientX,
                clientY: event.clientY,
              }
            : {
                trackId: activeDragState.trackId,
                clientX: event.clientX,
                clientY: event.clientY,
                width: activeDragState.clipWidth,
              },
        );
      } else {
        setIsAssistantDropActive(false);
        setDragGhost(null);
      }
    };

    const onPointerUp = (event: PointerEvent) => {
      finishDragging(event.clientX, event.clientY);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', cancelDragging);
    window.addEventListener('blur', cancelDragging);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', cancelDragging);
      window.removeEventListener('blur', cancelDragging);
    };
  }, [timelineWidth, finishDragging, cancelDragging, isAssistantDropTarget]);

  useEffect(() => {
    if (!isPlaying) {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      syncAudioToTimeline(playheadSeconds, false);
      return;
    }

    const step = (frameTime: number) => {
      const startedAt = playbackStartedAtRef.current ?? frameTime;
      const elapsedSeconds = (frameTime - startedAt) / 1000;
      const nextPlayhead = clamp(
        playheadAtPlaybackStartRef.current + elapsedSeconds,
        0,
        TIMELINE_SECONDS,
      );

      setPlayheadSeconds(nextPlayhead);
      syncAudioToTimeline(nextPlayhead, true);

      if (nextPlayhead >= TIMELINE_SECONDS) {
        setIsPlaying(false);
        return;
      }

      frameRef.current = requestAnimationFrame(step);
    };

    frameRef.current = requestAnimationFrame(step);

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [isPlaying, playheadSeconds, syncAudioToTimeline]);

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
      Object.values(audioRefs.current).forEach((audio) => {
        audio.pause();
      });
    };
  }, []);

  useEffect(() => {
    if (!isPlaying) {
      syncAudioToTimeline(playheadSeconds, false);
    }
  }, [tracks, isPlaying, playheadSeconds, syncAudioToTimeline]);

  const onClipPointerDown = (event: React.PointerEvent<HTMLDivElement>, track: DemoTrack) => {
    event.preventDefault();
    event.stopPropagation();
    const clipRect = event.currentTarget.getBoundingClientRect();
    const clipWidth = clamp(clipRect.width, 110, 320);

    if (event.currentTarget.setPointerCapture) {
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    dragRef.current = {
      trackId: track.id,
      startX: event.clientX,
      startY: event.clientY,
      clipWidth,
      startClipStart: track.clipStart,
      axis: 'pending',
    };
  };

  const onTimelinePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement | null;
    if (target?.closest('button, input, select, textarea, a, [role="button"]')) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    if (rect.width <= 0) return;
    const ratio = clamp((event.clientX - rect.left) / rect.width, 0, 1);
    seekTimeline(ratio * TIMELINE_SECONDS);
  };

  return (
    <div className="relative rounded-[1.4rem] bg-gradient-to-br from-black to-zinc-950 p-2 sm:p-3 shadow-2xl shadow-black/50">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-16 left-1/3 h-36 w-36 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute -bottom-20 right-6 h-44 w-44 rounded-full bg-violet-400/10 blur-3xl" />
      </div>

      <div className="relative rounded-[1.1rem] border border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="flex flex-col gap-3 border-b border-white/10 px-3 py-3 sm:px-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={togglePlayPause}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-primary-500/80"
              aria-label={isPlaying ? 'Pause playback' : 'Play playback'}
            >
              {isPlaying ? <IoPause size={20} /> : <IoPlay size={20} className="ml-0.5" />}
            </button>

            <button
              type="button"
              onClick={onRequestSignup}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-medium text-gray-200 transition hover:border-primary-400/60 hover:text-white"
            >
              <IoAdd size={16} />
              Add Track
            </button>

            <div className="ml-auto flex items-center gap-2">
              <button
                type="button"
                onClick={onRequestSignup}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-3 py-2 text-xs font-semibold text-white shadow-glow transition hover:brightness-110"
              >
                <IoCloudUpload size={16} />
                Publish
              </button>
            </div>
          </div>

        </div>

        <div className="grid grid-cols-1 gap-4 p-3 sm:p-4 lg:grid-cols-[1fr_230px]">
          <div
            ref={timelineRef}
            onPointerDown={onTimelinePointerDown}
            className="space-y-3 rounded-2xl border border-white/10 bg-black/40 p-3 sm:p-4"
          >
            <div className="relative flex items-center justify-between px-2 pb-1 text-[10px] uppercase tracking-[0.18em] text-gray-500">
              {Array.from({ length: 5 }).map((_, markerIndex) => {
                const marker = (TIMELINE_SECONDS / 4) * markerIndex;
                return <span key={marker}>{formatTime(marker)}</span>;
              })}
            </div>

            {tracks.map((track) => {
              const clipLeft = (track.clipStart / TIMELINE_SECONDS) * 100;
              const clipWidth = (track.clipDuration / TIMELINE_SECONDS) * 100;
              const isAudible =
                isPlaying &&
                !track.muted &&
                playheadSeconds >= track.clipStart &&
                playheadSeconds <= track.clipStart + track.clipDuration;

              return (
                <div
                  key={track.id}
                  className="relative overflow-hidden rounded-xl bg-white/[0.04] p-2.5"
                >
                  <audio ref={(node) => setTrackAudioRef(track.id, node)} src={track.filePath} />

                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-white">{track.name}</span>
                    <button
                      type="button"
                      onClick={() => toggleMuteTrack(track.id)}
                      className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs transition ${
                        track.muted
                          ? 'bg-red-500/15 text-red-300'
                          : 'bg-white/10 text-gray-200 hover:bg-white/15'
                      }`}
                    >
                      {track.muted ? <IoVolumeMute size={14} /> : <IoVolumeHigh size={14} />}
                      {track.muted ? 'Muted' : 'Live'}
                    </button>
                  </div>

                  <div className="relative h-16 rounded-lg border border-white/10 bg-zinc-950/80">
                    <div
                      className="pointer-events-none absolute inset-0 opacity-20"
                      style={{
                        backgroundImage:
                          'linear-gradient(to right, rgba(255,255,255,0.18) 1px, transparent 1px)',
                        backgroundSize: '8.33% 100%',
                      }}
                    />

                    <div
                      className="pointer-events-none absolute inset-y-0 w-px bg-primary-400/90 shadow-[0_0_12px_rgba(136,99,237,0.75)]"
                      style={{ left: `${playheadPercent}%` }}
                    />

                    <motion.div
                      role="button"
                      tabIndex={0}
                      onPointerDown={(event) => onClipPointerDown(event, track)}
                      onPointerUp={(event) => {
                        event.stopPropagation();
                        if (event.currentTarget.releasePointerCapture) {
                          event.currentTarget.releasePointerCapture(event.pointerId);
                        }
                        finishDragging(event.clientX, event.clientY);
                      }}
                      onPointerCancel={cancelDragging}
                      onKeyDown={(event) => {
                        if (event.key === 'ArrowLeft') {
                          event.preventDefault();
                          setTracks((previous) =>
                            previous.map((candidate) =>
                              candidate.id === track.id
                                ? { ...candidate, clipStart: clamp(candidate.clipStart - 0.5, 0, TIMELINE_SECONDS - candidate.clipDuration) }
                                : candidate,
                            ),
                          );
                        }
                        if (event.key === 'ArrowRight') {
                          event.preventDefault();
                          setTracks((previous) =>
                            previous.map((candidate) =>
                              candidate.id === track.id
                                ? { ...candidate, clipStart: clamp(candidate.clipStart + 0.5, 0, TIMELINE_SECONDS - candidate.clipDuration) }
                                : candidate,
                            ),
                          );
                        }
                      }}
                      className={`absolute inset-y-1 cursor-grab rounded-md border border-white/20 bg-gradient-to-r ${track.colorClass} px-2 active:cursor-grabbing`}
                      style={{ left: `${clipLeft}%`, width: `${clipWidth}%` }}
                      whileHover={{ y: -1, scale: 1.01 }}
                      animate={
                        isAudible
                          ? { boxShadow: '0 0 20px rgba(168, 85, 247, 0.45)' }
                          : { boxShadow: '0 0 0 rgba(168, 85, 247, 0)' }
                      }
                    >
                      <div className="flex h-full items-center gap-[2px]">
                        {track.waveform.map((barHeight, index) => (
                          <motion.div
                            key={`${track.id}-bar-${index}`}
                            className="w-full rounded-full bg-white/80"
                            style={{
                              height: `${Math.max(18, barHeight * 100)}%`,
                              opacity: track.muted ? 0.25 : 0.7,
                            }}
                            animate={isAudible ? { scaleY: [0.7, 1.05, 0.75] } : { scaleY: 1 }}
                            transition={{
                              duration: 1.05,
                              repeat: isAudible ? Infinity : 0,
                              ease: 'easeInOut',
                              delay: index * 0.02,
                            }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  </div>

                </div>
              );
            })}
          </div>

          <aside className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 sm:p-4">
            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500">Mixer</h3>
              <p className="mt-1 text-sm text-gray-300">Touch controls tuned for demo mode.</p>
            </div>

            {tracks.map((track) => (
              <div key={`${track.id}-panel`} className="rounded-xl border border-white/10 bg-black/40 p-3">
                <div className="mb-2 flex items-center justify-between text-xs text-gray-300">
                  <span>{track.name}</span>
                  <span>{Math.round(track.volume * 100)}%</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => toggleMuteTrack(track.id)}
                    className="rounded-lg border border-white/15 bg-white/5 p-1.5 text-gray-200 transition hover:-rotate-6 hover:border-primary-400/40"
                  >
                    {track.muted ? <IoVolumeMute size={15} /> : <IoVolumeHigh size={15} />}
                  </button>
                  <input
                    aria-label={`${track.name} volume`}
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={track.volume}
                    onChange={(event) => updateTrackVolume(track.id, Number(event.target.value))}
                    className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-primary-500"
                  />
                </div>
              </div>
            ))}

          </aside>
        </div>

        <div className="border-t border-white/10 p-3 sm:p-4">
          <div
            ref={assistantDropRef}
            className={`rounded-2xl p-3 sm:p-4 transition ${
              isAssistantDropActive
                ? 'bg-primary-500/10'
                : 'bg-black/40'
            }`}
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-xs uppercase tracking-[0.2em] text-gray-400">Music Assistant</h3>
                <p className="mt-1 text-sm text-gray-300">
                  Drag a clip here, then ask AI what to improve.
                </p>
              </div>
              <button
                type="button"
                onClick={onRequestSignup}
                className="inline-flex items-center gap-2 rounded-xl border border-primary-400/40 bg-primary-500/10 px-3 py-2 text-xs font-semibold text-primary-200 transition hover:bg-primary-500/20"
              >
                <IoSparkles size={14} />
                Enhance
              </button>
            </div>

            {assistantReferences.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {assistantReferences.map((trackId) => {
                  const referencedTrack = tracks.find((track) => track.id === trackId);
                  if (!referencedTrack) return null;
                  return (
                    <span
                      key={`${trackId}-assistant-ref`}
                      className="rounded-full border border-primary-400/30 bg-primary-500/10 px-2.5 py-1 text-xs text-primary-200"
                    >
                      {referencedTrack.name} clip attached
                    </span>
                  );
                })}
              </div>
            )}

            <textarea
              value={assistantPrompt}
              onChange={(event) => setAssistantPrompt(event.target.value)}
              rows={3}
              placeholder="e.g. Make the guitar brighter and tighten the drum groove."
              className="w-full resize-none rounded-xl border border-white/10 bg-zinc-950/80 px-3 py-2 text-sm text-gray-200 placeholder:text-gray-500 focus:border-primary-400/60 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {dragGhost && (
        <motion.div
          className="pointer-events-none fixed left-0 top-0 z-[80]"
          style={{ width: `${dragGhost.width}px` }}
          initial={false}
          animate={{
            opacity: 0.97,
            scale: isAssistantDropActive ? 1.05 : 1,
            x: dragGhost.clientX - dragGhost.width / 2,
            y: dragGhost.clientY - 26,
          }}
          transition={{ type: 'spring', stiffness: 520, damping: 38, mass: 0.35 }}
        >
          <div className="rounded-md border border-white/30 bg-gradient-to-r from-fuchsia-500/80 to-purple-300/80 p-2 shadow-[0_14px_38px_rgba(0,0,0,0.45)]">
            <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/95">
              {tracks.find((track) => track.id === dragGhost.trackId)?.name ?? 'Clip'}
            </div>
            <div className="flex h-6 items-end gap-[2px]">
              {(tracks.find((track) => track.id === dragGhost.trackId)?.waveform ?? []).slice(0, 20).map((barHeight, index) => (
                <div
                  key={`ghost-wave-${dragGhost.trackId}-${index}`}
                  className="w-full rounded-full bg-white/85"
                  style={{
                    height: `${Math.max(25, barHeight * 100)}%`,
                    opacity: 0.85,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DawPreview;
