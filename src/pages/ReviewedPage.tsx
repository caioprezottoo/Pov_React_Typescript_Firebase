import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getUserReviews, deleteReview, type Review } from "@/services/reviewService";
import { useAuth } from "@/context/AuthContext";
import Text from "@/components/Text";
import { Star, Trash } from "@phosphor-icons/react";

export default function ReviewedPage() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            if (!user) return;

            try {
                const userReviews = await getUserReviews(user.uid);
                setReviews(userReviews);
            } catch (error) {
                console.error("Failed to fetch reviews:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [user]);

    const handleDelete = async (reviewId: string) => {
        if (!window.confirm("Are you sure you want to delete this review?")) return;

        try {
            await deleteReview(reviewId);
            setReviews(reviews.filter(r => r.id !== reviewId));
            alert("Review deleted successfully!");
        } catch (error) {
            console.error("Failed to delete review:", error);
            alert("Failed to delete review");
        }
    };

    if (loading) {
        return (
            <div className="w-full flex items-center justify-center p-10">
                <Text variant="l-text-md">Loading your reviews...</Text>
            </div>
        );
    }

    if (reviews.length === 0) {
        return (
            <div className="w-full flex items-center justify-center p-10">
                <Text variant="l-text-md">You haven't reviewed any movies yet!</Text>
            </div>
        );
    }

    return (
        <div className="w-full p-5 lg:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {reviews.map((review) => (
                    <div
                        key={review.id}
                        className="bg-gradient-input rounded-lg p-4 flex flex-col gap-3 hover:scale-102 transition-transform cursor-pointer"
                        onClick={() => navigate(`/movie/${review.movieId}`)}
                    >
                        <div className="flex gap-3">
                            <img
                                src={review.moviePoster}
                                alt={review.movieTitle}
                                className="w-20 h-28 object-cover rounded"
                            />
                            <div className="flex-1 flex flex-col gap-2">
                                <Text variant="dm-text-sm" className="line-clamp-2">
                                    {review.movieTitle}
                                </Text>
                                <div className="flex items-center gap-2">
                                    <Star size={20} color="#FFD700" weight="fill" />
                                    <Text variant="l-text-md">{review.rating}/10</Text>
                                </div>
                                <Text variant="l-text-sm" className="text-gray-200 text-xs">
                                    {review.createdAt.toLocaleDateString()}
                                </Text>
                            </div>
                        </div>

                        <Text variant="l-text-sm" className="line-clamp-3">
                            {review.review}
                        </Text>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(review.id!);
                            }}
                            className="self-end mt-2 text-red hover:scale-110 transition-transform"
                        >
                            <Trash size={20} color="#A20A0A" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}