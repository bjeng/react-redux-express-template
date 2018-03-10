import React from 'react';
import { connect } from 'react-redux';
import Main from '../components/Main';

const AppContainer = ({ }) => {
    return (
        <div>
            <Main/>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        state: state
    };
};

const mapDispatchToProps = (/* dispatch */) => {
    return {
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppContainer);
