ALTER TABLE `crew` MODIFY COLUMN `tags` text DEFAULT ('[]');--> statement-breakpoint
ALTER TABLE `crew` MODIFY COLUMN `expertise` text DEFAULT ('[]');--> statement-breakpoint
ALTER TABLE `crew` MODIFY COLUMN `credentialAnnotations` text DEFAULT ('[]');--> statement-breakpoint
ALTER TABLE `crew` MODIFY COLUMN `safetyMetrics` text DEFAULT ('[]');--> statement-breakpoint
ALTER TABLE `destinations` MODIFY COLUMN `highlights` text DEFAULT ('[]');--> statement-breakpoint
ALTER TABLE `destinations` MODIFY COLUMN `safetyNotes` text DEFAULT ('[]');--> statement-breakpoint
ALTER TABLE `proof_vault` MODIFY COLUMN `annotations` text DEFAULT ('[]');--> statement-breakpoint
ALTER TABLE `reviews` MODIFY COLUMN `guideNames` text DEFAULT ('[]');--> statement-breakpoint
ALTER TABLE `tours` MODIFY COLUMN `highlights` text DEFAULT ('[]');--> statement-breakpoint
ALTER TABLE `tours` MODIFY COLUMN `inclusions` text DEFAULT ('[]');--> statement-breakpoint
ALTER TABLE `tours` MODIFY COLUMN `exclusions` text DEFAULT ('[]');--> statement-breakpoint
ALTER TABLE `tours` MODIFY COLUMN `itinerary` text DEFAULT ('[]');--> statement-breakpoint
ALTER TABLE `tours` MODIFY COLUMN `destinations` text DEFAULT ('[]');