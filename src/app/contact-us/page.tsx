import { HeaderComponent } from "@/components/layout/HeaderComponent";
import { PageContainer } from "@/components/structure/PageContainer";

export default function ContactPage() {
  return (
    <PageContainer showNavigation={true} showFooter={true}>
      <div className="lg:-mt-[52px] -mt-12 w-full">
        <HeaderComponent
          image="./contact-us-header.jpg"
          badgeText="Contact Us"
          addBadgeBorder={true}
          title="Get In Touch With Us"
          description="Have questions or need assistance? We're here to help. Reach out to our team and we'll get back to you as soon as possible. We'd love to hear from you. Whether you have a question, feedback, or just want to say hello, our team is ready to assist you."
        />
      </div>
    </PageContainer>
  );
}
