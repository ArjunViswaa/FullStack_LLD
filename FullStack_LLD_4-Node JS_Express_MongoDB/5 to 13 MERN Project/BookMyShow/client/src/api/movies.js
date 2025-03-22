import { axiosInstance } from "./index";

// Get all movies...
export const getAllMovies = async () => {
    try {
        const response = await axiosInstance.get("api/movies/get-all-movies");
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

// Add a movie...
export const addMovie = async (values) => {
    try {
        const response = await axiosInstance.post("api/movies/add-movie", values);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// Update a movie...
export const updateMovie = async (payload) => {
    try {
        const response = await axiosInstance.put("/api/movies/update-movie", payload);
        return response.data;
    } catch (err) {
        return err.message;
    }
};

// Delete a movie
export const deleteMovie = async (payload) => {
    try {
        const response = await axiosInstance.put(
            "/api/movies/delete-movie",
            payload
        );
        return response.data;
    } catch (err) {
        return err.message;
    }
};