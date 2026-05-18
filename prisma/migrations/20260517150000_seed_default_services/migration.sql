INSERT INTO "Service" ("id", "slug", "name", "description", "durationMinutes", "priceCents", "category", "isActive", "createdAt", "updatedAt")
VALUES
  ('cm00000000000000000000001', 'exterior-wash', 'Exterior Wash', 'A thorough exterior clean that restores your vehicle''s shine. Includes hand wash, wheel cleaning, and a streak-free rinse.', 60, 0, 'EXTERIOR_WASH', true, NOW(), NOW()),
  ('cm00000000000000000000002', 'interior-cleaning', 'Interior Cleaning', 'A deep interior refresh covering vacuuming, surface wipe-down, window cleaning, and odor elimination.', 90, 0, 'INTERIOR_CLEANING', true, NOW(), NOW())
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "description" = EXCLUDED."description",
  "durationMinutes" = EXCLUDED."durationMinutes",
  "priceCents" = EXCLUDED."priceCents",
  "category" = EXCLUDED."category",
  "isActive" = EXCLUDED."isActive",
  "updatedAt" = EXCLUDED."updatedAt";
