import { PageContainer } from "@/components/structure/PageContainer";
import { PaddingContainer } from "@/components/structure/PaddingContainer";

export default function CookiePolicyPage() {
  const lastUpdated = "February 11, 2026";

  return (
    <PageContainer showFooter={false} showNavigation={true}>
      <PaddingContainer size="small">
        <div className="flex flex-col w-full max-w-4xl mx-auto py-12 md:py-20 gap-10 text-foreground">
          <header className="flex flex-col gap-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-primary">
              Cookie Policy
            </h1>
            <p className="text-sm text-muted-foreground">
              Last Updated: {lastUpdated}
            </p>
            <p className="text-xs lg:text-sm leading-relaxed text-muted-foreground">
              Lumière Dining (&quot;we,&quot; &quot;us,&quot; or
              &quot;our&quot;) uses cookies and similar tracking technologies on
              our website and application (the &quot;Platform&quot;). This
              Cookie Policy explains what cookies are, how we use them, the
              types of cookies we deploy, and how you can manage your cookie
              preferences. By continuing to use our Platform, you consent to the
              use of cookies as described in this policy, unless you have
              adjusted your cookie settings accordingly.
            </p>
          </header>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">1. What Are Cookies?</h2>
            <p className="text-xs lg:text-sm leading-relaxed text-muted-foreground">
              Cookies are small text files that are placed on your device
              (computer, tablet, or mobile phone) when you visit a website. They
              are widely used to make websites function efficiently, enhance
              user experience, and provide analytical information to website
              operators. Cookies may be &quot;session cookies&quot; (which are
              deleted when you close your browser) or &quot;persistent
              cookies&quot; (which remain on your device for a set period or
              until you delete them). Cookies can be set by the website you are
              visiting (&quot;first-party cookies&quot;) or by third-party
              services operating on that website (&quot;third-party
              cookies&quot;).
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">2. How We Use Cookies</h2>
            <p className="text-xs lg:text-sm leading-relaxed text-muted-foreground">
              We use cookies and similar technologies across our Platform to
              support and enhance the functionality of our Services, including
              Menu browsing, Our Story, Gallery, Newsletter Subscription,
              Contact Us, Book a Table, Wishlist, Account management, Checkout,
              My Cart, Payment Methods, Google Maps Directions integration, and
              our email communication system. Specifically, cookies help us
              authenticate your Account sessions and keep you securely logged
              in; remember items in your My Cart and Wishlist across sessions;
              store your preferences such as language, currency, and
              accessibility settings; process reservations through Book a Table
              and retain your booking details; facilitate secure transactions
              during Checkout by maintaining session integrity with Payment
              Methods; deliver relevant content and personalised recommendations
              based on your Menu browsing and Gallery interactions; manage your
              Newsletter Subscription preferences; enable the Google Maps
              Directions API to provide location-based services and navigation
              to our restaurant; analyse Platform performance, traffic patterns,
              and user behaviour to improve our Services; and ensure the
              security and integrity of the Platform by detecting fraudulent or
              suspicious activity.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">3. Types of Cookies We Use</h2>
            <div className="flex flex-col gap-4 text-xs lg:text-sm leading-relaxed text-muted-foreground">
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-foreground">
                  3.1 Strictly Necessary Cookies
                </h3>
                <p className="lg:text-sm text-xs">
                  These cookies are essential for the Platform to function and
                  cannot be disabled in our systems. They are typically set in
                  response to actions you take that amount to a request for
                  services, such as logging into your Account, adding items to
                  My Cart, proceeding through Checkout, setting privacy
                  preferences, or completing a reservation via Book a Table.
                  Without these cookies, core Services cannot be provided. These
                  cookies do not store any personally identifiable information
                  beyond what is necessary for session management.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-foreground">
                  3.2 Functional Cookies
                </h3>
                <p className="lg:text-sm text-xs">
                  Functional cookies enable enhanced functionality and
                  personalisation. They may be set by us or by third-party
                  providers whose services we have integrated into the Platform.
                  These cookies remember your preferences and choices, such as
                  your preferred language, display settings, previously viewed
                  items in the Menu or Gallery, Wishlist selections, and
                  Newsletter Subscription status. If you do not allow these
                  cookies, some or all of these features may not function
                  properly.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-foreground">
                  3.3 Analytics & Performance Cookies
                </h3>
                <p className="lg:text-sm text-xs">
                  These cookies collect information about how visitors use the
                  Platform, including which pages are visited most frequently,
                  how users navigate between pages such as Menu, Our Story,
                  Gallery, and Contact Us, and whether users encounter errors.
                  All information collected by these cookies is aggregated and
                  anonymised. We use this data to understand user behaviour,
                  improve Platform performance, and optimise the user
                  experience. Third-party analytics providers may set these
                  cookies on our behalf.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-foreground">
                  3.4 Marketing & Advertising Cookies
                </h3>
                <p className="lg:text-sm text-xs">
                  These cookies may be set through our Platform by advertising
                  partners or by us to build a profile of your interests and
                  show you relevant content or promotions. They track your
                  activity across websites and may be used to deliver targeted
                  Newsletter content or promotional emails through our email
                  system. These cookies remember that you have visited the
                  Platform and may share this information with other
                  organisations such as advertisers. If you do not allow these
                  cookies, you will still see communications from us, but they
                  will be less relevant to your interests.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-foreground">
                  3.5 Third-Party Cookies
                </h3>
                <p className="lg:text-sm text-xs">
                  Our Platform integrates services from third parties that may
                  set their own cookies. These include Google Maps and the
                  Directions API, which may place cookies to provide
                  location-based services and navigation functionality; payment
                  processing providers associated with our Payment Methods and
                  Checkout systems, which may use cookies for fraud prevention
                  and transaction security; analytics providers that help us
                  measure and improve Platform performance; and social media
                  platforms, if share or embed features are present. We do not
                  control the cookies set by these third parties. Please refer
                  to their respective privacy and cookie policies for more
                  information.
                </p>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">4. Cookie Overview</h2>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-xs lg:text-sm text-left">
                <thead>
                  <tr className="bg-secondary">
                    <th className="px-4 py-3 font-semibold text-foreground">
                      Category
                    </th>
                    <th className="px-4 py-3 font-semibold text-foreground">
                      Purpose
                    </th>
                    <th className="px-4 py-3 font-semibold text-foreground">
                      Duration
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-t border-border">
                    <td className="px-4 py-3">Strictly Necessary</td>
                    <td className="px-4 py-3">
                      Account login, Cart, Checkout, Booking sessions
                    </td>
                    <td className="px-4 py-3">Session / up to 24 hours</td>
                  </tr>
                  <tr className="border-t border-border bg-secondary/50">
                    <td className="px-4 py-3">Functional</td>
                    <td className="px-4 py-3">
                      Preferences, Wishlist, language, Newsletter status
                    </td>
                    <td className="px-4 py-3">Up to 1 year</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-4 py-3">Analytics & Performance</td>
                    <td className="px-4 py-3">
                      Traffic analysis, page usage, error tracking
                    </td>
                    <td className="px-4 py-3">Up to 2 years</td>
                  </tr>
                  <tr className="border-t border-border bg-secondary/50">
                    <td className="px-4 py-3">Marketing & Advertising</td>
                    <td className="px-4 py-3">
                      Targeted content, email personalisation
                    </td>
                    <td className="px-4 py-3">Up to 2 years</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-4 py-3">Third-Party (Google Maps)</td>
                    <td className="px-4 py-3">
                      Directions, location services, map rendering
                    </td>
                    <td className="px-4 py-3">Varies by provider</td>
                  </tr>
                  <tr className="border-t border-border bg-secondary/50">
                    <td className="px-4 py-3">Third-Party (Payments)</td>
                    <td className="px-4 py-3">
                      Fraud detection, transaction security
                    </td>
                    <td className="px-4 py-3">Varies by provider</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">
              5. Managing Your Cookie Preferences
            </h2>
            <div className="flex flex-col gap-4 text-xs lg:text-sm leading-relaxed text-muted-foreground">
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-foreground">
                  5.1 Cookie Consent Banner
                </h3>
                <p className="lg:text-sm text-xs">
                  When you first visit our Platform, a cookie consent banner
                  will be displayed, allowing you to accept all cookies, reject
                  non-essential cookies, or customise your preferences by
                  category. Your consent choice will be stored and respected for
                  subsequent visits. You can update your preferences at any time
                  through the cookie settings link available in the footer of
                  our Platform or within your Account settings.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-foreground">
                  5.2 Browser Settings
                </h3>
                <p className="lg:text-sm text-xs">
                  Most web browsers allow you to control cookies through their
                  settings. You can configure your browser to block or delete
                  cookies, or to alert you when a cookie is being set. The
                  methods for managing cookies vary by browser. Please consult
                  your browser&apos;s help documentation for specific
                  instructions. Note that blocking or deleting certain cookies
                  may affect the functionality of the Platform, including your
                  ability to log into your Account, maintain items in My Cart,
                  complete Checkout, or use Google Maps Directions.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-foreground">
                  5.3 Opt-Out of Analytics
                </h3>
                <p className="lg:text-sm text-xs">
                  If we use Google Analytics or similar services, you may opt
                  out by installing the relevant browser add-on provided by the
                  analytics provider or by adjusting your preferences through
                  our cookie consent mechanism.
                </p>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">6. Similar Technologies</h2>
            <p className="text-xs lg:text-sm leading-relaxed text-muted-foreground">
              In addition to cookies, we may use similar tracking technologies
              including web beacons (also known as pixel tags or clear GIFs),
              which are small transparent images embedded in emails sent through
              our email system to track whether emails are opened and which
              links are clicked; local storage and session storage in your
              browser to store temporary data related to your My Cart, Wishlist,
              and browsing preferences; and fingerprinting techniques for fraud
              prevention during Checkout and Payment Method processing. These
              technologies are subject to the same controls and consent
              mechanisms described in this policy.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">7. International Compliance</h2>
            <p className="text-xs lg:text-sm leading-relaxed text-muted-foreground">
              We are committed to complying with applicable cookie and data
              privacy laws across all jurisdictions in which our Platform is
              accessible. This includes compliance with the EU ePrivacy
              Directive and General Data Protection Regulation (GDPR), which
              require explicit consent for non-essential cookies; the UK Privacy
              and Electronic Communications Regulations (PECR) and UK GDPR; the
              California Consumer Privacy Act (CCPA) and California Privacy
              Rights Act (CPRA), which grant California residents the right to
              opt out of the sale or sharing of personal information collected
              via cookies; Brazil&apos;s Lei Geral de Proteção de Dados (LGPD);
              Canada&apos;s Personal Information Protection and Electronic
              Documents Act (PIPEDA); Australia&apos;s Privacy Act 1988; and
              other applicable regional data protection frameworks. Where
              required by law, we will obtain your affirmative consent before
              placing non-essential cookies on your device.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">
              8. Data Collected Through Cookies
            </h2>
            <p className="text-xs lg:text-sm leading-relaxed text-muted-foreground">
              Cookies on our Platform may collect information including your IP
              address and approximate geolocation; browser type, version, and
              operating system; device identifiers; pages visited and time spent
              on each page, including Menu, Our Story, Gallery, and Contact Us;
              referral URLs and search terms that led you to the Platform;
              interactions with features such as Book a Table, Wishlist, and
              Checkout; and email engagement metrics from communications sent
              through our email system. This information is processed in
              accordance with our Privacy Policy and is used solely for the
              purposes described in this Cookie Policy.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">9. Data Sharing & Transfers</h2>
            <p className="text-xs lg:text-sm leading-relaxed text-muted-foreground">
              Cookie data may be shared with third-party service providers who
              assist in operating the Platform, including analytics providers,
              payment processors for our Payment Methods and Checkout systems,
              and Google for Maps and Directions functionality. We do not sell
              cookie data to third parties. Where data is transferred to
              countries outside of your jurisdiction, we ensure appropriate
              safeguards are in place, such as Standard Contractual Clauses
              (SCCs) approved by the European Commission, adequacy decisions, or
              other legally recognised transfer mechanisms.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">10. Your Rights</h2>
            <p className="text-xs lg:text-sm leading-relaxed text-muted-foreground">
              Depending on your jurisdiction, you may have the right to access
              the personal data collected through cookies; rectify inaccurate
              data; request deletion of your data; restrict or object to the
              processing of your data; withdraw your consent to non-essential
              cookies at any time without affecting the lawfulness of processing
              based on consent before its withdrawal; request data portability;
              and lodge a complaint with a supervisory authority. To exercise
              any of these rights, please contact us through our Contact Us page
              or manage your preferences through your Account settings. We will
              respond to all valid requests within the timeframes required by
              applicable law.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">11. Children&apos;s Privacy</h2>
            <p className="text-xs lg:text-sm leading-relaxed text-muted-foreground">
              Our Platform is not directed at individuals under the age of 16
              (or the applicable age in your jurisdiction). We do not knowingly
              use cookies to collect personal information from children. If we
              become aware that cookies have collected data from a child without
              verifiable parental consent, we will take steps to delete that
              information promptly.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">
              12. Changes to This Cookie Policy
            </h2>
            <p className="text-xs lg:text-sm leading-relaxed text-muted-foreground">
              We may update this Cookie Policy from time to time to reflect
              changes in our practices, technology, legal requirements, or for
              other operational reasons. Material changes will be communicated
              via a notice on the Platform and, where you have an Account, via
              email through our email system. Where required by law, we will
              seek renewed consent for any material changes to how we use
              cookies. The &quot;Last Updated&quot; date at the top of this
              policy indicates when the most recent revision was made.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl">13. Contact Us</h2>
            <p className="text-xs lg:text-sm leading-relaxed text-muted-foreground">
              If you have any questions, concerns, or requests regarding this
              Cookie Policy or how we use cookies and similar technologies,
              please contact us through our Contact Us page. Our data protection
              team will respond within a reasonable timeframe.
            </p>
          </section>
        </div>
      </PaddingContainer>
    </PageContainer>
  );
}
