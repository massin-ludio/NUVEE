import {React , useState, useEffect} from "react";
import ReactPlayer from 'react-player'
import {Image, Modal, Nav,NavDropdown,Navbar, Row, Col} from 'react-bootstrap';
import noSignal from '../Img/cardbackground.png'
import {BsStarFill,BsFillCaretDownFill,BsPeopleFill,BsFillCameraVideoFill,BsPlayBtnFill,BsFileMusicFill} from 'react-icons/bs'



export default function TvHome() {
  
  
  const [showTv,setShowTv] = useState(false);
  const [wowTv,setWowTv] = useState(false);
  const [m2oTv,setM2oTv] = useState(false);
  const [multiTv,setMultiTv] = useState(false);
  const [retroTv,setRetroTv] = useState(false);
  const [choiseChannel,setChoiseChannel] = useState('http://cdn.elsalvadordigital.com:1935/wowtv/wowtv/playlist.m3u8?')

  const handleBtn = ()=>{
      console.log('clickclick')
    setShowTv(true);
  }

  const handleClose = ()=>{
    setShowTv(false)
  }

  const wowBtn = ()=>{
    console.log('clickclick')
    setWowTv(true);
}

const wowBtnCls = ()=>{
    setWowTv(false)
}

const m2oBtn = ()=>{
    console.log('clickclick')
    setM2oTv(true);
}

const m2oBtnCls = ()=>{
    setM2oTv(false)
}

const multiBtn = ()=>{
    console.log('clickclick')
    setMultiTv(true);
}

const multiBtnCls = ()=>{
    setMultiTv(false)
}

const retroBtn = ()=>{
    console.log('clickclick')
    setRetroTv(true);
}

const retroBtnCls = ()=>{
    setRetroTv(false)
}

const [options, setOptions] = useState([
  {
    path:"/",
    label: "Inicio"
  },
  {
    path:"/Peliculas",
    label: "Peliculas"
  },
  {
    path:"/Series",
    label: "Series"
  }
]);


  return(
<><ReactPlayer        
            className='react-player'
            url={choiseChannel}
            width='100%'
            height='100%'
            controls={true}
            playing={true}      
        />
    <div className='App-tv width-100' style={{overflow:'hidden'}}>  
    <div style={{width:'100%',zIndex:10}}>
        <div className='divContainers'>
          <Navbar bg="dark" expand="lg" variant="dark" className="navtvViewbar">
          
              <Nav className="justify-content-center">    
                <NavDropdown title="Categorias" id="basic-nav-dropdown" >
                  <Nav className="mr-auto" style={{backgroundColor:'gray'}}>
                    <Nav.Link href="#Apreciados"><span><BsStarFill/>Favoritos</span></Nav.Link>
                    <Nav.Link href="#Apreciados"><span><BsPlayBtnFill />Entretenimiento</span></Nav.Link>
                    <Nav.Link href="#Apreciados"><span><BsFillCameraVideoFill/>Peliculas</span></Nav.Link>
                    <Nav.Link href="#Apreciados"><span><BsPeopleFill />Los compas</span></Nav.Link>
                    <Nav.Link href="#Apreciados"><span><BsFileMusicFill/>Que no falte</span></Nav.Link>
                    <Nav.Link href="#Apreciados"><span><BsFillCaretDownFill/>Deportes</span></Nav.Link>
                  </Nav>
                  </NavDropdown>
                </Nav>
          
            </Navbar>
        </div>
        <Row className="width-100">
          <Col className="nav-tvtablebar " xs lg="4">
            <ul >
              <li><span><BsStarFill/>Favoritos</span></li>
              <li><span><BsPlayBtnFill />Entretenimiento</span></li>
              <li><span><BsFillCameraVideoFill/>Peliculas</span></li>
              <li><span><BsPeopleFill />Comedia</span></li>
              <li><span><BsFileMusicFill/>Musica</span></li>
              <li><span><BsFillCaretDownFill/>Deportes</span></li>
            </ul>
          </Col>
          <Col className="mobilactive">
            
           <ul style={{width:'100%',maxHeight:'410px',overflow:'scroll',zIndex:10}}>
             <li className='cursorPointerLi' onClick={()=>{
               setChoiseChannel('https://firebasestorage.googleapis.com/v0/b/kinodb-1cc81.appspot.com/o/video%2FPeliculas%2Fc7627Ba5Dega5332cD6%2Fmovie.mp4?alt=media&token=2cb6e188-cb1e-4c43-93ef-3144770cd0b4')
             }}>
               <Row><Col  xs lg="1"><span>52</span></Col>
                    <Col sm lh='2'><span>
                     <ReactPlayer        
                         className='react-player'
                         url='https://firebasestorage.googleapis.com/v0/b/kinodb-1cc81.appspot.com/o/video%2FPeliculas%2Fc7627Ba5Dega5332cD6%2Fmovie.mp4?alt=media&token=2cb6e188-cb1e-4c43-93ef-3144770cd0b4'
                         width='100px'
                         height='100%'
                         muted={true}
                         controls={true}  
                         style={{zIndex:'0'}}/></span>
                     </Col>
                    <Col  xs lg="2">WoW Tv<span style={{width:'250px',position:'absolute'}} onClick={()=>{
                      setChoiseChannel('http://cdn.elsalvadordigital.com:1935/wowtv/wowtv/playlist.m3u8?')}}/>
                    </Col>
                 </Row>
                </li>
             <li className='cursorPointerLi' onClick={()=>{
               setChoiseChannel('http://162.241.190.126:1935/live/canal4/playlist.m3u8')
             }}><span><ReactPlayer        
                         className='react-player'
                         url='http://162.241.190.126:1935/live/canal4/playlist.m3u8'
                         width='100px'
                         height='100%'
                         muted={true}
                         controls={true}  
                         style={{zIndex:'0'}}     
                /></span><span style={{width:'250px',position:'absolute'}} onClick={()=>{
                  setChoiseChannel('http://162.241.190.126:1935/live/canal4/playlist.m3u8')
                }}/></li>
             <li className='cursorPointerLi' onClick={()=>{
               setChoiseChannel('http://wms.tecnoxia.com:1935/rytqrolive/rytqrolive/master.m3u8')
             }}><span><ReactPlayer        
                         className='react-player'
                         url='http://wms.tecnoxia.com:1935/rytqrolive/rytqrolive/master.m3u8'
                         width='100px'
                         height='100%'
                         muted={true}
                         controls={true}  
                         style={{zIndex:'0'}}     
                /></span><span style={{width:'250px',position:'absolute'}} onClick={()=>{
                  setChoiseChannel('http://wms.tecnoxia.com:1935/rytqrolive/rytqrolive/master.m3u8')
                }}/></li>
            <li className='cursorPointerLi' onClick={()=>{
               setChoiseChannel('http://stream2.dynalias.com:1935/live/tvlive1/playlist.m3u8')
             }}><span><ReactPlayer        
                         className='react-player'
                         url='http://stream2.dynalias.com:1935/live/tvlive1/playlist.m3u8'
                         width='100px'
                         height='100%'
                         muted={true}
                         controls={true}  
                         style={{zIndex:'0'}}     
                /></span><span style={{width:'250px',position:'absolute'}} onClick={()=>{
                  setChoiseChannel('http://stream2.dynalias.com:1935/live/tvlive1/playlist.m3u8')
                }}/></li>
               
                <li className='cursorPointerLi' onClick={()=>{
               setChoiseChannel('http://mdstrm.com/live-stream-playlist/57b4dc126338448314449d0c.m3u8')
             }}><span><ReactPlayer        
                         className='react-player'
                         url='http://mdstrm.com/live-stream-playlist/57b4dc126338448314449d0c.m3u8'
                         width='100px'
                         height='100%'
                         muted={true}
                         controls={true}  
                         style={{zIndex:'0'}}     
                /></span><span style={{width:'250px',position:'absolute'}} onClick={()=>{
                  setChoiseChannel('http://mdstrm.com/live-stream-playlist/57b4dc126338448314449d0c.m3u8')
                }}/></li>
            <li className='cursorPointerLi' onClick={()=>{
               setChoiseChannel('http://wowzacontrol.com:1936/stream23/stream23/playlist.m3u8')
             }}><span><ReactPlayer        
                         className='react-player'
                         url='http://wowzacontrol.com:1936/stream23/stream23/playlist.m3u8'
                         width='100px'
                         height='100%'
                         muted={true}
                         controls={true}  
                         style={{zIndex:'0'}}     
                /></span><span style={{width:'250px',position:'absolute'}} onClick={()=>{
                  setChoiseChannel('http://wowzacontrol.com:1936/stream23/stream23/playlist.m3u8')
                }}/></li>
             <li className='cursorPointerLi' onClick={()=>{
               setChoiseChannel('http://aztecalive-lh.akamaihd.net/i/0kus659k5_1@501884/master.m3u8')
             }}><span><ReactPlayer        
                         className='react-player'
                         url='http://aztecalive-lh.akamaihd.net/i/0kus659k5_1@501884/master.m3u8'
                         width='100px'
                         height='100%'
                         muted={true}
                         controls={true}  
                         style={{zIndex:'0'}}     
                /></span><span style={{width:'250px',position:'absolute'}} onClick={()=>{
                  setChoiseChannel('http://aztecalive-lh.akamaihd.net/i/0kus659k5_1@501884/master.m3u8')
                }}/></li>
                   <li className='cursorPointerLi' onClick={()=>{
               setChoiseChannel('http://rtmp.one.by:1200')
             }}><span><ReactPlayer        
                         className='react-player'
                         url='http://rtmp.one.by:1200'
                         width='100px'
                         height='100%' 
                         muted={true}
                         controls={true}  
                         style={{zIndex:'0'}}     
                /></span><span style={{width:'250px',position:'absolute'}} onClick={()=>{
                  setChoiseChannel('http://rtmp.one.by:1200')
                }}/></li>
             <li className='cursorPointerLi'><span><Image src={noSignal} style={{width:'100px'}}/>Sin señal</span></li>
             <li className='cursorPointerLi'><span><Image src={noSignal} style={{width:'100px'}}/>Sin señal</span></li>
             <li className='cursorPointerLi'><span><Image src={noSignal} style={{width:'100px'}}/>Sin señal</span></li>
             <li className='cursorPointerLi'><span><Image src={noSignal} style={{width:'100px'}}/>Sin señal</span></li>
             <li className='cursorPointerLi'><span><Image src={noSignal} style={{width:'100px'}}/>Sin señal</span></li>
           </ul>
          </Col>
        </Row>
       </div>
   
</div>
    </>
	)
}
