import { calculateGPA, calculateUIBGPA } from './calculateGrade.js';

function getColumn(index) {
    let $table = $('#gradeTable');
    let rows = $table.find('tr');
    let columnData = [];
    rows.each(function(i, row){
        if (i === 0) return; 
        let cell = $(row).find('td').eq(index);
        columnData.push(cell.html());
    });
    return columnData;
}

function displayGPA() {
    let courseCode = getColumn(0).map(code => code.replace(/<\/?b>/g, ''));
    let grades = getColumn(2);
    let credits = getColumn(3);
    let courseObject = {};

    for (let i = 0; i < courseCode.length; i++) {
        courseObject[courseCode[i]] = { grade: grades[i], credit: credits[i] };
    }
    let ntnuGrade = calculateGPA(courseObject);
    let uibGrade = calculateUIBGPA(courseObject);

    $('#gpaResult').text(`Snittet ditt er: ${ntnuGrade} for NTNU, og ${uibGrade} for UIB`);
}

$(document).ready(function() {
    $('#showAddForm').on('click', function () {
        var $addSection = $('#addSection');
        var $removeSection = $('#removeSection');
        $addSection.toggle();
        if ($removeSection.is(':visible')) {
            $removeSection.hide();
        }
    });

    $('#showRemoveForm').on('click', function () {
        var $removeSection = $('#removeSection');
        var $addSection = $('#addSection');
        $removeSection.toggle();
        if ($addSection.is(':visible')) {
            $addSection.hide();
        }
    });

    $('#buttonGPA').on('click', function() {
        displayGPA();
    });
});