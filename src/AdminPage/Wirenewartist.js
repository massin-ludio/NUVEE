import React,{useState,useEffect} from 'react'
import { Card, FormControl, InputGroup, Row ,Col, Button, Dropdown,Form,Alert,ToggleButton} from 'react-bootstrap'
import db from '../Config/firebase'
import { storage } from '../Config/firebase'
import { collection,addDoc,arrayUnion, getDocs } from 'firebase/firestore'
import Wirenewartistcard  from './Wirenewartistcard'
import { ref,uploadBytes,uploadBytesResumable,getDownloadURL } from 'firebase/storage'
import wirecard from '../Img/cardbackground.png'

let indexControl = 0;
export default function  Wirenewartist()  {
    const [artistName,setArtistName] = useState('')
    const [upToServerOn,setUpToSeverOn] = useState(false)
    const [giftArtist,setGiftArtist] = useState('')
    const [aboutArtist,setAboutArtist] = useState('')
    const [aboutArtistMap,setAboutArtistMap] = useState([])
    const [pushImgArt,setPushImgArt] = useState(wirecard)
    const [refreshNewArtImg,setRefreshNewArtImg] = useState(false)
    const [oscarReward,setOscarReward] = useState(false)
    const [goldenReward,setGoldenReward] = useState(false)
    const [emmyReward,setEmmyReward] = useState(false)
    

    const [keyWords,setKeyWords] = useState('')
    const [ageValue,setAgeValue] = useState('')
    const [cardMakerId,setCardMakerId] = useState(['categoria=clasicos','desValue=los 90'])
    const [loadData,setLoadData] = useState(false)
    const [controlerOff,setControlerOff] = useState(false)
    const [imgDwnArt,setImgDwnArt] = useState()
    const [deleteArtistAlert,setDeleteArtistAlert] = useState('')
    const [controlArrayAlert,setControlArray] = useState([true,true,true,true,true,true,true,true,true,true,true,true,true,true,true])
    let cntArray = [true,true,true,true,true,true,true,true,true,true,true,true,true,true,true]

    const [show0,setShow0] = useState(false)
    const [show1,setShow1] = useState(false)
    const [show2,setShow2] = useState(false)
    const [show3,setShow3] = useState(false)
    const [show4,setShow4] = useState(false)
    const [show5,setShow5] = useState(false)
    const [show6,setShow6] = useState(false)
    const [show7,setShow7] = useState(false)
    const [show8,setShow8] = useState(false)
    const [show9,setShow9] = useState(false) 
    
   useEffect(() => {
      if(!upToServerOn) return
      if(!artistName) return
      if(!aboutArtistMap) return
      if(!pushImgArt) return
      const upToServer = async()=>{
          try{
              await addDoc(collection(db,'artist_meta'),{
                  nombreArtista:artistName,
                  cumpleArt:ageValue,
                  oscarArt:oscarReward,
                  goldenArt:goldenReward,
                  emmyArt:emmyReward,
                  tagsArt:aboutArtistMap,
                  bestArt:'0',
                  likesArt:'0',
                  imgArt:pushImgArt,
                  dateCreateThis:Date()
              })
              alert('Succes') 
              document.querySelectorAll('.name-artist')[0].value = ''
              setArtistName('')
              setControlerOff(true)
            }
            catch(e){
                console.log(e)
            }
            setUpToSeverOn(false)
          }
          upToServer()        
    }, [upToServerOn,artistName,aboutArtistMap,pushImgArt])

   useEffect(()=>{
       setControlerOff(true)
   },[])

    useEffect(()=>{
        if(!controlerOff) return
        setLoadData(false) 
        const getDataOff = async()=>{
            const categoryCard = await getDocs(collection(db,'artist_meta'))
            console.log(cardMakerId)
            console.log(categoryCard.docChanges())
            setCardMakerId(categoryCard.docChanges())
            loadParamt(categoryCard.docChanges()) 
            categoryCard.forEach((cardOff)=>{
                console.log(cardOff)
                console.log(cardOff.data())
                setLoadData(true)                               
            })            
            console.log('loadparamt')
        }
        getDataOff()
        setControlerOff(false)
    },[controlerOff])

    function loadParamt(dates){
        return loadData==false ? <div className='no-load'></div> :   <Wirenewartistcard dataIn={dates}/>
    }    

    const getNewArtist = ()=>{   
        if(artistName==''){
            alert('primero ingresa un nombre')
            return
        }     
        let putImg = document.querySelectorAll('#newArtist')
        console.log(putImg)
        putImg[0].click()
    }

    // functions about upload title image and view later to take
  useEffect(() => {
    if(!imgDwnArt) return
    
    let fileData = imgDwnArt.target.files[0]
        console.log(fileData)
        const storageRef = ref(storage, 'Artistas/'+artistName+'/perfilfoto.jpg'); 
        uploadBytes(storageRef, fileData).then((snapshot) => {
            console.log(snapshot.metadata.fullPath);
            setRefreshNewArtImg(true)
        })        
  }, [imgDwnArt])

  useEffect(() => {
    if(!refreshNewArtImg) return
    const loadResurses = ()=>{
       getDownloadURL(ref(storage, 'Artistas/'+artistName+'/perfilfoto.jpg'))
            .then((url) => {
               setPushImgArt(url)
            })
            .catch((error) => {
              console.log(error)
             })
      }
    loadResurses() 
    setRefreshNewArtImg(false)     
    }, [refreshNewArtImg])
//finish
  
    const createSpanTag = (event)=> {
        indexControl++
        console.log(aboutArtist)
        console.log(aboutArtistMap)
     //   setShow(true)
        setAboutArtistMap([...aboutArtistMap,aboutArtist])
        setAboutArtist('')     
        document.querySelectorAll('.abouttag')[0].innerHTML = '' 
        document.querySelectorAll('.abouttag')[0].value = ''
      }
    
      const cardAlertClose = (int)=>{
          console.log(int)
          if(int=='alert0'){
           let toBlock = document.querySelectorAll('.alert0')
           toBlock[0].style.display = 'none'
          }
          if(int=='alert1'){
            let toBlock = document.querySelectorAll('.alert1')
            toBlock[0].style.display = 'none'
           }
           if(int=='alert2'){
            let toBlock = document.querySelectorAll('.alert2')
            toBlock[0].style.display = 'none'
           }
           if(int=='alert3'){
            let toBlock = document.querySelectorAll('.alert3')
            toBlock[0].style.display = 'none'
           }
           if(int=='alert4'){
            let toBlock = document.querySelectorAll('.alert4')
            toBlock[0].style.display = 'none'
           }
           if(int=='alert5'){
            let toBlock = document.querySelectorAll('.alert5')
            toBlock[0].style.display = 'none'
           }
           if(int=='alert6'){
            let toBlock = document.querySelectorAll('.alert6')
            toBlock[0].style.display = 'none'
           }
           if(int=='alert7'){
            let toBlock = document.querySelectorAll('.alert7')
            toBlock[0].style.display = 'none'
           }
           if(int=='alert8'){
            let toBlock = document.querySelectorAll('.alert8')
            toBlock[0].style.display = 'none'
           }
           if(int=='alert9'){
            let toBlock = document.querySelectorAll('.alert9')
            toBlock[0].style.display = 'none'
           }
      }

  return (
   <div className='margin-class-card'>
        <div className='card-margin ' >
            <Row>
            <Col  sm={9}>
            <Card>
                <Card.Body>
                <Row>
                    <Col>
                    <p>Artista</p>  
                    <Card className='thumb-img-view'>
                         <Card.Img onClick={()=>{getNewArtist()}} style={{zIndex:'5',borderRadiusBottomleft:'0px!important',       borderRadiusBottomleft:'0px!imporant',height:'100%'}} src={pushImgArt}></Card.Img>
                         <span style={{fontSize:'0.4em',color:'gray',zIndex:'25',textAlign:'center'}}>Thumbs ratio 16:9 Recomendado 1920 x 1080, Image: JPEG</span>                    
                    </Card>
                    <Form.Control
                        style={{display:'none'}}
                        id='newArtist'
                        type='file'
                        onChange={(e)=>setImgDwnArt(e)}
                        />
                    </Col>                    
                    <Col>
                      <p>Nombre del artista</p>
                        <InputGroup>
                           <FormControl
                              className='name-artist'
                              placeholder=''
                              type='text'
                              onChange={(e)=>{setArtistName(e.target.value);}}
                           />
                        </InputGroup>
                        <br/>
                        <p>Cumpleaños</p>
                        <InputGroup>
                           <FormControl
                              placeholder=''
                              type='date'
                              onChange={(e)=>{setAgeValue(e.target.value);}}
                           />
                        </InputGroup>
                        <br></br>
                        <ToggleButton    
                           style={{margin:'5px',marginLeft:'15px'}}

                           className="mb-2"
                           id="toggle-check"
                           type="checkbox"
                           variant="outline-primary"
                           checked={oscarReward}
                           value="Oscar"
                           onChange={(e) => {setOscarReward(e.currentTarget.checked);console.log(e.currentTarget.checked)}}
                           >Oscar</ToggleButton>
                           <ToggleButton  
                            style={{margin:'5px'}}         
                            className="mb-2"
                            id="toggle-check"
                            type="checkbox"
                            variant="outline-primary"
                            checked={goldenReward}
                            value="Globos de Oro"
                            onChange={(e) => setGoldenReward(e.currentTarget.checked)}
                            >Globos oro</ToggleButton>
                          <ToggleButton
                             style={{margin:'5px'}}           
                             className="mb-2"
                             id="toggle-check"
                             type="checkbox"
                             variant="outline-primary"
                             checked={emmyReward}
                             value="Emmy"
                             onChange={(e) => setEmmyReward(e.currentTarget.checked)}
                             >Emmy</ToggleButton> 
                        </Col>
                     </Row>
                           
                  <p>Tags</p>
                      <Row>
                          {aboutArtistMap.map((tagIn,ind)=>(
                          <Col key={ind} className={'alert'+ind}>
                            <Alert  show={cntArray[ind]} style={{zIndex:'40',marginLeft:'5px',width:'150px',height:'50px'}} variant="success" onClose={(e) =>{cardAlertClose('alert'+ind)}} dismissible>
                                <p>{tagIn}</p>                   
                             </Alert>
                           </Col>
                          ))}    
                        </Row>  
                        <Row>
                          <Col>               
                          <InputGroup>                        
                           <FormControl
                              className='abouttag'
                              placeholder=''
                              type='text'
                              maxLength={16}
                              onChange={(e)=>{setAboutArtist(e.target.value);}}
                              onKeyPress={(e)=>{if((e.charCode)==13||(e.charCode)==32){createSpanTag()}}}
                           />
                        </InputGroup>
                        </Col>     
                      </Row> 
      
                <Row>
                    <Col>
                       <Button variant='secondary' style={{width:'100%'}} onClick={()=>setUpToSeverOn(true)}>Guardar</Button>
                    </Col>
                </Row>
                </Card.Body>
            </Card>
            </Col>                                                     
               <Col sm={3}>
                {loadParamt(cardMakerId)}  
             </Col>  
            </Row> 
                       
        </div>
  </div>
  )
}
