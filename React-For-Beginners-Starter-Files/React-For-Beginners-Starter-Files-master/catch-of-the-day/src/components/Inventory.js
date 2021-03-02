import React from "react";
import AddFishForm from "./AddFishForm.js";
import EditFishForm from "./EditFishForm.js";

class Inventory extends React.Component {
    render() {
        return (
            <div className="inventory">
                <h2>Inventory</h2>
                {Object.keys(this.props.fishes).map(key => (
                    <EditFishForm 
                        key={key} 
                        index={key}
                        fish={this.props.fishes[key]}
                        updateFish={this.props.updateFish}/>
                ))}
                <AddFishForm addFish={this.props.addFish}></AddFishForm>
                <button onClick={this.props.loadSampleFishes}>LOAD SAMPLE FISHES</button>
            </div>
        )
    }
}


export default Inventory;