document.getElementById('showAddForm').addEventListener('click', function () {
    var addSection = document.getElementById('addSection');
    var removeSection = document.getElementById('removeSection');
    addSection.style.display = (addSection.style.display === 'none' ? 'block' : 'none');
    if (removeSection.style.display === 'block') {
        removeSection.style.display = 'none';
    }
});

document.getElementById('showRemoveForm').addEventListener('click', function () {
    var removeSection = document.getElementById('removeSection');
    var addSection = document.getElementById('addSection');
    removeSection.style.display = (removeSection.style.display === 'none' ? 'block' : 'none');
    if (addSection.style.display === 'block') {
        addSection.style.display = 'none';
    }
});

function getColumn(index) {
    let table = document.getElementById('gradeTable');
    let rows = table.rows;
    let columnData = [];
    for (let i = 1; i < rows.length; i++) {
        let cell = rows[i].cells[index];
        columnData.push(cell.innerHTML);
    }

    return columnData;
}

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
function calculateNTNUGPA(courseObject) {
    let sum = 0;
    let totalCredits = 0;

    for (let course in courseObject) {
        let gradeValue = getGradeValue(courseObject[course].grade);
        let credit = parseFloat(courseObject[course].credit);
        if (gradeValue === null)
            continue;
        if (gradeValue < 0) {
            console.error("Ugyldig karakter");
            continue;
        }
        sum += gradeValue * credit;
        totalCredits += credit;
    }
    return (sum / totalCredits).toFixed(2);
}

function calculateUIBGPA(courseObject){
    return 0;
}

function calculateGPA() {
    let courceCode = getColumn(0).map(code => code.replace(/<\/?b>/g, ''));
    let grades = getColumn(2);
    let credits = getColumn(3);
    let courceObject = {};

    for (let i = 0; i < courceCode.length; i++) {
        courceObject[courceCode[i]] = { grade: grades[i], credit: credits[i] };
    }
    let ntnuGrade = calculateNTNUGPA(courceObject);

    document.getElementById('gpaResult').innerHTML = `Snittet ditt er ${ntnuGrade}`;
}

