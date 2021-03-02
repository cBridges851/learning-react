import React from "react";
import AddFishForm from "./AddFishForm.js";
import EditFishForm from "./EditFishForm.js";
import PropTypes from "prop-types";
import Login from "./Login.js";
import base, { firebaseApp } from "../base.js";
import firebase from "firebase"; 
import { auth } from "firebase";

class Inventory extends React.Component {
    static propTypes = {
        fishes: PropTypes.object,
        updateFish: PropTypes.func,
        deleteFish: PropTypes.func,
        addFish: PropTypes.func,
        loadSampleFishes: PropTypes.func
    }

    state = {
        uid: null,
        owner: null
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.authHandler({ user });
            }
        })
    }

    authHandler = async (authData) => {
        // Look up the current store in the Firebase database
        const store = await base.fetch(this.props.storeId, { context: this })
        console.log(store);
        // Claim it if we there is no owner 
        if (!store.owner) {
            await base.post(`${this.props.storeId}/owner`, {
                data: authData.user.uid
            });
        }
        // Set state of inventory component to reflect current user
        this.setState({
            // Who is currently logged in user
            uid: authData.user.uid,
            // Who is owner of the store
            owner: store.owner || authData.user.uid
        });
    }

    // New provider based on what the user wants to sign in with
    authenticate = (provider) => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        // Connect to auth portion of our firebase
        firebaseApp
        .auth()
        .signInWithPopup(authProvider)
        .then(this.authHandler); // Triggers the handling of the authentication when they come back
    };

    logout = async () => {
        await firebase.auth().signOut();
        this.setState({uid: null });
    }

    render() {
        const logout = <button onClick={this.logout}>Log Out</button>
        // Check if logged in
        // No currently logged in user
        if (!this.state.uid) {
            return <Login authenticate={this.authenticate}/>
        }

        // Check if the owner of the store
        // Not the owner
        if (this.state.uid !== this.state.owner) {
            return (
            <div>
                <p>Sorry, you are not the owner</p>
                { logout }
            </div>
            );
        }

        // Renders inventory otherwise
        return (
            <div className="inventory">
                <h2>Inventory</h2>
                {logout}
                {Object.keys(this.props.fishes).map(key => (
                    <EditFishForm 
                        key={key} 
                        index={key}
                        fish={this.props.fishes[key]}
                        updateFish={this.props.updateFish}
                        deleteFish={this.props.deleteFish}/>
                ))}
                <AddFishForm addFish={this.props.addFish}></AddFishForm>
                <button onClick={this.props.loadSampleFishes}>LOAD SAMPLE FISHES</button>
            </div>
        )
    }
}


export default Inventory;