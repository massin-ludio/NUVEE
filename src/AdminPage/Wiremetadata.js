import { collection, getDocs,addDoc, arrayUnion } from 'firebase/firestore'
import { ref,uploadBytes,uploadBytesResumable,getDownloadURL } from 'firebase/storage'
import { storage } from '../Config/firebase'
import React,{useState,useEffect} from 'react'
import { InputGroup,FormControl,Col,Row, ToggleButton, Button,Form,Card,ProgressBar } from 'react-bootstrap'
import db from '../Config/firebase'
import wirecard from '../Img/cardbackground.png'
import SearchCodeMov from './SearchCodeMov'



export default function Wiremetadata(keyImg) {
  
    const [movieDetailsOff,setMovieDetailsOff] = useState('Descripcion desconocida')
    const [titleMovie,setTitleMovie] = useState('Titulo desconocido')
    const [realTitleMovie,setRealTitleMovie] = useState('Titulo desconocido')
    const [codeMovie,setCodeMovie] = useState('Codigo de pelicula')
    const [categoriesLoad,setCategoriesLoad] = useState([])
    const [maturityLevel,setMaturityLevel] = useState(['All','7+','13+','16+','18+'])
    const [ersbLoad,setERSBLoad] = useState('')
    const [trailerUpState,setTrailerUpState] = useState(false)
    const [embedCode,setEmbedCode] = useState('')
    const [togLive,setTogLive] = useState(false)
    const [showUpDone,setShowUpDone] = useState(false)
    const [upToServerOn,setUpToSeverOn] = useState('')
    const [putCategory,setPutCategory] = useState('')
    const [ondemandMovie,setOndemandMovie] = useState(false)
    const [ondemandSerie,setOndemandSerie] = useState(false)
    const [ondemandTv,setOndemandTv] = useState(false)
    const [newTrailerLoad,setNewTrailerLoad] = useState()
    const [newVideoLoad,setNewVideoLoad] = useState()
    const [keyImgs,setKeyImgs] = useState(keyImg.keyImg)
    //utils about thumbs
    const [pushImgTitle,setPushImgTitle] = useState(wirecard) 
    const [pushViewImg,setPushViewImg] = useState(wirecard) 
    const [pushLogoImg,setPushLogoImg] = useState(wirecard) 
    const [titleImg,setTitleImg] = useState()
    const [viewImg,setViewImg] = useState()
    const [logoImg,setLogoImg] = useState()
    const [refreshNewTitleImg,setRefreshNewTitleImg] = useState()
    const [refreshNewViewImg,setRefreshNewViewImg] = useState()
    const [refreshNewLogoImg,setRefreshNewLogoImg] = useState()
    const [nowPro,setNowPro] = useState('0')
    const [showProgres,setShowProgres] = useState()
    

    const image = "https://image.tmdb.org/t/p/original";

    useEffect(() => {
        setPutCategory('')
        const dataCategory = async ()=>{
          const loadCategory = await getDocs(collection(db,'movie_category'))
          setCategoriesLoad(loadCategory.docChanges())
          console.log(loadCategory.docChanges())          
      }
      dataCategory()
    }, [])

    useEffect(()=>{
        if(!putCategory) return
        console.log(putCategory)
    },[putCategory])

    const getNewVideo = ()=>{
        console.log(keyImg.keyImg)
        let putImg = document.querySelectorAll('#loadVideo')
        console.log(putImg)
        putImg[0].click()
    }
    
    useEffect(() => {
        if(!newVideoLoad) return 
        if(!titleMovie) return
        if(!movieDetailsOff) return
        if(!ersbLoad) return
        if(!putCategory) return

        let fileData = newVideoLoad.target.files[0]
            console.log(fileData)
            const storageRef = ref(storage, 'video/Peliculas/'+keyImg.keyImg+'/movie.mp4'); 
            //uploadBytes(storageRef, fileData).then((snapshot) => {
               // console.log('Uploaded a blob or file! '+snapshot);                
            //})  
            const uploadTask = uploadBytesResumable(storageRef, fileData);

            uploadTask.on('state_changed',  (snapshot) => {    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            setNowPro(progress)
            progressInstance(progress)
                          switch (snapshot.state) {
                          case 'paused': console.log('Upload is paused'); break;
                          case 'running':console.log('Upload is running'); break;
                   }
              },
              (error) => {   // Handle unsuccessful uploads
              },
                () => {
                       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                      console.log('File available at', downloadURL);
                      alert('El video '+ titleMovie+' fue cargado con exito')
                });
            });


    
            loadToServer()
       
       

      }, [newVideoLoad])

      const loadToServer=()=>{
        if(!newVideoLoad) return 
        if(!titleMovie) return
        if(!movieDetailsOff) return
        if(!ersbLoad) return
        if(!putCategory) return

        const upToServer = async()=>{
            try{
                await  addDoc(collection(db,'movie_metadata'),{
                nombreVideo:titleMovie,                    
                detallesVideo:movieDetailsOff,                    
                ersb:ersbLoad,                    
                categoriaVideo:arrayUnion(putCategory),
                idVideo:keyImgs,
                isMoive:ondemandMovie,
                isSerie:ondemandSerie,
                isTvOn:ondemandTv,
                trailerAvalible:trailerUpState,
                urlTitle:pushImgTitle,
                urlLogo:pushLogoImg,
                urlPreview:pushViewImg,
                likesIt:'0',
                diaVideo:Date()
               })
               console.log('done db')
               
            }
            catch(e){
                console.log(e)
            }
        }
        upToServer() 
      }
    
  useEffect(() => {
    if(!nowPro) return
    setShowProgres(true)

  }, [nowPro])

  useEffect(() => {
    if(nowPro=='100'){
      setShowProgres(false)
    }
  }, [nowPro])
  
  
      
  function progressInstance(progrex){ return <ProgressBar now={nowPro} label={`${progrex}%`} />;}

  const getImgTitle = ()=>{
      console.log(keyImg.keyImg)
      let putImg = document.querySelectorAll('#titleImg')
      console.log(putImg)
      putImg[0].click()
  }
  const getImgLogo = ()=>{
    console.log(keyImg.keyImg)
    let putImg = document.querySelectorAll('#logoImg')
    console.log(putImg)
    putImg[0].click()
   }
  const getImgView = ()=>{
    console.log(keyImg.keyImg)
    let putImg = document.querySelectorAll('#viewImg')
    console.log(putImg)
    putImg[0].click()
   }

// functions about upload title image and view later to take
  useEffect(() => {
    if(!titleImg) return
    let fileData = titleImg.target.files[0]
        console.log(fileData)
        const storageRef = ref(storage, 'video/Thumbs/Portada/'+keyImg.keyImg+'/portada.jpg'); 
        uploadBytes(storageRef, fileData).then((snapshot) => {
            console.log(snapshot.metadata.fullPath);
            setRefreshNewTitleImg(true)
        })        
  }, [titleImg])

  useEffect(() => {
    if(!refreshNewTitleImg) return
    const loadResurses = ()=>{
       getDownloadURL(ref(storage, 'video/Thumbs/Portada/'+keyImg.keyImg+'/portada.jpg'))
            .then((url) => {
               setPushImgTitle(url)
            })
            .catch((error) => {
              console.log(error)
             });
      }
    loadResurses() 
    setRefreshNewTitleImg(false)     
    }, [refreshNewTitleImg])
//finish

//logo view img
useEffect(() => {
  if(!logoImg) return
  let fileData = logoImg.target.files[0]
      console.log(fileData)
      const storageRef = ref(storage, 'video/Thumbs/Logo/'+keyImg.keyImg+'/logo.jpg'); 
      uploadBytes(storageRef, fileData).then((snapshot) => {
          console.log(snapshot.metadata.fullPath);
          setRefreshNewLogoImg(true)
      })        
}, [logoImg])

useEffect(() => {
  if(!refreshNewLogoImg) return
  const loadResurses = ()=>{
     getDownloadURL(ref(storage, 'video/Thumbs/Logo/'+keyImgs+'/logo.jpg'))
          .then((url) => {
             setPushLogoImg(url)
          })
          .catch((error) => {
            console.log(error)
           });
    }
  loadResurses() 
  setRefreshNewLogoImg(false)     
  }, [refreshNewLogoImg])


// View options hot to up 
useEffect(() => {
  if(!viewImg) return
  let fileData = viewImg.target.files[0]
      console.log(fileData)
      const storageRef = ref(storage, 'video/Thumbs/Preview/'+keyImgs+'/preview.jpg'); 
      uploadBytes(storageRef, fileData).then((snapshot) => {
          setRefreshNewViewImg(true)
      })        
}, [viewImg])

useEffect(() => {
  if(!refreshNewViewImg) return
  const loadResurses = ()=>{
     getDownloadURL(ref(storage, 'video/Thumbs/Preview/'+keyImgs+'/preview.jpg'))
          .then((url) => {
             setPushViewImg(url)
          })
          .catch((error) => {
            console.log(error)
           });
    }
  loadResurses() 
  setRefreshNewViewImg(false)     
  }, [refreshNewViewImg])

  
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [error, setError] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    if(!titleMovie) return
  
    const handleSubmit = async ()=>{
    
    setSpinner(true);
    fetch(`https://api.themoviedb.org/3/search/multi?api_key=00f019191c205c1208fd3d615b9fb303&language=es-ES&query=${titleMovie}&page=1&include_adult=false`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
        console.log(data.results)
        setError(false);
        setShowOverlay(true);
      if(data.results.length == 0){
            setError(true);
            setShowOverlay(false);
      }
        setSpinner(false);
      });
    };
    handleSubmit()

  }, [titleMovie])
  
  const chooseMovie = (e)=>{
    console.log(e)    
    setCodeMovie(e.id)
    setMovieDetailsOff(e.overview)
    setRealTitleMovie(e.original_title)
    setTitleMovie('')
    document.getElementById('title-Movie').value = e.title
    setPushLogoImg(image+e.backdrop_path)
    setPushImgTitle(image+e.poster_path)
   

  }
  

  return (
  <div>
    {showProgres==false ? <div>{progressInstance()}</div>:<div>      
        <p>Titulo de video</p>
        {/**setTitleMovie */}      
      
        <InputGroup>
          <FormControl 
            placeholder='Titulo de pelicula a agregar'
            aria-label='titlemovie'
            type='search'
            id='title-Movie'
            defaultValue={realTitleMovie}
            //value={realTitleMovie}
            onChange={(e)=>{setTitleMovie(e.target.value)}}
            />
        </InputGroup>
       {titleMovie.length != '' ? <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
        {movies.map(movieDB => (
          <SearchCodeMov
            movie={movieDB}
            key={movieDB.id}
            chooseMovie={chooseMovie}
          />
        ))}
      </div>:<></>}
      <p>Codigo de TMDB</p>
        {/**setCodeMovie */}
      <InputGroup>
          <FormControl 
            placeholder='Codigo'
            aria-label='titlemovie'
            type='text'
            value={codeMovie} 
           // value={codeMovie}          
            onChange={(e)=>{setCodeMovie(e.target.value)}}
            />
        </InputGroup>

        <p>Descripcion de video</p>
        {/**setMovieDetailsOff */}
        <InputGroup>
          <FormControl 
            placeholder='Descripcion desconocida'
            aria-label='descriptionmovie'
            type='text'
            value={movieDetailsOff}
           // value={movieDetailsOff}
            onChange={(e)=>{setMovieDetailsOff(e.target.value)}}
          />
        </InputGroup>
        <p>Categoria de video</p>
        {/**putCategory */}
        <InputGroup>
        <span>
        <FormControl 
         type='text'
         defaultValue={putCategory}               
        />
        </span>
          <select onChange={(e)=>{setPutCategory(e.target.value)}}>{categoriesLoad.map((categorias)=>(
               <option key={categorias.doc.id} >{categorias.doc.data().categoria}</option>
           ))}     
          </select>
        </InputGroup>
        <p>Nivel ESRB</p>
        <InputGroup>
            <select onChange={(e)=>{setERSBLoad(e.target.value)}}>{maturityLevel.map((esrb)=>(
                <option key={esrb}>{esrb}</option>
            ))}

            </select>
        </InputGroup>
        <p>Disponivilidad</p>
        {/**menu de si esta en peliculas series o tv o todas */}
        <Row>
            <Col>
            <ToggleButton         
                className="mb-2"
                id="toggle-check"
                type="checkbox"
                variant="outline-primary"
                checked={ondemandMovie}
                value="Pelicula"
                onChange={(e) => {setOndemandMovie(e.currentTarget.checked);console.log(e.currentTarget.checked)}}
                >Pelicula</ToggleButton>
            </Col>
            <Col>
            <ToggleButton         
                className="mb-2"
                id="toggle-check"
                type="checkbox"
                variant="outline-primary"
                checked={ondemandSerie}
                value="Pelicula"
                onChange={(e) => setOndemandSerie(e.currentTarget.checked)}
                >Serie</ToggleButton>
            </Col>
            <Col>
            <ToggleButton         
                className="mb-2"
                id="toggle-check"
                type="checkbox"
                variant="outline-primary"
                checked={ondemandTv}
                value="Pelicula"
                onChange={(e) => setOndemandTv(e.currentTarget.checked)}
                >Tv contenido</ToggleButton>
            </Col>
        </Row>

        <br></br>

        <div className='App-header' >{/** keyImgs */}
        <Row style={{marginTop:'50px!important'}}>
            <Col>
               <Card className='thumb-img-title'>                     
                  <Card.Img onClick={()=>getImgTitle()} style={{zIndex:'5',borderRadiusBottomleft:'0px!important',borderRadiusBottomleft:'0px!imporant',height:'100%'}} src={pushImgTitle}></Card.Img>
                  <span style={{fontSize:'0.4em',color:'gray',zIndex:'25',textAlign:'center'}}>Ratio: 9:16 Recomendado 1080 x 1920 Image: JPEG</span>                     
                  <br></br>
                  <Button>Subir</Button>
                </Card>
            </Col>           
              <Col>
              <div >
                  <Card className='thumb-img-logo'>
                    <Card.Img onClick={()=>getImgLogo()} style={{zIndex:'5',borderRadiusBottomleft:'0px!important',borderRadiusBottomleft:'0px!imporant',height:'100%'}} src={pushLogoImg}></Card.Img>
                    <span style={{fontSize:'0.4em',color:'gray',zIndex:'25',textAlign:'center'}}>Recomendado: 500px de ancho, Formato PNG con transparencia</span>                     
                </Card> 
              </div>
              <br></br>
              <div >
                  <Card className='thumb-img-view'>
                     <Card.Img onClick={()=>getImgView()} style={{zIndex:'5',borderRadiusBottomleft:'0px!important',borderRadiusBottomleft:'0px!imporant',height:'100%'}} src={pushViewImg}></Card.Img>
                     <span style={{fontSize:'0.4em',color:'gray',zIndex:'25',textAlign:'center'}}>Thumbs ratio 16:9 Recomendado 1920 x 1080, Image: JPEG</span>                     
                 </Card>
              </div>
            </Col>                     
        </Row>     
        <Form.Control
            style={{display:'none'}}
            id='titleImg'
            type='file'
            accept='image/png,image/jpeg'
            onChange={(e)=>setTitleImg(e)}
        />
        <Form.Control
            style={{display:'none'}}
            id='logoImg'
            type='file'
            accept='image/png,image/jpeg'
            onChange={(e)=>setLogoImg(e)}
        />
        <Form.Control
            style={{display:'none'}}
            id='viewImg'
            type='file'
            accept='image/png,image/jpeg'
            onChange={(e)=>setViewImg(e)}
        />
            
    </div>
      


        <br></br>
        <Button onClick={()=>{getNewVideo()}} style={{width:'100%'}}>Seleccionar Video</Button>
        <Form.Control
            style={{display:'none'}}
            id='loadVideo'
            type='file'
            onChange={(e)=>setNewVideoLoad(e)}
        />
        
    </div>  }
    </div>
    )
}
