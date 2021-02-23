import React from "react"
import Header from "./Header";
import Inventory from "./Inventory";
import Order from "./Order";
import sampleFishes from "../sample-fishes.js"

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

    render() {
        return (
            <div className="catch-of-the-day">
                <Header tagline="Fresh Seafood Market"></Header>
                <Order></Order>
                <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes}></Inventory>
            </div>
        )
    }
}

export default App;