import * as ActionTypes from '../constants/actionTypes';
import { agastReducer, agastSaveReducer } from './AgastReducer';
import initialState from './initialState';
import { SCOPE_COMPANY } from '../constants/agastConstants';

const agastList = [{ "code": "3926.90.90BR", "hsCode": "39269090", "description": "Almofadas antiescaras", "id": "5822fb4e-b891-4d8e-bebc-3cd9644806ae" }, { "code": "3926.90.90BR1", "hsCode": "39269090", "description": "Prancheta de plástico", "id": "ca6c9cae-f318-476d-9196-0beca4315137" }, { "code": "3926.90.90BR2", "hsCode": "39269090", "description": "Chupetas e bicos para mamadeiras e para chupetas, de silicone", "id": "e0f996a4-d90a-4e50-8e5e-6cc2ae957ed0" }, { "code": "8536.50.90BR", "hsCode": "85365090", "description": "Interruptores, seccionadores e comutadores de uso automotivo", "id": "b02f5cd1-f58a-415b-8e3f-73fe772602f6" }, { "code": "8536.50.90BR1", "hsCode": "85365090", "description": "Starter", "id": "5548a9d7-37b2-4cad-be67-349206402841" }, { "code": "8536.50.90BR2", "hsCode": "85365090", "description": "Outros interruptores, seccionadores e comutadores não descritos nas posições 8536.50.10, 8536.50.20 e 8536.50.30, exceto de uso automotivo", "id": "0d06611c-941d-49d8-a0b8-252fb429b630" }, { "code": "BR07133391.001", "hsCode": "07133391", "description": "SEMENTE DE FEIJÃO PARA SEMEADURA (EXCETO SEMENTE DE FEIJÃO BRANCO E PRETO)", "id": "2b3e0fab-2dbd-4322-b48d-e843d3ae8655" }, { "code": "BR07133391.002", "hsCode": "07133391", "description": "SEMENTE DE FEIJÃO PARA SEMEADURA (EXCETO SEMENTE DE FEIJÃO BRANCO E PRETO)_Operação de indústria", "id": "080f6906-fed9-4864-8b96-ae89f0f9b1ab" }, { "code": "BR09030090.001", "hsCode": "09030090", "description": "MATE, EXCETO SIMPLESMENTE CANCHEADO", "id": "951d2367-9d0c-4937-a771-c7df76a577da" }, { "code": "BR10021000.001", "hsCode": "10021000", "description": "SEMENTE DE CENTEIO PARA SEMEADURA", "id": "4a7502da-5e85-4465-9d3e-c7297c45b567" }];

describe('Reducers::Agast', () => {
    const getAppState = () => {
        return { "agasts": [{ "code": "CARTUCHO", "description": "Reatores nucleares, caldeiras, máquinas, aparelhos e instrumentos mecânicos, e suas partes", "companyId": "40cf2158-1540-4af7-ba70-5e5c68bf100f", "hsCode": "84439923", "id": "221a87b9-3aac-4436-837e-1add746f7233" }, { "code": "FT-SAP", "description": "Teste SAP", "companyId": "40cf2158-1540-4af7-ba70-5e5c68bf100f", "id": "19d9b759-fb90-405b-a1c5-ee06ed82be3c" }, { "code": "LC-ANALISE", "description": "Análise de sistemas", "companyId": "40cf2158-1540-4af7-ba70-5e5c68bf100f", "hsCode": "0101", "id": "f59ffb4e-f117-47da-a26c-dee32ac28f18" }, { "code": "LC0702-SP002", "description": "Service due at city, regime forcado cumulativo, PCC, IRRF, INSS, INSS-for SIMPLES", "companyId": "40cf2158-1540-4af7-ba70-5e5c68bf100f", "id": "5dcb7e61-6acf-4f7f-aef3-a225155fc186" }, { "code": "TESTE0", "description": "TESTE ZERO", "companyId": "40cf2158-1540-4af7-ba70-5e5c68bf100f", "id": "20ce8f14-86a5-4c76-9f80-9ebe5ff25975" }, { "code": "12", "description": "desd", "id": "fc20344b-75ff-42cc-9281-bdcc71deea16" }, { "code": "3926.90.90BR", "hsCode": "39269090", "description": "Almofadas antiescaras", "id": "800ce203-97ec-446c-a27b-51029b94fbe4" }, { "code": "3926.90.90BR1", "hsCode": "39269090", "description": "Prancheta de plástico", "id": "f4a7dc31-4f3a-44fb-919f-41e91343e6e3" }, { "code": "3926.90.90BR2", "hsCode": "39269090", "description": "Chupetas e bicos para mamadeiras e para chupetas, de silicone", "id": "ff53e3e3-5b34-4a3d-ae68-cd335d73fe02" }, { "code": "430316", "hsCode": "85395000", "description": "SMT - Lamp. LED, Bulbo, A60, 6W, BIV, 3000K 430316", "id": "addc6de3-330c-4b30-aaa8-19bdd8419593" }, { "code": "430545", "hsCode": "85044029", "description": "INT - LED Driver, 12W/1A, BIV, IP20, 430545", "id": "6da01107-4ac6-422a-9cec-120582fe098a" }, { "code": "430583", "hsCode": "85044029", "description": "INT - LED Driver, 30W/2,5A, BIV, IP20, 430583", "id": "91715961-f426-4eab-b60f-2c0a4bc6a6e4" }, { "code": "430798", "hsCode": "85395000", "description": "INT - Lamp. LED, PAR30, DIM, 10W, 127V, 3000K, 430798", "id": "67d75810-2e1e-4621-aba2-29a3567b543b" }, { "code": "430811", "hsCode": "85395000", "description": "SMT - Lamp. LED, PAR20, 6W, BIV, 3000K, 430811", "id": "21c354d9-0341-46d4-8efe-38d1cd7738b5" }, { "code": "430835", "hsCode": "85395000", "description": "SMT - Lamp. LED, PAR30, 10W, BIV, 3000K, 430835", "id": "821d8759-04bf-4b10-bb5e-c781a7a9c03b" }], "page": "1", "pageSize": "10", "numPages": "32", "admin": true };
    };

    it('should set initial state by default', () => {
        const action = { type: 'unknown' };
        const expected = initialState.agastList;

        expect(agastReducer(undefined, action)).toEqual(expected);
    });

    it('should handle FETCH_AGAST_SUCCESS', () => {
        const action = { type: ActionTypes.FETCH_AGAST_SUCCESS, body: getAppState() };
        const expected = Object.assign(getAppState(), { totalCount: 32, page: 0, rowsPerPage: 10 });
        delete expected.numPages;
        delete expected.pageSize;

        expect(agastReducer(getAppState(), action)).toEqual(expected);
    });

    it('should handle FETCH_AGAST_FAILURE', () => {
        const action = { type: ActionTypes.FETCH_AGAST_FAILURE };
        const expected = initialState.agastList;

        expect(agastReducer(undefined, action)).toEqual(expected);
    });

    it('should handle FETCH_LIST_AGAST_SUCCESS', () => {
        const action = { type: ActionTypes.FETCH_LIST_AGAST_SUCCESS, body: agastList };
        const expected = agastList;

        expect(agastReducer(agastList, action)).toEqual(expected);
    });

    it('should handle SAVE_AGAST_SUCCESS', () => {
        const agast = {
            origin: 'Agast Origin',
            info: 'Agast Info',
            code: 'AGT1234',
            description: 'Agast description',
            company: 'Avalara BR',
            scope: SCOPE_COMPANY
        };

        const action = { type: ActionTypes.SAVE_AGAST_SUCCESS, body: agast };
        const expected = agast;

        expect(agastSaveReducer({}, action)).toEqual(expected);
    });
});