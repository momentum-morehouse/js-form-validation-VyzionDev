
function validateAll(event) {
    event.preventDefault();

    validateName();
    validateCarAll();
    validate();
    validateDays();
    validateCardNo();
    validateCVV();
    validateExp();

    if(testValidity("#start-date") && testValidity("#days")) {
        let date = new Date(document.querySelector("#start-date").valueAsNumber);
        let getdate = edate.getDay();
        let price = 0;
        for(let n = 0; n < document.querySelector("#days").value; n++) {
            if(getdate == 0 || getdate == 6)
                price += 7;
            else
                price += 5;
            dow++;
            if(getdate > 6)
                getdate = 0;
        }
        document.querySelector("#total").tentent = ("Total: $" + price + ".00");
    }

}

function testValidity(id) {
    var test = document.querySelector(id).parentElement;
    if(test.classList.contains("input-valid"))
        return true;
    return false;
}

function makeValid(field) {
    field.parentElement.classList.add("input-valid");
    let test = field.parentElement.getElementsByTagName("label")[0];
    test.textContent = test.textContent.replace("*"," ").trim();
    return 1;
}

function makeInvalid(field) {
    field.parentElement.classList.add("input-invalid");
    let test = field.parentElement.getElementsByTagName("label")[0];
    if(!test.textContent.endsWith("*"))
        test.textContent += "*";
    return 0;
}

function addListener(id, func) {
    document.querySelector(id).addEventListener("blur", func);
}

function validateName() {
    let test = document.querySelector("#name");
    if(test.value.trim() == "")
        return makeInvalid(test);
    for(let n = 0; n < 10; n++)
        if(test.value.startsWith(n)) {
            return makeInvalid(test);
        }
    return makeValid(test);
}

addListener("#name", validateName);

function validateCarYear() {
    let year = document.querySelector("#car-year");
    if(year.value == "")
        return 0;
    if(year.value.length != 4)
        return 0;
    try {
        if(year.value < 1900 || year.value > 2020)
            return 0;
    } catch { return 0; }
}

function validateCarMake() {
    let make = document.querySelector("#car-make");
    if(make.value.trim().length === 0)
        return 0;
}

function validateCarModel() {
    let model = document.querySelector("#car-model");
    if(model.value.trim().length === 0)
        return 0;
}

function validateCarAll(event) {
    let year = validateCarYear();
    if(event === undefined || (year === 0 && event.target.id === "car-year"))
        return makeInvalid(document.querySelector("#car-year").parentElement);
    
    let make = validateCarMake();
    if(event === undefined || (make === 0 && event.target.id === "car-make"))
        return makeInvalid(document.querySelector("#car-make").parentElement);

    let model = validateCarModel();
    if(event === undefined || (model === 0 && event.target.id === "car-model"))
        return makeInvalid(document.querySelector("#car-model").parentElement);

    if(year === undefined && make === undefined && model === undefined)
        return makeValid(document.querySelector("#car-year").parentElement);
}

addListener("#car-year", validateCarAll);
addListener("#car-make", validateCarAll);
addListener("#car-model", validateCarAll);

function validate() {
    let startd = document.querySelector("#start-date");
    if(startd.value === "")
        return makeInvalid(startd);
    let now = Date.now();
    if(startd.valueAsNumber < now)
        return makeInvalid(startd);
    makeValid(startd);
}

addListener("#start-date", validate);

function validateDays() {
    let days = document.querySelector("#days");
    if(days.value < 1 || days.value > 30)
        return makeInvalid(days);
    return makeValid(days);
}

addListener("#days", validateDays);

function checkSum(num) {
    let sum = 0;
    for(let n = 0; n < num.length; n++) {
        let checksum = parseInt(num.substr(n, 1));
        if(n % 2 === 0) {
            checksum *= 2;
            if(checksum > 9)
                checksum = 1 + (checksum % 10);
        }
        sum += checksum;
    }

    return ((sum % 10) === 0);

}

function validateCardNo() {
    let valicard = new RegExp("^[0-9]{16}$");
    let cardnum = document.querySelector("#credit-card");
    if(valicard.test(cardnum.value) && checkSum(cardnum.value))
        return makeValid(cardnum);
    makeInvalid(cardnum);
}

addListener("#credit-card", validateCardNo);

function validateCVV() {
    let cvv = document.querySelector("#cvv");
    if(cvv.value.length < 3 || cvv.value.length > 4)
        return makeInvalid(cvv);
    makeValid(cvv);
}

addListener("#cvv", validateCVV);

function validateExp() {
    let regexpire = new RegExp("^[0-9]{2}\/[0-9]{2}$");
    let expireyear = document.querySelector("#expiration");
    let expiremath = parseInt(expiron.value.substr(0,2));
    let expirey = parseInt(expiron.value.substr(3,2));
    if(!regexpire.test(expiron.value) || expiremath > 12)
        return makeInvalid(expiron);
    let currdate = new Date(Date.now());
    let xpy = currdate.getFullYear() % 100;
    let isexpiremath = (expiremath - 1) <= new Date().getUTCMonth();
    if((expireyear < xpy) || (expireyear == xpy && isexpiremath))
        return makeInvalid(expiron);
    makeValid(expiron);
}

addListener("#expiration", validateExp);

document.querySelector("#submit-button").addEventListener("click", validateAll, false);
