import React, {Component} from "react";
import {Tab} from 'semantic-ui-react';
import {connect} from 'react-redux';
import UserInfo from './UserInfo';

class Home extends Component {

    // Get the tab which has unanswered questions by all users
    getUnansweredUserInfo = () => {
        const {userData} = this.props;
        return (
            <div>
                {userData.unanswered.map(question => (
                    <UserInfo 
                        key={question.id}
                        question_id={question.id}
                        unanswered={true}
                    />
                ))}
            </div>
        );
    }

    // Get the tab which has answered questions by all users 
    getAnsweredUserInfo = () => {
        const {userData} = this.props;
        return (
            <div>
                {userData.answered.map(question => (
                    <UserInfo 
                        key={question.id}
                        question_id={question.id}
                        unanswered={false}
                    />
                ))}
            </div>
        );
    }  

    render () {
        const tab_content = [
            { menuItem: 'Unanswered Questions', render: () => 
                <Tab.Pane>
                   {this.getUnansweredUserInfo()}
                </Tab.Pane> 
            },
            { menuItem: 'Answered Questions', render: () =>  
                <Tab.Pane>
                    {this.getAnsweredUserInfo()}
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