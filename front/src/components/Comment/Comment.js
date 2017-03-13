import React, {Component, PropTypes } from 'react';
// import Search from 'react-search';


import { Col, Row } from 'react-bootstrap';

import './Comment.css'

// function debounce(fn, delay) {
//     let timer = null;
//     return function () {
//         let context = this, args = arguments;
//         clearTimeout(timer);
//         timer = setTimeout(function () {
//             fn.apply(context, args);
//         }, delay);
//     };
// }

class Navbarmain extends Component {
    static propTypes = {
        user: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired
    };

    constructor (props) {
        super(props);
        this.state = {
            props: props
        };
    }

    componentDidMount(){

    };

    render() {
        const {props} = this.state;
        // const {movies} = this.state;


        return (
            <div className="comment-container">
                    <Col xs={3}>
                        <p>{props.user}</p>
                        <img src={props.userImage} height="120px" width="auto"/>
                    </Col>
                    <Col xs={9}>
                        <div className="comment-body">
                            <p>{props.body}</p>
                            <p className="comment-date ">Poste le: {props.date}</p>
                        </div>
                    </Col>
            </div>
        );
    }
}

export default Navbarmain;
