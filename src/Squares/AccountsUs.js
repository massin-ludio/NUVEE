import React,{useEffect, useState} from 'react'
import { Row,Card,Col, Form, Button, Modal, ButtonGroup } from 'react-bootstrap'
import graycard from '../Img/cardbackground.png'
import logogreen from '../Img/logoyoygreen.png'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {BsPlus} from 'react-icons/bs'
import db from '../Config/firebase.js'
import { updateDoc,arrayUnion,arrayRemove } from 'firebase/firestore';
import { addDoc,collection,doc,getDoc,setDoc } from 'firebase/firestore';

export default function AccountsUs({loginUsIdloginNewU,enabledUser,loginUsId,mainSelect,editProfileM,newEditProfileM}) {

    const [changeUsId,setChangeUsId] = useState('')
    const [getUserName,setGetUserName] = useState('')
    const [seveOpt,setSaveOpt] = useState('')
    const [newProfile,setNewProfile] = useState(false)
    const [newUser,setNewUser] = useState('')
    const [newEmail,setNewEmail] = useState('')
    const [newPass,setNewPass] = useState('')

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


    useState(()=>{
        if(!newProfile) return
        if(!newUser) return
        if(!newEmail) return
        if(!newPass) return
        const reviewOldUser = async()=>{
            const metaDataUser = doc(db,'basic_account',loginUsId)
            const getUserData = await getDoc(metaDataUser)
            setGetUserName(getUserData.data().nombreUsuario)

            await updateDoc(metaDataUser, {
                maxNumberLike:'ggg'
               });
            await updateDoc(metaDataUser, {                  
                metaLikeIt : arrayRemove('stationPost')          
              })
          }
        reviewOldUser()      


    },[newProfile,newUser,newEmail,newPass])


const thisApp = ()=>{
      
}
  return (
    <>
    {newProfile==true ? <div className='new-user-background new-user-second-bk'>
         <div  className="container-user-data ">
            <Row className=''>
                <p className='p-5-t'>Usuario</p>
                <Col>
                    <Form.Control 
                      className='f-ln-m'
                      placeholder='Ingrea tu usuario'
                      aria-label='newUser'
                      onChange={(e)=>{setNewUser(e.target.value)}}
                    />
                </Col>
            </Row>
            <Row className=''>
                <p className='p-5-t'>Correo electronico</p>
                <Col>
                    <Form.Control 
                      placeholder='Ingrea tu e-mail'
                      className='f-ln-m'
                      aria-label='newUser'
                      type='email'
                      onChange={(e)=>{setNewEmail(e.target.value)}}
                    />
                </Col>
            </Row>
            <Row className=''>
                <p className='p-5-t'>Contraseña</p>
                <Col>
                    <Form.Control 
                      placeholder='8 Caracteres minimo'
                      className='f-ln-m'
                      aria-label='newUser'
                      type='password'
                      onChange={(e)=>{setNewPass(e.target.value)}}
                    />                 
                </Col>
            </Row> 
            <Row >
                <Col>
                <br></br>
                     <Button variant='outline-success' className='w-70' onClick={()=>{checkServer();}}>Registrar</Button>       
                     <br></br>
                     <br></br>          
                     <Button variant='outline-success' className='w-70' onClick={()=>{setNewProfile(false);}}>Cancelar</Button>   
                </Col>
            </Row>            
         </div>
        </div>:<div className='card-background'>
            <div className="justify-content-center align-item-center txt-center">
                <img width={'40%'} src={logogreen}></img>
                <h6></h6>
                <Row>
                    <Col>
                    <Card onClick={()=>{mainSelect('edithProfile');}}>
                        <Card.Body className='card-select-magic-n'>
                            <Card.Img  className='card-n-img'  src={graycard}></Card.Img>
                        </Card.Body>
                    </Card>
                    <br></br>
                    </Col>
                    <Col>
                    <Card onClick={()=>{setNewProfile(true)}}>
                    <Card.Body className='card-select-magic-n'>
                        <Card.Title className='card-n-title'>
                            <BsPlus className='txt-size-6 '/>
                        </Card.Title>
                        <Card.Img className='card-n-img' src={graycard} ></Card.Img>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        <div>
        <br></br>
        <p style={{fontSize:'0.8em'}}>
            <span 
              className='c-pointer' 
              style={{textDecoration:'underline',color:'white'}} 
              onClick={()=>{mainSelect('ondemand');}}>
                Ir a la pantalla de inicio
            </span>
        </p>
       </div>                   
    </div>
    </div>}
</>
  )
}
