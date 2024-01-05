import { LightningElement } from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import My_Resource from '@salesforce/resourceUrl/TMD_Assets';
export default class GuestHomeContent extends LightningElement {
    renderedCallback() {
        Promise.all([
        loadScript(this, My_Resource + '/js/jquery.min.js'),
        loadScript(this, My_Resource + '/js/OWL.js'),
        loadScript(this, My_Resource + '/js/customjs.js'),
        loadStyle(this, My_Resource + '/css/fontstyle.css'),
        loadStyle(this, My_Resource + '/css/owlcarouselmin.css'),
        loadStyle(this, My_Resource + '/css/styles.css'),
        
        ]).then(() => {
            //this.initializeOwlCarousel();
        })
        
    }
}