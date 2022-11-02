-- MySQL dump 10.13  Distrib 8.0.31, for macos12 (arm64)
--
-- Host: localhost    Database: airbnb
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `access`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `access` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
)  ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `access_vs_user`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `access_vs_user` (
  `id_access` int NOT NULL,
  `id_user` int NOT NULL
)  ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `categories`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
)  ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `category_vs_property`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_vs_property` (
  `id_category` int NOT NULL,
  `id_property` int NOT NULL
)  ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `city`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `city` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
)  ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `country`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `country` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
)  ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `country_vs_city`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `country_vs_city` (
  `id` int NOT NULL AUTO_INCREMENT,
  `desscription` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
)  ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `payment`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `id_rental` int NOT NULL,
  `amount` double NOT NULL DEFAULT '0',
  `paymment_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
)  ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `property`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `property` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `address` varchar(250) DEFAULT NULL,
  `address2` varchar(150) DEFAULT NULL,
  `id_country` int NOT NULL,
  `id_city` int NOT NULL,
  `price` double NOT NULL,
  `itbis` tinyint DEFAULT '0',
  `rooms` int NOT NULL,
  `adults` int NOT NULL,
  `kids` int NOT NULL,
  `state` tinyint NOT NULL DEFAULT '1',
  `geo` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
)  ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `property_image`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `property_image` (
  `id` int NOT NULL AUTO_INCREMENT,
  `source` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
)  ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `property_vs_image`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `property_vs_image` (
  `id_property` int NOT NULL,
  `id_image` int NOT NULL
)  ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `rental`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rental` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `id_property` int NOT NULL,
  `rental_date` datetime NOT NULL,
  `return_date` datetime NOT NULL,
  `last_update` datetime DEFAULT NULL,
  `state` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
)  ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(150) NOT NULL,
  `pass` varchar(100) NOT NULL,
  `email_validation` tinyint NOT NULL DEFAULT '0',
  `pho_validation` tinyint NOT NULL DEFAULT '0',
  `id_country` int NOT NULL,
  `id_city` int DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `lastname` varchar(100) DEFAULT NULL,
  `active` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `wishlist`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlist` (
  `id_user` int NOT NULL,
  `id_property` int NOT NULL
)  ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping routines for database 'airbnb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-01 21:58:52
