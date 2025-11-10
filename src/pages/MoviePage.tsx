import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getMovieById, type Movie } from "@/services/omdbApi";
import { addReview, getMovieReview, updateReview } from "@/services/reviewService";
import { addToWatchlist, removeFromWatchlist, getWatchlist } from "@/services/watchlistService";
import { useAuth } from "@/context/AuthContext";
import Text from "@/components/Text";
import { Star, BookmarkSimple } from "@phosphor-icons/react";
import ReviewModal from "@/components/ReviewModal";
import Icon from "@/components/Icon";
import Arrow from "@/assets/svg/arrow.svg?react";

export default function MoviePage() {
    const { id } = useParams<{ id: string }>();
    const { user } = useAuth();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [existingReview, setExistingReview] = useState<{
        rating: number;
        review: string;
        reviewId?: string;
    } | null>(null);

    const [inWatchlist, setInWatchlist] = useState(false);
    const navigate = useNavigate();

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

    useEffect(() => {
        const checkExistingReview = async () => {
            if (user && id) {
                const review = await getMovieReview(user.uid, id);
                if (review) {
                    setExistingReview({
                        rating: review.rating,
                        review: review.review,
                        reviewId: review.id,
                    });
                }
            }
        };
        checkExistingReview();
    }, [user, id]);

    useEffect(() => {
        const checkWatchlist = async () => {
            if (user && id) {
                const watchlist = await getWatchlist(user.uid);
                const exists = watchlist.some((item) => item.movieId === id);
                setInWatchlist(exists);
            }
        };
        checkWatchlist();
    }, [user, id]);

    const handleReviewSubmit = async (rating: number, review: string) => {
        if (!user || !movie) return;

        try {
            if (existingReview?.reviewId) {
                await updateReview(existingReview.reviewId, rating, review);
                setExistingReview({ rating, review, reviewId: existingReview.reviewId });
            } else {
                await addReview({
                    userId: user.uid,
                    movieId: id!,
                    movieTitle: movie.Title,
                    moviePoster: movie.Poster,
                    rating,
                    review,
                });
                setExistingReview({ rating, review });
            }
        } catch (err) {
            console.error(err);
            alert("Failed to save review");
        }
    };

    const handleToggleWatchlist = async () => {
        if (!user || !movie) return;

        try {
            if (inWatchlist) {
                await removeFromWatchlist(user.uid, id!);
                setInWatchlist(false);
            } else {
                await addToWatchlist(user.uid, {
                    id: id!,
                    title: movie.Title,
                    poster: movie.Poster,
                });
                setInWatchlist(true);
            }
        } catch (error) {
            console.error(error);
            alert("Failed to update watchlist.");
        }
    };

    if (error) return <div className="p-5">{error}</div>;

    return (
        <div className="flex items-center p-5 lg:p-5 w-full min-h-full lg:px-30">
            {loading ? (
                <div className="w-full h-full rounded-lg animate-pulse bg-gray-300 opacity-40 border">
                    <div className="" />
                </div>
            ) : (
                <div className="flex gap-10 items-center lg:items-end">
                    <img
                        src={movie?.Poster}
                        alt={movie?.Title}
                        className="rounded-sm w-full max-w-20 lg:w-64 lg:max-w-64 h-full"
                    />
                    <div className="flex flex-col gap-5">
                        <Icon
                            svg={Arrow}
                            className="cursor-pointer transition-transform hover:scale-90"
                            onClick={() => navigate(-1)}
                        />


                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-1">
                                <Text variant="m-text-xs">{movie?.imdbRating}/10</Text>
                                <Text variant="dm-text-md">{movie?.Title}</Text>
                            </div>
                            <Text variant="dm-text-sm">{movie?.Plot}</Text>
                            <Text variant={"l-text-sm"}>Star Cast: {movie?.Actors}</Text>

                            {existingReview && (
                                <div className="mt-2 p-3 bg-gradient-input rounded-lg flex flex-col gap-1">
                                    <Text variant="l-text-sm" className="text-gray-200">
                                        Your Review: {existingReview.rating}/10
                                    </Text>
                                    <Text variant="l-text-sm">{existingReview.review}</Text>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-3">
                            <div
                                className="flex items-center gap-2 cursor-pointer"
                                onClick={() => setIsReviewModalOpen(true)}
                            >
                                <Star
                                    size={32}
                                    color="white"
                                    weight={existingReview ? "fill" : "regular"}
                                    className="transition-transform hover:scale-90"
                                />
                                <Text variant={"l-text-sm"}>
                                    {existingReview ? "Edit Review" : "Review"}
                                </Text>
                            </div>

                            <div
                                className="flex items-center gap-2 cursor-pointer"
                                onClick={handleToggleWatchlist}
                            >
                                <BookmarkSimple
                                    size={32}
                                    color={inWatchlist ? "white" : "white"}
                                    weight={inWatchlist ? "fill" : "regular"}
                                    className="transition-transform hover:scale-90"
                                />
                                <Text variant={"l-text-sm"}>
                                    {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
                                </Text>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <ReviewModal
                isOpen={isReviewModalOpen}
                onClose={() => setIsReviewModalOpen(false)}
                onSubmit={handleReviewSubmit}
                movieTitle={movie?.Title || ""}
                existingRating={existingReview?.rating}
                existingReview={existingReview?.review}
                isEditing={!!existingReview}
            />
        </div>
    );
}
