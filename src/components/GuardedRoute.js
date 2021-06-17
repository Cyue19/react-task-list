import React, { Component } from 'react';

import { Route, Redirect } from 'react-router-dom';

export default class GuardedRoute extends Component {
    render() {
        const { component: Component, redirect, ...rest } = this.props;
        const auth = this.props.auth;
        console.log({...rest});

        return(
            <Route {...rest} render={(props) => {
                if (auth) {
                    return <Component {...{...props, ...rest}}/>
                } else {
                    console.log("redirect");
                    return <Redirect to={redirect} />
                }
            }}/>

        )
    }
  }










    //   const { component: Component, user, ...rest } = this.props;
  
    //   return (
    //     <Route {...rest} render={(props) => {
    //       if (user) {
    //         return <Component {...{ ...props, ...rest.props }} />
    //       } else {
    //         return <Redirect to="/login" />
    //       }
    //     }} />
    //   )
