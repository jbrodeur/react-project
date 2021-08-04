import './App.css';
import React, { useState } from "react";

import Deployments from './Deployments'
import LeadTime from './LeadTime'
import RecoveryTimes from './RecoveryTimes'
import ChangeFailRate from './ChangeFailRate'

function AppBody() {

  // define state for the deployment count
  const [deploymentCount, setDeploymentCount] = useState(0);

  // define state for the failure count
  const [failureCount, setFailureCount] = useState(0);

  const localStoragePrefix = 'ReactProject';

  return (
    <div className="AppBody">
      <div className="row">
        <div className="col">
          <Deployments
            setDeploymentCount={setDeploymentCount}
            localStoragePrefix={localStoragePrefix}
          />
          <LeadTime />
        </div>
        <div className="col">
          <RecoveryTimes 
            setFailureCount={setFailureCount}
            localStoragePrefix={localStoragePrefix}
          />
          <ChangeFailRate
            failureCount={failureCount}
            deploymentCount={deploymentCount}
          />
        </div>
      </div>
    </div>
  );
}

export default AppBody;
