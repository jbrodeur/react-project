import './App.css';

function changeFailureRatePercent(deploymentCount, failureCount) {
  var failRate = 0;
  if ((typeof deploymentCount == "undefined") || (typeof failureCount == "undefined")) {
    failRate = 0;
  } else
    if (failureCount === 0) {
      failRate = 0;
    } else
      if (failureCount >= deploymentCount) {
        failRate = 1;
      } else {
        failRate = failureCount / deploymentCount;
      }
      
  // Return as percent
  failRate = failRate*100;
  // round to one decimal point
  return Math.round(failRate * 10) / 10;
}

function ChangeFailRate(props) {
  const sectionTitle = 'Change Fail Rate';
  return (
    <div className="AppSection">
      <h3>{sectionTitle}</h3>
      <p>Change Fail Rate: <strong>{changeFailureRatePercent(props.deploymentCount, props.failureCount) + '%'}</strong></p>
    </div>
  );
}

export default ChangeFailRate;
