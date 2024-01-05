import { LightningElement, wire } from 'lwc';
import { getRelatedListRecordsBatch } from 'lightning/uiRelatedListApi';
import { NavigationMixin } from 'lightning/navigation';
export default class CasesgetRelatedListRecordsBatch extends NavigationMixin(LightningElement) {

  error;
  results;
  @wire(getRelatedListRecordsBatch, {
    parentRecordId: "001D500001IJ3xNIAT",
    relatedListParameters: [
      {
        relatedListId: "Cases",
        fields: ["Case.Id","Case.CaseNumber","Case.Status"],
      },
      {
        relatedListId: "Opportunities",
        fields: ["Opportunity.Id", "Opportunity.Amount"],
      },
    ],
  })
  listInfo({ error, data }) {
    if (data) {
        console.log('Data received Successfully:');
      this.results = data.results;
      this.error = undefined;
    } else if (error) {
        console.log('Error');
      this.error = error;
      this.results = undefined;
    }
  }

  navigateToCaseRecord(event) {
    const recordId = event.target.dataset.recordId;
    this[NavigationMixin.Navigate]({
        type: 'standard__recordPage',
        attributes: {
            recordId: recordId,
            actionName: 'view',
        },
    });
}

}