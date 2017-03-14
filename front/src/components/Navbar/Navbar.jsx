import React, {Component, PropTypes } from 'react';
// import Search from 'react-search';

import FontAwesome from 'react-fontawesome';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem  } from 'react-bootstrap';
import axios from 'axios';

import './Navbar.css'

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

    };

    constructor (props) {
        super(props);
        this.state = {
            value: '',
            movies: []
        };
    }

    handleChange = ({target: {value} }) => {
        // this.setState({ value });

        axios.get('http://www.omdbapi.com/?s='+value+'&r=json')
            .then((response) => {
                // console.log(response.data.Search);
                if(response.data.Search !== undefined){
                    let movies = response.data.Search.map( (movie, i) => { return { id: i, value: movie.Title } });
                    this.setState({movies});
                    console.log(movies[0]);
                }
                else {
                    let movies = [];
                    this.setState({movies});
                }

            })
            .catch(console.log);
    };

    componentDidMount(){

    };

    render() {
        // const {value} = this.state;
        const {movies} = this.state;


        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">Hypertube</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        <NavItem>
                            <div className="search-box">
                                <input  onChange={this.handleChange} className="search" placeholder="search awesome movies"/>
                                {movies.length > 0 ?
                                    <ul className="search-dropdown">
                                        {movies.map((movie, index) => (
                                            <li key={index}>{movie.value}</li>
                                        ))}
                                    </ul>
                                    :
                                    ''
                                }

                            </div>

                        </NavItem>
                        <NavItem eventKey={1} href="#">Link Right</NavItem>
                        <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1}>Action</MenuItem>
                            <MenuItem eventKey={3.2}>Another action</MenuItem>
                            <MenuItem eventKey={3.3}>Something else here</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={3.3}>Separated link</MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Navbarmain;
