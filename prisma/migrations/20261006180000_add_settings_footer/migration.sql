-- Footer quick links and copyright line. The other additions in this release
-- (hero slides, service cards, vision statement, contact page headline) live
-- inside JSON columns that already exist, so they need no migration.
ALTER TABLE "site_settings" ADD COLUMN "footer" JSONB NOT NULL DEFAULT '{}';
