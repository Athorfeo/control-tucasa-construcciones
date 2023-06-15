import React, { useState } from 'react';
import { firebaseAuth } from '../../util/firebase/firebase-util';
import { signInWithEmailAndPassword, signOut as signOutFirebase  } from 'https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js';

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
      <form className='p-3 border border-secondary rounded-3'  onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="inputEmail" className="form-label">Correo Electronico</label>
          <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)}></input>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
        </div>
        <button type="submit" className="btn btn-primary">Iniciar sesion</button>
      </form>
    </div>
  );
}

export default Login;
