//GST Treatment
export const GST_TREATMENT = {
    REGISTERED_BUSINESS_REGULAR: 1,
    REGISTERED_BUSINESS_COMPOSITION: 2,
    UNREGISTERED_BUSINESS: 3,
    CONSUMER: 4,
    OVERSEAS: 5,
    SPECIAL_ENOCONMIC_ZONE: 6,
    DEEMED_EXPORT: 7,
    TAX_DEDUCTOR: 8,
    SES_DEVELOPER: 9,
};

//Date Formate
export const DATE_FORMATE_LIST = [
    { Id: 'dd-MM-yyyy', name: 'dd-MM-yyyy' },
    { Id: 'MM-dd-yyyy', name: 'MM-dd-yyyy' },
    { Id: 'yyyy-MM-dd', name: 'yyyy-MM-dd' },
    { Id: 'dd/MM/yyyy', name: 'dd/MM/yyyy' },
    { Id: 'MM/dd/yyyy', name: 'MM/dd/yyyy' },
    { Id: 'yyyy/MM/dd', name: 'yyyy/MM/dd' },
]

// Regular Expressions
export const REGX_GST = /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/;
export const REGX_PAN = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;