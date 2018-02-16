import React from 'react';

const style = {
    display: 'inline-block',
    color: '#f60',
    fontWeight: '600',
    fontSize: '2.0em'
};

const PageTitle = (props) => {
    return (
        <h4 style={style}>{props.children}</h4>
    );
};

export default PageTitle;