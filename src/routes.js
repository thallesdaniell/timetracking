import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import NotFound from './pages/NotFound';

import { isAuthenticated } from './services/auth';


function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated() ?
                    <Component {...props} />
                    :
                    <Redirect to="/login" />
            }
        />
    );
}

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={() => isAuthenticated() ? <Dashboard /> : <Login />} />
                <PrivateRoute path="/dashboard" exact component={Dashboard} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/reset" component={ResetPassword} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
}