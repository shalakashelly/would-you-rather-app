import React, {Component} from 'react';
import {Header, Button, Form, Radio} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {handleSaveQuestionAnswer} from '../actions/users';

class QuestionPoll extends Component {
    state = {
        selectedOption: ''
    };

    handleInputChange = (e) => {
        const selectedOption = e.target.value;
        this.setState({selectedOption: selectedOption});
    }

    setOption = () => {
        // if at least one option has been selected then save that as an answer towards that question
        if (this.state.selectedOption !== '') {
            this.props.handleSaveQuestionAnswer(this.props.authUser, this.props.question.id, this.state.selectedOption);
        }
    };

    render() {
        const {question} = this.props;
        // Disabled the submit button if no option is selected by the user
        const disabled = this.state.selectedOption === '' ? true : false;
        
        // If the question does not exist, then poll does not exist. 
        if (!question) {
            return (
                <div>This poll doesn't exist!!!</div>
            );
        }

        // click on the radio button to make a selection
        return (
            <div className="poll">
                <div className="poll-right">
                    <Header as="h5">Would you rather</Header>
                    <div className="question-form">
                        <input
                            type="radio"
                            name="radio"
                            value="optionOne"
                            checked={this.state.selectedOption === 'optionOne'}
                            onChange={this.handleInputChange}
                        />
                        <label className='radio-label'>{question.optionOne.text}</label>
                        <br />
                        <input
                            type="radio"
                            name="radio"
                            value="optionTwo"
                            checked={this.state.selectedOption === 'optionTwo'}
                            onChange={this.handleInputChange}
                        />
                        <label className='radio-label'>{question.optionTwo.text}</label>
                        <br />
                        <div className='submit-answer'>
                            <Button
                                basic
                                color='green'
                                disabled={disabled}
                                onClick={this.setOption}
                            >Submit</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({authUser}) {
    return {authUser};
}
  
export default connect(mapStateToProps, {handleSaveQuestionAnswer})(QuestionPoll);