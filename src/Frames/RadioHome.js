import React,{useEffect, useState} from 'react'
import { Card ,Row,Col,Carousel, ButtonGroup, Button} from 'react-bootstrap'
import graycard from '../Img/cardbackground.png'
import purplecard from '../Img/purplecard.png'

export default function RadioHome({stationSelect,ind}) {
    const [sampleTitle,setSampleTitle] = useState(['banner','baner','Huuulk'])
    const [sampleList,setSampleList] = useState(['Rock en español','Pop en español','Top100','Rock en ingles','Pop en ingles','Banda y Grupera','Romanticas','Fiesta','HardRock y Metal','Indie y alternativa'])
    const [firstList,setFirstList] = useState(['Rock en español','Pop en español','Top100','Rock en ingles','Pop en ingles','Banda y Grupera'])
    const [secondList,setSecondList] = useState(['Romanticas','Fiesta','HardRock y Metal','Indie y alternativa'])
    const [samplePublicidad,setSamplePublicidad]= useState(['1','2','3'])
    const [detailsStation,setDetailsStation] = useState(['Rock en español','Pop en español','Top100','Rock en ingles','Pop en ingles','Banda y Grupera','Romanticas','Fiesta','HardRock y Metal','Indie y alternativa'])
    const [stSelect,setStSelect] = useState('')


    useEffect(()=>{
        if(!stSelect) return
        console.log(stSelect)
        stationSelect(stSelect)        
    },[stSelect])


  return (
<>
    <div className='width-100-space web-view' >
        <Row className='margin-ltr-5 web-view paddin-top-5'>
            <Col className='limit-card' >
                <Card className='height-100 '>
                    <Card.Text className='position-absolute left-10'>titulo editable</Card.Text>                    
                        <Card.Img className='height-100'src={graycard}></Card.Img>
                        <ButtonGroup className='p-absolute btn-aling'>
                                <Button className='txt-side-42'>Suscribirme</Button>
                                <Button className='txt-side-42'>Navegar sin costo</Button>
                                <Button className='txt-side-42'>Mas informacion</Button>                            
                        </ButtonGroup>
                        <Card.Img className='show-hover'src={purplecard}></Card.Img>
                </Card>
            </Col>
            <Col className='limit-card' xs lg="4">
                <Card className='height-100'>
                        <Card.Img  className='height-100'src={graycard}></Card.Img>
                </Card>
            </Col>
        </Row>
        <Row className='margin-ltr-5 web-view'>
            <p>Estaciones</p>
            {firstList.map((stationList)=>(
                <Col lg="2" xs className='limit-card' key={stationList} onClick={()=>setStSelect(stationList)}>
                     <Card className='height-100 card-select-magic' >
                         <Card.Title className='p-absolute'>{stationList}</Card.Title>
                         <Card.Img className='height-100 ' src={graycard}/>
                         <Card.Img className='position-absolute height-100 show-hover'src={purplecard}></Card.Img>
                     </Card>
                </Col>
            ))}
            
        </Row>
        <Row className='margin-ltr-5 web-view'>
        {secondList.map((stationList)=>(
            <Col lg="2" xs   className='limit-card' key={stationList}  onClick={()=>setStSelect(stationList)}>
                     <Card className='height-100 card-select-magic'>
                     <Card.Title className='p-absolute'>{stationList}</Card.Title>
                         <Card.Img className='height-100 ' src={graycard}/>
                         <Card.Img className='position-absolute height-100 show-hover'src={purplecard}></Card.Img>
                     </Card>
                </Col>
            ))}
            <Col className='limit-card' xs lg="4">
                <Card className='height-100 col-card-tab '>        
                       <Card.Img className='height-100' src={graycard}></Card.Img>
                </Card>
            </Col>
        </Row>
      <div className='d-none'>
        <Row className='margin-ltr-5 web-view d-none'>
            <p>Podcast</p>
            <Col className='limit-card' xs lg="2">
                <Card className='height-100'>
                    
                        <Card.Img className='height-100' src={graycard}></Card.Img>
                   
                </Card>
            </Col>
            <Col className='limit-card' xs lg="2">
                <Card className='height-100'>
                   
                        <Card.Img className='height-100' src={graycard}></Card.Img>
                   
                </Card>
            </Col>
            <Col className='limit-card' xs lg="2">
                <Card className='height-100'>
                  
                      <Card.Img className='height-100' src={graycard}></Card.Img>
                   
                </Card>
            </Col>
            <Col className='limit-card' xs lg="2">
                <Card className='height-100'>
                  
                       <Card.Img className='height-100' src={graycard}></Card.Img>
                
                </Card>
            </Col>
            <Col className='limit-card' xs lg="2">
                <Card className='height-100'>
               
                        <Card.Img className='height-100' src={graycard}></Card.Img>
                   
                </Card>
            </Col>
            <Col className='limit-card' xs lg="2">
                <Card className='height-100'>
                
                       <Card.Img className='height-100' src={graycard}></Card.Img>
            
                </Card>
            </Col>
        </Row>
        <Row className='margin-ltr-5 web-view'>
            <Col className='limit-card' xs lg="2">
                <Card className='height-100'>
                    
                        <Card.Img className='height-100' src={graycard}></Card.Img>
                   
                </Card>
            </Col>
            <Col className='limit-card' xs lg="2">
                <Card className='height-100'>
                   
                        <Card.Img className='height-100' src={graycard}></Card.Img>
                   
                </Card>
            </Col>
            <Col className='limit-card' xs lg="2">
                <Card className='height-100'>
                  
                      <Card.Img className='height-100' src={graycard}></Card.Img>
                   
                </Card>
            </Col>
            <Col className='limit-card' xs lg="2">
                <Card className='height-100'>
                  
                       <Card.Img className='height-100' src={graycard}></Card.Img>
                
                </Card>
            </Col>
            <Col className='limit-card' xs lg="4">
                <Card className='height-100'>        
                       <Card.Img className='height-100' src={graycard}></Card.Img>
                </Card>
            </Col>
        </Row>
        </div>
    </div>
    <div className='width-100-space mobil-view'>
        <Row className='card-adaptative'> 
            <Col className='card-heigh-max'>
                <Card className='card-heigh-max'>
                    <Card.Img className='card-heigh-max' src={graycard}/>
                </Card>            
            </Col>
        </Row>
        <div style={{marginTop:'10px'}}>
       
      <Row>
            {sampleList.map((station)=>(              
               <Col className='col-radio' key={station}>
                  <Card>
                      <Card.Img src={graycard}></Card.Img> 
                       <h3>{station}</h3>
                  
                  </Card>
              </Col>
            ))} 

</Row>

          
</div>
    </div>
</>
    )
}
