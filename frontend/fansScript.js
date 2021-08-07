const baseUrl = "http://localhost:4598";
// const baseUrl = "http://flip1.engr.oregonstate.edu:4598";
// When <body> gets loaded on html page this gets current rows
const onLoad = async () => {
    const response = await axios.get(`${baseUrl}/fans`);
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

    let tbody = document.querySelector('#fans-tbody');
    let tr = tbody.appendChild(document.createElement('tr'));
    // Assign table id as row name
    tr.id = 'row' + row.fanID;

    // ID
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
    makeOptions(tr, row.fanID, '#fans-edit-modal')
};

// Create New Fan
const fansForm = document.getElementById('fans-form')
fansForm && fansForm.addEventListener('submit', async (event) => {
    event.preventDefault()

    let context = {
        firstName: fansForm.elements.firstName.value,
        lastName: fansForm.elements.lastName.value,
        gender: fansForm.elements.gender.value,
        birthdate: fansForm.elements.birthdate.value,
        phone: fansForm.elements.phone.value,
        email: fansForm.elements.email.value,
        membership: fansForm.elements.membership.value,
        comment: fansForm.elements.comment.value,
    }

    const response = await axios.post(`${baseUrl}/fans`, context);
    const rows = response.data.rows;

    makeRow(rows[rows.length - 1]); // Adds newest fan

    fansForm.reset(); // Clears form inputs
    closeModal(fansForm.closest('.modal'));
})

const fansTable = document.getElementById('fans-table')

// One event listener for the whole table, will decide what actions to take based on the target selected.
// We will have to implement separate functions for updating and delete rows, these will be called with a the modal buttons are clicked.
fansTable && fansTable.addEventListener('click', async (event) => {
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
    console.log(rowInfo);
    openModal(modTarget)

    document.querySelector('#id-edit').value = rowInfo[0]
    document.querySelector('#firstName-edit').value = rowInfo[1]
    document.querySelector('#lastName-edit').value = rowInfo[2]
    document.querySelector('#gender-edit').value = rowInfo[3]
    document.querySelector('#birthdate-edit').value = rowInfo[4]
    document.querySelector('#phone-edit').value = rowInfo[5]
    document.querySelector('#email-edit').value = rowInfo[6]
    if (rowInfo[7] === "Yes") {
        document.querySelector('#membership-edit').checked = true
    } else if (rowInfo[7] ===  "No") {
        document.querySelector('#membership-edit').checked = false
    }
    document.querySelector('#comment-edit').value = rowInfo[8]
}

// Another wrapper but for delete, opens the delete modal and listens for the delete button press. Using the id passed to it to submit a delete request.
// Inputs: modal target, id of fan to be deleted
const openDelete = (modTarget, id) => {
    openModal(modTarget)

    document.getElementById('delete-button').addEventListener('click', async () => {
        let response = await axios.delete(`${baseUrl}/fans?id=${id}`)
        closeModal(modTarget)
        const rowsArray = response.data.rows;

        document.getElementById('fans-tbody').innerHTML = ''; // Resets table body for repopulation
    
        for (let row in rowsArray) {
            makeRow(rowsArray[row]); // Repopulates rows       
        }  
    })
}

// Update functionality. Listens for edit form submit, then grabs the changed information from the modal, and makes a put request. Clears the table and repopulates.
const submitEdit = document.getElementById('fans-edit')
submitEdit && submitEdit.addEventListener('submit', async (event) => {
    event.preventDefault()
    let membershipBinary = 0

    if (submitEdit.elements.membership.checked) {
        membershipBinary = 1
    }

    let context = {
        firstName: submitEdit.elements.firstName.value,
        lastName: submitEdit.elements.lastName.value,
        gender: submitEdit.elements.gender.value,
        birthdate: submitEdit.elements.birthdate.value,
        phone: submitEdit.elements.phone.value,
        email: submitEdit.elements.email.value,
        membership: membershipBinary,
        comment: submitEdit.elements.comment.value
    }

    let response = await axios.put(`${baseUrl}/fans?id=${submitEdit.elements.id.value}`, context);
    const rowsArray = response.data.rows;
    document.getElementById('fans-tbody').innerHTML = '';
    closeModal(submitEdit.closest('.modal'))
    for (let row in rowsArray) {
        makeRow(rowsArray[row]); // Repopulates rows       
    }  
})

const Filter = document.getElementById('fans-filter')

Filter && Filter.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const idFilter = Filter.elements.idSearch.value
    if (idFilter) {
        let response = await axios.get(`${baseUrl}/fans/searchid?id=${idFilter}`)
        const rowsArray = response.data.rows;

        document.getElementById('fans-tbody').innerHTML = ''; // Resets table body for repopulation
    
        for (let row in rowsArray) {
            makeRow(rowsArray[row]); // Repopulates rows       
        }  
    } else {
        const nameFilter = Filter.elements.nameSearch.value

        let response = await axios.get(`${baseUrl}/fans/${nameFilter}`)
        const rowsArray = response.data.rows;

        document.getElementById('fans-tbody').innerHTML = ''; // Resets table body for repopulation
    
        for (let row in rowsArray) {
            makeRow(rowsArray[row]); // Repopulates rows       
        } 
    }
})

document.getElementById('nameSearch').addEventListener('click', () => {
    document.getElementById('fans-filter').elements.idSearch.value = ''
})