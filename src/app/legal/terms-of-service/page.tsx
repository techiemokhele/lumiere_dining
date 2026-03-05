import { PageContainer } from "@/components/structure/PageContainer";
import { PaddingContainer } from "@/components/structure/PaddingContainer";

export default function TermsOfServicePage() {
  const lastUpdated = "February 11, 2026";

  return (
    <PageContainer showFooter={false} showNavigation={true}>
      <PaddingContainer size="small">
        <div className="flex flex-col w-full max-w-4xl mx-auto py-12 md:py-20 gap-10 text-foreground">
          <header className="flex flex-col gap-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-primary">
              Terms of Service
            </h1>
            <p className="text-sm text-muted-foreground">
              Last Updated: {lastUpdated}
            </p>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              Welcome to Lumière Dining. By accessing or using our website,
              mobile application, and any related services (collectively, the
              &quot;Platform&quot;), you agree to be bound by these Terms of
              Service (&quot;Terms&quot;). Please read them carefully before
              using our Platform. If you do not agree to these Terms, you must
              not access or use the Platform.
            </p>
          </header>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">1. Definitions</h2>
            <div className="flex flex-col gap-2 text-sm md:text-base leading-relaxed text-muted-foreground">
              <p>
                &quot;Lumière Dining,&quot; &quot;we,&quot; &quot;us,&quot; or
                &quot;our&quot; refers to Lumière Dining and its parent
                companies, subsidiaries, and affiliates. &quot;User,&quot;
                &quot;you,&quot; or &quot;your&quot; refers to any individual or
                entity accessing the Platform. &quot;Services&quot; refers to
                all features available through the Platform including but not
                limited to: browsing our Menu, reading Our Story, viewing our
                Gallery, subscribing to our Newsletter, contacting us via the
                Contact Us page, reserving a table through Book a Table,
                managing a Wishlist, creating and managing an Account,
                completing purchases through Checkout and My Cart, adding or
                managing Payment Methods, using Directions powered by Google
                Maps, and receiving communications via our email system.
              </p>
            </div>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">2. Eligibility</h2>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              You must be at least 18 years of age or the age of legal majority
              in your jurisdiction, whichever is greater, to create an Account
              or make a purchase through our Platform. By using the Platform,
              you represent and warrant that you meet this eligibility
              requirement. Minors may only use the Platform under the
              supervision of a parent or legal guardian who agrees to be bound
              by these Terms.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">
              3. Account Registration & Security
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              To access certain features — including Book a Table, Wishlist, My
              Cart, Checkout, Payment Methods, and Newsletter Subscription — you
              may be required to create an Account. You agree to provide
              accurate, current, and complete information during registration
              and to keep your Account details up to date. You are solely
              responsible for maintaining the confidentiality of your login
              credentials and for all activities that occur under your Account.
              You must notify us immediately at our Contact Us page if you
              suspect any unauthorized access. We reserve the right to suspend
              or terminate any Account that we reasonably believe has been
              compromised or is being used in violation of these Terms.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">4. Reservations & Booking</h2>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              Our Book a Table feature allows you to request a reservation at
              Lumière Dining. All reservations are subject to availability and
              confirmation. A booking is only confirmed once you receive a
              confirmation email from our email system. We reserve the right to
              cancel or modify reservations due to unforeseen circumstances
              including but not limited to force majeure events, maintenance, or
              staffing issues. Any cancellation or modification by us will be
              communicated to you via email. For our cancellation policy
              regarding reservations, please refer to our separate Cancellation
              Policy page.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">5. Menu, Orders & Checkout</h2>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              Our Menu displays available food and beverage items. Prices,
              descriptions, and availability are subject to change without prior
              notice. Adding items to My Cart does not guarantee availability or
              price. Orders are finalized only upon successful completion of
              Checkout and receipt of an order confirmation email. We reserve
              the right to refuse or cancel any order for reasons including
              pricing errors, suspected fraud, or item unavailability. In such
              cases, you will be notified and any charges will be refunded to
              the original Payment Method.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">
              6. Payment Methods & Pricing
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              We accept various Payment Methods as displayed on our Platform.
              All payments are processed through secure third-party payment
              processors. By submitting payment information, you represent that
              you are authorized to use the selected Payment Method. All prices
              are displayed in the applicable local currency and are inclusive
              of taxes unless otherwise stated. You are responsible for any
              additional fees charged by your bank or payment provider,
              including currency conversion fees. We do not store your full
              payment card details on our servers.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">7. Wishlist</h2>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              The Wishlist feature allows you to save menu items for future
              reference. Wishlist items are tied to your Account and do not
              constitute a reservation, order, or price guarantee. We may remove
              items from your Wishlist if they are no longer available on our
              Menu.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">
              8. Newsletter & Email Communications
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              By subscribing to our Newsletter or creating an Account, you
              consent to receive promotional and transactional emails from
              Lumière Dining, including booking confirmations, order updates,
              special offers, and announcements. You may unsubscribe from
              marketing emails at any time by using the unsubscribe link in any
              email or by managing your preferences through your Account
              settings. Transactional emails related to your reservations,
              orders, and Account security will continue to be sent regardless
              of your marketing preferences, as they are necessary for the
              performance of our Services.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">9. Google Maps & Directions</h2>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              Our Platform integrates Google Maps Directions API to help you
              navigate to Lumière Dining. Your use of Google Maps features is
              additionally governed by the Google Maps/Google Earth Additional
              Terms of Service and the Google Privacy Policy. We do not
              guarantee the accuracy, completeness, or reliability of directions
              provided. Route information is for general guidance only, and you
              are responsible for safe navigation. Lumière Dining is not liable
              for any loss, injury, or damage resulting from reliance on
              directions provided through the Platform.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">10. Intellectual Property</h2>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              All content on the Platform — including but not limited to text,
              images in our Gallery, graphics, logos, menu descriptions, Our
              Story content, design elements, and software — is the property of
              Lumière Dining or its licensors and is protected by applicable
              copyright, trademark, and other intellectual property laws
              worldwide. You may not reproduce, distribute, modify, create
              derivative works from, publicly display, or otherwise exploit any
              content from the Platform without our prior written consent.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">11. User Conduct</h2>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              You agree not to: use the Platform for any unlawful purpose or in
              violation of any applicable local, national, or international law;
              attempt to gain unauthorized access to any part of the Platform,
              other Accounts, or computer systems; interfere with or disrupt the
              Platform or servers; submit false, misleading, or fraudulent
              information including during Account registration, booking, or
              Checkout; use automated systems, bots, or scrapers to access the
              Platform; impersonate any person or entity; or use the Contact Us
              feature to transmit spam, harassment, or offensive content. We
              reserve the right to terminate your access for any violation of
              these conduct rules.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">
              12. Privacy & Data Protection
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              Your use of the Platform is also governed by our Privacy Policy.
              We collect and process personal data including Account
              information, order history, payment details, Wishlist data,
              location data (through Google Maps Directions), email addresses
              for Newsletter Subscription, and communication records from
              Contact Us. We comply with applicable data protection laws
              including the General Data Protection Regulation (GDPR), the
              California Consumer Privacy Act (CCPA), the UK Data Protection Act
              2018, Brazil&apos;s LGPD, and other applicable regional data
              protection frameworks. You have the right to access, rectify,
              delete, or port your personal data by contacting us through our
              Contact Us page.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">
              13. Disclaimer of Warranties
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              The Platform and all Services are provided on an &quot;AS IS&quot;
              and &quot;AS AVAILABLE&quot; basis without warranties of any kind,
              whether express, implied, or statutory. To the fullest extent
              permitted by applicable law, we disclaim all warranties including
              but not limited to implied warranties of merchantability, fitness
              for a particular purpose, non-infringement, and accuracy. We do
              not warrant that the Platform will be uninterrupted, error-free,
              secure, or free of viruses or harmful components. Menu item
              descriptions, images in the Gallery, and allergy information are
              provided for informational purposes and may not reflect actual
              offerings at the time of your visit.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">14. Limitation of Liability</h2>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              To the maximum extent permitted by applicable law, Lumière Dining,
              its officers, directors, employees, agents, and affiliates shall
              not be liable for any indirect, incidental, special,
              consequential, or punitive damages, including but not limited to
              loss of profits, data, goodwill, or other intangible losses,
              arising out of or in connection with your use of or inability to
              use the Platform, any content on the Platform, or any transaction
              conducted through the Platform, even if we have been advised of
              the possibility of such damages. Our total aggregate liability for
              any claims arising from your use of the Platform shall not exceed
              the amount you paid to us in the twelve (12) months preceding the
              event giving rise to the claim. Nothing in these Terms excludes or
              limits our liability for death or personal injury caused by
              negligence, fraud, or any other liability that cannot be excluded
              by law.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">15. Indemnification</h2>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              You agree to indemnify, defend, and hold harmless Lumière Dining
              and its officers, directors, employees, agents, and affiliates
              from and against any and all claims, damages, losses, liabilities,
              costs, and expenses (including reasonable legal fees) arising out
              of or related to: your breach of these Terms; your use of the
              Platform; your violation of any applicable law or regulation; any
              content you submit through the Platform, including via Contact Us;
              or your infringement of any third-party rights.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">16. Modifications to Terms</h2>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              We reserve the right to update or modify these Terms at any time.
              Material changes will be communicated to you via email through our
              email system and/or by posting a notice on the Platform. Your
              continued use of the Platform following the effective date of any
              modification constitutes your acceptance of the revised Terms. We
              encourage you to review these Terms periodically.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">
              17. Governing Law & Dispute Resolution
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              These Terms shall be governed by and construed in accordance with
              the laws of the jurisdiction in which Lumière Dining is
              incorporated, without regard to its conflict of law provisions.
              Any dispute arising out of or relating to these Terms or the
              Platform shall first be attempted to be resolved through good
              faith negotiation. If the dispute cannot be resolved within thirty
              (30) days, it shall be submitted to binding arbitration under the
              rules of the applicable arbitration body in the relevant
              jurisdiction. For users in the European Union, nothing in this
              clause restricts your right to bring proceedings before the courts
              of your country of residence in accordance with applicable EU
              consumer protection laws.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">18. Severability</h2>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              If any provision of these Terms is held to be invalid, illegal, or
              unenforceable by a court of competent jurisdiction, the remaining
              provisions shall continue in full force and effect. The invalid
              provision shall be modified to the minimum extent necessary to
              make it valid and enforceable while preserving its original
              intent.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">19. Force Majeure</h2>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              Lumière Dining shall not be liable for any failure or delay in
              performing its obligations under these Terms where such failure or
              delay results from circumstances beyond our reasonable control,
              including but not limited to natural disasters, pandemics,
              government actions, war, terrorism, civil unrest, power failures,
              internet outages, or supplier failures.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">20. Contact Information</h2>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              If you have any questions, concerns, or requests regarding these
              Terms of Service, please reach out to us through our Contact Us
              page or email us directly. We will endeavor to respond to all
              inquiries within a reasonable timeframe.
            </p>
          </section>
        </div>
      </PaddingContainer>
    </PageContainer>
  );
}
