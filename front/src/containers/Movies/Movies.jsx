import React, { Component, PropTypes } from 'react'
import {browserHistory} from 'react-router';

import axios from 'axios';

// import FontAwesome from 'react-fontawesome';
import { Col, Row , Clearfix } from 'react-bootstrap';

// import Comment from '../../components/Comment';

import './Movies.css'

class Movies extends Component {
    static propTypes = {

    };


    constructor (props, router) {
        // browserHistory.push('/login');
        // alert(localStorage.getItem('token'));
        super(props);
        this.state = {
            movies: []
        };
    }

    componentDidMount(){
        // if user is not logged then ->
        if (!localStorage.getItem('tata'))
            browserHistory.push('/login');
        else {
            let value = 'fast and furious';

            console.log('tg');
            axios.get('http://www.omdbapi.com/?s=' + value + '&r=json&type=movie')
                .then((response) => {
                    console.log(response.data.Search);
                    if (response.data !== undefined) {
                        let movies = response.data.Search.map((movie, i) => {
                            return {
                                id: i,
                                title: movie.Title,
                                poster: movie.Poster,
                                imdbID: movie.imdbID
                            }
                        });
                        this.setState({movies});
                        // let movie = response.data;
                        // this.setState({movie});
                    }
                    else {
                        let movies = [];
                        this.setState({movies});
                    }

                })
                .catch(console.log);
        }
    };

    render() {
        const { movies } = this.state;

        return (
            <div className="container">
                <h1>List of movies: </h1>
                {movies.map((movie, index) => (
                    <Col key={index} xs={12} md={6} lg={4}>
                        <div  className="container-movie">
                            <a href={'/movies/'+ movie.imdbID}>
                                <img src={movie.poster != 'N/A' ? movie.poster : '/medium_aastruc.jpg'} className="movie-image"/>
                                <Clearfix />
                                <span className="movie-name">{movie.title}</span>
                            </a>
                        </div>
                    </Col>
                ))}
            </div>
        )};
}

export default Movies;