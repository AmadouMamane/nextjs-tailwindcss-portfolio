// pages/blog/berlin.tsx
import { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

export default function BerlinMarathonBlog() {
  const [scroll, setScroll] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [activeImage, setActiveImage] = useState(0)

  const images = [
    '/images/blog/sports/berlin-marathon/berlin-marathon-2.png',
    '/images/blog/sports/berlin-marathon/berlin-marathon-2.png',
    '/images/blog/sports/berlin-marathon/berlin-marathon-2.png',
  ]

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const height = document.body.scrollHeight - window.innerHeight
      setScroll((scrollTop / height) * 100)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <Head>
        <title>Running Through Berlin – Marathon + City Adventure</title>
        <meta name="description" content="A full sensory experience of running the Berlin Marathon and exploring Berlin." />
        <meta name="keywords" content="Berlin Marathon, Travel, Running, City, Culture, Adventure" />
        <meta name="author" content="Your Name" />
        <meta property="og:title" content="Running Through Berlin – Marathon + City Adventure" />
        <meta property="og:description" content="Elite racing meets urban discovery — a full experience of Berlin on race week." />
        <meta property="og:image" content="/images/blog/sports/berlin-marathon/berlin-marathon-2.png" />
      </Head>

      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-red-500 to-orange-400 z-50 transition-all duration-300"
        style={{ width: `${scroll}%` }}
      />

      <main className="min-h-screen w-full bg-white dark:bg-black text-gray-900 dark:text-gray-100">
        <section className="px-6 py-20 lg:px-24 xl:px-40 space-y-20">
          <h1 className="text-5xl md:text-6xl font-extrabold text-center bg-gradient-to-r from-rose-500 via-red-400 to-orange-300 bg-clip-text text-transparent animate-fadeInUp">
            Running Through Berlin: The Ultimate Marathon Experience & City Adventure
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {images.map((src, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden shadow-xl transform transition-transform duration-700 hover:scale-105 cursor-pointer"
                onClick={() => {
                  setActiveImage(i)
                  setLightboxOpen(true)
                }}
              >
                <Image
                  src={src}
                  alt={`Berlin image ${i + 1}`}
                  width={1600}
                  height={900}
                  className="rounded-2xl"
                />
              </div>
            ))}
          </div>

          <p className="text-xl text-center text-gray-700 dark:text-gray-300 max-w-3xl mx-auto animate-fadeInUp">
            From sunrise training to nightlife celebrations, this is the story of a city, a race, and everything in between.
            Berlin didn’t just host my marathon — it transformed it into a life highlight.
          </p>

          <p className="text-center text-lg mt-4 text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Whether you're chasing a personal best or a passport stamp, the Berlin Marathon delivers something unforgettable.
          </p>

          <h2 className="text-center text-3xl font-bold mt-20 mb-6 animate-fadeInUp">Danke, Berlin. Ich komme wieder. 🇩🇪❤️‍🔥</h2>
        </section>
      </main>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={images.map((src) => ({ src }))}
        index={activeImage}
      />
    </>
  )
}
