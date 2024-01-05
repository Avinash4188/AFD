import { LightningElement,track,api } from 'lwc';

export default class RegistrationParentLWC extends LightningElement {
     @track currentStep = 1;
    @track progressValue = 0;
    @api leadId;
    @track showSpinner = false;
    @track renderProgress = false;
    get showProgress(){
        if(this.currentStep >1){
            // Simulate a 3-second delay to hide the spinner
           
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
}
else{
  return false;
}
   }

   get getStarted(){
    if (this.currentStep === 1) {

       this.showSpinner = false;
        return true;
    }
    else{
        return false;
    }
}

    get getStartStep(){
    if (this.currentStep === 2) {

       this.showSpinner = false;
        return true;
    }
    else{
        return false;
    }
}

  get getStep2(){
       
        if (this.currentStep === 3){
            this.showSpinner = false;
            return true;
        }
        else{
            return false;
        }
       
    }
    get getStep3(){
       
        if (this.currentStep === 4){
            this.showSpinner = false;
            return true;
        }
        else{
            return false;
        }
       
    }
    get getStep4(){
       
        if (this.currentStep === 5){
            this.showSpinner = false;
            return true;
        }
        else{
            return false;
        }
       
    }
    get getStep5(){
       
        if (this.currentStep === 6){
            this.showSpinner = false;
            return true;
        }
        else{
            return false;
        }
       
    }
    get getStep6(){
       
        if (this.currentStep === 7){
            this.showSpinner = false;
            return true;
        }
        else{
            return false;
        }
       
    }
    handleNextStep(event) {

        // Handle next step logic here
        if (this.currentStep === 1) {
            
            // Transition to the second step
            this.currentStep = 2;
            //this.leadId = event.detail.leadId;
            //this.updateProgress2();
        } 
        else if (this.currentStep === 2) {
            // Transition to the third step
            this.leadId = event.detail.leadId;  
            this.currentStep = 3;
            this.updateProgress2();
        }
        else if (this.currentStep === 3) {
            // Transition to the third step
            this.currentStep = 4;
            this.updateProgress3();
        }
        else if (this.currentStep === 4) {
            // Transition to the third step
            this.currentStep = 5;
            this.updateProgress3();
        }
        else if (this.currentStep === 5) {
            // Transition to the third step
            this.currentStep = 6;
            this.updateProgress3();
        }
        else if (this.currentStep === 6) {
            // Transition to the third step
            this.currentStep = 7;
            this.updateProgress3();
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
}