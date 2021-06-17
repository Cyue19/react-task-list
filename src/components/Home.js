import React, { Component } from 'react';
import Firebase from "../firebase/firebase";

const auth = Firebase.getInstance().auth;

export default class Home extends Component {

    async logOut() {
        await auth.signOut();
    }

    render() {
        return (
            <div>
                Home
                <button onClick={() => this.logOut()} type="button">Log Out</button>
            </div>
        )
    }
}
