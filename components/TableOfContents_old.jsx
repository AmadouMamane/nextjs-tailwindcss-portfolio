import { useEffect, useState } from "react";

export default function TableOfContents() {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const els = Array.from(document.querySelectorAll("h2, h3")).map((el) => ({
      id: el.id,
      text: el.innerText,
      level: el.tagName,
    }));
    setHeadings(els);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "0% 0% -80% 0%" }
    );

    els.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <aside className="fixed top-32 right-2 w-60 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 text-sm text-gray-700 dark:text-gray-300 z-[9998] max-h-[80vh] overflow-auto">
      <p className="text-xs uppercase font-semibold mb-2 text-indigo-500 tracking-wider">On this page Old</p>
      <ul className="space-y-2">
        {headings.map(({ id, text, level }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`block hover:text-indigo-600 transition-colors duration-150 ${
                activeId === id ? "text-indigo-700 font-semibold" : ""
              } ${level === "H3" ? "ml-4 text-sm" : "text-base"}`}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
