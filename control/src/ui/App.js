import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { firebaseAuth } from '../util/firebase/firebase-util';
import { onAuthStateChanged } from "@firebase/auth";
import './App.css';

function App() {
  console.log("App!");
  const navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      const pathname = location.pathname;
      console.log(pathname);
      if (user) {
        console.log("Fisebase user logged!");
        console.log(user);
     
        switch(pathname) {
          case  '/':
          case '/login':
            navigate("/dashboard");
          break;
    
          default:
            // nothing!
          break;
        }
      } else {
        console.log("Fisebase user is not logged!");
    
        switch(pathname) {
          case '/login':
          break;
    
          default:
            navigate("/login");
            break;
        }
      }
    });
  });

  return (
    <div>
      <Outlet />
    </div>
  );
}

export default App;
