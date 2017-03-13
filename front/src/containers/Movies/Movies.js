import React, { Component, PropTypes } from 'react'

import axios from 'axios';

import FontAwesome from 'react-fontawesome';
import { Col, Row  } from 'react-bootstrap';

import Comment from '../../components/Comment';

import './Movies.css'

class Movies extends Component {
    static propTypes = {

    };


    constructor (props) {
        super(props);
        this.state = {
            movies: []
        };
    }

    componentDidMount(){
        let value = 'alibi.com';
        axios.get('http://www.omdbapi.com/?t='+value+'&r=json')
            .then((response) => {
                console.log(response.data);
                if(response.data !== undefined){
                    let movie = response.data;
                    this.setState({movie});
                    // console.log(movies[0]);
                }
                else {
                    let movie = [];
                    this.setState({movie});
                }

            })
            .catch(console.log);
    };

    render() {
        const { movies } = this.state;

        return (
            <div className="container">

                <h1>List of movies</h1>
            </div>
        )};
}

export default Movies;