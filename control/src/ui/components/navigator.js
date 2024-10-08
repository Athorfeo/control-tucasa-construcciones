import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { isSessionReady, isSessionProjectReady } from "../../util/session-util";
import { useNavigate } from "react-router-dom";
import { storageConfig, getJsonItem } from "../../util/storage-util";

function Navigator(props) {
  const navigate = useNavigate();
  const [selectedProjectName, setSelectedProjectName] = useState("");

  useEffect(() => {
    const task = async () => {
      let isRootViewProp = false;
      if(props.isRootView != undefined) {
        isRootViewProp = props.isRootView;
      }

      if(isRootViewProp) {
        if(!isSessionReady()) {
          navigate('/dashboard')
        }
      } else {
        if(isSessionProjectReady()) {
          let project = getJsonItem(storageConfig.selectedProjectDataKey);
          setSelectedProjectName(project.name);
        } else {
          navigate('/dashboard')
        }
      }
    };

    task();
  }, []);

  return (
    <div className='d-flex bg-body-tertiary p-3 mt-3 text-light text-decoration-none align-items-center'>
      <Link className="text-light text-decoration-none" to={props.navigateTo}>
        <div className='d-flex flex-row align-items-center'>
          <button type="button" className="btn btn-outline-light me-3"><i className="bi bi-arrow-left"></i> Atras</button>

        </div>
      </Link>
      {(selectedProjectName != "") ? (
        <div className='ms-1'> Proyecto: <span className='fw-bold'>{selectedProjectName}</span></div>
      ) : null}
    </div>
  );
}

export default Navigator;
