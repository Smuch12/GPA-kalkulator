/**
 * @typedef {Object} Course
 * @property {string} grade - The grade for the course.
 * @property {string} credit - The credit value for the course.
 */

/**
 * @typedef {Object.<string, Course>} CourseRecord
 * @description Object representing a record of courses, where each key is a course code and the value is a Course object.
 */

/**
 * Convert grade to number
 * @param {string} grade - Grade to convert.
 * @returns {int} number representing the grade.
 **/
function getGradeValue(grade) {
    switch (grade.toUpperCase()) {
        case 'A': return 5;
        case 'B': return 4;
        case 'C': return 3;
        case 'D': return 2;
        case 'E': return 1;
        case 'F': return 0;
        case 'BESTÅTT': return null;
        default: return -1;
    }
}

/**
 * Compares two grades.
 * @param {string} grade1 - The first grade to compare.
 * @param {string} grade2 - The second grade to compare.
 * @returns {number} A value indicating the sort order.
 */
function compareGrades(grade1, grade2) {
    const gradeOrder = ['A', 'B', 'C', 'D', 'E', 'F', 'Bestått'];
    const index1 = gradeOrder.indexOf(grade1);
    const index2 = gradeOrder.indexOf(grade2);
    return index1 - index2;
}
/**
 * Delete list of courses from another list of courses
 * @param{CourseRecord} original
 * @param{CourseRecord} toDelete
 * */
function deleteSelected(original, toDelete){
    for (let courseCode in toDelete) {
        if (original[courseCode]) {
            delete original[courseCode];
        }
    }
}

/**
 * Get course which is last in CourseRecord
 * @param{CourseRecord} courses
 * @returns{Course}
 * */
function getLastCourse(courses) {
    const keys = Object.keys(courses);
    const lastKey = keys[keys.length - 1];
    return courses[lastKey];
}

/**
 * Find courseCode given course
 * @param{CourseRecord} courses
 * @param{Course} course
 * */
function findKeyByValue(courses, course) {
    return Object.keys(courses).find(key =>
        JSON.stringify(courses[key]) === JSON.stringify(course));
}


/**
 *
 * @param{CourseRecord} courses
 * @param{string} courseCode
 * @returns{CourseRecord} Return courses containing given course code.
 * */
function divideCourses(courses, courseCode) {
    let filteredCourses = {};
    for (const key in courses) {
        if (key.startsWith(courseCode.toUpperCase())) {
            filteredCourses[key] = courses[key];
        }
    }
    return filteredCourses;
}

/**
 * Given the record of courses, select best courses till it meet total credits.
 *
 * @param{CourseRecord} courses
 * @param{int} totalCredit
 * @returns{CourseRecord}
 *
 * @example
 *  courses = {
 *     "MAT111": { "grade": "C", "credit": "10" },
 *     "INF100": { "grade": "A", "credit": "10" },
 *     "INF101": {"grade": "B", "credit": "10"},
 *  }
 *  bestCourses(courses, 10);
 *  //Output 1: {"INF100": { "grade": "A", "credit": "10" }}
 *
 *  bestCourses(courses, 15);
 *  //Output 2:  {"INF100": { "grade": "A", "credit": "10" }, "INF101": {"grade": "B", "credit": "10"}}
 **/
function bestCourses(courses, totalCredit) {
    let coursesArray = Object.entries(courses);
    coursesArray.sort((a, b) => {
        return compareGrades(a[1].grade, b[1].grade);
    });
    let sortedCourses = {};
    for (const [key, value] of coursesArray) {
        sortedCourses[key] = {
            grade: value.grade,
            credit: parseInt(value.credit, 10)
        };
    }
    
    let selectedCourses = {};
    let enoughCredit = 0;
    for (let i = 0; i < coursesArray.length; i++) {
        let [courseKey, courseValue] = coursesArray[i];
        selectedCourses[courseKey] = courseValue;
        enoughCredit += parseInt(courseValue.credit);
        if (enoughCredit >= totalCredit) {
            break;
        }
    }
    return selectedCourses;
}


/**
 * Calculate GPA of your grades
 * @param{CourseRecord} courses
 * @returns{float} Average grade
 **/
export function calculateGPA(courses) {
    let sum = 0;
    let totalCredits = 0;
    for (let course in courses) {
        let gradeValue = getGradeValue(courses[course].grade);
        let credit = parseFloat(courses[course].credit);
        if (gradeValue === null)
            continue;
        if (gradeValue < 0) {
            console.error("Ugyldig karakter");
            continue;
        }
        sum += gradeValue * credit;
        totalCredits += credit;
    }
    return (sum / totalCredits).toFixed(1);
}

/**
 * @description
 * Calculate GPA based 80 credits where:
 * - 40 credit where courses starts with "INF" or "MNF"
 * - 15 credit where courses start  with "MAT" or "STAT"
 * - Rest can be any course.
 *
 * NB: Note that a grade marked as "BESTÅTT" will replace a grade lower 'C' given it is correct course code,
 *     but it will not count, meaning GPA will be based on the rest 70 points.
 *
 * @example on spesial case:
 * Let's say you must pick 15 credit (math courses) and you have thees math grades:
 *  MAT101 = BESTÅTT
 *  MAT121 = D
 *  STAT1110 = E
 * Then MAT121 and MAT101 will be picked, but only MAT121 will count on the GPA since MAT101 has code "BESTÅTT"
 *
 * @param{CourseRecord} courses
 * @returns{float}
 * */
export function calculateUIBGPA(courses) {
    //Divide courses by type: INF, MATH, Rest
    let INFCourses = {...divideCourses(courses, "INF"), ...divideCourses(courses, "MNF")};
    let MATCourses = {...divideCourses(courses, "MAT"), ...divideCourses(courses, "STAT")};
    //Choose best courses in each:
    let bestMath = bestCourses(MATCourses, 15);
    let bestINF = bestCourses(INFCourses, 40);
    //Delete to avoid duplication
    let selectedCourses = {...bestINF, ...bestMath};
    deleteSelected(courses, selectedCourses);
    //Select rest
    let anyCourses = bestCourses(courses, 25);
    let finalCourses = {...selectedCourses, ...anyCourses};
    deleteSelected(courses, finalCourses);
    //Courses that is graded as "Bestått"
    let bestattCourses = {}
    for(let courseCode in courses){
        if(courses[courseCode].grade == 'Bestått'){
            bestattCourses[courseCode] = courses[courseCode];
        }
    }
    //Courses that is lower than C, which can be deleted.
    let canBeDelete= {};
    for(let courseCode in finalCourses){
        if(getGradeValue(finalCourses[courseCode].grade) < 3){
            canBeDelete[courseCode] = finalCourses[courseCode];
        }
    }
    if(!(Object.keys(bestattCourses).length === 0)){
        let toDelete = {};
        for(let courseCode in bestattCourses){
            if(courseCode.startsWith("MAT") || courseCode.startsWith("STAT")){
                toDelete[findKeyByValue(bestMath, getLastCourse(bestMath))]  = getLastCourse(bestMath);
            }else if(courseCode.startsWith("INF")){
                toDelete[findKeyByValue(bestINF, getLastCourse(bestINF))]= getLastCourse(bestINF);
            }else{
                toDelete[findKeyByValue(anyCourses, getLastCourse(anyCourses))]= getLastCourse(anyCourses);
            }
        }
        deleteSelected(finalCourses, toDelete);
    }
    return calculateGPA(finalCourses);
}

