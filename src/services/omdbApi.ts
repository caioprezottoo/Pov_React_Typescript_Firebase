const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY || 'ee836cd2';
const BASE_URL = 'https://www.omdbapi.com/';

export interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
    imdbRating?: string;
}

export interface SearchResponse {
    Search: Movie[];
    totalResults: string;
    Response: string;
    Error?: string;
}

export const searchMovies = async (query: string, page: number = 1): Promise<SearchResponse> => {
    try {
        const response = await fetch(
            `${BASE_URL}?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(query)}&page=${page}`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
};

export const getMovieDetails = async (imdbId: string) => {
    try {
        const response = await fetch(
            `${BASE_URL}?apikey=${OMDB_API_KEY}&i=${imdbId}&plot=full`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        throw error;
    }
};