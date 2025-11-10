import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router";
import { getMovieById, type Movie } from "@/services/omdbApi";
import Text from "@/components/Text";
import { PlusCircle } from "@phosphor-icons/react"
import Icon from "@/components/Icon";
import Arrow from "@/assets/svg/arrow.svg?react"

export default function MoviePage() {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const data = await getMovieById(id!);
                setMovie(data);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (err) {
                setError("Failed to load movie");
            } finally {
                setLoading(false);
            }
        };
        fetchMovie();
    }, [id]);

    if (error) return <div className="p-5">{error}</div>;

    return (
        <div className="flex items-center p-5 w-full min-h-full px-30">
            {loading ?
                <div className="w-full h-full rounded-lg animate-pulse bg-gray-300 opacity-40 border">
                    <div className="" />
                </div>
                :
                <div className="flex gap-10 items-end">
                    <img src={movie?.Poster} alt={movie?.Title} className="rounded-sm w-64" />
                    <div className="flex flex-col gap-5">
                        <NavLink to='/explore'>
                            <Icon svg={Arrow} className="cursor-pointer" />
                        </NavLink>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col gap-1">
                                <Text variant="m-text-xs">{movie?.imdbRating}/10</Text>
                                <Text variant="dm-text-md">{movie?.Title}</Text>
                            </div>
                            <Text variant="dm-text-sm">{movie?.Plot}</Text>
                        </div>
                        <div className="flex flex-col gap-8">
                            <Text variant={"l-text-sm"}>Star Cast: {movie?.Actors}</Text>
                            <PlusCircle size={32} color="white" className="cursor-pointer" />
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}
