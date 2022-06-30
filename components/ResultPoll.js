import React, {Component} from 'react';
import {Header, Item, Label, Progress, Button} from 'semantic-ui-react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class ResultPoll extends Component {

    handleBackClick = () => {
        this.props.history.push('/');
    }

    getVoteLabelForOptionOne = (userVote) => {
        if (userVote === 'optionOne') {
            return (
                <Label 
                    className="vote-ribbon"
                    color='blue' ribbon>Your Vote</Label>
            );
        }
        return null;
    }

    getVoteLabelForOptionTwo = (userVote) => {
        if (userVote === 'optionTwo') {
            return (
                <Label 
                    className="vote-ribbon"
                    color='blue' ribbon>Your Vote</Label>
            );
        }
        return null;
    }

    render() {
        const { question, user } = this.props;
        const optionOneVotes = question.optionOne.votes.length;
        const optionTwoVotes = question.optionTwo.votes.length;
        const totalVotes = optionOneVotes + optionTwoVotes;
        const userVote = user.answers[question.id];

        return (
            <div className="poll">
                <div className="poll-right">
                    <Header as="h4">Results:</Header>
                    <Header as="h5">Would you rather</Header>
                    <Item className="result-block">
                        {this.getVoteLabelForOptionOne(userVote)}
                        <p>{question.optionOne.text}</p>
                        <Progress percent={((optionOneVotes / totalVotes) * 100).toFixed(2)}
                            progress>
                                {optionOneVotes} out of {totalVotes} votes
                        </Progress>
                    </Item>
                    <Item className="result-block">
                        {this.getVoteLabelForOptionTwo(userVote)}
                        <p>{question.optionTwo.text}</p>
                        <Progress percent={((optionTwoVotes / totalVotes) * 100).toFixed(2)}
                            progress>
                                {optionTwoVotes} out of {totalVotes} votes
                        </Progress>
                    </Item>
                    <Button
                        position='right'
                        onClick={this.handleBackClick}>Back</Button>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ getUsers, authUser }) {
    const user = getUsers[authUser];
    return {
      user
    };
  }
  
export default withRouter(connect(mapStateToProps)(ResultPoll));
