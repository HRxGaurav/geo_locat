import React, {  useState } from "react";
import os from 'os-browserify'

console.log(os.platform(), os.hostname());

const Geo = () => {
  const [geo, setGeo] = useState();
  const [time, setTime] = useState();

  const options = {
    enableHighAccuracy: true,
    timeout: 50000,
    maximumAge: 0,
  };

  function success(pos) {
    const crd = pos.coords;
    setTime(new Date(Date.now()).toLocaleString());

    // console.log("Your current position is:");
    // console.log(`Latitude : ${crd.latitude}`);
    // console.log(`Longitude: ${crd.longitude}`);
    // console.log(`More or less ${crd.accuracy} meters.`);
    setGeo(
      `https://www.google.com/maps/search/${crd.latitude},+${crd.longitude}?shorturl=1`
    );
  }

  function error(err) {
    setGeo(err.message)
    console.warn(`ERROR(${err.code}): ${err.message}`);
    setTime(new Date(Date.now()).toLocaleString());
  }

  navigator.geolocation.watchPosition(success, error, options);

  //   ----------------------------------------------------------------------------------------
  //   const scriptURL = "https://script.google.com/macros/s/AKfycbwEptCCNw6hFnIPLkcerNNgFIC_mlQ0CtGkViOu7xci0nt7M5c_B8EhoSmtOMkBZ2HYeA/exec";
  //   const form = document.forms["submit-to-google-sheet"];

  //   form.addEventListener("submit", (e) => {
  //     e.preventDefault();
  //     fetch(scriptURL, { method: "POST", body: new FormData(form) })
  //       .then((response) => console.log("Success!", response))
  //       .catch((error) => console.error("Error!", error.message));
  //   });

  

  return <>
    <h1>{time + " " +geo}</h1>
    {time!==undefined ? console.log(time,geo): null}
    <h1>Platform and hostName : {os.platform()+":"+ os.hostname()}</h1>
  </>;
};

export default Geo;
