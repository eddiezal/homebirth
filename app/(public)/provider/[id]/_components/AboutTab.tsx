import { Badge } from "@/components/ui";
import type { ProviderProfile } from "@/lib/types/provider";

interface AboutTabProps {
  provider: ProviderProfile;
}

export function AboutTab({ provider }: AboutTabProps) {
  return (
    <div className="flex flex-col gap-8">
      {/* Philosophy */}
      <section>
        <h3 className="text-sm font-semibold text-heading">Philosophy</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {provider.philosophy}
        </p>
      </section>

      {/* Specialties */}
      {provider.specialties.length > 0 && (
        <section>
          <h3 className="text-sm font-semibold text-heading">Specialties</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {provider.specialties.map((s) => (
              <Badge key={s} variant="teal">
                {s}
              </Badge>
            ))}
          </div>
        </section>
      )}

      {/* Birth settings */}
      <section>
        <h3 className="text-sm font-semibold text-heading">Birth settings</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {provider.birthSettings.map((setting) => (
            <span
              key={setting}
              className="inline-flex items-center gap-1.5 rounded-full border border-card-border px-3 py-1 text-xs font-medium text-heading"
            >
              <svg
                className="h-3.5 w-3.5 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              {setting}
            </span>
          ))}
        </div>
      </section>

      {/* Scope of care */}
      {provider.scope.length > 0 && (
        <section>
          <h3 className="text-sm font-semibold text-heading">
            Scope of care
          </h3>
          <ul className="mt-2 flex flex-col gap-1.5">
            {provider.scope.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm">
                <svg
                  className="h-4 w-4 shrink-0 text-primary"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-heading">{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Transfer plan */}
      <section>
        <h3 className="text-sm font-semibold text-heading">
          Transfer plan & hospital relationships
        </h3>
        <div className="mt-2 rounded-[12px] border border-card-border p-4">
          <p className="text-sm leading-relaxed text-muted">
            {provider.transferPlan}
          </p>
        </div>
      </section>

      {/* Communication style */}
      {provider.communicationTags.length > 0 && (
        <section>
          <h3 className="text-sm font-semibold text-heading">
            Communication style
          </h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {provider.communicationTags.map((tag) => (
              <Badge key={tag} variant="gray">
                {tag}
              </Badge>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      <section>
        <h3 className="text-sm font-semibold text-heading">Languages</h3>
        <p className="mt-2 text-sm text-muted">
          {provider.languages.join(", ")}
        </p>
      </section>

      {/* Education */}
      {provider.education.length > 0 && (
        <section>
          <h3 className="text-sm font-semibold text-heading">
            Education & certifications
          </h3>
          <ul className="mt-2 flex flex-col gap-2">
            {provider.education.map((edu, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-muted"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342"
                  />
                </svg>
                <div>
                  <p className="font-medium text-heading">{edu.degree}</p>
                  <p className="text-muted">
                    {edu.institution} · {edu.year}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Verification details */}
      <section>
        <h3 className="text-sm font-semibold text-heading">
          Verification status
        </h3>
        <div className="mt-2 flex flex-col gap-2">
          {provider.verifications.map((v) => (
            <div
              key={v.type}
              className="flex items-start gap-2 rounded-[8px] border border-card-border p-3"
            >
              <svg
                className={`mt-0.5 h-4 w-4 shrink-0 ${
                  v.verified ? "text-primary" : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p
                  className={`text-sm font-medium ${
                    v.verified ? "text-heading" : "text-muted"
                  }`}
                >
                  {v.type === "identity" && "Identity verified"}
                  {v.type === "license" && "License verified"}
                  {v.type === "practice" && "Practice verified"}
                  {!v.verified && " — pending"}
                </p>
                {v.verified && v.detail && (
                  <p className="text-xs text-muted">{v.detail}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
