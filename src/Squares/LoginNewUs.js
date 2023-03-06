import React,{useEffect, useState} from 'react'
import { Row,Card,Col, Form, Button, Modal } from 'react-bootstrap'
import graycard from '../Img/cardbackground.png'
import logogreen from '../Img/logoyoygreen.png'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {BsPlus} from 'react-icons/bs'
import db from '../Config/firebase.js'
import { addDoc,collection,doc,getDocs,setDoc } from 'firebase/firestore';

export default function LoginNewUs({loginNewU,enabledUser,loginUsId,mainSelect,editProfileM,newEditProfileM}) {
    const [firstStep,setFirstStep] = useState(true)
    const [secondStep,setSecondStep] = useState(false)
    const [thirdStep,setThirdStep] = useState(false)
    const [newUser,setNewUser] = useState('')
    const [newEmail,setNewEmail] = useState('')
    const [newPass,setNewPass] = useState('')
    const [selectPlan,setSelectPlan] = useState('')
    const [buildNewUs,setBuildNewUs] = useState(false)
    const [userNoAvalible,setUserNoAvalible] = useState(false)
    const [mailNoAvalible,setMailNoAvalible] = useState(false)
    const [showUserExistToast,setShowUserExistToast] = useState(false)
    const [keyIdNewUser,setKeyIdNewUser] = useState('')
    const [activePay,setActivePay] = useState(false)
    const [successPay,setSuccessPay] = useState(false)

    //---------BuilUser----------//
    useEffect(()=>{
        if(!newUser) return
        if(!newPass) return
        if(!newEmail) return
        if(!selectPlan) return
        if(!successPay==true)  return

        let seedTok = ['0','1','2','3','4','5','6','7','8','9']
        let makeToken = ""
        seedTok.map(dates=>{            
            let min = 0
            let max = 9
            let rand = (Math.random()*(max-min))+min
            makeToken += seedTok[rand.toFixed(0)]            
        })
        let seedKey = ['a','b','c','d','e','f','g','0','1','2','3','4','5','6','7','Y','O','V','T','y','o','t','v']
        let makeKey = ""
        seedKey.map(dates=>{            
            let min = 0
            let max = 18
            let rand =  (Math.random()*(max-min))+min
            makeKey += seedKey[rand.toFixed(0)]     
            return makeKey                 
        })
        setKeyIdNewUser(makeKey)

         const upToServer = async()=>{
            try{
                const newUpUser = await setDoc(doc(db,'basic_account',makeKey),{
                nombreUsuario:newUser,                    
                passUsuario:newPass,                                        
                mailUsuario:newEmail,
                levelUsuario:selectPlan,
                idAccount:makeKey,
                otherAccounts:{},
                diaUsuario:Date()
             })
             const newMetaUs = await setDoc(doc(db,'user_default_values',makeKey+newUser),{
                    StationFavBottom:"default",
                    footerTheme:"default",
                    masterAccount:makeKey,
                    metaDataNetwork:[""],
                    metaLikeIt:[""],
                    userNameAccount:newUser,
                    stationFavMiddle:"default",
                    stationFavTop:"default",
                    userColorBaner:"default",                    
                    userLevel:selectPlan,
                    userListFav:[""]
                })                         
            }
            catch(e){
                console.log(e)
            }
        }
        upToServer()
    },[newUser,successPay,selectPlan,newPass,selectPlan])

    const checkServer = ()=>{
        if(!newUser) return
        if(!newPass) return
        if(!newEmail) return
        if(!selectPlan) return
        let userTrues = false
        let lastCall = 0      

        const checkIfUser = (nameId,mailId,cursor)=>{
            lastCall++

            if(newEmail==mailId){
                userTrues = true
                setMailNoAvalible(true)
            } 
            if(nameId==newUser){
                userTrues = true
                setUserNoAvalible(true)
            }
            if(cursor==lastCall){                
                console.log(userTrues)
                if(userTrues==false){
                    setActivePay(true)                    
                }else{
                    console.log("toastexist")
                    setShowUserExistToast(true)                    
                }
            }
        }
        const reviewOldUser = async()=>{
            const userExist = await getDocs(collection(db,'basic_account'))
            userExist.forEach((dataInside)=>{
                checkIfUser(dataInside.data().nombreUsuario,dataInside.data().mailUsuario,userExist.size)
            })            
        }
        reviewOldUser()
        console.log("no error")
    }
    //----------PAYPAL-----------//

    const closePay = ()=>{
        setActivePay(false)
    }

    const initialOptions = {
        "client-id": "AdY_jVA-db3iG8oVesSgBmrePVZuCsx6ZQHxlRaJnrgDDI9XLpTn3oThf6ZYOwX98tQZcZU6SDNoTGGp",
        currency: "USD",
        intent: "capture",
        "data-client-token": "ELCxMHhhzeYXQPrQhURON1V3ZTqMpBDA_CPbk0LEnBtJy0bSkBe7QRFLIGMeB-HDvAN4c1zVF2h-orNU",
    };
    

  return (
    <>
    {firstStep==true ? <div className='card-background'>
        <div className="justify-content-center align-item-center txt-center">
        <img width={'20%'} src={logogreen}></img>
                <h3>Elige el plan</h3>
                <Row>
                    <Col> <h6>Basica</h6>
                        <Card>                        
                            <Card.Body className='card-select-magic-n'>                        
                               <Card.Img className="card-n-img" src={graycard} onClick={()=>{setSelectPlan('basico');setSecondStep(true);setFirstStep(false)}}></Card.Img>                                                                        
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col > <h6>Familiar</h6>
                        <Card>                         
                            <Card.Body className='card-select-magic-n'>                        
                               <Card.Img className="card-n-img" src={graycard} onClick={()=>{setSelectPlan('basico');setSecondStep(true);setFirstStep(false)}}></Card.Img>                                                                        
                            </Card.Body>
                        </Card>  
                    </Col>
                    <Col ><h6>Premium</h6>
                        <Card>                          
                            <Card.Body className='card-select-magic-n'>                        
                               <Card.Img className="card-n-img" src={graycard} onClick={()=>{setSelectPlan('basico');setSecondStep(true);setFirstStep(false)}}></Card.Img>                                                                        
                            </Card.Body>
                        </Card>                       
                    </Col>
                </Row>  
                <div>
                    <br></br>                   
                <p style={{fontSize:'0.8em'}}>Sigue disfutando del mejor contenido con anuncionos <span className='c-pointer' style={{textDecoration:'underline',color:'white'}} onClick={()=>{mainSelect('ondemand')}}>aqui</span></p>
                </div> 
            </div>
        </div>:<></>}
        {secondStep==true ? <div className='new-user-background new-user-second-bk'>
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
                     <br></br>            
                   <p style={{fontSize:'0.5em',}}>Sigue disfutando del mejor contenido con anuncionos <span className='c-pointer' style={{textDecoration:'underline',color:'white'}} onClick={()=>{mainSelect('ondemand')}}>aqui</span></p>
                </Col>
            </Row>            
         </div>
        </div>:<></>}
        {thirdStep==true ? <div className='card-background'>
            <div className="justify-content-center align-item-center txt-center">
                <img width={'40%'} src={logogreen}></img>
                <h6></h6>
                <Row>
                    <Col>
                        <Card  
                        onClick={()=>{mainSelect('edithProfile');editProfileM(keyIdNewUser);loginUsId(keyIdNewUser)}}>
                            <Card.Body className='card-select-magic-n'>                        
                               <Card.Img  className='card-n-img'  src={graycard}></Card.Img>                                                       
                            </Card.Body>
                        </Card> 
                        <br></br>
                        <span>{newUser}</span>                      
                    </Col>
                     <Col >
                        <Card  
                        onClick={()=>{mainSelect('addProfile');newEditProfileM(keyIdNewUser);loginUsId(keyIdNewUser)}}>
                            <Card.Body className='card-select-magic-n'>                                                   
                                <Card.Title className='card-n-title'>
                                    <BsPlus className='txt-size-6 '/>
                                 </Card.Title>
                                <Card.Img className='card-n-img' src={graycard}></Card.Img>
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
                          onClick={()=>{mainSelect('ondemand');loginUsId(keyIdNewUser)}}>
                            Ir a la pantalla de inicio
                        </span>
                    </p>
                </div>                   
            </div>
        </div>:<></>}
        <Modal show={activePay} onHide={closePay}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
            <PayPalScriptProvider options={{ "client-id": "test" }}>
            <PayPalButtons
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: "4.99",
                                },
                            },
                        ],
                    });
                }}
                onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                        const name = details.payer.name.given_name;
                        alert(`Transaction completed by ${name}`);
                        setActivePay(false)
                        setThirdStep(true)
                        setBuildNewUs(true)
                        setSecondStep(false)
                        setSuccessPay(true)
                    });
                }}
            />
        </PayPalScriptProvider>
                    
            </Modal.Body>
        </Modal>
    </>
  )
}
