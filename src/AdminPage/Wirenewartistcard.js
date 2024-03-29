import React,{useEffect, useState} from 'react'
import { Dropdown,Card,Row,Col, Modal, ModalBody, Button } from 'react-bootstrap'
import db from '../Config/firebase'
import { collection,getDocs,doc,deleteDoc } from 'firebase/firestore'
import {BsXCircle} from 'react-icons/bs'
export default function Wirenewartistcard(dataIn) {
    const [loadData,setLoadData] = useState(false)
    const [cardMakerId,setCardMakerId] = useState(dataIn.dataIn)
    const [createCardData,setCreateCardData] = useState([''])
    const [deleteCard,setDeleteCard] = useState(false)
    const [idItemBadRequest,setIdItemBadRequest] = useState('')
    const [idToClear,setIdToClear] = useState('')

    useEffect(()=>{
        console.log(cardMakerId)
        console.log(dataIn)
        toReloadThis(cardMakerId) 
        cardMakerId.forEach((data)=>{
            console.log(data)
            console.log(data.doc.id)
            setCreateCardData([data.doc.data()])
        })
        cardMakerId.map((dates)=>{
            console.log(dates.doc.data().nombreArtista)
            console.log(dates.doc.id)
            
        }) 
        const getDataOff = async()=>{
            const categoryCard = await getDocs(collection(db,'artist_meta'))
            categoryCard.forEach((cardOff)=>{
                console.log(cardOff.data())   
                setCreateCardData([cardOff.data()]) 
               })  
        }
        getDataOff()
    },[loadData])

    useEffect(() => {
      if(!idItemBadRequest) return  
      console.log(idToClear)   
      const idT = document.querySelectorAll('.AB'+idToClear) 
      
      console.log(idT[0])
      idT[0].style.display = 'none'  
      const deleteItems  = async()=>{         
          await deleteDoc(doc(db,"artist_meta",idToClear))                  
      }      
      deleteItems()      
    }, [idItemBadRequest])
    
    const backCategory = ()=>{
        setDeleteCard(false)
    }    

    function toReloadThis(cardReload){
        return cardReload.map((cardId)=>(
            <div className={'AB'+cardId.doc.id} key={cardId.doc.data().nombreArtista} style={{width:'125px',height:'225px'}}>
                <Row><Col>
            <Card>
              <Card.Text style={{position:'absolute',right:'15px',cursor:'pointer'}}  onClick={()=>{setDeleteCard(true);setIdToClear(cardId.doc.id);console.log(cardId.doc.id)}}><BsXCircle /></Card.Text>
            <Card.Body>
                <Row>
                   <Col>
                     <Card.Img  style={{zIndex:'5',borderRadiusBottomleft:'0px!important',borderRadiusBottomleft:'0px!imporant',height:'100%'}} src={cardId.doc.data().imgArt}></Card.Img>
                     <Card.Text style={{fontSize:'0.5em'}}>{cardId.doc.data().nombreArtista}</Card.Text>
                   </Col>                      
                 </Row>
            </Card.Body>
          </Card>
          </Col>
          </Row>
          <br></br>
          <Modal show={deleteCard} onHide={backCategory}>
             <ModalBody>
                 <p>¿Estas seguro que deceas borrar esta categoria?</p>
                 <Button variant='danger' onClick={()=>{setIdItemBadRequest(idToClear);backCategory();console.log(idToClear)}}>Borrar</Button>
             </ModalBody>
         </Modal>
         </div>
         ))     
    }
//        if(loadData==true) return      
        return(
            <div style={{maxHeight:'80vh',overflowY:'overlay',overflowX:'hidden'}}>
                {toReloadThis(cardMakerId)}                  
          </div>
        )
    }