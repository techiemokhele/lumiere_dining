"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Navigation } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GoogleMapComponent } from "./GoogleMapComponent";

interface DirectionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DirectionsModal({ isOpen, onClose }: DirectionsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-burgundy-950 border-burgundy-700">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="font-serif font-bold text-2xl text-white flex items-center gap-2">
              <MapPin className="text-crimson-500" size={28} />
              Get Directions
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="flex flex-col gap-6 mt-4">
          <div className="flex flex-col gap-3 p-4 bg-burgundy-900 rounded-xl border border-burgundy-700">
            <h3 className="font-serif font-bold text-lg text-white">
              Our Location
            </h3>
            <p className="font-sans text-sm text-white/80 leading-relaxed">
              19 Dock Road, V&A Waterfront
              <br />
              Cape Town, 8001
              <br />
              South Africa
            </p>
          </div>

          <GoogleMapComponent className="w-full h-[350px] rounded-xl overflow-hidden border-2 border-burgundy-700 shadow-lg" />

          <div className="flex flex-col gap-4 p-4 bg-burgundy-900 rounded-xl border border-burgundy-700">
            <div className="flex items-center gap-2">
              <Navigation className="text-crimson-500" size={20} />
              <h3 className="font-serif font-bold text-lg text-white">
                How to Find Us
              </h3>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-crimson-500 flex items-center justify-center text-white text-xs font-bold">
                  1
                </div>
                <p className="font-sans text-sm text-white/80">
                  Navigate to the V&A Waterfront in Cape Town
                </p>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-crimson-500 flex items-center justify-center text-white text-xs font-bold">
                  2
                </div>
                <p className="font-sans text-sm text-white/80">
                  Look for Dock Road near the waterfront area
                </p>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-crimson-500 flex items-center justify-center text-white text-xs font-bold">
                  3
                </div>
                <p className="font-sans text-sm text-white/80">
                  We&apos;re located at number 19, with ample parking available
                  nearby
                </p>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-crimson-500 flex items-center justify-center text-white text-xs font-bold">
                  4
                </div>
                <p className="font-sans text-sm text-white/80">
                  Valet parking service is available at the entrance
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button
              asChild
              variant="default"
              size="lg"
              className="bg-crimson-600 hover:bg-crimson-500 flex items-center justify-center gap-2"
            >
              <Link href="tel:+27113453224">
                <Phone size={18} />
                <span>Call Us</span>
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-burgundy-700 bg-burgundy-900 hover:bg-burgundy-800 text-white flex items-center justify-center gap-2"
            >
              <Link href="/contact">
                <Mail size={18} />
                <span>Contact Form</span>
              </Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
