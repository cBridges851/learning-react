import React from "react";
import AddFishForm from "./AddFishForm.js";

class Inventory extends React.Component {
    render() {
        console.log(this.props);
        return (
            <div className="inventory">
                <h2>Inventory</h2>
                <AddFishForm addFish={this.props.addFish}></AddFishForm>
            </div>
        )
    }
}


export default Inventory;