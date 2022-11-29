USE `airbnb`;
-- MySQL dump 10.13  Distrib 8.0.31, for macos12 (x86_64)
--
-- Host: localhost    Database: airbnb
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `access`
--

DROP TABLE IF EXISTS `access`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `access` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `access`
--

LOCK TABLES `access` WRITE;
/*!40000 ALTER TABLE `access` DISABLE KEYS */;
/*!40000 ALTER TABLE `access` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `access_vs_user`
--

DROP TABLE IF EXISTS `access_vs_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `access_vs_user` (
  `id_access` int NOT NULL,
  `id_user` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `access_vs_user`
--

LOCK TABLES `access_vs_user` WRITE;
/*!40000 ALTER TABLE `access_vs_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `access_vs_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'casa'),(2,'apartamento'),(3,'casa de huespedes'),(4,'hotel');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_vs_property`
--

DROP TABLE IF EXISTS `category_vs_property`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_vs_property` (
  `id_category` int NOT NULL,
  `id_property` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_vs_property`
--

LOCK TABLES `category_vs_property` WRITE;
/*!40000 ALTER TABLE `category_vs_property` DISABLE KEYS */;
INSERT INTO `category_vs_property` VALUES (2,48),(3,49),(4,50),(2,51),(1,52),(2,53),(1,54),(1,55);
/*!40000 ALTER TABLE `category_vs_property` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `city`
--

DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `city` (
  `id_provincia` int NOT NULL,
  `provincia` varchar(45) DEFAULT NULL,
  `id_regiones_desarrollo` varchar(2) NOT NULL,
  PRIMARY KEY (`id_provincia`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city`
--

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` VALUES (1,'Distrito Nacional','10'),(2,'Azua','05'),(3,'Baoruco','07'),(4,'Barahona','07'),(5,'Dajabón','04'),(6,'Duarte','03'),(7,'Elías Piña','06'),(8,'El Seibo','08'),(9,'Espaillat','01'),(10,'Independencia','07'),(11,'La Altagracia','08'),(12,'La Romana','08'),(13,'La vega','02'),(14,'Maria Trinidad Sanchez','03'),(15,'Monte Cristi','04'),(16,'Pedernales','07'),(17,'Peravia','05'),(18,'Puerto Plata','01'),(19,'Hermanas Mirabal','03'),(20,'Samana','03'),(21,'San Cristóbal\r\n','05'),(22,'San Juan','06'),(23,'San Pedro de Macorís','09'),(24,'Sanchez Ramirez','02'),(25,'Santiago','01'),(26,'Santiago Rodríguez\r\n','04'),(27,'Valverde','04'),(28,'Monseñor Nouel','02'),(29,'Monte Plata','09'),(30,'Hato Mayor','09'),(31,'San Jose de Ocoa','05'),(32,'Santo Domingo','10');
/*!40000 ALTER TABLE `city` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `country`
--

DROP TABLE IF EXISTS `country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `country` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `country`
--

LOCK TABLES `country` WRITE;
/*!40000 ALTER TABLE `country` DISABLE KEYS */;
INSERT INTO `country` VALUES (1,'Republica Dominicana');
/*!40000 ALTER TABLE `country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `country_vs_city`
--

DROP TABLE IF EXISTS `country_vs_city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `country_vs_city` (
  `id_city` int NOT NULL,
  `id_country` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `country_vs_city`
--

LOCK TABLES `country_vs_city` WRITE;
/*!40000 ALTER TABLE `country_vs_city` DISABLE KEYS */;
INSERT INTO `country_vs_city` VALUES (1,1),(2,1),(3,1),(4,1),(5,1),(6,1),(7,1),(8,1),(9,1),(10,1),(11,1),(12,1),(13,1),(14,1),(15,1),(16,1),(17,1),(18,1),(19,1),(20,1),(21,1),(22,1),(23,1),(24,1),(25,1),(26,1),(27,1),(28,1),(29,1),(30,1),(31,1),(32,1);
/*!40000 ALTER TABLE `country_vs_city` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `id_rental` int NOT NULL,
  `id_payer` varchar(100) NOT NULL,
  `amount` double NOT NULL DEFAULT '0',
  `payment_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (1,1,5,'4H996696D74350739',57,'2022-11-28 01:33:27'),(2,1,6,'7PG40690AW0047733',57,'2022-11-28 01:42:26'),(3,1,7,'0PB832152M471123V',144,'2022-11-28 23:11:36'),(4,1,8,'3GS38749RM875415P',144,'2022-11-28 23:15:38'),(5,1,9,'5B417264ST369570F',338,'2022-11-28 23:21:24'),(6,1,10,'7S579508K5324682A',48,'2022-11-28 23:23:24'),(7,1,11,'7RJ28189NB1098225',48,'2022-11-28 23:25:20'),(8,1,12,'39P54895T0708644L',144,'2022-11-28 23:26:02'),(9,1,13,'3JM70969LH144751F',48,'2022-11-28 23:29:04'),(10,1,14,'9R204532ME919915J',386,'2022-11-28 23:30:33'),(11,1,15,'3U915188YG770923E',96,'2022-11-28 23:33:23'),(12,1,16,'2RD07978MP501242L',48,'2022-11-28 23:35:04');
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `property`
--

DROP TABLE IF EXISTS `property`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `property` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `address` varchar(250) CHARACTER SET utf8mb4 NOT NULL,
  `id_country` int NOT NULL DEFAULT '1',
  `id_city` int NOT NULL,
  `price` double NOT NULL,
  `rooms` int NOT NULL,
  `beds` int NOT NULL,
  `baths` int NOT NULL,
  `adults` int NOT NULL,
  `state` tinyint NOT NULL DEFAULT '1',
  `geo` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property`
--

LOCK TABLES `property` WRITE;
/*!40000 ALTER TABLE `property` DISABLE KEYS */;
INSERT INTO `property` VALUES (48,1,'Los laureles calle 6 #18',1,25,50,3,4,2,5,1,'LatLng(19.312871, -70.905581)'),(49,1,'Tamo jodio',1,25,300,4,5,3,6,1,'LatLng(19.44606, -70.670393)'),(50,1,'ddwdqwdq',1,5,40,5,4,6,3,1,'LatLng(19.193406, -70.875392)'),(51,1,'dwdqw',1,3,42,6,5,4,4,1,'LatLng(19.28676, -70.919299)'),(52,1,'bacalao',1,7,54,4,4,4,4,1,'LatLng(19.200134, -70.867166)'),(53,1,'hola',1,1,50,2,3,3,4,1,'LatLng(19.219343, -70.930276)'),(54,1,'dwde',1,1,42,4,3,3,3,1,'LatLng(19.369697, -71.001625)'),(55,1,'dwde',1,1,42,4,3,3,3,1,'LatLng(19.369697, -71.001625)');
/*!40000 ALTER TABLE `property` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `property_image`
--

DROP TABLE IF EXISTS `property_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `property_image` (
  `id` int NOT NULL AUTO_INCREMENT,
  `source` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property_image`
--

LOCK TABLES `property_image` WRITE;
/*!40000 ALTER TABLE `property_image` DISABLE KEYS */;
INSERT INTO `property_image` VALUES (44,'/property/1/image-44.jpeg'),(45,'/property/1/image-45.jpeg'),(46,'/property/1/image-0'),(47,'/property/1/image-0.jpeg'),(48,'/property/1/image-0.jpeg'),(49,'/property/1/image-0.jpeg'),(50,'/property/1/image-0.jpeg'),(55,'/property/1/image-55.jpeg');
/*!40000 ALTER TABLE `property_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rental`
--

DROP TABLE IF EXISTS `rental`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rental` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `id_property` int NOT NULL,
  `rental_date` datetime NOT NULL,
  `return_date` datetime NOT NULL,
  `last_update` datetime NOT NULL,
  `state` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rental`
--

LOCK TABLES `rental` WRITE;
/*!40000 ALTER TABLE `rental` DISABLE KEYS */;
INSERT INTO `rental` VALUES (1,1,48,'2022-11-27 20:00:00','2022-11-28 20:00:00','2022-11-28 01:27:52',1),(2,1,48,'2022-11-27 20:00:00','2022-11-28 20:00:00','2022-11-28 01:28:49',1),(3,1,48,'2022-11-27 20:00:00','2022-11-28 20:00:00','2022-11-28 01:31:13',1),(4,1,48,'2022-11-27 20:00:00','2022-11-28 20:00:00','2022-11-28 01:32:12',1),(5,1,48,'2022-11-27 20:00:00','2022-11-28 20:00:00','2022-11-28 01:33:27',1),(6,1,48,'2022-11-27 20:00:00','2022-11-28 20:00:00','2022-11-28 01:42:26',1),(7,1,55,'2022-11-26 20:00:00','2022-11-29 20:00:00','2022-11-28 23:11:36',1),(8,1,55,'2022-11-26 20:00:00','2022-11-29 20:00:00','2022-11-28 23:15:38',1),(9,1,55,'2022-11-21 20:00:00','2022-11-28 20:00:00','2022-11-28 23:21:24',1),(10,1,55,'2022-11-27 20:00:00','2022-11-28 20:00:00','2022-11-28 23:23:24',1),(11,1,55,'2022-11-27 20:00:00','2022-11-28 20:00:00','2022-11-28 23:25:20',1),(12,1,55,'2022-11-26 20:00:00','2022-11-29 20:00:00','2022-11-28 23:26:02',1),(13,1,55,'2022-11-20 20:00:00','2022-11-21 20:00:00','2022-11-28 23:29:04',1),(14,1,55,'2022-11-21 20:00:00','2022-11-29 20:00:00','2022-11-28 23:30:33',1),(15,1,55,'2022-11-27 20:00:00','2022-11-29 20:00:00','2022-11-28 23:33:23',1),(16,1,55,'2022-11-21 20:00:00','2022-11-22 20:00:00','2022-11-28 23:35:04',1);
/*!40000 ALTER TABLE `rental` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(150) NOT NULL,
  `pass` varchar(100) NOT NULL,
  `email_validation` tinyint NOT NULL DEFAULT '0',
  `pho_validation` tinyint NOT NULL DEFAULT '0',
  `id_country` int NOT NULL DEFAULT '1',
  `id_city` int DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `lastname` varchar(100) DEFAULT NULL,
  `active` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'joshue_10@hotmail.es','1234',1,1,1,1,'Steven','Ynoa',1),(7,'joshue@wofm.com','41241241',0,0,1,25,'fwefwef','fwefwef',1),(8,'ivan@utesa.com','12345678',0,0,1,25,'ivan','mendoza',1),(9,'steve10@hotmail.com','Seguridadx0',0,0,1,25,'steven','ynoa',1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlist`
--

DROP TABLE IF EXISTS `wishlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlist` (
  `id_user` int NOT NULL,
  `id_property` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlist`
--

LOCK TABLES `wishlist` WRITE;
/*!40000 ALTER TABLE `wishlist` DISABLE KEYS */;
/*!40000 ALTER TABLE `wishlist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-29  0:13:20