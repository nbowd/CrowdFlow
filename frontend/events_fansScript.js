document.addEventListener('DOMContentLoaded', makeRow);

var eventSelect = document.getElementById('eventIDAddInput')
document.addEventListener('DOMContentLoaded', getEventIDs(eventSelect))

var fanSelect = document.getElementById('fanIDAddInput')
document.addEventListener('DOMContentLoaded', getFanIDs(fanSelect))

// Build the table upon opening the page
document.addEventListener('DOMContentLoaded', function(event){
    var req = new XMLHttpRequest();

    req.open("GET", "http://flip1.engr.oregonstate.edu:41575/events_fans", true);
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
    tableHeadData = ['Event ID', 'Fan ID', '', '']
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

    // create event ID cell
    var eventIDCell = document.createElement('td');
    var eventIDCellContent = document.createTextNode(entry['eventID']);
    eventIDCell.appendChild(eventIDCellContent);
    bodyRow.appendChild(eventIDCell);

    // create event name cell
    var fanIDCell = document.createElement('td');
    var fanIDCellContent = document.createTextNode(entry['fanID']);
    fanIDCell.appendChild(fanIDCellContent);
    bodyRow.appendChild(fanIDCell);

    // create update button
    var updateCell = document.createElement('td');
    var updateCellContent = document.createElement('button');
    var updateCellContentText = document.createTextNode('Update');
    updateCellContent.setAttribute('id', 'update'+entry['eventID'] + '-' + entry['fanID']);
    updateCellContent.setAttribute('value', 'update'+entry['eventID'] + '-' + entry['fanID']);
    updateCellContent.setAttribute('class', 'table-button');
    updateCellContent.appendChild(updateCellContentText)
    updateCell.appendChild(updateCellContent);
    bodyRow.appendChild(updateCell);

    document.getElementById('update'+entry['eventID'] + '-' + entry['fanID']).addEventListener('click', function(event){
        var lastChild = document.body.lastChild;
        if (lastChild.id == 'updateForm'){
            document.body.removeChild(lastChild);
            var lastChild = document.body.lastChild;
            document.body.removeChild(lastChild);
        }

    var updatePrompt = document.createElement('h3');
    updatePrompt.setAttribute("class", "updateHeader")
    var updatePromptText = document.createTextNode('Update this relationship');
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

    // update fan id
    var fanIDLabel = document.createElement('label');
    var fanIDLabelText = document.createTextNode(' Fan ID ')
    fanIDLabel.setAttribute('for', 'fanIDUpdate');
    fanIDLabel.setAttribute('required', 'required');
    fanIDLabel.appendChild(fanIDLabelText);
    updateForm.appendChild(fanIDLabel);

    var fanIDSelect = document.createElement('select');
    fanIDSelect.setAttribute('name', 'fanIDUpdate');
    fanIDSelect.setAttribute('id', 'fanIDUpdate');
    fanIDSelect.setAttribute('value', entry['fanID']);
    fanIDSelect.setAttribute('required', 'required');
    updateForm.appendChild(fanIDSelect);
    getFanIDs(fanIDSelect)

    // submit update
    var submitUpdate = document.createElement('input');
    submitUpdate.setAttribute('type', 'submit');
    submitUpdate.setAttribute('name', 'update' + entry['eventID'] + '-' + entry['fanID']);
    submitUpdate.setAttribute('id', 'submitUpdate');
    submitUpdate.setAttribute('value', 'Submit');
    updateForm.appendChild(submitUpdate);

    document.getElementById('submitUpdate').addEventListener('click', function(event){
        var req = new XMLHttpRequest();
        var payload = {newEventID:null, newFanID:null};
        payload.newEventID = document.getElementById('eventIDUpdate').value;
        payload.newFanID = document.getElementById('fanIDUpdate').value;
        payload.oldEventID = entry['eventID'];
        payload.oldFanID = entry['fanID'];
        console.log(payload)

        //validate form inputs
        if (payload.eventID !== "" && payload.fanID !== ""){
            req.open("PUT", "http://flip1.engr.oregonstate.edu:41575/events_fans", true);
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

            req.open("PUT", "http://flip1.engr.oregonstate.edu:41575/events_fans", true);
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
    deleteCellContent.setAttribute('id', 'delete'+entry['eventID'] + '-' + entry['fanID'])
    deleteCellContent.setAttribute('data-modal-target', '#delete-modal');
    deleteCellContent.setAttribute('class', 'table-button');
    deleteCellContent.appendChild(deleteCellContentText)
    deleteCell.appendChild(deleteCellContent);
    bodyRow.appendChild(deleteCell);
    addDeleteListener(entry['eventID'], entry['fanID']);
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

function makeRow(){
    
    document.getElementById('submit').addEventListener('click', function(event){
        var req = new XMLHttpRequest();
        var payload = {eventID:null, fanID:null};
        payload.eventID = document.getElementById('eventIDAddInput').value;
        payload.fanID = document.getElementById('fanIDAddInput').value;
    
        //validate form inputs
        if (payload.eventID !== "" && payload.fanID !== ""){
            req.open("POST", "http://flip1.engr.oregonstate.edu:41575/events_fans", true);
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

function addDeleteListener(currentEventID, currentFanID){
    document.getElementById('delete'+currentEventID + '-' + currentFanID).addEventListener('click', function(event){
        confirm("Are you sure you want to delete this ticket?")
        var req = new XMLHttpRequest();
        var payload = {eventID:null, fanID:null};
        payload.eventID = currentEventID
        payload.fanID = currentFanID;
        console.log(payload)
    
        req.open("DELETE", "http://flip1.engr.oregonstate.edu:41575/events_fans", true);
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
