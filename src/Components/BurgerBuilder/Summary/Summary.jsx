import React from 'react';

const Summary = props => {
    let ingredientSummary = props.ingredients.map(item => {
        return (
            <li key={Math.random()}>
                <span className="text-capitalize">{item.type}</span>: {item.amount}
            </li>
        )
    })
    return(
        <div>
            <ul>
                {ingredientSummary}
            </ul>
        </div>
    )
}
export default Summary;