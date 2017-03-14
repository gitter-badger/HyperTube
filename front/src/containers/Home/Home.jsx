import React, { Component } from 'react'
import moment from 'moment'

// import { tweets } from '../../constants';
import Tweet from '../../components/Tweet';
import TweetBox from '../../components/TweetBox';
import './Home.css'

class Home extends Component {
    constructor (props) {
        localStorage.setItem('token', 'toto');
        super(props);
        this.state = {
            movies: []
        };
    }

    publish = (tweet) => {
        const { tweets } = this.state;

        this.setState({
            tweets: [{
                avatar: 'http://fakeimg.pl/50x50/',
                username: 'user_tata',
                fullname: 'name_tata',
                content: 'content_tata',
                data: moment().format('DD/MM/YYYY')
            },...tweets,
            ],
        });
    };

    render() {
        const { tweets } = this.state;

        return (
            <div className="homepage">
                <a href="/movies">Voir les film</a>
                <div className="tweets">
                    {/*<TweetBox publish={this.publish}/>*/}
                    {/*{tweets.map((tweet, index) => (*/}
                        {/*<Tweet*/}
                            {/*key={index}*/}
                            {/*{...tweet}*/}
                        {/*/>*/}
                    {/*))}*/}
                </div>
            </div>
        )};
}

export default Home;