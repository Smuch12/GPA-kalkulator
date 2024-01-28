const { test1, test2, test3, correct1, correct2 } = require('../cases');
import {calculateUIBGPA } from '../../static/js/calculateGrade.js';

test('Testing - calculateUIBGPA method', () => {
    expect(parseFloat(calculateUIBGPA(test1))).toEqual(4.0);
    expect(parseFloat(calculateUIBGPA(test2))).toEqual(4.4);
    expect(parseFloat(calculateUIBGPA(test3))).toEqual(4.6);
});

