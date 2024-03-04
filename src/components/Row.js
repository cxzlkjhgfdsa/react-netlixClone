import React, { useEffect, useState } from "react";
import instance from "../api/axios";
import "./Row.css";
import MovieModal from "./MovieModal";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Row = ({ title, fetchUrl, id, isLargeRow }) => {
    const [movies, setMovies] = useState([]);
    const BASE_URL = "https://image.tmdb.org/t/p/original/";
    const [modalOpen, setModalOpen] = useState(false);
    const [movieSelected, setMovieSelected] = useState({});

    useEffect(() => {
        fetchMovieData();
    }, [fetchUrl]);

    const fetchMovieData = async () => {
        const request = await instance.get(fetchUrl);
        setMovies(request.data.results);
        return request;
    };

    const handleClick = (movie) => {
        setModalOpen(true);
        setMovieSelected(movie);
    };

    return (
        <div>
            <section className="row">
                {/** TITLE  */}
                <h2>{title}</h2>

                <Swiper
                    // install Swiper modules
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    loop={true}
                    navigation
                    pagination={{ clickable: true }}
                    breakpoints={{
                        1378: {
                            slidesPerView: 6,
                            slidesPerGroup: 6,
                        },
                        998: {
                            slidesPerView: 5,
                            slidesPerGroup: 5,
                        },
                        625: {
                            slidesPerView: 4,
                            slidesPerGroup: 4,
                        },
                        0: {
                            slidesPerView: 3,
                            slidesPerGroup: 3,
                        },
                    }}
                >
                    <div id={id} className="row__posters">
                        {/**SEVERAL ROW__POSTER */}
                        {movies.map((movie) => (
                            <SwiperSlide>
                                <img
                                    key={movie.id}
                                    onClick={() => handleClick(movie)}
                                    className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                                    src={`${BASE_URL}${
                                        isLargeRow ? movie.poster_path : movie.backdrop_path
                                    }`}
                                    loading="lazy"
                                    alt={movie.name}
                                />
                            </SwiperSlide>
                        ))}
                    </div>

                    {modalOpen && (
                        <MovieModal {...movieSelected} setModalOpen={setModalOpen}></MovieModal>
                    )}
                </Swiper>
            </section>
        </div>
    );
};

export default Row;
