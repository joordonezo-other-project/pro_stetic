const { notifications: vNotify } = window.vNotify;
const { axios } = window;
const dayjs = window.dayjs;
let currentCitations = [];

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

