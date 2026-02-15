interface GoogleMapComponentProps {
  className?: string;
}

export function GoogleMapComponent({ className }: GoogleMapComponentProps) {
  return (
    <div className={className}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3310.4839449620636!2d18.41893!3d-33.91483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc676c0b0b0b0b%3A0x0!2s19%20Dock%20Rd%2C%20V%26A%20Waterfront%2C%20Cape%20Town%2C%208001!5e0!3m2!1sen!2sza!4v1234567890123!5m2!1sen!2sza"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Lumière Dining Location - 19 Dock Road, Cape Town"
        className="w-full h-full"
      />
    </div>
  );
}
