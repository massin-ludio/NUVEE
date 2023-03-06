import React from "react";
import Button from 'react-bootstrap';
import {Link} from 'react-router-dom';

const image = "https://image.tmdb.org/t/p/w1280";

function SliderCardSerie(serie){
	return (
		<div className="image-container">
			<Link to={"/series/"+serie.id}>
			<img className="popularmovies-image" src={image + serie.poster_path}/>
			</Link>
		 </div>
	)
}

export default SliderCardSerie;