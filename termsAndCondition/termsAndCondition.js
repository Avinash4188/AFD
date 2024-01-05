import { LightningElement,wire,api } from 'lwc';
import {NavigationMixin,CurrentPageReference } from "lightning/navigation";

export default class AcmSuggestion extends NavigationMixin(LightningElement) {
showMembershipTermsOfService= true;
showMedicalTermsOfService=false;
showPrivacyPolicy=false;
showHipaPrivacyPolicy=false;
activeMembershipTermOfService="activeMe";
activeMedicalTermsOfService ="";
activePrivacyPolicy ="";
activeHipaPrivacyPolicy = "";

  screenId;
  @wire(CurrentPageReference)
  getScreenParameter(currentPageReference) { 
    if(currentPageReference){
        this.screenId = currentPageReference.state?.tcid;
    }
    switch (this.screenId) {
        case '1':
            this.handelMembershipTermOfService(null);
            break;
        case '2':
            this.handelMedicalTermsOfService(null);
            break;
        case '3':
            this.handelPrivacyPolicy(null);
            break;
            case '4':
                this.handelHipaPrivacyPolicy(null);
                break;
        default:
            this.handelMembershipTermOfService(null);
            break;
    }
    
}

  connectedCallback() {
    //this.getScreenParameter();
}
   

handelMembershipTermOfService(event){
    
    this.activeMembershipTermOfService="activeMe";
    this.activeMedicalTermsOfService ="";
    this.activePrivacyPolicy ="";
    this.activeHipaPrivacyPolicy = "";

    this.showMembershipTermsOfService = true;
    this.showMediacalTermsOfService=false;
    this.showPrivacyPolicy=false;
    this.showHipaPrivacyPolicy=false;

}
handelMedicalTermsOfService(event){
    this.activeMembershipTermOfService="";
    this.activeMedicalTermsOfService ="activeMe";
    this.activePrivacyPolicy ="";
    this.activeHipaPrivacyPolicy = "";

    this.showMembershipTermsOfService = false;
    this.showMedicalTermsOfService=true;
    this.showPrivacyPolicy=false;
    this.showHipaPrivacyPolicy=false;
    
}
handelPrivacyPolicy(event){

    this.activeMembershipTermOfService="";
    this.activeMedicalTermsOfService ="";
    this.activePrivacyPolicy ="activeMe";
    this.activeHipaPrivacyPolicy = "";
    
    this.showMembershipTermsOfService = false;
    this.showMedicalTermsOfService=false;
    this.showPrivacyPolicy=true;
    this.showHipaPrivacyPolicy=false;
    
}

handelHipaPrivacyPolicy(event){
    this.activeMembershipTermOfService="";
    this.activeMedicalTermsOfService ="";
    this.activePrivacyPolicy ="";
    this.activeHipaPrivacyPolicy = "activeMe";

    this.showMembershipTermsOfService = false;
    this.showMedicalTermsOfService=false;
    this.showPrivacyPolicy=false;
    this.showHipaPrivacyPolicy=true;
}

}