import React from "react";
import {Link} from 'react-router-dom';


const image = "https://image.tmdb.org/t/p/w1280";

function SliderCardMk(pelicula) {

	return (
		<div className="image-container">
			<Link to={"/peliculas/"+pelicula.id}>
			<img className="popularmovies-image" src={image + pelicula.poster_path}/>
			</Link>
		</div>
	)
}

export default SliderCardMk;