const { notifications: vNotify } = window.vNotify;
const { axios, Chart, datatablesNet } = window;
const dayjs = window.dayjs;
let currentCitations = [];
window.globalConfig = {
    hoursPerDay: 14,
    initialHour: 6,
    millisecondsAdded: 300000,
};
const getDateFormat = (year, month, day) => {
    //dateFormat yyyy-MM-dd
    let arrayDate = [];
    arrayDate.push(year);
    arrayDate.push((month + 1) > 9 ? (month + 1) : '0' + (month + 1));
    arrayDate.push(day > 9 ? day : '0' + day);
    return arrayDate.join('-');
}

const generateNumber = (number) => {
    return (Math.random() * number).toFixed(0);
}

const colorRGB = () => {
    let color = "(" + generateNumber(255) + "," + generateNumber(255) + "," + generateNumber(255) + ")";
    return "rgb" + color;
}

const getParameterByName = (name) => {
    return fetch('./getParameterByName', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify({ 
            name 
        })
    }).then(response => response.json())
        .then(data => {
            if (!data.error) {
                const { message, title, responseData, status } = data;
                if (status === true) {
                    // vNotify.success({ text: message, title: title });
                    return responseData.value;
                } else {
                    vNotify.error({ text: message, title: title });
                }
            }
        });
}
