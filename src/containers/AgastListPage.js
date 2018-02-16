import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/AgastActions';
import AgastList from '../components/agast/AgastList';
import { Button } from '@progress/kendo-react-buttons';
import { withRouter } from 'react-router-dom'

export class AgastListPage extends React.Component {
    static propTypes = {
        actions: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);

        this.handleFilter = this.handleFilter.bind(this);
    }

    componentDidMount() {
        this.props.actions.fetchAgast();
    }

    handleFilter = (filters) => {
        this.props.actions.fetchAgast(filters);
    }

    render() {
        const ButtonNew = withRouter(({ history }) => (
            <Button icon="plus" primary={true} onClick={() => { history.push('/agast-form') }}>
                NOVO AGAST
            </Button>
        ));

        return (
            <AgastList data={this.props} onPagination={this.handleFilter} onFilter={this.handleFilter} buttonNew={<ButtonNew/>} />
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
