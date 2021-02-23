import React from "react"
import Header from "./Header";
import Inventory from "./Inventory";
import Order from "./Order";
import sampleFishes from "../sample-fishes.js"
import Fish from "./Fish.js";

class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    }

    addFish = fish => {
        // Copy existing state
        const fishes = { ...this.state.fishes };
        fishes[`fish${Date.now()}`] = fish;
        this.setState({fishes});
    }

    loadSampleFishes = () => {
        this.setState({fishes:sampleFishes})
    }

    addToOrder = key => {
        // Copy existing state
        const order = { ...this.state.order };
        console.log(key);
        order[key] = order[key] + 1 || 1;
        this.setState({order});
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"></Header>
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(key => <Fish key={key} 
                        index={key}
                        details={this.state.fishes[key]} 
                        addToOrder={this.addToOrder}/>)}
                    </ul>
                </div>
                <Order></Order>
                <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes}></Inventory>
            </div>
        )
    }
}

export default App;