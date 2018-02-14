import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './AgastActions';
import * as types from '../constants/actionTypes';
import fetchMock from 'fetch-mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockBody = { "agasts": [{ "code": "CARTUCHO", "description": "Reatores nucleares, caldeiras, máquinas, aparelhos e instrumentos mecânicos, e suas partes", "companyId": "40cf2158-1540-4af7-ba70-5e5c68bf100f", "hsCode": "84439923", "id": "221a87b9-3aac-4436-837e-1add746f7233" }, { "code": "FT-SAP", "description": "Teste SAP", "companyId": "40cf2158-1540-4af7-ba70-5e5c68bf100f", "id": "19d9b759-fb90-405b-a1c5-ee06ed82be3c" }, { "code": "LC-ANALISE", "description": "Análise de sistemas", "companyId": "40cf2158-1540-4af7-ba70-5e5c68bf100f", "hsCode": "0101", "id": "f59ffb4e-f117-47da-a26c-dee32ac28f18" }, { "code": "LC0702-SP002", "description": "Service due at city, regime forcado cumulativo, PCC, IRRF, INSS, INSS-for SIMPLES", "companyId": "40cf2158-1540-4af7-ba70-5e5c68bf100f", "id": "5dcb7e61-6acf-4f7f-aef3-a225155fc186" }, { "code": "TESTE0", "description": "TESTE ZERO", "companyId": "40cf2158-1540-4af7-ba70-5e5c68bf100f", "id": "20ce8f14-86a5-4c76-9f80-9ebe5ff25975" }, { "code": "12", "description": "desd", "id": "fc20344b-75ff-42cc-9281-bdcc71deea16" }, { "code": "3926.90.90BR", "hsCode": "39269090", "description": "Almofadas antiescaras", "id": "800ce203-97ec-446c-a27b-51029b94fbe4" }, { "code": "3926.90.90BR1", "hsCode": "39269090", "description": "Prancheta de plástico", "id": "f4a7dc31-4f3a-44fb-919f-41e91343e6e3" }, { "code": "3926.90.90BR2", "hsCode": "39269090", "description": "Chupetas e bicos para mamadeiras e para chupetas, de silicone", "id": "ff53e3e3-5b34-4a3d-ae68-cd335d73fe02" }, { "code": "430316", "hsCode": "85395000", "description": "SMT - Lamp. LED, Bulbo, A60, 6W, BIV, 3000K 430316", "id": "addc6de3-330c-4b30-aaa8-19bdd8419593" }, { "code": "430545", "hsCode": "85044029", "description": "INT - LED Driver, 12W/1A, BIV, IP20, 430545", "id": "6da01107-4ac6-422a-9cec-120582fe098a" }, { "code": "430583", "hsCode": "85044029", "description": "INT - LED Driver, 30W/2,5A, BIV, IP20, 430583", "id": "91715961-f426-4eab-b60f-2c0a4bc6a6e4" }, { "code": "430798", "hsCode": "85395000", "description": "INT - Lamp. LED, PAR30, DIM, 10W, 127V, 3000K, 430798", "id": "67d75810-2e1e-4621-aba2-29a3567b543b" }, { "code": "430811", "hsCode": "85395000", "description": "SMT - Lamp. LED, PAR20, 6W, BIV, 3000K, 430811", "id": "21c354d9-0341-46d4-8efe-38d1cd7738b5" }, { "code": "430835", "hsCode": "85395000", "description": "SMT - Lamp. LED, PAR30, 10W, BIV, 3000K, 430835", "id": "821d8759-04bf-4b10-bb5e-c781a7a9c03b" }], "page": "1", "pageSize": "10", "numPages": "32", "admin": true };

describe('Actions: Agast', () => {
    afterEach(() => {
        fetchMock.reset()
        fetchMock.restore()
    })

    it('creates FETCH_AGAST_SUCCESS when fetching Agast has been done', () => {
        fetchMock
            .getOnce('http://www.mocky.io/v2/5a6224f2310000122cde7f24', { body: mockBody });

        const expectedActions = [
            { type: types.FETCH_AGAST_REQUEST },
            { type: types.FETCH_AGAST_SUCCESS, body: mockBody }
        ];
        const store = mockStore({});

        return store.dispatch(actions.fetchAgast()).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        });
    });
});