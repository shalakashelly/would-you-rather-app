import React, {Component} from "react";
import {Header, Image} from 'semantic-ui-react';
import {connect} from 'react-redux';
import TeaserPoll from './TeaserPoll';
import QuestionPoll from './QuestionPoll';
import ResultPoll from './ResultPoll';
import Error from './Error';

class UserInfo extends Component {

    renderPoll = () => {
        const {question, unanswered, typeOfUserCard, author} = this.props;
                
        if (typeOfUserCard === 'TEASER_POLL') {
            return (
                <TeaserPoll
                    question={question}
                    unanswered={unanswered}
                    author={author}
                />
            );
        } if (typeOfUserCard === 'QUESTION_POLL') {
            return (
                <QuestionPoll
                    question={question}
                />
            );
        } if (typeOfUserCard === 'RESULT_POLL') {
            return (
                <ResultPoll
                    question={question}
                />
            );
        }
    }

    render() {
        const {author, errorPage} = this.props;
        
        if (errorPage) {
            return <Error />;
        }

        return (
            <div className="userInfo">
                <Header as="h5">{author.name} asks:</Header>
                <div className="userInfo-layout">
                    <div className="userInfo-wrapper">
                        <div className="column4">
                            <Image 
                                src={author.avatarURL}
                                size='medium' 
                                circular />
                        </div>
                        <div className="column8">
                            {this.renderPoll()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ getUsers, getQuestions, authUser }, { match, question_id }) {
    // determine the type of UserCard to be rendered here
    let question, author, typeOfUserCard, errorPage = false;

    // if question_id does not exist then it is a dummy poll
    if (question_id !== undefined) {
        question = getQuestions[question_id];
        author = getUsers[question.author];
        typeOfUserCard = 'TEASER_POLL';
    } else {
        const {question_id} = match.params;
        question = getQuestions[question_id];
        const user = getUsers[authUser];

        if (question === undefined) {
            errorPage = true;
        } else {
            // if question exists and it has not been answered then it is a question poll else it is a result poll
            author = getUsers[question.author];
            typeOfUserCard = 'QUESTION_POLL';
            if (Object.keys(user.answers).includes(question.id)) {
                typeOfUserCard = 'RESULT_POLL';
            }
        }
    }
    return {question, author, typeOfUserCard, errorPage};

}

export default connect(mapStateToProps)(UserInfo);
