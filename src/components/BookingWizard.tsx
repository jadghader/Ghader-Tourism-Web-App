import React from "react";
import { Check, ArrowRight, ArrowLeft, Send, CheckCircle2, Calendar, MapPin, User, Car } from "lucide-react";
import { Language, ServiceType, Booking, Vehicle } from "../types";
import { translations } from "../translations";

interface BookingWizardProps {
  currentLang: Language;
  onBookingCompleted: (booking: Booking) => void;
  selectedVehicleId?: string; // Optional: user pre-selected from fleet page
}

// Fixed vehicles list matching the fleet page
const VEHICLES: { id: string; name: string; category: string; capacity: string; luggage: string; type: string }[] = [
  { id: "v1", name: "Hyundai Elantra / Kia Cerato", category: "Economy Sedan", capacity: "1-3", luggage: "2", type: "Sedan" },
  { id: "v2", name: "Mercedes E-Class", category: "Executive Sedan", capacity: "1-3", luggage: "3", type: "Sedan" },
  { id: "v3", name: "Mercedes S-Class / VIP SUV", category: "Luxury Vehicle", capacity: "1-3", luggage: "3", type: "SUV" },
  { id: "v4", name: "Honda Odyssey / Kia Carnival", category: "Minivan", capacity: "Up to 7", luggage: "5", type: "Luxury Minivan" },
  { id: "v5", name: "Mercedes Sprinter VIP", category: "Van", capacity: "8-15", luggage: "12", type: "Buses" }
];

const TOURS = [
  { id: "t1", name: "Byblos & Batroun Coastal Tour" },
  { id: "t2", name: "Jeita Grotto & Harissa heights Tour" },
  { id: "t3", name: "Cedars of God & Bcharre Highland Tour" },
  { id: "t4", name: "Colossal Baalbek Roman Temples Tour" },
  { id: "custom", name: "Custom Personalized Tour Itinerary" }
];

export default function BookingWizard({ currentLang, onBookingCompleted, selectedVehicleId }: BookingWizardProps) {
  const t = translations[currentLang];
  const isRtl = currentLang === "ar";

  const [step, setStep] = React.useState(1);
  const [serviceType, setServiceType] = React.useState<ServiceType>("airport_transfer");
  
  // Trip details
  const [pickup, setPickup] = React.useState("");
  const [destination, setDestination] = React.useState("");
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("");
  const [flightNo, setFlightNo] = React.useState("");
  const [selectedTour, setSelectedTour] = React.useState("t1");
  
  // Vehicle
  const [selectedVehicle, setSelectedVehicle] = React.useState(selectedVehicleId || "v1");
  
  // Customer
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [whatsapp, setWhatsapp] = React.useState("");
  const [passengers, setPassengers] = React.useState(1);
  const [requests, setRequests] = React.useState("");

  const [refCode, setRefCode] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);

  // Sync if pre-selected vehicle changes
  React.useEffect(() => {
    if (selectedVehicleId) {
      setSelectedVehicle(selectedVehicleId);
      setStep(3); // Jump to customer details or show pre-selected vehicle
    }
  }, [selectedVehicleId]);

  const handleNext = () => {
    if (step === 2) {
      // Validate step 2
      if (serviceType === "airport_transfer" && (!pickup || !destination || !date || !time)) {
        alert(currentLang === "ar" ? "يرجى ملء جميع الحقول المطلوبة" : "Please fill in all required fields.");
        return;
      }
      if (serviceType === "tour" && (!pickup || !date || !time)) {
        alert(currentLang === "ar" ? "يرجى تحديد موقع الركوب والتاريخ والوقت" : "Please fill in pickup location, date, and time.");
        return;
      }
    }
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !whatsapp) {
      alert(currentLang === "ar" ? "يرجى ملء تفاصيل الاتصال المطلوبة" : "Please fill in required contact details.");
      return;
    }

    setSubmitting(true);
    
    // Generate simple premium booking reference code
    const randomCode = `GT-${Math.floor(1000 + Math.random() * 9000)}-${new Date().getFullYear().toString().slice(-2)}`;
    setRefCode(randomCode);

    const vehicleObj = VEHICLES.find(v => v.id === selectedVehicle);

    const newBooking: Booking = {
      id: randomCode,
      name,
      email,
      phone,
      whatsapp,
      passengers,
      vehicleType: vehicleObj ? `${vehicleObj.category} (${vehicleObj.name})` : "Economy Sedan",
      serviceType,
      pickupLocation: serviceType === "airport_transfer" ? pickup : pickup || "Hotel Pickup",
      destination: serviceType === "airport_transfer" ? destination : serviceType === "tour" ? TOURS.find(t => t.id === selectedTour)?.name || "Private Tour" : "Daily Chauffeur Service",
      date,
      time,
      flightNumber: serviceType === "airport_transfer" ? flightNo : undefined,
      tourId: serviceType === "tour" ? selectedTour : undefined,
      specialRequests: requests,
      createdAt: new Date().toISOString(),
      status: "Pending"
    };

    // Save to local storage for persistence & admin display
    const existingBookingsRaw = localStorage.getItem("ghader_bookings");
    const existingBookings = existingBookingsRaw ? JSON.parse(existingBookingsRaw) : [];
    localStorage.setItem("ghader_bookings", JSON.stringify([newBooking, ...existingBookings]));

    setTimeout(() => {
      setSubmitting(false);
      setStep(5);
      onBookingCompleted(newBooking);
    }, 1200);
  };

  const selectedVehicleInfo = VEHICLES.find(v => v.id === selectedVehicle);

  // Generate a custom WhatsApp message url
  const getWhatsAppLink = () => {
    const serviceLabel = serviceType === "airport_transfer" ? "Airport Transfer" : serviceType === "tour" ? "Day Tour" : "Private Chauffeur";
    const destText = serviceType === "airport_transfer" ? destination : serviceType === "tour" ? TOURS.find(t => t.id === selectedTour)?.name : "Full Day Charter";
    const msg = `Hello Ghader Tourism, I would like to confirm my booking request:
- *Reference Code*: ${refCode}
- *Client*: ${name}
- *Service*: ${serviceLabel}
- *Date/Time*: ${date} at ${time}
- *Pickup*: ${pickup}
- *Destination/Tour*: ${destText}
- *Vehicle*: ${selectedVehicleInfo?.category} (${selectedVehicleInfo?.name})
- *Passengers*: ${passengers}
- *WhatsApp*: ${whatsapp}
- *Requests*: ${requests || "None"}`;
    return `https://wa.me/9613460865?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="bg-brand-card border border-brand-border rounded-[32px] shadow-2xl overflow-hidden text-brand-text" id="booking-wizard">
      
      {/* Wizard Header Progress Bar */}
      <div className="bg-brand-input px-6 py-5 border-b border-brand-border/40">
        <div className="flex justify-between items-center text-xs text-brand-muted font-medium mb-3">
          <span className="font-semibold text-brand-accent">{t.bookingFormTitle}</span>
          <span>{currentLang === "ar" ? `الخطوة ${step} من 5` : `Step ${step} of 5`}</span>
        </div>
        
        {/* Progress indicators */}
        <div className="flex items-center gap-1.5 h-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`h-full flex-1 rounded-full transition-all duration-300 ${
                s <= step ? "bg-brand-accent" : "bg-brand-border"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="p-5 sm:p-6 md:p-8">
        {/* STEP 1: SELECT SERVICE TYPE */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in" id="step-1">
            <h3 className="text-lg md:text-xl font-extrabold text-brand-accent tracking-tight mb-2">{t.selectServiceType}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <button
                type="button"
                onClick={() => setServiceType("airport_transfer")}
                className={`p-5 rounded-2xl border transition-all text-left flex flex-col justify-between cursor-pointer group active:scale-[0.98] ${
                  serviceType === "airport_transfer"
                    ? "bg-brand-accent/10 border-brand-accent text-brand-text shadow-md shadow-brand-accent/5"
                    : "border-brand-border bg-brand-input/60 hover:bg-brand-input hover:border-brand-border"
                } ${isRtl ? "text-right items-end" : "text-left"}`}
              >
                <div className="w-11 h-11 rounded-xl bg-brand-input flex items-center justify-center text-brand-accent group-hover:scale-105 transition-transform border border-brand-border/40">
                  <MapPin className="w-5.5 h-5.5" />
                </div>
                <div className="mt-4">
                  <span className="font-extrabold text-sm md:text-base block">{t.serviceAirport}</span>
                  <span className="text-xs text-brand-muted block mt-1 leading-relaxed">
                    {currentLang === "ar" ? "استقبال ومغادرة مع تتبع رحلات الطيران" : currentLang === "fr" ? "Accueil terminal & suivi des vols" : "Meet & greet with flight tracking"}
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setServiceType("tour")}
                className={`p-5 rounded-2xl border transition-all text-left flex flex-col justify-between cursor-pointer group active:scale-[0.98] ${
                  serviceType === "tour"
                    ? "bg-brand-accent/10 border-brand-accent text-brand-text shadow-md shadow-brand-accent/5"
                    : "border-brand-border bg-brand-input/60 hover:bg-brand-input hover:border-brand-border"
                } ${isRtl ? "text-right items-end" : "text-left"}`}
              >
                <div className="w-11 h-11 rounded-xl bg-brand-input flex items-center justify-center text-brand-accent group-hover:scale-105 transition-transform border border-brand-border/40">
                  <Calendar className="w-5.5 h-5.5" />
                </div>
                <div className="mt-4">
                  <span className="font-extrabold text-sm md:text-base block">{t.serviceTour}</span>
                  <span className="text-xs text-brand-muted block mt-1 leading-relaxed">
                    {currentLang === "ar" ? "جبيل، البترون، بعلبك وأعالي حريصا" : currentLang === "fr" ? "Byblos, Harissa, Cedars & Baalbek" : "Byblos, Harissa, Cedars & Baalbek"}
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setServiceType("chauffeur")}
                className={`p-5 rounded-2xl border transition-all text-left flex flex-col justify-between cursor-pointer group active:scale-[0.98] ${
                  serviceType === "chauffeur"
                    ? "bg-brand-accent/10 border-brand-accent text-brand-text shadow-md shadow-brand-accent/5"
                    : "border-brand-border bg-brand-input/60 hover:bg-brand-input hover:border-brand-border"
                } ${isRtl ? "text-right items-end" : "text-left"}`}
              >
                <div className="w-11 h-11 rounded-xl bg-brand-input flex items-center justify-center text-brand-accent group-hover:scale-105 transition-transform border border-brand-border/40">
                  <Car className="w-5.5 h-5.5" />
                </div>
                <div className="mt-4">
                  <span className="font-extrabold text-sm md:text-base block">{t.serviceChauffeur}</span>
                  <span className="text-xs text-brand-muted block mt-1 leading-relaxed">
                    {currentLang === "ar" ? "سائق محترف خاص متاح طوال اليوم" : currentLang === "fr" ? "Chauffeur privé disponible 24h" : "Dedicated executive local driver"}
                  </span>
                </div>
              </button>
            </div>

            <div className={`flex justify-end pt-4 ${isRtl ? "justify-start" : ""}`}>
              <button
                onClick={handleNext}
                className="w-full sm:w-auto bg-brand-accent hover:bg-brand-accent-hover text-brand-bg font-extrabold text-sm md:text-xs px-8 py-3.5 h-12 min-h-[48px] rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-[0.98] transition-all"
              >
                <span>{currentLang === "ar" ? "التالي" : "Continue"}</span>
                <ArrowRight className="w-4.5 h-4.5 text-brand-bg" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: TRIP DETAILS */}
        {step === 2 && (
          <div className="space-y-5 animate-fade-in text-brand-text" id="step-2">
            <h3 className="text-lg md:text-xl font-extrabold text-brand-accent tracking-tight mb-2">
              {currentLang === "ar" ? "تفاصيل رحلتك" : currentLang === "fr" ? "Détails de l'itinéraire" : "Your Trip Details"}
            </h3>

            {/* Airport Transfer Specific */}
            {serviceType === "airport_transfer" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-brand-muted block">{t.pickupLocation} *</label>
                  <input
                    type="text"
                    required
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    placeholder={t.pickupPlaceholder}
                    className="w-full bg-brand-input border border-brand-border rounded-xl px-4 py-3.5 text-base md:text-sm h-12 md:h-11 text-brand-text focus:outline-none focus:border-brand-accent placeholder-brand-muted/40 transition-all duration-200"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-brand-muted block">{t.destination} *</label>
                  <input
                    type="text"
                    required
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder={t.destinationPlaceholder}
                    className="w-full bg-brand-input border border-brand-border rounded-xl px-4 py-3.5 text-base md:text-sm h-12 md:h-11 text-brand-text focus:outline-none focus:border-brand-accent placeholder-brand-muted/40 transition-all duration-200"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-brand-muted block">{t.flightNumber}</label>
                  <input
                    type="text"
                    value={flightNo}
                    onChange={(e) => setFlightNo(e.target.value)}
                    placeholder={t.flightPlaceholder}
                    className="w-full bg-brand-input border border-brand-border rounded-xl px-4 py-3.5 text-base md:text-sm h-12 md:h-11 text-brand-text focus:outline-none focus:border-brand-accent placeholder-brand-muted/40 transition-all duration-200"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-brand-muted block">{t.date} *</label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-brand-input border border-brand-border rounded-xl px-4 py-3.5 text-base md:text-sm h-12 md:h-11 text-brand-text focus:outline-none focus:border-brand-accent transition-all duration-200"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-brand-muted block">{t.time} *</label>
                    <input
                      type="time"
                      required
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-brand-input border border-brand-border rounded-xl px-4 py-3.5 text-base md:text-sm h-12 md:h-11 text-brand-text focus:outline-none focus:border-brand-accent transition-all duration-200"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Day Tour Specific */}
            {serviceType === "tour" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-brand-muted block">
                    {currentLang === "ar" ? "منطقة الجولة السياحية" : currentLang === "fr" ? "Sélectionnez le circuit" : "Select Featured Tour"}
                  </label>
                  <select
                    value={selectedTour}
                    onChange={(e) => setSelectedTour(e.target.value)}
                    className="w-full bg-brand-input border border-brand-border rounded-xl px-4 py-3 text-base md:text-sm h-12 md:h-11 text-brand-text focus:outline-none focus:border-brand-accent transition-all duration-200"
                  >
                    {TOURS.map(tour => (
                      <option key={tour.id} value={tour.id} className="bg-brand-card text-brand-text">
                        {tour.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-brand-muted block">{t.pickupLocation} *</label>
                  <input
                    type="text"
                    required
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    placeholder="e.g., Hotel Name in Beirut"
                    className="w-full bg-brand-input border border-brand-border rounded-xl px-4 py-3.5 text-base md:text-sm h-12 md:h-11 text-brand-text focus:outline-none focus:border-brand-accent placeholder-brand-muted/40 transition-all duration-200"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3 md:col-span-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-brand-muted block">{t.date} *</label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-brand-input border border-brand-border rounded-xl px-4 py-3.5 text-base md:text-sm h-12 md:h-11 text-brand-text focus:outline-none focus:border-brand-accent transition-all duration-200"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-brand-muted block">{t.time} *</label>
                    <input
                      type="time"
                      required
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-brand-input border border-brand-border rounded-xl px-4 py-3.5 text-base md:text-sm h-12 md:h-11 text-brand-text focus:outline-none focus:border-brand-accent transition-all duration-200"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Chauffeur Specific */}
            {serviceType === "chauffeur" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-brand-muted block">{t.pickupLocation} *</label>
                  <input
                    type="text"
                    required
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    placeholder="e.g., Beirut International Airport, Hotel"
                    className="w-full bg-brand-input border border-brand-border rounded-xl px-4 py-3.5 text-base md:text-sm h-12 md:h-11 text-brand-text focus:outline-none focus:border-brand-accent placeholder-brand-muted/40 transition-all duration-200"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-brand-muted block">
                    {currentLang === "ar" ? "منطقة الخدمة المطلوبة" : "Intended Destinations / Service Area"}
                  </label>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="e.g., Mount Lebanon & South, or Beirut area"
                    className="w-full bg-brand-input border border-brand-border rounded-xl px-4 py-3.5 text-base md:text-sm h-12 md:h-11 text-brand-text focus:outline-none focus:border-brand-accent placeholder-brand-muted/40 transition-all duration-200"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3 md:col-span-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-brand-muted block">{t.date} *</label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-brand-input border border-brand-border rounded-xl px-4 py-3.5 text-base md:text-sm h-12 md:h-11 text-brand-text focus:outline-none focus:border-brand-accent transition-all duration-200"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-brand-muted block">{t.time} *</label>
                    <input
                      type="time"
                      required
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-brand-input border border-brand-border rounded-xl px-4 py-3.5 text-base md:text-sm h-12 md:h-11 text-brand-text focus:outline-none focus:border-brand-accent transition-all duration-200"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className={`flex gap-3 pt-4 ${isRtl ? "flex-row-reverse" : "flex-row"}`}>
              <button
                onClick={handlePrev}
                className="flex-1 sm:flex-initial bg-brand-input hover:bg-brand-border border border-brand-border text-brand-text font-bold text-sm md:text-xs px-5 h-12 min-h-[48px] rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-[0.98]"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{currentLang === "ar" ? "السابق" : "Back"}</span>
              </button>

              <button
                onClick={handleNext}
                className="flex-[2] sm:flex-initial bg-brand-accent hover:bg-brand-accent-hover text-brand-bg font-extrabold text-sm md:text-xs px-6 h-12 min-h-[48px] rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-lg transition-all active:scale-[0.98]"
              >
                <span>{currentLang === "ar" ? "التالي" : "Next"}</span>
                <ArrowRight className="w-4.5 h-4.5 text-brand-bg" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: VEHICLE SELECTION */}
        {step === 3 && (
          <div className="space-y-5 animate-fade-in text-brand-text" id="step-3">
            <h3 className="text-lg md:text-xl font-extrabold text-brand-accent tracking-tight mb-2">{t.vehicleType}</h3>
            
            <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
              {VEHICLES.map((vehicle) => (
                <label
                  key={vehicle.id}
                  className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4.5 rounded-2xl border transition-all cursor-pointer active:scale-[0.99] duration-150 ${
                    selectedVehicle === vehicle.id
                      ? "bg-brand-accent/10 border-brand-accent text-brand-text shadow-md shadow-brand-accent/5"
                      : "border-brand-border bg-brand-input/60 hover:bg-brand-input"
                  } ${isRtl ? "sm:flex-row-reverse text-right" : "text-left"}`}
                >
                  <div className={`flex items-center gap-3.5 ${isRtl ? "flex-row-reverse" : ""}`}>
                    <input
                      type="radio"
                      name="vehicle"
                      value={vehicle.id}
                      checked={selectedVehicle === vehicle.id}
                      onChange={() => setSelectedVehicle(vehicle.id)}
                      className="accent-brand-accent h-5 w-5 cursor-pointer shrink-0"
                    />
                    <div>
                      <span className="font-extrabold text-sm md:text-base block text-brand-text">{vehicle.category}</span>
                      <span className="text-xs text-brand-muted block mt-0.5 font-medium">{vehicle.name}</span>
                      <span className="text-[10px] md:text-xs text-brand-muted/70 block mt-1.5 font-mono">
                        {t.capacityPax}: {vehicle.capacity} | {t.capacityLuggage}: {vehicle.luggage}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-3 sm:mt-0 bg-brand-accent/10 text-brand-accent px-3 py-1.5 rounded-xl border border-brand-accent/20 text-[10px] md:text-xs font-mono font-bold uppercase tracking-wider">
                    {vehicle.type}
                  </div>
                </label>
              ))}
            </div>

            <div className={`flex gap-3 pt-4 ${isRtl ? "flex-row-reverse" : "flex-row"}`}>
              <button
                onClick={handlePrev}
                className="flex-1 sm:flex-initial bg-brand-input hover:bg-brand-border border border-brand-border text-brand-text font-bold text-sm md:text-xs px-5 h-12 min-h-[48px] rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-[0.98]"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{currentLang === "ar" ? "السابق" : "Back"}</span>
              </button>

              <button
                onClick={handleNext}
                className="flex-[2] sm:flex-initial bg-brand-accent hover:bg-brand-accent-hover text-brand-bg font-extrabold text-sm md:text-xs px-6 h-12 min-h-[48px] rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-lg transition-all active:scale-[0.98]"
              >
                <span>{currentLang === "ar" ? "التالي" : "Next"}</span>
                <ArrowRight className="w-4.5 h-4.5 text-brand-bg" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: CUSTOMER INFORMATION */}
        {step === 4 && (
          <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in text-brand-text" id="step-4">
            <h3 className="text-lg md:text-xl font-extrabold text-brand-accent tracking-tight mb-2">
              {currentLang === "ar" ? "معلوماتك الشخصية" : "Customer Contact Information"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand-muted block">{t.fullName} *</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., John Doe"
                    className="w-full bg-brand-input border border-brand-border rounded-xl px-4 py-3.5 text-base md:text-sm h-12 md:h-11 text-brand-text focus:outline-none focus:border-brand-accent placeholder-brand-muted/40 transition-all duration-200"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand-muted block">{t.emailAddress} *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g., john@example.com"
                  className="w-full bg-brand-input border border-brand-border rounded-xl px-4 py-3.5 text-base md:text-sm h-12 md:h-11 text-brand-text focus:outline-none focus:border-brand-accent placeholder-brand-muted/40 transition-all duration-200"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand-muted block">{t.phoneNumber} *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g., +1 (555) 000-0000"
                  className="w-full bg-brand-input border border-brand-border rounded-xl px-4 py-3.5 text-base md:text-sm h-12 md:h-11 text-brand-text focus:outline-none focus:border-brand-accent placeholder-brand-muted/40 transition-all duration-200"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand-muted block">{t.whatsappNumber} *</label>
                <input
                  type="tel"
                  required
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="e.g., +1 (555) 000-0000"
                  className="w-full bg-brand-input border border-brand-border rounded-xl px-4 py-3.5 text-base md:text-sm h-12 md:h-11 text-brand-text focus:outline-none focus:border-brand-accent placeholder-brand-muted/40 transition-all duration-200"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand-muted block">{t.passengers} *</label>
                <input
                  type="number"
                  min="1"
                  max="15"
                  required
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                  className="w-full bg-brand-input border border-brand-border rounded-xl px-4 py-3.5 text-base md:text-sm h-12 md:h-11 text-brand-text focus:outline-none focus:border-brand-accent transition-all duration-200"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-brand-muted block">{t.specialRequests}</label>
                <textarea
                  value={requests}
                  onChange={(e) => setRequests(e.target.value)}
                  placeholder="Child safety seats, excess luggage, custom stops, language preference, etc."
                  rows={2}
                  className="w-full bg-brand-input border border-brand-border rounded-xl p-4 text-base md:text-sm text-brand-text focus:outline-none focus:border-brand-accent placeholder-brand-muted/40 transition-all duration-200"
                />
              </div>
            </div>

            <div className={`flex gap-3 pt-4 ${isRtl ? "flex-row-reverse" : "flex-row"}`}>
              <button
                type="button"
                onClick={handlePrev}
                className="flex-1 sm:flex-initial bg-brand-input hover:bg-brand-border border border-brand-border text-brand-text font-bold text-sm md:text-xs px-5 h-12 min-h-[48px] rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-[0.98]"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{currentLang === "ar" ? "السابق" : "Back"}</span>
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="flex-[2] sm:flex-initial bg-brand-accent hover:bg-brand-accent-hover text-brand-bg font-extrabold text-sm md:text-xs px-6 h-12 min-h-[48px] rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-lg disabled:opacity-50 transition-all active:scale-[0.98]"
              >
                <Send className="w-4.5 h-4.5 text-brand-bg" />
                <span>{submitting ? t.submittingBooking : t.checkAvailability}</span>
              </button>
            </div>
          </form>
        )}

        {/* STEP 5: BOOKING CONFIRMATION & WHATSAPP ACTION */}
        {step === 5 && (
          <div className="space-y-6 text-center py-6 animate-fade-in" id="step-5">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-brand-accent/10 border border-brand-accent/40 flex items-center justify-center text-brand-accent">
                <CheckCircle2 className="w-10 h-10 animate-pulse" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-brand-text">{t.bookingSuccess}</h3>
              <p className="text-xs text-brand-muted max-w-md mx-auto">{t.bookingSuccessNextSteps}</p>
            </div>

            {/* Reference Box */}
            <div className="bg-brand-input rounded-2xl border border-brand-border p-6 max-w-sm mx-auto space-y-2">
              <span className="text-[10px] uppercase tracking-wider text-brand-muted block font-mono">{t.bookingRefCode}</span>
              <span className="text-lg font-bold text-brand-accent tracking-widest font-mono block select-all">{refCode}</span>
              
              <div className="border-t border-brand-border/40 my-2 pt-2 text-[11px] text-brand-muted">
                <span>{t.selectedVehicleLabel} </span>
                <span className="font-bold text-brand-text">{selectedVehicleInfo?.category}</span>
              </div>
            </div>

            {/* Complete via WhatsApp */}
            <div className="pt-2">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm px-8 py-3.5 rounded-2xl transition-all shadow-lg transform hover:scale-[1.01] cursor-pointer font-sans"
                id="whatsapp-confirm-btn"
              >
                <Send className="w-4 h-4 text-white" />
                <span>{t.contactViaWhatsAppReservation}</span>
              </a>
            </div>

            <div>
              <button
                onClick={() => {
                  setStep(1);
                  setPickup("");
                  setDestination("");
                  setRequests("");
                  setRefCode("");
                }}
                className="text-xs text-brand-muted hover:text-brand-text underline transition-colors cursor-pointer font-sans"
              >
                {t.submitAnother}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
