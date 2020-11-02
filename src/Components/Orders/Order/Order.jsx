import React from 'react';


const Order = props => {
    const ingredientSummary = props.order.ingredients.map(item => {
        if(item.amount === 0){
            return(
                <div key={Math.random()}></div>
            )
        } else{
            return (
                <span className="badge badge-success mr-2 py-1 px-2 text-capitalize" key={Math.random()}>{item.amount} X {item.type}</span>
            ) 
        }

    })
    return (
        <div style={{border: "0px solid grey", boxShadow:"1px 1px 15px #888888", borderRadius: "5px", padding: "20px", marginBottom: "10px"}}>
            <p><b>Order Number:</b> {props.order.id}</p>
            <p><b>Delivery Address:</b> {props.order.customer.deliveryAddress}</p>
            <p><b>Mobile Number:</b> {props.order.customer.phone}</p>
            <p><b>Order Time:</b> {props.order.ingredients.orderTime}</p>            
            <hr/>
            {ingredientSummary}
            <hr/>
            <br/>
            <p className="pt-2"><b>Total:</b> {props.order.price} BDT</p>
        </div>
    );
}

export default Order;

