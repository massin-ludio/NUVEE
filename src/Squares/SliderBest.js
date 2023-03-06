import React , {useState, useEffect} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Container} from "react-bootstrap";
import SliderCardMk from "./SliderCardMk";
import SliderCardSerie from "./SliderCardSerie"

export default function SliderBest() {
      var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 4,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 2
            }
          }
        ]
      };
      
    const [results, setResults] = useState([]);
    const [resultsS, setResultsS] = useState([]);
    const [popular,setPopular] = useState([]);

    useEffect(() => {
      fetch('https://api.themoviedb.org/3/trending/all/day?api_key=00f019191c205c1208fd3d615b9fb303&language=es-ES')
            .then((res) => res.json())
            .then((data) => {
                      setResults(data.results);
            })
        .catch((error)=>{
          console.log(error)
        })
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=00f019191c205c1208fd3d615b9fb303&language=es-ES')
            .then((res) => res.json())
            .then((data) => {
                      setPopular(data.results);
            })
        .catch((error)=>{
          console.log(error)
        })
    }, []);

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/tv/popular?api_key=c2c2cd525b5005c063f7b1a9d54ab699&language=es-ES&page=1')
            .then((res) => res.json())
            .then((data) => {
                      setResultsS(data.results);
          })
        .catch((error)=>{
          console.log(error)
        })
    }, []);

  return ( 
  <div className="SliderBest">
         
         <Container fluid >
            <h4>Películas nuevas</h4>
              <Slider {...settings} > 
                 {results.length > 0 && results.map((result)=><SliderCardMk key={result.id} {...result} />)}
              </Slider> 
        </Container>
        <br></br>
      <Container fluid >
		    <Slider {...settings}> 
          {resultsS.length > 0 && resultsS.map((result)=><SliderCardSerie key={result.id} {...result} />)}
		    </Slider> 
      </Container>
	</div>
  )
}
