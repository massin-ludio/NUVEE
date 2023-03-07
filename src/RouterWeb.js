import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Wirehometv from './AdminPage/Wirehometv'
import App from './App'


export default function RouterWeb() {
  return (
    <BrowserRouter>
       <Routes>
           <Route path="/" element={<App/>}/>
           <Route path='/adminvideo' element={<Wirehometv/>}/>
        
       </Routes>
    </BrowserRouter>
  )
}
