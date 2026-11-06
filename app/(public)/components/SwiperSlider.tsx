"use client";
import { Suspense } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";

const slides = [
  {
    image: "/images/about.jpg",
    title: "Learn together",
    subtitle: "A welcoming community makes every step of learning matter.",
    alt: "Teachers gathered together in a classroom",
  },
  {
    image: "/images/slide2.jpg",
    title: "Make room to play",
    subtitle: "Stay active, build confidence, and discover new interests.",
    alt: "Indoor sports court with a basketball hoop",
  },
  {
    image: "/images/slide3.jpg",
    title: "Find your next challenge",
    subtitle: "Every student deserves space to explore their potential.",
    alt: "Aerial view of an outdoor sports field and running track",
  },
];

export default function SwiperSlider() {
  return (
    <section className="bg-slate-50 px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
              Life at Bright Future
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              A place to grow in every way.
            </h2>
          </div>
          <p className="max-w-md text-slate-600">
            Explore the people, spaces, and experiences that make school days
            meaningful.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="h-[380px] animate-pulse rounded-3xl bg-slate-200 sm:h-[500px]" />
          }
        >
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            loop
            className="school-gallery h-[380px] overflow-hidden rounded-3xl shadow-xl sm:h-[500px]"
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.title} className="relative min-h-[360px]">
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 1152px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-12">
                  <h3 className="text-3xl font-bold sm:text-4xl">
                    {slide.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-base text-slate-200 sm:text-lg">
                    {slide.subtitle}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </Suspense>
      </div>
    </section>
  );
}
