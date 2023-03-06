import React, { useEffect, useState } from 'react'
import {FiMonitor,FiMusic,FiPlayCircle,FiCircle,FiUser,FiHome,FiSettings,FiBarChart2,FiHelpCircle} from 'react-icons/fi'
import {IoGameControllerOutline} from 'react-icons/io5'
import {Nav,Col,Row, Form, DropdownButton,Dropdown} from 'react-bootstrap'
import logoyoy from '../Img/logoyoy.png'


export default function NavWeb({mainSelect,setLoginUser,activeAround,userItExist,userNameSuccess,enabledUser}) {

  const [saveActive,setSaveActive] = useState('')
  const [frameActive,setFrameActive] = useState('ondemand')
  const [userItExistIs,setUserItExistIs] = useState(userItExist)

  const ondema = document.querySelectorAll(".ondemand")
  const tvno = document.querySelectorAll(".tvlive")
  const radio = document.querySelectorAll(".radio") 
  const juego = document.querySelectorAll(".juegos")  

  function activeAround(){
    radio[0].classList.remove('active-item') 
    ondema[0].classList.remove('active-item')
    tvno[0].classList.remove('active-item')
    juego[0].classList.remove('active-item')
    ondema[0].classList.add('active-item')
  }

 
  useEffect(()=>{
    
  setUserItExistIs(userItExist)
  console.log(userItExist)
  console.log(userNameSuccess)

  },[])


  useEffect(()=>{
    if(!saveActive) return
    if(saveActive=='ondemand'){     
      radio[0].classList.remove('active-item') 
      ondema[0].classList.remove('active-item')
      tvno[0].classList.remove('active-item')
      juego[0].classList.remove('active-item')
      ondema[0].classList.add('active-item')
      setFrameActive('ondemand') 
      mainSelect('ondemand')    
    }
    if(saveActive=='tvlive'){
      radio[0].classList.remove('active-item')
      tvno[0].classList.remove('active-item')
      ondema[0].classList.remove('active-item')
      juego[0].classList.remove('active-item')
      tvno[0].classList.add('active-item')
      setFrameActive('tvlive')
      mainSelect('tvlive')  
    }
    if(saveActive=='radio'){
      tvno[0].classList.remove('active-item')
      radio[0].classList.remove('active-item')
      ondema[0].classList.remove('active-item') 
      juego[0].classList.remove('active-item')
      radio[0].classList.add('active-item')
      setFrameActive('radio')
      mainSelect('radio')  
    }
    if(saveActive=='juegos'){
      juego[0].classList.remove('active-item')
      radio[0].classList.remove('active-item')
      ondema[0].classList.remove('active-item')
      tvno[0].classList.remove('active-item')
      juego[0].classList.add('active-item')
      setFrameActive('juegos')
      mainSelect('juegos')  
    }
    setSaveActive('')
    console.log(saveActive)
  },[saveActive])
 
  return (
     <>      
      <Nav className='color-icons ' style={{position:'fixed',width:'100%',zIndex:'25',backgroundColor:'#07002e'}} activeKey="/home">  
        <Row className='width-100-space justify-content-md-center' >
          <Col className='no-row-100'>
            <Nav.Item >
                <div className='back-icon-logo' id='lograd'>
                  <Nav.Link  ><img href="/homecast" alt='no-load.jpg' src={logoyoy} className='img-size-50'/>                   
                 
                  </Nav.Link>   
                </div>   
            </Nav.Item>  
          </Col>
          <Col xs={7}>
          <Row className='justify-content-md-center'>
            <Col xs="auto" className='no-row-100'>
              <Nav.Item className='tvlive' onClick={()=>setSaveActive('tvlive')}>
                <Nav.Link  ><FiMonitor/>Tv en vivo</Nav.Link>
              </Nav.Item>
            </Col>
            <Col xs="auto" className='no-row-100'>
              <Nav.Item  className="active-item ondemand" onClick={()=>setSaveActive('ondemand')}>
                <Nav.Link ><FiPlayCircle/>OnDemand</Nav.Link>
              </Nav.Item>
            </Col>
            <Col xs="auto" className='no-row-100'>
              <Nav.Item className='radio' onClick={()=>setSaveActive('radio')}>
                <Nav.Link ><FiMusic/>Radio</Nav.Link>
              </Nav.Item>
            </Col>
            <Col xs="auto">
              <Nav.Item className='juegos' onClick={()=>setSaveActive('juegos')}>
                <Nav.Link><IoGameControllerOutline/>Juegos</Nav.Link>
              </Nav.Item>              
            </Col>
          </Row>
          </Col>
          <Col >
            <Row className='text-aling-end '>  
                  {userItExist==false ? <Nav.Item  onClick={()=>setLoginUser('iniciar_sesion')}> 
                     <Nav.Link >Iniciar sesion</Nav.Link>  
                  </Nav.Item>:<Nav.Item  >
                    <DropdownButton id="dropdown-basic-button" title={userNameSuccess}>
                      <Dropdown.Item onClick={()=>{mainSelect('accountProfile')}}>Cuenta</Dropdown.Item>
                      <Dropdown.Item onClick={()=>mainSelect('editProfile')}>Perfil</Dropdown.Item>
                      <Dropdown.Item onClick={()=>{window.location.reload();}}>Cerrar sesion</Dropdown.Item>
                    </DropdownButton>
                  </Nav.Item>}
            </Row>
          </Col>
        </Row>   
      </Nav>            
  
   
    </>
  )
}
