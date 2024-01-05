import { LightningElement } from 'lwc';

export default class RegistrationSuccessPortal extends LightningElement {

    redirectToLogin() {
        // Implement your logic to redirect to the login page
        // Example:
        // window.location.href = '/login'; // Replace with your actual login URL
    }
    handleClick(event){
        const loginUrl = window.location.origin +'/afd/s/';
        if (loginUrl) {
                window.open(loginUrl, '_blank');
        }
    }
}