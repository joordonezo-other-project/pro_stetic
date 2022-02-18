require('./bootstrap');
window.vNotify = require('vanilla-notify');
window.dayjs = require('dayjs');
const { left } = require('@popperjs/core');
let AdvancedFormat = require('dayjs/plugin/advancedFormat');
let calendar = require('dayjs/plugin/calendar');
let customParseFormat = require('dayjs/plugin/customParseFormat');
let duration = require('dayjs/plugin/duration')
window.dayjs.extend(AdvancedFormat);
window.dayjs.extend(calendar);
window.dayjs.extend(customParseFormat);
window.dayjs.extend(duration);