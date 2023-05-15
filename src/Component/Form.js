import React, { useState, useEffect } from "react";
import useGeoLocation from "../Hooks/useGeoLocation";

const Form = () => {
  const [IP, setIP] = useState();

  const location = useGeoLocation();

  const scriptURL =
    "https://script.google.com/macros/s/AKfycbwEptCCNw6hFnIPLkcerNNgFIC_mlQ0CtGkViOu7xci0nt7M5c_B8EhoSmtOMkBZ2HYeA/exec";
  const form = document.forms["submit-to-google-sheet"];

  const submit = (e) => {
    e.preventDefault();
    fetch(scriptURL, { method: "POST", body: new FormData(form) })
      .then((response) => console.log("Success!", response))
      .catch((error) => console.error("Error!", error.message));
  };

  const currentDate = new Date(Date.now());
  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1;
  let year = currentDate.getFullYear();
  day = day < 10 ? "0" + day : day;
  month = month < 10 ? "0" + month : month;
  let formattedDate = day + "/" + month + "/" + year;

  const getIp = async () => {
    try {
      const response = await fetch("https://api.ipify.org/?format=json");
      const data = await response.json();
      const ipAddress = data.ip;
      setIP(ipAddress);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getIp()
  
    return () => {
      
    }
  }, [])
  

//   getIp();



  return (
    <>
      <form name="submit-to-google-sheet" onSubmit={submit}>
        <input name="Date" type="text" placeholder="" value={formattedDate} />
        <input
          name="Time"
          type="text"
          placeholder=""
          value={currentDate.toLocaleTimeString()}
        />
        <input
          name="Location"
          type="text"
          value={
            location.loaded
              ? JSON.stringify(location.mapLink)
              : "Location data not available yet." + location.error.message
          }
        />
        <input name="IP" type="text" value={IP} />
        <input name="Agent" type="text" value={navigator.userAgent} />
        <input name="AgentData" type="text" value={JSON.stringify(navigator.userAgentData)} />
        <input name="ScreenSize" type="text" value={window.innerHeight+"x"+window.innerWidth} />

        <button type="submit">Send</button>
      </form>
      <h1>{}</h1>
      <h1>{JSON.stringify(navigator.clipboard.readText)}</h1>
    </>
  );
};

export default Form;
