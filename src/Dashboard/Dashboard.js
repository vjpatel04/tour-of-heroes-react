import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import TopHeroes from './TopHeroes';

const Dashboard = props => {
    return (
        <div>
            <Route path={`${props.match.path}`} exact render={(routeProps) => <TopHeroes heroes={props.heroes} showLoader={props.showLoader} {...routeProps} />} />
        </div>
    );
};

Dashboard.propTypes = {
    
};

export default Dashboard;