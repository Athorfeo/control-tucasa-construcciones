import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import Loading from "../components/loading"
import Navigator from "../components/navigator"
import { storageConfig, getJsonItem } from "../../data/storage-util";
import { useNavigate } from "react-router-dom";

function DashboardFeature() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProjectName, setSelectedProjectName] = useState("");

  useEffect(() => {
    const task = async () => {
      setIsLoading(true);
      let project = getJsonItem(storageConfig.selectedProjectDataKey);

      if(project == null) {
        navigate("/dashboard");
      } else {
        setSelectedProjectName(project.name);
        setIsLoading(false);
      }
    };
    
    task();
  }, []);
  
  return (
    <div>
      <Navbar />

      <div className='container d-flex flex-column'>
        <Navigator navigateTo="/dashboard" projectName={selectedProjectName}/>
      </div>
      
      {isLoading ? (
        <Loading />
      ) : (
        <div className='container d-flex flex-column'>

          <div className='container mt-4'>
            <div className='fs-4 mb-2'>Opciones</div>
            <hr></hr>
            Funcionalides disponibles
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardFeature;
