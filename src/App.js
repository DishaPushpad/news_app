
import './App.css';

import React from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
// import LoadingBar from 'react-top-loading-bar';


import {BrowserRouter,Routes,Route} from "react-router-dom";

const App =()=> {

// state={
//   progress:0
// }

// setProgress=(progress)=>{
//   setstate({progress:progress})
// }
 const apikey=process.env.REACT_APP_NEWS_API


  
    return (
      <div>
        <BrowserRouter>
       <NavBar/>

       {/* <LoadingBar
        color='#f11946'
        progress={state.progress}
         onLoaderFinished={() => setProgress(0)}
      /> */}

       <Routes>
        <Route exact path="/" element={<News apikey={apikey}  key ="home" pageSize={6} country="in" category="general"/>}></Route>
        <Route exact path="/business" element={<News  apikey={apikey} key ="business" pageSize={6} country="in" category="business"/>}></Route>
        <Route exact path="/entertainment" element={<News   apikey={apikey} key ="entertainment" pageSize={6} country="in" category="entertainment"/>}></Route>
        <Route exact path="/health" element={<News  apikey={apikey}  key ="health" pageSize={6} country="in" category="health"/>}></Route>
        <Route exact path="/science" element={<News  apikey={apikey}  key ="science" pageSize={6} country="in" category="science"/>}></Route>
        <Route exact path="/sports" element={<News apikey={apikey}   key ="sports" pageSize={6} country="in" category="sports"/>}></Route>
        <Route exact path="/technology" element={<News  apikey={apikey} key ="technology" pageSize={6} country="in" category="technology"/>}></Route>
        <Route exact path="/general" element={<News  apikey={apikey} key ="general" pageSize={6} country="in" category="general"/>}></Route>
       </Routes> apikey={apikey} 
       </BrowserRouter>
      </div>
    )
  
}
export default App