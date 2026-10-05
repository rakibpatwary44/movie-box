"use client";

import { useEffect, useState } from "react";

import HeroSection from "../../Components/HeroSection";
import { API_URL, IMAGE_PATH } from "../../constants";
import Image from "next/image";
import { Star } from "lucide-react";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchMovie = async (query = "") => {
    console.log(fetchMovie);
    try {
      const res = await fetch(
        query
          ? `${API_URL}/search/movie?query=${encodeURIComponent(query)}`
          : `${API_URL}/discover/movie`,
        {
          headers: {
            accept: "application/json",
            authorization: `bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
          },
        },
      );
      const data = await res.json();
      setMovies(data.results);
      console.log("data :", data.results);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchMovie();
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMovie(searchTerm);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);
  return (
    <>
      <HeroSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        movies={movies.slice(0, 5)}
      />
      <div className="flex flex-col m-10 mt-0">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-alabaster mb-3">
            {searchTerm ? `Result for ${searchTerm}` : "Popular Right Now"}
          </h2>
          <p className="text-lg text-santas-gray">
            {" "}
            Explore what everyone is watching
          </p>
        </div>

        <div className="grid grid-cols-5 gap-6">
          {movies.map((movie, idx) => (
            <div key={idx} className="group">
              <div className="relative overflow-hidden cursor-pointer group rounded-xl:">
                <Image
                  className="group-hover:scale-110 duration-500 h-full w-full object-cover :"
                  src={
                    movie.poster_path
                      ? `${IMAGE_PATH}${movie.poster_path}`
                      : "/public/placeholder-image.svg"
                  }
                  width={250}
                  height={250}
                  alt={movie.title}
                />
                <div className="absolute top-3 right-3 flex items-center gap-1 rounded-xl bg-black/70 px-2 py-1 backdrop-blur-sm">
                  <Star className="w-3.5 h-3.5 text-saffron fill-saffron" />
                  <span className="text-sm font-semibold text-white">
                    {movie.vote_average.toFixed(1)}
                  </span>
                </div>
                <div
                  className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 
                to-transparent opacity-60 group-hover:opacity-80"
                ></div>
                <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="line-clamp-3 text-sm text-white">
                    {movie.overview || "No overview available."}
                  </p>
                </div>
              </div>
              <div>
                <h3>{movie.title}</h3>
                <p>{movie.release_data}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
