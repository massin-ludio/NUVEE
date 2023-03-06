import React,{useState,useEffect} from 'react'
import { Card, FormControl, InputGroup, Row ,Col, Button, Dropdown} from 'react-bootstrap'
import db from '../Config/firebase'
import { collection,addDoc,arrayUnion, getDocs } from 'firebase/firestore'
import Wirecardcategory from './Wirecardcategory'

export default function Wirecategoryload() {
    const [categoryName,setCategoryName] = useState('')
    const [upToServerOn,setUpToSeverOn] = useState(false)
    const [desValue,setDesValue] = useState('')
    const [aboutVideo,setAboutVideo] = useState('')
    const [keyWords,setKeyWords] = useState('')
    const [cardMakerId,setCardMakerId] = useState(['categoria=clasicos','desValue=los 90'])
    const [loadData,setLoadData] = useState(false)
    const [controlerOff,setControlerOff] = useState(false)
    
    useEffect(() => {
      if(!upToServerOn) return
      const upToServer = async()=>{
          try{
              await addDoc(collection(db,'movie_category'),{
                  categoria:categoryName,
                  datosAbout:aboutVideo,
                  categoryDes:desValue,
                  keyWord:arrayUnion(keyWords),
                  idAgroup:'0',
                  dateCreateThis:Date()
              })
              alert('Succes')              
              setControlerOff(true)
            }
            catch(e){
                console.log(e)
            }
            setUpToSeverOn(false)
          }
          upToServer()        
    }, [upToServerOn])

  

   useEffect(()=>{
       setControlerOff(true)
   },[])

    useEffect(()=>{
        if(!controlerOff) return
        setLoadData(false) 
        const getDataOff = async()=>{
            const categoryCard = await getDocs(collection(db,'movie_category'))
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
        return loadData==false ? <div className='no-load'></div> :   <Wirecardcategory dataIn={dates}/>
    }
  
  return (
   <div className='margin-class'>
        <div className='card-margin  ' >
            <Row>
            <Col>
            <Card>
                <Card.Body>
                <Row>
                    <Col>
                      <p>Nombre de la categoria</p>
                        <InputGroup>
                           <FormControl
                              placeholder=''
                              type='text'
                              onChange={(e)=>{setCategoryName(e.target.value)}}
                           />
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                      <p>Descripcion</p>
                        <InputGroup>
                           <FormControl
                              placeholder=''
                              type='text'
                              onChange={(e)=>{setDesValue(e.target.value)}}
                           />
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                      <p>Datos sobre</p>
                        <InputGroup>
                           <FormControl
                              placeholder=''
                              type='text'
                              onChange={(e)=>{setAboutVideo(e.target.value)}}
                           />
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                      <p>Palabras claves</p>
                        <InputGroup>
                           <FormControl
                              placeholder=''
                              type='text'
                              onChange={(e)=>{setKeyWords(e.target.value);}}
                           />
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                       <Button variant='secondary' style={{width:'100%'}} onClick={()=>setUpToSeverOn(true)}>Crear categoria</Button>
                    </Col>
                </Row>
                </Card.Body>
            </Card>
            </Col>            
                <Col>            
                   {loadParamt(cardMakerId)}                                            
                </Col>
            </Row>
        </div>
  </div>
  )
}
