require('./bootstrap');
window.vNotify = require('vanilla-notify');
window.dayjs = require('dayjs');
const { left } = require('@popperjs/core');
window.Chart = require('chart.js');
window.datatablesNet = require("datatables.net")
let AdvancedFormat = require('dayjs/plugin/advancedFormat');
let calendar = require('dayjs/plugin/calendar');
let customParseFormat = require('dayjs/plugin/customParseFormat');
let duration = require('dayjs/plugin/duration');
let isBetween = require('dayjs/plugin/isBetween');
let isSameOrAfter  = require('dayjs/plugin/isSameOrAfter');
let isSameOrBefore = require('dayjs/plugin/isSameOrBefore');
let isToday = require('dayjs/plugin/isToday');
let toObject = require('dayjs/plugin/toObject');
let pluralGetSet = require('dayjs/plugin/pluralGetSet');
let localeData  = require('dayjs/plugin/localeData');
let updateLocale = require('dayjs/plugin/updateLocale');
let localeES = require('dayjs/locale/es');
window.dayjs.extend(AdvancedFormat);
window.dayjs.extend(calendar);
window.dayjs.extend(customParseFormat);
window.dayjs.extend(duration);
window.dayjs.extend(isBetween);
window.dayjs.extend(isSameOrAfter);
window.dayjs.extend(isSameOrBefore);
window.dayjs.extend(isToday);
window.dayjs.extend(toObject);
window.dayjs.extend(pluralGetSet);
window.dayjs.extend(localeData);
window.dayjs.extend(updateLocale);
window.dayjs.extend(localeES);