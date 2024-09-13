import React, { useState, useEffect } from 'react';

import { firebaseAuth } from 'util/firebase/firebase-util';
import { onAuthStateChanged } from "@firebase/auth";

import { useNavigate } from "react-router-dom";

import { fetchUserById } from "network/api/user-api";
import { fetchAllProjects } from "network/api/project-api";
import { storageConfig, setJsonItem } from "util/storage-util";
import { isAdminRol, isSuperAdminRol, isAssistantRol } from "util/session-util";

import Navbar from '../components/navbar';
import Loading from "ui/components/loading";
import RetryAlert from "ui/components/retry-alert";

function Dashboard() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [userRol, setUserRol] = useState(-1);

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
          setUserRol(parseInt(response.data.rol));
          console.log(response.data);
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
    const project = projects[index];
    setJsonItem(storageConfig.selectedProjectDataKey, project);
    console.log(project);
    console.log("Project data session saved!");

    navigate('/feature');
  }

  function itemView(id, title, description, onClick) {
    return (
      <div
        className='text-decoration-none text-reset container-fluid p-3 d-flex flex-row align-items-center bg-body-tertiary mb-2'
        key={id}
        onClick={() => { onClick() }}>
        <div className='container-fluid p-0 d-flex flex-column'>
          <div className='fw-bold'>{title}</div>
          <div className='fw-light'>{description}</div>
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
          projects
          .sort((a, b) => a[0] - b[0])
          .map((project, index) => {
            return itemView(project.id, project.name, "Ver opciones del proyecto", () => { setProjectAndNavigate(index) });
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

  function renderModules() {
    let view = (
      <div>
        <div className='container'>
            <div className='fs-5 mt-4 text-uppercase'>Modulos</div>
            <p className='fw-light'>Presiona para navegar al modulo</p>
          </div>
        {itemView(1, "Proveedores", "Modulo para la gestion de Proveedores", () => { navigate('/suppliers') })}
      </div>
    );

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

          {(isAssistantRol(userRol) || isAdminRol(userRol) || isSuperAdminRol(userRol)) ? (
            renderModules()
          ) : null}

        </div>
      )}
    </div>
  );
}

export default Dashboard;
