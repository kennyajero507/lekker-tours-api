-- Site name, logos and favicon. JSON like the other settings sections: read and
-- written whole, never queried by field. Existing rows get '{}' and fall back
-- to the defaults in src/config/siteSettingsDefaults.js on read.
ALTER TABLE "site_settings" ADD COLUMN "branding" JSONB NOT NULL DEFAULT '{}';
