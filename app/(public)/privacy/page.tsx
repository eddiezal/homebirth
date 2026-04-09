import { Container } from "@/components/ui";

const sections = [
  {
    title: "Information we collect",
    body: `When you use Homebirth.com, we collect information you provide directly — such as your name, email address, zip code, and responses to intake questions. We also collect usage data such as pages visited and actions taken, to improve the experience.

We do not sell your personal information to third parties. Ever.`,
  },
  {
    title: "How we use your information",
    body: `We use your information to match you with relevant providers, personalize your experience, and communicate with you about your account and matches. We may use aggregate, anonymized data to improve our matching quality and understand how parents use the platform.

We will never share your personal details with a provider without your explicit consent.`,
  },
  {
    title: "Information shared with providers",
    body: `When you request a consultation with a provider, we share the intake information you've provided — including your preferences, due date, and location — with that provider specifically. You control who receives your information by choosing which consult requests to submit.`,
  },
  {
    title: "Cookies and tracking",
    body: `We use cookies and similar technologies to keep you logged in, remember your preferences, and understand how the site is used. You can disable cookies in your browser settings, though some features may not work correctly as a result.`,
  },
  {
    title: "Data retention",
    body: `We retain your account data for as long as your account is active. You may request deletion of your data at any time by contacting us at privacy@homebirth.com. We will delete your personal information within 30 days of a verified request.`,
  },
  {
    title: "Security",
    body: `We use industry-standard security practices to protect your information, including encrypted connections (HTTPS) and access controls. No system is perfectly secure — if you have concerns about a specific data security issue, please contact us.`,
  },
  {
    title: "Children's privacy",
    body: `Homebirth.com is intended for adults. We do not knowingly collect personal information from anyone under 18. If you believe we have collected information from a minor, please contact us immediately.`,
  },
  {
    title: "Changes to this policy",
    body: `We may update this policy from time to time. When we do, we'll update the date at the bottom of this page and, for significant changes, notify you by email. Continued use of the platform after changes take effect constitutes acceptance of the updated policy.`,
  },
  {
    title: "Contact",
    body: `Questions about this policy or your data? Reach us at privacy@homebirth.com. We aim to respond to all privacy inquiries within 5 business days.`,
  },
];

export const metadata = {
  title: "Privacy Policy — Homebirth.com",
  description: "How Homebirth.com collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <section className="py-16">
      <Container className="max-w-2xl">
        <div className="mb-10">
          <p className="text-sm font-medium text-primary">Legal</p>
          <h1 className="mt-2 text-[2rem] font-semibold tracking-[-0.015em] text-heading">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-muted">Last updated: March 2026</p>
          <p className="mt-4 text-muted">
            Homebirth.com is built on trust. This policy explains plainly what data we collect,
            why we collect it, and how we keep it safe.
          </p>
        </div>

        <div className="flex flex-col gap-10">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="mb-3 text-lg font-semibold text-heading">{section.title}</h2>
              {section.body.split("\n\n").map((para, i) => (
                <p key={i} className="mb-3 text-sm leading-relaxed text-muted last:mb-0">
                  {para}
                </p>
              ))}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}