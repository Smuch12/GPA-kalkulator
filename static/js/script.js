import { calculateGPA, calculateUIBGPA } from './calculateGrade.js';


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


document.addEventListener('DOMContentLoaded', (event) => {
    const button = document.getElementById('buttonGPA');
    if (button) {
        button.addEventListener('click', displayGPA);
    }
});

 function displayGPA() {
    let courceCode = getColumn(0).map(code => code.replace(/<\/?b>/g, ''));
    let grades = getColumn(2);
    let credits = getColumn(3);
    let courceObject = {};

    for (let i = 0; i < courceCode.length; i++) {
        courceObject[courceCode[i]] = { grade: grades[i], credit: credits[i] };
    }
    let ntnuGrade = calculateGPA(courceObject);
    let uibGrade = calculateUIBGPA(courceObject);
    document.getElementById('gpaResult').innerHTML = `Snittet ditt er:  ${ntnuGrade} for NTNU, og ${uibGrade} for UIB`;
}


