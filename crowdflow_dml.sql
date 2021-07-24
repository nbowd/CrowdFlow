------------------------------------------------------------------------------------------------------------------------------------

-- get all the ticket data to display on Tickets page
SELECT ticketID, eventID, seat, row, section, price, paymentMethod, soldByEmployeeID, soldToFanID, isWillcall, isValid FROM Tickets

-- get all event ids to populate a dropdown for associating new tickets with events
SELECT eventID FROM Events

-- get all employee ids to populate dropdown for associating an employee with a ticket
SELECT employeeID FROM Employees

-- get all fan ids to populate dropdown for associating a fan with a ticket
SELECT fanID from Fans 

-- add a new ticket
-- : character used to denote inputs from backend
INSERT INTO Tickets (eventID, seat, row, section, price, paymentMethod, soldByEmployeeID, soldToFanID, isWillcall, isValid) VALUES (:eventID, :seat, :row, :section, :price, :paymentMethod, :soldByEmployeeID, :soldToFanID, :isWillcall, :isValid)

-- get a single ticket's data for the update ticket form
-- : character used to denote inputs from backend
SELECT eventID, seat, row, section, price, paymentMethod, soldByEmployeeID, soldToFanID, isWillcall, isValid FROM Tickets WHERE ticketID = :ticketID

-- update ticket based on submission on update ticket form
--: character used to denote inputs from backend
UPDATE Tickets SET eventID=:eventID, seat=:seat, row=:row, section=:section, price=:price, paymentMethod=:paymentMethod, soldByEmployeeID=:soldByEmployeeID, soldToFanID=:soldToFanID, isWillcall=:isWillcall, isValid=:isValid WHERE ticketID=:ticketID

-- delete a ticket
-- : character used to denote inputs from backend
DELETE FROM Tickets WHERE ticketID = :ticketID

------------------------------------------------------------------------------------------------------------------------------------

-- get all event data to display on Events page
SELECT eventID, eventName, musicType, eventDate, eventTime, isCancelled FROM Events

-- add a new event
-- : character used to denote inputs from backend
INSERT INTO Events (eventName, musicType, eventDate, eventTime, isCancelled) VALUES (:eventName, :musicType, :eventDate, :eventTime, :isCancelled)

-- get a single event's data for the update event form
-- : character used to denote inputs from backend
SELECT eventName, musicType, eventDate, eventTime, isCancelled WHERE eventID = :eventID

-- update event based on submission from update event form
-- : character used to denote inputs from backend
UPDATE Events SET eventName=:eventName, musicType=:musicType, eventDate=:eventDate, eventTime=:eventTime, isCancelled=:isCancelled WHERE ticketID=:ticketID

-- delete an event
-- : character used to denote inputs from backend
DELETE FROM Events WHERE eventID=:eventID

-- get all events that occurred on a specified date
-- : character used to denote inputs from backend
SELECT eventID, eventName, musicType, eventDate, eventTime, isCancelled FROM Events WHERE eventDate=:eventDate

-- get all events that occured PRIOR to a specified date
-- : character used to denote inputs from backend
SELECT eventID, eventName, musicType, eventDate, eventTime, isCancelled FROM Events WHERE eventDate<:eventDate

-- get all events that occur AFTER to a specified date
-- : character used to denote inputs from backend
SELECT eventID, eventName, musicType, eventDate, eventTime, isCancelled FROM Events WHERE eventDate>:eventDate

------------------------------------------------------------------------------------------------------------------------------------

-- get all Events_fans data to display on Events_fans page
SELECT eventID, fanID FROM Events_fans

-- associate a fan with an event (M:M relationship addition)
--: character used to denote inputs from backend
INSERT INTO Events_fans (eventID, fanID) VALUES (:eventID, :fanID)