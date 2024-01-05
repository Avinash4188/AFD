import { LightningElement } from 'lwc';

export default class GetStarted extends LightningElement {
    handleGetStartedClick() {
        const nextStepEvent = new CustomEvent('nextstep');

        this.dispatchEvent(nextStepEvent);
    }
}