import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getWatchlist, type WatchlistItem } from "@/services/watchlistService";
import Text from "@/components/Text";
import { useNavigate } from "react-router";

export default function WatchListPage() {
    const { user } = useAuth();
    const [movies, setMovies] = useState<WatchlistItem[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchWatchlist = async () => {
            if (user) {
                const data = await getWatchlist(user.uid);
                setMovies(data);
            }
            setLoading(false);
        };
        fetchWatchlist();
    }, [user]);

    if (loading) {
        return (
            <div className="w-full flex items-center justify-center p-10">
                <Text variant="l-text-md">Loading...</Text>
            </div>
        )

    }
    if (!movies.length) {
        return (
            <div className="w-full flex items-center justify-center p-10">
                <Text variant="l-text-md">You don't have any movies here yet!</Text>
            </div>
        )
    }


    return (
        <div className="p-6 flex flex-col gap-6">
            <div className="grid grid-cols-8 gap-6">
                {movies.map((movie) => (
                    <div key={movie.movieId} className="flex flex-col items-center rounded-lg gap-3 transition-transform hover:scale-105 duration-200">
                        <img
                            src={movie.poster}
                            alt={movie.title}
                            className="rounded w-full h-full cursor-pointer"
                            onClick={() => navigate(`/movie/${movie.movieId}`)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
