"use client";

import { useRef, useState } from "react";
import { FadeUp } from "@/components/fade-up";

const ABOUT_OPTIONS = [
  "Fired or demoted",
  "Harassment",
  "Discrimination",
  "Severance agreement",
  "Unpaid wages or overtime",
  "Retaliation after complaining",
  "Not sure",
];

const FILED_OPTIONS = [
  "Nothing yet",
  "I've signed something",
  "I've filed with EEOC or the Division of Human Rights",
  "There's a deadline soon",
];

// Not specified in copy.md — placeholder convention, flagged to the client.
const TIME_OPTIONS = ["Morning", "Afternoon", "Evening", "Anytime"];

const FIELD_CLASSES =
  "w-full border-b border-ink/40 bg-transparent py-2 text-body focus-visible:border-ink";

export function Contact() {
  const fieldsRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{
    name?: boolean;
    phone?: boolean;
    about?: boolean;
  }>({});

  // onClick, not a <form> onSubmit — this is a concept build with no
  // backend to post to, per the brief. Client-side validation only.
  const handleSend = () => {
    const container = fieldsRef.current;
    if (!container) return;

    const name = container.querySelector<HTMLInputElement>('[name="name"]');
    const phone = container.querySelector<HTMLInputElement>('[name="phone"]');
    const about = container.querySelector<HTMLSelectElement>('[name="about"]');

    const nameValid = !!name?.value.trim();
    const phoneValid = (phone?.value ?? "").replace(/\D/g, "").length === 10;
    const aboutValid = !!about?.value;

    const nextErrors = {
      name: !nameValid,
      phone: !phoneValid,
      about: !aboutValid,
    };
    setErrors(nextErrors);

    if (nameValid && phoneValid && aboutValid) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <section
        id="contact"
        className="bg-brass px-6 py-24 text-ink md:px-16"
      >
        <div className="mx-auto max-w-2xl">
          <FadeUp>
            <p className="text-display-md">
              Got it. Someone will call you within one business day. If
              there&apos;s a deadline inside the next two weeks, call{" "}
              <a href="tel:+12125550164" className="underline">
                (212) 555-0164
              </a>{" "}
              now rather than waiting on this.
            </p>
          </FadeUp>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="bg-brass px-6 py-24 text-ink md:px-16">
      <div className="mx-auto max-w-3xl">
        <FadeUp>
          <h2 className="text-display-lg mb-6">Tell us what happened.</h2>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="text-body-lg mb-14 max-w-2xl">
            Twenty minutes, free, with a lawyer rather than an intake
            screener. If you&apos;re near a deadline, say so in the first
            line and we&apos;ll call you the same day.
          </p>
        </FadeUp>

        <div ref={fieldsRef} className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <label htmlFor="contact-name" className="text-label mb-2 block">
              Your name
            </label>
            <input id="contact-name" name="name" type="text" className={FIELD_CLASSES} />
            {errors.name && (
              <p className="text-label mt-2 text-ink">
                We need a name to call you by.
              </p>
            )}
          </div>

          <div>
            <label htmlFor="contact-phone" className="text-label mb-2 block">
              Phone
            </label>
            <input id="contact-phone" name="phone" type="tel" className={FIELD_CLASSES} />
            {errors.phone && (
              <p className="text-label mt-2 text-ink">
                Ten digits with area code.
              </p>
            )}
          </div>

          <div>
            <label htmlFor="contact-email" className="text-label mb-2 block">
              Email
            </label>
            <input id="contact-email" name="email" type="email" className={FIELD_CLASSES} />
          </div>

          <div>
            <label htmlFor="contact-time" className="text-label mb-2 block">
              Best time to reach you
            </label>
            <select id="contact-time" name="time" className={FIELD_CLASSES}>
              <option value=""></option>
              {TIME_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="contact-about" className="text-label mb-2 block">
              What&apos;s this about?
            </label>
            <select id="contact-about" name="about" className={FIELD_CLASSES}>
              <option value=""></option>
              {ABOUT_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.about && (
              <p className="text-label mt-2 text-ink">
                Even a rough category helps us route this.
              </p>
            )}
          </div>

          <div>
            <label htmlFor="contact-filed" className="text-label mb-2 block">
              Has anything been filed or signed?
            </label>
            <select id="contact-filed" name="filed" className={FIELD_CLASSES}>
              <option value=""></option>
              {FILED_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="contact-message" className="text-label mb-2 block">
              What happened: as much or as little as you like
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              className={FIELD_CLASSES}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleSend}
          className="text-label mt-10 bg-ink px-8 py-4 text-paper focus-visible:outline-offset-4"
        >
          Send
        </button>

        <FadeUp>
          <p className="text-body mt-10 max-w-2xl">
            We reply within one business day. Sending this doesn&apos;t
            create an attorney-client relationship and it isn&apos;t
            confidential until we&apos;ve agreed to act for you, so
            don&apos;t include anything you wouldn&apos;t want read by
            someone who isn&apos;t yet your lawyer.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
