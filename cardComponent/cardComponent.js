import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CardComponent extends LightningElement {
    handleCardClick(event) {
        const cardType = event.currentTarget.dataset.cardType;
        //this.showToast(`${cardType} was clicked!`, 'success');
        const cardClickEvent = new CustomEvent('cardclick', { detail: { cardType } });
        this.dispatchEvent(cardClickEvent);
    }

    showToast(message, variant) {
        const toastEvent = new ShowToastEvent({
            title: 'Toast Message',
            message: message,
            variant: variant,
        });
        this.dispatchEvent(toastEvent);
    }
}