import { LightningElement } from 'lwc';
import My_Resource2 from '@salesforce/resourceUrl/TMD_ASSETS_IMAGES2';
import My_Resource1 from '@salesforce/resourceUrl/TMD_ASSETS_IMAGES1';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

export default class GuestHomeContent1 extends LightningElement {
    sr_right_arrow = My_Resource2 + '/right-arrow.svg';
    sr_emergency_icon = My_Resource2 + '/emergency-icon.svg';
    sr_doc_pic = My_Resource1 + '/doc-pic.png';
    
    handleClick(event){
    const signUpUrl = window.location.origin +'/afd/s/signup';
    if (signUpUrl) {
            window.open(signUpUrl, '_blank');
    }
}
}