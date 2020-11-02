import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchOrders } from "../../redux/actionCreators";
import Order from "./Order/Order";
import Spinner from "../Spinner/Spinner";

const mapStateToProps = (state) => {
  return {
    orders: state.orders,
    orderLoading: state.orderLoading,
    orderErr: state.orderErr,
    token: state.token,
    userId: state.userId
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: (token, userId) => dispatch(fetchOrders(token, userId)),
  };
};
//We use dispatch function inside a dispatch function because we use redux thunk

class Orders extends Component {
  componentDidMount() {
    this.props.fetchOrders(this.props.token, this.props.userId);
  }
//   componentDidUpdate() {
//     this.props.fetchOrders();
//   }

  render() {
    let orders = null;
    if (this.props.orderErr) {
      orders = (
        <p className="alert alert-danger" role="alert">
          Sorry, Failed to load orders
        </p>
      );
    } else {
      if (this.props.orders.length === 0) {
        orders = (
          <p className="alert alert-danger" role="alert">
            You have no orders
          </p>
        );
      } else {
        orders = this.props.orders.map((order) => {
          return <Order order={order} key={order.id} />;
        });
      }
    }

    return <div>{this.props.orderLoading ? <Spinner /> : orders}</div>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
