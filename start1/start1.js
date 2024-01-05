import { LightningElement, track, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import sendOTP from '@salesforce/apex/OTPHandler.sendOTP';
import verifyOTP from '@salesforce/apex/OTPHandler.verifyOTP';
import { NavigationMixin } from 'lightning/navigation';
import My_Resource from '@salesforce/resourceUrl/RegisterLWC';

export default class Start1 extends NavigationMixin(LightningElement) {
    @track firstName = '';
    @track lastName = '';
    @track email = '';
    @track otp = '';
    @track message = '';
    disabled= true;
    @track showNewButton = false;
    @track medicalCondition = true;

    @api emergency_icon = My_Resource + '/emergency-icon.png';
    @api icon_code = My_Resource + '/icon-code.png';
    @api icon_email = My_Resource + '/icon-email.png';
    @api user_icon = My_Resource + '/user-icon.png';

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
        if (!this.firstName || !this.lastName || !this.email) {
            this.message = 'All fields are required.';
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'All fields are required.',
                    variant: 'error',
                })
            );
            return;
        }
        
        sendOTP({ firstName: this.firstName, lastName: this.lastName, email: this.email })
            .then(result => {
                this.message = 'OTP sent successfully';
                this.disabled = false;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'OTP sent successfully! \
                        You will receive a email with One Time Password for Verification. \
                        Please Check your mail box.',
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
                        message: 'Failed to send OTP: It seems like you are already a registered user. If you cannot recall your password, please reset it.',
                        variant: 'error',
                    })
                );
                console.log('error.message:',error.message);
                
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

    Next(){
        const leadId = this.leadId;
        console.log('Lead ID:', leadId);
        
        const nextStepEvent = new CustomEvent('nextstep', {
            detail: { leadId: this.leadId }
        });
        this.dispatchEvent(nextStepEvent);
        //this.navigateToLwc(leadId);
    }
    navigateToLwc(leadId){
        this[NavigationMixin.Navigate]({
            type: 'standard__component',
            attributes: {
                componentName: "c__medicalCondition"
            },
            state: {
                leadId: leadId
            }
            
        });
    }
}