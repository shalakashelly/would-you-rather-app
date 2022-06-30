import React, {Component} from 'react';
import {Header, Button} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {handleSaveQuestionAnswer} from '../actions/users';
import {optionOne, optionTwo} from './constants';

class QuestionPoll extends Component {
    state = {
        selectedOption: ''
    };

    handleInputChange = (e) => {
        this.setState({selectedOption: e.target.value});
    }

    setOption = () => {
        // if at least one option has been selected then save that as an answer towards that question
        if (this.state.selectedOption) {
            this.props.handleSaveQuestionAnswer(this.props.authUser, this.props.question.id, this.state.selectedOption);
        }
    };

    renderAnswer(option, answerText) {
        return (
            <>
                <input
                    type="radio"
                    name="answer"
                    value={option}
                    checked={this.state.selectedOption === option}
                    onChange={this.handleInputChange}
                />
                <label className='radio-label'>{answerText}</label>
            </>
        );
    }

    render() {
        const {question} = this.props;
        
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
                        {this.renderAnswer(optionOne, question.optionOne.text)}
                        <br />
                        {this.renderAnswer(optionTwo, question.optionTwo.text)}
                        <br />
                        <div className='submit-answer'>
                            <Button
                                basic
                                color='green'
                                disabled={!this.state.selectedOption}
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
