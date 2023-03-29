-- Progettazione Web 
DROP DATABASE if exists tetris; 
CREATE DATABASE tetris; 
USE tetris; 
-- MySQL dump 10.13  Distrib 5.7.28, for Win64 (x86_64)
--
-- Host: localhost    Database: tetris
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `skin`
--

DROP TABLE IF EXISTS `skin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `skin` (
  `IdSkin` int NOT NULL AUTO_INCREMENT,
  `Url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`IdSkin`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skin`
--

LOCK TABLES `skin` WRITE;
/*!40000 ALTER TABLE `skin` DISABLE KEYS */;
INSERT INTO `skin` VALUES (1,'../img/skin/1.jpg');
/*!40000 ALTER TABLE `skin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skinwallet`
--

DROP TABLE IF EXISTS `skinwallet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `skinwallet` (
  `user` varchar(32) NOT NULL,
  `skin` int NOT NULL,
  PRIMARY KEY (`user`,`skin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skinwallet`
--

LOCK TABLES `skinwallet` WRITE;
/*!40000 ALTER TABLE `skinwallet` DISABLE KEYS */;
/*!40000 ALTER TABLE `skinwallet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `theme`
--

DROP TABLE IF EXISTS `theme`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `theme` (
  `IdTheme` int NOT NULL AUTO_INCREMENT,
  `Url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`IdTheme`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `theme`
--

LOCK TABLES `theme` WRITE;
/*!40000 ALTER TABLE `theme` DISABLE KEYS */;
INSERT INTO `theme` VALUES (1,'../img/sfondi/1.jpg'),(2,'../img/sfondi/2.jpg'),(3,'../img/sfondi/3.jpg'),(4,'../img/sfondi/4.jpg'),(5,'../img/sfondi/5.jpg'),(6,'../img/sfondi/6.jpg');
/*!40000 ALTER TABLE `theme` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `themewallet`
--

DROP TABLE IF EXISTS `themewallet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `themewallet` (
  `user` varchar(32) NOT NULL,
  `theme` int NOT NULL,
  PRIMARY KEY (`user`,`theme`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `themewallet`
--

LOCK TABLES `themewallet` WRITE;
/*!40000 ALTER TABLE `themewallet` DISABLE KEYS */;
/*!40000 ALTER TABLE `themewallet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `Username` varchar(32) NOT NULL,
  `Psw` varchar(255) DEFAULT NULL,
  `Coins` int DEFAULT NULL,
  `Theme` int DEFAULT NULL,
  `Skin` int DEFAULT NULL,
  `Record` bigint DEFAULT NULL,
  PRIMARY KEY (`Username`),
  KEY `Theme` (`Theme`),
  KEY `Skin` (`Skin`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`Theme`) REFERENCES `theme` (`IdTheme`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_ibfk_2` FOREIGN KEY (`Skin`) REFERENCES `skin` (`IdSkin`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('tommidela','$2y$10$uvsnM35LGMTTkqrLBPlFa.osnaoUZKjSYqitmPl6hS57hTQp3QkS6',0,1,1,0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-25 18:22:02
