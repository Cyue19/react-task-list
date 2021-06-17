import React, { Component } from 'react'

import Firebase from "../firebase/firebase";

export default class Login extends Component {

    constructor(props) {
        super(props)
        this.db = Firebase.getInstance().db;
        this.auth = Firebase.getInstance().auth;

        this.state = {
            email: "",
            password: ""
        }
    }

    onEmailChanged(e) {
        this.setState({
            email: e.target.value
        })
    }

    onPasswordChanged(e) {
        this.setState({
            password: e.target.value
        })
    }

    async login() {
        try {
            await this.auth.signInWithEmailAndPassword(this.state.email, this.state.password);
        } catch(err) {
            console.log(err);
        }
    }

    render() {
        return (
            <div>
                <div style={{width: "50%"}}className="card container mt-5">
                    <div className="card-body">
                        <form>
                            <h2 className="text-center">Sign In</h2>
                            <div className="mb-3">
                                <label className="form-label">Email address</label>
                                <input onChange={(e) => this.onEmailChanged(e)} type="email" className="form-control" aria-describedby="emailHelp"/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input onChange={(e) => this.onPasswordChanged(e)} type="password" className="form-control"/>
                            </div>
                            <div className="text-center">
                                <button onClick={() => this.login()} type="button" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
