document.getElementById('addButton').addEventListener('click', function() {
    var table = document.getElementById('gradeTable');

    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(3);

    cell1.innerHTML = "X";
    cell2.innerHTML = "Y";
    cell3.innerHTML = "X";
    cell4.innerHTML = "Z";
    cell5.innerHTML = "X";

});
