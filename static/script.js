document.getElementById('showAddForm').addEventListener('click', function() {
    var addSection = document.getElementById('addSection');
    var removeSection = document.getElementById('removeSection');
    addSection.style.display = (addSection.style.display === 'none' ? 'block' : 'none');
    if (removeSection.style.display === 'block') {
        removeSection.style.display = 'none';
    }
});

document.getElementById('showRemoveForm').addEventListener('click', function() {
    var removeSection = document.getElementById('removeSection');
    var addSection = document.getElementById('addSection');
    removeSection.style.display = (removeSection.style.display === 'none' ? 'block' : 'none');
    if (addSection.style.display === 'block') {
        addSection.style.display = 'none';
    }
});
