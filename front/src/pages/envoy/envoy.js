import React from "react";
import './envoy.css'
import { useHistory } from "react-router-dom";


const Envoy = () => {
  let history = useHistory();

  function handleClick() {
    history.push("/envoy-table");
  }
  

  return (
    <div>
<div className="d-flex justify-content-around mt-4" >
<div className='card shadow-lg p-3 mb-5 bg-white rounded card-btn'>
<div className="card-body">
<h4 className="text-center card-title">Fetch Stuck Payout Report </h4>
<div className="card-body">

</div>
<button type="button" className="btn btn-outline-primary btn-lg" onClick={handleClick}>Fetch Table</button>
</div>
  </div>

  <div className='card shadow-lg p-3 mb-5 bg-white rounded ml-5 card-btn'>
<div className="card-body">
<h4 className="text-center card-title">
Send Email to Envoy </h4>
<div className="card-body">

</div>
<button type="button" className="btn btn-outline-primary btn-lg " >
Send Email</button>
</div>
  </div>
</div>
<div>

<div className='card shadow-lg p-3 mb-5 mt-5 bg-white rounded ml-5 card-verify-btn'>
<div className="card-body">
<h4 className="text-center card-title">
Verify</h4>
<div className="card-body">

</div>
<button type="button" className="btn btn-outline-primary btn-lg" >
Verify</button>
</div>
  </div>
</div>
</div>

  )
};

export default Envoy;
