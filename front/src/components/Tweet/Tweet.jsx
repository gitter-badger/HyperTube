import React, { PropTypes } from 'react';

import './Tweet.css'

// class Tweet extends Component {
//   render() {
//     return (
//       <p>tweet component</p>
//     );
//   }
// }

const Tweet  = ({ avatar, fullname, content, username, date }) => (
    <div className="tweet">
        <div className="avatar">
            <img src={avatar} role="presentation" alt="tg"/>
        </div>
        <div className="data">
            <div className="infos">
                <strong>{fullname}</strong>
                <small className="gray">@{username}</small>
                <small className="gray date">{date}</small>
            </div>
            <div className="content">
                <p>{content}</p>
            </div>
        </div>
    </div>
);

// permet de creer des erreurs volontaires dans la console du navigateur
Tweet.prototype = {
    username: PropTypes.string.isRequired,
    fullname: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
};

export default Tweet;
