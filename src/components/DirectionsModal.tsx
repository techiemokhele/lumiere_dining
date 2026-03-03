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
      <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto bg-burgundy-950 border-burgundy-700 p-4 sm:p-6">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="font-bold text-xl sm:text-2xl text-white-100 flex items-center gap-2">
              <MapPin className="text-crimson-500 shrink-0" size={24} />
              Get Directions
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="flex flex-col gap-4 sm:gap-6 mt-4">
          <div className="flex flex-col gap-2 sm:gap-3 p-3 sm:p-4 bg-burgundy-900 rounded-xl border border-burgundy-700">
            <h3 className="font-bold text-sm text-white-100">Our Location</h3>
            <p className="lg:text-sm text-xs text-white-60 leading-relaxed break-words">
              19 Dock Road, V&A Waterfront
              <br />
              Cape Town, 8001
              <br />
              South Africa
            </p>
          </div>

          <GoogleMapComponent className="w-full h-[220px] sm:h-[350px] rounded-xl overflow-hidden border-2 border-burgundy-700 shadow-lg" />

          <div className="flex flex-col gap-3 sm:gap-4 p-3 sm:p-4 bg-burgundy-900 rounded-xl border border-burgundy-700">
            <div className="flex items-center gap-2">
              <Navigation className="text-crimson-500 shrink-0" size={18} />
              <h3 className="font-bold text-sm text-white-100">
                How to Find Us
              </h3>
            </div>

            <div className="flex flex-col gap-3">
              {[
                "Navigate to the V&A Waterfront in Cape Town",
                "Look for Dock Road near the waterfront area",
                "We're located at number 19, with ample parking available nearby",
                "Valet parking service is available at the entrance",
              ].map((step, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-crimson-500 flex items-center justify-center text-white text-xs font-bold">
                    {i + 1}
                  </div>
                  <p className="lg:text-sm text-xs text-white-60 leading-relaxed">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              asChild
              size="lg"
              className="bg-crimson-600 hover:bg-crimson-500 flex items-center justify-center gap-2 w-full rounded-full"
            >
              <Link href="tel:0648473363">
                <Phone size={18} />
                <span>Call Us</span>
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-burgundy-700 bg-burgundy-900 hover:bg-burgundy-800 text-white-100 flex items-center justify-center gap-2 w-full rounded-full"
            >
              <Link href="/contact-us">
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
