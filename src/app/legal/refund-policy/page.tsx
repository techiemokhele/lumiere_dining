import { PageContainer } from "@/components/structure/PageContainer";
import { PaddingContainer } from "@/components/structure/PaddingContainer";

export default function RefundPolicyPage() {
  const lastUpdated = "February 11, 2026";

  return (
    <PageContainer showFooter={true} showNavigation={true}>
      <PaddingContainer size="small">
        <div className="flex flex-col w-full max-w-4xl mx-auto py-12 md:py-20 gap-10 text-foreground">
          <header className="flex flex-col gap-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-primary">
              Refund Policy
            </h1>
            <p className="text-sm text-muted-foreground">
              Last Updated: {lastUpdated}
            </p>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              At Lumière Dining, we are committed to ensuring your satisfaction
              with every experience. This Refund Policy outlines the terms and
              conditions under which refunds may be issued for reservations,
              orders, and other transactions made through our Platform. By using
              our Services, you agree to this policy in full.
            </p>
          </header>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">
              1. General Refund Principles
            </h2>
            <div className="flex flex-col gap-4 text-sm md:text-base leading-relaxed text-muted-foreground">
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-foreground">
                  1.1 Eligibility
                </h3>
                <p>
                  Refunds are issued on a case-by-case basis and are subject to
                  the conditions outlined in this policy. To be eligible for a
                  refund, the original transaction must have been completed
                  through the Lumière Dining Platform using a valid Payment
                  Method. Cash payments, tips, and gratuities are
                  non-refundable.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-foreground">
                  1.2 Refund Method
                </h3>
                <p>
                  All approved refunds will be processed to the original Payment
                  Method used at the time of the transaction. We do not issue
                  refunds via alternative payment methods, store credit, or cash
                  unless required by applicable law.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-foreground">
                  1.3 Processing Time
                </h3>
                <p>
                  Once a refund has been approved, it may take five (5) to
                  fourteen (14) business days to appear on your statement,
                  depending on your payment provider and financial institution.
                  Lumière Dining is not responsible for any delays caused by
                  third-party payment processors.
                </p>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">2. Reservation Refunds</h2>
            <div className="flex flex-col gap-4 text-sm md:text-base leading-relaxed text-muted-foreground">
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-foreground">
                  2.1 Cancellations Within the Free Window
                </h3>
                <p>
                  Reservations cancelled at least twenty-four (24) hours before
                  the scheduled time are eligible for a full refund of any
                  pre-paid deposit or pre-authorization charge. The refund will
                  be processed automatically within two (2) business days of the
                  cancellation.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-foreground">
                  2.2 Late Cancellations
                </h3>
                <p>
                  Reservations cancelled between two (2) and twenty-four (24)
                  hours before the scheduled time may be subject to a late
                  cancellation fee. If a deposit was collected, the refund
                  amount will be the deposit minus the applicable late
                  cancellation fee as communicated at the time of booking.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-foreground">2.3 No-Shows</h3>
                <p>
                  If you fail to arrive within thirty (30) minutes of your
                  reserved time without prior notice, no refund will be issued
                  for any pre-paid deposit or pre-authorization charge. The full
                  no-show fee as communicated during booking will be charged to
                  your Payment Method.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-foreground">
                  2.4 Group & Special Event Bookings
                </h3>
                <p>
                  Deposits for group reservations (parties of eight or more) and
                  special events are refundable only if the cancellation is made
                  at least seventy-two (72) hours in advance. Refunds for group
                  bookings will be the deposit amount minus any applicable
                  administrative fees. Cancellations made less than seventy-two
                  (72) hours before the event will not receive a deposit refund.
                </p>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">
              3. Order Refunds (My Cart & Checkout)
            </h2>
            <div className="flex flex-col gap-4 text-sm md:text-base leading-relaxed text-muted-foreground">
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-foreground">
                  3.1 Before Preparation Begins
                </h3>
                <p>
                  If you request a cancellation before your order has entered
                  preparation, you are entitled to a full refund of the total
                  amount charged, including taxes and service charges. Promo
                  code discounts that were applied at checkout will be reflected
                  in the refund amount accordingly.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-foreground">
                  3.2 During or After Preparation
                </h3>
                <p>
                  Once preparation of your order has commenced, a full refund
                  may not be possible. At our discretion, we may offer a partial
                  refund based on the items that have not yet been prepared. If
                  no items can be recovered, no refund will be issued.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-foreground">
                  3.3 Incorrect or Unsatisfactory Orders
                </h3>
                <p>
                  If you receive an order that is materially different from what
                  was confirmed at checkout, contains missing items, or does not
                  meet reasonable quality standards, you may request a refund or
                  replacement by contacting us within twenty-four (24) hours of
                  receiving the order. We may request photographic evidence or
                  other supporting information to process your claim. Approved
                  claims will result in either a full or partial refund, or a
                  replacement at our discretion.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-foreground">
                  3.4 Promotional & Discounted Orders
                </h3>
                <p>
                  Refunds for orders placed using a promo code or discount will
                  be calculated based on the actual amount charged to your
                  Payment Method, not the original pre-discount price. Promo
                  codes are single-use and will not be reissued upon refund
                  unless otherwise stated at the time of the promotion.
                </p>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">
              4. Refunds Initiated by Lumière Dining
            </h2>
            <div className="flex flex-col gap-4 text-sm md:text-base leading-relaxed text-muted-foreground">
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-foreground">
                  4.1 Cancellations by Us
                </h3>
                <p>
                  If Lumière Dining cancels your reservation or order due to
                  unforeseen circumstances including but not limited to force
                  majeure events, emergency closures, ingredient unavailability,
                  or pricing errors, you will receive a full refund of any
                  amounts charged. You will be notified via email and the refund
                  will be processed within two (2) business days.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-foreground">
                  4.2 Fraud Prevention
                </h3>
                <p>
                  If a transaction is flagged for suspected fraudulent activity,
                  we may temporarily hold the refund pending investigation. If
                  the transaction is confirmed as legitimate, the refund will be
                  processed promptly. If fraud is confirmed, Lumière Dining
                  reserves the right to withhold the refund and report the
                  matter to the relevant authorities.
                </p>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">5. Refund Summary</h2>
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
                    <td className="px-4 py-3">Incorrect or missing items</td>
                    <td className="px-4 py-3">Full or partial refund</td>
                    <td className="px-4 py-3">5–14 business days</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-4 py-3">Cancelled by Lumière Dining</td>
                    <td className="px-4 py-3">Full refund</td>
                    <td className="px-4 py-3">2–14 business days</td>
                  </tr>
                  <tr className="border-t border-border bg-secondary/50">
                    <td className="px-4 py-3">
                      Group booking (72+ hours notice)
                    </td>
                    <td className="px-4 py-3">
                      Deposit refund minus admin fee
                    </td>
                    <td className="px-4 py-3">5–14 business days</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-4 py-3">
                      Group booking (less than 72 hours)
                    </td>
                    <td className="px-4 py-3">No deposit refund</td>
                    <td className="px-4 py-3">N/A</td>
                  </tr>
                  <tr className="border-t border-border bg-secondary/50">
                    <td className="px-4 py-3">Suspected fraud (confirmed)</td>
                    <td className="px-4 py-3">No refund</td>
                    <td className="px-4 py-3">N/A</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">6. Non-Refundable Items</h2>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              The following are not eligible for refunds: cash payments, tips,
              and gratuities; service charges on fully consumed orders; gift
              cards or vouchers (unless required by applicable law); any
              transaction where the customer has violated the Terms of Service;
              and administrative fees applied to group booking cancellations.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">7. How to Request a Refund</h2>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              All refund requests can be submitted through the following
              channels: through your Account dashboard under order or
              reservation history; via the Contact Us page on our Platform; or
              by responding to any transactional email received from our email
              system. Please include your full name, registered email address,
              order or booking reference number, and a brief description of the
              reason for your refund request. Our team will review your request
              and respond within two (2) business days.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">8. Disputes & Chargebacks</h2>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              We encourage you to contact us directly before initiating a
              chargeback or dispute with your payment provider. Filing a
              chargeback without first contacting Lumière Dining may delay
              resolution and may result in the suspension of your Account
              pending investigation. We reserve the right to contest any
              chargeback that we believe to be unwarranted, and to provide
              evidence of the completed transaction to the relevant payment
              processor.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">
              9. Modifications to This Policy
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              We reserve the right to update this Refund Policy at any time.
              Material changes will be communicated via email to registered
              users and posted on the Platform. The revised policy will apply to
              all transactions made after the effective date of the update.
              Existing orders and confirmed reservations will be governed by the
              policy in effect at the time they were made unless otherwise
              required by law.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">10. Contact Us</h2>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              For any questions, disputes, or concerns regarding this Refund
              Policy, please reach out through our Contact Us page. Our team
              will respond within a reasonable timeframe and work with you to
              find a fair resolution.
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
