import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Title from '../components/Title';
import Test from '../components/Test';

const AppContainer = ({ name }) => {
    return (
        <div>
            <Title name={name} />
            <Test />
        </div>
    );
};

AppContainer.propTypes = {
    name: PropTypes.string,
};

const mapStateToProps = (state) => {
    return {
        name: state.name
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
