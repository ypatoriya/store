-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 08, 2024 at 03:48 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `store`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `categoryName` varchar(100) DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `categoryName`, `createdBy`) VALUES
(1, 'test', 0),
(2, 'test2', 3);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `categoryId` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `images` text DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `description`, `categoryId`, `price`, `images`, `createdBy`) VALUES
(3, 'updated api', 'update api', 1, '10.00', '', NULL),
(4, 'shirt', 'shirt description', 1, '100.55', '', NULL),
(5, 'react', 'react', 2, '100.00', 'Screenshot 2023-10-12 105057.png', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `product_images`
--

CREATE TABLE `product_images` (
  `product_id` int(11) NOT NULL,
  `image_path` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `gender` enum('Male','Female','Other') DEFAULT NULL,
  `hobbies` text DEFAULT NULL,
  `userRole` enum('Admin','User') DEFAULT NULL,
  `profile_pic` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `password`, `gender`, `hobbies`, `userRole`, `profile_pic`) VALUES
(1, 'yagnesh', 'patel', 'mail@mail.com', '$2b$10$uo5svaFIoYpOHohkdP2TfOELE5bFHZ.aqU71C1e3Q/.Pc.vUpvFIq', 'Male', 'read, write', 'Admin', '/public/assets/1712577935213.png'),
(2, 'dhruval', 'hingu', 'dhruval@mail.com', '$2b$10$3BMb0UF.FoIkluEnJBOFKeIsnMEtEmoJs8h7J3EBsLWUz6hZc4LKy', 'Male', 'read, write', 'Admin', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD KEY `createdBy` (`createdBy`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoryId` (`categoryId`),
  ADD KEY `createdBy` (`createdBy`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`),
  ADD CONSTRAINT `product_ibfk_2` FOREIGN KEY (`createdBy`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
