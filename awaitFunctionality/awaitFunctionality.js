import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import checkLeadStatus from '@salesforce/apex/AwaitFunctionalityController.checkLeadStatus';
import fetchLink from '@salesforce/apex/AwaitFunctionalityController.fetchLink';
import { FlowAttributeChangeEvent } from 'lightning/flowSupport';

const DELAY = 60000; // 1 minutes in milliseconds

export default class AwaitFunctionality extends LightningElement {
    @api leadId = '00QD5000009qXrLMAU';
    @track verificationUrl;
    @track isWaiting = false;
    @track isCompleted = false;
    @track progressValue = 0;
    @track showStartButton = true;
    @track showRetryButton = false;
    timer;

    isNextButtonDisabled = true;

    async fetchLink() {
        try {
            this.verificationUrl = await fetchLink({ leadId: this.leadId });
        } catch (error) {
            // Handle the error here
        }
    }

    async startWaiting() {
        if (!this.verificationUrl) {
            this.fetchLink().then(() => {
                this.openVerificationUrlInNewTab();
            });
        } else {
            this.openVerificationUrlInNewTab();
        }

        this.dispatchEvent(new FlowAttributeChangeEvent('leadId', this.leadId));

        this.isWaiting = true;
        this.timer = setInterval(async () => {
            this.progressValue = (this.progressValue + 1) % 101;
			
            console.log('leadId',this.leadId);
			
            const result = await checkLeadStatus({ leadId: this.leadId });
            console.log('result',result);
            const status = result.Onfido_Status__c;
            console.log('status',status);
            
            if (this.isWaiting && status === 'Completed') {
                clearInterval(this.timer);
                this.isWaiting = false;
                this.isCompleted = true;
                this.showStartButton = false;
                this.isNextButtonDisabled = false; // Enable the "Next" button
                this.showCompletionToast();
            }else if (!this.isWaiting && this.progressValue >= 100) {
                clearInterval(this.timer);
                this.showRetryButton = true;
                this.showStartButton = false; // Hide the Start button
            }
        }, DELAY / 100);
    }

    async retry() {
        // Clear the previous timer (if any) before retrying
        clearInterval(this.timer);

        // Retry logic
        this.startWaiting();
    }

    async showCompletionToast() {
        const result = await checkLeadStatus({ leadId: this.leadId });
        const status = result.Onfido_Status__c;
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Status Changed',
                message: `The status is now '${status}'`,
                variant: 'info',
            })
        );
    }

    openVerificationUrlInNewTab() {
        if (this.verificationUrl) {
            window.open(this.verificationUrl, '_blank');
        }
    }

    async handleNext() {
        this.showCompletionToast();
        // Handle the logic for the "Next" button click here
        // You can perform any necessary actions when the status is "Completed"
    }
}