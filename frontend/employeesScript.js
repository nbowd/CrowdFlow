const baseUrl = "http://localhost:4598";
// When <body> gets loaded on html page this gets current rows
const onLoad = async () => {
    const response = await axios.get(`${baseUrl}/employees`);
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

    let tbody = document.querySelector('#employees-tbody');
    let tr = tbody.appendChild(document.createElement('tr'));
    // Assign table id as row name
    tr.id = 'row' + row.employeeID;

    // ID
    makeCell(tr, row.employeeID);

    // First Name 
    makeCell(tr, row.firstName);

    // Last Name
    makeCell(tr, row.lastName);

    // Birthdate
    makeCell(tr, row.birthdate);

    // startDate
    makeCell(tr, row.startDate);

    // Phone
    makeCell(tr, row.phone);

    // Email
    makeCell(tr, row.email);

    // Update and Delete buttons 
    makeOptions(tr, row.employeeID, '#employees-edit-modal')
};

// Create New Fan
const employeeForm = document.getElementById('employees-form')
employeeForm && employeeForm.addEventListener('submit', async (event) => {
    event.preventDefault()

    let context = {
        firstName: employeeForm.elements.firstName.value,
        lastName: employeeForm.elements.lastName.value,
        birthdate: employeeForm.elements.birthdate.value,
        startDate: employeeForm.elements.startDate.value,
        phone: employeeForm.elements.phone.value,
        email: employeeForm.elements.email.value,
    }

    const response = await axios.post(`${baseUrl}/employees`, context);
    const rows = response.data.rows;

    makeRow(rows[rows.length - 1]); // Adds newest fan

    employeeForm.reset(); // Clears form inputs
    closeModal(employeeForm.closest('.modal'));
})

const employeesTable = document.getElementById('employees-table')

// One event listener for the whole table, will decide what actions to take based on the target selected.
// We will have to implement separate functions for updating and delete rows, these will be called with a the modal buttons are clicked.
employeesTable && employeesTable.addEventListener('click', async (event) => {
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
    document.querySelector('#firstName-edit').value = rowInfo[1]
    document.querySelector('#lastName-edit').value = rowInfo[2]
    document.querySelector('#birthdate-edit').value = rowInfo[3]
    document.querySelector('#startDate-edit').value = rowInfo[4]
    document.querySelector('#phone-edit').value = rowInfo[5]
    document.querySelector('#email-edit').value = rowInfo[6]
}

// Another wrapper but for delete, opens the delete modal and listens for the delete button press. Using the id passed to it to submit a delete request.
// Inputs: modal target, id of fan to be deleted
const openDelete = (modTarget, id) => {
    openModal(modTarget)

    document.getElementById('delete-button').addEventListener('click', async () => {
        let response = await axios.delete(`${baseUrl}/employees?id=${id}`)
        closeModal(modTarget)
        const rowsArray = response.data.rows;

        document.getElementById('employees-tbody').innerHTML = ''; // Resets table body for repopulation
    
        for (let row in rowsArray) {
            makeRow(rowsArray[row]); // Repopulates rows       
        }  
    })
}

// Update functionality. Listens for edit form submit, then grabs the changed information from the modal, and makes a put request. Clears the table and repopulates.
const submitEdit = document.getElementById('employees-edit')
submitEdit && submitEdit.addEventListener('submit', async (event) => {
    event.preventDefault()

    let context = {
        firstName: submitEdit.elements.firstName.value,
        lastName: submitEdit.elements.lastName.value,
        birthdate: submitEdit.elements.birthdate.value,
        startDate: submitEdit.elements.startDate.value,
        phone: submitEdit.elements.phone.value,
        email: submitEdit.elements.email.value
    }

    let response = await axios.put(`${baseUrl}/employees?id=${submitEdit.elements.id.value}`, context);
    const rowsArray = response.data.rows;
    document.getElementById('employees-tbody').innerHTML = '';
    closeModal(submitEdit.closest('.modal'))
    for (let row in rowsArray) {
        makeRow(rowsArray[row]); // Repopulates rows       
    }  
})

const filterForm = document.getElementById('employees-filter')

filterForm && filterForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const idFilter = filterForm.elements.idSearch.value
    if (idFilter) {
        let response = await axios.get(`${baseUrl}/employees/searchid?id=${idFilter}`)
        const rowsArray = response.data.rows;

        document.getElementById('employees-tbody').innerHTML = ''; // Resets table body for repopulation
    
        for (let row in rowsArray) {
            makeRow(rowsArray[row]); // Repopulates rows       
        }  
    } else {
        const nameFilter = filterForm.elements.nameSearch.value

        let response = await axios.get(`${baseUrl}/employees/${nameFilter}`)
        const rowsArray = response.data.rows;

        document.getElementById('employees-tbody').innerHTML = ''; // Resets table body for repopulation
    
        for (let row in rowsArray) {
            makeRow(rowsArray[row]); // Repopulates rows       
        } 
    }
})

document.getElementById('nameSearch').addEventListener('click', () => {
    document.getElementById('employees-filter').elements.idSearch.value = ''
})