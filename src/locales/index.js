import {translate as t} from 'react-i18next';
import i18n from './i18n';

export function translate(ref, namespaces) {
    if (typeof namespaces === 'string') {
        namespaces = [namespaces];
    }

    namespaces = ['common', ...namespaces || []];
    return t(namespaces)(ref);
}

export default i18n;