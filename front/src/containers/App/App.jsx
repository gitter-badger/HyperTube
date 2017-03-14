import React, { Component, PropTypes } from 'react';
import './App.css';

import Navbar from '../../components/Navbar';

const App = ({children}) => (
    <main>
        <Navbar toto="toto"/>
        {children}
    </main>
);

App.propTypes = {
    children: PropTypes.node
};

// import Tweet from '../../components/Tweet';
// import TweetBox from '../../components/TweetBox';
// import Home from '../../containers/Home';

// class App extends Component {
//
//     static propTypes = {
//         children: PropTypes.node.isRequired,
//     };
//
//   render() {
//       const {children} = this.propTypes;
//
//     return (
//         <main>
//             {children}
//             {/*<Home>*/}
//             {/*</Home>*/}
//         </main>
//     );
//   }
// }

export default App;