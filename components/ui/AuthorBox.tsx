// components/ui/AuthorBox.tsx
import Image from "next/image";

export default function AuthorBox({ name, bio, avatar }: { name: string; bio: string; avatar: string }) {
  return (
    <div className="max-w-3xl mx-auto mt-20 px-6 sm:px-0">
      <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-inner">
        <Image src={avatar} alt={name} width={64} height={64} className="rounded-full" />
        <div>
          <p className="font-semibold text-lg text-gray-800 dark:text-white">{name}</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">{bio}</p>
        </div>
      </div>
    </div>
  );
}
