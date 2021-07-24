--
-- Table structure for table `Events`
--

DROP TABLE IF EXISTS `Events`;
CREATE TABLE `Events` (
    `eventID` int AUTO_INCREMENT NOT NULL,
    `eventName` varchar(50) NOT NULL,
    `musicType` varchar(15) NOT NULL,
    `eventDate` date NOT NULL,
    `eventTime` time NOT NULL,
    `isCancelled` TINYINT(1) NOT NULL,
    PRIMARY KEY (`eventID`)
);

--
-- Dumping data for table `Events`
--

INSERT INTO `Events` VALUES (84, 'Test Show 1', 'Rock', '2013-02-14', '19:30:00', 0), (582, 'Test Show 2', 'Hip Hop', '2017-06-17', '19:05:00', 0), (978, 'Test Show 3', 'Blues', '2020-03-13', '20:00:00', 1);

--
-- Table structure for `Events_fans`
--

DROP TABLE IF EXISTS `Events_fans`;
CREATE TABLE `Events_fans` (
    `eventID` int NOT NULL,
    `fanID` int NOT NULL
);

--
-- Dumping data for table `Events_fans`
--

INSERT INTO `Events_fans` VALUES (84, 62), (582, 112), (978, 3);

--
-- Table structure for table `Tickets`
--

DROP TABLE IF EXISTS `Tickets`;
CREATE TABLE `Tickets` (
    `ticketID` int AUTO_INCREMENT NOT NULL,
    `eventID` int NOT NULL,
    `seat` int NOT NULL,
    `row` char(1) NOT NULL,
    `section` char(3) NOT NULL,
    `price` float NOT NULL,
    `paymentMethod` varchar(10) NOT NULL,
    `soldByEmployeeID` int NOT NULL,
    `soldToFanID` int NOT NULL,
    `isWillcall` TINYINT(1) NOT NULL,
    `isValid` TINYINT(1) NOT NULL,
    PRIMARY KEY (`ticketID`),
    FOREIGN KEY (`eventID`) REFERENCES `Events`(`eventID`) ON DELETE CASCADE ON UPDATE CASCADE
    -- FOREIGN KEY (`soldByEmployeeID`) REFERENCES `Employees`(`employeeID`) ON DELETE CASCADE ON UPDATE CASCADE,
    -- FOREIGN KEY (`soldToFanID`) REFERENCES `Fans`(`fanID`) ON DELETE CASCADE ON UPDATE CASCADE  
);

--
-- Dumping data for `Tickets`
--

INSERT INTO `Tickets` VALUES (14, 84, 10, 'c', 'ccc', 55.00, 'visa', 2, 1, 0, 1), (27, 582, 17, 'a', 'eee', 100.00, 'cash', 10, 10007, 1, 1), (1003, 978, 20, 'd', 'aaa', 37.50, 'amex', 18, 841, 0, 0);

