import React, { useState } from 'react';


import Uno from '../img/1.jpg'
import Dos from '../img/2.jpg'
import Tres from '../img/3.jpg'
import Cuatro from '../img/4.png'

import {app, analytics} from '../credenciales';
import {getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword }  from 'firebase/auth';
const auth=getAuth(app);


const Login = () => {
 const [registro, setRegistro] = useState(false)
 
 const handlerSubmit=async(e)=>{
  e.preventDefault();
  const email=e.target.Email.value;
  const password=e.target.password.value;
  
  if(registro){
    const usercredential=await createUserWithEmailAndPassword(auth, email, password);
    
  }else{
    const login=await signInWithEmailAndPassword(auth, email, password);
  }
  
 }
 
  return (
  
     
    <div className="row container p-4">
      <div className="col-md-8 ">
      <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={Uno} alt="" className='tamaño-imagen'/>
            </div>
            <div className="carousel-item">
              <img src={Dos} alt="" className='tamaño-imagen'/>
            </div>
            <div class="carousel-item">
              <img src={Tres} alt="" className='tamaño-imagen' />
            </div>
             <div class="carousel-item">
              <img src={Cuatro} alt="" className='tamaño-imagen' />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      {/* en esta seccion sera el formulario */}

      <div className="col-md-4">
        <div className='mt-5 ms-5'>
          <h1>{registro ? 'resgistrate': 'inicia sesion' }</h1>
          <form onSubmit={handlerSubmit}>
            <div className='mb-3'>
              <label className='form-label'> Email</label>
              <input type="email" className="form-control" id="Email" placeholder='Ingresa tu email' required />
              
            </div>
            <div className='mb-3'>
              <label className='form-label'> Password</label>
              <input type="password" className="form-control" id="password" placeholder='Ingresa tu password' required />
              
            </div>
            <button type="submit" className='btn btn-primary'>
              {registro ? 'resgistrate': 'inicia sesion' }
            </button>
          
          </form>
          <div className='form-group'>
            <button type='button' className='btn btn-secondary mt-4 form-control' onClick={()=>setRegistro(!registro)}>
              {registro ? 'ya tienes una cuenta?, inicia sesion':'no tienes cuenta, registrate'}
            </button>
            
          </div>
          
        </div>
      </div>
    </div>
  );
  
}

export default Login
