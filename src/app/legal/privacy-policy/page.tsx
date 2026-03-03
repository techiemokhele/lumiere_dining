import { PageContainer } from "@/components/structure/PageContainer";
import { PaddingContainer } from "@/components/structure/PaddingContainer";

export default function PrivacyPolicyPage() {
  const lastUpdated = "February 11, 2026";

  return (
    <PageContainer showFooter={true} showNavigation={true}>
      <PaddingContainer size="small">
        <div className="flex flex-col w-full max-w-4xl mx-auto py-12 md:py-20 gap-10 text-foreground">
          <header className="flex flex-col gap-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-primary">
              Privacy Policy
            </h1>
            <p className="text-sm text-muted-foreground">
              Last Updated: {lastUpdated}
            </p>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              Lumière Dining (&quot;we,&quot; &quot;us,&quot; or
              &quot;our&quot;) is committed to protecting your privacy and
              ensuring the security of your personal information. This Privacy
              Policy describes how we collect, use, store, share, and protect
              your data when you access or use our website, mobile application,
              and related services (collectively, the &quot;Platform&quot;). By
              using our Platform, you acknowledge that you have read and
              understood this Privacy Policy.
            </p>
          </header>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">1. Data Controller</h2>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              Lumière Dining is the data controller responsible for the
              processing of your personal data collected through the Platform.
              If you have any questions about how your data is handled, you may
              contact us at any time through our Contact Us page. Where required
              by applicable law, we have appointed a Data Protection Officer
              (DPO) who can be reached via the same channel.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">2. Information We Collect</h2>
            <div className="flex flex-col gap-4 text-sm md:text-base leading-relaxed text-muted-foreground">
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-foreground">
                  2.1 Information You Provide Directly
                </h3>
                <p>
                  We collect personal information that you voluntarily provide
                  when using our Services. This includes Account registration
                  data such as your full name, email address, phone number, and
                  password; reservation details submitted through Book a Table
                  including date, time, party size, and special requests;
                  Payment Method information such as credit or debit card
                  details, billing address, and payment preferences entered
                  during Checkout; order information from My Cart and Checkout
                  including selected Menu items, quantities, dietary
                  preferences, and order notes; Wishlist selections saved to
                  your Account; Newsletter Subscription preferences and email
                  address; communications submitted through the Contact Us page
                  including your name, email, subject, and message content; and
                  any other information you choose to provide when interacting
                  with our Platform.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-foreground">
                  2.2 Information Collected Automatically
                </h3>
                <p>
                  When you access the Platform, we automatically collect certain
                  technical and usage data. This includes your IP address and
                  approximate geolocation; device information such as device
                  type, operating system, browser type, and screen resolution;
                  usage data including pages visited (Menu, Our Story, Gallery,
                  Contact Us, and others), time spent on each page, click
                  patterns, and navigation paths; referral URLs, search terms,
                  and traffic sources; cookies and similar tracking technologies
                  as described in our Cookie Policy; and log data including
                  access times, error logs, and server response information.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-foreground">
                  2.3 Information from Third Parties
                </h3>
                <p>
                  We may receive information about you from third-party services
                  integrated into our Platform. This includes location and
                  mapping data from Google Maps Directions API when you use the
                  directions feature to navigate to our restaurant; payment
                  verification and fraud prevention data from our third-party
                  payment processors associated with Payment Methods and
                  Checkout; and analytics data from third-party analytics
                  providers that help us understand Platform usage.
                </p>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">
              3. How We Use Your Information
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              We use the information we collect for the following purposes: to
              create, maintain, and secure your Account; to process and confirm
              reservations made through Book a Table and send booking
              confirmations via our email system; to process orders placed
              through My Cart and Checkout, including payment processing via
              your selected Payment Methods; to maintain and display your
              Wishlist; to send transactional emails including reservation
              confirmations, order updates, Account security notifications, and
              payment receipts; to send marketing communications, promotions,
              and updates if you have subscribed to our Newsletter, subject to
              your consent where required by law; to respond to inquiries and
              support requests submitted through the Contact Us page; to provide
              Google Maps Directions and location-based navigation to our
              restaurant; to display and manage our Menu, Our Story, and Gallery
              content; to analyse Platform usage, improve our Services, and
              enhance user experience; to detect, prevent, and address fraud,
              security threats, and technical issues; to comply with applicable
              legal obligations, enforce our Terms of Service, and protect our
              rights and the rights of our users; and to personalise your
              experience on the Platform based on your preferences and
              interactions.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">
              4. Legal Bases for Processing
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              We process your personal data based on one or more of the
              following legal grounds, depending on the context and applicable
              jurisdiction. Contractual necessity: processing is necessary to
              perform our contract with you, including managing your Account,
              processing reservations via Book a Table, fulfilling orders
              through Checkout, and managing your Wishlist and My Cart. Consent:
              where you have given explicit consent, such as subscribing to our
              Newsletter, accepting cookies, or opting into marketing
              communications via our email system. Legitimate interests:
              processing is necessary for our legitimate business interests,
              such as improving the Platform, analysing usage of our Menu,
              Gallery, and Our Story pages, fraud prevention, and Platform
              security, provided these interests are not overridden by your
              rights. Legal obligation: processing is necessary to comply with
              applicable laws and regulations, including tax, accounting, and
              data protection requirements.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">
              5. How We Share Your Information
            </h2>
            <div className="flex flex-col gap-4 text-sm md:text-base leading-relaxed text-muted-foreground">
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-foreground">
                  5.1 Service Providers
                </h3>
                <p>
                  We share your data with trusted third-party service providers
                  who assist in operating the Platform and delivering our
                  Services. These include payment processors who handle
                  transactions through our Payment Methods and Checkout systems;
                  email service providers who deliver transactional and
                  marketing emails through our email system; Google, which
                  provides mapping and Directions API services; hosting and
                  cloud infrastructure providers; and analytics providers. All
                  service providers are bound by contractual obligations to
                  process your data only on our instructions and in compliance
                  with applicable data protection laws.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-foreground">
                  5.2 Legal & Regulatory Disclosures
                </h3>
                <p>
                  We may disclose your personal data if required to do so by
                  law, regulation, legal process, or governmental request; if we
                  believe disclosure is necessary to protect the rights,
                  property, or safety of Lumière Dining, our users, or the
                  public; or to enforce our Terms of Service or Cancellation
                  Policy.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-foreground">
                  5.3 Business Transfers
                </h3>
                <p>
                  In the event of a merger, acquisition, reorganisation, sale of
                  assets, or bankruptcy, your personal data may be transferred
                  to the acquiring entity. We will notify you via email and/or a
                  prominent notice on the Platform of any such transfer and any
                  changes to how your data will be processed.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-foreground">
                  5.4 No Sale of Personal Data
                </h3>
                <p>
                  We do not sell, rent, or trade your personal information to
                  third parties for their own marketing purposes. For California
                  residents, we confirm that we do not &quot;sell&quot; or
                  &quot;share&quot; personal information as those terms are
                  defined under the CCPA/CPRA.
                </p>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">6. Data Retention</h2>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              We retain your personal data only for as long as necessary to
              fulfil the purposes for which it was collected, or as required by
              applicable law. Account data is retained for as long as your
              Account remains active, and for a reasonable period thereafter to
              allow for reactivation or to comply with legal obligations.
              Reservation and order data is retained for up to seven (7) years
              for tax, accounting, and legal compliance purposes. Payment Method
              details are retained only for the duration necessary to process
              your transactions and are handled by our PCI-compliant payment
              processors. Newsletter Subscription data is retained until you
              unsubscribe. Contact Us communications are retained for up to
              three (3) years. Cookies and similar technologies are retained in
              accordance with our Cookie Policy. When data is no longer needed,
              it is securely deleted or anonymised so that it can no longer be
              associated with you.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">7. Data Security</h2>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              We implement appropriate technical and organisational measures to
              protect your personal data against unauthorised access, loss,
              destruction, alteration, or disclosure. These measures include
              encryption of data in transit using TLS/SSL protocols,
              particularly during Checkout and Payment Method processing;
              encryption of sensitive data at rest; access controls and
              authentication mechanisms for Account management; regular security
              assessments and penetration testing; employee training on data
              protection and security best practices; and secure data backup and
              disaster recovery procedures. While we strive to protect your
              personal information, no method of transmission over the internet
              or electronic storage is completely secure. We cannot guarantee
              absolute security, but we are committed to maintaining
              industry-standard protections.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">
              8. International Data Transfers
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              Your personal data may be transferred to, stored in, or processed
              in countries other than your country of residence. These countries
              may have data protection laws that differ from those in your
              jurisdiction. When we transfer data internationally, we ensure
              appropriate safeguards are in place, including Standard
              Contractual Clauses (SCCs) approved by the European Commission;
              adequacy decisions by relevant data protection authorities;
              binding corporate rules where applicable; and other legally
              recognised transfer mechanisms. For users in the European Economic
              Area (EEA), United Kingdom, or Switzerland, we ensure that any
              transfer of personal data to countries outside these regions is
              subject to appropriate safeguards as required by the GDPR or UK
              GDPR.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">9. Your Privacy Rights</h2>
            <div className="flex flex-col gap-4 text-sm md:text-base leading-relaxed text-muted-foreground">
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-foreground">
                  9.1 Rights Under GDPR (EEA & UK Users)
                </h3>
                <p>
                  If you are located in the European Economic Area or the United
                  Kingdom, you have the right to access your personal data and
                  obtain a copy; rectify inaccurate or incomplete data; request
                  erasure of your data (&quot;right to be forgotten&quot;);
                  restrict processing of your data in certain circumstances;
                  object to processing based on legitimate interests or direct
                  marketing; data portability, allowing you to receive your data
                  in a structured, commonly used, machine-readable format;
                  withdraw your consent at any time where processing is based on
                  consent, without affecting the lawfulness of processing before
                  withdrawal; and lodge a complaint with your local supervisory
                  authority.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-foreground">
                  9.2 Rights Under CCPA/CPRA (California Residents)
                </h3>
                <p>
                  If you are a California resident, you have the right to know
                  what personal information we collect, use, disclose, and sell;
                  request deletion of your personal information; opt out of the
                  sale or sharing of your personal information (though we do not
                  sell personal data); correct inaccurate personal information;
                  limit the use of sensitive personal information; and
                  non-discrimination for exercising your privacy rights. To
                  submit a verifiable consumer request, please contact us
                  through our Contact Us page. We will verify your identity
                  before processing your request and respond within the
                  timeframes required by law.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-foreground">
                  9.3 Rights Under LGPD (Brazilian Users)
                </h3>
                <p>
                  If you are located in Brazil, you have the right to
                  confirmation of the existence of processing; access to your
                  data; correction of incomplete or inaccurate data;
                  anonymisation, blocking, or deletion of unnecessary data; data
                  portability; deletion of data processed with consent;
                  information about public and private entities with which your
                  data has been shared; information about the possibility of
                  denying consent and the consequences thereof; and revocation
                  of consent.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-foreground">
                  9.4 Rights Under Other Jurisdictions
                </h3>
                <p>
                  We respect the privacy rights of users in all jurisdictions
                  where our Platform is accessible, including but not limited to
                  rights under Canada&apos;s PIPEDA, Australia&apos;s Privacy
                  Act 1988, South Africa&apos;s POPIA, Japan&apos;s APPI, South
                  Korea&apos;s PIPA, and other applicable data protection laws.
                  If you wish to exercise any rights available to you under your
                  local laws, please contact us through the Contact Us page.
                </p>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">10. Email Communications</h2>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              Our email system sends both transactional and marketing
              communications. Transactional emails include reservation
              confirmations from Book a Table, order confirmations from
              Checkout, Account security alerts, password reset requests, and
              payment receipts. These emails are necessary for the performance
              of our Services and will be sent regardless of your marketing
              preferences. Marketing emails include Newsletter content,
              promotional offers, event announcements, and personalised
              recommendations based on your Menu browsing and Wishlist activity.
              You may opt out of marketing emails at any time by clicking the
              unsubscribe link in any marketing email, managing your preferences
              in the Newsletter Subscription section of your Account, or
              contacting us through the Contact Us page. We comply with
              applicable anti-spam laws including the CAN-SPAM Act, CASL, GDPR
              e-marketing provisions, and other regional electronic
              communication regulations.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">
              11. Google Maps & Location Data
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              Our Platform uses Google Maps Directions API to provide navigation
              and location-based services. When you use the Directions feature,
              Google may collect and process your location data, IP address, and
              device information in accordance with the Google Privacy Policy
              and Google Maps/Google Earth Additional Terms of Service. We do
              not permanently store your precise geolocation data. Location data
              obtained through Google Maps is used solely to provide directions
              to our restaurant and is not combined with other personal data for
              profiling purposes. You can disable location services in your
              device settings, though this may affect the functionality of the
              Directions feature.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">12. Children&apos;s Privacy</h2>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              Our Platform is not intended for use by children under the age of
              sixteen (16) or the applicable minimum age in your jurisdiction.
              We do not knowingly collect personal information from children. If
              we become aware that we have inadvertently collected personal data
              from a child without verifiable parental consent, we will take
              immediate steps to delete that information from our systems. If
              you believe a child has provided us with personal data, please
              contact us immediately through the Contact Us page.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">
              13. Third-Party Links & Services
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              Our Platform may contain links to third-party websites or services
              that are not operated by us. This includes links in our Gallery,
              social media integrations, and external payment provider pages
              accessed during Checkout. We are not responsible for the privacy
              practices or content of these third-party sites. We encourage you
              to review the privacy policies of any third-party services before
              providing them with your personal information.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">
              14. Data Breach Notification
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              In the event of a personal data breach that is likely to result in
              a risk to your rights and freedoms, we will notify the relevant
              supervisory authority within seventy-two (72) hours of becoming
              aware of the breach, as required by the GDPR and other applicable
              data protection laws. If the breach is likely to result in a high
              risk to your rights, we will also notify you directly via email
              through our email system without undue delay. Our notification
              will describe the nature of the breach, the categories and
              approximate number of individuals affected, the likely
              consequences, and the measures taken or proposed to address the
              breach.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">
              15. Automated Decision-Making & Profiling
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              We may use automated processing to personalise your experience on
              the Platform, such as recommending Menu items based on your
              browsing history and Wishlist, or tailoring Newsletter content. We
              do not engage in automated decision-making that produces legal
              effects or similarly significant effects concerning you without
              human involvement. If we introduce such processing in the future,
              we will provide appropriate notice and obtain your consent where
              required by law, and you will have the right to request human
              review of any automated decision.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">16. Do Not Track Signals</h2>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              Some browsers offer a &quot;Do Not Track&quot; (DNT) feature that
              sends a signal to websites requesting that your browsing activity
              not be tracked. There is currently no uniform standard for
              responding to DNT signals. Our Platform does not currently respond
              to DNT signals, but we respect your privacy choices through our
              cookie consent mechanism and the privacy settings available in
              your Account. For California residents, we honour the Global
              Privacy Control (GPC) signal as a valid opt-out request under the
              CCPA/CPRA.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">
              17. Changes to This Privacy Policy
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              We may update this Privacy Policy from time to time to reflect
              changes in our data practices, legal requirements, or operational
              needs. Material changes will be communicated to registered users
              via email through our email system and by posting a prominent
              notice on the Platform. We encourage you to review this Privacy
              Policy periodically. Where required by applicable law, we will
              obtain your consent before implementing material changes. Your
              continued use of the Platform after the effective date of any
              changes constitutes your acceptance of the revised Privacy Policy.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">18. Contact Us</h2>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              If you have any questions, concerns, or requests regarding this
              Privacy Policy, your personal data, or your privacy rights, please
              contact us through our Contact Us page. You may also write to our
              Data Protection Officer (where appointed) through the same
              channel. We will endeavour to respond to all inquiries within
              thirty (30) days or within the timeframe required by applicable
              law, whichever is shorter.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">19. Data Processing Summary</h2>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm md:text-base text-left">
                <thead>
                  <tr className="bg-secondary">
                    <th className="px-4 py-3 font-semibold text-foreground">
                      Service
                    </th>
                    <th className="px-4 py-3 font-semibold text-foreground">
                      Data Collected
                    </th>
                    <th className="px-4 py-3 font-semibold text-foreground">
                      Legal Basis
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-t border-border">
                    <td className="px-4 py-3">Account</td>
                    <td className="px-4 py-3">Name, email, phone, password</td>
                    <td className="px-4 py-3">Contract</td>
                  </tr>
                  <tr className="border-t border-border bg-secondary/50">
                    <td className="px-4 py-3">Book a Table</td>
                    <td className="px-4 py-3">
                      Date, time, party size, special requests
                    </td>
                    <td className="px-4 py-3">Contract</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-4 py-3">My Cart & Checkout</td>
                    <td className="px-4 py-3">
                      Order items, quantities, notes
                    </td>
                    <td className="px-4 py-3">Contract</td>
                  </tr>
                  <tr className="border-t border-border bg-secondary/50">
                    <td className="px-4 py-3">Payment Methods</td>
                    <td className="px-4 py-3">Card details, billing address</td>
                    <td className="px-4 py-3">Contract</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-4 py-3">Wishlist</td>
                    <td className="px-4 py-3">Saved menu items</td>
                    <td className="px-4 py-3">Contract</td>
                  </tr>
                  <tr className="border-t border-border bg-secondary/50">
                    <td className="px-4 py-3">Newsletter</td>
                    <td className="px-4 py-3">Email address, preferences</td>
                    <td className="px-4 py-3">Consent</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-4 py-3">Contact Us</td>
                    <td className="px-4 py-3">Name, email, message content</td>
                    <td className="px-4 py-3">Legitimate interest</td>
                  </tr>
                  <tr className="border-t border-border bg-secondary/50">
                    <td className="px-4 py-3">Google Maps Directions</td>
                    <td className="px-4 py-3">Location, IP, device info</td>
                    <td className="px-4 py-3">Consent</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-4 py-3">Email System</td>
                    <td className="px-4 py-3">
                      Email address, engagement metrics
                    </td>
                    <td className="px-4 py-3">Contract / Consent</td>
                  </tr>
                  <tr className="border-t border-border bg-secondary/50">
                    <td className="px-4 py-3">Menu, Our Story, Gallery</td>
                    <td className="px-4 py-3">
                      Usage data, browsing behaviour
                    </td>
                    <td className="px-4 py-3">Legitimate interest</td>
                  </tr>
                </tbody>
              </table>
            </div>
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
