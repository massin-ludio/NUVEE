import React,{useEffect, useState} from 'react'
import { Row,Card,Col, Form, Button, Modal, ButtonGroup } from 'react-bootstrap'
import graycard from '../Img/cardbackground.png'
import logogreen from '../Img/logoyoygreen.png'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {BsPlus} from 'react-icons/bs'
import db from '../Config/firebase.js'
import { addDoc,collection,doc,getDoc,setDoc } from 'firebase/firestore';


export default function EditProfile({loginNewU,enabledUser,loginUsId,mainSelect,editProfileM,newEditProfileM}) {

    const [changeUsId,setChangeUsId] = useState('')
    const [getUserName,setGetUserName] = useState('')
    const [seveOpt,setSaveOpt] = useState('')

    useEffect(()=>{
        console.log(loginUsId)
        checkServer()
    },[])

    const checkServer = ()=>{        
        const reviewOldUser = async()=>{
            const metaDataUser = doc(db,'basic_account',loginUsId)
            const getUserData = await getDoc(metaDataUser)
            setGetUserName(getUserData.data().nombreUsuario)
        }
        reviewOldUser()
        console.log("no error")
    }

    useEffect(() => {
        if(!changeUsId) return
        const reviewOldUser = async()=>{
            const metaDataUser = doc(db,'basic_account',loginUsId)
            const getUserData = await getDoc(metaDataUser)
            setGetUserName(getUserData.data().nombreUsuario)
        }
        reviewOldUser()
        console.log("no error")
      
    }, [changeUsId])
    

  return (
    <>
       <div className='card-background'>
            <div className="justify-content-center align-item-center txt-center">
            <img width={'20%'} src={logogreen}></img>
                <h3>Editar perfil</h3>
                <Row>
                    <Col xs={3}>
                        <Card className='w-20' onClick={()=>{mainSelect('edithProfile');editProfileM('true')}}>
                            <Card.Body className=''>                        
                               <Card.Img  className='card-n-img w-20'  src={graycard}></Card.Img>                                                       
                            </Card.Body>
                        </Card> 
                    </Col>
                    <Col  xs={7} className="txt-start b-bottom">
                    <span>Usuario</span>
                        <Form.Control 
                           placeholder={getUserName}
                           className='f-ln-m'
                           aria-label='newUser'
                           type='email'
                           onChange={(e)=>{setChangeUsId(e.target.value)}}
                        />
                    <span>Idioma</span>
                    <Form.Select
                    className='f-ln-m'
                    >
                        <option className='b-s-o-c'>Español</option>
                        <option className='b-s-o-c'>Ingles</option>
                    </Form.Select>
                    </Col>
                    <Col>
                       <div style={{width:"200px"}}></div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={3}>
                    <div style={{width:"200px"}}></div>
                    </Col>
                    <Col  xs={7} className="txt-start b-bottom">
                    <span>Configuración por edad</span>
                    <Form.Select className='f-ln-m'>
                        <option className='b-s-o-c'>Películas para todo público.</option>
                        <option className='b-s-o-c'>Películas para adolescentes de doce años en adelante.</option>
                        <option className='b-s-o-c'>Películas para adultos de dieciocho años en adelante.</option>
                        <option className='b-s-o-c'>Películas para adultos, con sexo explícito, lenguaje procaz, o alto grado de violencia.</option>
                    </Form.Select>
                        
                        <br></br>
                    </Col>
                    <Col>
                    <div style={{width:"200px"}}></div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={3}>

                    </Col>
                    <Col xs={7} className="txt-start b-bottom">
                        <p >Controles de reproduccion automática</p>
                        <Form.Check className='f-size-53' type="checkbox" label="Reproduccion continua de capitulos y peliculas adyasentes" />
                        <Form.Check className='f-size-53' type="checkbox" label="Mostar previos de series y peliculas" />
                    </Col>
                    <Col>
                    <div style={{width:"200px"}}></div>
                    </Col>
                </Row>
                <Row>
                    <Col  xs={3}>
                    </Col>
                    <Col xs={7} className="txt-start">
                        <br></br>
                    <ButtonGroup className='btn-aling'>
                        <Button variant='outline-success'  onClick={()=>{setSaveOpt()}}>Guardar cambios</Button>
                        <br></br>
                        <Button variant='outline-success'  onClick={()=>{mainSelect('ondemand')}}>Cancelar</Button>
                        <br></br>
                    </ButtonGroup>
                    </Col>
                    <Col>
                    </Col>
                </Row>
                

            </div>
       </div>
    </>
  )
}
