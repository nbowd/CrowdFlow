document.addEventListener('DOMContentLoaded', makeRow);
document.addEventListener('DOMContentLoaded', dateFilter);

// Build the table upon opening the page
document.addEventListener('DOMContentLoaded', function(event){
    var req = new XMLHttpRequest();

    req.open("GET", "http://flip1.engr.oregonstate.edu:4598/events", true);
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
    tableHeadData = ['Event ID', 'Event Name', 'Music Type', 'Event Date', 'Event Time', 'Cancelled?', '', '']
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
    var nameCell = document.createElement('td');
    var nameCellContent = document.createTextNode(entry['eventID']);
    nameCell.appendChild(nameCellContent);
    bodyRow.appendChild(nameCell);

    // create event name cell
    var nameCell = document.createElement('td');
    var nameCellContent = document.createTextNode(entry['eventName']);
    nameCell.appendChild(nameCellContent);
    bodyRow.appendChild(nameCell);

    // create music type cell
    var nameCell = document.createElement('td');
    var nameCellContent = document.createTextNode(entry['musicType']);
    nameCell.appendChild(nameCellContent);
    bodyRow.appendChild(nameCell);

    // create event date cell
    var nameCell = document.createElement('td');
    var nameCellContent = document.createTextNode(entry['eventDate']);
    nameCell.appendChild(nameCellContent);
    bodyRow.appendChild(nameCell);

    // create event time cell
    var nameCell = document.createElement('td');
    var nameCellContent = document.createTextNode(entry['eventTime']);
    nameCell.appendChild(nameCellContent);
    bodyRow.appendChild(nameCell);

    // create is cancelled cell
    var nameCell = document.createElement('td');
    var nameCellContent = document.createTextNode(entry['isCancelled']);
    nameCell.appendChild(nameCellContent);
    bodyRow.appendChild(nameCell);

    // create update button
    var updateCell = document.createElement('td');
    var updateCellContent = document.createElement('button');
    var updateCellContentText = document.createTextNode('Update');
    updateCellContent.setAttribute('id', 'update'+entry['eventID']);
    updateCellContent.setAttribute('value', entry['eventID']);
    updateCellContent.setAttribute('class', 'table-button');
    updateCellContent.appendChild(updateCellContentText)
    updateCell.appendChild(updateCellContent);
    bodyRow.appendChild(updateCell);


    document.getElementById('update'+entry['eventID']).addEventListener('click', function(event){
        var lastChild = document.body.lastChild;
        if (lastChild.id == 'updateForm'){
            document.body.removeChild(lastChild);
            var lastChild = document.body.lastChild;
            document.body.removeChild(lastChild);
        }

    var updatePrompt = document.createElement('h3');
    updatePrompt.setAttribute("class", "updateHeader")
    var updatePromptText = document.createTextNode('Update this event');
    updatePrompt.appendChild(updatePromptText);
    document.body.appendChild(updatePrompt)   
    
    var updateForm = document.createElement('form')
    updateForm.setAttribute('id', 'updateForm');
    updateForm.setAttribute('class', "container")
    document.body.appendChild(updateForm);
    
    // update event name
    var eventNameLabel = document.createElement('label');
    var eventNameLabelText = document.createTextNode(' Event Name ')
    eventNameLabel.setAttribute('for', 'eventNameUpdate');
    eventNameLabel.appendChild(eventNameLabelText);
    updateForm.appendChild(eventNameLabel);

    var eventNameInput = document.createElement('input');
    eventNameInput.setAttribute('type', 'text');
    eventNameInput.setAttribute('name', 'eventNameUpdate');
    eventNameInput.setAttribute('id', 'eventNameUpdate');
    eventNameInput.setAttribute('value', entry['eventName']);
    eventNameInput.setAttribute('required', 'required');
    updateForm.appendChild(eventNameInput);   
    
    // update music type
    var musicTypeLabel = document.createElement('label');
    var musicTypeLabelText = document.createTextNode(' Music Type ')
    musicTypeLabel.setAttribute('for', 'musicTypeUpdate');
    musicTypeLabel.appendChild(musicTypeLabelText);
    updateForm.appendChild(musicTypeLabel);

    var musicTypeSelect = document.createElement('select');
    musicTypeSelect.setAttribute('name', 'musicTypeUpdate');
    musicTypeSelect.setAttribute('id', 'musicTypeUpdate');
    musicTypeSelect.setAttribute('value', entry['musicType']);
    musicTypeSelect.setAttribute('required', 'required');
    updateForm.appendChild(musicTypeSelect);

    var rock = document.createElement('option');
    rock.setAttribute('value', 'rock')
    rock.text = "Rock"
    musicTypeSelect.appendChild(rock);
    
    var hipHop = document.createElement('option');
    hipHop.setAttribute('value', 'hipHop')
    hipHop.text = "Hip Hop"
    musicTypeSelect.appendChild(hipHop);

    var pop = document.createElement('option');
    pop.setAttribute('value', 'pop')
    pop.text = "Pop"
    musicTypeSelect.appendChild(pop);

    var country = document.createElement('option');
    country.setAttribute('value', 'country')
    country.text = "Country"
    musicTypeSelect.appendChild(country);

    var r_and_b = document.createElement('option');
    r_and_b.setAttribute('value', 'r_and_b')
    rock.text = "R&B"
    musicTypeSelect.appendChild(r_and_b);

    var electronic = document.createElement('option');
    electronic.setAttribute('value', 'electronic')
    electronic.text = "Electronic"
    musicTypeSelect.appendChild(electronic);

    var folk = document.createElement('option');
    folk.setAttribute('value', 'folk')
    folk.text = "Folk"
    musicTypeSelect.appendChild(folk);

    var indie = document.createElement('option');
    indie.setAttribute('value', 'indie')
    indie.text = "Indie"
    musicTypeSelect.appendChild(indie);

    var blues = document.createElement('option');
    blues.setAttribute('value', 'blues')
    blues.text = "Blues"
    musicTypeSelect.appendChild(blues);

    var jazz = document.createElement('option');
    jazz.setAttribute('value', 'jazz')
    jazz.text = "Jazz"
    musicTypeSelect.appendChild(jazz);

    var other = document.createElement('option');
    other.setAttribute('value', 'other')
    other.text = "Other"
    musicTypeSelect.appendChild(other);
    
    document.getElementById('musicTypeUpdate').value = entry['musicType']

    // update event date
    var eventDateLabel = document.createElement('label');
    var eventDateLabelText = document.createTextNode(' Event Date ')
    eventDateLabel.setAttribute('for', 'eventDateUpdate');
    eventDateLabel.appendChild(eventDateLabelText);
    updateForm.appendChild(eventDateLabel);

    var eventDateInput = document.createElement('input');
    eventDateInput.setAttribute('type', 'date');
    eventDateInput.setAttribute('name', 'eventDateUpdate');
    eventDateInput.setAttribute('id', 'eventDateUpdate');
    eventDateInput.setAttribute('value', entry['eventDate']);
    eventDateInput.setAttribute('required', 'required');
    eventDateInput.setAttribute('min', '2011-07-01')
    eventDateInput.setAttribute('max', '2022-07-01')
    updateForm.appendChild(eventDateInput);

    // update event time
    var eventTimeLabel = document.createElement('label');
    var eventTimeLabelText = document.createTextNode(' Event Time ')
    eventTimeLabel.setAttribute('for', 'eventTimeUpdate');
    eventTimeLabel.appendChild(eventTimeLabelText);
    updateForm.appendChild(eventTimeLabel);
    
    var eventTimeInput = document.createElement('input');
    eventTimeInput.setAttribute('type', 'time');
    eventTimeInput.setAttribute('name', 'eventTimeUpdate');
    eventTimeInput.setAttribute('id', 'eventTimeUpdate');
    eventTimeInput.setAttribute('value', entry['eventTime']);
    eventDateInput.setAttribute('required', 'required');
    updateForm.appendChild(eventTimeInput);

    // update is cancelled status
    var isCancelledLabel = document.createElement('label');
    var isCancelledLabelText = document.createTextNode(' isCancelled ')
    isCancelledLabel.setAttribute('for', 'isCancelledUpdate');
    isCancelledLabel.appendChild(isCancelledLabelText);
    updateForm.appendChild(isCancelledLabel);

    var isCancelledSelect = document.createElement('select');
    isCancelledSelect.setAttribute('required', 'required');
    isCancelledSelect.setAttribute('name', 'isCancelledUpdate');
    isCancelledSelect.setAttribute('id', 'isCancelledUpdate');
    isCancelledSelect.setAttribute('value', entry['isCancelled']);
    updateForm.appendChild(isCancelledSelect);

    var yesOption = document.createElement('option');
    yesOption.setAttribute('value', '1')
    yesOption.text = "Yes"
    isCancelledSelect.appendChild(yesOption);

    var noOption = document.createElement('option');
    noOption.setAttribute('value', '0')
    noOption.text = "No"
    isCancelledSelect.appendChild(noOption);
        
    document.getElementById('isCancelledUpdate').value = entry['isCancelled']

    // submit update
    var submitUpdate = document.createElement('input');
    submitUpdate.setAttribute('type', 'submit');
    submitUpdate.setAttribute('name', 'update' + entry['eventID']);
    submitUpdate.setAttribute('id', 'submitUpdate');
    submitUpdate.setAttribute('value', 'Submit');
    updateForm.appendChild(submitUpdate);

    document.getElementById('submitUpdate').addEventListener('click', function(event){
        var req = new XMLHttpRequest();
        var payload = {eventName:null, musicType:null, eventDate:null, eventTime:null, isCancelled:null};
        payload.eventID = entry['eventID'];
        payload.eventName = document.getElementById('eventNameUpdate').value;
        payload.musicType = document.getElementById('musicTypeUpdate').value;
        payload.eventDate = document.getElementById('eventDateUpdate').value;
        payload.eventTime = document.getElementById('eventTimeUpdate').value;
        payload.isCancelled = document.getElementById('isCancelledUpdate').value;
        console.log(payload)

        //validate form inputs
        if (payload.eventID !== "" && payload.eventName !== "" && payload.musicType !== "" && payload.eventDate !== "" && payload.eventTime !== "" && payload.isCancelled !== ""){
            req.open("PUT", "http://flip1.engr.oregonstate.edu:4598/events", true);
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
    
            req.open("PUT", "http://flip1.engr.oregonstate.edu:4598/events", true);
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
    deleteCellContent.setAttribute('id', 'delete' + entry['eventID'])
    deleteCellContent.setAttribute('data-modal-target', '#delete-modal');
    deleteCellContent.setAttribute('class', 'table-button');
    deleteCellContent.appendChild(deleteCellContentText)
    deleteCell.appendChild(deleteCellContent);
    bodyRow.appendChild(deleteCell);
    addDeleteListener(entry['eventID']);
    });
};

function makeRow(){
    
    document.getElementById('submit').addEventListener('click', function(event){
        var req = new XMLHttpRequest();
        var payload = {eventName:null, musicType:null, eventDate:null, eventTime:null, isCancelled:null};
        payload.eventName = document.getElementById('eventNameAddInput').value;
        payload.musicType = document.getElementById('musicTypeAddInput').value;
        payload.eventDate = document.getElementById('eventDateAddInput').value;
        payload.eventTime = document.getElementById('eventTimeAddInput').value;
        payload.isCancelled = document.getElementById('isCancelledAddInput').value;
    
        //validate form inputs
        if (payload.eventName !== "" && payload.musicType !== "" && payload.eventDate !== "" && payload.eventTime !== "" && payload.isCancelled !== ""){
            req.open("POST", "http://flip1.engr.oregonstate.edu:4598/events", true);
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
        confirm("Are you sure you want to delete this event?")
        var req = new XMLHttpRequest();
        var payload = {eventID:null};
        payload.eventID = currentID;
    
        req.open("DELETE", "http://flip1.engr.oregonstate.edu:4598/events", true);
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

function dateFilter(){
    
    document.getElementById('filterSubmit').addEventListener('click', function(event){
        var req = new XMLHttpRequest();
        var payload = {dateFilter:null, filterDate:null};
        payload.dateFilter = document.getElementById('dateFilter').value;
        payload.filterDate = document.getElementById('filterDate').value;
        
        //validate form inputs
        if (payload.dateFilter !== "" && payload.filterDate !== ""){
            req.open("GET", "http://flip1.engr.oregonstate.edu:4598/events/" + payload.dateFilter + "/" + payload.filterDate, true);
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

