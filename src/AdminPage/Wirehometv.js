import React, { useState,useEffect } from 'react'
import { Button, Card, Col, Navbar, NavLink, Row,Nav, InputGroup, FormControl, Dropdown } from 'react-bootstrap'
import './wiretvcss.css'
import {BsColumnsGap,BsCameraVideo,BsViewStacked,BsPersonBadge,BsListStars,BsPalette,BsJournalText} from 'react-icons/bs'
import db from '../Config/firebase'
import { collection,addDoc } from 'firebase/firestore'
import Wiremetadata from './Wiremetadata'
import Wirecategoryload from './Wirecategoryload'
import Wirefronttv from './Wirefronttv'
import Wirenewartist from './Wirenewartist'
export default function Wirehometv() {
    const [editionMain,setEditionMain] = useState(false)
    const [keyId,setKeyId] = useState('')
    const [freshToken,setFreshToken] = useState('')
    const [keyImg,setKeyImg] = useState('')
    const [mainCategory,setMainCategory] = useState(false)
    const [mainArtist,setMainArtist] = useState(false)
    const [newViedoUp,setNewViedoUp] = useState(true)

    const newCoinMk = (mainOff)=>{
        let selectMainInfo = mainOff
           
        let seedTok = ['0','1','2','3','4','5','6','7','8','9']
        let makeToken = ""
        seedTok.map(dates=>{            
            let min = 0
            let max = 9
            let rand =  (Math.random()*(max-min))+min
            makeToken += seedTok[rand.toFixed(0)]            
        })
        let seedKey = ['a','b','c','d','e','f','g','0','1','2','3','4','5','6','7','D','A','B','T']
        let makeKey = ""
        seedKey.map(dates=>{            
            let min = 0
            let max = 18
            let rand =  (Math.random()*(max-min))+min
            makeKey += seedKey[rand.toFixed(0)]    
            setKeyImg(makeKey)   
            return makeKey                 
        })
        setKeyId(makeKey)
        setFreshToken(makeToken)      
        avalibleMain(selectMainInfo,makeKey)
        console.log(makeKey)
    }      

  
    const avalibleMain = (mainSelect,tok)=>{
        //off whole mains
        setEditionMain(false)
        

        if(mainSelect=='newVideo'){
            if(editionMain==false){
               setEditionMain(true)
            }else{
                setEditionMain(false)
            }
        }
        console.log('menu seleccionado ' + mainSelect)
    }

    const viewerSelect = (o)=>{
        if(o=='nuevoVideo'){
            setNewViedoUp(true)
            setMainArtist(false)
            setMainCategory(false)
            setEditionMain(false)
        }
        if(o=='menuArtista'){
            setNewViedoUp(false)
            setMainArtist(true)
            setMainCategory(false)
        }
        if(o=='menuCategoria'){
            setNewViedoUp(false)
            setMainArtist(false)
            setMainCategory(true)
        }        
        console.log(o)

    }

  return (
    <div className='main-over'>        
        <div className='main-admin-tv'>
            {/* Sidebar */}
            <div className='sidebar-off'>
                <div className='sidebar-off-header'>
                    <div className='sidebar-off-brand'></div>
                    <div className='sidebar-off-toggler'><span></span><span></span><span></span></div>
                </div>
                <div className='sidebar-off-body'>
                    <ul className='nav'>
                        <li className='nav-item'>
                            <a className='nav-link' href='/#' style={{color:'gray'}}><BsColumnsGap className='icon-sidebar'/><span className='title-name'>Dashboard</span></a>                            
                        </li>
                        <li className='nav-item nav-category'>Admin de contenido</li>
                        <li className='nav-item'>
                            <a className='nav-link' onClick={()=>{viewerSelect('nuevoVideo')}} style={{color:'gray'}}><BsCameraVideo className='icon-sidebar'/><span className='title-name'>Nuevo Video</span></a>                            
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' href='/#' style={{color:'gray'}}><BsViewStacked className='icon-sidebar'/><span className='title-name'>Dashboard</span></a>                            
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' onClick={()=>{viewerSelect('menuArtista')}} style={{color:'gray'}}><BsPersonBadge className='icon-sidebar'/><span className='title-name'>Artistas</span></a>                            
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' onClick={()=>{viewerSelect('menuCategoria')}} style={{color:'gray'}}><BsListStars className='icon-sidebar'/><span className='title-name'>Categoria</span></a>                            
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' href='/#' style={{color:'gray'}}><BsPalette className='icon-sidebar'/><span className='title-name'>Dashboard</span></a>                            
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' href='/#' style={{color:'gray'}}><BsJournalText className='icon-sidebar'/><span className='title-name'>Dashboard</span></a>                            
                        </li>
                    </ul>
                </div>
            </div>
            {/* contenido elegible por el sidebar */}
            <div className='container-admin-tv'>
                {/* header en container*/}
          {/*     <Navbar>
                    <NavLink></NavLink>
                    <Nav className="justify-content-center">
				        <Nav.Link href="/tvlive">Inicio</Nav.Link>
				        <Nav.Link href="/juegos">Mapa sito</Nav.Link>
				    </Nav>
  </Navbar>*/} 

                {/* Menu edicion agregar video */ newViedoUp==true ? <Row className='inbox-wrapper'>
                    <Col lg='12'>
                        <Card>
                            <Card.Body>
                                <Row>
                                    <Col className='col-with-maxwidth'>
                                        <div className='option-video-header'>
                                            <h5>Admin Video</h5>
                                        </div>
                                        <div className='option-video-add'>
                                            <Button variant='primary' onClick={()=>{newCoinMk('newVideo')}} style={{backgroundColor:'#483D8B!important'}}>Agregar Video</Button>
                                        </div>
                                        <div className='option-video-container'>
                                        <ul className='nav'>
                                            <li className='nav-item'>
                                                <a className='nav-link' href='/#' style={{color:'gray'}}><BsColumnsGap className='icon-sidebar'/><span className='title-name'>Admin Videos</span></a>
                                            </li>
                                            <li className='nav-item'><a className='nav-link' href='/#' style={{color:'gray'}}><BsCameraVideo className='icon-sidebar'/><span className='title-name'>Publicados</span></a>
                                            </li>
                                            <li className='nav-item'><a className='nav-link' href='/#' style={{color:'gray'}}><BsViewStacked className='icon-sidebar'/><span className='title-name'>Sin publicar</span></a>
                                            </li>
                                            <li className='nav-item'><a className='nav-link' href='/#' style={{color:'gray'}}><BsPersonBadge className='icon-sidebar'/><span className='title-name'>Iguales</span></a>
                                            </li>
                                            <li className='nav-item'><a className='nav-link' href='/#' style={{color:'gray'}}><BsListStars className='icon-sidebar'/><span className='title-name'>Basurero</span></a>
                                            </li>
                                            <li className='nav-item'><a className='nav-link' href='/#' style={{color:'gray'}}><BsPalette className='icon-sidebar'/><span className='title-name'>En vivo</span></a>
                                            </li>
                                            <li className='nav-item'><a className='nav-link' href='/#' style={{color:'gray'}}><BsJournalText className='icon-sidebar'/><span className='title-name'>Tag Artista</span></a>
                                            </li>
                                            <li className='nav-item'><a className='nav-link' href='/#' style={{color:'gray'}}><BsJournalText className='icon-sidebar'/><span className='title-name'>Tag TV</span></a>
                                            </li>
                                            <li className='nav-item'><a className='nav-link' href='/#' style={{color:'gray'}}><BsJournalText className='icon-sidebar'/><span className='title-name'>Tag Series</span></a>
                                            </li>
                                        </ul>
                                        </div>
                                    </Col>
                                    <Col lg='9'>
                                        {/** Menu de edicion */ editionMain==false ? <div><p>No info</p><Wirefronttv /></div>:<div>
                                            <Wiremetadata keyImg={keyImg}/> </div>}
                                       
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>: <div></div>}
                {/** */ mainCategory==true ? <Wirecategoryload/>:<div></div>}

                {/** */ mainArtist==true ? <Row>
                    <Wirenewartist  />
                </Row>:<div></div>}
            </div>
            <div className='footer-off'>            
            </div>
        </div>
    </div>
  )
}
