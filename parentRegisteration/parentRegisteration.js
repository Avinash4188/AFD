import { LightningElement, track, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class ParentRegisteration extends NavigationMixin(LightningElement) {
    @track currentStep = 2;
    @track progressValue = 0;
    @api leadId;
    @track showSpinner = false;
    @track renderProgress = false;
    @track selectedCard = ''; // Track the selected card in c-card-component

    get showProgress() {
        if(this.currentStep >2){           
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
            }, 2000);
            return true;
        } else{
            return false;
        }
    }

    get getStartStep() {
        if (this.currentStep === 2) {

            this.showSpinner = false;
             return true;
         }
         else{
             return false;
         }
    }

    get getTermsOfService() {
        if (this.currentStep === 3){
            this.showSpinner = false;
            return true;
        }
        else{
            return false;
        }
    }

    get getCardComponent() {
        this.showSpinner = false;
        return this.currentStep === 4;
    }

    get getMedicalCondition() {
        this.showSpinner = false;
        return this.selectedCard === 'medical-condition' && this.currentStep === 5;
    }

    get getLabsTest() {
        this.showSpinner = false;
        return this.selectedCard === 'lab-testing' && this.currentStep === 5;
    }

    get getStateSelector() {
        this.showSpinner = false;
        return this.currentStep === 6;
    }

    get getBasicIntake() {
        this.showSpinner = false;
        return this.currentStep === 7;
    }

    get getBaselineHealth() {
        this.showSpinner = false;
        return this.currentStep === 8;
    }

    get getPharmacy(){
        this.showSpinner = false;
        return this.currentStep === 9;
    }

    get getBaselineQuestionList() {
        this.showSpinner = false;
        if (this.selectedCard === 'medical-condition' && this.currentStep === 10) {
            return this.currentStep === 10;
        } else if(this.selectedCard === 'lab-testing' && this.currentStep === 10){
            this.currentStep = 11;
            return false;
        }
    }
    

    get getPaymentStripe(){
        console.log('lab-testing');
        this.showSpinner = false;
        return this.currentStep === 11;
    }

    get getThankyou(){
        this.showSpinner = false;
        return this.currentStep === 12;
    }

    

    

    handleNextStep(event) {
        // Handle next step logic here
        if (this.currentStep === 2) {
            // Transition to the third step
            this.leadId = event.detail.leadId;
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
        } else if (this.currentStep === 5) {
            // Transition to the sixth step
            this.currentStep = 6;
            this.updateProgress6();
        } else if (this.currentStep === 6) {
            // Transition to the seventh step
            this.currentStep = 7;
            this.updateProgress7();
        } else if (this.currentStep === 7) {
            // Transition to the Eighth step
            this.currentStep = 8;
            this.updateProgress8();
        } else if (this.currentStep === 8) {
            // Transition to the Nineth step
            this.currentStep = 9;
            this.updateProgress9();
        } else if (this.currentStep === 9) {
            // Transition to the Tenth step
            this.currentStep = 10;
            this.updateProgress10();
        }else if (this.currentStep === 10) {
            // Transition to the Eleventh step
            this.currentStep = 11;
            this.updateProgress11();
        }else if (this.currentStep === 11) {
            // Transition to the Twelth step
            this.currentStep = 12;
            this.updateProgress12();
        }else if (this.currentStep === 12) {
            // Transition to the Twelth step
            this.currentStep = 13;
            this.updateProgress13();
        }
    }
    handlePreviousStep() {
        console.log('handlePreviousStep');
        if (this.currentStep === 5) {
            this.currentStep = 4;
            this.updateProgress();
        }else if (this.currentStep === 6) {
            this.currentStep = 5;
            this.updateProgress();
        }else if (this.currentStep === 7) {
            this.currentStep = 6;
            this.updateProgress();
        }else if (this.currentStep === 8) {
            this.currentStep = 7;
            this.updateProgress();
        }else if (this.currentStep === 9) {
            this.currentStep = 8;
            this.updateProgress();
        }else if (this.currentStep === 10) {
            this.currentStep = 9;
            this.updateProgress();
        }else if (this.currentStep === 11) {
            this.currentStep = 10;
            this.updateProgress();
        }
    }

    updateProgress() {
        if (this.progressValue < 100) {
            this.progressValue -= 10;
        }
    }

    updateProgress2() {
        
        if (this.progressValue < 100) {
            this.progressValue += 10;
        }
    }

    updateProgress3() {
        if (this.progressValue < 100) {
            this.progressValue += 10;
        }
    }

    updateProgress4() {
        if (this.progressValue < 100) {
            this.progressValue += 10;
        }
    }

    updateProgress5() {
        if (this.progressValue < 100) {
            this.progressValue += 10;
        }
    }

    updateProgress6() {
        if (this.progressValue < 100) {
            this.progressValue += 10;
        }
    }

    updateProgress7() {
        if (this.progressValue < 100) {
            this.progressValue += 10;
        }
    }

    updateProgress8() {
        if (this.progressValue < 100) {
            this.progressValue += 10;
        }
    }

    updateProgress9() {
        if (this.progressValue < 100) {
            this.progressValue += 10;
        }
    }

    updateProgress10() {
        if (this.progressValue < 100) {
            this.progressValue += 10;
        }
    }

    updateProgress11() {
        if (this.progressValue < 100) {
            this.progressValue += 10;
        }
    }

    updateProgress12() {
        if (this.progressValue < 100) {
            this.progressValue += 10;
        }
    }
    updateProgress13() {
        if (this.progressValue < 100) {
            this.progressValue += 10;
        }
    }
    
    handleCardClick(event) {
        this.selectedCard = event.detail.cardType;
        if (this.selectedCard === 'medical-condition') {
            this.currentStep = 5;
            this.updateProgress4();
        } else if (this.selectedCard === 'lab-testing') {
            this.currentStep = 5;
            this.updateProgress4();
        }
    }
}