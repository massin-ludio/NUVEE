import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {Carousel} from 'react-bootstrap'
export default function MadeCarousel({sourceDB}) {

  
  const [tmdbData,setTmdbData] = useState(sourceDB)
  const apiKey = '00f019191c205c1208fd3d615b9fb303'
  const madeCarousel = ['a1','b1','c1','d1','e1','f1','g1','h1','i1','j1','k1','l1','m1','n1','1o']
  const [loadDb,setLoadDb] = useState(false)
  const madeUrl = 'https://www.themoviedb.org/t/p/w440_and_h660_face'


  useEffect(() => {
      console.log('sand')
      console.log(sourceDB)   
  }, [])

  function loadResurses(as){
    return  <Carousel  variant="dark" className='width-100-space'>
    {madeCarousel.map((inx,ind)=>(
     <div key={ind}>
       <Carousel.Item >
        <img 
           className='d-block w-100'
           src={madeUrl+as.data.results[ind].poster_path}
           alt="no load.jpg"
           />
           <p>{ind}</p>
       </Carousel.Item>
       <Carousel.Caption>
         <h5>First slide label</h5>
         <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
       </Carousel.Caption>
     </div>      
    ))} 
  </Carousel>
  }


  return (
    <>
       {loadResurses(tmdbData)}     
    </>
  )
}
