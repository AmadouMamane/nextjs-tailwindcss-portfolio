import { useEffect, useRef, useState } from 'react';
import { Fullscreen, Minimize } from 'lucide-react';

const NotebookViewer = ({ notebookFile }) => {
  const containerRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Prevent rendering if no notebook file is provided
  if (!notebookFile) return null;

  return (
    <div
      ref={containerRef}
      className={`relative mt-8 w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white/70 shadow-[0_22px_70px_rgba(15,23,42,0.10)] backdrop-blur-xl dark:border-white/[0.09] dark:bg-white/[0.045] dark:shadow-[0_24px_80px_rgba(0,0,0,0.34)] ${isFullscreen ? 'h-screen rounded-none' : 'h-[90vh]'}`}
    >
      <div className="flex h-12 items-center justify-between border-b border-slate-200/75 bg-slate-50/80 px-4 dark:border-white/[0.08] dark:bg-white/[0.045]">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        </div>
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
          Implementation workspace
        </p>
        <button
          onClick={toggleFullscreen}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200/80 bg-white/80 text-slate-600 shadow-sm transition hover:border-indigo-300 hover:text-indigo-600 dark:border-white/[0.10] dark:bg-black/25 dark:text-slate-200 dark:hover:border-indigo-300/40 dark:hover:text-indigo-200"
          aria-label="Toggle Fullscreen"
        >
          {isFullscreen ? <Minimize size={17} /> : <Fullscreen size={17} />}
        </button>
      </div>
      <iframe
        src={notebookFile}
        title="Notebook Viewer"
        className="h-[calc(100%-3rem)] w-full border-0 bg-white dark:bg-slate-950"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default NotebookViewer;
