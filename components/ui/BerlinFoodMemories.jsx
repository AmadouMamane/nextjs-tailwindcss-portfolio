export default function BerlinFoodMemories() {
  const items = [
    {
      emoji: "🥙",
      name: "Mustafa’s Kebab",
      desc: "The myth is real is real. Juicy, crunchy, explosive - I’d queue again without hesitation.",
    },
    {
      emoji: "🐟",
      name: "FunkyFisch",
      desc: "Refined and radiant, one of Berlin’s top-rated seafood spots - with a hefty price tag but divine flavors.",
    },
    {
      emoji: "🍜",
      name: "Ni’s Thai",
      desc: "Comfort food, depth of flavor, and the best dumplings I’ve had.",
    },
  ];

  return (
    <div className="text-center space-y-10 max-w-3xl mx-auto">
      <h3 id="my-final-bites-in-berlin" className="text-3xl font-bold">
        🍽️ My Final Bites in Berlin
      </h3>

      <div className="grid md:grid-cols-3 gap-6 text-left">
        {items.map(({ emoji, name, desc }, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 rounded-xl shadow-md"
          >
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              {emoji} {name}
            </h4>

            <div className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed text-justify">
              {desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}