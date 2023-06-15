import React, { useState, useEffect } from 'react';
import { firebaseAuth } from '../../util/firebase/firebase-util';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js';
import { Link } from "react-router-dom";
import Navbar from '../components/navbar';
import { fetchUserById } from "../../network/user-api";
import { fetchAllProjects } from "../../network/project-api";
import { storageConfig, setJsonItem } from "../../data/storage-util";

function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState([]);

  async function fetchUserData(email) {
    try {
      await fetchUserById(email)
        .then((response) => {
          setJsonItem(storageConfig.userDataKey, response.data);
          console.log("User data session saved!");
        });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function fetchProjects() {
    try {
      setIsLoading(true);
      await fetchAllProjects()
        .then((response) => {
          console.log("Response:", response);
          const _projects = [];
          response.data.projects.forEach((item) => {
            _projects.push(projectToView(item))
          });
          setProjects(_projects);
          setIsLoading(false);
        });
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  }

  function projectToView(project) {
    return (
      <Link to="/purchase-order" className="text-decoration-none text-reset" key={project[0]}>
        <div className='container-fluid p-3 d-flex flex-row align-items-center bg-body-tertiary mb-2'>
          <div className='container-fluid p-0 d-flex flex-column'>
            <div className='fw-bold'>{project[1]}</div>
            <div className='fw-light'>Ver opciones del proyecto</div>
          </div>
          <i className="fs-3 bi bi-arrow-right"></i>
        </div>
      </Link>
    );
  }

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        fetchUserData(user.email);
      }
    });

    fetchProjects();
  }, []);

  return (
    <div>
      <Navbar />
      {isLoading ? (
        <div className='container mt-4'>
          <div className="alert alert-secondary" role="alert">
            Procesando, espere un momento...
          </div>
        </div>
      ) : (
        <div className='container d-flex flex-column'>
          <div className='container border border-secondary rounded-3 mt-4 p-3'>
            <div className='fs-4 mb-2'>Control | Tu Casa Construcciones</div>
            <hr></hr>
            Te damos la bienvenida al sistema de gestion.
          </div>


          <div className='container'>
            <div className='fs-5 mt-4 text-uppercase'>Proyectos</div>
            <p className='fw-light'>Presiona para ver las opciones del proyecto</p>
          </div>
          {projects.length > 0 ? (
            projects
          ) : (
            <div className="container">
              <i className="bi bi-exclamation-triangle-fill"></i> No se encontraron proyectos disponibles!
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
