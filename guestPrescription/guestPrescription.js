import { LightningElement } from 'lwc';
import My_Resource5 from '@salesforce/resourceUrl/TMD_ASSETS_IMAGES5';

export default class GuestPrescription extends LightningElement {
sr_Acne_icon = My_Resource5 + '/Acne_icon.png';
sr_alergy_icon = My_Resource5 + '/alergy_icon.png';
sr_Antibiotics_icon = My_Resource5 + '/Antibiotics_icon.png';
sr_Anxiety_icon = My_Resource5 + '/Anxiety_icon.png';
sr_arrow_right = My_Resource5 + '/arrow_right.png';
sr_Asthma_icon = My_Resource5 + '/Asthma_icon.png';
sr_cholesterol_icon = My_Resource5 + '/cholesterol_icon.png';
sr_consultation_icon = My_Resource5 + '/consultation_icon.png';
sr_copd_icon = My_Resource5 + '/copd_icon.png';
sr_covid_icon = My_Resource5 + '/covid-icon.png';
sr_Depression_icon = My_Resource5 + '/Depression_icon.png';
sr_Diabetes_icon = My_Resource5 + '/Diabetes_icon.png';
sr_doctor_prescription = My_Resource5 + '/doctor_prescription.png';
sr_erectile_icon = My_Resource5 + '/erectile_icon.png';
sr_healthcare_bkg = My_Resource5 + '/healthcare_bkg.png';
sr_healthcare_icon = My_Resource5 + '/healthcare_icon.png';
sr_Herpes_icon = My_Resource5 + '/Herpes_icon.png';
sr_high_blood_icon = My_Resource5 + '/high_blood_icon.png';
sr_icon_tick = My_Resource5 + '/icon_tick.png';
sr_medical_prescription_icon = My_Resource5 + '/medical-prescription_icon.png';
sr_Migraine_icon = My_Resource5 + '/Migraine_icon.png';
sr_Online_Prescriptions = My_Resource5 + '/Online_Prescriptions.png';
sr_prescription_icon = My_Resource5 + '/prescription_icon.jpg';
sr_prescription_icon2 = My_Resource5 + '/prescription_icon2.jpg';
sr_Psoriasis_icon = My_Resource5 + '/Psoriasis_icon.png';
sr_Thyroid_icon = My_Resource5 + '/Thyroid_icon.png';
sr_tick_mark = My_Resource5 + '/tick_mark.png';
sr_wellness_icon = My_Resource5 + '/wellness_icon.png';
sr_Women_health_icon = My_Resource5 + '/Women_health_icon.png';
sr_gerd_icon =My_Resource5 + '/gerd_icon.png';
sr_gout_icon =My_Resource5 + '/gout_icon.png';
 get backgroundImageStyle() {
        return `background-image: url('${"https://afdhealth.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=068Hs00000at6MY&operationContext=DELIVERY&contentId=05THs00001sqUpi&page=0&d=/a/Hs00000130EL/NNZJP_KvBEbRLhbipxYDb3eWpCNQ_nhF21TrKdcagjs&oid=00DHs000001QFbz&dpt=null&viewId="}');`;
    }

}