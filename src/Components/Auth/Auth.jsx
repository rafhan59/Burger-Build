import React, { Component } from "react";
import { Formik } from "formik";
import { auth } from "../../redux/authActionCreators";
import {connect} from 'react-redux';
import Spinner from '../Spinner/Spinner';
import { Alert} from 'reactstrap';


const mapDispatchToProps = (dispatch) => {
    return {
        auth: (email,password, mode) => dispatch(auth(email,password, mode))
    }

}

const mapStateToProps = state => {
    return {
        authLoading: state.authLoading,
        authFailedMsg: state.authFailedMsg
    }
}

class Auth extends Component {
  state = {
    mode: "Sign Up",
  };

  switchModeHandler = () => {
    this.setState({
      mode: this.state.mode === "Sign Up" ? "Log In" : "Sign Up",
    });
  };

  render() {
    let err = null;

    if(this.props.authFailedMsg !== null){
        err = <Alert color="danger">{this.props.authFailedMsg}</Alert>
    }

    let form = null;

    if(this.props.authLoading){
        form = <Spinner />
    } else {
        form = (
            <Formik
          initialValues={{
            email: "",
            password: "",
            passwordConfirm: "",
          }}
          onSubmit={(values) => {
            this.props.auth(values.email, values.password, this.state.mode)
          }}
          validate={(values) => {
            const errors = {};

            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(values.email)
            ) {
              errors.email = "Invalid E-mail Address!";
            }
            if (!values.password) {
              errors.password = "Required";
            } else if (values.password.length < 8) {
              errors.password = "Must be atleast 8 characters";
            }

            if (this.state.mode === "Sign Up") {
              if (!values.passwordConfirm) {
                errors.passwordConfirm = "Required";
              } else if (values.password !== values.passwordConfirm) {
                errors.passwordConfirm = "Password field doesn't match";
              }
            }

            //console.log(errors)
            return errors;
          }}
        >
          {({ values, handleChange, handleSubmit, errors }) => (
            <div
              style={{
                border: "1px solid grey",
                padding: "15px",
                borderRadius: "7px",
              }}
            >
              <button
                className="btn btn-pink text-white btn-block"
                onClick={this.switchModeHandler}
              >
                Switch to {this.state.mode === "Sign Up" ? "Log In" : "Sign Up"}
              </button>
              <br />
              <form onSubmit={handleSubmit}>
                <input
                  name="email"
                  placeholder="Enter Your E-mail"
                  className="form-control"
                  value={values.email}
                  onChange={handleChange}
                />
                <span
                  style={{
                    width: "100%",
                    marginTop: ".25rem",
                    fontSize: ".875em",
                    color: "#dc3545",
                  }}
                >
                  {errors.email}
                </span>
                <br />
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="form-control"
                  value={values.password}
                  onChange={handleChange}
                />
                <span
                  style={{
                    width: "100%",
                    marginTop: ".25rem",
                    fontSize: ".875em",
                    color: "#dc3545",
                  }}
                >
                  {errors.password}
                </span>
                <br />
                {this.state.mode === "Sign Up" ? (
                  <div>
                    <input
                      name="passwordConfirm"
                      type="password"
                      placeholder="Confirm Password"
                      className="form-control"
                      value={values.passwordConfirm}
                      onChange={handleChange}
                    />
                    <span
                      style={{
                        width: "100%",
                        marginTop: ".25rem",
                        fontSize: ".875em",
                        color: "#dc3545",
                      }}
                    >
                      {errors.passwordConfirm}
                    </span>
                    <br />
                  </div>
                ) : null}

                <button type="submit" className="btn btn-success mt-2">
                  {this.state.mode === "Sign Up" ? "Sign Up" : "Log In"}
                </button>
              </form>
            </div>
          )}
        </Formik>
        )
    }
    return (
      <div>
          {err}
         {form}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

/* 
.invalid-feedback
    {
    
}
*/

/* import React, { Component } from 'react';
import { Formik } from 'formik';

class Auth extends Component {
    render() {
        return (
            <div>
                <Formik
                    initialValues={
                        {
                            email: "",
                            password: "",
                            passwordConfirm: "",
                        }
                    }

                    onSubmit={
                        (values) => {
                            console.log(values);
                        }
                    }
                >
                    {({ values, handleChange, handleSubmit }) => (<div>
                        <form onSubmit={handleSubmit}>
                            <input
                                name="email"
                                placeholder="Enter Your Email"
                                className="form-control"
                                value={values.email}
                                onChange={handleChange}
                            />
                            <br />
                            <input
                                name="password"
                                placeholder="Password"
                                className="form-control"
                                value={values.password}
                                onChange={handleChange}
                            />
                            <br />
                            <input
                                name="passwordConfirm"
                                placeholder="Confirm Password"
                                className="form-control"
                                value={values.passwordConfirm}
                                onChange={handleChange}
                            />
                            <br />
                            <button type="submit" className="btn btn-success">Sign Up</button>
                        </form>
                    </div>)}
                </Formik>
            </div>
        )
    }
}



export default Auth;
 */
