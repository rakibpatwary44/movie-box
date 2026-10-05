"use client";
import { Popcorn, Search } from "lucide-react";
import Image from "next/image";
import { IMAGE_PATH } from "../constants";

export default function HeroSection({ searchTerm, setSearchTerm, movies }) {
  return (
    <header className="relative h-[70vh]">
      <div className="w-5/12 z-10 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
        <div className="flex justify-center items-center flex-col mb-4 gap-4">
          <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-red-500 shadow-lg mb-4">
            <Popcorn className="w-7 h-7" />
          </div>
          <h1 className="text-7xl font-black tracking-tight ">
            Movie<span className="text-red-600">Box</span>
          </h1>
          <p className="text-xl tracking-tight font-black mb-4 text-santas-gray">
            Discover the most popular movies trending right now
          </p>
        </div>
        <div className="relative  h-12">
          <Search className="absolute left-3 top-1/3 -translate-y-1/2 h-5 w-5 text-white" />
          <input
            type="text"
            className="mb-10 h-9 w-full rounded-xl pl-10 pr-10 outline-none border bg-transparent hover:bg-black/35"
            placeholder="Search movies"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-5 gap-1 opacity-60 absolute inset-0">
        {movies.length >= 5
          ? movies.map((movie) => (
              <div key={movie.id}>
                <Image
                  className="h-full w-full object-cover "
                  width={259}
                  height={250}
                  alt={movie.title}
                  src={
                    movie.poster_path
                      ? `${IMAGE_PATH}${movie.poster_path}`
                      : "/public/placeholder-image.svg"
                  }
                />
              </div>
            ))
          : Array(5)
              .fill(5)
              .map((_, idx) => (
                <div key={idx}>
                  <Image
                    src={`/movie-img/movie-${idx + 1}.webp`}
                    alt={`Movie ${idx + 1}`}
                    width={250}
                    height={250}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
      </div>

      <div className="absolute inset-0 bg-linear-to-t from-woodsmoke via-woodsmoke/80 to-transparent"></div>

      <div className="absolute inset-0 bg-linear-to-t from-woodsmoke/90 via-transparent to-woodsmoke"></div>
    </header>
  );
}
