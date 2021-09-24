import React from 'react';
import { Route, Switch } from 'react-router';
import Dashboard from '../../containers/Admin/AdminDashboard';
import Reviews from './reviews';
import Sellers from './sellers';

const Admin = () => {
    return (
            <Dashboard></Dashboard>
            
    );
}

export default Admin;
