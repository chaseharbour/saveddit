import React from 'react';
import Welcome from './Welcome';
import Dashboard from './Dashbaord';
import { BrowserRouter as Router, Route} from "react-router-dom";

const AppRouter = () => {
    return (
        <Router>
            <div>
                <Route exact path ="/" component={Welcome} />
                <Route exact path ="/dashboard" component={Dashboard} />
            </div>
        </Router>
    )
}

export default AppRouter
