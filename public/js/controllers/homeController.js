const { notifications: vNotify } = window.vNotify;
const { axios } = window;

let currentCitations = [];

const getDateFormat = (year, month, day) => {
    //dateFormat yyyy-MM-dd
    return `${year}-${(month + 1) > 9 ? (month + 1) : '0' + (month + 1)}-${day > 9 ? day : '0' + day}`;
}

const generateNumber = (number) => {
    return (Math.random() * number).toFixed(0);
}

const colorRGB = () => {
    let color = "(" + generateNumber(255) + "," + generateNumber(255) + "," + generateNumber(255) + ")";
    return "rgb" + color;
}

