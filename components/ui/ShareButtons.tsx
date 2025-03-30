// components/ui/ShareButtons.tsx
import { FiLink, FiLinkedin, FiX } from "react-icons/fi";
import { useRouter } from "next/router";

export default function ShareButtons({ title }: { title: string }) {
  const router = useRouter();
  const url = `https://amadoumamane.fr${router.asPath}`;
  const encodedTitle = encodeURIComponent(title);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="mt-10 text-center flex flex-wrap justify-center gap-4">
      {/* Twitter (X) Share */}
      <a
        href={`https://x.com/intent/tweet?url=${url}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-4 py-2 rounded-lg bg-[#1DA1F2] text-white hover:bg-[#1A91DA]"
      >
        <FiX className="mr-2" /> Tweet
      </a>

      {/* LinkedIn Share */}
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-4 py-2 rounded-lg bg-[#0A66C2] text-white hover:bg-[#004182]"
      >
        <FiLinkedin className="mr-2" /> LinkedIn
      </a>

      {/* Copy Link Button */}
      <button
        onClick={copyToClipboard}
        className="inline-flex items-center px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600"
      >
        <FiLink className="mr-2" /> Copy Link
      </button>
    </div>
  );
}
