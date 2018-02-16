import React from 'react';
import PropTypes from 'prop-types';
import { Grid, GridToolbar, GridColumn as Column, GridCell } from '@progress/kendo-react-grid';

class ScopeCell extends GridCell {
    render() {
        const { dataItem, field } = this.props;
        const label = dataItem[field] ? 'Empresa' : 'Global';

        return (
            <td>
                {label}
            </td>
        );
    }
}

class AgastList extends React.Component {
    static propTypes = {
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
        
        const { buttonNew } = this.props;   

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
                    <Column field="companyId" title="Escopo" width="100px" cell={ScopeCell} />
                    <Column field="code" title="Código" width="250px" />
                    <Column field="hsCode" title="Classificação Fiscal" width="250px" />
                    <Column field="description" title="Descrição" />
                </Grid>
            </div>
        );
    }
}

export default AgastList;