import React from "react"
import Header from "./Header";
import Inventory from "./Inventory";
import Order from "./Order";
import sampleFishes from "../sample-fishes.js"
import Fish from "./Fish.js";
import base from "../base.js";
import PropTypes from "prop-types";

class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    }

    static propTypes = {
        match: PropTypes.object
    }

    componentDidMount() {
        const { params } = this.props.match;
        const localStorageRef = localStorage.getItem(params.storeId);

        if (localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) });
        }
        
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: "fishes"
        });
        
    }

    componentDidUpdate() {
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    addFish = fish => {
        // Copy existing state
        const fishes = { ...this.state.fishes };
        fishes[`fish${Date.now()}`] = fish;
        this.setState({fishes});
    }

    updateFish = (key, updatedFish) => {
        const fishes = { ...this.state.fishes };
        fishes[key] = updatedFish;
        this.setState({ fishes });
    }

    deleteFish = key => {
        const fishes = { ...this.state.fishes };
        fishes[key] = null;
        this.setState({ fishes });
    }

    loadSampleFishes = () => {
        this.setState({fishes:sampleFishes})
    }

    addToOrder = key => {
        // Copy existing state
        const order = { ...this.state.order };
        order[key] = order[key] + 1 || 1;
        this.setState({ order });
    }

    removeFromOrder = key => {
        const order = { ...this.state.order };
        order[key] = order[key] - 1 || null;
        this.setState({ order });
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"></Header>
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(key => 
                        <Fish 
                            key={key} 
                            index={key}
                            details={this.state.fishes[key]} 
                            addToOrder={this.addToOrder} />)}
                    </ul>
                </div>
                <Order 
                    fishes={this.state.fishes} 
                    order={this.state.order} 
                    removeFromOrder={this.removeFromOrder}></Order>
                <Inventory
                    fishes={this.state.fishes}
                    addFish={this.addFish} 
                    updateFish={this.updateFish}
                    loadSampleFishes={this.loadSampleFishes}
                    deleteFish={this.deleteFish}
                    storeId={this.props.match.params.storeId}></Inventory>
            </div>
        )
    }
}

Header.propTypes = {
    tagline: PropTypes.string.isRequired
};

export default App;