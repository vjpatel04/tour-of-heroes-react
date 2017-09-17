import React from 'react';
import PropTypes from 'prop-types';

import Loader from '../common/Loader';
import './TopHeroes.css';

const TopHeroes = props => {

    if(!props.heroes || props.heroes.length === 0){
        return <Loader />
    }

    const selectHero = (heroId) => {
        props.history.push(`heroes/${heroId}`);
    }

    const topHeroes = props.heroes.filter((hero) => {
        return hero.id % 2 === 0;
    }).map((topHero) => {
        return (
            <div className='panel panel-default col-sm-2' key={topHero.id} onClick={() => selectHero(topHero.id)}>
                <div className='panel-body'>
                    {topHero.name}
                </div>
            </div>
        )
    })

    const topHeroesPanel = topHeroes

    return (
        <div>
            <div className='page-header text-center'>
                <h3>My Top Heroes</h3>
                <div className='row text-center'>
                {topHeroes}
                </div>
            </div>
        </div>
    );
};

TopHeroes.propTypes = {

};

export default TopHeroes;