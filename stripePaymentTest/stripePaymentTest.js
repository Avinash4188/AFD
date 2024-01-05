import { LightningElement, track, api } from 'lwc';
import fetchOpportunityLink from '@salesforce/apex/stripePaymentController.fetchOpportunityLink';
import fetchOpportunityStatus from '@salesforce/apex/stripePaymentController.fetchOpportunityStatus';
import { FlowAttributeChangeEvent } from 'lightning/flowSupport';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const DELAY = 60000;

export default class StripePayment extends LightningElement {
    @api leadId = '00QD5000009r5JUMAY';
    @track invoiceUrl;
    @track isWaiting = false;
    @track isCompleted = false;
    @track progressValue = DELAY;
    @track countdown = Math.ceil(DELAY / 1000); // Display countdown in seconds
    @track showStartButton = true;
    @track showRetryButton = false;
    timer;
    countdownTimer;

    @track isNextButtonDisabled = true;
    @track isStartButtonDisabled = false;

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
        this.showStartButton = false; // Disable the "Start Payment" button
        this.timer = setInterval(async () => {
            this.progressValue -= 100; // Decrease by 100ms
            this.countdown = Math.ceil(this.progressValue / 1000); // Update countdown in seconds

            const result = await fetchOpportunityStatus({ leadId: this.leadId });

            if (this.isWaiting && result === 'Paid') {
                clearInterval(this.timer);
                clearInterval(this.countdownTimer); // Clear the countdown timer
                this.isWaiting = false;
                this.isCompleted = true;
                this.showStartButton = false;
                this.showRetryButton = true; // Show the "Retry" button
                this.isNextButtonDisabled = false; // Enable the "Next" button
                this.showCompletionToast();
            } else if (!this.isWaiting && this.progressValue <= 0) {
                clearInterval(this.timer);
                clearInterval(this.countdownTimer);
                this.showRetryButton = true;
                this.showStartButton = false;
                this.isStartButtonDisabled = false; // Enable the "Start Payment" button
            }
        }, 100);

        // Create a countdown timer
        this.countdownTimer = setInterval(() => {
            this.countdown -= 1;
            if (this.countdown <= 0) {
                clearInterval(this.timer); // Stop the main timer when countdown reaches zero
                clearInterval(this.countdownTimer);
                this.showRetryButton = true;
                this.showStartButton = false;
            }
        }, 1000);
    }

    async retry() {
        // Clear the previous timers before retrying
        clearInterval(this.timer);
        clearInterval(this.countdownTimer);

        // Retry logic
        this.showStartButton = true; // Show the "Start Payment" button
        this.showRetryButton = false; // Hide the "Retry" button
        this.isStartButtonDisabled = false; // Enable the "Start Payment" button
    }

    async showCompletionToast() {
        const result = await fetchOpportunityStatus({ leadId: this.leadId });

        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Status Changed',
                message: `The status is now '${result}'`,
                variant: 'info',
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