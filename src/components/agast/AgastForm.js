import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Popup } from '@progress/kendo-react-popup';
import { filterBy } from '@progress/kendo-data-query';
import { agast } from '../../types';
import PageTitle from '../shared/PageTitle';
import { SCOPE_GLOBAL, SCOPE_COMPANY } from '../../constants/agastConstants';
import initialState from '../../reducers/initialState';
import { translate } from '../../locales';

const style = {
    popup: {
        padding: '10px',
        width: '300px',
        maxHeight: '200px',
        overflow: 'auto'
    },
    popupItem: {
        padding: '5px',
        cursor: 'pointer'
    },
    companyDropDown: {
        width: '100%'
    }
};

class AgastForm extends React.Component {
    static NAMESPACE_TRANSLATE = 'agast';
    static propTypes = {
        t: PropTypes.func.isRequired,
        onSaveClick: PropTypes.func.isRequired,
        onCancelClick: PropTypes.func.isRequired,
        onChange: PropTypes.func,
        agast: agast.isRequired
    };

    companies = [{ id: 1, name: 'Avalara BR' }, { id: 2, name: 'Rezolve' }]; //ToDo: fetch Companies from API

    anchor = null;

    constructor(props) {
        super(props);

        this.state = {
            companies: this.companies,
            formIsInvalid: true,
            show: false,
            showInitially: false,
            agastList: [],
            agast: initialState.agast
        };

        this.onChange = this.onChange.bind(this);
        this.onChangeOrigin = this.onChangeOrigin.bind(this);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.filterChange = this.filterChange.bind(this);
    }

    componentWillReceiveProps(props) {
        const { agast, agastList } = props;

        this.setState({ agast, agastList });
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    filterChange(event) {
        this.setState({
            companies: this.filterData(event.filter),
            filter: event.filter.value
        });
    }

    filterData(filter) {
        const data = this.companies.slice();
        return filterBy(data, filter);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({ show: false });
        }
    }

    onChange = (event) => {
        const { name, value, props = {} } = event.target;
        const fieldName = name || props.name;
        const { agast } = this.state;
        const newAgast = Object.assign({}, agast);
        newAgast[fieldName] = value;
        this.setState({ agast: newAgast }, () => {
            this.validate();
            this.props.onChange && this.props.onChange(event);
        });
    };

    onChangeOrigin = (event) => {
        this.onChange(event);

        this.setState({ show: event.target.value.length > 2 });
    };

    onClickPopupItem = (item) => (event) => {
        const { agast } = this.state;
        const newAgast = Object.assign({}, agast);
        newAgast.origin = item.code;
        newAgast.info = item.description;
        //keepOpen - workaround because trigger error when popup is closed in test mode.
        this.setState({ show: !!event.target.keepOpen, agast: newAgast }, () => this.validate());
    };

    validate = () => {
        const node = ReactDOM.findDOMNode(this);
        const inputs = [...node.querySelectorAll('input')];
        const formIsInvalid = inputs.filter(i => i.required).some(i => !i.value || i.value === '');

        this.setState({ formIsInvalid });

        return !formIsInvalid;
    };

    render() {
        const { t } = this.props;
        const { agast, agastList = [] } = this.state;

        return (
            <div style={{ padding: '20px' }}>
                <div className="card">
                    <div className="card-block">
                        <form className="k-form">
                            <fieldset>
                                <legend><PageTitle>AGAST</PageTitle></legend>

                                <div className="row">
                                    <div className="col-md-6 col-xs-12">
                                        <label className="k-form-field" ref={(button) => {
                                            if (!this.anchor) {
                                                this.anchor = button;
                                            }
                                        }}>
                                            <span>{t('agast:Agast Origem')}<span className="k-required">*</span></span>
                                            <input name="origin" id="origin" required={true} className="k-textbox" onChange={this.onChangeOrigin} value={agast.origin} />
                                        </label>
                                        <div ref={this.setWrapperRef}>
                                            <Popup anchor={this.anchor} show={this.state.show}>
                                                <div style={style.popup}>
                                                    {
                                                        agastList.map(i => {
                                                            return <div className="agast-item-popup" key={i.code} style={style.popupItem} onClick={this.onClickPopupItem(i)}>{`${i.code} - ${i.description}`}</div>
                                                        })
                                                    }
                                                </div>
                                            </Popup>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-xs-12">
                                        <label className="k-form-field">
                                            <span>{t('Informações')}</span>
                                            <input name="info" id="info" className="k-textbox" disabled={true} onChange={this.onChange} value={agast.info} />
                                        </label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 col-xs-12">
                                        <label className="k-form-field">
                                            <span>{t('Código')}<span className="k-required">*</span></span>
                                            <input name="code" id="code" required={true} className="k-textbox" onChange={this.onChange} value={agast.code} />
                                        </label>
                                    </div>
                                    <div className="col-md-6 col-xs-12">
                                        <label className="k-form-field">
                                            <span>{t('Descrição')}<span className="k-required">*</span></span>
                                            <input name="description" id="description" required={true} className="k-textbox" onChange={this.onChange} value={agast.description} />
                                        </label>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6 col-xs-12">
                                        <div className="k-form-field">
                                            <span>{t('Escopo')}<span className="k-required">*</span></span>

                                            <input type="radio" name="scope" id="global" value={SCOPE_GLOBAL}
                                                className="k-radio" checked={agast.scope === SCOPE_GLOBAL} onChange={this.onChange} />
                                            <label className="k-radio-label" htmlFor="global">{t('Global')}</label>

                                            <input type="radio" name="scope" id="company" value={SCOPE_COMPANY}
                                                className="k-radio" checked={agast.scope === SCOPE_COMPANY} onChange={this.onChange} />
                                            <label className="k-radio-label" htmlFor="company">{t('Empresa')}</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-xs-12">
                                        {
                                            agast.scope === SCOPE_COMPANY &&
                                            <label className="k-form-field">
                                                <span>Empresa<span className="k-required">*</span></span>
                                                <input name="company" type="hidden" required={true} id="company" onChange={this.onChange} value={agast.company} />
                                                <DropDownList
                                                    style={style.companyDropDown}
                                                    name={'company'}
                                                    required={true}
                                                    data={this.state.companies}
                                                    textField={'name'}
                                                    valueField={'id'}
                                                    value={this.state.company}
                                                    filterable={true}
                                                    filter={this.state.filter}
                                                    onFilterChange={this.filterChange}
                                                    onChange={this.onChange}
                                                />
                                            </label>
                                        }
                                    </div>
                                </div>
                            </fieldset>

                            <div className="text-right">
                                <button id="cancelButton" name="cancelButton" type="button" className="k-button" onClick={this.props.onCancelClick}>{t('Cancelar')}</button> &nbsp;
                                <button id="saveButton" name="saveButton" type="button" disabled={this.state.formIsInvalid} className="k-button k-primary" onClick={() => this.props.onSaveClick(agast)}>
                                    {t('Salvar')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default translate(AgastForm, AgastForm.NAMESPACE_TRANSLATE); // default export. used in your app.
export { AgastForm as PureAgastForm }; // pure component. used in tests