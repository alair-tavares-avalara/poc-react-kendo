import React from 'react';
import PropTypes from 'prop-types';
import { Grid, GridToolbar, GridColumn as Column, GridCell } from '@progress/kendo-react-grid';
import { translate } from '../../locales';
import { I18n } from 'react-i18next';

class ScopeCell extends GridCell {
    render() {
        const { dataItem, field } = this.props;
        const label = dataItem[field] ? 'Empresa' : 'Global';
        
        return (
            <I18n ns="common">
                {
                    (t, { i18n }) => (
                        <td>{t(label)}</td>
                    )
                }
            </I18n>
        );
    }
}

class AgastList extends React.Component {
    static NAMESPACE_TRANSLATION = 'agast';
    static propTypes = {
        t: PropTypes.func.isRequired,
        data: PropTypes.object.isRequired,
        onPagination: PropTypes.func.isRequired,
        onFilter: PropTypes.func.isRequired,
        buttonNew: PropTypes.object
    };

    constructor(props) {
        super(props);

        this.state = {
            chipData: [],
            items: [],
            page: 0,
            pageSize: 10,
            total: 0,
            search: '',
            typeFilter: '',
            skip: 20,
            pageable: {
                buttonCount: 5,
                info: true,
                type: 'numeric',
                pageSizes: true,
                previousNext: true
            }
        };

        this.pageChange = this.pageChange.bind(this);
        this.filterChange = this.filterChange.bind(this);
    }

    componentWillReceiveProps(props) {
        const { data, onPagination, onFilter, buttonNew } = props;
        const skip = data.page * (data.rowsPerPage || 0);

        this.setState({
            items: data.agasts,
            page: data.page,
            pageSize: data.rowsPerPage || 0,
            total: data.totalCount || 0,
            onPagination,
            onFilter,
            buttonNew,
            skip
        });
    }

    pageChange(event) {
        const { skip, take } = event.page;
        this.setState({ skip, pageSize: take });

        this.props.onPagination({ skip, pageSize: take });
    }

    filterChange = function (event) {
        //console.log(event.filter);
    }

    render() {

        const { buttonNew, t } = this.props;

        return (
            <div style={{ padding: '20px' }}>
                <Grid
                    style={{ maxHeight: '400px' }}
                    data={this.state.items}
                    pageChange={this.pageChange}
                    total={this.state.total}
                    skip={this.state.skip}
                    pageable={this.state.pageable}
                    pageSize={this.state.pageSize}
                >
                    {
                        buttonNew &&
                        <GridToolbar>
                            {buttonNew}
                        </GridToolbar>
                    }
                    <Column field="companyId" title={t('Escopo')} width="100px" cell={ScopeCell} />
                    <Column field="code" title={t('Código')} width="250px" />
                    <Column field="hsCode" title={t('Classificação Fiscal')} width="250px" />
                    <Column field="description" title={t('Descrição')} />
                </Grid>
            </div>
        );
    }
}

export default translate(AgastList, AgastList.NAMESPACE_TRANSLATION); // default export. used in your app.
export { AgastList as PureAgastList }; // pure component. used in tests