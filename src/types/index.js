import PropTypes from 'prop-types';

const { shape, string } = PropTypes;

export const agast = shape({
    origin: string,
    info: string,
    code: string,
    description: string,
    company: string
});