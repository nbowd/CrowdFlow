const baseUrl = "http://localhost:4598";
// When <body> gets loaded on html page this gets current rows
const onLoad = async () => {
    document.getElementById('empJobs-tbody').innerHTML = '';
    const response = await axios.get(`${baseUrl}/emp_jobs`);
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

    let tbody = document.querySelector('#empJobs-tbody');
    let tr = tbody.appendChild(document.createElement('tr'));
    // Assign table id as row name
    tr.id = 'row' + row.employeeID;

    // jobID
    makeCell(tr, row.jobID);

    // employeeID 
    makeCell(tr, row.employeeID);

    // Update and Delete buttons 
    makeOptions(tr, row.employeeID, '#empJobs-edit-modal')
};

// Create New Fan
const empJobsForm = document.getElementById('empJobs-form')
empJobsForm && empJobsForm.addEventListener('submit', async (event) => {
    event.preventDefault()

    let context = {
        jobID: empJobsForm.elements.jobID.value,
        employeeID: empJobsForm.elements.employeeID.value,
    }

    const response = await axios.post(`${baseUrl}/emp_jobs`, context);
    const rows = response.data.rows;

    document.getElementById('empJobs-tbody').innerHTML = ''; // Resets table body for repopulation
    rows.forEach(row => makeRow(row))
    // makeRow(rows[rows.length - 1]); // Adds newest fan

    empJobsForm.reset(); // Clears form inputs
    closeModal(empJobsForm.closest('.modal'));
})

const empJobsTable = document.getElementById('empJobs-table')

// One event listener for the whole table, will decide what actions to take based on the target selected.
// We will have to implement separate functions for updating and delete rows, these will be called with a the modal buttons are clicked.
empJobsTable && empJobsTable.addEventListener('click', async (event) => {
    let target = event.target

    // Delete button
    if (target.value === 'Delete') {
        let modTarget = document.querySelector(target.dataset.modalTarget)
        let targetRow = target.closest('tr')
        openDelete(targetRow, modTarget)
    }
})

// Another wrapper but for delete, opens the delete modal and listens for the delete button press. Using the id passed to it to submit a delete request.
// Inputs: modal target, id of fan to be deleted
const openDelete = (targetRow, modTarget) => {
    const currentValues = targetRow.querySelectorAll('td') // All cells
    let rowInfo = []
    Object.values(currentValues).forEach(item => rowInfo.push(item.innerText)) // Strips away other attributes

    openModal(modTarget)

    document.getElementById('delete-button').addEventListener('click', async () => {
        let response = await axios.delete(`${baseUrl}/emp_jobs?jid=${rowInfo[0]}&eid=${rowInfo[1]}`)
        closeModal(modTarget)
        const rowsArray = response.data.rows;

        document.getElementById('empJobs-tbody').innerHTML = ''; // Resets table body for repopulation

        for (let row in rowsArray) {
            makeRow(rowsArray[row]); // Repopulates rows       
        }
    })
}



const Filter = document.getElementById('empJobs-filter')

Filter && Filter.addEventListener('submit', async (event) => {
    event.preventDefault();

    const jidFilter = Filter.elements.jobSearch.value
    const eidFilter = Filter.elements.empSearch.value

    if (jidFilter) {
        let response = await axios.get(`${baseUrl}/emp_jobs/jobs?id=${jidFilter}`)
        const rowsArray = response.data.rows;
        

        document.getElementById('empJobs-tbody').innerHTML = ''; // Resets table body for repopulation

        for (let row in rowsArray) {
            makeRow(rowsArray[row]); // Repopulates rows       
        }
    } else if (eidFilter) {
        let response = await axios.get(`${baseUrl}/emp_jobs/employees?id=${eidFilter}`)
        const rowsArray = response.data.rows;
        document.getElementById('empJobs-tbody').innerHTML = ''; // Resets table body for repopulation

        for (let row in rowsArray) {
            makeRow(rowsArray[row]); // Repopulates rows       
        }
    } else {
        onLoad()
    }
})

document.getElementById('empSearch').addEventListener('click', () => {
    document.getElementById('empJobs-filter').elements.jobSearch.value = ''
})

document.getElementById('jobSearch').addEventListener('click', () => {
    document.getElementById('empJobs-filter').elements.empSearch.value = ''
})