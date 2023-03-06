import React,{useState,useEffect} from 'react'
import logoyoy from '../Img/logoyoy.png'
import { Col ,Row,Nav,Form} from 'react-bootstrap'
import {FiMonitor,FiMusic,FiPlayCircle} from 'react-icons/fi'
import {BsController} from 'react-icons/bs'

export default function NavMovil({mainSelect,ind}) {
    const [saveActive,setSaveActive] = useState('')
    const [frameActive,setFrameActive] = useState('')
  
    useEffect(()=>{
      if(!saveActive) return
      if(saveActive=='ondemand'){
       
        setFrameActive('ondemand')  
        mainSelect('ondemand')
      }
      if(saveActive=='tvlive'){

        mainSelect('tvlive')
        setFrameActive('tvlive')
      }
      if(saveActive=='radio'){
        mainSelect('radio')
        setFrameActive('radio')
      }
      if(saveActive=='juegos'){

        mainSelect('juegos')
        setFrameActive('juegos')
      }
      setSaveActive('')
      console.log(saveActive)
    },[saveActive])

  return (
      <>
    <div className='footer-bar justify-container-center text-aling-end width-100-space'>
        <Nav>
            <Row className='footer-bar-row'>
          
                <Col onClick={()=>setSaveActive('tvlive')}>
                   <FiMonitor/>
                </Col>         
       
                <Col onClick={()=>setSaveActive('ondemand')}>
                    <FiPlayCircle/>
                </Col>         
          
                <Col onClick={()=>setSaveActive('radio')}>
                   <div className='icon-yoy'><img className='img-logo-yoy' width={'60px'} src={logoyoy}></img></div>
                </Col>
      
                <Col onClick={()=>setSaveActive('radio')}>
                     <FiMusic/>
                </Col>         
     
                <Col onClick={()=>setSaveActive('juegos')}>
                     <BsController/>
                </Col>         
            </Row>

        </Nav>
    </div>
    
  </>
  )
}
