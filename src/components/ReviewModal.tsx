import { useState, useEffect } from "react";
import { X, Star } from "@phosphor-icons/react";
import Text from "./Text";
import Button from "./Button";

interface ReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (rating: number, review: string) => void;
    movieTitle: string;
    existingRating?: number;
    existingReview?: string;
    isEditing?: boolean;
}

export default function ReviewModal({
    isOpen,
    onClose,
    onSubmit,
    movieTitle,
    existingRating = 0,
    existingReview = "",
    isEditing = false
}: ReviewModalProps) {
    const [rating, setRating] = useState(existingRating);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [review, setReview] = useState(existingReview);

    useEffect(() => {
        setRating(existingRating);
        setReview(existingReview);
    }, [existingRating, existingReview]);

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (rating === 0) {
            alert("Please select a rating");
            return;
        }
        if (review.trim().length < 10) {
            alert("Please write a review with at least 10 characters");
            return;
        }
        onSubmit(rating, review);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-400 rounded-2xl p-6 max-w-lg w-full relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-100 hover:text-gray-200"
                >
                    <X size={24} />
                </button>

                <div className="mb-6 flex flex-col">
                    <Text variant="dm-text-md" className="mb-2">
                        {isEditing ? "Edit Review" : "Write a Review"}
                    </Text>
                    <Text variant="l-text-md" className="text-gray-200">
                        {movieTitle}
                    </Text>
                </div>

                <div className="mb-6">
                    <Text variant="l-text-md" className="mb-3">
                        Your Rating
                    </Text>
                    <div className="flex gap-2 my-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                            <button
                                key={star}
                                onMouseEnter={() => setHoveredRating(star)}
                                onMouseLeave={() => setHoveredRating(0)}
                                onClick={() => setRating(star)}
                                className="transition-transform hover:scale-110"
                            >
                                <Star
                                    size={28}
                                    weight={(hoveredRating || rating) >= star ? "fill" : "regular"}
                                    color={(hoveredRating || rating) >= star ? "#FFD700" : "#A6A6A6"}
                                />
                            </button>
                        ))}
                    </div>
                    {rating > 0 && (
                        <Text variant="l-text-sm" className="mt-2 text-gray-200">
                            {rating}/10
                        </Text>
                    )}
                </div>

                <div className="mb-6">
                    <Text variant="l-text-md">
                        Your Review
                    </Text>
                    <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="Share your thoughts about this movie..."
                        className="w-full h-32 p-3 mt-4 rounded-lg bg-gradient-input text-gray-100 outline-none resize-none focus:border focus:border-gray-100"
                        maxLength={500}
                    />
                    <Text variant="l-text-sm" className="text-gray-200 mt-1">
                        {review.length}/500 characters
                    </Text>
                </div>

                <div className="flex gap-3 justify-end">
                    <Button
                        variant="secondary"
                        onClick={onClose}
                        className="w-24! text-gray-400"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={handleSubmit}
                        className="w-24! text-gray-400"
                    >
                        {isEditing ? "Update" : "Submit"}
                    </Button>
                </div>
            </div>
        </div>
    );
}