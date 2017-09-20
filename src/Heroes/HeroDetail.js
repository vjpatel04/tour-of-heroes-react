import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loader from '../common/Loader';

class HeroDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hero: {
                name: ''
            }
        };

    }

    handleChange = (e) => {
        let newName = e.target.value.trim();
        const updatedHeroDetails = {...this.state.hero, name: newName}
        this.setState({
            hero: updatedHeroDetails
        });
    }

    goBack = () => {
        this.props.history.goBack();
    }

    handleSave = () => {
        this.props.actions.changeName(this.state.hero);
        this.goBack();
    }

    componentDidMount() {
        const filteredHero = this.props.heroes.filter((hero) => hero.id == this.props.match.params.heroId);
        if (filteredHero && filteredHero.length > 0) {
            const hero = Object.assign({}, filteredHero[0]);
            this.setState({ hero });
        }
    }
    

    render() {
        if(!this.props.heroes || this.props.heroes.length === 0){
            return <Loader />
        }

        return (
            <div>
                <div className='form-group'>
                    <label htmlFor='heroName'>Hero Name</label>
                    <input type='text' className='form-control' id='heroName' value={this.state.hero.name} onChange={this.handleChange} />
                </div>
                <input type='button' className='btn btn-success' value='Save' onClick={this.handleSave} />
                <input type='button' className='btn btn-default' value='Go Back' onClick={this.goBack} />
            </div>
        );
    }
}

HeroDetail.propTypes = {

};

export default HeroDetail;