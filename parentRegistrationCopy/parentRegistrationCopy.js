import { LightningElement, track, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class ParentRegistrationCopy extends NavigationMixin(LightningElement) {
    @track currentStep = 1;
    @track progressValue = 0;
    @api accountId;
    @track showSpinner = false;
    @track renderProgress = false;
    @track selectedCard = ''; // Track the selected card in c-card-component

    get showProgress() {
        if(this.currentStep >1){           
            return true;
    }
    else{
      return false;
    }
    }

    get renderSpinner() {
        if(!this.showSpinner){
            // Simulate a 3-second delay to hide the spinner
            setTimeout(() => {
                this.showSpinner = true;
            }, 8000);
            return true;
        } 
        else{
            return false;
        }
    }
    get getCardComponent() {
        if (this.currentStep === 1) {

            this.showSpinner = false;
             return true;
         }
         else{
             return false;
         }
    }
    get getMedicalCondition() {
        
        console.log('medical-condition');
        this.showSpinner = false;
        return this.selectedCard === 'medical-condition' && this.currentStep === 2;
    }

    get getLabsTest() {
        console.log('lab-testing');
        this.showSpinner = false;
        return this.selectedCard === 'lab-testing' && this.currentStep === 2;
    }

    get getBaselineQuestionList() {
        this.showSpinner = false;
        if (this.selectedCard === 'medical-condition' && this.currentStep === 3) {
            return this.currentStep === 3;
        } else if(this.selectedCard === 'lab-testing' && this.currentStep === 3){
            this.currentStep = 4;
            return false;
        }
    }
    

    get getPaymentStripe(){
        console.log('lab-testing');
        this.showSpinner = false;
        return this.currentStep === 4;
    }

    get getThankyou(){
        console.log('thankyou');
        this.showSpinner = false;
        return this.currentStep === 5;
    }
    handleNextStep(event) {
        // Handle next step logic here
        if (this.currentStep === 1) {
            // Transition to the second step
            this.currentStep = 2;
            
            this.updateProgress2();
        } else if (this.currentStep === 2) {
            // Transition to the third step
            this.currentStep = 3;
            this.updateProgress3();
        } else if (this.currentStep === 3) {
            // Transition to the fourth step
            this.currentStep = 4;
            this.updateProgress4();
        } else if (this.currentStep === 4) {
            // Transition to the fifth step
            this.currentStep = 5;
            this.updateProgress5();
        } 
    }
    handlePreviousStep() {
        console.log('handlePreviousStep');
        if (this.currentStep === 5) {
            this.currentStep = 4;
            this.updateProgress();
        }else if (this.currentStep === 4) {
            this.currentStep = 3;
            this.updateProgress();
        }else if (this.currentStep === 3) {
            this.currentStep = 2;
            this.updateProgress();
        }else if (this.currentStep === 2) {
            this.currentStep = 1;
            this.updateProgress();
        }
    }

    updateProgress() {
        if (this.progressValue < 100) {
            this.progressValue -= 25;
        }
    }

    updateProgress2() {
        
        if (this.progressValue < 100) {
            this.progressValue += 25;
        }
    }

    updateProgress3() {
        if (this.progressValue < 100) {
            this.progressValue += 25;
        }
    }

    updateProgress4() {
        if (this.progressValue < 100) {
            this.progressValue += 25;
        }
    }

    updateProgress5() {
        if (this.progressValue <= 100) {
            this.progressValue = 100;
        }
    }

   


    handleCardClick(event) {
        this.selectedCard = event.detail.cardType;
        if (this.selectedCard === 'medical-condition') {
            console.log('handleCardClick'+this.selectedCard);
            this.currentStep = 2;
            this.updateProgress2();
        } else if (this.selectedCard === 'lab-testing') {
            this.currentStep = 2;
            this.updateProgress2();
        }
    }
}