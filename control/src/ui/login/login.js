import React, { useState } from 'react';
import { firebaseAuth } from '../../util/firebase/firebase-util';
import { signInWithEmailAndPassword } from "@firebase/auth";
import logo from '../../resource/drawables/logo.svg';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  const login = async (email, password) => {
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((_) => {
        console.log("SignIn success!");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("SignIn failed!: [" + errorCode + "]:" + errorMessage);
      });
  };

  return (
    <div className="w-100 vh-100 d-flex flex-column justify-content-center align-items-center">
      <img src={logo} width="200" height="80" className="d-inline-block align-top" alt="logo" />
      <form className='p-3 border border-secondary rounded-3' onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="inputEmail" className="form-label">Correo Electronico</label>
          <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)}></input>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
        </div>
        <div className='d-grid gap-2'>
          <button type="submit" className="btn btn-light">Iniciar sesion</button>
        </div>
      </form>
      Control | 2023
    </div>
  );
}

export default Login;
