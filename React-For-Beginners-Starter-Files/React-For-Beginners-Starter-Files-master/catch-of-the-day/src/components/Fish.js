import React from "react";
import propTypes from "prop-types";
import { formatPrice } from "../helpers.js";

class Fish extends React.Component {
    static propTypes = {
        addToOrder: propTypes.func,
        index: propTypes.string,
        details: propTypes.shape({
            image: propTypes.string,
            name: propTypes.string,
            price: propTypes.number,
            desc: propTypes.string,
            status: propTypes.string
        })
    }
    handleClick = () => {
        this.props.addToOrder(this.props.index);
    }

    render() {
        const {image, name, price, desc, status} = this.props.details;
        const isAvailable = status === "available";
        return (
            <li className="menu-fish">
                <img src={image} alt={name}/>
                <h3 className="fish-name">
                    {name}
                    <span className="price">{formatPrice(price)}</span>
                </h3>
                <p>{desc}</p>
                <button onClick={this.handleClick} disabled={!isAvailable}>{isAvailable ? "Add To Order": "Sold Out"}</button>
            </li>
        )
    }
}

export default Fish;