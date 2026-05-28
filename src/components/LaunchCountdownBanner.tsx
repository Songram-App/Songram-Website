import React, { useEffect, useMemo, useRef, useState } from 'react';

const LAUNCH_DATE = new Date('2026-05-31T00:00:00');

type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isLive: boolean;
};

function getCountdownParts(targetDate: Date): CountdownParts {
  const now = Date.now();
  const diff = targetDate.getTime() - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isLive: true };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, isLive: false };
}

const LaunchCountdownBanner: React.FC = () => {
  const [countdown, setCountdown] = useState<CountdownParts>(() => getCountdownParts(LAUNCH_DATE));
  const bannerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(getCountdownParts(LAUNCH_DATE));
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const updateBannerHeight = () => {
      const height = bannerRef.current?.offsetHeight ?? 0;
      document.documentElement.style.setProperty('--launch-banner-height', `${height}px`);
    };

    updateBannerHeight();

    const observer = new ResizeObserver(updateBannerHeight);
    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }
    window.addEventListener('resize', updateBannerHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateBannerHeight);
      document.documentElement.style.setProperty('--launch-banner-height', '0px');
    };
  }, []);

  const launchDateLabel = useMemo(() => {
    return LAUNCH_DATE.toLocaleDateString(undefined, {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[70] pointer-events-none">
      <div ref={bannerRef} className="pointer-events-auto w-full border-b border-white/10 bg-zinc-950/90 backdrop-blur-md shadow-[0_4px_18px_rgba(0,0,0,0.25)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-1.5 grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] items-center gap-2 sm:gap-3">
          <div className="flex justify-center sm:justify-start">
            <span className="text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.1em] text-primary-300 whitespace-nowrap">Launch</span>
          </div>

          <p className="text-sm sm:text-base text-gray-100 font-medium text-center whitespace-nowrap">
            {countdown.isLive ? 'Beta is live.' : `Public beta launches ${launchDateLabel}.`}
          </p>

          <div className="flex justify-center sm:justify-end">
            {countdown.isLive ? (
              <a
                href="https://songram.app/login"
                className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-xs font-medium bg-primary-500 text-white hover:bg-primary-400 transition-colors"
              >
                Open Songram
              </a>
            ) : (
              <div className="flex items-center gap-1.5 text-white">
                <TimeBlock label="D" value={countdown.days} />
                <TimeBlock label="H" value={countdown.hours} />
                <TimeBlock label="M" value={countdown.minutes} />
                <TimeBlock label="S" value={countdown.seconds} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const TimeBlock: React.FC<{ label: string; value: number }> = ({ label, value }) => {
  return (
    <div className="min-w-[42px] rounded-md border border-white/10 bg-white/5 px-1.5 py-1 text-center">
      <div className="text-sm leading-none font-semibold tabular-nums">{String(value).padStart(2, '0')}</div>
      <div className="text-[9px] text-gray-400 mt-0.5">{label}</div>
    </div>
  );
};

export default LaunchCountdownBanner;