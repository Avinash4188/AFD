import { LightningElement } from 'lwc';
import My_Resource2 from '@salesforce/resourceUrl/TMD_ASSETS_IMAGES2';
import My_Resource3 from '@salesforce/resourceUrl/TMD_ASSETS_IMAGES3';
import My_Resource4 from '@salesforce/resourceUrl/TMD_ASSETS_IMAGES4';

export default class GuestHomeContent4 extends LightningElement {
    isChecked1 = true;
    isChecked2 = false;
    sr_star_bg = My_Resource2 + '/star-bg.svg';
    sr_image_test = My_Resource3 + '/image-test.svg';
    sr_image_testi = My_Resource4;
    handleRadioClick() {
        if (this.isChecked1 === true) {
            this.isChecked1 = false;
            this.isChecked2 = true;
        } else {
            this.isChecked1 = true;
            this.isChecked2 = false;
        }
    }
}