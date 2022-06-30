import React, {Component} from "react";
import {Tab} from 'semantic-ui-react';
import {connect} from 'react-redux';
import UserInfo from './UserInfo';

class Home extends Component {

    // Get the tab which has unanswered questions by all users
    getCardData = (isUnanswered) => {
        const {userData} = this.props;
        return (
            isUnanswered ? ( 
            <div>
                {userData.unanswered.map(question => (
                    this.renderUserInfo(question, isUnanswered)
                ))}
            </div> 
            ) : ( 
            <div>
                {userData.answered.map(question => (
                    this.renderUserInfo(question, isUnanswered)
                ))}
            </div>)
        );
    }

    renderUserInfo(question, isUnanswered) {
        return (
            <UserInfo 
                key={question.id}
                question_id={question.id}
                unanswered={isUnanswered}
            />
        );
    }

    render () {
        const tab_content = [
            { menuItem: 'Unanswered Questions', render: () => 
                <Tab.Pane>
                   {this.getCardData(true)}
                </Tab.Pane> 
            },
            { menuItem: 'Answered Questions', render: () =>  
                <Tab.Pane>
                    {this.getCardData(false)}
                </Tab.Pane>
            }
        ];

        return (
            <div className="tabs">
                <Tab panes={tab_content} />
            </div>
        );
    }
}

function mapStateToProps({authUser, getUsers, getQuestions}) {
    // View those questions in unanswered tab which the authUser has not answered yet
    // And view those questions in answered tab that he has already answered
    const answeredIds = Object.keys(getUsers[authUser].answers);
    const answered = Object.values(getQuestions)
        .filter(question => answeredIds.includes(question.id))
        // view latest created question on top
        .sort((a,b) => b.timestamp - a.timestamp);
    const unanswered = Object.values(getQuestions)
        .filter(question => !answeredIds.includes(question.id))
        .sort((a,b) => b.timestamp - a.timestamp);
    return {
        userData: {answered, unanswered}
    }
}

export default connect(
    mapStateToProps,
)(Home);
