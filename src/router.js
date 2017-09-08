import React from 'react'
import { Switch, Route } from 'react-router-dom'

/* 
 * This is the router file. Import this into the App.jsx file for it to be used.
 * Also import all pages into this file to enable routing. 
 * To pass in props to a component, don't immediately close the <Route />. Instead put your
 * other component as follows: <Route > {Component with props} </Route >
 */

import Login from './components/Login'
import Landing from './components/Landing'
import Memories from './components/Memories'
import ViewMemory from './components/ViewMemory'
import UploadImage from './components/UploadImage'
import UploadMemory from './components/UploadMemory'
import Success from './components/Success'
import Failure from './components/Failure'

export default (

    <Switch>
        
        <Route path="/" exact component={Login} />
        <Route path="/home" component={Landing} />
        <Route path="/memories" component={Memories} />
        <Route path="/view-memory" component={ViewMemory} />
        <Route path="/upload" component={UploadImage} />
        <Route path="/upload-2" component={UploadMemory} />
        <Route path="/success" component={Success} />
        <Route path="/failure" component={Failure} />
        
    </Switch>

)