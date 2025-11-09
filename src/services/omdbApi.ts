const API_KEY = 'ee836cd2';

const BASE_URL = 'https://www.omdbapi.com/';

export interface Movie {
    Title: string;      // Movie name
    Year: string;       // Release year
    imdbID: string;     // Unique ID
    Poster: string;     // Image URL
    Plot?: string;      // Movie description (optional)
}

export const getMovieById = async (movieId: string): Promise<Movie> => {
    const url = `${BASE_URL}?apikey=${API_KEY}&i=${movieId}`;

    const response = await fetch(url);
    const data = await response.json();

    return data;
};

export interface SearchResponse {
    Search: Movie[];
    totalResults: string;
    Response: string;
    Error?: string;
}

export const searchMovies = async (query: string): Promise<SearchResponse> => {
    try {
        const response = await fetch(
            `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
};