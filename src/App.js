import './App.css';
import React, { Component, Fragment } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {handleInitialData} from './actions/common';
import {connect} from 'react-redux';
import Login from './components/Login';
import Nav from './components/Nav';
import Home from './components/Home';
import NewPoll from './components/NewPoll';
import UserInfo from './components/UserInfo';
import Error from './components/Error';
import Leaderboard from './components/Leaderboard';

class App extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }

  render() {
    const {authUser} = this.props;
    return (
      <Router>
        <div className='app'>
          {/* If there is no authentication then render Login page */}
          {authUser === null ? (
            <Route 
              render={() => (
                <Login />
              )}
            />
            ) : (
              <Fragment>
                <Nav />
                <Route exact path="/" component={Home} />
                <Route path="/questions/:question_id" component={UserInfo} />                  
                <Route path="/add" component={NewPoll} />
                <Route path="/leaderboard" component={Leaderboard} />
                <Route path="/questions/error" component={Error} />
              </Fragment>
            )
          }
        </div>
      </Router>
    );
  }
}

function mapStateToProps({authUser}) {
  return {authUser};
}

export default connect(
  mapStateToProps, {handleInitialData}
)(App);
