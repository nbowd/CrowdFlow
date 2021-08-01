------------------------------------------------------------------------------------------------------------------------------------
----------------  FOR ALL QUERIES BELOW `:` character used to denote inputs from backend ---------------- 

-------- TICKETS PAGE QUERIES --------

-- get all the ticket data to display on Tickets page
SELECT ticketID, eventID, seat, row, section, price, paymentMethod, soldByEmployeeID, soldToFanID, isWillcall, isValid FROM Tickets;

-- get all event ids to populate a dropdown for associating new tickets with events
SELECT eventID FROM Events;

-- get all employee ids to populate dropdown for associating an employee with a ticket
SELECT employeeID FROM Employees;

-- get all fan ids to populate dropdown for associating a fan with a ticket
SELECT fanID from Fans; 

-- add a new ticket
INSERT INTO Tickets (eventID, seat, row, section, price, paymentMethod, soldByEmployeeID, soldToFanID, isWillcall, isValid) VALUES (:eventIDAddInput, :seatAddInput, :rowAddInput, :sectionAddInput, :priceAddInput, :paymentMethodAddInput, :soldByEmployeeIDAddInput, :soldToFanIDAddInput, :isWillcallAddInput, :isValidAddInput);

-- associate a fan with an event (M:M relationship addition)
INSERT INTO Events_fans (eventID, fanID) VALUES (:eventIDAddInput, :soldToFanIDAddInput);

-- get a single ticket's data for the update ticket form
SELECT eventID, seat, row, section, price, paymentMethod, soldByEmployeeID, soldToFanID, isWillcall, isValid FROM Tickets WHERE ticketID = :ticketIDUpdateInput;

-- update ticket based on submission on update ticket form
UPDATE Tickets SET eventID=:eventIDUpdateInput, seat=:seatUpdateInput, row=:rowUpdateInput, section=:sectionUpdateInput, price=:priceUpdateInput, paymentMethod=:paymentMethodUpdateInput, soldByEmployeeID=:soldByEmployeeIDUpdateInput, soldToFanID=:soldToFanIDUpdateInput, isWillcall=:isWillcallUpdateInput, isValid=:isValidUpdateInput WHERE ticketID=:ticketIDInput;

-- delete a ticket
DELETE FROM Tickets WHERE ticketID = :ticketIDDeleteInput;

-------- EVENTS PAGE QUERIES --------

-- get all event data to display on Events page
SELECT eventID, eventName, musicType, eventDate, eventTime, isCancelled FROM Events;

-- add a new event
INSERT INTO Events (eventName, musicType, eventDate, eventTime, isCancelled) VALUES (:eventNameAddInput, :musicTypeAddInput, :eventDateAddInput, :eventTimeAddInput, :isCancelledAddInput);

-- get a single event's data for the update event form
SELECT eventName, musicType, eventDate, eventTime, isCancelled WHERE eventID = :eventIDUpdateInput;

-- update event based on submission from update event form
UPDATE Events SET eventName=:eventNameUpdateInput, musicType=:musicTypeUpdateInput, eventDate=:eventDateUpdateInput, eventTime=:eventTimeUpdateInput, isCancelled=:isCancelledUpdateInput WHERE ticketID=:ticketIDUpdateInput;

-- delete an event
DELETE FROM Events WHERE eventID=:eventIDDeleteInput;

-- get all events that occurred on a specified date
SELECT eventID, eventName, musicType, eventDate, eventTime, isCancelled FROM Events WHERE eventDate=:filterDate;

-- get all events that occured PRIOR to a specified date
SELECT eventID, eventName, musicType, eventDate, eventTime, isCancelled FROM Events WHERE eventDate<:filterDate;

-- get all events that occur AFTER to a specified date
SELECT eventID, eventName, musicType, eventDate, eventTime, isCancelled FROM Events WHERE eventDate>:filterDate;

-------- EVENTS FANS PAGE QUERIES --------

-- get all Events_fans data to display on Events_fans page
SELECT eventID, fanID FROM Events_fans;

-- associate a fan with an event (M:M relationship addition)
INSERT INTO Events_fans (eventID, fanID) VALUES (:eventIDAddInput, :fanIDAddInput);

-------- EMPLOYEE PAGE QUERIES --------

-- Populate page table
SELECT * FROM Employees;

-- Add new employee
INSERT INTO Employees (firstName, lastName, birthdate, startDate, phone, email) VALUES (:firstName, :lastName, :birthdate, :startDate, :phone, :email);

-- Search by employeeID
SELECT employeeID, firstName, lastName, birthdate, startDate, phone, email FROM Employees WHERE employeeID = :employeeID;

-- Search by first name
SELECT employeeID, firstName, lastName, birthdate, startDate, phone, email FROM Employees ORDER BY firstName ASC;

-- Search by last name
SELECT employeeID, lastName, firstName, birthdate, startDate, phone, email FROM Employees ORDER BY lastName ASC;

-- Employee updated via button
UPDATE Employees SET lastName= :lastName, firstName= :firstName, birthdate= :birthdate, startDate= :startDate, phone= :phone, email= :email WHERE employeeID = :employeeID;

-- Employee deleted via button
DELETE FROM Employees WHERE employeeID =:employeeID;

-------- FAN PAGE QUERIES --------

-- Populate page table
SELECT * FROM Fans;

-- Add new fan
INSERT INTO Fans (firstName, lastName, birthdate, gender, phone, email, membership, comment) VALUES (:firstName, :lastName, :birthdate, :gender, :phone, :email, :membership, :comment);

-- Search by fanID
SELECT fanID, firstName, lastName, birthdate, gender, phone, email, membership, comment FROM Fans WHERE fanID = :fanID;

-- Search by Fan First Name
SELECT fanID, firstName, lastName, birthdate, gender, phone, email, membership, comment FROM Fans ORDER BY firstName ASC;

-- Search by Fan Last Name
SELECT fanID, lastName, firstName, birthdate, gender, phone, email, membership, comment FROM Fans ORDER BY lastName ASC;

-- Fan updated from button
UPDATE Fans SET lastName= :lastName, firstName= :firstName, birthdate= :birthdate, gender= :gender, phone= :phone, email= :email, membership= :membership, comment =:comment WHERE fanID= :fanID;

-- Delete fan
DELETE FROM Fans WHERE fanID = :fanID;

-------- JOB TITLES PAGE QUERIES --------

-- Populate page table
SELECT * FROM Job_titles;

-- Add new job title
INSERT INTO Job_titles (jobID, title, description) VALUES (:jobID, :title, :description);

-- Update job from button
UPDATE Job_titles SET title=:title, description=:description WHERE jobID=:jobID;

-- Delete job from button
DELETE FROM Job_titles WHERE jobID=:jobID;

-------- EMPLOYEE JOB TITLES PAGE QUERIES --------

-- Populate page table
SELECT * FROM Employee_job_titles;

-- Add entry
INSERT INTO Employee_job_titles (jobID, employeeID) VALUES (:jobID, :employeeID);

-- Select entry based on jobID
SELECT jobID, employeeID FROM Employee_job_titles WHERE jobID=:jobID;

-- Select entry based on employeeID
SELECT jobID, employeeID FROM Employee_job_titles WHERE employeeID=:employeeID;

-- Update entry from button
UPDATE Employee_job_titles SET jobID=:jobID, employeeID=:employeeID WHERE jobID=::jobID AND employeeID=::employeeID;

-- Delete entry from button
DELETE FROM Employee_job_titles WHERE jobID=:jobID AND employeeID=:employeeID;
