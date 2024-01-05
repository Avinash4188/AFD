import { LightningElement, track } from 'lwc';

export default class MultiSelectPicklistSearch extends LightningElement {
    
    @track options = [
        { label: 'Option 1', value: 'Option1' },
        { label: 'Emore', value: 'Option2' },
        { label: 'Dmore', value: 'Option3' },
        { label: 'Amore', value: 'Option1' },
        { label: 'Bmore', value: 'Option2' },
        { label: 'Cmore', value: 'Option3' },
        // Add more options as needed
    ];
    @track filteredOptions = [];

    connectedCallback(){
        this.filteredOptions = this.options;
    }

    handleSearchChange(event) {
        const searchValue = event.target.value.toLowerCase();
        this.filteredOptions = this.options.filter(option => option.label.toLowerCase().includes(searchValue));
    }

    handleCheckboxChange(event) {
        const selectedValue = event.target.dataset.id;
        // Handle the selected value as needed, e.g., store it in an array.
        // You can use an array to keep track of selected values.
    }
}