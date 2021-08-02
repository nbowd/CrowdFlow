document.addEventListener('DOMContentLoaded', makeRow);

var eventSelect = document.getElementById('eventIDAddInput')
document.addEventListener('DOMContentLoaded', getEventIDs(eventSelect))

var fanSelect = document.getElementById('soldToFanIDAddInput')
document.addEventListener('DOMContentLoaded', getFanIDs(fanSelect))

var employeeSelect = document.getElementById('soldByEmployeeIDAddInput')
document.addEventListener('DOMContentLoaded', getEmployeeIDs(employeeSelect))

// Build the table upon opening the page
document.addEventListener('DOMContentLoaded', function(event){
    var req = new XMLHttpRequest();

    req.open("GET", "http://flip1.engr.oregonstate.edu:41575/tickets", true);
    req.addEventListener('load', function(){
        if (req.status >= 200 && req.status < 400){
            var response = JSON.parse(req.responseText);
            makeTable(response);
        } else {
            console.log("Error in network request: " + req.statusText) 
        }
    })
        req.send(null);
});

var makeTable = function (tableData){

    // delete update inputs if they are on the page
    var lastChild = document.body.lastChild;
    if (lastChild.id == 'updateForm'){
        document.body.removeChild(lastChild);
        var lastChild = document.body.lastChild;
        document.body.removeChild(lastChild);
}    
    
    // delete current table if there is one
    var lastChild = document.body.lastChild;
    if (lastChild.id == 'currentTable'){
        document.body.removeChild(lastChild);
        var lastChild = document.body.lastChild;
        document.body.removeChild(lastChild);
    }

    // create table
    var tableElement = document.createElement('table');
    tableElement.setAttribute('id', 'currentTable');
    tableElement.setAttribute('class', 'container');
    tableElement.border = '1';
    document.body.appendChild(tableElement);

    // create the thead
    var tableHead = document.createElement('thead');
    tableElement.appendChild(tableHead);

    // create row for tableHead
    var headRow = document.createElement('tr');
    tableHead.appendChild(headRow);

    // add data to head row
    tableHeadData = ['Ticket ID', 'Event ID', 'Seat', 'Row', 'Section', 'Price', 'Payment Type', 'Sold By', 'Sold To', 'Will Call?', 'Valid?', '', '']
    tableHeadData.forEach(element => {
        var headerCell = document.createElement('th');
        var headerContent = document.createTextNode(element)
        headerCell.appendChild(headerContent);
        headRow.appendChild(headerCell);
    });

    // create table body
    var tableBody = document.createElement('tbody');
    tableElement.appendChild(tableBody);
    
    // add rows to table
    var rowContent = tableData.rows

    rowContent.forEach(entry => {
        var bodyRow = document.createElement('tr');
        tableBody.appendChild(bodyRow);
    
        // create ticket ID cell
        var ticketIDCell = document.createElement('td');
        var ticketIDContent = document.createTextNode(entry['ticketID']);
        ticketIDCell.appendChild(ticketIDContent);
        bodyRow.appendChild(ticketIDCell);
    
        // create event ID cell
        var eventIDCell = document.createElement('td');
        var eventIDContent = document.createTextNode(entry['eventID']);
        eventIDCell.appendChild(eventIDContent);
        bodyRow.appendChild(eventIDCell);

        // create seat cell
        var seatCell = document.createElement('td');
        var seatCellContent = document.createTextNode(entry['seat']);
        seatCell.appendChild(seatCellContent);
        bodyRow.appendChild(seatCell);
    
        // create row cell
        var rowCell = document.createElement('td');
        var rowCellContent = document.createTextNode(entry['row']);
        rowCell.appendChild(rowCellContent);
        bodyRow.appendChild(rowCell);
    
        // create section cell
        var sectionCell = document.createElement('td');
        var sectionCellContent = document.createTextNode(entry['section']);
        sectionCell.appendChild(sectionCellContent);
        bodyRow.appendChild(sectionCell);
    
        // create price cell
        var priceCell = document.createElement('td');
        var priceCellContent = document.createTextNode(entry['price']);
        priceCell.appendChild(priceCellContent);
        bodyRow.appendChild(priceCell);
    
        // create payment type cell
        var paymentTypeCell = document.createElement('td');
        var paymentTypeCellContent = document.createTextNode(entry['paymentMethod']);
        paymentTypeCell.appendChild(paymentTypeCellContent);
        bodyRow.appendChild(paymentTypeCell);

        // create sold by cell
        var soldByCell = document.createElement('td');
        var soldByCellContent = document.createTextNode(entry['soldByEmployeeID']);
        soldByCell.appendChild(soldByCellContent);
        bodyRow.appendChild(soldByCell);

        // create sold to cell
        var soldToCell = document.createElement('td');
        var soldToCellContent = document.createTextNode(entry['soldToFanID']);
        soldToCell.appendChild(soldToCellContent);
        bodyRow.appendChild(soldToCell);

        // create will call cell
        var willCallCell = document.createElement('td');
        var willCallCellContent = document.createTextNode(entry['isWillcall']);
        willCallCell.appendChild(willCallCellContent);
        bodyRow.appendChild(willCallCell);

        // create is valid cell
        var validCell = document.createElement('td');
        var validCellContent = document.createTextNode(entry['isValid']);
        validCell.appendChild(validCellContent);
        bodyRow.appendChild(validCell);

        // create update button
        var updateCell = document.createElement('td');
        var updateCellContent = document.createElement('button');
        var updateCellContentText = document.createTextNode('Update');
        updateCellContent.setAttribute('id', 'update'+entry['ticketID']);
        updateCellContent.setAttribute('value', entry['ticketID']);
        updateCellContent.setAttribute('class', 'table-button');
        updateCellContent.appendChild(updateCellContentText)
        updateCell.appendChild(updateCellContent);
        bodyRow.appendChild(updateCell);

        document.getElementById('update'+entry['ticketID']).addEventListener('click', function(event){
            var lastChild = document.body.lastChild;
            if (lastChild.id == 'updateForm'){
                document.body.removeChild(lastChild);
                var lastChild = document.body.lastChild;
                document.body.removeChild(lastChild);
            }
    
        var updatePrompt = document.createElement('h3');
        updatePrompt.setAttribute("class", "updateHeader")
        var updatePromptText = document.createTextNode('Update this ticket');
        updatePrompt.appendChild(updatePromptText);
        document.body.appendChild(updatePrompt)   
        
        var updateForm = document.createElement('form')
        updateForm.setAttribute('id', 'updateForm');
        updateForm.setAttribute('class', "container")
        document.body.appendChild(updateForm);
        
        // update event id
        var eventIDLabel = document.createElement('label');
        var eventIDLabelText = document.createTextNode(' Event ID ')
        eventIDLabel.setAttribute('for', 'eventIDUpdate');
        eventIDLabel.setAttribute('required', 'required');
        eventIDLabel.appendChild(eventIDLabelText);
        updateForm.appendChild(eventIDLabel);

        var eventIDSelect = document.createElement('select');
        eventIDSelect.setAttribute('name', 'eventIDUpdate');
        eventIDSelect.setAttribute('id', 'eventIDUpdate');
        eventIDSelect.setAttribute('value', entry['eventID']);
        eventIDSelect.setAttribute('required', 'required');
        updateForm.appendChild(eventIDSelect);
        getEventIDs(eventIDSelect)

        // update seat
        var seatLabel = document.createElement('label');
        var seatLabelText = document.createTextNode(' Seat ')
        seatLabel.setAttribute('for', 'seatUpdate');
        seatLabel.setAttribute('required', 'required');
        seatLabel.appendChild(seatLabelText);
        updateForm.appendChild(seatLabel);

        var seatSelect = document.createElement('select');
        seatSelect.setAttribute('name', 'seatUpdate');
        seatSelect.setAttribute('id', 'seatUpdate');
        seatSelect.setAttribute('value', entry['seat']);
        seatSelect.setAttribute('required', 'required');
        updateForm.appendChild(seatSelect);

        for (var n = 1; n < 21; n++) {
            var newOption = document.createElement('option');
            newOption.setAttribute('value', n);
            newOption.text = n;
            seatSelect.appendChild(newOption);
        };

        // update row
        var rowLabel = document.createElement('label');
        var rowLabelText = document.createTextNode(' Row ')
        rowLabel.setAttribute('for', 'rowUpdate');
        rowLabel.appendChild(rowLabelText);
        updateForm.appendChild(rowLabel);

        var rowSelect = document.createElement('select');
        rowSelect.setAttribute('name', 'rowUpdate');
        rowSelect.setAttribute('id', 'rowUpdate');
        rowSelect.setAttribute('value', entry['row']);
        rowSelect.setAttribute('required', 'required');
        updateForm.appendChild(rowSelect);

        var rowOptions = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O']
        for (row of rowOptions) {
            var newOption = document.createElement('option');
            newOption.setAttribute('value', row);
            newOption.text = row;
            rowSelect.appendChild(newOption);
        }

        // update section
        var sectionLabel = document.createElement('label');
        var sectionLabelText = document.createTextNode(' Section ')
        sectionLabel.setAttribute('for', 'sectionUpdate');
        sectionLabel.appendChild(sectionLabelText);
        updateForm.appendChild(sectionLabel);

        var sectionSelect = document.createElement('select');
        sectionSelect.setAttribute('name', 'sectionUpdate');
        sectionSelect.setAttribute('id', 'sectionUpdate');
        sectionSelect.setAttribute('value', entry['section']);
        sectionSelect.setAttribute('required', 'required');
        updateForm.appendChild(sectionSelect);

        var sectionOptions = ['AAA', 'BBB', 'CCC', 'DDD', 'EEE']
        for (section of sectionOptions) {
            var newOption = document.createElement('option');
            newOption.setAttribute('value', section);
            newOption.text = section;
            sectionSelect.appendChild(newOption);
        }

        // update price
        var priceLabel = document.createElement('label');
        var priceLabelText = document.createTextNode(' Price ')
        priceLabel.setAttribute('for', 'priceUpdate');
        priceLabel.appendChild(priceLabelText);
        updateForm.appendChild(priceLabel);

        var priceInput = document.createElement('input');
        priceInput.setAttribute('type', 'number');
        priceInput.setAttribute('name', 'priceUpdate');
        priceInput.setAttribute('id', 'priceUpdate');
        priceInput.setAttribute('value', entry['price']);
        priceInput.setAttribute('required', 'required');
        priceInput.setAttribute('min', 0);
        priceInput.setAttribute('step', 0.01);
        updateForm.appendChild(priceInput); 

        // update payment type
        var paymentMethodLabel = document.createElement('label');
        var paymentMethodLabelText = document.createTextNode(' Payment Type ')
        paymentMethodLabel.setAttribute('for', 'paymentMethodUpdate');
        paymentMethodLabel.appendChild(paymentMethodLabelText);
        updateForm.appendChild(paymentMethodLabel);

        var paymentMethodSelect = document.createElement('select');
        paymentMethodSelect.setAttribute('name', 'paymentMethodUpdate');
        paymentMethodSelect.setAttribute('id', 'paymentMethodUpdate');
        paymentMethodSelect.setAttribute('value', entry['paymentMethod']);
        paymentMethodSelect.setAttribute('required', 'required');
        updateForm.appendChild(paymentMethodSelect);

        var paymentMethodOptions = ['Cash', 'Visa', 'MasterCard', 'Amex', 'Discover']
        for (paymentMethod of paymentMethodOptions) {
            var newOption = document.createElement('option');
            newOption.setAttribute('value', paymentMethod);
            newOption.text = paymentMethod;
            paymentMethodSelect.appendChild(newOption);
        }

        // update sold by
        var soldByLabel = document.createElement('label');
        var soldByLabelText = document.createTextNode(' Sold By ')
        soldByLabel.setAttribute('for', 'soldByUpdate');
        soldByLabel.appendChild(soldByLabelText);
        updateForm.appendChild(soldByLabel);

        var soldBySelect = document.createElement('select');
        soldBySelect.setAttribute('name', 'soldByEmployeeIDUpdate');
        soldBySelect.setAttribute('id', 'soldByEmployeeIDUpdate');
        soldBySelect.setAttribute('value', entry['soldByEmployeeID']);
        updateForm.appendChild(soldBySelect);
        getEmployeeIDs(soldBySelect)

        // update sold to
        var soldToLabel = document.createElement('label');
        var soldToLabelText = document.createTextNode(' Sold To ')
        soldToLabel.setAttribute('for', 'soldToUpdate');
        soldToLabel.appendChild(soldToLabelText);
        updateForm.appendChild(soldToLabel);

        var soldToSelect = document.createElement('select');
        soldToSelect.setAttribute('name', 'soldToFanIDUpdate');
        soldToSelect.setAttribute('required', 'required');
        soldToSelect.setAttribute('id', 'soldToFanIDUpdate');
        soldToSelect.setAttribute('value', entry['soldToFanID']);
        updateForm.appendChild(soldToSelect);
        getFanIDs(soldToSelect)

        // update will call status
        var willCallLabel = document.createElement('label');
        var willCallLabelText = document.createTextNode(' Will Call? ')
        willCallLabel.setAttribute('for', 'isWillcallUpdate');
        willCallLabel.appendChild(willCallLabelText);
        updateForm.appendChild(willCallLabel);

        var willCallSelect = document.createElement('select');
        willCallSelect.setAttribute('name', 'isWillcallUpdate');
        willCallSelect.setAttribute('id', 'isWillcallUpdate');
        willCallSelect.setAttribute('value', entry['isWillcall']);
        willCallSelect.setAttribute('required', 'required');
        updateForm.appendChild(willCallSelect);

        var newOption = document.createElement('option');
        newOption.setAttribute('value', 1);
        newOption.text = "Yes";
        willCallSelect.appendChild(newOption);

        var newOption = document.createElement('option');
        newOption.setAttribute('value', 0);
        newOption.text = "No";
        willCallSelect.appendChild(newOption);

        // update valid status
        var isValidLabel = document.createElement('label');
        var isValidLabelText = document.createTextNode(' Valid? ')
        isValidLabel.setAttribute('for', 'isValidUpdate');
        isValidLabel.appendChild(isValidLabelText);
        updateForm.appendChild(isValidLabel);

        var isValidSelect = document.createElement('select');
        isValidSelect.setAttribute('name', 'isValidUpdate');
        isValidSelect.setAttribute('id', 'isValidUpdate');
        isValidSelect.setAttribute('value', entry['isValid']);
        isValidSelect.setAttribute('required', 'required');
        updateForm.appendChild(isValidSelect);

        var newOption = document.createElement('option');
        newOption.setAttribute('value', 1);
        newOption.text = "Yes";
        isValidSelect.appendChild(newOption);

        var newOption = document.createElement('option');
        newOption.setAttribute('value', 0);
        newOption.text = "No";
        isValidSelect.appendChild(newOption);

        // submit update
        var submitUpdate = document.createElement('input');
        submitUpdate.setAttribute('type', 'submit');
        submitUpdate.setAttribute('name', 'update' + entry['eventID']);
        submitUpdate.setAttribute('id', 'submitUpdate');
        submitUpdate.setAttribute('value', 'Submit');
        updateForm.appendChild(submitUpdate);

    
        document.getElementById('submitUpdate').addEventListener('click', function(event){
            var req = new XMLHttpRequest();
            var payload = {eventID:null, seat:null, row:null, section:null, price:null, paymentMethod:null, soldByEmployeeID:null, soldToFanID:null, isWillcall:null, isValid:null};
            payload.ticketID = entry['ticketID'];
            payload.eventID = document.getElementById('eventIDUpdate').value;
            payload.seat = document.getElementById('seatUpdate').value;
            payload.row = document.getElementById('rowUpdate').value;
            payload.section = document.getElementById('sectionUpdate').value;
            payload.price = document.getElementById('priceUpdate').value;
            payload.paymentMethod = document.getElementById('paymentMethodUpdate').value;
            payload.soldByEmployeeID = document.getElementById('soldByEmployeeIDUpdate').value;
            payload.soldToFanID = document.getElementById('soldToFanIDUpdate').value;
            payload.isWillcall = document.getElementById('isWillcallUpdate').value;
            payload.isValid = document.getElementById('isValidUpdate').value;
            console.log(payload)

            //validate form inputs
            if (payload.ticketID !== "" && payload.eventID !== "" && payload.seat !== "" && payload.row !== "" && payload.section !== "" && payload.price !== "" && payload.paymentMethod !== "" && payload.soldToFanID !== "" && payload.isWillcall !== "" && payload.isValid !== ""){
                req.open("PUT", "http://flip1.engr.oregonstate.edu:41575/tickets", true);
                req.setRequestHeader('Content-Type', 'application/json');
                req.addEventListener('load', function(){
                if (req.status >= 200 && req.status < 400){
                    var response = JSON.parse(req.responseText);
                    makeTable(response);
            } else {
                console.log("Error in network request: " + req.statusText) 
                }
            });
                req.send(JSON.stringify(payload));
                event.preventDefault();
                } else {
                    alert("Please fill complete all form fields.")
                }

                req.open("PUT", "http://flip1.engr.oregonstate.edu:41575/tickets", true);
                req.setRequestHeader('Content-Type', 'application/json');
                req.addEventListener('load', function(){
                if (req.status >= 200 && req.status < 400){
                    var response = JSON.parse(req.responseText);
                    makeTable(response);
                } else {
                    console.log("Error in network request: " + req.statusText) 
                    }
            });
                req.send(JSON.stringify(payload));
                event.preventDefault();
            });
    
        // cancel update
        var cancelUpdate = document.createElement('input');
        cancelUpdate.setAttribute('type', 'submit');
        cancelUpdate.setAttribute('name', 'cancelUpdate');
        cancelUpdate.setAttribute('id', 'cancelUpdate');
        cancelUpdate.setAttribute('value', 'Cancel');
        updateForm.appendChild(cancelUpdate);
        document.getElementById('cancelUpdate').addEventListener('click', function(){
            var lastChild = document.body.lastChild;
            document.body.removeChild(lastChild);
            var lastChild = document.body.lastChild;
            document.body.removeChild(lastChild);
            });
        });

        // create delete button
        var deleteCell = document.createElement('td');
        var deleteCellContent = document.createElement('button');
        var deleteCellContentText = document.createTextNode('Remove');
        deleteCellContent.setAttribute('id', 'delete' + entry['ticketID'])
        deleteCellContent.setAttribute('data-modal-target', '#delete-modal');
        deleteCellContent.setAttribute('class', 'table-button');
        deleteCellContent.appendChild(deleteCellContentText)
        deleteCell.appendChild(deleteCellContent);
        bodyRow.appendChild(deleteCell);
        addDeleteListener(entry['ticketID']);
    });
};

// get data from Events table
function getEventIDs(eventSelect) {
    var req = new XMLHttpRequest();
    req.open("GET", "http://flip1.engr.oregonstate.edu:41575/events", true);
    req.addEventListener('load', function(){
        if (req.status >= 200 && req.status < 400){
            var response = JSON.parse(req.responseText);
            appendEventID(response, eventSelect);
        } else {
            console.log("Error in network request: " + req.statusText) 
        }
    })
        req.send(null);
};

function appendEventID(eventInfo, eventSelect){
    eventInfo['rows'].forEach(element => {
        var newOption = document.createElement('option');
        newOption.setAttribute('value', element['eventID'])
        newOption.text = element['eventName']
        eventSelect.appendChild(newOption);
    });
}

// get data from Fans table
function getFanIDs(fanSelect) {
    var req = new XMLHttpRequest();

    req.open("GET", "http://flip1.engr.oregonstate.edu:41575/fans", true);
    req.addEventListener('load', function(){
        if (req.status >= 200 && req.status < 400){
            var response = JSON.parse(req.responseText);
            appendFanID(response, fanSelect);
        } else {
            console.log("Error in network request: " + req.statusText) 
        }
    })
        req.send(null);
};

function appendFanID(fanInfo, fanSelect){
    fanInfo['rows'].forEach(element => {
        var newOption = document.createElement('option');
        newOption.setAttribute('value', element['fanID'])
        newOption.text = element['firstName'] + " " + element['lastName']
        fanSelect.appendChild(newOption);
    });
}

// get data from Employees table
function getEmployeeIDs(employeeSelect) {
    var req = new XMLHttpRequest();

    req.open("GET", "http://flip1.engr.oregonstate.edu:41575/employees", true);
    req.addEventListener('load', function(){
        if (req.status >= 200 && req.status < 400){
            var response = JSON.parse(req.responseText);
            appendEmployeeID(response, employeeSelect);
        } else {
            console.log("Error in network request: " + req.statusText) 
        }
    })
        req.send(null);
};

function appendEmployeeID(employeeInfo, employeeSelect){
    employeeInfo['rows'].forEach(element => {
        var newOption = document.createElement('option');
        newOption.setAttribute('value', element['employeeID'])
        newOption.text = element['firstName'] + " " + element['lastName']
        employeeSelect.appendChild(newOption);
    });
}

function makeRow(){
    
    document.getElementById('submit').addEventListener('click', function(event){
        var req = new XMLHttpRequest();
        var payload = {eventID:null, seat:null, row:null, section:null, price:null, paymentMethod:null, soldByEmployeeID:null, soldToFanID:null, isWillcall:null, isValid:null};
        payload.eventID = document.getElementById('eventIDAddInput').value;
        payload.seat = document.getElementById('seatAddInput').value;
        payload.row = document.getElementById('rowAddInput').value;
        payload.section = document.getElementById('sectionAddInput').value;
        payload.price = document.getElementById('priceAddInput').value;
        payload.paymentMethod = document.getElementById('paymentMethodAddInput').value;
        payload.soldByEmployeeID = document.getElementById('soldByEmployeeIDAddInput').value;
        payload.soldToFanID = document.getElementById('soldToFanIDAddInput').value;
        payload.isWillcall = document.getElementById('isWillcallAddInput').value;
        payload.isValid = document.getElementById('isValidAddInput').value;
    
        //validate form inputs
        if (payload.eventID !== "" && payload.seat !== "" && payload.row !== "" && payload.section !== "" && payload.price !== "" && payload.paymentMethod !== "" && payload.soldByEmployeeID !== "" && payload.soldToFanID !== "" && payload.isWillcall !== "" && payload.isValid !== ""){
            req.open("POST", "http://flip1.engr.oregonstate.edu:41575/tickets", true);
            req.setRequestHeader('Content-Type', 'application/json');

            req.addEventListener('load', function(){
                if (req.status >= 200 && req.status < 400){
                    var response = JSON.parse(req.responseText);
                    makeTable(response);
                } else {
                    console.log("Error in network request: " + req.statusText) 
            }
        })  
            req.send(JSON.stringify(payload));
            event.preventDefault();
        } else {
            alert("Please fill complete all form fields.")
        }
    })
};

function addDeleteListener(currentID){
    document.getElementById('delete'+currentID).addEventListener('click', function(event){
        confirm("Are you sure you want to delete this ticket?")
        var req = new XMLHttpRequest();
        var payload = {ticketID:null};
        payload.ticketID = currentID;
        console.log(payload)
    
        req.open("DELETE", "http://flip1.engr.oregonstate.edu:41575/tickets", true);
        req.setRequestHeader('Content-Type', 'application/json');
        req.addEventListener('load', function(){
            if (req.status >= 200 && req.status < 400){
                var response = JSON.parse(req.responseText);
                makeTable(response);
            } else {
                console.log("Error in network request: " + req.statusText) 
            }
        })
  
        req.send(JSON.stringify(payload));
        event.preventDefault();
    
          });
    
      };
