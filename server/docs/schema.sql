CREATE TABLE `datapoints` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `lineid` varchar(255) DEFAULT NULL,
  `geolocation` point DEFAULT NULL,
  `price` float NOT NULL,
  `currency` varchar(20) NOT NULL DEFAULT '',
  `locname` text DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=678 DEFAULT CHARSET=utf8;

CREATE TABLE `known_loc` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `thainame` varchar(255) DEFAULT NULL,
  `geolocation` point DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=230 DEFAULT CHARSET=utf8;
