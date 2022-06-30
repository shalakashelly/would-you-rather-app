import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
  Header,
  Form,
  Dropdown,
  Button,
  Dimmer,
  Loader
} from 'semantic-ui-react';
import { authUserRequest } from '../actions/authUser';

export class Login extends Component {
    state = {
        value: '',
        loading: false
    };

    getUsers = () => {
        const { users } = this.props;
        return users.map(user => ({
            key: user.id,
            text: user.name,
            value: user.id,
            image: { avatar: true, src: user.avatarURL }
        }));
    };

    onChange = (e, { value }) => {
        this.setState({ value });
    };

    handleLoading = () => {
        this.setState({ loading: true });
    };

    handleSubmit = e => {
        e.preventDefault();
        const {authUserRequest} = this.props;
        const authUser = this.state.value;
        new Promise((res) => {
            this.handleLoading();
            setTimeout(() => res(), 1000);
        }).then(() => authUserRequest(authUser));
    };
  
    getLoader = () => {
        if (this.state.loading) {
            return (
                <Dimmer active inverted>
                    <Loader inline='centered'>Signing In</Loader>
                </Dimmer>
            );
        } else return null 
    }

    getHeader = () => {
        return (
            <div className='loginHeader'>
                <Header as="h4" block attached="top" textAlign="center">
                    <p>Welcome to the Would You Rather App!</p>
                    <p>Please sign in to continue</p>
                </Header>
            </div>
        );
    };

    renderContent = () => {
        const { value } = this.state;
        const disabled = value === '' ? true : false;
        return (
            <div className='dropdown'>
                {this.getLoader()}
                <Form 
                    onSubmit={this.handleSubmit}>
                    <Dropdown
                        placeholder="Select a Friend"
                        required
                        fluid
                        selection
                        scrolling
                        options={this.getUsers()}
                        value={value}
                        onChange={this.onChange}
                    />
                    <Button content="Login" positive disabled={disabled} fluid />
                </Form>
            </div>
        );
    };

    render() {
        return (
            <div className="loginPage">
                {this.getHeader()}
                {this.renderContent()}
            </div>
        );
    }
}

function mapStateToProps({ getUsers }) {
  return {
    users: Object.values(getUsers)
  };
}

export default connect(
    mapStateToProps, {authUserRequest}
)(Login);