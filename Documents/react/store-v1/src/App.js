import React, {useState} from 'react';
import './App.css';
import Home from './components/home';
import Login from './components/login';
import {app, analytics} from './credenciales';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
const auth=getAuth(app);

function App() {
  const [usuario, setUsuario] = useState(null);
  
  onAuthStateChanged(auth,(usuarioFirebase)=>{
    if(usuarioFirebase){
      setUsuario(usuarioFirebase);
    }else{
      setUsuario(null);
    }
  })
  
  return (
    <div>
      {usuario ? <Home correoUsuario={usuario.email} />  : <Login/>}
    </div>
  );
}

export default App;
