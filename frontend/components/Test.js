import React from 'react';
import PropTypes from 'prop-types';


class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'hello'
        };
    }

    componentDidMount() {
        console.log('hey');
    }

    render() {
        return (
          <h1>{this.state.title}</h1>
        );
    }
}

Test.propTypes = {
};


export default Test;
