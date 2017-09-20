import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../common/Loader';

const HeroesList = props => {

    if (!props.heroes || props.heroes.length === 0) {
        return <Loader />
    }

    let addNameInput = null;

    const goBack = () => {
        props.history.push('/');
    }

    const selectHero = (heroId) => {
        props.history.push(`${props.match.path}/${heroId}`);
    }

    const handleAdd = (e) => {
        e.preventDefault();

        console.log(e.target.heroAdd.value);
    }

    const heroList = props.heroes.map((hero, index) => {
        return (
            <li key={hero.id} className='list-group-item' onClick={() => selectHero(hero.id)}>
                <span className='badge pull-left'>{index + 1}</span>
                <span style={{ marginLeft: 7 }}>{hero.name}</span>
            </li>
        );
    });

    return (
        <div>
            <div className='page-header text-center'>
                <h3>My Heroes List</h3>
            </div>
            <form className='form-group' onSubmit={handleAdd}>
                <label htmlFor='addHero'>Add Hero</label>
                <input  name='heroAdd' type='text' className='form-control' id='addHero' ref={(addName) => addNameInput = addName} />
                <input type='submit' className='btn btn-default' value='Save' />
            </form>
            <ul className='list-group'>
                {heroList}
            </ul>
            <input type='button' className='btn btn-default' value='Go Back' onClick={goBack} />
        </div>
    );
};

export default HeroesList;