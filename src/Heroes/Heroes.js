import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import HeroesList from './HeroesList';
import HeroDetail from './HeroDetail';

const Heroes = props => {
    return (
        <div>
            <Route path={`${props.match.path}`} exact render={(routeProps) => <HeroesList heroes={props.heroes} {...routeProps} />} />
            <Route path={`${props.match.path}/:heroId`} component={(routeProps) => <HeroDetail heroes={props.heroes} actions={props.actions} {...routeProps} />} />
        </div>
    );
};

Heroes.propTypes = {
    
};

export default Heroes;