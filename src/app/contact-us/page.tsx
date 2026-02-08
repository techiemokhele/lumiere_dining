import Link from "next/link";
import {
  Clock,
  Facebook,
  Instagram,
  Mailbox,
  Map,
  Phone,
  Twitter,
  X,
  Youtube,
} from "lucide-react";
import { PageContainer } from "@/components/structure/PageContainer";
import { PaddingContainer } from "@/components/structure/PaddingContainer";
import { HeaderComponent } from "@/components/layout/HeaderComponent";
import { Separator } from "@/components/ui/separator";

export default function ContactPage() {
  return (
    <PageContainer
      showNavigation={true}
      showFooter={true}
      className="flex gap-20"
    >
      <div className="lg:-mt-[52px] -mt-12 w-full">
        <HeaderComponent
          image="./contact-us-header.jpg"
          badgeText="Contact Us"
          addBadgeBorder={true}
          title="Get In Touch With Us"
          description="Have questions or need assistance? We're here to help. Reach out to our team and we'll get back to you as soon as possible. We'd love to hear from you. Whether you have a question, feedback, or just want to say hello, our team is ready to assist you."
        />
      </div>

      <PaddingContainer size="small">
        <div className="flex lg:flex-row flex-col w-full">
          <div className="flex flex-col gap-8 lg:w-1/2 w-full items-start">
            <div className="flex flex-row items-center gap-4 w-full">
              <div className="w-16 border border-crimson-600" />
              <p className="font-normal text-sm text-crimson-600 uppercase">
                Keep Close
              </p>
            </div>
            <h1 className="font-sans !font-extrabold md:text-6xl text-3xl text-white">
              Get in touch
            </h1>
            <p className="font-normal text-base text-white/80 leading-relaxed">
              At Lumiere Dining, we value every connection with our guests.
              Whether you&apos;re planning a special celebration, have dietary
              requirements, or simply want to learn more about our culinary
              experiences, our dedicated team is here to assist you with
              personalised service and attention to detail.
            </p>

            <div className="grid grid-cols-2 gap-x-4 gap-y-10 w-full">
              <div className="flex flex-row gap-4 items-center">
                <Map className="text-crimson-600" size={32} />
                <p className="font-normal text-sm text-white-100">
                  19 Dock Road, Cape Town, 8001, South Africa
                </p>
              </div>
              <div className="flex flex-row gap-4 items-center">
                <Phone className="text-crimson-600" size={32} />
                <p className="font-normal text-sm text-white-100">
                  <Link href="tel:+27113453224" target="_blank">
                    +27 11 345 3224
                  </Link>
                  <br />
                  <Link href="tel:+27648473363" target="_blank">
                    +27 64 847 3363
                  </Link>
                </p>
              </div>
              <div className="flex flex-row gap-4 items-center">
                <Mailbox className="text-crimson-600" size={32} />
                <p className="font-normal text-sm text-white-100">
                  <Link href="mailto:neomokhele23@gmail.com">
                    info@lumieredining.com
                  </Link>
                  <br />
                  <Link href="mailto:neomokhele23@gmail.com">
                    support@lumieredining.com
                  </Link>
                </p>
              </div>
              <div className="flex flex-row gap-4 items-center">
                <Clock className="text-crimson-600" size={32} />
                <p className="font-normal text-sm text-white-100">
                  Mon - Thu: 7am - 10pm
                  <br />
                  Fri - Sat: 7am - 12am
                  <br />
                  Sunday: 8am - 10pm
                </p>
              </div>
            </div>

            <Separator className="text-burgundy-700" />

            <div className="flex flex-col gap-4">
              <h2 className="font-semibold text-2xl text-white-100">
                Follow Us
              </h2>
              <div className="flex flex-row gap-6 w-full">
                <Link
                  href="https://www.instagram.com/lumieredining/"
                  target="_blank"
                >
                  <Instagram
                    className="text-crimson-500 hover:text-crimson-600"
                    size={32}
                  />
                </Link>
                <Link
                  href="https://www.facebook.com/lumieredining/"
                  target="_blank"
                >
                  <Facebook
                    className="text-crimson-500 hover:text-crimson-600"
                    size={32}
                  />
                </Link>
                <Link
                  href="https://www.tiktok.com/@lumieredining"
                  target="_blank"
                >
                  <Twitter
                    className="text-crimson-500 hover:text-crimson-600"
                    size={32}
                  />
                </Link>
                <Link
                  href="https://www.youtube.com/@lumieredining"
                  target="_blank"
                >
                  <Youtube
                    className="text-crimson-500 hover:text-crimson-600"
                    size={32}
                  />
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:w-1/2 w-full"></div>
        </div>
      </PaddingContainer>
    </PageContainer>
  );
}
