import { PageContainer } from "@/components/structure/PageContainer";
import { PaddingContainer } from "@/components/structure/PaddingContainer";

export default function CancellationPolicyPage() {
  const lastUpdated = "February 11, 2026";

  return (
    <PageContainer showFooter={true} showNavigation={true}>
      <PaddingContainer size="small">
        <div className="flex flex-col w-full max-w-4xl mx-auto py-12 md:py-20 gap-10 text-foreground">
          <header className="flex flex-col gap-4">
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary">
              Cancellation Policy
            </h1>
            <p className="text-sm text-muted-foreground">
              Last Updated: {lastUpdated}
            </p>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              At Lumière Dining, we understand that plans may change. This
              Cancellation Policy outlines the terms and conditions applicable
              to the cancellation of reservations, orders, and subscriptions
              made through our Platform. By using our Services, you agree to
              this policy in full.
            </p>
          </header>

          <section className="flex flex-col gap-3">
            <h2 className="font-serif text-xl md:text-2xl">
              1. Reservation Cancellations (Book a Table)
            </h2>
            <div className="flex flex-col gap-4 text-sm md:text-base leading-relaxed text-muted-foreground">
              <div className="flex flex-col gap-2">
                <h3 className="font-sans font-semibold text-foreground">
                  1.1 Free Cancellation Window
                </h3>
                <p>
                  You may cancel or modify your reservation free of charge up to
                  twenty-four (24) hours before your scheduled reservation time.
                  Cancellations may be made through your Account under your
                  reservations, or by contacting us via the Contact Us page. A
                  confirmation of your cancellation will be sent to your
                  registered email address through our email system.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-sans font-semibold text-foreground">
                  1.2 Late Cancellations
                </h3>
                <p>
                  Cancellations made less than twenty-four (24) hours but more
                  than two (2) hours before the scheduled reservation time are
                  considered late cancellations. A late cancellation fee may
                  apply, the amount of which will be communicated at the time of
                  booking. This fee will be charged to the Payment Method
                  associated with your reservation.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-sans font-semibold text-foreground">
                  1.3 No-Shows
                </h3>
                <p>
                  If you fail to arrive within thirty (30) minutes of your
                  reserved time without prior cancellation or notification, this
                  will be treated as a no-show. A no-show fee equivalent to the
                  full pre-authorization amount or a fixed fee (as communicated
                  during booking) may be charged to your Payment Method.
                  Repeated no-shows may result in restrictions on your ability
                  to make future reservations through the Platform.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-sans font-semibold text-foreground">
                  1.4 Group & Special Event Reservations
                </h3>
                <p>
                  Reservations for parties of eight (8) or more, or for special
                  events, may require a non-refundable deposit at the time of
                  booking. Cancellation terms for group and event bookings will
                  be communicated at the time of reservation and confirmed via
                  email. Cancellations for group bookings must be made at least
                  seventy-two (72) hours in advance to be eligible for a deposit
                  refund, minus any applicable administrative fees.
                </p>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-serif text-xl md:text-2xl">
              2. Order Cancellations (My Cart & Checkout)
            </h2>
            <div className="flex flex-col gap-4 text-sm md:text-base leading-relaxed text-muted-foreground">
              <div className="flex flex-col gap-2">
                <h3 className="font-sans font-semibold text-foreground">
                  2.1 Pre-Confirmation Cancellation
                </h3>
                <p>
                  You may freely remove items from My Cart or abandon your cart
                  at any time before completing Checkout. No charges will be
                  applied for items not purchased.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-sans font-semibold text-foreground">
                  2.2 Post-Confirmation Cancellation
                </h3>
                <p>
                  Once an order has been confirmed through Checkout and a
                  confirmation email has been sent, cancellation requests must
                  be submitted promptly via the Contact Us page. Orders may be
                  cancelled without charge if the request is received before
                  preparation of your order has begun. If preparation has
                  already commenced, we may not be able to cancel the order, and
                  a partial or no refund may apply at our discretion.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-sans font-semibold text-foreground">
                  2.3 Refund Processing
                </h3>
                <p>
                  Approved refunds will be processed to the original Payment
                  Method used during Checkout. Refunds may take five (5) to
                  fourteen (14) business days to appear on your statement,
                  depending on your payment provider and financial institution.
                  We are not responsible for any delays caused by third-party
                  payment processors.
                </p>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-serif text-xl md:text-2xl">
              3. Newsletter Subscription Cancellation
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              You may unsubscribe from our Newsletter at any time by clicking
              the unsubscribe link included in every marketing email, or by
              managing your preferences in the Newsletter Subscription section
              of your Account settings. Unsubscription requests are processed
              immediately, though you may receive emails that were already
              queued prior to your request. Unsubscribing from the Newsletter
              does not delete your Account or affect your ability to use other
              Services such as Book a Table, My Cart, or Wishlist.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-serif text-xl md:text-2xl">
              4. Account Cancellation & Deletion
            </h2>
            <div className="flex flex-col gap-4 text-sm md:text-base leading-relaxed text-muted-foreground">
              <div className="flex flex-col gap-2">
                <h3 className="font-sans font-semibold text-foreground">
                  4.1 Voluntary Account Deletion
                </h3>
                <p>
                  You may request the deletion of your Account at any time
                  through your Account settings or by contacting us via the
                  Contact Us page. Upon deletion, your Wishlist, saved Payment
                  Methods, reservation history, and Newsletter Subscription will
                  be permanently removed. Active reservations and pending orders
                  must be cancelled or fulfilled before Account deletion can be
                  completed.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-sans font-semibold text-foreground">
                  4.2 Data Retention
                </h3>
                <p>
                  In accordance with applicable data protection laws including
                  the GDPR, CCPA, UK Data Protection Act 2018, and Brazil&apos;s
                  LGPD, we may retain certain data for a limited period after
                  Account deletion as required by law for tax, legal, or
                  regulatory purposes. All retained data will be handled in
                  accordance with our Privacy Policy.
                </p>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-serif text-xl md:text-2xl">
              5. Cancellations by Lumière Dining
            </h2>
            <div className="flex flex-col gap-4 text-sm md:text-base leading-relaxed text-muted-foreground">
              <div className="flex flex-col gap-2">
                <h3 className="font-sans font-semibold text-foreground">
                  5.1 Reservation Cancellations by Us
                </h3>
                <p>
                  We reserve the right to cancel reservations due to unforeseen
                  circumstances including but not limited to force majeure
                  events, emergency closures, maintenance, or staffing
                  shortages. In such cases, you will be notified as soon as
                  reasonably practicable via email and offered the option to
                  reschedule or receive a full refund of any pre-paid amounts or
                  deposits.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-sans font-semibold text-foreground">
                  5.2 Order Cancellations by Us
                </h3>
                <p>
                  We may cancel an order after confirmation if items become
                  unavailable, a pricing error is identified, or we detect
                  suspected fraudulent activity. You will be notified via email,
                  and a full refund will be issued to your original Payment
                  Method.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-sans font-semibold text-foreground">
                  5.3 Account Suspension or Termination by Us
                </h3>
                <p>
                  We reserve the right to suspend or terminate your Account if
                  you violate our Terms of Service, engage in fraudulent
                  activity, repeatedly fail to honour reservations (no-shows),
                  or abuse any feature of the Platform including the Contact Us
                  or email communication systems. We will provide notice of
                  suspension or termination via email where reasonably possible.
                </p>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-serif text-xl md:text-2xl">
              6. Refund Policy Summary
            </h2>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm md:text-base text-left">
                <thead>
                  <tr className="bg-secondary">
                    <th className="px-4 py-3 font-semibold text-foreground">
                      Scenario
                    </th>
                    <th className="px-4 py-3 font-semibold text-foreground">
                      Refund
                    </th>
                    <th className="px-4 py-3 font-semibold text-foreground">
                      Timeframe
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-t border-border">
                    <td className="px-4 py-3">
                      Reservation cancelled 24+ hours before
                    </td>
                    <td className="px-4 py-3">Full refund</td>
                    <td className="px-4 py-3">5–14 business days</td>
                  </tr>
                  <tr className="border-t border-border bg-secondary/50">
                    <td className="px-4 py-3">
                      Reservation cancelled 2–24 hours before
                    </td>
                    <td className="px-4 py-3">
                      Partial refund (minus late fee)
                    </td>
                    <td className="px-4 py-3">5–14 business days</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-4 py-3">No-show</td>
                    <td className="px-4 py-3">No refund</td>
                    <td className="px-4 py-3">N/A</td>
                  </tr>
                  <tr className="border-t border-border bg-secondary/50">
                    <td className="px-4 py-3">
                      Order cancelled before preparation
                    </td>
                    <td className="px-4 py-3">Full refund</td>
                    <td className="px-4 py-3">5–14 business days</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-4 py-3">
                      Order cancelled during preparation
                    </td>
                    <td className="px-4 py-3">Partial or no refund</td>
                    <td className="px-4 py-3">5–14 business days</td>
                  </tr>
                  <tr className="border-t border-border bg-secondary/50">
                    <td className="px-4 py-3">Cancelled by Lumière Dining</td>
                    <td className="px-4 py-3">Full refund</td>
                    <td className="px-4 py-3">5–14 business days</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-4 py-3">
                      Group booking (72+ hours notice)
                    </td>
                    <td className="px-4 py-3">
                      Deposit refund minus admin fee
                    </td>
                    <td className="px-4 py-3">5–14 business days</td>
                  </tr>
                  <tr className="border-t border-border bg-secondary/50">
                    <td className="px-4 py-3">
                      Group booking (less than 72 hours)
                    </td>
                    <td className="px-4 py-3">No deposit refund</td>
                    <td className="px-4 py-3">N/A</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-serif text-xl md:text-2xl">7. How to Cancel</h2>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              All cancellation requests can be submitted through the following
              channels: through your Account dashboard for reservations, orders,
              and Newsletter Subscription management; via the Contact Us page on
              our Platform; or by responding to any transactional email received
              from our email system. Please include your full name, registered
              email address, and booking or order reference number when
              submitting a cancellation request to ensure prompt processing.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-serif text-xl md:text-2xl">
              8. Exceptions & Special Circumstances
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              We may, at our sole discretion, waive cancellation fees or extend
              cancellation windows in exceptional circumstances including but
              not limited to medical emergencies, natural disasters, government
              travel restrictions, or bereavement. Requests for exceptions must
              be submitted through the Contact Us page with appropriate
              supporting documentation. All exception decisions are final and at
              the sole discretion of Lumière Dining management.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-serif text-xl md:text-2xl">
              9. Modifications to This Policy
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              We reserve the right to update this Cancellation Policy at any
              time. Material changes will be communicated via email to
              registered users and posted on the Platform. The revised policy
              will apply to all bookings and orders made after the effective
              date of the update. Existing reservations and confirmed orders
              will be governed by the policy in effect at the time they were
              made unless otherwise required by law.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-serif text-xl md:text-2xl">10. Contact Us</h2>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              For any questions, disputes, or concerns regarding this
              Cancellation Policy, please reach out through our Contact Us page.
              Our team will respond within a reasonable timeframe and work with
              you to find a fair resolution.
            </p>
          </section>

          <footer className="border-t border-border pt-6 mt-4">
            <p className="text-xs md:text-sm text-muted-foreground">
              © {new Date().getFullYear()} Lumière Dining. All rights reserved.
            </p>
          </footer>
        </div>
      </PaddingContainer>
    </PageContainer>
  );
}
