import React, { Component } from 'react';
import {Menu, Button, Image} from 'semantic-ui-react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {authUserRequest} from '../actions/authUser';

class Nav extends Component {
    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    handleLogout = e => {
        e.preventDefault();
        this.props.authUserRequest(null);
    };

    render() {
        const { activeItem } = this.state;
        const { authUser, getUsers } = this.props;

        return (
            <div className='nav'>
                <Menu pointing secondary>
                    <Menu.Item
                        name='home'
                        exact
                        as={NavLink} to="/"
                        active={activeItem === 'home'}
                        onClick={this.handleItemClick} />
                    <Menu.Item
                        name='new poll'
                        as={NavLink} 
                        to="/add"
                        active={activeItem === 'new_poll'}
                        onClick={this.handleItemClick} />
                    <Menu.Item
                        name='leader board' 
                        as={NavLink} 
                        to="/leaderboard"
                        active={activeItem === 'leader_board'}
                        onClick={this.handleItemClick} />
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Image
                                className='avatar-img'
                                src={getUsers[authUser].avatarURL}
                                avatar />
                            <span>{getUsers[authUser].name}</span>
                        </Menu.Item>
                        <Menu.Item>
                            <Button
                                content="Logout"
                                basic
                                compact
                                icon="log out"
                                size="mini"
                                onClick={this.handleLogout}
                            />
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            </div>
        );
    }
}

function mapStateToProps({ getUsers, authUser }) {
    return {
        authUser,
        getUsers
    };
}

export default connect(
    mapStateToProps, {authUserRequest}
)(Nav);