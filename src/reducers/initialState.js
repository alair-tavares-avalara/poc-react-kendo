import { SCOPE_COMPANY } from '../constants/agastConstants';

export default {
    agastList: {
        admin: false,
        agasts: [],
        numPages: 0,
        page: 0,
        pageSize: 0
    },
    agast: {
        origin: '',
        info: '',
        code: '',
        description: '',
        scope: SCOPE_COMPANY,
        company: ''
    }
};