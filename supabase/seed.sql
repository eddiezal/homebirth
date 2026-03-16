-- Homebirth.com Seed Data
-- Run AFTER schema.sql in the Supabase SQL Editor.
--
-- NOTE: These providers use deterministic UUIDs so we can reference them
-- in seed data for education, reviews, and ratings.
-- In production, providers will have real auth.users UUIDs.
--
-- For seeding, we insert directly into the providers table with generated UUIDs.
-- These are NOT linked to auth.users — they're read-only seed profiles.
-- RLS policies allow public reads, so this works for the public-facing pages.

-- Temporarily disable RLS for seeding
alter table public.providers disable row level security;
alter table public.provider_education disable row level security;
alter table public.provider_reviews disable row level security;
alter table public.provider_ratings disable row level security;

-- ============================================================
-- PROVIDERS
-- ============================================================

insert into public.providers (id, name, credentials, location, service_radius, years_experience, births_attended, philosophy, tagline, price_range, fee_min, fee_max, response_time, accepting_clients, birth_settings, languages, insurance_accepted, sliding_scale, specialties, scope, transfer_plan, communication_tags, values_tags, whats_included, payment_notes, aggregate_rating, review_count, sentiment_tags, onboarding_complete)
values
  -- Provider 1: Sarah Chen
  ('00000000-0000-0000-0000-000000000001',
   'Sarah Chen', 'CNM, MSN', 'North Park, San Diego', 15, 12, '400+',
   'Birth is a natural process that deserves patience, trust, and skilled support. I believe in empowering families to make informed choices.',
   'Empowering families through evidence-based, compassionate midwifery care.',
   '$4,500 – $6,500', 4500, 6500, 'Responds within 24 hours', true,
   '{"Home birth","Birth center"}', '{"English","Mandarin"}',
   '{"Blue Shield","Aetna","United"}', false,
   '{"Prenatal care","Natural birth","Water birth","VBAC"}',
   '{"First-time parents","VBAC","Water birth","Multiples consultation"}',
   'I maintain collaborative agreements with Sharp Mary Birch and UC San Diego Medical Center. Both are within 15 minutes of my primary service area. I conduct risk assessments at every visit and have a detailed transfer protocol for non-emergent and emergent situations.',
   '{"Evidence-based","Balanced approach","Shared decision-making"}',
   '{"Evidence-focused","Bilingual"}',
   '{"Prenatal visits (10-12)","Labor & birth attendance","Postpartum visits (2)","24/7 on-call availability","Newborn exam"}',
   'Payment plans available. 50% due by 36 weeks, remainder due before birth. HSA/FSA accepted.',
   4.9, 47, '{"Great communicator","Made me feel safe","Evidence-based","Knowledgeable","Responsive"}',
   true),

  -- Provider 2: Maria Rodriguez
  ('00000000-0000-0000-0000-000000000002',
   'Maria Rodriguez', 'CPM, LM', 'Hillcrest, San Diego', 10, 8, '250+',
   'I create a sacred space for each birth, honoring the unique journey of every family. Bilingual care for English and Spanish-speaking families.',
   'Sacred, bilingual birth care honoring your unique journey.',
   '$3,800 – $5,200', 3800, 5200, 'Responds within 12 hours', true,
   '{"Home birth"}', '{"English","Spanish"}',
   '{"Medicaid","Blue Shield"}', true,
   '{"Trauma-informed birth","Holistic prenatal care","Postpartum support"}',
   '{"First-time parents","Trauma-informed care","Postpartum-only","Low-intervention birth"}',
   'I have a collaborative relationship with a backup OB at Scripps Mercy Hospital. Transfer plans are discussed at 36 weeks and reviewed with each family. I accompany families through any transfer and advocate on their behalf.',
   '{"Gentle","Trauma-informed","Culturally responsive"}',
   '{"Trauma-informed","Culturally responsive","Holistic"}',
   '{"Prenatal visits (10-12)","Labor & birth attendance","Postpartum visits (3)","24/7 on-call availability","Birth supplies kit"}',
   'Sliding scale available for families earning under $60k/year. Medicaid accepted. Payment plans offered — no family turned away for inability to pay.',
   4.8, 31, '{"Trauma-informed","Culturally responsive","Bilingual","Gentle","Patient"}',
   true),

  -- Provider 3: Jennifer Walsh
  ('00000000-0000-0000-0000-000000000003',
   'Jennifer Walsh', 'CNM', 'La Jolla, San Diego', 20, 15, '600+',
   'Evidence-based care meets compassionate support. I partner with families to navigate pregnancy and birth with confidence and clarity.',
   'Evidence-based care with compassionate, experienced support.',
   '$5,500 – $7,500', 5500, 7500, 'Responds within 48 hours', true,
   '{"Home birth","Birth center"}', '{"English"}',
   '{"Blue Shield","Cigna","Aetna","United"}', false,
   '{"VBAC","High-risk consultation","Water birth","Evidence-based care"}',
   '{"First-time parents","VBAC","Twins consultation","Breech evaluation","Water birth"}',
   'I have formal collaborative agreements with two OB practices at Scripps La Jolla and UC San Diego. My transfer rate is under 12%, and I accompany every family through the process. Hospital staff know me by name — continuity of care doesn''t stop at the front door.',
   '{"Evidence-based counseling","Direct","Educational"}',
   '{"Evidence-focused"}',
   '{"Prenatal visits (12-14)","Labor & birth attendance","Postpartum visits (3)","24/7 on-call availability","Newborn exam","Lactation support referral"}',
   'Payment plans available. Insurance billing handled in-house. Superbill provided for out-of-network reimbursement.',
   4.9, 63, '{"Highly experienced","Evidence-based","Knowledgeable","Great with VBACs","Calm presence"}',
   true),

  -- Provider 4: Aisha Johnson
  ('00000000-0000-0000-0000-000000000004',
   'Aisha Johnson', 'CPM', 'Ocean Beach, San Diego', 10, 6, '150+',
   'Birth is a transformative rite of passage. I bring culturally responsive, affirming care that centers your voice and your experience.',
   'Affirming, culturally responsive birth care centered on your voice.',
   '$3,500 – $5,000', 3500, 5000, 'Responds within 24 hours', true,
   '{"Home birth"}', '{"English"}',
   '{"Self-pay","Medicaid"}', true,
   '{"Culturally responsive care","LGBTQ+ affirming birth","Holistic prenatal wellness"}',
   '{"First-time parents","LGBTQ+ families","Low-intervention birth","Postpartum support"}',
   'I work with a backup OB at Sharp Grossmont. Transfer discussions happen early so there are no surprises. I stay with you through the entire process if a transfer is needed.',
   '{"Gentle","Affirming","Empowering"}',
   '{"LGBTQ+ affirming","Culturally responsive","Holistic"}',
   '{"Prenatal visits (10-12)","Labor & birth attendance","Postpartum visits (2)","24/7 on-call availability","Birth supplies kit"}',
   'Sliding scale available. Medicaid accepted. Payment plans always available — let''s talk about what works for your family.',
   4.9, 18, '{"Affirming","Peaceful presence","Empowering","Inclusive"}',
   true),

  -- Provider 5: Dr. Emily Park (no reviews — tests empty state)
  ('00000000-0000-0000-0000-000000000005',
   'Dr. Emily Park', 'CNM, DNP', 'Carlsbad, CA', 30, 20, '800+',
   'Two decades of experience have taught me that every birth is unique. I offer calm, steady guidance for families who want a deeply supported experience.',
   'Calm, steady guidance from two decades of midwifery experience.',
   '$6,000 – $8,500', 6000, 8500, 'Responds within 48 hours', false,
   '{"Home birth","Birth center"}', '{"English","Korean"}',
   '{"Blue Shield","Aetna","Cigna","United","Tricare"}', false,
   '{"VBAC","High-risk consultation","Faith-integrated birth","Guided care"}',
   '{"First-time parents","VBAC","Breech evaluation","High-risk pregnancies","Multiples consultation"}',
   'I have collaborative agreements with Tri-City Medical Center in Oceanside. My approach prioritizes early risk identification and seamless transitions when needed. Families receive a detailed transfer plan at 34 weeks.',
   '{"Guided","Reassuring","Faith-friendly"}',
   '{"Faith-friendly","Evidence-focused"}',
   '{"Prenatal visits (12-14)","Labor & birth attendance","Postpartum visits (4)","24/7 on-call availability","Newborn exam","Lactation support","Birth supplies kit"}',
   'Insurance billing handled in-house for all accepted plans. Superbill provided for out-of-network. Payment plans available upon request.',
   0, 0, '{}',
   true);

-- ============================================================
-- PROVIDER EDUCATION
-- ============================================================

insert into public.provider_education (provider_id, institution, degree, year) values
  -- Sarah Chen
  ('00000000-0000-0000-0000-000000000001', 'UCSF School of Nursing', 'MSN, Nurse-Midwifery', 2013),
  ('00000000-0000-0000-0000-000000000001', 'UCLA', 'BSN', 2010),
  -- Maria Rodriguez
  ('00000000-0000-0000-0000-000000000002', 'National College of Midwifery', 'CPM', 2017),
  ('00000000-0000-0000-0000-000000000002', 'San Diego Doula Academy', 'Certified Doula', 2014),
  -- Jennifer Walsh
  ('00000000-0000-0000-0000-000000000003', 'Yale School of Nursing', 'MSN, Nurse-Midwifery', 2010),
  ('00000000-0000-0000-0000-000000000003', 'Georgetown University', 'BSN', 2007),
  -- Aisha Johnson
  ('00000000-0000-0000-0000-000000000004', 'Midwives College of Utah', 'CPM', 2019),
  ('00000000-0000-0000-0000-000000000004', 'University of San Diego', 'BA, Public Health', 2016),
  -- Dr. Emily Park
  ('00000000-0000-0000-0000-000000000005', 'Duke University School of Nursing', 'DNP, Nurse-Midwifery', 2008),
  ('00000000-0000-0000-0000-000000000005', 'University of Washington', 'MSN', 2005),
  ('00000000-0000-0000-0000-000000000005', 'Korean University', 'BSN', 2002);

-- ============================================================
-- PROVIDER REVIEWS
-- ============================================================

insert into public.provider_reviews (provider_id, source, author, rating, date, text) values
  -- Sarah Chen
  ('00000000-0000-0000-0000-000000000001', 'google', 'Amanda T.', 5, '2025-10-15',
   'Sarah was incredible throughout my entire pregnancy and birth. She made me feel so safe and informed at every step. I couldn''t have asked for a better midwife.'),
  ('00000000-0000-0000-0000-000000000001', 'google', 'Jessica M.', 5, '2025-08-22',
   'After a traumatic hospital birth with my first, Sarah helped me have the healing home birth I dreamed of. Her VBAC experience was exactly what I needed.'),
  ('00000000-0000-0000-0000-000000000001', 'yelp', 'Diana L.', 5, '2025-07-10',
   'Professional, warm, and incredibly knowledgeable. Sarah''s evidence-based approach gave us so much confidence. She was always just a text away.'),
  ('00000000-0000-0000-0000-000000000001', 'facebook', 'Rachel K.', 4, '2025-05-03',
   'Sarah is a wonderful midwife. She was patient, calm, and made our home birth feel so natural. The only reason it''s not 5 stars is scheduling was sometimes tricky.'),
  -- Maria Rodriguez
  ('00000000-0000-0000-0000-000000000002', 'google', 'Sofia R.', 5, '2025-09-18',
   'Maria fue increíble. As a Spanish speaker, having a midwife who understood my culture and language made all the difference. She is gentle, kind, and so skilled.'),
  ('00000000-0000-0000-0000-000000000002', 'yelp', 'Karen W.', 5, '2025-06-25',
   'Maria''s trauma-informed approach was life-changing. After a difficult first birth, she helped me process my fears and have a beautiful home birth.'),
  ('00000000-0000-0000-0000-000000000002', 'google', 'Tanya B.', 4, '2025-04-12',
   'Warm and caring. Maria really listens and takes her time with every appointment. I always felt heard and respected.'),
  -- Jennifer Walsh
  ('00000000-0000-0000-0000-000000000003', 'google', 'Michelle P.', 5, '2025-11-02',
   'Jennifer is the gold standard. Her years of experience show in everything she does. She caught a complication early that my OB had missed, and I''m so grateful.'),
  ('00000000-0000-0000-0000-000000000003', 'yelp', 'Lauren S.', 5, '2025-09-14',
   'Incredibly knowledgeable and confident. Jennifer made me feel like I was in the best hands possible. Her transfer plan gave my nervous husband total peace of mind.'),
  ('00000000-0000-0000-0000-000000000003', 'facebook', 'Amy D.', 5, '2025-07-28',
   'I had a VBAC at home with Jennifer and it was the most empowering experience of my life. She is calm, prepared, and brilliant.'),
  ('00000000-0000-0000-0000-000000000003', 'google', 'Priya N.', 4, '2025-05-20',
   'Very thorough and professional. Jennifer takes an evidence-based approach which I appreciated. She can be a bit clinical at times, but that''s exactly what I wanted.'),
  -- Aisha Johnson
  ('00000000-0000-0000-0000-000000000004', 'google', 'Morgan C.', 5, '2025-11-20',
   'As a queer couple, finding affirming birth care felt impossible until we found Aisha. She made us feel seen, respected, and completely at ease.'),
  ('00000000-0000-0000-0000-000000000004', 'google', 'Destiny W.', 5, '2025-08-15',
   'Aisha is pure light. She created such a peaceful, empowering space for my birth. I felt held and supported every step of the way.');
  -- Dr. Emily Park has no reviews (tests empty state)

-- ============================================================
-- PROVIDER RATINGS (aggregated per source)
-- ============================================================

insert into public.provider_ratings (provider_id, source, rating, count) values
  -- Sarah Chen
  ('00000000-0000-0000-0000-000000000001', 'google', 4.9, 28),
  ('00000000-0000-0000-0000-000000000001', 'yelp', 5.0, 12),
  ('00000000-0000-0000-0000-000000000001', 'facebook', 4.8, 7),
  -- Maria Rodriguez
  ('00000000-0000-0000-0000-000000000002', 'google', 4.8, 19),
  ('00000000-0000-0000-0000-000000000002', 'yelp', 4.9, 12),
  -- Jennifer Walsh
  ('00000000-0000-0000-0000-000000000003', 'google', 4.9, 38),
  ('00000000-0000-0000-0000-000000000003', 'yelp', 5.0, 15),
  ('00000000-0000-0000-0000-000000000003', 'facebook', 4.8, 10),
  -- Aisha Johnson
  ('00000000-0000-0000-0000-000000000004', 'google', 4.9, 14),
  ('00000000-0000-0000-0000-000000000004', 'yelp', 5.0, 4);
  -- Dr. Emily Park has no ratings (tests empty state)

-- ============================================================
-- Re-enable RLS
-- ============================================================
alter table public.providers enable row level security;
alter table public.provider_education enable row level security;
alter table public.provider_reviews enable row level security;
alter table public.provider_ratings enable row level security;
