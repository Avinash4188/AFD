let definition =
      {"states":[{"fields":[],"conditions":{"id":"state-condition-object","isParent":true,"group":[]},"definedActions":{"actions":[]},"name":"Active","isSmartAction":false,"smartAction":{},"styleObject":{"padding":[{"type":"around","size":"x-small","label":"around:x-small"}],"margin":[{"type":"around","size":"none","label":"around:none"}],"container":{"class":"slds-card"},"size":{"isResponsive":true,"default":"12","large":"12","medium":"12","small":"12"},"sizeClass":"slds-large-size_12-of-12 slds-medium-size_12-of-12 slds-small-size_12-of-12 slds-size_12-of-12 ","class":"slds-card slds-p-around_x-small slds-m-around_none ","background":{"color":"","image":"","size":"","repeat":"","position":""},"border":{"type":"","width":"","color":"","radius":"","style":""},"elementStyleProperties":{},"text":{"align":"","color":""},"inlineStyle":"","style":"     : #ccc 1px solid; \n         "},"components":{"layer-0":{"children":[{"name":"Text","element":"outputField","size":{"isResponsive":false,"default":"12"},"stateIndex":0,"class":"slds-col ","property":{"record":"{record}","mergeField":"%3Cdiv%20class=%22slds-text-align_left%22%3E&nbsp;%3C/div%3E%0A%3Cdiv%20class=%22slds-text-align_left%22%3E%3Cspan%20style=%22font-size:%2012pt;%22%3E%3Cstrong%3EMedical%20Procedures%3C/strong%3E%3C/span%3E%3C/div%3E%0A%3Cdiv%20class=%22slds-text-align_left%22%3E&nbsp;%3C/div%3E","card":"{card}"},"type":"text","styleObject":{"sizeClass":"slds-size_12-of-12"},"elementLabel":"Text-0"},{"name":"Datatable","element":"dataTable","size":{"isResponsive":false,"default":"12"},"stateIndex":0,"class":"slds-col ","property":{"issearchavailable":false,"issortavailable":true,"cellLevelEdit":false,"pagelimit":3,"groupOrder":"asc","hideTableHeader":false,"styles":{"cellMargin":[],"cellPadding":[],"headBgColor":"#eef4ff","headTextDecoration":"","headFontWeight":"Bold","headFontFamily":"","rowBgColor":""},"userSelectableRow":false,"userSelectableColumn":false,"pagesize":"","rowDeleteDependentColumn":"","extraclass":"","columns":[{"fieldName":"Code","label":"Procedure","searchable":"true","sortable":true,"type":"text"},{"fieldName":"StartDate","label":"Start Date","searchable":"true","sortable":true,"type":"date","format":"M/D/YYYY"},{"fieldName":"Status","label":"Status","searchable":true,"sortable":true,"type":"text"}],"records":"{records}"},"type":"element","styleObject":{"sizeClass":"slds-size_12-of-12 ","padding":[],"margin":[],"background":{"color":"","image":"","size":"","repeat":"","position":""},"size":{"isResponsive":false,"default":"12"},"container":{"class":""},"border":{"type":"","width":"","color":"","radius":"","style":""},"elementStyleProperties":{"styles":{"cellMargin":[],"cellPadding":[],"headBgColor":"#eef4ff","headTextDecoration":"","headFontWeight":"Bold","headFontFamily":"","rowBgColor":""}},"text":{"align":"left","color":"#0176d3"},"inlineStyle":"","class":"slds-theme_default slds-text-align_left ","style":"      \n        color:#0176d3; ","theme":"theme_default"},"elementLabel":"Datatable-1","styleObjects":[{"key":0,"conditions":"default","styleObject":{"sizeClass":"slds-size_12-of-12 ","padding":[],"margin":[],"background":{"color":"","image":"","size":"","repeat":"","position":""},"size":{"isResponsive":false,"default":"12"},"container":{"class":""},"border":{"type":"","width":"","color":"","radius":"","style":""},"elementStyleProperties":{"styles":{"cellMargin":[],"cellPadding":[],"headBgColor":"#eef4ff","headTextDecoration":"","headFontWeight":"Bold","headFontFamily":"","rowBgColor":""}},"text":{"align":"left","color":"#0176d3"},"inlineStyle":"","class":"slds-theme_default slds-text-align_left ","style":"      \n        color:#0176d3; ","theme":"theme_default"},"label":"Default","name":"Default","conditionString":"","draggable":false}]}]}},"childCards":[],"actions":[],"omniscripts":[],"documents":[]}],"dataSource":{"type":"DataRaptor","value":{"dsDelay":"","bundle":"HealthCloudPtCardGetPatientMedicalProcedure","bundleType":"","inputMap":{"PatientId":"{recordId}","LimitValue":"200"},"resultVar":""},"orderBy":{"name":"","isReverse":false},"contextVariables":[]},"title":"HealthCloudPtCardPatientMedicalProcedureCardViewAll","enableLwc":true,"isFlex":true,"theme":"slds","selectableMode":"Multi","lwc":{"DeveloperName":"cfHealthCloudPtCardPatientMedicalProcedureCardViewAll_1_Salesforce","Id":"0RbB0000000QCSgKAO","MasterLabel":"cfHealthCloudPtCardPatientMedicalProcedureCardViewAll_1_Salesforce","NamespacePrefix":"c","ManageableState":"unmanaged"},"isRepeatable":false,"events":[{"eventname":"rowclick","channelname":"PatientAllergiesCard","element":"action","eventtype":"event","recordIndex":"0","actionData":{"stateAction":{"id":"flex-action-1633535787105","type":"Custom","targetType":"Record","Record":{"targetName":"PatientMedicalProcedure","targetAction":"view","targetId":"{action.result.Id}"},"openUrlIn":"New Tab/Window"}},"key":"event-0","displayLabel":"rowclick","eventLabel":"custom event"}],"dynamicCanvasWidth":{"type":"mobile"},"Name":"HealthCloudPtCardPatientMedicalProcedureCardViewAll","uniqueKey":"HealthCloudPtCardPatientMedicalProcedureCardViewAll_Salesforce_1","Id":"flexmetadata0.24456185230527661698930986252","OmniUiCardType":"Child"};
  export default definition