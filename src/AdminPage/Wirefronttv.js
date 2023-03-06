import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Card, Modal } from 'react-bootstrap'
import { storage } from '../Config/firebase'
import { getDownloadURL,ref } from 'firebase/storage'
import db from '../Config/firebase'
import wirecard from '../Img/cardbackground.png'
import ShakaPlayer from 'shaka-player-react';
import 'shaka-player-react/dist/controls.css';


export default function Wirefronttv() {
    const [laodData,setLoadData] = useState([])
    const [pushImg,setPushImg] = useState([wirecard]) 
    const [pushMovie,setPushMovie] = useState('') 
    const [videoShowId,setVideoShowId] = useState(false)

 
    useEffect(()=>{     
      const getDataOff = async()=>{
        const categoryCard = await getDocs(collection(db,'movie_metadata'))        
        setLoadData(categoryCard.docChanges())  
    }
    getDataOff()
    },[])

    useEffect(() => {
      if(!laodData) return      
      showCardMovie(laodData)   
    }, [laodData])    
   

      const getMoreInfo = (idVideoToShow)=>{
        console.log('menu card modal con la edicion de los datos del video')
        const loadResurses = ()=>{
          getDownloadURL(ref(storage, '/video/Peliculas/'+idVideoToShow+'/movie.mp4'))
               .then((url) => {
                 console.log(url)
                  setPushMovie(url)
                  setVideoShowId(true)
               })
               .catch((error) => {
                 console.log(error)
                });
         }
       loadResurses() 

      }

      const toHideVideoID = ()=>{
        setVideoShowId(false)
      }

      function showCardMovie(newVideo) {
        return newVideo.map((movie,ind)=>(
        <Card className='thumb-movie-view' id={movie.doc.data().idVideo}  key={movie.doc.data().idVideo}>
            <Card.Img id={ind+1} onClick={()=>getMoreInfo(movie.doc.data().idVideo)} style={{zIndex:'5',borderRadiusBottomleft:'0px!important',borderRadiusBottomleft:'0px!imporant',height:'100%'}} src={movie.doc.data().urlTitle}></Card.Img>
              <span style={{fontSize:'0.8em',color:'gray',zIndex:'25',textAlign:'center'}}>{movie.doc.data().nombreVideo}</span>   
            </Card>))
      }  

  return (
    <div>
       
         <div>
           
           {showCardMovie(laodData)}
         </div>
         <Modal show={videoShowId} onHide={toHideVideoID}>
           <Card>
             <Card.Body>
             <ShakaPlayer 
              src={pushMovie} 
              className='react-player'             
              width='500px'
              height='275px'
              />
             </Card.Body>
           </Card>
         </Modal>
    </div>
  )
}
