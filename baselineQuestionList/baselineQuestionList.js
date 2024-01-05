import { LightningElement, track,api } from 'lwc';
import getQuestionsAndResponsesByMedicalCondition from '@salesforce/apex/BaselineQuestionHandler.getQuestionsAndResponsesByMedicalCondition';
import saveResponses from '@salesforce/apex/BaselineQuestionHandler.saveResponses';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
const QUESTIONS_PER_PAGE = 6; // Number of questions to display per page

export default class BaselineQuestionLWC extends LightningElement {
    
    @api leadId;
    @track questions = [];
    @track responses = [];
    @track questionId;
    @track multiSelectOption = [];
    @track radioOption = [];
    @track picklist = '';
    @track multiSelect = [];
    @track radio = false;
    @track currentPage = 1;
    @track displayedQuestions = [];

    get isFirstPage() {
        return this.currentPage === 1;
    }

    get isLastPage() {
        return this.currentPage === Math.ceil(this.questions.length / QUESTIONS_PER_PAGE);
    }

    get acceptedFormats() {
        return ['.pdf', '.png','.jpeg','.docx'];
    }

    connectedCallback() {
        this.fetchQuestions();
    }

    fetchQuestions() {
        getQuestionsAndResponsesByMedicalCondition({ leadID: this.leadId })
            .then(result => {
                console.log('result', result);
                this.questions = this.processQuestions(result);
                this.updateDisplayedQuestions();
            })
            .catch(error => {
                console.error('Error fetching questions:', error);
            });
    }

    updateDisplayedQuestions() {
        const startIndex = (this.currentPage - 1) * QUESTIONS_PER_PAGE;
        const endIndex = startIndex + QUESTIONS_PER_PAGE;
        this.displayedQuestions = this.questions.slice(startIndex, endIndex);

        // Show the Save button only on the last page
        this.showSaveButton = this.isLastPage;
    }

    previousPage() {
        if (!this.isFirstPage) {
            this.currentPage -= 1;
            this.updateDisplayedQuestions();
        }
    }

    nextPage() {
        if (!this.validateFields()) {
            // Validation failed, do not proceed
            return;
        }
        const inputFields = this.template.querySelectorAll('lightning-input');
        inputFields.forEach(inputField => {
            if (!inputField.value) {
                inputField.setCustomValidity('Error: Response is required');
                inputField.reportValidity();
                isValid = false;
            } else {
                inputField.setCustomValidity('');
            }
        });
        if (!this.isLastPage) {
            this.currentPage += 1;
            this.updateDisplayedQuestions();
        }
    }

    processQuestions(data) {
        return data.map(question => {
            const responseFields = this.getResponseFields(question);
            console.log('responseFields',responseFields);
            return {
                Id: question.questionId,
                Sort_Order__c: question.sortOrder,
                Question__c: question.question,
                Response__c: question.response,
                Additional_Information__c: question.additionalInformation,
                responseFields,
            };
        });
    }

    getResponseFields(question) {
        const responseFields = [];
        const responseFieldType = question.responseFieldType;
        const responseFieldValues = question.responseFieldValues;
        const additionalFieldsType = question.additionalInformationFieldType;
        
        if (responseFieldType === 'text' ) {
            responseFields.push({
                isText: true,
            });
            if(additionalFieldsType === 'textarea'){
                responseFields.push({
                    isAdditionalTypeText: 'text',
                });
            }else if (additionalFieldsType === 'date') {
                responseFields.push({
                    isAdditionalTypeDate: 'true',
                });
            }
        } else if (responseFieldType === 'date') {
            responseFields.push({
                isDate: true,
            });
            if(additionalFieldsType === 'textarea'){
                responseFields.push({
                    isAdditionalTypeText: 'text',
                });
            }else if (additionalFieldsType === 'date') {
                responseFields.push({
                    isAdditionalTypeDate: 'date',
                });
            }
        } else if (responseFieldType === 'checkbox') {
            responseFields.push({
                isCheckbox: true,
            });
            if(additionalFieldsType === 'textarea'){
                responseFields.push({
                    isAdditionalTypeText: 'text',
                });
            }else if (additionalFieldsType === 'date') {
                responseFields.push({
                    isAdditionalTypeDate: 'date',
                });
            }
        } else if (responseFieldType === 'number') {
            responseFields.push({
                isNumber: true,
            });
            if(additionalFieldsType === 'textarea'){
                responseFields.push({
                    isAdditionalTypeText: 'text',
                });
            }else if (additionalFieldsType === 'date') {
                responseFields.push({
                    isAdditionalTypeDate: 'date',
                });
            }
        } else if (responseFieldType === 'textarea') {
            responseFields.push({
                isTextarea: true,
            });
            if(additionalFieldsType === 'textarea'){
                responseFields.push({
                    isAdditionalTypeText: 'text',
                });
            }else if (additionalFieldsType === 'date') {
                responseFields.push({
                    isAdditionalTypeDate: 'date',
                });
            }
        } else if (responseFieldType === 'combobox') {
            responseFields.push({
                isPicklist: true,
                picklistOptions: this.getPicklistOptions(responseFieldValues),
                selectedValue: question.response,
            });
            if(additionalFieldsType === 'textarea'){
                responseFields.push({
                    isAdditionalTypeText: 'text',
                });
            }else if (additionalFieldsType === 'date') {
                responseFields.push({
                    isAdditionalTypeDate: 'date',
                });
            }
        } else if (responseFieldType === 'dual-listbox') {
            responseFields.push({
                isMultiselectPicklist: true,
                picklistOptions: this.getPicklistOptions(responseFieldValues),
                selectedValues: question.response,
            });
            if(additionalFieldsType === 'textarea'){
                responseFields.push({
                    isAdditionalTypeText: 'text',
                });
            }else if (additionalFieldsType === 'date') {
                responseFields.push({
                    isAdditionalTypeDate: 'date',
                });
            }
        } else if (responseFieldType === 'radio-group') {
            responseFields.push({
                isRadioButton: true,
                radioOptions: this.getRadioOptions(responseFieldValues),
            });
            if(additionalFieldsType === 'textarea'){
                responseFields.push({
                    isAdditionalTypeText: 'text',
                });
            }else if (additionalFieldsType === 'date') {
                responseFields.push({
                    isAdditionalTypeDate: 'date',
                });
            }
        } else if (responseFieldType === 'file') {
            responseFields.push({
                isFile: true,
            });
        }

        return responseFields;
    }

    getPicklistOptions(picklistValues) {
        this.multiSelectOption = picklistValues.split(';').map(value => ({ label: value, value }));
        return picklistValues.split(';').map(value => ({ label: value, value }));
    }

    getRadioOptions(radioValues) {
        this.radioOption = radioValues.split(';').map(value => ({ label: value, value }));
        return radioValues.split(';').map(value => ({ label: value, value }));
    }

    handleTextInput(event) {
        const questionId = event.target.dataset.questionid;
        const response = event.target.value;
        this.updateResponse(questionId, response, 'Response__c');
    }
    
    handleDateInput(event) {
        const questionId = event.target.dataset.questionid;
        const response = event.target.value;
        this.updateResponse(questionId, response, 'Response__c');
    }
    
    handleCheckboxInput(event) {
        const questionId = event.target.dataset.questionid;
        const response = String(event.target.checked);
        this.updateResponse(questionId, response, 'Response__c');
    }
    
    handleNumberInput(event) {
        const questionId = event.target.dataset.questionid;
        const response = parseFloat(event.target.value).toString();
        this.updateResponse(questionId, response, 'Response__c');
    }
    
    handleTextareaInput(event) {
        const questionId = event.target.dataset.questionid;
        const response = event.target.value;
        this.updateResponse(questionId, response, 'Response__c');
    }
    handlePicklistInput(event) {
        const questionId = event.target.dataset.questionid;
        const response = event.target.value;
        this.updateResponse(questionId, response, 'Response__c');
    }
    
    handleMultiselectInput(event) {
        const questionId = event.target.dataset.questionid;
        const selectedValues = event.target.value;
            // Join the selected values into a single string with ';'
        const response = selectedValues.join(';');
        this.updateResponse(questionId, response, 'Response__c');
    }
    handleRadioInput(event) {
        this.radio = event.detail.value === 'Yes';
        const questionId = event.target.dataset.questionid;
        const response = event.target.value;
        this.updateResponse(questionId, response, 'Response__c');
    }

    handleAdditionalText(event) {
        const questionId = event.target.dataset.questionid;
        const response = event.target.value;
        this.updateResponse(questionId, response, 'Additional_Information__c');
    }
    
    handleAdditionalDate(event) {
        const questionId = event.target.dataset.questionid;
        const response = event.target.value;
        this.updateResponse(questionId, response, 'Additional_Information__c');
    }

    handleFileUpload(event) {
        this.files = event.detail.files;
    }


    updateResponse(questionId, response, fieldToUpdate) {
        const questionToUpdate = this.questions.find(question => question.Id === questionId);
        if (questionToUpdate) {
            questionToUpdate[fieldToUpdate] = response;
        }
    }

    saveResponses() {
        if (!this.validateFields()) {
            // Validation failed, do not proceed
            return;
        }
        const inputFields = this.template.querySelectorAll('lightning-input');
        inputFields.forEach(inputField => {
            if (!inputField.value) {
                inputField.setCustomValidity('Error: Response is required');
                inputField.reportValidity();
                isValid = false;
            } else {
                inputField.setCustomValidity('');
            }
        });
        const responsesInputList = this.questions.map(question => ({
            Response__c: question.Response__c,
            Additional_Information__c: question.Additional_Information__c,
            lead__c: this.leadId,
            Baseline_Question__c: question.Id,
        }));

        console.log('responses:', responsesInputList);

        saveResponses({ responsesInputList })
            .then((result) => {
                //this.showToast('Success', 'Responses saved successfully', 'success');
                
                // Optionally, you can clear the responses array or perform any other action
                const nextStepEvent = new CustomEvent('nextstep', {
                    detail: { leadId: this.leadId }
                });
                this.dispatchEvent(nextStepEvent);
            })
            .catch((error) => {
                console.error('Error saving responses:', error);
                //this.showToast('Error', 'Error saving responses', 'error');
            });

            
    }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title,
            message,
            variant,
        });
        this.dispatchEvent(event);
    }
    goBack(){
        console.log('goBack');
        const previousStepEvent = new CustomEvent('previousstep', {
            detail: { leadId: this.leadId }
        });
        
        this.dispatchEvent(previousStepEvent);
        
    }
    validateFields() {
        let isValid = true;
    
        const inputFields = this.template.querySelectorAll('input, textarea, lightning-combobox, lightning-dual-listbox, lightning-radio-group');
        inputFields.forEach(inputField => {
            if (!inputField.value) {
                inputField.setCustomValidity('Error: Response is required');
                inputField.reportValidity();
                isValid = false;
            } else {
                inputField.setCustomValidity('');
            }
        });
    
        return isValid;
    }
}