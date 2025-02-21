-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: bench360
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `user_details`
--

DROP TABLE IF EXISTS `user_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `designation` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `reportsTo` varchar(255) NOT NULL,
  `shiftTime` varchar(255) NOT NULL,
  `HRcontact` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_details`
--

LOCK TABLES `user_details` WRITE;
/*!40000 ALTER TABLE `user_details` DISABLE KEYS */;
INSERT INTO `user_details` VALUES (1,'Prudhvi Gopasina','pgopasina','Jr.Technical associate','pgopasina@miraclesoft.com','Test@123','V.s.s. Jeeva Kiran Rao Adavani','04 PM to 01 AM','Divya Abburi'),(2,'Sai Prasad Bongu','sbongu1','Jr.Technical associate','sbongu1@miraclesoft.com','Test@123','V.s.s. Jeeva Kiran Rao Adavani','06 PM to 03 AM','Divya Abburi'),(3,'Sai Kumar Induga','sinduga','Jr.Technical associate','sinduga@miraclesoft.com','Test@123','V.s.s. Jeeva Kiran Rao Adavani','04 PM to 01 AM','Divya Abburi'),(4,'Naga Sanjeev madasu','nmadasu','Jr.Technical associate','nmadasu@miraclesoft.com','Test@123','V.s.s. Jeeva Kiran Rao Adavani','04 PM to 01 AM','Divya Abburi'),(5,'V.s.s. Jeeva Kiran Rao Adavani','jadavani','Technical associate','jadavani@miraclesoft.com','Test@123','Vinod Kumar Marupu','02 PM to 11 PM','Divya Abburi'),(6,'Vinod Kumar Marupu','vmarupu','Project Manager','vmarupu@miraclesoft.com','Test@123','Prasad Kandregula','04 PM to 01 AM','Divya Abburi'),(7,'John Vesli Chitri','jchitri','Project Manager','jchitri@miraclesoft.com','Test@123','Prasad Kandregula','02 PM to 11 PM','Divya Abburi'),(8,'Yamuna Bolli','ybolli','Jr.Technical associate','ybolli@miraclesoft.com','Test@123','Lavanya Guntuku','02 PM to 11 PM','Divya Abburi'),(10,'Manikanta Pediredla','mpediredla','Jr.Technical associate','mpediredla@miraclesoft.com','Test@123','Lavanya Guntuku','04 PM to 01 AM','Divya Abburi'),(11,'Lavanya Guntuku','lguntuku','Technical associate','lguntuku@miraclesoft.com','Test@123','Vinod Kumar Marupu','04 PM to 01 AM','Divya Abburi'),(12,'Prasanth Sankurabothu','psankurabothu','Jr.Technical associate','psankurabothu@miraclesoft.com','Test@123','Lavanya Guntuku','04 PM to 01 AM','Divya Abburi'),(13,'Siva Subrahamanyam Arimilli','sarimilli','Jr.Technical associate','sarimilli@miraclesoft.com','Test@123','Lavanya Guntuku','04 PM to 01 AM','Divya Abburi'),(14,'Barnbas Telagareddy','btelagareddy','Jr.Technical associate','btelagareddy@miraclesoft.com','Test@123','Sai Kartik Nistala','02 PM to 11 PM','Divya Abburi'),(15,'Pavan Ram Potnuru','rpotnuru','Jr.Technical associate','rpotnuru@miraclesoft.com','Test@123','Sai Kartik Nistala','04 PM to 01 AM','Divya Abburi'),(16,'Gurunadharao Dandu','gdandu','Jr.Technical associate','gdandu@miraclesoft.com','Test@123','Ganesh Vasireddi','04 PM to 01 AM','Divya Abburi'),(17,'Ganesh Vasireddi','gvasireddi','Technical associate','gvasireddi@miraclesoft.com','Test@123','John Vesli Chitri','04 PM to 01 AM','Divya Abburi'),(18,'Siva Sai Krishna Rajanala','srajanala','Jr.Technical associate','srajanala@miraclesoft.com','Test@123','Ganesh Vasireddi','02 PM to 11 PM','Divya Abburi'),(19,'Anand Babu Chavali','achavali','Jr.Technical associate','achavali@miraclesoft.com','Test@123','Sai Kartik Nistala','06 PM to 03 AM','Divya Abburi'),(20,'Niharika Ruppa','nruppa','Jr.Technical associate','nruppa@miraclesoft.com','Test@123','Ganesh Vasireddi','02 PM to 11 PM','Divya Abburi'),(21,'Vani Pidugu','vpidugu','Jr.Technical associate','vpidugu@miraclesoft.com','Test@123','Sai Kartik Nistala','02 PM to 11 PM','Divya Abburi'),(22,'Srivani Ambati','sambati2','Jr.Technical associate','sambati2@miraclesoft.com','Test@123','Ganesh Vasireddi','02 PM to 11 PM','Divya Abburi'),(23,'Gowthami Bala','gbala','Jr.Technical associate','gbala@miraclesoft.com','Test@123','Ganesh Vasireddi','02 PM to 11 PM','Divya Abburi'),(24,'Swetha Rugada','srugada','Jr.Technical associate','srugada@miraclesoft.com','Test@123','Sai Kartik Nistala','02 PM to 11 PM','Divya Abburi'),(25,'Bhavani Muddala','bmuddala','Jr.Technical associate','bmuddala@miraclesoft.com','Test@123','Ganesh Vasireddi','02 PM to 11 PM','Divya Abburi'),(26,'Hema Marada','hmarada','Jr.Technical associate','hmarada@miraclesoft.com','Test@123','Sai Kartik Nistala','02 PM to 11 PM','Divya Abburi'),(27,'Vandana Rani Kottapalli','vkottapalli','Jr.Technical associate','vkottapalli@miraclesoft.com','Test@123','Sai Kartik Nistala','02 PM to 11 PM','Divya Abburi'),(28,'Meghana Dwarapureddi','mdwarapureddi','Jr.Technical associate','mdwarapureddi@miraclesoft.com','Test@123','Ganesh Vasireddi','02 PM to 11 PM','Divya Abburi'),(29,'Vineetha Kondepudi','vkondepudi','Jr.Technical associate','vkondepudi@miraclesoft.com','Test@123','Sai Kartik Nistala','02 PM to 11 PM','Divya Abburi'),(30,'Sai Kartik Nistala','snistala','Sr.Technical associate','snistala@miraclesoft.com','Test@123','John Vesli Chitri','02 PM to 11 PM','Divya Abburi'),(31,'Hema Guvvala','hguvvala','Sr.Technical associate','hguvvala@miraclesoft.com','Test@123','Vinod Kumar Marupu','02 PM to 11 PM','Divya Abburi'),(32,'Vanitha Kundrapu','vkundrapu','Sr.Technical associate','vkundrapu@miraclesoft.com','	Test@123','Vinod Kumar Marupu','02 PM to 11 PM','Divya Abburi'),(33,'Sarada Tatisetti','statisetti','Sr.Technical associate','statisetti@miraclesoft.com','Test@123','Vinod Kumar Marupu','02 PM to 11 PM','Divya Abburi');
/*!40000 ALTER TABLE `user_details` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-21 19:57:57
