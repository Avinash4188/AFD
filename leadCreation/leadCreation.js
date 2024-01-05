import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import sendOTP from '@salesforce/apex/OTPHandler.sendOTP';
import verifyOTP from '@salesforce/apex/OTPHandler.verifyOTP';
import { NavigationMixin } from 'lightning/navigation';
//import { OmniscriptBaseMixin } from 'omnistudio/omnistudioBaseMixin';

export default class leadCreation extends NavigationMixin(LightningElement) {
    @track firstName = '';
    @track lastName = '';
    @track email = '';
    @track otp = '';
    @track message = '';
    disabled= true;
    @track showNewButton = false;

    handleFirstNameChange(event) {
        this.firstName = event.target.value;
    }

    handleLastNameChange(event) {
        this.lastName = event.target.value;
    }

    handleEmailChange(event) {
        this.email = event.target.value;
    }

    handleOTPChange(event) {
        this.otp = event.target.value;
    }

    sendOTP() {
        sendOTP({ firstName: this.firstName, lastName: this.lastName, email: this.email })
            .then(result => {
                this.message = 'OTP sent successfully';
                this.disabled = false;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'OTP sent successfully!',
                        variant: 'success',
                    })
                );
                this.leadId = result;
                console.log('Stored Lead ID:', this.leadId, result);
                
            })
            .catch(error => {
                this.message = 'Error sending OTP' , error.body.message;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: 'Failed to send OTP:  ' + error.message,
                        variant: 'error',
                    })
                );
                
            });
    }

    verifyOTP() {
        verifyOTP({ email: this.email, enteredOTP: this.otp })
            .then(result => {
                if (result) {
                    this.message = 'OTP verified successfully';
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'OTP verified successfully',
                            variant: 'success',
                        })
                    );
                    this.showNewButton = true;
                } else {
                    this.message = 'Invalid OTP';
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Error',
                            message: 'Invalid OTP',
                            variant: 'error',
                        })
                    );
                }
            })
            .catch(error => {
                this.message = 'Error verifying OTP';
                console.error('Error creating lead:', error);
            });
    }

    Next() {
     /* var data = {
            person: {
                name: this.leadId
            }
        }
        this.omniApplyCallResp(data);*/
        const leadId = this.leadId;
        console.log('Lead ID:', leadId);
        //this.omniNextStep();
       this.navigateToOmniScript(leadId);
    }

    navigateToOmniScript(leadId){
        this[NavigationMixin.Navigate]({
            type: 'standard__component',
            attributes: {
                componentName: 'omnistudio__vlocityLWCOmniWrapper'
            },
            state: {
                c__target: 'c:telemedFormsTelemedFormsEnglish',
                c__layout: 'lightning', // or can be 'newport'
                c__tabIcon: 'custom:custom18',
                c__tabLabel: 'TelemedForms',
            }
        })

    }
    
   /* navigateToOmniScript(leadId) {
        this.dispatchEvent(
            new CustomEvent('navigate', {
                detail: {
                    type: 'standard__navItemPage',
                    attributes: {
                        apiName: 'telemedFormsTelemedFormsEnglish' // Replace with the actual OmniScript API Name
                    },
                    state: {
                        c__leadId: leadId
                    }
                }
            })
        );
    }*/
}