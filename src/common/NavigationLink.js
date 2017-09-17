import React from 'react';
import PropTypes from 'prop-types';
import { Route, NavLink } from 'react-router-dom';

const NavigationLink = props => {
    return (
        <Route path={props.to} exact={props.exact} children={({ match }) => {
            return (<li className={match ? 'active' : ''}>
                <NavLink to={props.to} exact={props.exact}>
                    {props.label}
                </NavLink>
            </li>);
        }}>
        </Route>
    );
};

NavigationLink.propTypes = {

};

export default NavigationLink;