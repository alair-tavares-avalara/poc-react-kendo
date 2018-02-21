import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/AgastActions';
import AgastList from '../components/agast/AgastList';
import { Button } from '@progress/kendo-react-buttons';
import { withRouter } from 'react-router-dom';
import { translate } from '../locales';

const style = {
    newButton: {
        textTransform: 'uppercase'
    }
};

export class AgastListPage extends React.Component {
    static propTypes = {
        t: PropTypes.func.isRequired,
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
        const { t } = this.props;
        const ButtonNew = withRouter(({ history }) => (
            <Button icon="plus" style={style.newButton} primary={true} onClick={() => history.push('/agast-form') }>
                {t('Novo Agast')}
            </Button>
        ));

        return (
            <AgastList t={t} data={this.props} onPagination={this.handleFilter} onFilter={this.handleFilter} buttonNew={<ButtonNew/>} />
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
)(translate(AgastListPage));

export { AgastListPage as PureAgastListPage };