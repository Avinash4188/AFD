import { LightningElement, track,api } from 'lwc';
import fetchOpportunityLink from '@salesforce/apex/stripePaymentPortalController.fetchOpportunityLink';
import fetchOpportunityStatus from '@salesforce/apex/stripePaymentPortalController.fetchOpportunityStatus';
import { FlowAttributeChangeEvent } from 'lightning/flowSupport';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import leadData from '@salesforce/apex/finalPortalSubmit.leadData';

const DELAY = 60000;

export default class StripePaymentCopy extends LightningElement {
    @api accountId = '001D500001LNoNqIAL';
    @track invoiceUrl;
    @track isWaiting = false;
    @track isCompleted = false;
    @track progressValue = 0;
    @track showStartButton = true;
    @track showRetryButton = false;
    timer;

    @track isNextButtonDisabled = true;

    async fetchOpportunityLink() {
        try {
            this.invoiceUrl = await fetchOpportunityLink({ accountId: this.accountId });
        } catch (error) {
            // Handle the error here
        }
    }

    startPayment() {
        if (!this.invoiceUrl) {
            this.fetchOpportunityLink().then(() => {
                this.openInvoiceUrlInNewTab();
            });
        } else {
            this.openInvoiceUrlInNewTab();
        }

        this.dispatchEvent(new FlowAttributeChangeEvent('accountId', this.accountId));
        this.isWaiting = true;
        this.timer = setInterval(async () => {
            this.progressValue = (this.progressValue + 1) % 101;
			
            console.log('accountId',this.accountId);
			
            const result = await fetchOpportunityStatus({ accountId: this.accountId });
            console.log('result',result);
            
            if (this.isWaiting && result === 'Paid') {
                clearInterval(this.timer);
                this.isWaiting = false;
                this.isCompleted = true;
                this.showStartButton = false;
                this.isNextButtonDisabled = false; // Enable the "Next" button
                this.showCompletionToast();   
                const nextStepEvent = new CustomEvent('nextstep');
                this.dispatchEvent(nextStepEvent);
                // Call the finalSubmittion method and send the accountId
                leadData({ accountId: this.accountId })
                .then(result => {
                    // Handle the result if needed
                    console.log('Final Submission Result:', result);
                })
                .catch(error => {
                    // Handle any errors
                    console.error('Error calling leadData:', error);
                });     
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
        this.startPayment();
    }
    
    async showCompletionToast() {
        const result = await fetchOpportunityStatus({ accountId: this.accountId });
        
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: `The status is now '${result}'`,
                variant: 'success',
            })
        );
    }

    openInvoiceUrlInNewTab() {
        if (this.invoiceUrl) {
            window.open(this.invoiceUrl, '_blank');
        }
    }

    async handleNext() {
        console.log("handle next");
        // Handle the logic for the "Next" button click here
        // You can perform any necessary actions when the status is "Completed"
    }
}