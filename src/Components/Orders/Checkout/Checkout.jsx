import React, { Component } from "react";
import { Button, Modal, ModalBody } from "reactstrap";
import { connect } from "react-redux";
import axios from "axios";
import Spinner from "../../Spinner/Spinner";
import {resetIngredients} from '../../../redux/actionCreators';

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    purchasable: state.purchasable,
    userId: state.userId,
    token: state.token
  };
};

const mapDispatchToProps = dispatch => {
    return {
        resetIngredients: () => dispatch(resetIngredients())
    }
}

class Checkout extends Component {
  state = {
    values: {
      deliveryAddress: "",
      phone: "",
      paymentType: "Cash On Delivery",
    },
    isLoading: false,
    isModalOpen: false,
    modalMessage: "",
  };

  goBack = () => {
    this.props.history.goBack("/");
  };

  inputChangeHandler = (e) => {
    this.setState({
      values: {
        ...this.state.values,
        [e.target.name]: e.target.value,
      },
    });
  };

  submitHandler = () => {
    this.setState({
      isLoading: true,
    });
    const order = {
      ingredients: this.props.ingredients,
      customer: this.state.values,
      price: this.props.totalPrice,
      orderTime: new Date(),
      userId: this.props.userId
    };
    axios
      .post("https://burger-builder-d5eaa.firebaseio.com/orders.json?auth=" + this.props.token, order)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            isLoading: false,
            isModalOpen: true,
            modalMessage: "Your Order has been placed successfully!",
          });
          this.props.resetIngredients();
        } else {
          this.setState({
            isLoading: false,
            isModalOpen: true,
            modalMessage: "Something went wrong. Please try again later.",
          });
        }
      })
      .catch((err) => {
        this.setState({
          isLoading: false,
          isModalOpen: true,
          modalMessage: "Something went wrong. Please try again later.",
        });
      });
  };

  render() {
    let form = (
      <div>
        <div className="alert alert-primary" role="alert">
          <h4 className="text-dark">
            You have to pay {this.props.totalPrice} BDT
          </h4>
        </div>
        <form
          style={{
            boxShadow: "2px 2px 15px #888888",
            borderRadius: "5px",
            padding: "20px",
          }}
        >
          <textarea
            name="deliveryAddress"
            value={this.state.values.deliveryAddress}
            className="form-control"
            placeholder="Your Address"
            onChange={(e) => this.inputChangeHandler(e)}
          ></textarea>
          <br />
          <input
            name="phone"
            className="form-control"
            value={this.state.values.phone}
            placeholder="Your Phone Number"
            onChange={(e) => this.inputChangeHandler(e)}
          />
          <br />
          <select
            name="paymentType"
            className="form-control"
            value={this.state.values.paymentType}
            onChange={(e) => this.inputChangeHandler(e)}
          >
            <option value="Cash On Delivery">Cash On Delivery</option>
            <option value="bKash">bKash</option>
          </select>
          <br />
          <Button
            style={{ backgroundColor: "#D70F64", border: "0px" }}
            className="mr-auto"
            onClick={this.submitHandler}
            disabled={!this.props.purchasable}
          >
            Place Order
          </Button>
          <Button color="secondary" className="ml-1" onClick={this.goBack}>
            Cancel
          </Button>
        </form>
      </div>
    );
    return (
      <div>
        {this.state.isLoading ? <Spinner /> : form}
        <Modal isOpen={this.state.isModalOpen} onClick={this.goBack}>
          <ModalBody>
            <p>{this.state.modalMessage}</p>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);


/* import React, { Component } from "react";
import { Modal, ModalBody } from "reactstrap";
import { connect } from "react-redux";
import axios from "axios";
import Spinner from "../../Spinner/Spinner";
import { resetIngredients } from "../../../redux/actionCreators";
import { Formik } from "formik";

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    purchasable: state.purchasable,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetIngredients: () => dispatch(resetIngredients()),
  };
};

class Checkout extends Component {
  state = {
    values: {
      deliveryAddress: "",
      phone: "",
      paymentType: "Cash On Delivery",
    },
    isLoading: false,
    isModalOpen: false,
    modalMessage: "",
  };

  goBack = () => {
    this.props.history.goBack("/");
  };

  inputChangeHandler = (e) => {
    this.setState({
      values: {
        ...this.state.values,
        [e.target.name]: e.target.value,
      },
    });
  };

  submitHandler = () => {
    this.setState({
      isLoading: true,
    });
    const order = {
      ingredients: this.props.ingredients,
      customer: this.state.values,
      price: this.props.totalPrice,
      orderTime: new Date(),
    };
    axios
      .post("https://burger-builder-d5eaa.firebaseio.com/orders.json", order)
      .then((response) => {
 if (response.status === 200) {
          this.setState({
            isLoading: false,
            isModalOpen: true,
            modalMessage: "Your Order has been placed successfully!",
          }       );
          this.props.resetIngredients();
        } else {
          this.setState({
            isLoading: false,
            isModalOpen: true,
            modalMessage: "Something went wrong. Please try again later.",
          });
        }
      })
      .catch((err) => {
        this.setState({
          isLoading: false,
          isModalOpen: true,
          modalMessage: "Something went wrong. Please try again later.",
        });
      });
  };

  render() {
    let form = (
      <div className="my-3">
        <div className="alert alert-primary" role="alert">
          <h4 className="text-dark">
            You have to pay {this.props.totalPrice} BDT
          </h4>
        </div>
      </div>
    );
    return (
      
      <div>
        <Formik initialValues={
            {
                phone: "",
                deliveryAddress: "",
                paymentType: ""
            }
        }
        onSubmit = {
            (values) => {

            //console.log(values)
        }
    }>
        {({values, handleChange, handleSubmit}) => (
            <div>
                  <form onSubmit={handleSubmit}>
                    <input 
                    name="phone"
                    placeholder="Your Phone Number"
                    value={values.phone}
                    onChange={handleChange}
                    className="form-control"
                    />
                    <br/>
                    <textarea 
                    name="deliveryAddress"
                    placeholder="Your Address"
                    value={values.deliveryAddress}
                    onChange={handleChange}
                    className="form-control"
                    />
                    <br/>
                    <select 
                    name="paymentType"
                    value={values.paymentType}
                    onChange={handleChange}
                    className="form-control"
                    >
                      <option value="bKash">bKash</option>
                      <option value="cash On Delivery">Cash On Delivery</option>
                    </select>
                    <br/>
                    <button 
                    type="submit"
                    onClick={this.submitHandler}
                    disabled={!this.props.purchasable}
                    className="btn btn-success">
                        Place Order
                    </button>
                    <button 
                    type="submit"
                    className="ml-1 btn btn-secondary" 
                    onClick={this.goBack}>
                        Cancel
                    </button>
                    </form>
            </div>
        )}
          
        </Formik>
        {this.state.isLoading ? <Spinner /> : form}
        <Modal isOpen={this.state.isModalOpen} onClick={this.goBack}>
          <ModalBody>
            <p>{this.state.modalMessage}</p>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
 */