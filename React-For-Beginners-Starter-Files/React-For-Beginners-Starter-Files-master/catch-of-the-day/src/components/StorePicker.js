import React from "react";
import PropTypes from "prop-types";

class StorePicker extends React.Component {
    static propTypes = {
        history: PropTypes.object
    }
    storeInput = React.createRef();

    goToStore = event => {
        event.preventDefault();
        console.log("Go to store");
        const store = this.storeInput.current.value;
        this.props.history.push(`store/${store}`)
    };

    render() {
        return (
            <form className="store-selector" onSubmit={this.goToStore}>
                <h2>Enter a Store</h2>
                <input placeholder="Store Name..." 
                        ref={this.storeInput}
                        type="text"
                        required></input>
                <button type="submit">VISIT STORE ➡</button>
            </form>
        );
    }
}

export default StorePicker;