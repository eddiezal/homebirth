/**
 * "Questions to Ask" — consult prep checklist
 *
 * These are NOT intake questions (see intake-questions.ts).
 * Intake questions power the matching algorithm.
 * These questions help parents prepare for provider consultations.
 *
 * Used on:
 *  - Homepage QuestionsToAsk section (6 featured bubbles)
 *  - /questions page (full checklist builder)
 *  - Confirmation page (consult prep preview)
 *  - Parent dashboard sidebar (saved checklist)
 */

export type QuestionCategory =
  | "safety"
  | "experience"
  | "care-style"
  | "communication"
  | "cost"
  | "postpartum";

export interface Question {
  id: string;
  category: QuestionCategory;
  question: string;
  whyItMatters: string;
  /** One per category — the minimum viable question for a consult */
  mustAsk: boolean;
  /** If true, this question is featured on the homepage bubbles */
  featured?: boolean;
  /** Homepage bubble alignment (only relevant for featured questions) */
  featuredAlign?: "left" | "right";
  /** Homepage bubble max-width class (only relevant for featured questions) */
  featuredMaxW?: string;
}

export interface QuestionCategoryMeta {
  id: QuestionCategory;
  label: string;
  description: string;
  color: { bg: string; text: string };
  /** Short label used on homepage bubble tags */
  shortLabel: string;
}

export const categories: QuestionCategoryMeta[] = [
  {
    id: "safety",
    label: "Safety & transfers",
    description:
      "What happens when things don't go as planned — and how prepared your provider is for those moments.",
    color: { bg: "bg-[#fce8d5]", text: "text-[#b87a4a]" },
    shortLabel: "Safety",
  },
  {
    id: "experience",
    label: "Experience & credentials",
    description:
      "Understanding who your provider is, what they've seen, and how they've trained.",
    color: { bg: "bg-primary-lighter", text: "text-primary" },
    shortLabel: "Trust",
  },
  {
    id: "care-style",
    label: "Care style & philosophy",
    description:
      "How your provider approaches birth — and whether that approach aligns with yours.",
    color: { bg: "bg-[#e8f2e0]", text: "text-[#5a8a4a]" },
    shortLabel: "Values",
  },
  {
    id: "communication",
    label: "Communication",
    description:
      "How you'll stay connected between visits — and how your provider handles the unexpected 2 a.m. question.",
    color: { bg: "bg-primary-lighter", text: "text-primary" },
    shortLabel: "Comms",
  },
  {
    id: "cost",
    label: "Cost & logistics",
    description:
      "The money stuff — what's included, what's not, and how to avoid surprise bills.",
    color: { bg: "bg-[#fce8d5]", text: "text-[#b87a4a]" },
    shortLabel: "Budget",
  },
  {
    id: "postpartum",
    label: "Postpartum support",
    description:
      "What happens after the birth — because the first weeks matter as much as labor day.",
    color: { bg: "bg-[#fde4ec]", text: "text-[#b05a78]" },
    shortLabel: "Care",
  },
];

export const questions: Question[] = [
  // ─── Safety & transfers (6) ─────────────────────────────────
  {
    id: "safety-transfer-plan",
    category: "safety",
    question: "What's your plan if something unexpected happens?",
    whyItMatters:
      "This is the question that matters most — and the answer should make you feel calmer, not more anxious. A great midwife will walk you through exactly which hospital, how far away it is, and what would trigger a transfer. You should leave this conversation feeling more prepared, not less.",
    mustAsk: true,
    featured: true,
    featuredAlign: "left",
    featuredMaxW: "max-w-[340px]",
  },
  {
    id: "safety-hospital-relationship",
    category: "safety",
    question: "Which hospital would we transfer to, and do you have a relationship there?",
    whyItMatters:
      "If you ever need to go to the hospital, the last thing you want is your midwife and the on-call OB meeting for the first time over your bed. A provider who already has a relationship there means a smoother handoff — and someone advocating for you on both sides.",
    mustAsk: false,
  },
  {
    id: "safety-transfer-rate",
    category: "safety",
    question: "What's your transfer rate, and what are the most common reasons?",
    whyItMatters:
      "A number by itself doesn't mean much — a 10% rate could be cautious and reassuring or it could mean something else entirely. What matters is why transfers happen and how she talks about them. You're listening for someone who sees a transfer as good care, not a failure.",
    mustAsk: false,
  },
  {
    id: "safety-equipment",
    category: "safety",
    question: "What emergency equipment do you bring to a birth?",
    whyItMatters:
      "You don't need to know every item — but you should feel confident she comes prepared. Oxygen, IV supplies, and anti-hemorrhage meds are standard. If she walks you through her kit with confidence and calm, that tells you a lot about how she'll handle the unexpected.",
    mustAsk: false,
  },
  {
    id: "safety-backup-provider",
    category: "safety",
    question: "Who's your backup if you can't make it to my birth?",
    whyItMatters:
      "Babies come on their own schedule, and sometimes your midwife is already at another birth or out sick. You deserve to know who would walk through your door instead — and ideally, you'll have met her before that moment. Ask if you can schedule a visit with the backup too.",
    mustAsk: false,
  },
  {
    id: "safety-risking-out",
    category: "safety",
    question: "Under what circumstances would you recommend I deliver in a hospital instead?",
    whyItMatters:
      "This question is really about honesty. A midwife who can clearly name the situations where home birth isn't the safest choice is one who puts your safety above ego. That kind of transparency is exactly what you want in the person delivering your baby.",
    mustAsk: false,
  },

  // ─── Experience & credentials (5) ──────────────────────────
  {
    id: "experience-birth-count",
    category: "experience",
    question: "How many home births have you attended?",
    whyItMatters:
      "The number alone doesn't tell the full story — but the way she talks about it does. Ask what role she played, what kinds of births she's seen, and what she's learned along the way. You're looking for experience and humility together.",
    mustAsk: true,
    featured: true,
    featuredAlign: "right",
    featuredMaxW: "max-w-[310px]",
  },
  {
    id: "experience-credentials",
    category: "experience",
    question: "What are your credentials, and where did you train?",
    whyItMatters:
      "CNM, CPM, LM — the alphabet soup can be confusing, and honestly, no one path is automatically better than another. But you should understand what her letters mean, how she trained, and what clinical experience she had along the way. If she's proud of her training, she'll love this question.",
    mustAsk: false,
  },
  {
    id: "experience-continuing-ed",
    category: "experience",
    question: "How do you stay current — any recent trainings or certifications?",
    whyItMatters:
      "What we know about birth keeps evolving, and the best midwives evolve with it. You're looking for someone who lights up talking about a workshop she just took or a new technique she's been practicing — not someone who stopped learning after certification.",
    mustAsk: false,
  },
  {
    id: "experience-specialties",
    category: "experience",
    question: "Do you have experience with births like mine? (VBAC, twins, breech, etc.)",
    whyItMatters:
      "If your birth has a specific wrinkle — VBAC, breech, twins — general experience isn't enough. You want someone who's been in that specific situation enough times that it feels routine to her, even if it doesn't feel routine to you. Ask for numbers, not just reassurance.",
    mustAsk: false,
  },
  {
    id: "experience-complications",
    category: "experience",
    question: "Can you tell me about a time something didn't go as planned?",
    whyItMatters:
      "This is the question that separates good midwives from great ones. You're not looking for a perfect track record — you're looking for someone who can sit with you in honesty about a hard moment and show you what she learned from it. If she gets defensive or vague, pay attention to that.",
    mustAsk: false,
  },

  // ─── Care style & philosophy (5) ───────────────────────────
  {
    id: "care-shared-decisions",
    category: "care-style",
    question: "How do you handle shared decision-making?",
    whyItMatters:
      "This is really the question behind every other question: will she listen to you? Will she respect what you want even when she might do it differently? Pay attention to whether she talks about birth as something you do together — or something she manages for you.",
    mustAsk: true,
    featured: true,
    featuredAlign: "left",
    featuredMaxW: "max-w-[330px]",
  },
  {
    id: "care-birth-philosophy",
    category: "care-style",
    question: "How would you describe your birth philosophy in a few sentences?",
    whyItMatters:
      "There's no right answer here — but there is a right answer for you. Some midwives sit back and trust your body to lead. Others are more hands-on and clinically present. Listen for which approach makes your shoulders drop and your breathing slow down. That's your person.",
    mustAsk: false,
  },
  {
    id: "care-interventions",
    category: "care-style",
    question: "What does 'intervention' mean to you, and when would you suggest one?",
    whyItMatters:
      "The word 'intervention' means wildly different things to different providers. For some it's breaking the amniotic sac, for others it's even checking the fetal heart rate. Understanding where her line is helps you know what labor will actually feel like with her in the room.",
    mustAsk: false,
  },
  {
    id: "care-partner-role",
    category: "care-style",
    question: "How do you involve my partner or support person during labor?",
    whyItMatters:
      "Your partner might want to catch the baby, or they might want to stand in the corner and breathe. Either is fine — but your midwife needs to meet them where they are. Ask how she's worked with partners before, and whether she'll guide them or give them space. This one matters more than people think.",
    mustAsk: false,
  },
  {
    id: "care-birth-plan",
    category: "care-style",
    question: "How do you feel about birth plans — and what happens if things change?",
    whyItMatters:
      "You want someone who takes your birth plan seriously without treating it like a contract. If she rolls her eyes and says 'plans never work out,' that's a red flag. If she says 'we'll follow it to the letter no matter what,' that's a different red flag. Look for the midwife who says 'let's build it together and stay flexible.'",
    mustAsk: false,
  },

  // ─── Communication (4) ─────────────────────────────────────
  {
    id: "comms-between-visits",
    category: "communication",
    question: "How do you communicate between visits?",
    whyItMatters:
      "At 11 p.m. when you're worried about something, the last thing you want is uncertainty about whether you can reach her. Some midwives are a quick text away, others prefer a portal. Neither is wrong — but knowing which one she is avoids a lot of third-trimester stress.",
    mustAsk: true,
    featured: true,
    featuredAlign: "right",
    featuredMaxW: "max-w-[320px]",
  },
  {
    id: "comms-after-hours",
    category: "communication",
    question: "What's your availability for questions outside office hours?",
    whyItMatters:
      "Pregnancy doesn't keep business hours. When it's 2 a.m. and something feels different, you don't want to be googling 'is this normal' — you want to know exactly how to reach her. Some midwives have a dedicated on-call line, others give you their cell. Either works, as long as you know the plan.",
    mustAsk: false,
  },
  {
    id: "comms-prenatal-visits",
    category: "communication",
    question: "How often will we meet prenatally, and how long are visits?",
    whyItMatters:
      "One of the best things about midwifery care is that visits aren't rushed — you might get 45 minutes to an hour instead of the 7-minute OB appointment. But every practice is different. Ask how often you'll meet, where the visits happen, and what a typical appointment actually looks like. You might be surprised how much you look forward to them.",
    mustAsk: false,
  },
  {
    id: "comms-labor-availability",
    category: "communication",
    question: "When do I call you in labor, and how quickly can you get to me?",
    whyItMatters:
      "When the moment comes, you don't want to be wondering 'should I call now or wait?' Get the specifics — what should the contractions feel like, how far apart, and how long it takes her to get to your door. Having a clear plan makes early labor so much calmer.",
    mustAsk: false,
  },

  // ─── Cost & logistics (5) ──────────────────────────────────
  {
    id: "cost-fee-included",
    category: "cost",
    question: "What's included in your fee?",
    whyItMatters:
      "Two midwives can quote the same number and mean completely different things. One might include everything from prenatal visits to the birth kit to six weeks of postpartum care. Another might charge separately for each. Don't compare prices — compare what you're actually getting.",
    mustAsk: true,
    featured: true,
    featuredAlign: "left",
    featuredMaxW: "max-w-[260px]",
  },
  {
    id: "cost-payment-plans",
    category: "cost",
    question: "Do you offer payment plans or sliding scale?",
    whyItMatters:
      "Here's a secret: most midwives are more flexible on payment than their website suggests. Monthly installments, sliding scale, creative deposit structures — these are common, but you almost always have to ask first. Don't let the sticker price scare you off before you've had this conversation.",
    mustAsk: false,
  },
  {
    id: "cost-insurance",
    category: "cost",
    question: "Do you bill insurance, and which plans do you accept?",
    whyItMatters:
      "Insurance coverage for home birth is getting better, but it's still a patchwork. Some midwives handle billing for you, others hand you a superbill and you fight the insurance company yourself. That difference can mean thousands of dollars and a lot of phone calls — so nail this down early.",
    mustAsk: false,
  },
  {
    id: "cost-additional-fees",
    category: "cost",
    question: "Are there any additional costs I should plan for?",
    whyItMatters:
      "The birth kit, lab work, ultrasound referrals, the newborn exam — these can add up and they're not always included in the quoted fee. A midwife who proactively walks you through the full financial picture without you having to pull it out of her is telling you something good about how she communicates.",
    mustAsk: false,
  },
  {
    id: "cost-cancellation",
    category: "cost",
    question: "What's your cancellation or transfer policy if my plans change?",
    whyItMatters:
      "Nobody plans to change plans — but life happens. You might move, develop a complication, or simply change your mind. Asking about the refund policy now, when everything feels good, saves you from a really uncomfortable conversation later when emotions are already running high.",
    mustAsk: false,
  },

  // ─── Postpartum support (4) ────────────────────────────────
  {
    id: "postpartum-week-one",
    category: "postpartum",
    question: "What does postpartum look like in week one?",
    whyItMatters:
      "Everyone focuses on the birth — but the first week after is when you'll need support the most. Will she come to your home? Check on the baby? Help with breastfeeding at 3 a.m.? This is where great midwifery care really shows, and it's the part most people forget to ask about.",
    mustAsk: true,
    featured: true,
    featuredAlign: "right",
    featuredMaxW: "max-w-[340px]",
  },
  {
    id: "postpartum-visit-count",
    category: "postpartum",
    question: "How many postpartum visits are included, and when do they happen?",
    whyItMatters:
      "The timing matters as much as the number. A visit at 24 hours catches things a visit at 6 weeks never will — jaundice, feeding issues, early signs of infection. Ask not just how many visits, but when they happen. The first 72 hours and the first two weeks are where the most important check-ins land.",
    mustAsk: false,
  },
  {
    id: "postpartum-lactation",
    category: "postpartum",
    question: "Do you provide lactation support, or would I need a separate consultant?",
    whyItMatters:
      "Breastfeeding can be beautiful and also really, really hard — especially in the first two weeks when you're exhausted and everything is new. If your midwife can help with latch and supply during her postpartum visits, that's one less specialist to find, schedule, and pay for during the most overwhelming stretch of your life.",
    mustAsk: false,
  },
  {
    id: "postpartum-newborn-care",
    category: "postpartum",
    question: "What newborn screenings and exams do you perform?",
    whyItMatters:
      "Your baby will need certain screenings in the first few days — the newborn exam, metabolic screening, hearing test. Some midwives handle all of it right there in your home. Others do the exam but refer out for the rest. Knowing what's covered means one less thing to figure out in those bleary first days.",
    mustAsk: false,
  },
];

/** Questions featured on the homepage bubbles (in display order) */
export const featuredQuestions = questions.filter((q) => q.featured);

/** Get all questions for a given category */
export function getQuestionsByCategory(category: QuestionCategory): Question[] {
  return questions.filter((q) => q.category === category);
}

/** Get the "must ask" question for a category */
export function getMustAskQuestion(
  category: QuestionCategory,
): Question | undefined {
  return questions.find((q) => q.category === category && q.mustAsk);
}

/** Category metadata lookup */
export function getCategoryMeta(
  category: QuestionCategory,
): QuestionCategoryMeta | undefined {
  return categories.find((c) => c.id === category);
}
