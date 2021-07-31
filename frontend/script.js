// -------------------- GLOBAL STYLING ---------------------------------
// These data attributes are separate and unaffected by styling classes
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')

const overlay = document.getElementById('overlay')

overlay && overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => {
        closeModal(modal)
    })
})

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
})

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        closeModal(modal)
    })
})

function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}

// -------------------- HOME PAGE ---------------------------------
const baseUrl = "http://localhost:4598";

// -------------------- TICKETS ---------------------------------
// -------------------- EVENTS ---------------------------------
// -------------------- EMPLOYEES ---------------------------------
// -------------------- FANS ---------------------------------

// When <body> gets loaded on html page this gets current rows
const fanLoad = async () => {
    const response = await axios.get(`${baseUrl}/fans`);
    const rowsArray = response.data.rows;
    for (let row in rowsArray) {
        fanRow(rowsArray[row]);
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
const fanRow = (row) => {

    let tbody = document.querySelector('#fan-tbody');
    let tr = tbody.appendChild(document.createElement('tr'));
    // Assign table id as row name
    tr.id = 'row' + row.fanID;

    // Last Name
    makeCell(tr, row.fanID);

    // First Name 
    makeCell(tr, row.firstName);

    // Last Name
    makeCell(tr, row.lastName);

    // Gender
    makeCell(tr, row.gender);

    // Birthdate
    makeCell(tr, row.birthdate);

    // Phone
    makeCell(tr, row.phone);

    // Email
    makeCell(tr, row.email);

    // Converts binary to membership value
    const members = (row) => {
        if (row.membership === 1) {
            return "Yes"
        } else {
            return "No"
        }
    }

    // Membership
    makeCell(tr, members(row));

    // Comment
    makeCell(tr, row.comment);

    // Update and Delete buttons 
    makeOptions(tr, row.fanID, '#fan-edit-modal')
};

// Create New Fan
const fanForm = document.getElementById('fan-form')
fanForm && fanForm.addEventListener('submit', async (event) => {
    event.preventDefault()

    let context = {
        firstName: fanForm.elements.firstName.value,
        lastName: fanForm.elements.lastName.value,
        gender: fanForm.elements.gender.value,
        birthdate: fanForm.elements.birthdate.value,
        phone: fanForm.elements.phone.value,
        email: fanForm.elements.email.value,
        membership: fanForm.elements.membership.value,
        comment: fanForm.elements.comment.value,
    }

    const response = await axios.post(`${baseUrl}/fans`, context);
    const rows = response.data.rows;

    fanRow(rows[rows.length - 1]); // Adds newest fan

    fanForm.reset(); // Clears form inputs
    closeModal(fanForm.closest('.modal'));
})

const fanTable = document.getElementById('fan-table')

// One event listener for the whole table, will decide what actions to take based on the target selected.
// We will have to implement separate functions for updating and delete rows, these will be called with a the modal buttons are clicked.
fanTable && fanTable.addEventListener('click', async (event) => {
    let target = event.target

    // Update button
    if (target.value === 'Update') {
        let modTarget = document.querySelector(target.dataset.modalTarget)
        let targetRow = document.querySelector(`#row${target.id}`)
        openFanEdit(targetRow, modTarget) 
    }

    // Delete button
    if (target.value === 'Delete') {
        let modTarget = document.querySelector(target.dataset.modalTarget)
        openFanDelete(modTarget, target.id)
    }
})

// This is essential a wrapper function for openModal, gathers all the current row values from the table and creates a list used to display those values on the 
// edit modal. Sets up display information only.
// Inputs: modal target, current row object
const openFanEdit = (targetRow, modTarget) => {
    const currentValues = targetRow.querySelectorAll('td') // All cells
    let rowInfo = []
    Object.values(currentValues).forEach(item => rowInfo.push(item.innerText)) // Strips away other attributes

    openModal(modTarget)

    document.querySelector('#id-edit').value = rowInfo[0]
    document.querySelector('#firstName-edit').value = rowInfo[1]
    document.querySelector('#lastName-edit').value = rowInfo[2]
    document.querySelector('#gender-edit').value = rowInfo[3]
    document.querySelector('#birthdate-edit').value = rowInfo[4]
    document.querySelector('#phone-edit').value = rowInfo[5]
    document.querySelector('#email-edit').value = rowInfo[6]
    if (rowInfo[7] === "Yes") {
        document.querySelector('#membership-edit').checked = 'true'
    }
    document.querySelector('#comment-edit').value = rowInfo[8]
}

// Another wrapper but for delete, opens the delete modal and listens for the delete button press. Using the id passed to it to submit a delete request.
// Inputs: modal target, id of fan to be deleted
const openFanDelete = (modTarget, id) => {
    openModal(modTarget)

    document.getElementById('delete-button').addEventListener('click', async () => {
        let response = await axios.delete(`${baseUrl}/fans?id=${id}`)
        closeModal(modTarget)
        const rowsArray = response.data.rows;

        document.getElementById('fan-tbody').innerHTML = ''; // Resets table body for repopulation
    
        for (let row in rowsArray) {
            fanRow(rowsArray[row]); // Repopulates rows       
        }  
    })
}

// Update functionality. Listens for edit form submit, then grabs the changed information from the modal, and makes a put request. Clears the table and repopulates.
const submitFanEdit = document.getElementById('fan-edit')
submitFanEdit && submitFanEdit.addEventListener('submit', async (event) => {
    event.preventDefault()

    let context = {
        firstName: submitFanEdit.elements.firstName.value,
        lastName: submitFanEdit.elements.lastName.value,
        gender: submitFanEdit.elements.gender.value,
        birthdate: submitFanEdit.elements.birthdate.value,
        phone: submitFanEdit.elements.phone.value,
        email: submitFanEdit.elements.email.value,
        membership: submitFanEdit.elements.membership.value,
        comment: submitFanEdit.elements.comment.value
    }
    // console.log(context);

    let response = await axios.put(`${baseUrl}/fans?id=${submitFanEdit.elements.id.value}`, context);
    const rowsArray = response.data.rows;
    document.getElementById('fan-tbody').innerHTML = '';
    closeModal(submitFanEdit.closest('.modal'))
    for (let row in rowsArray) {
        fanRow(rowsArray[row]); // Repopulates rows       
    }  
})


// -------------------- EVENTS_FANS ---------------------------------
// -------------------- JOB_TITLES ---------------------------------
// -------------------- EMPLOYEE_JOB_TITLES ---------------------------------
