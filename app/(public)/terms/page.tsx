import { Container } from "@/components/ui";

const sections = [
  {
    title: "What Homebirth.com is",
    body: `Homebirth.com is a matching platform that connects expectant parents with out-of-hospital birth providers — including midwives and birth centers. We help you find and evaluate providers; we are not a healthcare provider ourselves and we do not offer medical advice.`,
  },
  {
    title: "Your relationship with providers",
    body: `Any relationship formed with a provider through Homebirth.com is between you and that provider directly. We do not employ, endorse, or guarantee the quality of any provider listed on the platform. You are responsible for independently verifying a provider's credentials, licensure, and suitability for your needs.

Provider profiles may include information supplied by providers themselves. We make reasonable efforts to verify credentials but cannot guarantee accuracy.`,
  },
  {
    title: "Not medical advice",
    body: `Nothing on Homebirth.com — including intake questions, match results, resource content, or question libraries — constitutes medical advice. Decisions about your birth setting and care provider should be made in consultation with qualified healthcare professionals.

If you have a medical emergency, call 911.`,
  },
  {
    title: "Account responsibilities",
    body: `You are responsible for maintaining the security of your account credentials. You must provide accurate information when creating an account and keep it up to date. You may not use another person's account or create accounts for the purpose of abuse or misrepresentation.`,
  },
  {
    title: "Acceptable use",
    body: `You may not use Homebirth.com to harass, impersonate, or harm other users or providers. You may not attempt to reverse-engineer, scrape, or interfere with the platform. We reserve the right to suspend or terminate accounts that violate these terms.`,
  },
  {
    title: "Provider listings",
    body: `Providers listed on Homebirth.com have agreed to our provider terms. Listing on the platform does not constitute endorsement. We reserve the right to remove any provider listing at our discretion, particularly where safety concerns arise.`,
  },
  {
    title: "Intellectual property",
    body: `The content, design, and code of Homebirth.com are owned by us or licensed to us. You may not reproduce, distribute, or create derivative works without written permission. Your account data is yours — we do not claim ownership over information you provide.`,
  },
  {
    title: "Limitation of liability",
    body: `Homebirth.com is provided as-is. To the extent permitted by law, we are not liable for any indirect, incidental, or consequential damages arising from your use of the platform, including outcomes related to birth providers you connect with through our service.`,
  },
  {
    title: "Changes to these terms",
    body: `We may update these terms as the platform evolves. We'll notify you of significant changes by email. Continued use after changes take effect constitutes acceptance. If you disagree with updated terms, you may close your account.`,
  },
  {
    title: "Contact",
    body: `Questions about these terms? Email us at legal@homebirth.com.`,
  },
];

export const metadata = {
  title: "Terms of Service — Homebirth.com",
  description: "The terms governing use of the Homebirth.com platform.",
};

export default function TermsPage() {
  return (
    <section className="py-16">
      <Container className="max-w-2xl">
        <div className="mb-10">
          <p className="text-sm font-medium text-primary">Legal</p>
          <h1 className="mt-2 text-[2rem] font-semibold tracking-[-0.015em] text-heading">
            Terms of Service
          </h1>
          <p className="mt-3 text-sm text-muted">Last updated: March 2026</p>
          <p className="mt-4 text-muted">
            Plain-language terms for using Homebirth.com. Please read them — they matter.
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