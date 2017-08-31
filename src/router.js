import React from 'react'
import { Switch, Route } from 'react-router-dom'

/* 
 * This is the router file. Import this into the App.jsx file for it to be used.
 * Also import all pages into this file to enable routing. 
 * To pass in props to a component, don't immediately close the <Route />. Instead put your/
 * other component as follows: <Route > {Component with props} </Route>
 */

import Login from './components/Login'
import Landing from './components/Landing'

export default (

    <Switch>
        
        <Route path="/" exact component={Login} />
        <Route path="/home" component={Landing} />
        
    </Switch>

)