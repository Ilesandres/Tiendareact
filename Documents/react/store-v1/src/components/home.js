import React,{useEffect, useState} from 'react'

import {app, analytics} from '../credenciales'
import {getAuth,signOut} from 'firebase/auth'
import {getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc} from 'firebase/firestore'

const auth =getAuth(app);
const db=getFirestore(app);


const Home = ({correoUsuario}) => {

  const valorInicial={
    nombre :'',
    edad :'',
    profesion :''
  };
  
  //variables de estado
  
  
  const [usuario, setUser]=useState(valorInicial);
  const [lista, setLista]=useState([]);
  const [subId, setSubId]=useState('');

  
  
  //funcion para capturar los valores del formulario de
  
  const capturarDatos=(e)=>{
  
    const {name,value}=e.target;
    setUser({...usuario,[name]:value})
    
  }
  
  //guardar o actualizar datos
  const guardarDatos=async(e)=>{
    e.preventDefault();
    
    if(subId===''){
      try {
        await addDoc(collection(db,'usuarios'),{
          ...usuario
        })
      } catch (error) {
        console.log(error)
      }
      
    }else{
    //actualizar
      await setDoc(doc(db,'usuarios',subId), {
      ...usuario
      }
      )
    }
   
    setUser({...valorInicial})
    setSubId('');
  }
  
  //funcion para renderizar la lista de usuarios 
  
  useEffect(()=>{
    const getLista=async()=>{
      try {
        const querySnapshot=await getDocs(collection(db,'usuarios'))
        const docs=[];
        querySnapshot.forEach((doc)=>{
          docs.push({...doc.data(), id: doc.id });
        })
        setLista(docs);
      } catch (error) {
        console.log(error)
      }
    }
    getLista();
    
  },[lista]);
  
  //funcion para eliminar el usuario
  
  
  const deleteUser=async(id)=>{
    await deleteDoc(doc(db,'usuarios',id));
  }
  
  //funcion para actualizar el usuario
    
    const getOne=async(id)=>{
      
      try {
      const docRef= doc(db, 'usuarios', id);
      const docSnap= await getDoc(docRef);
      
      setUser(docSnap.data())
        
        
      } catch (error) {
        console.log(error)
      }
    }
    
    useEffect(()=>{
      if(subId!==''){
      
        getOne(subId);
        
      }
    },[subId])

  

  return (
    <div className='container'>
    
      <p>Bienbenido, <strong>{correoUsuario}</strong> haz iniciado sesion </p>
      
      <button type="button" className='btn btn-primary' onClick={()=>signOut(auth)}>
        cerrar sesion
      </button>
      
      <hr/>
      
      <div className='row'>
      {/*seccion para el formulario*/}
        <div className='col-md-4'>
          <h3 className='text-center mb-3'>ingresar usuario</h3>
          <p className='alert alert-danger'>
          {subId!==''?'si eliminas el contenido al haber selecionado un elemento para actuaizar y añades otros datos, reemplazas los datos de este usuario':
          'verifica todos los campos antes de agregar el usuario'}
          </p>
          <form onSubmit={guardarDatos}>
            <div className='card card-body'>
              <div className='form-group'>
                <input type="text" name='nombre' onChange={capturarDatos} value={usuario.nombre} placeholder='ingresa el nombre' className='form-control mb-3'/>
                <input type="number" name='edad' onChange={capturarDatos} value={usuario.edad} placeholder='ingresa la edad' className='form-control mb-3' />
                <input type="text" name='profesion' onChange={capturarDatos} value={usuario.profesion} placeholder='ingresa la profesion' className='form-control mb-3' />
              </div>
              <button type="submit" className='btn btn-secondary'>
              {subId!==''? 'actualizar':'enviar'}
 
              </button>
              
            </div>
          </form>
          
        </div>
        
        {/*lista de nuestros usuarios*/}
        <div className='col-md-8'>
          <h2 className='text-center mb-5'>lista de usuarios</h2>
           
           <div className='contianer card'>
            <div className='card-body'>
              {
              lista.map(list=>(
                <div key={list.id}>
                  <p>nombre : {list.nombre}</p>
                  <p>edad : {list.edad}</p>
                  <p>profesion : {list.profesion}</p>
                  <button className='btn btn-danger' onClick={()=>deleteUser(list.id)}>
                    eliminar
                  </button>
                  <button className='btn btn-success Actualizar m-1' onClick={()=>setSubId(list.id)}>
                    Actualizar
                  </button>
                  <hr/>
                </div>
              ))
              }
            </div>
            
           </div>
           
        </div>
        
      </div>
    </div>
  )
}

export default Home
