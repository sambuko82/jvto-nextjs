CREATE TABLE `crew` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(100) NOT NULL,
	`name` varchar(200) NOT NULL,
	`role` enum('Guide','Driver','Founder') NOT NULL,
	`image` text NOT NULL,
	`quote` text,
	`reviewer` varchar(200),
	`tags` json DEFAULT ('[]'),
	`archetype` varchar(200),
	`fullQuote` text,
	`expertise` json DEFAULT ('[]'),
	`credentialName` varchar(300),
	`credentialIssuer` varchar(300),
	`credentialStatus` varchar(100),
	`credentialCardImage` text,
	`credentialAnnotations` json DEFAULT ('[]'),
	`safetyMetrics` json DEFAULT ('[]'),
	`isActive` boolean DEFAULT true,
	`sortOrder` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `crew_id` PRIMARY KEY(`id`),
	CONSTRAINT `crew_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `crew_reviews` (
	`id` int AUTO_INCREMENT NOT NULL,
	`crewSlug` varchar(100) NOT NULL,
	`author` varchar(200) NOT NULL,
	`text` text NOT NULL,
	`platform` varchar(100) NOT NULL,
	`rating` int DEFAULT 5,
	`date` varchar(50),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `crew_reviews_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `destinations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(100) NOT NULL,
	`title` varchar(200) NOT NULL,
	`category` varchar(100) NOT NULL,
	`image` text NOT NULL,
	`heroImage` text,
	`description` text NOT NULL,
	`shortDesc` text,
	`duration` varchar(100),
	`altitude` varchar(100),
	`difficulty` enum('easy','moderate','challenging','extreme') DEFAULT 'moderate',
	`highlights` json DEFAULT ('[]'),
	`safetyNotes` json DEFAULT ('[]'),
	`bestTime` varchar(200),
	`sortOrder` int DEFAULT 0,
	`isActive` boolean DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `destinations_id` PRIMARY KEY(`id`),
	CONSTRAINT `destinations_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `faq` (
	`id` int AUTO_INCREMENT NOT NULL,
	`question` text NOT NULL,
	`answer` text NOT NULL,
	`category` varchar(100) DEFAULT 'general',
	`sortOrder` int DEFAULT 0,
	`isActive` boolean DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `faq_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pages_meta` (
	`id` int AUTO_INCREMENT NOT NULL,
	`route` varchar(300) NOT NULL,
	`titleTag` varchar(300),
	`metaDescription` text,
	`h1` text,
	`canonical` text,
	`schemaType` varchar(100),
	`robots` varchar(300),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `pages_meta_id` PRIMARY KEY(`id`),
	CONSTRAINT `pages_meta_route_unique` UNIQUE(`route`)
);
--> statement-breakpoint
CREATE TABLE `partners` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(200) NOT NULL,
	`status` varchar(200),
	`description` text,
	`tier` varchar(100),
	`logoUrl` text,
	`sortOrder` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `partners_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `press` (
	`id` int AUTO_INCREMENT NOT NULL,
	`publisher` varchar(200) NOT NULL,
	`date` varchar(50),
	`title` text NOT NULL,
	`translatedTitle` text,
	`url` text,
	`quote` text,
	`author` varchar(200),
	`screenshot` text,
	`sortOrder` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `press_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `proof_vault` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(200) NOT NULL,
	`category` varchar(100) NOT NULL,
	`vaultSection` varchar(100) NOT NULL,
	`title` text NOT NULL,
	`url` text NOT NULL,
	`hash` varchar(200),
	`lastVerified` varchar(50),
	`annotations` json DEFAULT ('[]'),
	`sortOrder` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `proof_vault_id` PRIMARY KEY(`id`),
	CONSTRAINT `proof_vault_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `reviews` (
	`id` int AUTO_INCREMENT NOT NULL,
	`author` varchar(200) NOT NULL,
	`text` text NOT NULL,
	`platform` varchar(100) NOT NULL,
	`rating` int DEFAULT 5,
	`date` varchar(50),
	`guideNames` json DEFAULT ('[]'),
	`isFeature` boolean DEFAULT false,
	`sortOrder` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `reviews_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tours` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(200) NOT NULL,
	`name` varchar(300) NOT NULL,
	`departure` enum('surabaya','bali') NOT NULL,
	`duration` varchar(100) NOT NULL,
	`durationDays` int NOT NULL,
	`pricePerPerson` int NOT NULL,
	`difficulty` enum('easy','moderate','challenging') DEFAULT 'moderate',
	`image` text,
	`description` text,
	`highlights` json DEFAULT ('[]'),
	`inclusions` json DEFAULT ('[]'),
	`exclusions` json DEFAULT ('[]'),
	`itinerary` json DEFAULT ('[]'),
	`destinations` json DEFAULT ('[]'),
	`rating` float DEFAULT 4.9,
	`reviewCount` int DEFAULT 0,
	`isActive` boolean DEFAULT true,
	`sortOrder` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `tours_id` PRIMARY KEY(`id`),
	CONSTRAINT `tours_slug_unique` UNIQUE(`slug`)
);
