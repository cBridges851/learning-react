import React from "react";

const StorePicker = () => (
    <React.Fragment>
        <form className="store-selector">
        <h2>Enter a Store</h2>
        <input placeholder="Store Name..." 
                type="text"
                required></input>
        <button type="submit">VISIT STORE ➡</button>
        </form>
    </React.Fragment>
);

export default StorePicker