import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../common/Loader';

const HeroesList = props => {

    if(!props.heroes || props.heroes.length === 0){
        return <Loader />
    }

    const goBack = () => {
        props.history.push('/');
    }

    const selectHero = (heroId) => {
        props.history.push(`${props.match.path}/${heroId}`);
    }

    const heroList = props.heroes.map((hero, index) => {
        return (
            <li key={hero.id} className='list-group-item' onClick={() => selectHero(hero.id)}>
                <span className='badge pull-left'>{index + 1}</span>
                <span style={{marginLeft: 7}}>{hero.name}</span>
            </li>
        );
    });

    return (
        <div>
            <div className='page-header text-center'>
                <h3>My Heroes List</h3>
            </div>
            <ul className='list-group'>
                {heroList}
            </ul>
            <input type='button' className='btn btn-default' value='Go Back' onClick={goBack} />
        </div>
    );
};

export default HeroesList;