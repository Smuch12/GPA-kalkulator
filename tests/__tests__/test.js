case_path = '../cases'

const { test1 } = require(case_path);
const { test2 } = require(case_path);
const { test3 } = require(case_path);
const { correct1 } = require(case_path);
const { correct2 } = require(case_path);


test('Testing - bestCourses method', () => {
    expect(bestCourses(test1, 20)).toEqual(correct1);
    expect(bestCourses(test1, 15)).toEqual(correct1);
    expect(bestCourses(test2, 40)).toEqual(correct2);
});

test('Testing - calculateUIBGPA method', () => {
    expect(parseFloat(calculateUIBGPA(test1))).toEqual(4.0);
    expect(parseFloat(calculateUIBGPA(test2))).toEqual(4.4);
    expect(parseFloat(calculateUIBGPA(test3))).toEqual(4.6);
});