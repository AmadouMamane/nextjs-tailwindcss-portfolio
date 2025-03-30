// components/ui/ShareButtons.tsx
import { FiTwitter, FiLink } from "react-icons/fi";
import { useRouter } from "next/router";

export default function ShareButtons() {
  const router = useRouter();
  const url = `https://yourdomain.com${router.asPath}`;
  const title = encodeURIComponent("Running Through Berlin: The Ultimate Marathon Experience & City Adventure");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="mt-16 text-center space-x-4">
      <a
        href={`https://twitter.com/intent/tweet?url=${url}&text=${title}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
      >
        <FiTwitter className="mr-2" /> Tweet
      </a>
      <button
        onClick={copyToClipboard}
        className="inline-flex items-center px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600"
      >
        <FiLink className="mr-2" /> Copy Link
      </button>
    </div>
  );
}
