import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/AgastActions';
import AgastList from '../components/agast/AgastList';


export class AgastListPage extends React.Component {
    static propTypes = {
        actions: PropTypes.object.isRequired
    }

    componentDidMount() {
        this.props.actions.fetchAgast();
    }

    handleFilter = (filters) => {
        this.props.actions.fetchAgast(filters);
    }

    render() {
        return (
            <AgastList data={this.props} onPagination={this.handleFilter} onFilter={this.handleFilter} />
        );
    }
}

function mapStateToProps(state) {
    return Object.assign({}, state.agastReducer);
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AgastListPage);
