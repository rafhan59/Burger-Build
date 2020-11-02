import React from 'react';
import './Ingredient.css';
import BreadTop from '../../../Assets/Images/top.png';
import BreadBottom from '../../../Assets/Images/bottom.png';
import Cheese from '../../../Assets/Images/cheese.png';
import Meat from '../../../Assets/Images/meat.png';
import Salad from '../../../Assets/Images/salad.png';

const Ingredient = props => {
    let ingredient = null;

    switch(props.type) {
        case 'bread-bottom':
            ingredient = <div><img src={BreadBottom} alt="Bottom Bread"/></div>
            break;
        case 'bread-top':
            ingredient = <div><img src={BreadTop} alt="Top Bread"/></div>
            break;
        case 'cheese':
            ingredient = <div><img src={Cheese} alt="Cheese"/></div>
            break;
        case 'meat':
            ingredient = <div><img src={Meat} alt="Cheese"/></div>
            break;
        case 'salad':
            ingredient = <div><img src={Salad} alt="Cheese"/></div>
            break;
        default:
            ingredient = null;
    }
    return (
        <div className="Ingredient">
            {ingredient}
        </div>
    )
}
export default Ingredient;