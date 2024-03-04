import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import instance from "../../api/axios";
import "./SearchPage.css";
import useDebounce from "../../hooks/useDebounce";

const SearchPage = () => {
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    };

    let query = useQuery();
    //const searchTerm = query.get("q");
    const debouncedSearchTerm = useDebounce(query.get("q"), 500);

    useEffect(() => {
        if (debouncedSearchTerm) {
            fetchSearchMovie(debouncedSearchTerm);
        }
    }, [debouncedSearchTerm]);

    const fetchSearchMovie = async (debouncedSearchTerm) => {
        try {
            const request = await instance.get(
                `/search/multi?include_adult=true&query=${debouncedSearchTerm}`
            );
            setSearchResults(request.data.results);
        } catch (error) {
            console.log("error", error);
        }
    };

    const renderSearchResult = () => {
        return searchResults.length > 0 ? (
            <section className="search-container">
                {searchResults.map((movie) => {
                    if (movie.backdrop_path !== null && movie.media_type !== "person") {
                        const movieImageUrl =
                            "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
                        return (
                            <div className="movie" key={movie.id}>
                                <div
                                    className="movie__column-poster"
                                    onClick={() => navigate(`/${movie.id}`)}
                                >
                                    <img src={movieImageUrl} alt="" className="movie__poster" />
                                </div>
                            </div>
                        );
                    }
                })}
            </section>
        ) : (
            <section className="no-results">
                <div className="no-results__text">
                    <p>Your search for "{debouncedSearchTerm}" did not have any matches.</p>
                    <p>Suggestion:</p>
                    <ul>
                        <li>Try different keywords</li>
                    </ul>
                </div>
            </section>
        );
    };

    return renderSearchResult();
};

export default SearchPage;
