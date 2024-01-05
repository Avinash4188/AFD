import { LightningElement } from 'lwc';

export default class RegistrationSuccess extends LightningElement {

    handleClick(event){
        const loginUrl = window.location.origin +'/afd/s/login';
        if (loginUrl) {
                window.open(loginUrl, '_blank');
        }
    }
}