import { MapPin } from "lucide-react";
import { PaddingContainer } from "@/components/structure/PaddingContainer";
import { PageContainer } from "@/components/structure/PageContainer";

export default function ReservationPage() {
  return (
    <PageContainer showNavigation={true} showFooter={true}>
      <div className="flex lg:flex-row flex-col w-full lg:-mt-[52px] -mt-12">
        <div
          className="relative flex flex-col h-[100vh] lg:w-1/2 w-full items-center justify-center bg-cover bg-center lg:px-0 px-16"
          style={{ backgroundImage: `url(/reservation.jpg)` }}
        >
          <div className="absolute inset-0 lg:bg-gradient-to-l bg-gradient-to-t from-burgundy-950 via-burgundy-900/60 to-transparent pointer-events-none" />

          <div className="absolute lg:bottom-10 bottom-4 bg-stone-700/40 border border-burgundy-700/30 backdrop-blur-md rounded-2xl w-full xl:max-w-xl lg:max-w-md max-w-[320px]">
            <div className="flex flex-col gap-6 lg:px-9 px-5 py-6 z-20 opacity-100">
              <div className="flex flex-col gap-3">
                <h3 className="!font-extrabold xl:text-3xl text-2xl text-white">
                  Taste the{" "}
                  <span className="text-crimson-600">Extraordinary</span>
                </h3>
                <p className="font-normal xl:text-sm text-xxs text-white">
                  Immerse yourself in a culinary journey inspired by the
                  seasons.
                  <br className="hidden lg:block" /> Secure your tale for an
                  unforgettable moment.
                </p>
              </div>

              <div className="flex flex-row items-center gap-2">
                <MapPin size={20} className="fill-crimson-600 stroke-white" />
                <p className="font-normal xl:text-sm text-xxs text-white">
                  123 Culinary Avenue, Metropolis, South Africa 1559
                </p>
              </div>
            </div>
          </div>
        </div>

        <PaddingContainer size="large">
          <div></div>
        </PaddingContainer>
      </div>
    </PageContainer>
  );
}
