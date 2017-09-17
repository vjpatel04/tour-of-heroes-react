import React from 'react';
import PropTypes from 'prop-types';
import NavigationLink from './NavigationLink';

const Header = props => {
    return (
        <div>
            <div className='page-header'>
                <h1>Tour of Heroes</h1>
            </div>
            <ul className='nav nav-pills'>
                <NavigationLink to='/' exact label='DashBoard' />
                <NavigationLink to='/heroes' exact label='Heroes' />
            </ul>
        </div>
    );
};

Header.propTypes = {

};

export default Header;