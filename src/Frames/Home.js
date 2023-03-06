import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {Carousel,Card, Row,Col} from 'react-bootstrap'
import MadeCarousel from '../Squares/MadeCarousel'
import purplecard from '../Img/purplecard.png'
import SliderBest from '../Squares/SliderBest'

export default function Home() {

  const [tmdbData,setTmdbData] = useState([])
  const [popData,setPopData] = useState([])
  const apiKey = '00f019191c205c1208fd3d615b9fb303'
  const madeCarousel = ['a1','b1','c1','d1','e1','f1','g1','h1','i1','j1','k1','l1','m1','n1','1o']
  const [loadDb,setLoadDb] = useState(false)
  const madeUrl = 'http://www.themoviedb.org/t/p/w1280'
  const [loadResurses,setLoadResurses] = useState(false)
  const instanceOndeman = axios.create({
    baseURL: 'http://api.themoviedb.org'
  });


  useEffect(() => {
    instanceOndeman.defaults.headers.common = {
      "X-API-Key": "da615b8857d47b08:5519a2dfc683fe5045be2026da215eda",
    };
   
    const getRes = async ()=>{
      await axios.get('https://api.themoviedb.org/3/trending/all/day?api_key='+apiKey+'&language=es-ES')
      .then((res) =>{
        console.log(res.data.results)
         setTmdbData(res.data.results)       
      })
      .catch((err)=>{
        console.log(err)
      }).then(()=>{setLoadDb(true)
      console.log('sda')
      setLoadResurses(true)})
      await axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=00f019191c205c1208fd3d615b9fb303&language=es-ES')
      .then((res) =>{
        console.log(res.data.results)
         setPopData(res.data.results)       
      })
      .catch((err)=>{
        console.log(err)
      })    
    }   
    getRes()
  }, [])


  useEffect(()=>{
    if(tmdbData!=[]) {
      console.log(tmdbData)
    } else{
      console.log(tmdbData)
      setLoadDb(true)
    }
  },[tmdbData])


  return (
    <><Carousel variant='dark' className='w-100'>
      {loadResurses==true ?       
       tmdbData.map((a,i)=>( 
          <Carousel.Item key={i}>
            <Card>
              <Card.Body className='purple-card'> 
                <Card.Title id={i} >{a.title}</Card.Title>
                <Card.Img className='p-absolute height-100 show-hover'src={purplecard}></Card.Img>
                <Card.Img className='carousel-img' src={madeUrl+a.poster_path}></Card.Img>                
              </Card.Body>
            </Card>
          </Carousel.Item>

      )):<></>  }
      </Carousel>
      <Row className='position-absolute w-100'>
        <Col className="card-col">
          <SliderBest />
        </Col>
      </Row>
    </>
  )
}

