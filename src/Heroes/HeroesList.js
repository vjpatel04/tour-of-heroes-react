import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../common/Loader';

const HeroesList = props => {

    if(props.showLoader){
        return <Loader />
    }

    const goBack = () => {
        props.history.push('/');
    }

    const selectHero = (heroId) => {
        props.history.push(`${props.match.path}/${heroId}`);
    }

    const handleAdd = (e) => {
        e.preventDefault();
        let newId = generateId();
        let newName = e.target.heroAdd.value.trim();
        props.actions.addHero({id:newId, name: newName});
        e.target.heroAdd.value = '';
        e.target.heroAddBtn.blur();
    }

    const generateId = () => {
        let largestId = Math.max(...props.heroes.map( hero => hero.id));
        return largestId+1;
    }

    const deleteHero = (e, heroId) => {
        e.stopPropagation();
        props.actions.deleteHero({ id: heroId });
    } 

    const heroList = props.heroes.map((hero, index) => {
        return (
            <li key={hero.id} className='list-group-item' onClick={() => selectHero(hero.id)}>
                <span className='badge pull-left'>{index + 1}</span>
                <span style={{ marginLeft: 7 }}>{hero.name}</span>
                <span className='glyphicon glyphicon-trash pull-right' onClick={(e) => deleteHero(e, hero.id)} ></span>
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
                <input  name='heroAdd' type='text' className='form-control' id='addHero' />
                <input  name='heroAddBtn' type='submit' className='btn btn-success' value='Save' />
            </form>
            <ul className='list-group'>
                {heroList}
            </ul>
            <input type='button' className='btn btn-default' value='Go Back' onClick={goBack} />
        </div>
    );
};

export default HeroesList;