import React, { useContext, useEffect } from 'react'
import { apisContext } from '../../Context/ApisContext';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import { Rating } from '@mui/material';
import { darkContext } from '../../Context/DarkContext';
import ToastContainer from 'react-bootstrap/ToastContainer';
import styles from "./MovieDetails.module.css";
import { Helmet } from 'react-helmet';



export default function MovieDetails() {
  let [isLoading,setIsLoading]=useState(true)
  let [movieData,setMovieData]=useState(null)
  const [showA, setShowA] = useState(false);
  let {id}=useParams()
  let {trendingId,lang,baseImgurl}=useContext(apisContext)
  let {isdark}=useContext(darkContext)

// Toast Toggle
  const toggleShowA = () => setShowA(!showA);
  let getData= async()=>{
    setIsLoading(true)
    let {data} = await trendingId("movie",id)
    setIsLoading(false)
    setMovieData(data)
  }

  useEffect(()=>{
    getData();
  },[])

  // change language
  useEffect(()=>{
    getData();
  },[lang])



  return (
    <>
    <Helmet>
        <title>Movies</title>
        </Helmet>
    {isLoading?<>
      <div className="loader">
      <div className="sk-cube-grid">
          <div className="sk-cube sk-cube1"></div>
          <div className="sk-cube sk-cube2"></div>
          <div className="sk-cube sk-cube3"></div>
          <div className="sk-cube sk-cube4"></div>
          <div className="sk-cube sk-cube5"></div>
          <div className="sk-cube sk-cube6"></div>
          <div className="sk-cube sk-cube7"></div>
          <div className="sk-cube sk-cube8"></div>
          <div className="sk-cube sk-cube9"></div>
        </div>
      </div>
      </>:<>
      <div className="container shadow-lg my-5 py-5">
        {movieData&&<div className="row">
          <div className="col-md-4 text-center">
            <img src={baseImgurl+movieData.poster_path} className='w-100 rounded-5 shadow-lg' alt="" />
            <Rating  name="read-only" readOnly value={(movieData.vote_average/2)} max={5} precision={0.25} size="large"/>
          </div>
          <div className="col-md-8 ">
          <h2 className='text-center'> <div className="badge bg-dark fs-2">{movieData.title}</div> <h5 className='my-1'>{movieData.tagline}</h5></h2>

          <h4 className='my-3'>{lang==="en"?"Language":"اللغه"} : </h4> {movieData.spoken_languages.map((item,index)=><span key={index} className='badge bg-success mx-2 fs-5'>{item.name}</span>)}
          <h4 className='my-3'>{lang==="en"?"Genres":"التصنيف"} : </h4> {movieData.genres.map((item,index)=><span key={index} className='badge bg-success mx-2 fs-5'>{item.name}</span>)}
          <h4 className='my-4'>{lang==="en"?"Overview":"الوصف"} : <p className={`text-muted my-3 ${lang==="en"?"ps-5":"pe-5"}`}> {movieData.overview}</p> </h4>
          {movieData.belongs_to_collection&&<h4 className='my-3 position-relative'>{lang==="en"?"Belongs to":"من سلسله افلام"} :
           <p  onMouseEnter={toggleShowA} onMouseLeave={toggleShowA} className={`badge bg-secondary pointer mx-2`}>{movieData.belongs_to_collection.name}</p> 
           <ToastContainer className="p-3" position={lang==="en"?"top-end":"top-start"}>
            <Toast bg={isdark?"dark":"light"} show={showA} onClose={toggleShowA}>
                <Toast.Header>
                  <img
                  onClick={toggleShowA}
                    src={baseImgurl+movieData.belongs_to_collection.backdrop_path}
                    className="rounded-5 me-2 w-100"
                    alt={movieData.belongs_to_collection.name}
                  />  
                </Toast.Header>
                <Toast.Body>{movieData.belongs_to_collection.name}</Toast.Body>
              </Toast></ToastContainer>
           </h4>}
          <div className={`row my-3 gy-3 ${lang==="en"?"text-start":"text-end"}` }>
          {movieData.homepage && <div className="col-md-8"> <h5>{lang==="en"?"Home Page":"الموقع الرسمي"} : <Link className=' fs-5' target='__blank' to={movieData.homepage}>{movieData.homepage}</Link></h5></div>}
            <div className="col-md-4"><h5>{lang==="en"?"In Cinemas":"في السينما "} : {movieData.release_date}</h5></div>
          </div>
          </div>

        </div>}
      </div>
      </>}
      </>
  )
}

 