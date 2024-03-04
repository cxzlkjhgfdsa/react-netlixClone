import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import instance from "../../api/axios";
import "./DetailPage.css";

const DetailPage = () => {
    let { movieId } = useParams();
    const [movies, setMovies] = useState({});

    useEffect(() => {
        async function fetchData() {
            const request = await instance.get(`movie/${movieId}`);
            setMovies(request.data);
        }
        fetchData();
    }, [movieId]);

    return (
        <section>
            <img
                className="modal__poster-img"
                src={`https://image.tmdb.org/t/p/original/${movies.backdrop_path}`}
                alt="modal__poster-img"
            />
        </section>
    );
};

export default DetailPage;
