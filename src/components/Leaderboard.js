import React, {Component} from 'react';
import { Header, Image, Icon } from 'semantic-ui-react';
import {connect} from 'react-redux';

class Leaderboard extends Component {

    getLeaderboardData = () => {
        const {data} = this.props;
        return (
            data.map((user, idx) => (
                <div className='row'>
                    <div className='row-left'>
                        <div className="img">
                            <Image 
                                src={user.avatarURL}
                                size='medium' 
                                circular />
                        </div>
                    </div>
                    <div className='row-middle'>
                        <Header as='h4'>{user.name}</Header>
                        <p>Answered questions: {user.answerCount}</p>
                        <p>Unanswered questions: {user.questionCount}</p>
                    </div>
                    <div className='row-right'>
                        <Header as='h5'>Score</Header>
                        <p>{user.score}</p>
                    </div>
                </div>
            ))
        );
    }

    render() {
        return (
            <div className='leaderboard-page'>
                {this.getLeaderboardData()}
            </div>
        );
    }
}

function mapStateToProps({ getUsers }) {
    const data = Object.values(getUsers)
      .map(user => ({
        id: user.id,
        name: user.name,
        avatarURL: user.avatarURL,
        answerCount: Object.values(user.answers).length,
        questionCount: user.questions.length,
        score: Object.values(user.answers).length + user.questions.length
      }))
      .sort((a, b) => a.score - b.score)
      .reverse()
      .slice(0, 3);
    return {data};
  }

export default connect(mapStateToProps)(Leaderboard);