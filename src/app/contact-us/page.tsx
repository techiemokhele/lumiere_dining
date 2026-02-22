"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Clock,
  Facebook,
  Instagram,
  Mailbox,
  Map,
  Phone,
  Twitter,
  Youtube,
  Send,
  LoaderCircle,
} from "lucide-react";
import { useToast } from "@/lib/hooks/use-toast";
import { PageContainer } from "@/components/structure/PageContainer";
import { HeaderComponent } from "@/components/layout/HeaderComponent";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { GoogleMapComponent } from "@/components/GoogleMapComponent";

const contactFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters.")
    .max(100, "Full name cannot exceed 100 characters.")
    .refine(
      (value) => /^[a-zA-Z\s'-]+$/.test(value),
      "Full name can only contain letters, spaces, hyphens, and apostrophes.",
    ),
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Please enter a valid email address.")
    .refine((value) => !/\s/.test(value), "Email cannot contain spaces."),
  subject: z
    .string()
    .trim()
    .min(3, "Subject must be at least 3 characters.")
    .max(200, "Subject cannot exceed 200 characters."),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters.")
    .max(1000, "Message cannot exceed 1000 characters."),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const { toast } = useToast();
  const getInTouchRef = useRef<HTMLElement>(null);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const form = useForm<ContactFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      subject: "",
      message: "",
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (
    values: ContactFormData,
    e?: React.BaseSyntheticEvent,
  ) => {
    e?.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
        variant: "default",
      });

      form.reset();
    } catch (error) {
      console.error("Error sending message:", error);

      toast({
        title: "Message Failed",
        description:
          error instanceof Error
            ? error.message
            : "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageContainer
      showNavigation={true}
      showFooter={true}
      className="flex flex-col"
    >
      <div className="lg:-mt-[52px] -mt-[48px] w-full">
        <HeaderComponent
          onClick={() =>
            getInTouchRef.current?.scrollIntoView({ behavior: "smooth" })
          }
          image="/contact-us-header.jpg"
          badgeText="Contact Us"
          addBadgeBorder={true}
          title="Get In Touch With Us"
          description="Have questions or need assistance? We're here to help. Reach out to our team and we'll get back to you as soon as possible. We'd love to hear from you. Whether you have a question, feedback, or just want to say hello, our team is ready to assist you."
        />
      </div>

      <section
        ref={getInTouchRef}
        className="flex flex-col gap-16 px-4 lg:px-8 xl:px-16 py-16 lg:py-24"
      >
        <div className="max-w-7xl mx-auto w-full flex flex-col gap-16">
          <div className="flex lg:flex-row flex-col w-full gap-10">
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
              <p className="font-normal text-sm text-white/80 leading-relaxed">
                At Lumière Dining, we value every connection with our guests.
                Whether you&apos;re planning a special celebration, have dietary
                requirements, or simply want to learn more about our culinary
                experiences, our dedicated team is here to assist you with
                personalised service and attention to detail.
              </p>

              <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-4 gap-y-10 w-full">
                <div className="flex flex-row gap-4 items-center">
                  <Map className="text-crimson-600 shrink-0" size={32} />
                  <p className="font-normal text-sm text-white-100">
                    19 Dock Road, Cape Town, 8001, South Africa
                  </p>
                </div>
                <div className="flex flex-row gap-4 items-center">
                  <Phone className="text-crimson-600 shrink-0" size={32} />
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
                  <Mailbox className="text-crimson-600 shrink-0" size={32} />
                  <p className="font-normal text-sm text-white-100">
                    <Link href="mailto:neomokhele23@gmail.com">
                      info@Lumièredining.com
                    </Link>
                    <br />
                    <Link href="mailto:neomokhele23@gmail.com">
                      support@Lumièredining.com
                    </Link>
                  </p>
                </div>
                <div className="flex flex-row gap-4 items-center">
                  <Clock className="text-crimson-600 shrink-0" size={32} />
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
                    href="https://www.instagram.com/Lumièredining/"
                    target="_blank"
                  >
                    <Instagram
                      className="text-crimson-500 hover:text-crimson-600"
                      size={32}
                    />
                  </Link>
                  <Link
                    href="https://www.facebook.com/Lumièredining/"
                    target="_blank"
                  >
                    <Facebook
                      className="text-crimson-500 hover:text-crimson-600"
                      size={32}
                    />
                  </Link>
                  <Link
                    href="https://www.tiktok.com/@Lumièredining"
                    target="_blank"
                  >
                    <Twitter
                      className="text-crimson-500 hover:text-crimson-600"
                      size={32}
                    />
                  </Link>
                  <Link
                    href="https://www.youtube.com/@Lumièredining"
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

            <div className="flex flex-col gap-6 lg:w-1/2 w-full">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col gap-6"
                >
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-sans font-normal text-xs text-white-60 uppercase">
                          Full Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            autoComplete="name"
                            placeholder="e.g. Jane Doe"
                            className="bg-burgundy-900 border-burgundy-700 text-white placeholder:text-white-60"
                          />
                        </FormControl>
                        {form.formState.errors.fullName ? (
                          <p className="text-crimson-500 text-xxs font-normal mt-1">
                            {form.formState.errors.fullName.message}
                          </p>
                        ) : (
                          <div className="h-2 py-1.5" />
                        )}
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-sans font-normal text-xs text-white-60 uppercase">
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            autoComplete="email"
                            placeholder="jane@example.com"
                            className="bg-burgundy-900 border-burgundy-700 text-white placeholder:text-white-60"
                          />
                        </FormControl>
                        {form.formState.errors.email ? (
                          <p className="text-crimson-500 text-xxs font-normal mt-1">
                            {form.formState.errors.email.message}
                          </p>
                        ) : (
                          <div className="h-2 py-1.5" />
                        )}
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-sans font-normal text-xs text-white-60 uppercase">
                          Subject
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="What is this regarding?"
                            className="bg-burgundy-900 border-burgundy-700 text-white placeholder:text-white-60"
                          />
                        </FormControl>
                        {form.formState.errors.subject ? (
                          <p className="text-crimson-500 text-xxs font-normal mt-1">
                            {form.formState.errors.subject.message}
                          </p>
                        ) : (
                          <div className="h-2 py-1.5" />
                        )}
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-sans font-normal text-xs text-white-60 uppercase">
                          Message
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            rows={6}
                            placeholder="Tell us how we can help you..."
                            className="bg-burgundy-900 border-burgundy-700 text-white placeholder:text-white-60 resize-none"
                          />
                        </FormControl>
                        {form.formState.errors.message ? (
                          <p className="text-crimson-500 text-xxs font-normal mt-1">
                            {form.formState.errors.message.message}
                          </p>
                        ) : (
                          <div className="h-2 py-1.5" />
                        )}
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    variant="default"
                    size="lg"
                    disabled={isSubmitting}
                    className="flex flex-row gap-2 items-center justify-center bg-crimson-600 hover:bg-crimson-500 disabled:opacity-50 rounded-full"
                  >
                    {isSubmitting ? (
                      <>
                        <LoaderCircle className="animate-spin h-4 w-4" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send size={16} className="text-white" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>

          <GoogleMapComponent className="w-full h-[400px] sm:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden border-2 border-burgundy-700 shadow-lg" />
        </div>
      </section>
    </PageContainer>
  );
}
