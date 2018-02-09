import React from 'react';
import PropTypes from 'prop-types';
import { Grid, GridToolbar, GridColumn as Column, GridCell } from '@progress/kendo-react-grid';
import { Button } from '@progress/kendo-react-buttons';

class ScopeCell extends GridCell {
    render() {
        return (
            <td>
                {this.props.dataItem[this.props.field] ? 'Empresa' : 'Global'}
            </td>
        );
    }
}

class AgastList extends React.Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        onPagination: PropTypes.func.isRequired,
        onFilter: PropTypes.func.isRequired
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
            skip: 0,
            pageable: {
                buttonCount: 5,
                info: true,
                type: 'numeric',
                pageSizes: true,
                previousNext: true
            }
        };

        this.pageChange = this.pageChange.bind(this);
        this.updatePagerState = this.updatePagerState.bind(this);
        this.filterChange = this.filterChange.bind(this);
    }

    componentWillReceiveProps(props) {
        const skip = props.data.page * (props.data.rowsPerPage || 0);

        console.log('skip', skip);
        console.log('page', props.data.page);
        console.log('rowperpage', props.data.rowsPerPage);
        this.setState({
            items: props.data.agasts,
            page: props.data.page,
            pageSize: props.data.rowsPerPage || 0,
            total: props.data.totalCount || 0,
            onPagination: props.onPagination,
            onFilter: props.onFilter,
            skip: skip
        });
    }

    pageChange(event) {
        const { skip } = event.page;
        this.setState({ skip });

        const { pageSize } = this.state;
        this.props.onPagination({ skip, pageSize });
    }

    filterChange = function (event) {
        //console.log(event.filter);
    }

    updatePagerState(key, value) {
        const newPageableState = Object.assign({}, this.state.pageable, { [key]: value });
        this.setState(Object.assign({}, this.state, { pageable: newPageableState }));
    }

    render() {
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
                    <GridToolbar>
                        <Button icon="plus" primary={true}>NOVO AGAST</Button>
                    </GridToolbar>

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