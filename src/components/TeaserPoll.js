import React, {Component} from 'react';
import {Header} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

class TeaserPoll extends Component {

    render() {
        const {question, unanswered} = this.props;
        return (
            <div className="poll">
                <div className="poll-right">
                    <Header as="h5">Would you rather</Header>
                    <p>{question.optionOne.text}</p>
                    <p>or....</p>
                    <Link to={`/questions/${question.id}`}>{unanswered ? 'ANSWER POLL' : 'VIEW RESULT'}</Link>
                </div>
            </div>
        );
    }
}

export default TeaserPoll;
