// components/reusable/BackButton.jsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ChevronLeft } from 'lucide-react';

const BackButton = () => {
  const router = useRouter();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY < 100); // Hide if user scrolls down
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      onClick={() => router.back()}
      aria-label="Back"
      className={`fixed top-4 left-4 z-10 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      style={{
        backgroundColor: '#6366f9', // same indigo as scroll-to-top
        color: 'white',
        border: 'none',
      }}
    >
      <ChevronLeft size={25} />
    </button>
  );
};

export default BackButton;
