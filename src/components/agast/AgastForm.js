import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Popup } from '@progress/kendo-react-popup';
import { filterBy } from '@progress/kendo-data-query';
import { agast } from '../../types';
import PageTitle from '../shared/PageTitle';

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
    }
};

class AgastForm extends React.Component {
    static SCOPE_GLOBAL = 'global';
    static SCOPE_COMPANY = 'company';

    static propTypes = {
        onSaveClick: PropTypes.func.isRequired,
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
            agast: {
                origin: '',
                info: '',
                code: '',
                description: '',
                scope: AgastForm.SCOPE_COMPANY,
                company: ''
            }
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
        const a = filterBy(data, filter);
        console.log(a, 'safdsa');
        return a;
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
        this.setState({ agast: newAgast }, () => this.validate());
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

        this.setState({ show: false, agast: newAgast }, () => this.validate());
    };

    validate = () => {
        const node = ReactDOM.findDOMNode(this);
        const inputs = [...node.querySelectorAll('input')];
        const formIsInvalid = inputs.filter(i => i.required).some(i => !i.value || i.value === '');

        this.setState({ formIsInvalid });

        return !formIsInvalid;
    };

    render() {
        const { agast } = this.state;
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
                                            <span>Agast Origem<span className="k-required">*</span></span>
                                            <input name="origin" id="origin" required={true} className="k-textbox" onChange={this.onChangeOrigin} value={agast.origin} />
                                        </label>
                                        <div ref={this.setWrapperRef}>
                                            <Popup anchor={this.anchor} show={this.state.show}>
                                                <div style={style.popup}>
                                                    {
                                                        this.state.agastList.map(i => {
                                                            return <div key={i.code} style={style.popupItem} onClick={this.onClickPopupItem(i)}>{`${i.code} - ${i.description}`}</div>
                                                        })
                                                    }
                                                </div>
                                            </Popup>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-xs-12">
                                        <label className="k-form-field">
                                            <span>Info</span>
                                            <input name="info" id="info" className="k-textbox" disabled={true} onChange={this.onChange} value={agast.info} />
                                        </label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 col-xs-12">
                                        <label className="k-form-field">
                                            <span>Código<span className="k-required">*</span></span>
                                            <input name="code" id="code" required={true} className="k-textbox" onChange={this.onChange} value={agast.code} />
                                        </label>
                                    </div>
                                    <div className="col-md-6 col-xs-12">
                                        <label className="k-form-field">
                                            <span>Descrição<span className="k-required">*</span></span>
                                            <input name="description" id="description" required={true} className="k-textbox" onChange={this.onChange} value={agast.description} />
                                        </label>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6 col-xs-12">
                                        <div className="k-form-field">
                                            <span>Escopo<span className="k-required">*</span></span>

                                            <input type="radio" name="scope" id="global" value={AgastForm.SCOPE_GLOBAL}
                                                className="k-radio" checked={agast.scope === AgastForm.SCOPE_GLOBAL} onChange={this.onChange} />
                                            <label className="k-radio-label" htmlFor="global">Global</label>

                                            <input type="radio" name="scope" id="company" value={AgastForm.SCOPE_COMPANY}
                                                className="k-radio" checked={agast.scope === AgastForm.SCOPE_COMPANY} onChange={this.onChange} />
                                            <label className="k-radio-label" htmlFor="company">Empresa</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-xs-12">
                                        {
                                            agast.scope === AgastForm.SCOPE_COMPANY &&
                                            <label className="k-form-field">
                                                <span>Empresa<span className="k-required">*</span></span>
                                                <input name="company" type="hidden" required={true} id="company" className="k-textbox" onChange={this.onChange} value={agast.company} />
                                                <DropDownList
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
                                <button type="button" className="k-button">Cancelar</button> &nbsp;
                                <button type="button" disabled={this.state.formIsInvalid} className="k-button k-primary" onClick={() => this.props.onSaveClick(agast)}>Salvar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AgastForm;