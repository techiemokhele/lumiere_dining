import { PageContainer } from "@/components/structure/PageContainer";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <PageContainer showNavigation={true} showFooter={true}>
      <section
        className="flex flex-col h-[100vh] w-full items-center justify-center bg-cover bg-center gap-8 lg:px-0 px-6 lg:-mt-[52px] -mt-12"
        style={{ backgroundImage: `url(/light-decoration.jpg)` }}
      >
        <h1 className="lg:font-extrabold md:font-extrabold font-bold md:text-5xl text-4xl text-white text-center">
          Taste the Exceptional
        </h1>
        <p className="font-normal text-sm text-white text-center">
          Experience a symphony of flavors crafted by Chef Antonie in an
          atmosphere of timeless elegance.
        </p>

        <div className="flex md:flex-row flex-col gap-4">
          <Button variant="default" size="lg" className="w-40">
            <span className="font-normal text-sm text-white">View Menus</span>
          </Button>

          <Button variant="outline" size="lg" className="w-40">
            <span className="font-normal text-sm text-white">
              Explore Wines
            </span>
          </Button>
        </div>
      </section>
    </PageContainer>
  );
}
