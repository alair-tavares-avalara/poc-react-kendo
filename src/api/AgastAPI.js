import { formatParams } from '../utils/url';

class AgastAPI {
    static requestHeaders = () => ({ 'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`});

    static query(filters) {
        let url = `${process.env.REACT_APP_AGAST_MOCK_API_URL}/5a6224f2310000122cde7f24?${formatParams(filters)}`;

        const headers = this.requestHeaders();
        const request = new Request(url, {
            method: 'GET',
            headers: headers
        });

        return AgastAPI.fetchJson(request);
    }

    static get(id) {
        const headers = this.requestHeaders();
        const request = new Request(`${process.env.REACT_APP_AGAST_MOCK_API_URL}/5a6224f2310000122cde7f24/${id}`, {
            method: 'GET',
            headers: headers
        });

        return AgastAPI.fetchJson(request);
    }

    static put(agast) {
        const headers = Object.assign({ 'Content-Type': 'application/json' }, this.requestHeaders());
        const request = new Request(`${process.env.REACT_APP_AGAST_MOCK_API_URL}/5a6224f2310000122cde7f24/${agast.id}`, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(agast)
        });

        return AgastAPI.fetchJson(request);
    }

    static post(deputy) {
        const headers = Object.assign({ 'Content-Type': 'application/json' }, this.requestHeaders());
        const request = new Request(`${process.env.REACT_APP_AGAST_MOCK_API_URL}/5a6224f2310000122cde7f24`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(deputy)
        });

        return AgastAPI.fetchJson(request);
    }

    static list(searchText) {
        let url = `${process.env.REACT_APP_AGAST_MOCK_API_URL}/5a871f053200004d00f4e8e4?text=${searchText || 'brn'}`;

        const headers = this.requestHeaders();
        const request = new Request(url, {
            method: 'GET',
            headers: headers
        });

        return AgastAPI.fetchJson(request);
    }

    static fetchJson(request) {
        return fetch(request).then(response => response.json()).catch(error => error);
    }
}

export default AgastAPI;