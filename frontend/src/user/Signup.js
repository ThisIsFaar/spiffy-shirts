import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";
import { Subbutton, Divone, Inputdiv, RootD } from "./elements/signin";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(console.log("error in signup"));
  };

  const signUpForm = () => {
    return (
      <RootD>
        <Divone className="Lpanel">
          New to <span>SPIFFY ?</span> Sign up now and explore new trendy shirts
          here.<div>HAPPY SHOPPING FOLKS!</div>
          <br />
        </Divone>
        <div className="Lpanel text-left">
          <form>
            <Inputdiv className="form-group">
              <label className="text-light">Name</label>&nbsp;&nbsp;
              <i class="fas fa-user-alt"></i>
              <input
                className="form-control"
                onChange={handleChange("name")}
                type="text"
                value={name}
              />
            </Inputdiv>
            <Inputdiv className="form-group">
              <label className="text-light">Email</label>&nbsp;&nbsp;
              <i class="fas fa-at"></i>
              <input
                className="form-control"
                onChange={handleChange("email")}
                type="text"
                value={email}
              />
            </Inputdiv>
            <Inputdiv className="form-group">
              <label className="text-light">Password</label>&nbsp;&nbsp;
              <i class="fas fa-key"></i>
              <input
                className="form-control"
                onChange={handleChange("password")}
                type="password"
                value={password}
              />
            </Inputdiv>
            <Subbutton onClick={onSubmit} className="btn btn-success btn-block">
              Submit <i class="fab fa-telegram-plane"></i>
            </Subbutton>
          </form>
        </div>
      </RootD>
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New account was created successfully . please {""}{" "}
            <Link to="/signin">Login Here</Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign up to SPIFFY!" description="">
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
      <p className="text-white text-center">{/*JSON.stringify(values)*/}</p>
    </Base>
  );
};

export default Signup;
