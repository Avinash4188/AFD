import { LightningElement, track } from 'lwc';
import getQuestionsAndResponsesByMedicalCondition from '@salesforce/apex/BaselineQuestionHandler.getQuestionsAndResponsesByMedicalCondition';
import saveResponses from '@salesforce/apex/BaselineQuestionHandler.saveResponses';

export default class BaselineTest extends LightningElement {
    @track questions = [];
    medicalCondition = 'Acne'; // Set your medical condition here

    connectedCallback() {
        this.fetchQuestions();
    }

    fetchQuestions() {
        getQuestionsAndResponsesByMedicalCondition({ medicalCondition: this.medicalCondition })
            .then(result => {
                this.questions = this.processQuestions(result);
            })
            .catch(error => {
                console.error('Error fetching questions:', error);
            });
    }

    processQuestions(data) {
        return data.map(question => {
            const responseFields = this.getResponseFields(question);
            return {
                Id: question.questionId,
                Sort_Order__c: question.sortOrder,
                Question__c: question.question,
                responseFields,
            };
        });
    }

    getResponseFields(question) {
        const responseFields = [];
        const responseFieldType = question.responseFieldType;
        const responseFieldValues = question.responseFieldValues;

        if (responseFieldType === 'text') {
            responseFields.push({
                fieldName: 'responseText',
                label: 'Response Text',
                inputType: 'text',
            });
        } else if (responseFieldType === 'date') {
            responseFields.push({
                fieldName: 'responseDate',
                label: 'Response Date',
                inputType: 'date',
            });
        } else if (responseFieldType === 'checkbox') {
            responseFields.push({
                fieldName: 'responseCheckbox',
                label: 'Response Checkbox',
                inputType: 'checkbox',
            });
        } else if (responseFieldType === 'number') {
            responseFields.push({
                fieldName: 'responseNumber',
                label: 'Response Number',
                inputType: 'number',
            });
        } else if (responseFieldType === 'textarea') {
            responseFields.push({
                fieldName: 'responseTextarea',
                label: 'Response Textarea',
                inputType: 'textarea',
            });
        }

        return responseFields;
    }

    saveResponses() {
        const responses = [];

        this.questions.forEach(question => {
            const responseFields = question.responseFields;
            const responseValues = {};

            responseFields.forEach(field => {
                const inputField = this.template.querySelector(`[id="${field.fieldName}"]`);
                responseValues[field.fieldName] = inputField.value;
            });

            responses.push({
                Baseline_Question__c: question.Id,
                ...responseValues,
            });
        });

        if (responses.length > 0) {
            saveResponses({ responses })
                .then(result => {
                    console.log('Responses saved successfully:', result);
                })
                .catch(error => {
                    console.error('Error saving responses:', error);
                });
        }
    }
}