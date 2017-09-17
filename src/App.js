import React, { Component } from 'react';
import { Route } from 'react-router-dom'; 
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as HeroActions from './actions/heroActions';
import './App.css';
import Header from './common/Header';
import Dashboard from './Dashboard/Dashboard';
import Heroes from './Heroes/Heroes';

class App extends Component {

  componentDidMount() {
    this.props.actions.getHeroes();
  }
  

  render() {
    return (
      <div className='container-fluid'>
        <Header />
        <main>
          <Route path='/' exact render={(props) => <Dashboard heroes={this.props.heroes} {...props} />} />
          <Route path='/heroes' render={(props) => <Heroes heroes={this.props.heroes} actions={this.props.actions} {...props} />} />
        </main>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    heroes: state.heroAppState
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(HeroActions, dispatch)
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));
