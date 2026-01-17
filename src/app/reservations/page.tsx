import { ArrowRight, MapPin } from "lucide-react";
import { PaddingContainer } from "@/components/structure/PaddingContainer";
import { PageContainer } from "@/components/structure/PageContainer";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
          <div className="flex flex-col lg:gap-6 gap-10 w-full px-4 md:px-20 xl:px-4 py-10">
            <div className="flex flex-col gap-2">
              <h2 className="!font-extrabold xl:text-4xl lg:text-3xl text-3xl text-white">
                Secure Your Table
              </h2>
              <p className="font-normal lg:text-sm text-xs text-white-60">
                Complete the form below to confirm your reservation.
              </p>
            </div>

            <div className="border-t border-burgundy-800" />

            <div className="flex flex-col w-full gap-4">
              <div className="flex flex-row w-full items-center gap-2">
                <Checkbox />
                <p className="font-normal lg:text-sm text-xxs text-white">
                  I agree with the{" "}
                  <Link
                    href="/legal/cancellation-policy"
                    className="underline underline-offset-2"
                  >
                    Cancellation Policy
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="underline underline-offset-2">
                    Terms of Service
                  </Link>
                </p>
              </div>
              <Button
                variant="default"
                size="lg"
                className="flex flex-row gap-2 items-center justify-center"
              >
                <span>Complete Reservation</span>
                <ArrowRight size="12" className="text-white" />
              </Button>

              <div className="flex items-center justify-center">
                <p className="font-normal lg:text-sm text-xxs text-white-60">
                  Powered by Lumiere Table Management
                </p>
              </div>
            </div>
          </div>
        </PaddingContainer>
      </div>
    </PageContainer>
  );
}
