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
      className={`w-full ${isFullscreen ? 'h-screen' : 'h-[90vh]'} mt-8 relative`}
    >
      <iframe
        src={notebookFile}
        title="Notebook Viewer"
        className="w-full h-full border rounded-xl shadow-lg"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        loading="lazy"
      ></iframe>
      <button
        onClick={toggleFullscreen}
        className="absolute top-2 right-5 z-50 p-2 bg-white/80 dark:bg-black/70 backdrop-blur rounded-full shadow-md"
        aria-label="Toggle Fullscreen"
      >
        {isFullscreen ? <Minimize size={20} /> : <Fullscreen size={20} />}
      </button>
    </div>
  );
};

export default NotebookViewer;
