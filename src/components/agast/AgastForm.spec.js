import React from 'react';
import { PureAgastForm as AgastForm } from './AgastForm';
import initialState from "../../reducers/initialState";
import { SCOPE_COMPANY, SCOPE_GLOBAL } from '../../constants/agastConstants';
import { wrap } from 'module';

const saveClick = jest.fn();
const cancelClick = jest.fn();
const agastList = [{ "code": "3926.90.90BR", "hsCode": "39269090", "description": "Almofadas antiescaras", "id": "5822fb4e-b891-4d8e-bebc-3cd9644806ae" }, { "code": "3926.90.90BR1", "hsCode": "39269090", "description": "Prancheta de plástico", "id": "ca6c9cae-f318-476d-9196-0beca4315137" }, { "code": "3926.90.90BR2", "hsCode": "39269090", "description": "Chupetas e bicos para mamadeiras e para chupetas, de silicone", "id": "e0f996a4-d90a-4e50-8e5e-6cc2ae957ed0" }, { "code": "8536.50.90BR", "hsCode": "85365090", "description": "Interruptores, seccionadores e comutadores de uso automotivo", "id": "b02f5cd1-f58a-415b-8e3f-73fe772602f6" }, { "code": "8536.50.90BR1", "hsCode": "85365090", "description": "Starter", "id": "5548a9d7-37b2-4cad-be67-349206402841" }, { "code": "8536.50.90BR2", "hsCode": "85365090", "description": "Outros interruptores, seccionadores e comutadores não descritos nas posições 8536.50.10, 8536.50.20 e 8536.50.30, exceto de uso automotivo", "id": "0d06611c-941d-49d8-a0b8-252fb429b630" }, { "code": "BR07133391.001", "hsCode": "07133391", "description": "SEMENTE DE FEIJÃO PARA SEMEADURA (EXCETO SEMENTE DE FEIJÃO BRANCO E PRETO)", "id": "2b3e0fab-2dbd-4322-b48d-e843d3ae8655" }, { "code": "BR07133391.002", "hsCode": "07133391", "description": "SEMENTE DE FEIJÃO PARA SEMEADURA (EXCETO SEMENTE DE FEIJÃO BRANCO E PRETO)_Operação de indústria", "id": "080f6906-fed9-4864-8b96-ae89f0f9b1ab" }, { "code": "BR09030090.001", "hsCode": "09030090", "description": "MATE, EXCETO SIMPLESMENTE CANCHEADO", "id": "951d2367-9d0c-4937-a771-c7df76a577da" }, { "code": "BR10021000.001", "hsCode": "10021000", "description": "SEMENTE DE CENTEIO PARA SEMEADURA", "id": "4a7502da-5e85-4465-9d3e-c7297c45b567" }];
const props = {
    t: key => key,
    agastList: agastList,
    onSaveClick: saveClick,
    onCancelClick: cancelClick,
    agast: initialState.agast
};

describe('<AgastForm />', () => {
    it('should setting props', () => {
        const wrapper = mount(
            <AgastForm {...props} />
        );

        expect(wrapper.props().agastList.length).toEqual(10);
        expect(wrapper.props().agast).toEqual(initialState.agast);
    });

    it('should call onChange when text input changes', () => {
        const onChange = jest.fn();

        const wrapper = mount(<AgastForm
            {...props}
            onChange={onChange}
        />);

        expect(onChange).not.toBeCalled();
        simulateChange(wrapper, 'origin', 'Agast Origin');
        expect(onChange).toBeCalled();
    });

    it('should fill out the form and enable save button', () => {
        const wrapper = mount(<AgastForm {...props} />);

        expect(wrapper.state().formIsInvalid).toBeTruthy();
        expect(wrapper.find('button#saveButton').render().attr('disabled')).toEqual('disabled');

        const allInputs = wrapper.find('input');
        const agast = {
            origin: 'Agast Origin',
            info: 'Agast Info',
            code: 'AGT1234',
            description: 'Agast description',
            company: 'Avalara BR'
        };

        simulateChangeAll(wrapper, agast);

        expect(allInputs.length).toEqual(7);

        expect(allInputs.at(0).props().name).toEqual('origin');
        expect(allInputs.at(0).render().val()).toEqual(agast.origin);
        expect(wrapper.state().agast.origin).toEqual(agast.origin);

        expect(allInputs.at(1).props().name).toEqual('info');
        expect(allInputs.at(1).render().val()).toEqual(agast.info);
        expect(wrapper.state().agast.info).toEqual(agast.info);

        expect(allInputs.at(2).props().name).toEqual('code');
        expect(allInputs.at(2).render().val()).toEqual(agast.code);
        expect(wrapper.state().agast.code).toEqual(agast.code);

        expect(allInputs.at(3).props().name).toEqual('description');
        expect(allInputs.at(3).render().val()).toEqual(agast.description);
        expect(wrapper.state().agast.description).toEqual(agast.description);

        expect(allInputs.at(4).props().name).toEqual('scope');
        expect(allInputs.at(4).render().val()).toEqual(SCOPE_GLOBAL);

        expect(allInputs.at(5).props().name).toEqual('scope');
        expect(allInputs.at(5).render().val()).toEqual(SCOPE_COMPANY);

        expect(wrapper.state().agast.scope).toEqual(SCOPE_COMPANY);

        expect(allInputs.at(6).props().name).toEqual('company');
        expect(allInputs.at(6).render().val()).toEqual(agast.company);
        expect(wrapper.state().agast.company).toEqual(agast.company);

        expect(wrapper.find('button#saveButton').render().attr('disabled')).toBeUndefined();
    });

    it('should hidden input company when scope is global', () => {
        const wrapper = mount(
            <AgastForm {...props} />
        );

        expect(wrapper.state().agast.scope).toEqual(SCOPE_COMPANY);
        expect(wrapper.find('input[name="company"]').length).toEqual(1);

        const changeEvent = { target: { name: 'scope', value: SCOPE_GLOBAL } };
        let input = wrapper.find('input[id="global"]').simulate('change', changeEvent);

        expect(wrapper.state().agast.scope).toEqual(SCOPE_GLOBAL);
        expect(wrapper.find('input[name="company"]').length).toEqual(0);
    });

    it('should open agast popup list when "origin" exceeds 2 chars ', () => {
        const wrapper = mount(
            <AgastForm {...props} />
        );

        wrapper.setProps({ agastList: agastList });

        expect(wrapper.props().agastList.length).toEqual(10);
        expect(wrapper.state().agastList.length).toEqual(10);

        expect(wrapper.find('.k-popup').length).toEqual(0);
        expect(wrapper.state().show).toBeFalsy();

        simulateChange(wrapper, 'origin', 'BRN');

        expect(wrapper.find('.k-popup').length).toBeGreaterThan(0);
        expect(wrapper.state().show).toBeTruthy();

        expect(wrapper.find('.agast-item-popup').length).toEqual(10);

        const firstItem = wrapper.find('.agast-item-popup').first();
        firstItem.simulate('click', { target: { keepOpen: true } });

        expect(firstItem.render().text()).toEqual('3926.90.90BR - Almofadas antiescaras');

        expect(wrapper.state().agast.origin).toEqual('3926.90.90BR');
        expect(wrapper.state().agast.info).toEqual('Almofadas antiescaras');
    });

    it('should handle save', () => {
        const agast = {
            origin: 'Agast Origin',
            info: 'Agast Info',
            code: 'AGT1234',
            description: 'Agast description',
            company: 'Avalara BR'
        };

        const agastExpected = Object.assign({ scope: SCOPE_COMPANY }, agast);

        const wrapper = mount(
            <AgastForm {...props} />
        );

        expect(wrapper.state().formIsInvalid).toBeTruthy();

        simulateChangeAll(wrapper, agast);

        expect(wrapper.state().formIsInvalid).toBeFalsy();
        expect(wrapper.find('button#saveButton').render().attr('disabled')).toBeUndefined();
        expect(saveClick).not.toBeCalled();

        wrapper.find('button#saveButton').simulate('click');

        expect(saveClick).toBeCalledWith(agastExpected);
    });

    it('should handle cancel', () => {
        const wrapper = mount(
            <AgastForm {...props} />
        );

        wrapper.find('button#cancelButton').simulate('click');

        expect(cancelClick).toBeCalled();
    });
});