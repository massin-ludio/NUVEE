import React, { useState,useEffect } from 'react'
import { Card, Row, Col, Button, Form } from 'react-bootstrap'
import wirecard from './img/cardbackground.png'
import { storage } from '../wireframe/Config/firebase'
import { getDownloadURL,ref,uploadBytes } from 'firebase/storage'


export default function Wirethumbs(keyImg) {
  const [pushImg,setPushImg] = useState(wirecard) 
  const [pushViewImg,setPushViewImg] = useState(wirecard) 
  const [pushLogoImg,setPushLogoImg] = useState(wirecard) 
  const [levelUsuario,setLevelUsuario] = useState()
  const [loadResussesOff,setLoadResursesOff] = useState(false)
  const [titleImg,setTitleImg] = useState()
  const [viewImg,setViewImg] = useState()
  const [logoImg,setLogoImg] = useState()
  const [refreshNewTitleImg,setRefreshNewTitleImg] = useState()
  const [refreshNewViewImg,setRefreshNewViewImg] = useState()
  const [refreshNewLogoImg,setRefreshNewLogoImg] = useState()
  const [previewUrl,setPreviewUrl] = useState('')
  const [loadKey,setLoadKey] = useState(keyImg.keyImg)

  const getImgTitle = ()=>{
      let putImg = document.querySelectorAll('#titleImg')
      putImg[0].click()
  }
  const getImgLogo = ()=>{
    let putImg = document.querySelectorAll('#logoImg')
    putImg[0].click()
   }
  const getImgView = ()=>{
    let putImg = document.querySelectorAll('#viewImg')
    putImg[0].click()
   }
// functions about upload title image and view later to take
  useEffect(() => {
    setLoadKey(keyImg.keyImg)
    if(!titleImg) return
    let fileData = titleImg.target.files[0]
        console.log(fileData)
        const storageRef = ref(storage, 'video/Thumbs/Portada/'+loadKey+'/portada.jpg'); 
        uploadBytes(storageRef, fileData).then((snapshot) => {
            console.log(snapshot.metadata.fullPath);
            setRefreshNewTitleImg(true)
        })        
  }, [titleImg])

  useEffect(()=>{
    if(!levelUsuario) return
    setLevelUsuario('')
    setLoadResursesOff('')
    setPreviewUrl('')
  },[levelUsuario,loadResussesOff])

  useEffect(() => {
    if(!refreshNewTitleImg) return
    const loadResurses = ()=>{
       getDownloadURL(ref(storage, 'video/Thumbs/Portada/'+loadKey+'/portada.jpg'))
            .then((url) => {
               setPushImg(url)
            })
            .catch((error) => {
              console.log(error)
             });
      }
    loadResurses() 
    setRefreshNewTitleImg(false)     
    }, [refreshNewTitleImg])
//finish

useEffect(() => {
  if(!logoImg) return
  let fileData = logoImg.target.files[0]
      console.log(fileData)
      const storageRef = ref(storage, 'video/Thumbs/Logo/'+keyImg.keyImg+'/logo.jpg'); 
      uploadBytes(storageRef, fileData).then((snapshot) => {
          console.log(snapshot.metadata.fullPath);
          setRefreshNewLogoImg(true)
      })        
}, [logoImg])

useEffect(() => {
  if(!refreshNewLogoImg) return
  const loadResurses = ()=>{
     getDownloadURL(ref(storage, 'video/Thumbs/Logo/'+keyImg.keyImg+'/logo.jpg'))
          .then((url) => {
             setPushLogoImg(url)
          })
          .catch((error) => {
            console.log(error)
           });
    }
  loadResurses() 
  setRefreshNewLogoImg(false)     
  }, [refreshNewLogoImg])


// View options hot to up 
useEffect(() => {
  if(!viewImg) return
  console.log(previewUrl)
  let fileData = viewImg.target.files[0]
      console.log(fileData)
      const storageRef = ref(storage, 'video/Thumbs/Preview/'+keyImg.keyImg+'/preview.jpg'); 
      uploadBytes(storageRef, fileData).then((snapshot) => {
          console.log(snapshot.metadata.fullPath);
          console.log(snapshot);
          setRefreshNewViewImg(true)
       //   setPreviewUrl(getDownloadURL(ref(storage, snapshot.metadata.fullPath)))
      })        
}, [viewImg,previewUrl])

useEffect(() => {
  if(!refreshNewViewImg) return
  const loadResurses = ()=>{
     getDownloadURL(ref(storage, 'video/Thumbs/Preview/'+keyImg.keyImg+'/preview.jpg'))
          .then((url) => {
             setPushViewImg(url)
          })
          .catch((error) => {
            console.log(error)
           });
    }
  loadResurses() 
  setRefreshNewViewImg(false)     
  }, [refreshNewViewImg])


  return (
    <div className='App-header' >
        <Row style={{marginTop:'50px!important'}}>
            <Col>
               <Card className='thumb-img-title'>                     
                  <Card.Img onClick={()=>getImgTitle()} style={{zIndex:'5',borderRadiusBottomleft:'0px!important',borderRadiusBottomleft:'0px!imporant',height:'100%'}} src={pushImg}></Card.Img>
                  <span style={{fontSize:'0.4em',color:'gray',zIndex:'25',textAlign:'center'}}>Ratio: 9:16 Recomendado 1080 x 1920 Image: JPEG</span>                     
                  <br></br>
                  <Button>Subir</Button>
                </Card>
            </Col>           
              <Col>
              <div >
                  <Card className='thumb-img-logo'>
                    <Card.Img onClick={()=>getImgLogo()} style={{zIndex:'5',borderRadiusBottomleft:'0px!important',borderRadiusBottomleft:'0px!imporant',height:'100%'}} src={pushLogoImg}></Card.Img>
                    <span style={{fontSize:'0.4em',color:'gray',zIndex:'25',textAlign:'center'}}>Recomendado: 500px de ancho, Formato PNG con transparencia</span>                     
                </Card> 
              </div>
              <br></br>
              <div >
                  <Card className='thumb-img-view'>
                     <Card.Img onClick={()=>getImgView()} style={{zIndex:'5',borderRadiusBottomleft:'0px!important',borderRadiusBottomleft:'0px!imporant',height:'100%'}} src={pushViewImg}></Card.Img>
                     <span style={{fontSize:'0.4em',color:'gray',zIndex:'25',textAlign:'center'}}>Thumbs ratio 16:9 Recomendado 1920 x 1080, Image: JPEG</span>                     
                 </Card>
              </div>
            </Col>                     
        </Row>     
        <Form.Control
            style={{display:'none'}}
            id='titleImg'
            type='file'
            accept='image/png,image/jpeg'
            onChange={(e)=>setTitleImg(e)}
        />
        <Form.Control
            style={{display:'none'}}
            id='logoImg'
            type='file'
            accept='image/png,image/jpeg'
            onChange={(e)=>setLogoImg(e)}
        />
        <Form.Control
            style={{display:'none'}}
            id='viewImg'
            type='file'
            accept='image/png,image/jpeg'
            onChange={(e)=>setViewImg(e)}
        />
            
    </div>
  )
}

