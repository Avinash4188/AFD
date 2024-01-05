import { LightningElement, api } from 'lwc';

export default class ParentComponent extends LightningElement {
    @api recordId; // Pass the recordId of the sObject
}