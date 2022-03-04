-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 25, 2021 at 08:34 AM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `erp`
--

-- --------------------------------------------------------

--
-- Table structure for table `add_products`
--

CREATE TABLE `add_products` (
  `id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_code` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `sub_category` varchar(255) NOT NULL,
  `quantity` varchar(255) NOT NULL,
  `wareHouse` varchar(255) NOT NULL,
  `retail_price` varchar(255) NOT NULL,
  `order_price` varchar(255) NOT NULL,
  `measurement_unit` varchar(255) NOT NULL,
  `valid_date` varchar(255) NOT NULL,
  `discription` varchar(500) NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `add_products`
--

INSERT INTO `add_products` (`id`, `product_name`, `product_code`, `category`, `sub_category`, `quantity`, `wareHouse`, `retail_price`, `order_price`, `measurement_unit`, `valid_date`, `discription`, `image`) VALUES
(17, 'Tyres', '1122', '8', 'Tyers', '0', '10', '1200', '', 'nhi', '2020-09-21', 'Tyres', ''),
(18, 'Tyre001', '001', '9', 'Dunlop', '2', '', '200', '', 'nhi', '2020-09-04', 'test', ''),
(19, 'Tyre001', '001', '9', 'Dunlop', '2', '', '200', '', 'nhi', '2020-09-04', 'test', ''),
(20, 'Tyre001', '001', '9', 'Dunlop', '2', '', '200', '', 'nhi', '2020-09-04', 'test', ''),
(21, 'Tyre001', '001', '9', 'Dunlop', '2', '', '200', '', 'nhi', '2020-09-04', 'test', ''),
(22, 'Tyre001', '001', '9', 'Dunlop', '2', '', '200', '', 'nhi', '2020-09-04', 'test', ''),
(23, 'Tyre001', '001', '9', 'Dunlop', '2', '', '200', '', 'nhi', '2020-09-04', 'test', ''),
(24, 'Tyre001', '001', '9', 'Dunlop', '2', '', '200', '', 'nhi', '2020-09-04', 'test', ''),
(25, 'Tyre001', '001', '9', 'Dunlop', '2', '', '200', '', 'nhi', '2020-09-04', 'test', ''),
(26, 'Tyre001', '001', '9', 'Dunlop', '2', '', '200', '', 'nhi', '2020-09-04', 'test', ''),
(27, 'Tyre001', '001', '9', 'Dunlop', '2', '', '200', '', 'nhi', '2020-09-04', 'test', ''),
(28, 'Tyre001', '001', '9', 'Dunlop', '2', '', '200', '', 'nhi', '2020-09-04', 'test', ''),
(29, 'Tyre001', '001', '9', 'Dunlop', '2', '', '200', '', 'nhi', '2020-09-04', 'test', '');

-- --------------------------------------------------------

--
-- Table structure for table `assign`
--

CREATE TABLE `assign` (
  `id` int(111) NOT NULL,
  `oil_type` varchar(255) NOT NULL,
  `s_type` varchar(255) NOT NULL,
  `a_qty` varchar(255) NOT NULL,
  `remarks` varchar(255) NOT NULL,
  `oil_t` varchar(255) NOT NULL,
  `supply_type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `assign`
--

INSERT INTO `assign` (`id`, `oil_type`, `s_type`, `a_qty`, `remarks`, `oil_t`, `supply_type`) VALUES
(1, '2020-09-08', 'FD', '0', 'E', 'E', 'R'),
(2, '2020-09-11', 'dsa', '0', 'afsd', 'fas', 'fsad');

-- --------------------------------------------------------

--
-- Table structure for table `bs_div`
--

CREATE TABLE `bs_div` (
  `id` int(111) NOT NULL,
  `b_code` varchar(255) NOT NULL,
  `bd_name` varchar(255) NOT NULL,
  `company` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bs_div`
--

INSERT INTO `bs_div` (`id`, `b_code`, `bd_name`, `company`) VALUES
(5, 'asf12ddd', 'asif', 'orange'),
(13, 'fas', 'asdf', 'orange'),
(14, 'fasdf', 'asfa', 'orange');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(111) NOT NULL,
  `c_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `c_name`) VALUES
(4, 'Crude'),
(9, 'Tyre');

-- --------------------------------------------------------

--
-- Table structure for table `emp_register`
--

CREATE TABLE `emp_register` (
  `id` int(111) NOT NULL,
  `code` varchar(255) NOT NULL,
  `f_name` varchar(255) NOT NULL,
  `l_name` varchar(255) NOT NULL,
  `dob` varchar(225) NOT NULL,
  `m_status` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `cnic_no` varchar(255) NOT NULL,
  `mob_no` varchar(255) NOT NULL,
  `p_no` varchar(255) NOT NULL,
  `e_address` varchar(255) NOT NULL,
  `c_name` varchar(255) NOT NULL,
  `d_name` varchar(255) NOT NULL,
  `desig` varchar(255) NOT NULL,
  `doj` varchar(255) NOT NULL,
  `text_area` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `emp_register`
--

INSERT INTO `emp_register` (`id`, `code`, `f_name`, `l_name`, `dob`, `m_status`, `gender`, `cnic_no`, `mob_no`, `p_no`, `e_address`, `c_name`, `d_name`, `desig`, `doj`, `text_area`) VALUES
(11, '1', '1111111', '111111', '2020-09-04', 'Sugar', 'Female', '11111', '1111', '11111', '1111', '10009', '1007', '4', '2020-09-04', ''),
(13, 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', '', 'undefined', 'undefined', 'undefined', 'undefined'),
(14, 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', '', 'undefined', 'undefined', 'undefined', 'undefined');

-- --------------------------------------------------------

--
-- Table structure for table `expense`
--

CREATE TABLE `expense` (
  `id` int(111) NOT NULL,
  `e_name` varchar(255) NOT NULL,
  `e_price` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `expense`
--

INSERT INTO `expense` (`id`, `e_name`, `e_price`, `status`) VALUES
(4, 'FASdsf', 'DSA', 'undefined'),
(5, 'FDSA', 'FDS', 'on'),
(6, 'afds', 'dsf', 'on'),
(7, 'dsa', 'ds', 'on');

-- --------------------------------------------------------

--
-- Table structure for table `facilityy`
--

CREATE TABLE `facilityy` (
  `id` int(111) NOT NULL,
  `f_name` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `facilityy`
--

INSERT INTO `facilityy` (`id`, `f_name`, `status`) VALUES
(4, 'asdsadfadfa', 'undefined'),
(5, 'undefined', 'undefined'),
(6, 'undefined', 'undefined'),
(7, 'undefined', 'undefined');

-- --------------------------------------------------------

--
-- Table structure for table `inv_form`
--

CREATE TABLE `inv_form` (
  `id` int(111) NOT NULL,
  `picker` varchar(255) NOT NULL,
  `inv_name` varchar(255) NOT NULL,
  `descrip` varchar(255) NOT NULL,
  `v_name` varchar(255) NOT NULL,
  `quality` varchar(255) NOT NULL,
  `company` varchar(255) NOT NULL,
  `cat` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `h_over` varchar(255) NOT NULL,
  `remarks` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `inv_form`
--

INSERT INTO `inv_form` (`id`, `picker`, `inv_name`, `descrip`, `v_name`, `quality`, `company`, `cat`, `price`, `h_over`, `remarks`) VALUES
(30, '2021-06-08', '123', '123', '123', '123', '1', '123', '123', '123', '123');

-- --------------------------------------------------------

--
-- Table structure for table `locations`
--

CREATE TABLE `locations` (
  `id` int(111) NOT NULL,
  `f_loc` varchar(255) NOT NULL,
  `c_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `locations`
--

INSERT INTO `locations` (`id`, `f_loc`, `c_name`) VALUES
(1, 'asdf', '3');

-- --------------------------------------------------------

--
-- Table structure for table `oil`
--

CREATE TABLE `oil` (
  `id` int(11) NOT NULL,
  `oil_name` varchar(255) NOT NULL,
  `oil_code` varchar(255) NOT NULL,
  `oil_category` varchar(255) NOT NULL,
  `brand_name` varchar(255) NOT NULL,
  `quantity` varchar(255) NOT NULL,
  `oli_retail_price` varchar(255) NOT NULL,
  `m_unit` varchar(255) NOT NULL,
  `valid_date` varchar(255) NOT NULL,
  `discription` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `oil`
--

INSERT INTO `oil` (`id`, `oil_name`, `oil_code`, `oil_category`, `brand_name`, `quantity`, `oli_retail_price`, `m_unit`, `valid_date`, `discription`) VALUES
(1, 'Rad Oil', '123', '8', 'Shall', '277', '700', '8', '2020-09-04', 'Shall Oil '),
(2, 'Green Oil', '232', '8', 'Power', '179', '1200', '8', '2020-09-30', 'Green Shall Oil');

-- --------------------------------------------------------

--
-- Table structure for table `oil_assign`
--

CREATE TABLE `oil_assign` (
  `id` int(11) NOT NULL,
  `warehouse_id` int(11) NOT NULL,
  `oil_id` int(11) NOT NULL,
  `quantity` varchar(255) NOT NULL,
  `m_unit` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `oil_assign`
--

INSERT INTO `oil_assign` (`id`, `warehouse_id`, `oil_id`, `quantity`, `m_unit`) VALUES
(11, 4, 2, '193', 8),
(13, 10, 1, '193', 8);

-- --------------------------------------------------------

--
-- Table structure for table `oil_assign_tovehicle`
--

CREATE TABLE `oil_assign_tovehicle` (
  `id` int(11) NOT NULL,
  `vehicle_no` varchar(255) NOT NULL,
  `brand_name` varchar(255) NOT NULL,
  `supply_type` varchar(255) NOT NULL,
  `quantity` varchar(255) NOT NULL,
  `warehouse` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `issue_date` varchar(255) NOT NULL,
  `operation` varchar(255) NOT NULL,
  `remarks` varchar(255) NOT NULL,
  `change_hr` varchar(255) NOT NULL,
  `expect_hr` varchar(255) NOT NULL,
  `expect_date` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `oil_assign_tovehicle`
--

INSERT INTO `oil_assign_tovehicle` (`id`, `vehicle_no`, `brand_name`, `supply_type`, `quantity`, `warehouse`, `price`, `issue_date`, `operation`, `remarks`, `change_hr`, `expect_hr`, `expect_date`) VALUES
(6, '41', '1', '1', '10', '4', '100', '2021-06-21', '1', 'Oil Issued', '200', '180', 2021);

-- --------------------------------------------------------

--
-- Table structure for table `oil_issues`
--

CREATE TABLE `oil_issues` (
  `id` int(111) NOT NULL,
  `oil_type` varchar(255) NOT NULL,
  `s_type` varchar(255) NOT NULL,
  `a_qty` varchar(255) NOT NULL,
  `issue_date` varchar(255) NOT NULL,
  `op` varchar(255) NOT NULL,
  `remark` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `oil_issues`
--

INSERT INTO `oil_issues` (`id`, `oil_type`, `s_type`, `a_qty`, `issue_date`, `op`, `remark`) VALUES
(2, 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', ''),
(3, 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'yes'),
(4, 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'yes');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(111) NOT NULL,
  `c_id` int(11) NOT NULL,
  `p_name` varchar(255) NOT NULL,
  `p_price` int(11) NOT NULL,
  `vari` varchar(255) NOT NULL,
  `detail` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `c_id`, `p_name`, `p_price`, `vari`, `detail`) VALUES
(8, 7, 'a', 22, '', 'ASDF'),
(13, 4, 'tyre', 0, '6', 'aa'),
(15, 9, 'Dunlop', 200, '6', '');

-- --------------------------------------------------------

--
-- Table structure for table `stock_in`
--

CREATE TABLE `stock_in` (
  `id` int(111) NOT NULL,
  `p_name` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `warehouse` varchar(255) NOT NULL,
  `qty` varchar(255) NOT NULL,
  `total` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `stock_in`
--

INSERT INTO `stock_in` (`id`, `p_name`, `price`, `warehouse`, `qty`, `total`) VALUES
(14, '3', '1000', '5', '10', '10000'),
(16, '3', '200', '4', '2', '400'),
(17, '5', '122', '4', '2', '244'),
(18, '13', '100', '10', '10', '1000');

-- --------------------------------------------------------

--
-- Table structure for table `sub_product`
--

CREATE TABLE `sub_product` (
  `id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_no` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `main_product_id` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sub_product`
--

INSERT INTO `sub_product` (`id`, `product_name`, `product_no`, `status`, `main_product_id`) VALUES
(34, 'Panther', '1', 'New', 17),
(35, 'Service', '2', 'New', 17),
(36, 'tyre001', '001-0', 'New', 18),
(37, 'tyre002', '001-1', 'New', 18),
(38, 'tyre001', '001-0', 'New', 19),
(39, 'tyre002', '001-1', 'New', 19),
(40, 'tyre001', '001-0', 'New', 19),
(41, 'tyre002', '001-1', 'New', 19),
(42, 'tyre001', '001-0', 'New', 20),
(43, 'tyre002', '001-1', 'New', 20),
(44, 'tyre001', '001-0', 'New', 20),
(45, 'tyre002', '001-1', 'New', 20),
(46, 'tyre001', '001-0', 'New', 20),
(47, 'tyre002', '001-1', 'New', 20),
(48, 'tyre001', '001-0', 'New', 21),
(49, 'tyre002', '001-1', 'New', 21),
(50, 'tyre001', '001-0', 'New', 21),
(51, 'tyre002', '001-1', 'New', 21),
(52, 'tyre001', '001-0', 'New', 21),
(53, 'tyre002', '001-1', 'New', 21),
(54, 'tyre001', '001-0', 'New', 21),
(55, 'tyre002', '001-1', 'New', 21),
(56, 'tyre001', '001-0', 'New', 22),
(57, 'tyre002', '001-1', 'New', 22),
(58, 'tyre001', '001-0', 'New', 22),
(59, 'tyre002', '001-1', 'New', 22),
(60, 'tyre001', '001-0', 'New', 22),
(61, 'tyre002', '001-1', 'New', 22),
(62, 'tyre001', '001-0', 'New', 22),
(63, 'tyre002', '001-1', 'New', 22),
(64, 'tyre001', '001-0', 'New', 22),
(65, 'tyre002', '001-1', 'New', 22),
(66, 'tyre001', '001-0', 'New', 23),
(67, 'tyre002', '001-1', 'New', 23),
(68, 'tyre001', '001-0', 'New', 23),
(69, 'tyre002', '001-1', 'New', 23),
(70, 'tyre001', '001-0', 'New', 23),
(71, 'tyre002', '001-1', 'New', 23),
(72, 'tyre001', '001-0', 'New', 23),
(73, 'tyre002', '001-1', 'New', 23),
(74, 'tyre001', '001-0', 'New', 23),
(75, 'tyre002', '001-1', 'New', 23),
(76, 'tyre001', '001-0', 'New', 23),
(77, 'tyre002', '001-1', 'New', 23),
(78, 'tyre001', '001-0', 'New', 28),
(79, 'tyre002', '001-1', 'New', 28),
(80, 'tyre001', '001-0', 'New', 28),
(81, 'tyre002', '001-1', 'New', 28),
(82, 'tyre001', '001-0', 'New', 28),
(83, 'tyre002', '001-1', 'New', 28),
(84, 'tyre001', '001-0', 'New', 28),
(85, 'tyre002', '001-1', 'New', 28),
(86, 'tyre001', '001-0', 'New', 28),
(87, 'tyre002', '001-1', 'New', 28),
(88, 'tyre001', '001-0', 'New', 28),
(89, 'tyre002', '001-1', 'New', 28),
(90, 'tyre001', '001-0', 'New', 28),
(91, 'tyre002', '001-1', 'New', 28),
(92, 'tyre001', '001-0', 'New', 28),
(93, 'tyre002', '001-1', 'New', 28),
(94, 'tyre001', '001-0', 'New', 28),
(95, 'tyre002', '001-1', 'New', 28),
(96, 'tyre001', '001-0', 'New', 28),
(97, 'tyre002', '001-1', 'New', 28),
(98, 'tyre001', '001-0', 'New', 28),
(99, 'tyre002', '001-1', 'New', 28),
(100, 'tyre001', '001-0', 'New', 28),
(101, 'tyre002', '001-1', 'New', 28),
(102, 'tyre001', '001-0', 'New', 28),
(103, 'tyre002', '001-1', 'New', 28),
(104, 'tyre001', '001-0', 'New', 28),
(105, 'tyre002', '001-1', 'New', 28),
(106, 'tyre001', '001-0', 'New', 28),
(107, 'tyre002', '001-1', 'New', 28),
(108, 'tyre001', '001-0', 'New', 28),
(109, 'tyre002', '001-1', 'New', 28),
(110, 'tyre001', '001-0', 'New', 28),
(111, 'tyre002', '001-1', 'New', 28),
(112, 'tyre001', '001-0', 'New', 28),
(113, 'tyre002', '001-1', 'New', 28),
(114, 'tyre001', '001-0', 'New', 28),
(115, 'tyre002', '001-1', 'New', 28),
(116, 'tyre001', '001-0', 'New', 28),
(117, 'tyre002', '001-1', 'New', 28),
(118, 'tyre001', '001-0', 'New', 28),
(119, 'tyre002', '001-1', 'New', 28),
(120, 'tyre001', '001-0', 'New', 28),
(121, 'tyre002', '001-1', 'New', 28),
(122, 'tyre001', '001-0', 'New', 28),
(123, 'tyre002', '001-1', 'New', 28),
(124, 'tyre001', '001-0', 'New', 28),
(125, 'tyre002', '001-1', 'New', 28),
(126, 'tyre001', '001-0', 'New', 28),
(127, 'tyre002', '001-1', 'New', 28),
(128, 'tyre001', '001-0', 'New', 28),
(129, 'tyre002', '001-1', 'New', 28),
(130, 'tyre001', '001-0', 'New', 28),
(131, 'tyre002', '001-1', 'New', 28),
(132, 'tyre001', '001-0', 'New', 28),
(133, 'tyre002', '001-1', 'New', 28),
(134, 'tyre001', '001-0', 'New', 28),
(135, 'tyre002', '001-1', 'New', 28),
(136, 'tyre001', '001-0', 'New', 28),
(137, 'tyre002', '001-1', 'New', 28),
(138, 'tyre001', '001-0', 'New', 28),
(139, 'tyre002', '001-1', 'New', 28),
(140, 'tyre001', '001-0', 'New', 28),
(141, 'tyre002', '001-1', 'New', 28),
(142, 'tyre001', '001-0', 'New', 28),
(143, 'tyre002', '001-1', 'New', 28),
(144, 'tyre001', '001-0', 'New', 28),
(145, 'tyre002', '001-1', 'New', 28),
(146, 'tyre001', '001-0', 'New', 28),
(147, 'tyre002', '001-1', 'New', 28),
(148, 'tyre001', '001-0', 'New', 28),
(149, 'tyre002', '001-1', 'New', 28),
(150, 'tyre001', '001-0', 'New', 28),
(151, 'tyre002', '001-1', 'New', 28),
(152, 'tyre001', '001-0', 'New', 28),
(153, 'tyre002', '001-1', 'New', 28),
(154, 'tyre001', '001-0', 'New', 28),
(155, 'tyre002', '001-1', 'New', 28),
(156, 'tyre001', '001-0', 'New', 28),
(157, 'tyre002', '001-1', 'New', 28),
(158, 'tyre001', '001-0', 'New', 28),
(159, 'tyre002', '001-1', 'New', 28),
(160, 'tyre001', '001-0', 'New', 28),
(161, 'tyre002', '001-1', 'New', 28),
(162, 'tyre001', '001-0', 'New', 28),
(163, 'tyre002', '001-1', 'New', 28),
(164, 'tyre001', '001-0', 'New', 28),
(165, 'tyre002', '001-1', 'New', 28),
(166, 'tyre001', '001-0', 'New', 28),
(167, 'tyre002', '001-1', 'New', 28),
(168, 'tyre001', '001-0', 'New', 28),
(169, 'tyre002', '001-1', 'New', 28),
(170, 'tyre001', '001-0', 'New', 28),
(171, 'tyre002', '001-1', 'New', 28),
(172, 'tyre001', '001-0', 'New', 28),
(173, 'tyre002', '001-1', 'New', 28),
(174, 'tyre001', '001-0', 'New', 28),
(175, 'tyre002', '001-1', 'New', 28),
(176, 'tyre001', '001-0', 'New', 28),
(177, 'tyre002', '001-1', 'New', 28),
(178, 'tyre001', '001-0', 'New', 28),
(179, 'tyre002', '001-1', 'New', 28),
(180, 'tyre001', '001-0', 'New', 28),
(181, 'tyre002', '001-1', 'New', 28),
(182, 'tyre001', '001-0', 'New', 28),
(183, 'tyre002', '001-1', 'New', 28),
(184, 'tyre001', '001-0', 'New', 28),
(185, 'tyre002', '001-1', 'New', 28),
(186, 'tyre001', '001-0', 'New', 28),
(187, 'tyre002', '001-1', 'New', 28),
(188, 'tyre001', '001-0', 'New', 28),
(189, 'tyre002', '001-1', 'New', 28),
(190, 'tyre001', '001-0', 'New', 28),
(191, 'tyre002', '001-1', 'New', 28),
(192, 'tyre001', '001-0', 'New', 28),
(193, 'tyre002', '001-1', 'New', 28),
(194, 'tyre001', '001-0', 'New', 28),
(195, 'tyre002', '001-1', 'New', 28),
(196, 'tyre001', '001-0', 'New', 28),
(197, 'tyre002', '001-1', 'New', 28),
(198, 'tyre001', '001-0', 'New', 29),
(199, 'tyre002', '001-1', 'New', 29),
(200, 'tyre001', '001-0', 'New', 29),
(201, 'tyre002', '001-1', 'New', 29),
(202, 'tyre001', '001-0', 'New', 29),
(203, 'tyre002', '001-1', 'New', 29),
(204, 'tyre001', '001-0', 'New', 29),
(205, 'tyre002', '001-1', 'New', 29),
(206, 'tyre001', '001-0', 'New', 29),
(207, 'tyre002', '001-1', 'New', 29),
(208, 'tyre001', '001-0', 'New', 29),
(209, 'tyre002', '001-1', 'New', 29),
(210, 'tyre001', '001-0', 'New', 29),
(211, 'tyre002', '001-1', 'New', 29),
(212, 'tyre001', '001-0', 'New', 29),
(213, 'tyre002', '001-1', 'New', 29),
(214, 'tyre001', '001-0', 'New', 29),
(215, 'tyre002', '001-1', 'New', 29),
(216, 'tyre001', '001-0', 'New', 29),
(217, 'tyre002', '001-1', 'New', 29),
(218, 'tyre001', '001-0', 'New', 29),
(219, 'tyre002', '001-1', 'New', 29),
(220, 'tyre001', '001-0', 'New', 29),
(221, 'tyre002', '001-1', 'New', 29),
(222, 'tyre001', '001-0', 'New', 29),
(223, 'tyre002', '001-1', 'New', 29),
(224, 'tyre001', '001-0', 'New', 29),
(225, 'tyre002', '001-1', 'New', 29),
(226, 'tyre001', '001-0', 'New', 29),
(227, 'tyre002', '001-1', 'New', 29);

-- --------------------------------------------------------

--
-- Table structure for table `test`
--

CREATE TABLE `test` (
  `id` int(11) NOT NULL,
  `name` varchar(22) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `test`
--

INSERT INTO `test` (`id`, `name`) VALUES
(1, 'testing');

-- --------------------------------------------------------

--
-- Table structure for table `tyre_issue`
--

CREATE TABLE `tyre_issue` (
  `id` int(111) NOT NULL,
  `i_date` varchar(255) NOT NULL,
  `v_no` varchar(255) NOT NULL,
  `v_type` varchar(255) NOT NULL,
  `qty` varchar(255) NOT NULL,
  `warehouse_id` varchar(255) NOT NULL,
  `remark` varchar(255) NOT NULL,
  `t_num` varchar(255) NOT NULL,
  `t_brand` varchar(255) NOT NULL,
  `current_odo` varchar(255) NOT NULL,
  `next_odo` varchar(255) NOT NULL,
  `expect_date` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tyre_issue`
--

INSERT INTO `tyre_issue` (`id`, `i_date`, `v_no`, `v_type`, `qty`, `warehouse_id`, `remark`, `t_num`, `t_brand`, `current_odo`, `next_odo`, `expect_date`) VALUES
(11, '2021-06-21', '41', '7', '1', '4', 'Tyes Issued', '35', '17', '12345', '123456', '2022-01-01');

-- --------------------------------------------------------

--
-- Table structure for table `varitions`
--

CREATE TABLE `varitions` (
  `id` int(111) NOT NULL,
  `varii` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `varitions`
--

INSERT INTO `varitions` (`id`, `varii`) VALUES
(6, 'Kg'),
(8, 'Ltr.');

-- --------------------------------------------------------

--
-- Table structure for table `vehicl_reg`
--

CREATE TABLE `vehicl_reg` (
  `id` int(11) NOT NULL,
  `v_type` varchar(255) NOT NULL,
  `v_no` varchar(255) NOT NULL,
  `e_no` varchar(255) NOT NULL,
  `c_no` varchar(225) NOT NULL,
  `v_name` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vehicl_reg`
--

INSERT INTO `vehicl_reg` (`id`, `v_type`, `v_no`, `e_no`, `c_no`, `v_name`, `status`) VALUES
(41, 'Motorcycle', 'KKM-3477', '12345678', '12345678', 'Honda', 'on');

-- --------------------------------------------------------

--
-- Table structure for table `w_house`
--

CREATE TABLE `w_house` (
  `id` int(111) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `w_house`
--

INSERT INTO `w_house` (`id`, `name`) VALUES
(4, 'P2P Track'),
(12, 'bilal');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `add_products`
--
ALTER TABLE `add_products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `assign`
--
ALTER TABLE `assign`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bs_div`
--
ALTER TABLE `bs_div`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `emp_register`
--
ALTER TABLE `emp_register`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `expense`
--
ALTER TABLE `expense`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `facilityy`
--
ALTER TABLE `facilityy`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `inv_form`
--
ALTER TABLE `inv_form`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `oil`
--
ALTER TABLE `oil`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `oil_assign`
--
ALTER TABLE `oil_assign`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `oil_assign_tovehicle`
--
ALTER TABLE `oil_assign_tovehicle`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `oil_issues`
--
ALTER TABLE `oil_issues`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stock_in`
--
ALTER TABLE `stock_in`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sub_product`
--
ALTER TABLE `sub_product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `test`
--
ALTER TABLE `test`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tyre_issue`
--
ALTER TABLE `tyre_issue`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `varitions`
--
ALTER TABLE `varitions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vehicl_reg`
--
ALTER TABLE `vehicl_reg`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `w_house`
--
ALTER TABLE `w_house`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `add_products`
--
ALTER TABLE `add_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `assign`
--
ALTER TABLE `assign`
  MODIFY `id` int(111) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `bs_div`
--
ALTER TABLE `bs_div`
  MODIFY `id` int(111) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(111) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `emp_register`
--
ALTER TABLE `emp_register`
  MODIFY `id` int(111) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `expense`
--
ALTER TABLE `expense`
  MODIFY `id` int(111) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `facilityy`
--
ALTER TABLE `facilityy`
  MODIFY `id` int(111) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `inv_form`
--
ALTER TABLE `inv_form`
  MODIFY `id` int(111) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `locations`
--
ALTER TABLE `locations`
  MODIFY `id` int(111) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `oil`
--
ALTER TABLE `oil`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `oil_assign`
--
ALTER TABLE `oil_assign`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `oil_assign_tovehicle`
--
ALTER TABLE `oil_assign_tovehicle`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `oil_issues`
--
ALTER TABLE `oil_issues`
  MODIFY `id` int(111) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(111) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `stock_in`
--
ALTER TABLE `stock_in`
  MODIFY `id` int(111) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `sub_product`
--
ALTER TABLE `sub_product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=228;

--
-- AUTO_INCREMENT for table `test`
--
ALTER TABLE `test`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tyre_issue`
--
ALTER TABLE `tyre_issue`
  MODIFY `id` int(111) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `varitions`
--
ALTER TABLE `varitions`
  MODIFY `id` int(111) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `vehicl_reg`
--
ALTER TABLE `vehicl_reg`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `w_house`
--
ALTER TABLE `w_house`
  MODIFY `id` int(111) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
