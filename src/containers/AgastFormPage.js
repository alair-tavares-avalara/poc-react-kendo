import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/AgastActions';
import AgastForm from '../components/agast/AgastForm';
import initialState from '../reducers/initialState';

export class AgastFormPage extends React.Component {
    static HTTP_SUCCESS_CODE = 200;
    static propTypes = {
        actions: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            agast: initialState.agast
        };

        this.save = this.save.bind(this);
    }

    componentDidMount() {
        this.props.actions.fetchListAgast();
    }

    save = (agast) => {
        this.props.actions.saveAgast(agast);
    }

    cancel = (agast) => {
        this.props.history.goBack();
    }

    render() {
        return (
            <div>
                {
                    this.props.saveAgast.status === AgastFormPage.HTTP_SUCCESS_CODE
                        ?
                        this.props.history.goBack()
                        :
                        <AgastForm
                            agastList={this.props.agasts}
                            onSaveClick={this.save}
                            onCancelClick={this.cancel}
                            agast={this.state.agast}
                        />
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({ agasts: state.agastListReducer, saveAgast: state.agastSaveReducer });
const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(actions, dispatch) });

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AgastFormPage);

export { AgastFormPage as PureAgastFormPage };