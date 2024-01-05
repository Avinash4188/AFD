import { LightningElement, track,api } from 'lwc';
import fetchOpportunityLink from '@salesforce/apex/stripePaymentController.fetchOpportunityLink';
import fetchOpportunityStatus from '@salesforce/apex/stripePaymentController.fetchOpportunityStatus';
import { FlowAttributeChangeEvent } from 'lightning/flowSupport';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import finalSubmittion from '@salesforce/apex/finalSubmit.finalSubmittion';

const DELAY = 60000;

export default class StripePayment extends LightningElement {
    @api leadId;
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
            this.invoiceUrl = await fetchOpportunityLink({ leadId: this.leadId });
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

        this.dispatchEvent(new FlowAttributeChangeEvent('leadId', this.leadId));
        this.isWaiting = true;
        this.timer = setInterval(async () => {
            this.progressValue = (this.progressValue + 1) % 101;
			
            console.log('leadId',this.leadId);
			
            const result = await fetchOpportunityStatus({ leadId: this.leadId });
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
                // Call the finalSubmittion method and send the leadId
                finalSubmittion({ leadId: this.leadId })
                .then(result => {
                    // Handle the result if needed
                    console.log('Final Submission Result:', result);
                })
                .catch(error => {
                    // Handle any errors
                    console.error('Error calling finalSubmittion:', error);
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
        const result = await fetchOpportunityStatus({ leadId: this.leadId });
        
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