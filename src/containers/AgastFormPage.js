import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/AgastActions';
import AgastForm from '../components/agast/AgastForm';

export class AgastFormPage extends React.Component {
    static HTTP_SUCCESS_CODE = 200;
    static propTypes = {
        actions: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        console.log(actions);

        this.state = {
            agast: {
                origin: '',
                info: '',
                code: '',
                description: '',
                scope: AgastForm.SCOPE_COMPANY,
                company: ''
            }
        };

        this.save = this.save.bind(this);
    }

    componentDidMount() {
        this.props.actions.fetchListAgast();
    }

    save = (agast) => {
        this.props.actions.saveAgast(agast);
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
                            agast={this.state.agast}
                        />
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({ agasts: state.agastReducer, saveAgast: state.agastSaveReducer });
const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(actions, dispatch) });

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AgastFormPage);