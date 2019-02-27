module.exports = {
    //page-1
    FROM: "input[id='connectionParam:fromInput']",
    TO: "input[id='connectionParam:toInput']",
    CALENDAR: ".cal",
    CALENDAR_NEXT: "a[class='next']",
    TIME: "input[id='connectionParam:time']",
    PAGE_1_SUBMIT: "input[id='connectionParam:submit']",

    //Page-3
    TICKET_TYPE: "option[value='1']", //(listok s miestom,  "listok", miesto)
    PASSENGERS_TYPE: "option[value='2']", //(obycajny,  dieta -15, "Ziak/Student"...)
    PAGE_3_SUBMIT: "input[type='submit']",

    //Page-4
    EMAIL: "input[id='paymentForm:payerRepeat:0:payer']",
    FIRST_NAME: "input[id='paymentForm:tdcRepeat:0:travellerRepeat:0:travellerItem']",
    LAST_NAME: "input[id='paymentForm:tdcRepeat:0:travellerRepeat:1:travellerItem']",
    TRAIN_ID: "input[id='paymentForm:tdcRepeat:0:travellerRepeat:2:travellerItem']",
    RECEIPT: "input[id='paymentForm:j_idt222:1']",
    AGREEMENT_SELECTOR: "#paymentForm > fieldset.chb > label > div > span > input[type='checkbox']",
    PAGE_4_SUBMIT: "input[id='paymentForm:submit']",

    //Page-5
    DOWNLOAD_TICKET: "#j_idt91 > input[type='submit']:nth-child(2)"    
    //const TICKET_TYPE_SELECTOR = "select[id=ticketParam:j_idt112:0:j_idt115]";
}
