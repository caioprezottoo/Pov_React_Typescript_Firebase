import { db } from "@/components/Firebase";
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";

export interface Review {
    id?: string;
    userId: string;
    movieId: string;
    movieTitle: string;
    moviePoster: string;
    rating: number;
    review: string;
    createdAt: Date;
}

const REVIEWS_COLLECTION = "Reviews";

export const addReview = async (review: Omit<Review, 'id' | 'createdAt'>): Promise<void> => {
    try {
        await addDoc(collection(db, REVIEWS_COLLECTION), {
            ...review,
            createdAt: new Date()
        });
    } catch (error) {
        console.error("Error adding review:", error);
        throw error;
    }
};

export const getUserReviews = async (userId: string): Promise<Review[]> => {
    try {
        const q = query(
            collection(db, REVIEWS_COLLECTION),
            where("userId", "==", userId)
        );

        const querySnapshot = await getDocs(q);
        const reviews: Review[] = [];

        querySnapshot.forEach((doc) => {
            reviews.push({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt.toDate()
            } as Review);
        });

        return reviews.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    } catch (error) {
        console.error("Error fetching reviews:", error);
        throw error;
    }
};

export const getMovieReview = async (userId: string, movieId: string): Promise<Review | null> => {
    try {
        const q = query(
            collection(db, REVIEWS_COLLECTION),
            where("userId", "==", userId),
            where("movieId", "==", movieId)
        );

        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return null;
        }

        const doc = querySnapshot.docs[0];
        return {
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt.toDate()
        } as Review;
    } catch (error) {
        console.error("Error fetching movie review:", error);
        throw error;
    }
};

export const updateReview = async (reviewId: string, rating: number, reviewText: string): Promise<void> => {
    try {
        const reviewRef = doc(db, REVIEWS_COLLECTION, reviewId);
        await updateDoc(reviewRef, {
            rating,
            review: reviewText
        });
    } catch (error) {
        console.error("Error updating review:", error);
        throw error;
    }
};

export const deleteReview = async (reviewId: string): Promise<void> => {
    try {
        await deleteDoc(doc(db, REVIEWS_COLLECTION, reviewId));
    } catch (error) {
        console.error("Error deleting review:", error);
        throw error;
    }
};