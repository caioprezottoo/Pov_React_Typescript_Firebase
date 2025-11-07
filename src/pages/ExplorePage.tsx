import { useState, useEffect } from "react";
import Input from "@/components/Input";
import Search from "@/assets/svg/search.svg?react";
import Text from "@/components/Text";
import { searchMovies, type Movie } from "@/services/omdbApi";
import { Popcorn } from "@phosphor-icons/react";

export default function ExplorePage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const delaySearch = setTimeout(async () => {
            if (searchQuery.trim().length < 3) {
                setMovies([]);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const data = await searchMovies(searchQuery);
                if (data.Response === "True") {
                    setMovies(data.Search);
                } else {
                    setError(data.Error || "No movies found");
                    setMovies([]);
                }
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch movies");
                setMovies([]);
                setLoading(false);
            }
        }, 500);

        return () => clearTimeout(delaySearch);
    }, [searchQuery]);

    return (
        <div className="w-full flex flex-col items-center pt-5 gap-5 px-5">
            <Input
                variant="secondary"
                icon={Search}
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            {loading && (
                <div className="flex-1 flex items-center">
                    <Text variant="l-text-sm">Loading...</Text>
                </div>
            )}

            {error && (
                <div className="flex-1 flex justify-center items-center flex-col gap-2">
                    <Popcorn color="#fff" size={60} />
                    <Text variant="l-text-sm">{error}</Text>
                </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full max-w-5xl pb-10">
                {movies.map((movie) => (
                    <div
                        key={movie.imdbID}
                        className="flex flex-col gap-2 cursor-pointer hover:scale-105 transition-transform"
                    >
                        <img
                            src={
                                movie.Poster !== "N/A"
                                    ? movie.Poster
                                    : "/placeholder-movie.png"
                            }
                            alt={movie.Title}
                            className="w-full h-full object-cover rounded-xl"
                        />
                        <Text variant="dm-text-xs" className="text-center truncate">
                            {movie.Title}
                        </Text>
                        <Text variant="l-text-sm" className="text-center opacity-70">
                            {movie.Year}
                        </Text>
                    </div>
                ))}
            </div>

            {!loading && !error && movies.length === 0 && searchQuery.length >= 3 && (
                <Text variant="l-text-lg" className="opacity-70">
                    No results found for "{searchQuery}"
                </Text>
            )}
        </div>
    );
}
