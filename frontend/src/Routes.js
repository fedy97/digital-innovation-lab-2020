import React from 'react';
import {Switch, Route, Router} from 'react-router-dom';
import Homepage from "./views/Homepage";
import SearchPage from "./views/Search";
import AnalysisPage from "./views/Analysis";
import DashboardsPage from "./views/Dashboards";

// import {createHashHistory} from "history";
//
// const hashHistory = createHashHistory();

class Routes extends React.Component {

    render() {
        return (
            <Switch>
                <Route exact path="/" component={Homepage}/>
                <Route path="/search/" component={SearchPage}/>
                <Route path="/analysis" component={AnalysisPage}/>
                <Route path="/dashboards" component={DashboardsPage}/>
            </Switch>
        )
    }
}

export default Routes;