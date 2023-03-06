import React,{useState,useEffect,useRef} from 'react'
import { Card, Col, Row,ButtonGroup,Button, Nav,OverlayTrigger,Tooltip,Modal, Form } from 'react-bootstrap'
import {FiPlayCircle,FiVolume1,FiVolume2,FiVolumeX,FiHeart} from 'react-icons/fi'
import {BsFillPauseCircleFill,BsFillHeartFill, BsFacebook,BsWhatsapp,BsFileEarmarkText, BsTwitter} from 'react-icons/bs'
import {MdOutlineLibraryAdd,MdOutlineLibraryAddCheck} from 'react-icons/md'
import {RiShareForwardFill,RiArrowLeftSLine,RiArrowRightSLine,RiShareForwardLine} from 'react-icons/ri'
import graycard from '../Img/cardbackground.png'
import purplecard from '../Img/purplecard.png'
import axios from 'axios'
import { doc, setDoc, updateDoc, getDocs,collection, arrayUnion, arrayRemove,getDoc} from "firebase/firestore";
import db from '../Config/firebase'

export default function RadioPlayer({stationPost,stationPut,stationSelect,userLevel}) {
    const [secondList,setSecondList] = useState(['Romanticas','Fiesta','HardRock y Metal','Indie y alternativa'])
    const [stSelect,setStSelect] = useState('')

    const [statePlay,setStatePlay] = useState(false)
    const [togAudioVolume,setTogAudioVolume] = useState(false)
    const [togAboutUs,setTogAboutUs] = useState(false)
    const [togLikeIt,setTogLikeIt] = useState(false)
    const [togShare,setTogShare] = useState(false)
    const [metaFav,setMetaFav] = useState()
    const [loadNow,setLoadNow] = useState(false)
  //
  const authKey = "waittofuntion"
    const [stationExist,setStationExist] = useState(false)
    const [categoryRadio,setCategoryRadio] = useState('1')
    const [nameSong, setNameSong] = useState('')
    const [nameArtist, setNameArtist] = useState('')
    const [checkNowPlaying,setCheckNowPlaying] = useState()
    const [loadAudioPlain,setLoadAudioPlain] = useState("")
    const [getSrcImage,setGetSrcImage] = useState("")
    const [playNow,setPlayNow] = useState(false)
    const [statePlayingNow,setStatePlayingNow] = useState(false)
    const audioPlayer = useRef();
    const [currentTime, setCurrentTime] = useState(0);
    const [seekValue, setSeekValue] = useState(0);
    const [stationToPlay,setStationToPlay] = useState('http://3.80.162.228/radio/8000/radio.mp3')
    const [maxNumberLikeIt,setMaxNumberLikeIt] = useState()
    const [userDefaultDataExist,setUserDefaultDataExist] = useState(false)
    const [defaultValues,setDefaultValues] = useState([])
    const [modalToShare,setModalToShare] = useState(false)
    const [likeIsTrue,setLikeIsTrue] = useState(false)
    const [userIdValue,setUserIdValue] = useState('')
    const [userFavorite,setUserFavorite] = useState([])
    const [actualFavorite,setActualFavorite] = useState('')
    const playerDom = document.querySelectorAll('#playereRdo')
  //
    const [toShateTxt,setToShareTxt] = useState('Escuchate esto en la estacion de Yoy')

  
    useEffect(() => {
      const reviewLikes = async()=>{
        const reviewStates = await getDocs(collection(db,'db_likeIt'))
        reviewStates.forEach((statesOver)=>{
          if(stationPost==statesOver.data().nameStation){
            setStationExist(true)
            setMaxNumberLikeIt(statesOver.data().maxNumberLike)
          }        
        })
      }
      const userReviewLikes = async()=>{
        const reviewStates = await getDocs(collection(db,'user_default_values'))
        reviewStates.forEach((userOver)=>{
          if(authKey==userOver.data().userId){
            setUserDefaultDataExist(true)
            setDefaultValues(userOver.data().metaLikeIt)
            setUserFavorite(userOver.data().userListFav)
            setUserIdValue(userOver.id)          
            console.log(userOver.data().userListFav)
          }        
        })
      }
      reviewLikes()
      userReviewLikes()
    }, [])  

    useEffect(() => {
      if(userDefaultDataExist==true){
        const loadLikes = ()=>{
          console.log(defaultValues)
          defaultValues.map((dataVal)=>{        
             if(dataVal==stationPost){
              setTogLikeIt(true) 
            }
          })
        }
        const loadFavorite = ()=>{
            userFavorite.map((favData)=>{
            console.log(favData)
            if(favData==stationPost){
              setTogAboutUs(true)
              setActualFavorite(favData)            
            }
          })
        } 
        loadLikes()     
        loadFavorite()
      }
    }, [defaultValues,userDefaultDataExist,userFavorite])


    const toggleOnVolume = () => { 
      playerDom[0].volume = 0.85;   
      setTogAudioVolume(false)   
  }

  const toggleOfVolume = () => {   
      playerDom[0].volume = 0.3; 
      setTogAudioVolume(true)
  }  
  // Logica de añadir a favoritos / logic add favotire
  const toggleOfPlus =()=>{          
        if(userIdValue!='') {
          console.log(userIdValue)
          const dateTo = new Date()
          let dateNewOff = dateTo.getFullYear()+""+(dateTo.getMonth()+1)+""+dateTo.getDate()                   
            //need to conect a bs to save user and plus number               
            const updateOrCheck = async()=>{
              const docRef = doc(db, "user_default_values", userIdValue);
              console.log(actualFavorite)
              if(actualFavorite==stationPost){                                        
                await updateDoc(docRef, {                  
                  userListFav : arrayRemove(actualFavorite)            
                })
                setTogAboutUs(false)
              }   else{
                await updateDoc(docRef, {                  
                  userListFav : arrayUnion(stationPost)                   
                })
                setTogAboutUs(true)
              } 
            }           
            updateOrCheck()
          }           
    }

  const toggleOnPlus = ()=>{
    toggleOfPlus()
  }
// Buttom of share
  const toggleOfShare = ()=>{
    setTogShare(true)
    setModalToShare(true)
  };const modalToClose = ()=> { 
    setModalToShare(false)
    setTogShare(false)  
  };const toggleOnShare = ()=>{
    setTogShare(false)
  }
// Buttom of Like
  const toggleOnLikeIt =()=>{
    const reviewLikes = async()=>{
      const reviewStates = await getDocs(collection(db,'db_likeIt'))
       reviewStates.forEach((statesOver)=>{
        if(stationPost==statesOver.data().nameStation){
          const quitLikeIt = async()=>{
              const docRef = doc(db, "db_likeIt", stationPost);
              const userRef = doc(db, "user_default_values", userIdValue);
              let truePut = Number(statesOver.data().maxNumberLike) - 1
              console.log(truePut)        
                await updateDoc(docRef, {
                    maxNumberLike:truePut
                   });
                await updateDoc(userRef, {                  
                    metaLikeIt : arrayRemove(stationPost)          
                  })
                   setTogLikeIt(false)
              } 
              quitLikeIt()   
        }        
      })
    }
    reviewLikes()         
  }

  const toggleOfLikeIt =()=>{    
    if(userLevel==true) {
    const dateTo = new Date()
    let dateNewOff = dateTo.getFullYear()+""+(dateTo.getMonth()+1)+""+dateTo.getDate()  
      setTogLikeIt(true)   
      //need to conect a bs to save user and plus number   
      const updateOrCheck = async()=>{
        const docRef = doc(db, "db_likeIt", stationPost);
        if(stationExist==true){          
         let loadDatas =  await getDoc(docRef)
          console.log(loadDatas.data().maxNumberLike) 
            let truePut =  Number(loadDatas.data().maxNumberLike) + 1                   
            await updateDoc(docRef, {
                maxNumberLike:truePut,
                lastLikeIt:dateNewOff
                })
           setTogLikeIt(true)                
        }
        else{
          await setDoc(docRef, {
             nameStation: stationPost,
             fistLikeIt:dateNewOff,
             idItem:"valueCategory",
             keyRndAdmin:"564185hohoakaak",
             lastLikeIt:dateNewOff,
             maxNumberLike:"1"             
           });
        }         
      }
      updateOrCheck()
    }
    if(userIdValue!='') {      
        const updateOrChecks = async()=>{
          const docRef = doc(db, "user_default_values", userIdValue);
          if(defaultValues==stationPost){                           
            await updateDoc(docRef, {                  
              metaLikeIt : arrayRemove(stationPost)            
            }) 
          }   else{
            await updateDoc(docRef, {                  
              metaLikeIt : arrayUnion(stationPost)                   
            })
          } 
        }           
        updateOrChecks()
      }           
  }
  
 useEffect(() => {
   if(!loadNow) return

   console.log(metaFav)
   
 }, [metaFav,loadNow])
 


    const instanceRadio = axios.create({
      baseURL: 'http://3.80.162.228/',
      headers: {"X-API-Key": "da615b8857d47b08:5519a2dfc683fe5045be2026da215eda"}
    });
  
    useEffect(()=>{
      if(!stationPost) return
      console.log(stationPost)
      decoderStationChoise()

    },[stationPost])
    
  
      const decoderStationChoise = ()=>{
        console.log(stationPost)
          
          if(stationPost=='pop en ingles'||stationPost=='Pop en ingles'){
           setStationToPlay('http://3.80.162.228/radio/8000/radio.mp3')
           setCategoryRadio('2')
         }
         if(stationPost=='hardrock y metal'||stationPost=='HardRock y Metal'){
          setCategoryRadio('7')
          setStationToPlay('http://3.80.162.228/radio/8010/radio.mp3')
        } 
         if(stationPost=='rock en español'||stationPost=='Rock en español'){
           setCategoryRadio('3')
           setStationToPlay('http://3.80.162.228/radio/8020/radio.mp3')
         }        
        if(stationPost=='fiesta'||stationPost=='Fiesta'){
          setCategoryRadio('8')
          setStationToPlay('http://3.80.162.228/radio/8030/radio.mp3')
        } 
        if(stationPost=='indie y alternativa'||stationPost=='Indie y alternativa'){
          setCategoryRadio('9')
          setStationToPlay('http://3.80.162.228/radio/8040/radio.mp3')
        }
        if(stationPost=='banda y grupera'||stationPost=='Banda y Grupera'){
          setCategoryRadio('6')
          setStationToPlay('http://3.80.162.228/radio/8050/radio.mp3')
        } 
        if(stationPost=='rock en ingles'||stationPost=='Rock en ingles'){
          setStationToPlay('http://3.80.162.228/radio/8060/radio.mp3')
          setCategoryRadio('1')
        } 
        if(stationPost=='pop en español'||stationPost=='Pop en español'){
          setCategoryRadio('4')
          setStationToPlay('http://3.80.162.228:8070/radio/radio.mp3')
        }
        if(stationPost=='romanticas'||stationPost=='Romanticas'){
          setCategoryRadio('10')
          setStationToPlay('http://3.80.162.228/radio/8090/radio.mp3')
        }
        if(stationPost=='top100'||stationPost=='Top100'){
          setCategoryRadio('5')
          setStationToPlay('http://3.80.162.228/radio/8100/radio.mp3')
        }   
    }
       
        const play = () => {
          audioPlayer.current.play();
          setStatePlay(true)   
        };
       
        const pause = () => {
          audioPlayer.current.pause();      
          setStatePlay(false)
        };
        const stop = () => {
          audioPlayer.current.pause();
          audioPlayer.current.currentTime = 0;
          setStatePlay(false)
        };
        const setSpeed = (speed) => {
          audioPlayer.current.playbackRate = speed;
        };
        const onPlaying = () => {
          setCurrentTime(audioPlayer.current.currentTime);
          setSeekValue(
            (audioPlayer.current.currentTime / audioPlayer.current.duration) * 100
          );
        };

    //A598aca5d9A5c955cDb25Fb84574ACcaF8
    //da615b8857d47b08:5519a2dfc683fe5045be2026da215eda
    useEffect(() => {
   
          //console.log(instanceRadio)
        const loadFiles = async()=>{               
               await instanceRadio.get('https://3.80.162.228/api/station/1/files',{
              "Authorization" : "da615b8857d47b08:5519a2dfc683fe5045be2026da215eda"
           })
           .then((response) => {
               console.log(response)
                      }).
                  catch((error) => {
                      console.error(error);
                   })
               }  
            loadFiles()
      }, []);

  useEffect(()=>{
      if(!stSelect) return
      console.log(stSelect)
      stop()
      stationSelect(stSelect)        
  },[stSelect])

     function backMain(){
        stationPut('radio')
     }

  const shareFb = ()=>{
    window.open("https://api.whatsapp.com/send?Title=Hey"+toShateTxt +" http://yoycast.herokuapp.com/ y sintoniza la estacion"+ stationPost)
  }

  const shareTw = ()=>{
    window.open("https://www.facebook.com/sharer/sharer.php?"+toShateTxt+" u=http://yoycast.herokuapp.com/ y sintoniza" + stationPost)
   }

  const shareCp = ()=>{

  }

  return (
    <>
    <div className='width-100-space'>
       <Row className='margin-ltr-5 web-view paddin-top-5'>
           <p onClick={()=>{backMain()}} style={{color:'white'}}><RiArrowLeftSLine/><span style={{fontStyle:'italic'}}>{stationPost}</span></p>
            <Col className='limit-card'>
                <Card className='height-100 width-100-space'>
                    <Card.Text className='position-absolute left-10'>titulo editable</Card.Text>                    
                        <Card.Img className='height-100'src={graycard}></Card.Img>
                        <Nav className='bkgr-color-nav-player ' > 
                            <Nav.Item className='f-size-18 c-pointer  m-5-i' onClick={()=>{
                                 statePlay==false ?   play(): pause()  }}>{statePlay==false ? <FiPlayCircle/>: <BsFillPauseCircleFill/> }</Nav.Item>
                            <Nav className="justify-content-end p-absolute">
                                <Nav.Item  className='f-size-18 m-5-i' onClick={()=>{togAudioVolume==false ? toggleOfVolume() : toggleOnVolume ();}}>
                                  {togAudioVolume==false ?   <FiVolume2/>: <FiVolume1/>}</Nav.Item>
                                  {userLevel==true ? <OverlayTrigger
                                   key='fav'
                                   placement='bottom'
                                   overlay={<Tooltip id={`tooltip-top`}><strong>Añadir a favoritos</strong></Tooltip>}>
                                   <Nav.Item  className='f-size-18 m-5-i' onClick={()=>{ togAboutUs==false ? toggleOfPlus() : toggleOnPlus ();}}>{togAboutUs==false ? <MdOutlineLibraryAdd/>: <MdOutlineLibraryAddCheck/> }</Nav.Item>
                                   </OverlayTrigger>:<OverlayTrigger
                                    key='fav-nosesion'
                                    placement='bottom'
                                    overlay={<Tooltip id={`tooltip-top`}><strong>Inicia sesion</strong></Tooltip>}>
                                    <Nav.Item  className='f-size-18 m-5-i' id="btn-liked"><MdOutlineLibraryAdd/></Nav.Item></OverlayTrigger>}
                                   {userLevel==true ? <OverlayTrigger
                                    key='likeIt'
                                    placement='bottom'
                                    overlay={<Tooltip id={`tooltip-top`}><strong>{maxNumberLikeIt}</strong></Tooltip>}>
                                    <Nav.Item  className='f-size-18 m-5-i' onClick={()=>{ togLikeIt==false ? toggleOfLikeIt() : toggleOnLikeIt ();}}>{togLikeIt==false ? <FiHeart/>: <BsFillHeartFill/> }</Nav.Item>
                                    </OverlayTrigger>:<OverlayTrigger
                                     key='likeIt-nosesion'
                                     placement='bottom'
                                     overlay={<Tooltip id={`tooltip-top`}><strong>Inicia sesion</strong></Tooltip>}>
                                    <Nav.Item  className='f-size-18 m-5-i'  id="btn-liked"><FiHeart/></Nav.Item></OverlayTrigger>}   
                                 <Nav.Item  className='f-size-18 m-5-i' onClick={()=>{togShare==false ? toggleOfShare() : toggleOnShare ();}}>{ togShare==false ? <RiShareForwardLine/>:<RiShareForwardFill/>}</Nav.Item>
                             </Nav>                                    
                        </Nav>
                </Card>
                <audio  
                  id='playereRdo'
                   ref={audioPlayer}
                   onTimeUpdate={onPlaying} 
                   style={{display:'none'}} 
                   src={stationToPlay}></audio>  
            </Col>
            <Col className='limit-card' lg="4">
                <Card className='height-100'>
                        <Card.Img  className='height-100'src={graycard}></Card.Img>
                </Card>
            </Col>
       </Row>
       <Row className='margin-ltr-5 web-view'>
       <div className='row'>
            <div className='col'>
               <p  className="txt-color">Estaciones recomendadas</p>
            </div>
            <div  className='col'>
                <span  className="txt-color" style={{fontSize:'0.58em'}} >Ver más <RiArrowRightSLine/></span>
            </div>          
       </div>
          {secondList.map((stationList)=>(
            <Col lg="2" xs   className='limit-card' key={stationList}  onClick={()=>setStSelect(stationList)}>
                     <Card className='height-100 card-select-magic'>
                     <Card.Title className='p-absolute'>{stationList}</Card.Title>
                         <Card.Img className='height-100 ' src={graycard}/>
                         <Card.Img className='position-absolute height-100 show-hover'src={purplecard}></Card.Img>
                     </Card>
                </Col>
            ))}
            <Col className='limit-card' xs lg="4">
                <Card className='height-100'>        
                       <Card.Img className='height-100' src={graycard}></Card.Img>
                </Card>
            </Col>
        </Row>
        <Row className='margin-ltr-5 web-view'>
       <div className='row'>
            <div className='col'>
               <p  className="txt-color">Podcast recomendadas</p>
            </div>
            <div  className='col'>
                <span  className="txt-color" style={{fontSize:'0.58em'}} onClick={()=>{backMain()}}>Ver más <RiArrowRightSLine/></span>
            </div>          
       </div>
          {secondList.map((stationList)=>(
            <Col lg="2" xs   className='limit-card' key={stationList} onClick={()=>setStSelect(stationList)}>
                     <Card className='height-100 card-select-magic'>
                     <Card.Title className='p-absolute'>{stationList}</Card.Title>
                         <Card.Img className='height-100 ' src={graycard}/>
                         <Card.Img className='position-absolute height-100 show-hover'src={purplecard}></Card.Img>
                     </Card>
                </Col>
            ))}
            <Col className='limit-card' xs lg="4">
                <Card className='height-100'>        
                       <Card.Img className='height-100' src={graycard}></Card.Img>
                </Card>
            </Col>
        </Row>
        <Modal show={modalToShare} onHide={modalToClose}>
          <Modal.Header closeButton></Modal.Header>          
          <Modal.Body>
            <Modal.Title className='App color-white'>Compartir <span>{stationPost}</span></Modal.Title>
            <Modal.Title className='App m-5-i p-t-c'>Conecta tus redes y comparte lo que estas escuchando</Modal.Title>
            <img className='img-modal' src={graycard} style={{paddingLeft:'20%',paddingRight:'20%',paddingBottom:'5%',width:'100%'}}/>
            
            <Row className='App'>              
              <Col>
                  <Button onClick={()=>{shareTw()}} className='txt-side-42 btn-s-s'><span className='txt-start'><BsTwitter/></span>Twitter</Button>                
              </Col>
            </Row>
            <Row  className='App'>
              <Col><Button onClick={()=>{shareTw()}} className='txt-side-42 btn-s-s'><span className='txt-start'><BsFacebook/></span>Facebook</Button>
              </Col>
            </Row>  
            <Modal.Title className='App m-5-i p-t-c'>Si deseas serguir con la versin sin costo y con comerciales da <span className='c-pointer' style={{textDecoration:'underline',color:'white'}}>click aqui</span></Modal.Title>
          </Modal.Body>
        </Modal>
    </div>
    </>
  )
}
