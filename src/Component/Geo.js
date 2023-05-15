import React from "react";
import os from 'os-browserify'

// console.log(os.platform(), os.hostname());

const Geo = () => {

  return <>
    
    <h2>Platform and hostName : {os.platform()+":"+ os.hostname()}</h2>
    <div className="inline-block mr-auto pt-1">
                                
                          </div>
  </>;
};

export default Geo;
