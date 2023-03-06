import React,{useState,useEffect} from 'react'
import {FiMonitor,FiMusic,FiPlayCircle,FiCircle,FiUser,FiHome,FiSettings,FiBarChart2,FiHelpCircle} from 'react-icons/fi'
import {IoGameControllerOutline} from 'react-icons/io5'
import {Nav,Col,Row, Form,Modal, Button} from 'react-bootstrap'
import axios from 'axios'
import NavWeb from './NavWeb'
import NavMovil from './NavMovil'
import logoyoy from '../Img/logoyoy.png'
import TvHome from '../Frames/TvHome'
import Home from '../Frames/Home'
import RadioHome from '../Frames/RadioHome'
import RadioPlayer from '../Squares/RadioPlayer'
import LoginNewUs from '../Squares/LoginNewUs'
import EditProfile from '../Squares/EditProfile'
import db from '../Config/firebase.js'
import { addDoc,collection,doc,getDocs,setDoc } from 'firebase/firestore';
import AccountsUs from '../Squares/AccountsUs'

export default function NavRoot() {
  const [optionSelection,setOptionSelection] = useState('')
  const [frameActive,setFrameActive] = useState('ondemand')
  const [stationPost,setStationPost] = useState('')
  const [modalToLogin,setModalToLogin] = useState(false)
  const [idUserFull,setIdUserFull] = useState('')
  const apiKey = '00f019191c205c1208fd3d615b9fb303'

  //
  const [noNewUserFrame,setNoNewUserFrame] = useState(false)
  const [userName,setUserName] = useState('')
  const [userPass,setUserPass] = useState('')
  const [loginUsId,setLoginUsId] = useState('')
  const [itsNoStanderUser,setItsNoStanderUser] = useState(false)
  const [edithProfileMain,setEdithProfileMain] = useState(false)
  const [accountProfileMain,setAccountProfileMain] = useState(false)
  const [addNewProfileOnAccount,setAddNewProfileOnAccount] = useState(false)

  const [keyIdNewUser,setKeyIdNewUser] = useState('')
  const [activePay,setActivePay] = useState(false)
  const [successPay,setSuccessPay] = useState(false)
  const [getUserIdOff,setGetUserIdOff] = useState('')

  const [userItExist,setUserItExist] = useState(false)
  const [userNameSuccess,setUserNameSuccess] = useState('default')
  //
  const noNav = document.querySelectorAll('.nav-web')  
  const ondema = document.querySelectorAll(".ondemand")
  const tvno = document.querySelectorAll(".tvlive")
  const radio = document.querySelectorAll(".radio") 
  const juego = document.querySelectorAll(".juegos")  
  const noFrameMain = document.querySelectorAll('.frame-main')  
  const noFrameUs = document.querySelectorAll('.frame-new-us')  



  //------------LoginUser-------------//

  const [realName,setRealName] = useState('')

  const checkServer = ()=>{
    if(!userName) return
    if(!userPass) return
    let userTrues = false
    let passTrues = false
    let lastCall = 0   
    console.log('mod')  

    const checkIfUser = (nameId,passId,cursor,idUser)=>{
        lastCall++
        if(passId==userPass){
           passTrues = true
           if(nameId==userName){
            userTrues = true  
            setGetUserIdOff(idUser)
          }
        }        
        if(cursor==lastCall){                
            if(userTrues==true&&passTrues==true){   
              setModalToLogin(false)   
              setUserItExist(true)    
              setUserNameSuccess(nameId)                          
            }else{
                 alert('Usuario no registrado')    
            }
        }
    }
    const reviewOldUser = async()=>{
        const userExist = await getDocs(collection(db,'basic_account'))
        userExist.forEach((dataInside)=>{
            checkIfUser(dataInside.data().nombreUsuario,dataInside.data().passUsuario,userExist.size,dataInside.data().idAccount)
        })            
    }
    reviewOldUser()
}

//--------------------------------------------------

  function mainSelect(selectOp){
    if(noNewUserFrame==true){
      noFrameMain[0].style.display = 'flex'  
      noNav[0].style.display = 'block'
      radio[0].classList.remove('active-item') 
      ondema[0].classList.remove('active-item')
      tvno[0].classList.remove('active-item')
      juego[0].classList.remove('active-item')
      ondema[0].classList.add('active-item')   
    }    
    setFrameActive(selectOp)
    setEdithProfileMain(false)
    setAccountProfileMain(false)
    setNoNewUserFrame(false)
    setItsNoStanderUser(false)
    if(selectOp=='editProfile'){
      setNoNewUserFrame(true)
      editProfileM(getUserIdOff)
      noNav[0].style.display = 'none'
      noFrameMain[0].style.display = 'none'  
    }
    if(selectOp=='accountProfile'){
      setNoNewUserFrame(true)
      accountProfileM(getUserIdOff)
      noNav[0].style.display = 'none'
      noFrameMain[0].style.display = 'none'  
    }
  }

  function stationSelect(ss){
    setStationPost(ss)
    setFrameActive('playerRadio')    
  }

  function stationPut(ss){
    setFrameActive(ss)
  }

  function setLoginUser(res){
      setModalToLogin(true)
  }

  function loginNewU(){
    noNav[0].style.display = 'none'
    setModalToLogin(false)
    setNoNewUserFrame(true) 
  }

  const modalToClose = ()=> {         
        setModalToLogin(false)
  }

  function activeAround(){
    console.log('success')
  }
  
  function enabledUser(g){
    console.log(g)
    if(g=='null-down') return
    noNav[0].style.display = 'none'
    setModalToLogin(false) 
    setItsNoStanderUser(true)
  }

  function editProfileM(idUSerPuts){
    setEdithProfileMain(true)
    setItsNoStanderUser(true)   
    setLoginUsId(idUSerPuts)
  }

  function accountProfileM(idUSerPuts){
    setAccountProfileMain(true)
    setItsNoStanderUser(true)   
    setLoginUsId(idUSerPuts)
  }

  function newEditProfileM(){
    setAddNewProfileOnAccount(true)
  }

  return (
    <>
    <div className="nav-web">      
      <NavWeb 
        mainSelect={mainSelect}
        setLoginUser={setLoginUser}
        activeAround={activeAround}
        userNameSuccess={userNameSuccess}
        userItExist={userItExist}
      />      
    </div>
    <div className="nav-mobil"  >
       <NavMovil 
       mainSelect={mainSelect} />
    </div>
    

    {noNewUserFrame==false ? <div className="App-header frame-main" id=''>
    {frameActive=='tvlive' ? <TvHome/>:<></>}
    {frameActive=='ondemand' ? <Home/>:<></>}
    {frameActive=='radio' ? <RadioHome stationSelect={stationSelect}/>:<></>}
    {frameActive=='playerRadio' ? <RadioPlayer stationPost={stationPost} stationPut={stationPut} stationSelect={stationSelect}/>:<></> }
    
  </div>:<div className='frame-new-us'><LoginNewUs  loginNewU={loginNewU}  
  enabledUser={enabledUser} 
  mainSelect={mainSelect} 
  editProfileM={editProfileM} 
  newEditProfileM={newEditProfileM}/></div>}

  {itsNoStanderUser==true&&edithProfileMain==true ? <EditProfile 
  enabledUser={enabledUser} 
  loginUsId={loginUsId} 
  idUserFull={idUserFull} 
  mainSelect={mainSelect}
  addNewProfileOnAccount={addNewProfileOnAccount}/>:<></>}

  {itsNoStanderUser==true&&accountProfileMain==true ? <AccountsUs 
  enabledUser={enabledUser} 
  loginUsId={loginUsId} 
  idUserFull={idUserFull} 
  mainSelect={mainSelect}
  addNewProfileOnAccount={addNewProfileOnAccount}
  />:<></>}

     <Modal show={modalToLogin} onHide={modalToClose}>
        <Modal.Header closeButton></Modal.Header>          
          <Modal.Body>            
            <Modal.Title className='App color-white'>Iniciar seseion</Modal.Title>
            <Modal.Title className='App m-5-i p-t-c'>¿Aun sin una cuenta?<span className='c-pointer' style={{textDecoration:'underline',color:'white'}} onClick={()=>{loginNewU()}}>Registrate aqui</span></Modal.Title>
            <Row className='p-fl-n'>
              <Col>
                  <Form.Control 
                    className='f-ln-m'
                    placeholder='Ingresa tu usuario'
                    aria-label='user-nick'
                    onChange={(e)=>{setUserName(e.target.value)}}
                  />
              </Col>
            </Row>
            <Row className='p-fl-n'>
              <Col>
                  <Form.Control 
                    className='f-ln-m'
                    placeholder='Ingresa tu usuario'
                    aria-label='user-nick'
                    type='password'
                    onChange={(e)=>{setUserPass(e.target.value)}}
                  />
              </Col>
            </Row>
            <Row>
              <Button variant='outline-success'  className='txt-side-42 w-50 p-center' onClick={()=>checkServer()}>Ingresar</Button>
            </Row>
            <Modal.Title className='App m-5-i p-t-c'>Si deseas serguir con la versin sin costo y con comerciales da <span onClick={()=>{modalToClose()}} className='c-pointer' style={{textDecoration:'underline',color:'white'}}>click aqui</span></Modal.Title>
          </Modal.Body>
        </Modal>
    </>
  )
}
