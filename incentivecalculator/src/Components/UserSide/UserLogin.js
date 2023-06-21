import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserLogin() {
  const [apiData, setApiData] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");
  const [renderAlert, setRenderAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8000/api/products").then((res) => {
      setApiData(res.data);
    });
  }, []);
  function handlesubmit() {
    const data = [...apiData];
    for (let index = 0; index < data.length; index++) {
      if (email === data[index].email && password === data[index].password) {
        localStorage.setItem("UserloginKey", index);
        navigate("/app/dashboard");
      } else if (email === "" && password === "") {
        setRenderAlert(true);
        setAlert("Enter Email and Password");
      } else if (
        email !== data[index].email ||
        password !== data[index].password
      ) {
        setRenderAlert(true);
        setAlert("wrong credentials");
      }
    }
  }

  return (
    <div>
      <section class="vh-100 gradient-custom">
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                class="card bg-dark text-white"
                style={{ borderRadius: "1rem" }}
              >
                <div class="card-body p-5 text-center">
                  <div class="mb-md-5 mt-md-4 pb-5">
                    <h2 class="fw-bold mb-2 text-uppercase">Sign In</h2>

                    <div class="form-outline form-white mb-4">
                      <label class="form-label" for="typeEmailX">
                        Email
                      </label>
                      <input
                        type="email"
                        id="typeEmailX"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        class="form-control form-control-lg"
                      />
                    </div>

                    <div class="form-outline form-white mb-4">
                      <label class="form-label" for="typePasswordX">
                        Password
                      </label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        id="typePasswordX"
                        class="form-control form-control-lg"
                      />
                    </div>
                    <br />
                    <button
                      class="btn btn-outline-light btn-lg px-5"
                      type="submit"
                      onClick={handlesubmit}
                    >
                      Login
                    </button>
                    <br />
                    <br />
                    {renderAlert === true ? (
                      <div class="alert alert-danger" role="alert">
                        <b> {alert}</b>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default UserLogin;