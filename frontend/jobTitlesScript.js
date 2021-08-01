const baseUrl = "http://localhost:4598";
// When <body> gets loaded on html page this gets current rows
const onLoad = async () => {
    const response = await axios.get(`${baseUrl}/jobs`);
    const rowsArray = response.data.rows;
    for (let row in rowsArray) {
        makeRow(rowsArray[row]);
    };
}

// Usable for any plain text cell
// Inputs: current row, desired text
const makeCell = (tr, rowProp) => {
    let cell = tr.appendChild(document.createElement('td'));
    cell.textContent = rowProp
}

// Creates update and delete button, assigns id using 'table name' + 'id'
// Inputs: current row, id number, edit modal target
const makeOptions = (tr, id, editTarget) => {
    let optionsCell = tr.appendChild(document.createElement('td'));

    let UpdateButton = optionsCell.appendChild(document.createElement('input'));
    UpdateButton.type = 'button';
    UpdateButton.value = 'Update';
    UpdateButton.id = id
    UpdateButton.dataset.modalTarget = editTarget
    UpdateButton.classList.add('table-button')

    let DeleteButton = optionsCell.appendChild(document.createElement('input'));
    DeleteButton.type = 'button';
    DeleteButton.value = 'Delete';
    DeleteButton.id = id
    DeleteButton.dataset.modalTarget = "#delete-modal"
    DeleteButton.classList.add('table-button')

}

// Row function, these will probably have to be page specific
// Inputs: row object
const makeRow = (row) => {

    let tbody = document.querySelector('#jobTitles-tbody');
    let tr = tbody.appendChild(document.createElement('tr'));
    // Assign table id as row name
    tr.id = 'row' + row.jobID;

    // ID
    makeCell(tr, row.jobID);

    // Job title 
    makeCell(tr, row.title);

    // Job description
    makeCell(tr, row.description);

    // Update and Delete buttons 
    makeOptions(tr, row.jobID, '#jobTitles-edit-modal')
};

// Create New Fan
const jobTitlesForm = document.getElementById('jobTitles-form')
jobTitlesForm && jobTitlesForm.addEventListener('submit', async (event) => {
    event.preventDefault()

    let context = {
        title: jobTitlesForm.elements.title.value,
        description: jobTitlesForm.elements.description.value,
    }

    const response = await axios.post(`${baseUrl}/jobs`, context);
    const rows = response.data.rows;

    makeRow(rows[rows.length - 1]); // Adds newest fan

    jobTitlesForm.reset(); // Clears form inputs
    closeModal(jobTitlesForm.closest('.modal'));
})

const jobTitlesTable = document.getElementById('jobTitles-table')

// One event listener for the whole table, will decide what actions to take based on the target selected.
// We will have to implement separate functions for updating and delete rows, these will be called with a the modal buttons are clicked.
jobTitlesTable && jobTitlesTable.addEventListener('click', async (event) => {
    let target = event.target

    // Update button
    if (target.value === 'Update') {
        let modTarget = document.querySelector(target.dataset.modalTarget)
        let targetRow = document.querySelector(`#row${target.id}`)
        openEdit(targetRow, modTarget) 
    }

    // Delete button
    if (target.value === 'Delete') {
        let modTarget = document.querySelector(target.dataset.modalTarget)
        openDelete(modTarget, target.id)
    }
})

// This is essential a wrapper function for openModal, gathers all the current row values from the table and creates a list used to display those values on the 
// edit modal. Sets up display information only.
// Inputs: modal target, current row object
const openEdit = (targetRow, modTarget) => {
    const currentValues = targetRow.querySelectorAll('td') // All cells
    let rowInfo = []
    Object.values(currentValues).forEach(item => rowInfo.push(item.innerText)) // Strips away other attributes

    openModal(modTarget)

    document.querySelector('#id-edit').value = rowInfo[0]
    document.querySelector('#title-edit').value = rowInfo[1]
    document.querySelector('#description-edit').value = rowInfo[2]

}

// Another wrapper but for delete, opens the delete modal and listens for the delete button press. Using the id passed to it to submit a delete request.
// Inputs: modal target, id of fan to be deleted
const openDelete = (modTarget, id) => {
    openModal(modTarget)

    document.getElementById('delete-button').addEventListener('click', async () => {
        let response = await axios.delete(`${baseUrl}/jobs?id=${id}`)
        closeModal(modTarget)
        const rowsArray = response.data.rows;

        document.getElementById('jobTitles-tbody').innerHTML = ''; // Resets table body for repopulation
    
        for (let row in rowsArray) {
            makeRow(rowsArray[row]); // Repopulates rows       
        }  
    })
}

// Update functionality. Listens for edit form submit, then grabs the changed information from the modal, and makes a put request. Clears the table and repopulates.
const submitEdit = document.getElementById('jobTitles-edit')
submitEdit && submitEdit.addEventListener('submit', async (event) => {
    event.preventDefault()

    let context = {
        title: submitEdit.elements.title.value,
        description: submitEdit.elements.description.value,
    }
    let response = await axios.put(`${baseUrl}/jobs?id=${submitEdit.elements.id.value}`, context);
    const rowsArray = response.data.rows;
    document.getElementById('jobTitles-tbody').innerHTML = '';
    closeModal(submitEdit.closest('.modal'))
    for (let row in rowsArray) {
        makeRow(rowsArray[row]); // Repopulates rows       
    }  
})
