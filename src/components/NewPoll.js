import React, {Component} from 'react';
import {Form, Header, Dimmer, Loader} from 'semantic-ui-react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import { handleSaveQuestion } from '../actions/questions';

class NewPoll extends Component {

    state = {
        submitSuccessful: false,
        option1: '',
        option2: '',
        loading: false
    };

    handleLoading = () => {
        this.setState({ loading: true });
    };

    handleSubmit = e => {
        e.preventDefault();
        const {authUser, handleSaveQuestion} = this.props;
        const {option1, option2} = this.state;
        new Promise((res) => {
            this.handleLoading();
            handleSaveQuestion(option1, option2, authUser)
            setTimeout(() => res(), 1000);
        }).then(() => {
            this.setState({
                option1: '',
                option2: ''
            });
            this.setState({submitSuccessful: true});
        });
    };

    handleChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    getLoader = () => {
        if (this.state.loading) {
            return (
                <Dimmer active inverted>
                    <Loader inline='centered'>Creating Question</Loader>
                </Dimmer>
            );
        } else return null 
    }

    render() {
        const disabled = (this.state.option1 === '' || this.state.option2 === '') ? true : false;

        if (this.state.submitSuccessful === true) {
            return <Redirect to="/" />;
        }

        return (
            <div className="new-poll">
                {this.getLoader()}
                <Header as="h3">Create New Poll</Header>
                <Header as="h4">Would you rather</Header>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Field>
                        <input
                            id="option1" 
                            placeholder='Enter first option...'
                            value={this.state.option1}
                            onChange={this.handleChange}
                            required />
                    </Form.Field>
                    <p>Or</p>
                    <Form.Field>
                        <input 
                            id="option2"
                            placeholder='Enter second option...'
                            value={this.state.option2}
                            onChange={this.handleChange}
                            required />
                    </Form.Field>
                    <Form.Button 
                        type='submit'
                        color='green'
                        disabled={disabled}>
                        Submit
                    </Form.Button>
                </Form>
            </div>
        );
    }
}

function mapStateToProps({ authUser }) {
    return {
        authUser
    };
}
export default connect(
    mapStateToProps, {handleSaveQuestion} 
)(NewPoll);
