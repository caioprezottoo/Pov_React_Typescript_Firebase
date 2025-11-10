import { getMovieById, searchMovies, type Movie } from "@/services/omdbApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import Input from "@/components/Input";
import Text from "@/components/Text";
import Button from "@/components/Button";

import Search from "@/assets/svg/search.svg?react";
import Arrow from "@/assets/svg/arrowblack.svg?react"
import { Popcorn } from "@phosphor-icons/react";

export default function ExplorePage() {
    const [movies, setMovies] = useState<Movie[]>([])
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [recommended, setRecommended] = useState(true)
    const [error, setError] = useState("")

    const navigate = useNavigate();

    useEffect(() => {
        const loadMovies = async () => {
            setLoading(true);

            const movieIds = [
                "tt0111161", "tt0068646", "tt0468569", "tt0167260",
                "tt0050083", "tt0110912", "tt0137523", "tt1375666",
                "tt0080684", "tt0133093", "tt0099685", "tt0816692",
                "tt0114369", "tt0102926", "tt0118799", "tt0317248"
            ]

            const loadedMovies: Movie[] = []

            for (const id of movieIds) {
                const movie = await getMovieById(id)
                loadedMovies.push(movie)
            }

            setMovies(loadedMovies)
            setLoading(false);
        }

        if (recommended === true) {
            loadMovies()
        } else {
            return
        }
    }, [recommended])

    const handleSearchClick = async () => {
        if (query.trim().length < 2) return;

        try {
            setLoading(true);
            setError("");
            const results = await searchMovies(query);
            if (results.Response === "True") {
                setMovies(results.Search);
                setLoading(false);
                setRecommended(false);
            } else {
                setError("No movies found");
                setLoading(false);
                setMovies([]);
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setError("Failed to fetch movies")
            setLoading(false);
            setRecommended(false);
            setMovies([]);
        }
    };

    return (
        <div className="w-full flex flex-col items-center pt-5 gap-5 px-5">
            <div className="flex items-center gap-3">
                <Input
                    variant="secondary"
                    icon={Search}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

                <Button onClick={handleSearchClick} icon={Arrow} variant={"secondary"}></Button>
            </div>


            {loading ?
                <div className="flex max-w-5xl w-full h-full">
                    <div className="w-full h-90 rounded-lg animate-pulse bg-gray-300 opacity-40 border" />
                </div>
                :
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 w-full max-w-5xl">
                    {movies.map((movie) => (
                        <div
                            key={movie.imdbID}
                            className="flex flex-col gap-2 cursor-pointer"
                            onClick={() => navigate(`/movie/${movie.imdbID}`)}
                        >
                            <img
                                src={movie.Poster}
                                alt={movie.Title}
                                className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform"
                            />

                        </div>
                    ))}
                </div>
            }

            {error &&
                <div className="flex-1 flex justify-center items-center flex-col gap-2">
                    <Popcorn color="#fff" size={60} />
                    <Text variant="l-text-sm">{error}</Text>
                </div>
            }

            {!error && !loading && movies.length < 1 && query.length >= 2 &&
                <div className="flex-1 flex justify-center items-center flex-col gap-2">
                    <Text variant="l-text-sm">No results found for "{query}"</Text>
                </div>
            }

        </div>
    );
}