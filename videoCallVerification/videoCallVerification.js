import { LightningElement, api, wire, track } from 'lwc';
import getAccountVideoCallStatus from '@salesforce/apex/VideoCallController.getAccountVideoCallStatus';

export default class VideoCallVerification extends LightningElement {
    @api recordId;
    @track showButton = false;
    @track accountOnfidoStatus;

    @wire(getAccountVideoCallStatus, { accountId: '$recordId' })
    wiredAccountOnfidoStatus({ error, data }) {
        if (data) {
            this.accountOnfidoStatus = data;
            this.checkStatus();
        } else if (error) {
            // Handle error if needed
            console.error('Error fetching account Onfido status:', error);
        }
    }

    checkStatus() {
        const status = this.accountOnfidoStatus;
        console.log('status:', status);
        if (status === 'Pending') {
            this.showButton = true;
        }
    }

    handleStartVerification() {
        this.openVerificationLink();
    }

    openVerificationLink() {
        const url = 'https://afdhealth--partial.sandbox.my.site.com/afd/s/videocall';
        window.open(url, '_blank');
    }
}
