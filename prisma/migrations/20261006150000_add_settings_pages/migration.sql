-- Admin-editable copy for the About, Services and Contact pages, plus the
-- site-wide announcement bar. JSON like the other settings sections. Existing
-- rows get '{}' and read back as the defaults in
-- src/config/siteSettingsDefaults.js until an admin saves something.
ALTER TABLE "site_settings"
  ADD COLUMN "about_page" JSONB NOT NULL DEFAULT '{}',
  ADD COLUMN "services_page" JSONB NOT NULL DEFAULT '{}',
  ADD COLUMN "contact_page" JSONB NOT NULL DEFAULT '{}',
  ADD COLUMN "banner" JSONB NOT NULL DEFAULT '{}';
