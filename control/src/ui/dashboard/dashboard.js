import React, { useState, useEffect } from 'react';
import { firebaseAuth } from '../../util/firebase/firebase-util';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js';
import { useNavigate } from "react-router-dom";
import Navbar from '../components/navbar';
import { fetchUserById } from "../../network/user-api";
import { fetchAllProjects } from "../../network/project-api";
import { storageConfig, setJsonItem } from "../../data/storage-util";
import Loading from "../components/loading"
import RetryAlert from "../components/retry-alert"
import { Project } from "../../model/Project"

function Dashboard() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        fetchUserData(user.email);
      }
    });

    fetchProjects();
  }, []);

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
          setProjects(response.data.projects);
          setIsLoading(false);
        });
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
      setProjects(null);
    }
  }

  function setProjectAndNavigate(index) {
    const rawProject = projects[index];
    const project = new Project(rawProject[0], rawProject[1], rawProject[2], rawProject[3]);
    
    setJsonItem(storageConfig.selectedProjectDataKey, project);
    console.log("Project data session saved!");

    navigate('/feature');
  }

  function projectToView(project, index) {
    return (
      <div
        className='text-decoration-none text-reset container-fluid p-3 d-flex flex-row align-items-center bg-body-tertiary mb-2'
        key={project[0]}
        onClick={() => { setProjectAndNavigate(index) }}>
        <div className='container-fluid p-0 d-flex flex-column'>
          <div className='fw-bold'>{project[1]}</div>
          <div className='fw-light'>Ver opciones del proyecto</div>
        </div>
        <i className="fs-3 bi bi-arrow-right"></i>
      </div>
    );
  }

  function renderProjects() {
    let view = null

    if (projects == null) {
      view = (
        <RetryAlert
          message="Ha ocurrido un error obteniendo los productos."
          onClick={() => { fetchProjects() }} />
      );
    } else {
      view = (
        projects.length > 0 ? (
          projects.map((item, index) => {
            return projectToView(item, index);
          })
        ) : (
          <div className="container">
            <i className="bi bi-exclamation-triangle-fill"></i> No se encontraron proyectos disponibles!
          </div>
        )
      );
    }

    return view;
  }

  return (
    <div>
      <Navbar />

      {isLoading ? (
        <Loading />
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
          {renderProjects()}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
