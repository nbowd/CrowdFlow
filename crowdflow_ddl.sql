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

-- Table structure for `Fans`

DROP TABLE IF EXISTS `Fans`;

CREATE TABLE `Fans`(
  `fanID` INT AUTO_INCREMENT UNIQUE NOT NULL,
  `firstName` VARCHAR(50) NOT NULL,
  `lastName` VARCHAR(50) NOT NULL,
  `gender` VARCHAR(20) NOT NULL,
  `birthdate` DATE NOT NULL,
  `phone` VARCHAR(20),
  `email` VARCHAR(70),
  `membership` BOOLEAN NOT NULL,
  `comment` TINYTEXT, 
  PRIMARY KEY (`fanID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data dump for `Fans`

LOCK TABLES `Fans` WRITE;
INSERT INTO `Fans` VALUES (524, 'Steve', 'Jackson','Male', '1999/02/16', '123-456-7890', 'scubasteve@gmail.com', 0, 'Backstage access winner from the LIVE life radio contest.'), (319, 'Jenny', 'Adams', 'Female','1980/09/22', '999-867-5309','tutonephone@gmail.com', 1, NULL), (808, 'Kanye', 'West','Male','1977/06/08', NULL, NULL, 1, 'Requires all staff to address him in third person.');
UNLOCK TABLES;

-- Table structure for `Employees`

DROP TABLE IF EXISTS `Employees`;

CREATE TABLE `Employees` (
  `employeeID` INT AUTO_INCREMENT UNIQUE NOT NULL,
  `firstName` VARCHAR(50) NOT NULL,
  `lastName` VARCHAR(50) NOT NULL,
  `birthdate` DATE NOT NULL,
  `startDate` DATE NOT NULL,
  `phone` VARCHAR(20),
  `email` VARCHAR(70),
  PRIMARY KEY (`employeeID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data dump for `Employees`

LOCK TABLES `Employees` WRITE;
INSERT INTO `Employees` VALUES (212, 'Ted', 'Stewart', '1970/3/14', '2016/06/06', '999-111-5555', 'tedS@crowdflow.com'),(771, 'Natalie', 'Desoto', '1995/08/27', '2019/05/13', NULL, 'natalied@crowdflow.com'), (347, 'Ash', 'Baker', '2000/04/18', '2020/12/02', '818-350-1144', 'ashb@crowdflow.com');
UNLOCK TABLES;

-- Table structure for `Job_titles`

DROP TABLE IF EXISTS `Job_titles`;

CREATE TABLE `Job_titles` (
  `jobID` INT AUTO_INCREMENT UNIQUE NOT NULL,
  `title` VARCHAR(70) NOT NULL,
  `description` TINYTEXT NOT NULL,
  PRIMARY KEY (`jobID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data dump for `Job_titles`

LOCK TABLES `Job_titles` WRITE;
INSERT INTO `Job_titles` VALUES (4, 'Ticket Seller', 'Main point of sale for in person tickets, handles the bulk of guests arriving at the venue'), (5, 'Senior Ticket Seller', 'Handles all VIP and special sales, backup for ticket sellers'), (3, 'Ticket Manager', 'Manages all ticketing employees, provides them with any resources they need to keep the flow moving');
UNLOCK TABLES;

-- Table structure for `Employee_job_titles`

DROP TABLE IF EXISTS `Employee_job_titles`;

CREATE TABLE `Employee_job_titles` (
  `jobID` INT NOT NULL,
  `employeeID` INT NOT NULL,
  PRIMARY KEY (`jobID`, `employeeID`),
  FOREIGN KEY `fk_job`(`jobID`)
  REFERENCES `job_titles`(`jobID`)
  ON DELETE CASCADE,
  FOREIGN KEY `fk_employee`(`employeeID`)
  REFERENCES `Employees`(`employeeID`)
  ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data dump for `Employee_job_titles`

LOCK TABLES `Employee_job_titles` WRITE;
INSERT INTO `Employee_job_titles` VALUES ( 3, 212), (5, 771), (4, 347);
UNLOCK TABLES;