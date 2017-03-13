import React, { Component, PropTypes } from 'react'

import axios from 'axios';

import FontAwesome from 'react-fontawesome';
import { Col, Row  } from 'react-bootstrap';

import Comment from '../../components/Comment';

import './Movie.css'

class Movie extends Component {
    static propTypes = {

    };


    constructor (props) {
        super(props);
        this.state = {
            movie: []
        };
    }

    componentDidMount(){
        let value = 'Logan';
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
        const { movie } = this.state;

        return (
            <div className="movie-view container">
                <div className="synopsis-container">
                    <Row>
                        <Col xs={4}>
                            <div className="synopsis-image">
                                <img width="100%" height="auto" src={movie.Poster}/>
                            </div>
                        </Col>

                        <Col xs={8}>
                            <h4 className="synopsis-title">SYNOPSIS</h4>
                            <p className="synopsis-data">{movie.Plot}</p>
                            <div className="info-container">
                                <h4 className="info-title">FICHE DU FILM</h4>
                                <Col xs={12}>
                                    <Col xs={1}><div className="text-center"><FontAwesome name='tag'/></div></Col><Col xs={11}><span>Genre: {movie.Genre}</span></Col>
                                    <Col xs={1}><div className="text-center"><FontAwesome name='group'/></div></Col><Col xs={11}><span>Acteurs: {movie.Actors}</span></Col>
                                    <Col xs={1}><div className="text-center"><FontAwesome name='male'/></div></Col><Col xs={11}><span>Realisateur: {movie.Writer}</span></Col>
                                    <Col xs={1}><div className="text-center"><FontAwesome name='camera'/></div></Col><Col xs={11}><span>Public: {movie.Rated}</span></Col>
                                </Col>
                                <Col xs={12}>
                                    <Col xs={1}><div className="text-center"><FontAwesome name='calendar'/></div></Col><Col xs={11}><span>Date de sortie:{movie.Released}</span></Col>
                                    <Col xs={1}><div className="text-center"><FontAwesome name='clock-o'/></div></Col><Col xs={11}><span>Duree:{movie.Runtime}</span></Col>
                                    <Col xs={1}><div className="text-center"><FontAwesome name='map-marker'/></div></Col><Col xs={11}><span>Origine: {movie.Country}</span></Col>
                                    <Col xs={1}><div className="text-center"><FontAwesome name='heart'/></div></Col><Col xs={11}><span>Note imdb: {movie.imdbRating}</span></Col>
                                </Col>
                            </div>
                        </Col>
                    </Row>
                </div>

                <div className="comments-container">
                    <Col xs={12}>
                    <Comment
                        userImage="https://images-na.ssl-images-amazon.com/images/M/MV5BMTg2NjU1NTkyMl5BMl5BanBnXkFtZTgwMzk5Mjg5NjE@._V1_SX300.jpg"
                        user="toto"
                        body='Ouh le beau Css!'
                        date="2016/06/06 21:02:02"
                    />
                    </Col>
                    <Col xs={12}>
                    <Comment
                        userImage="https://images-na.ssl-images-amazon.com/images/M/MV5BMTg2NjU1NTkyMl5BMl5BanBnXkFtZTgwMzk5Mjg5NjE@._V1_SX300.jpg"
                        user="kevin du 78"
                        body="lol asdasd asda ds ce e asdasd asd asd asd "
                        date="2017/06/06 21:02:02"
                    />
                    </Col>
                </div>
            </div>
        )};
}

export default Movie;