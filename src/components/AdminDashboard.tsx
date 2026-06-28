import React from "react";
import { translations } from "../translations";
import { Booking } from "../types";

// Re-import icons safely from lucide-react in TS
import { 
  Lock, 
  Trash, 
  Check as IconCheck, 
  RefreshCw as IconRefresh, 
  LogOut as IconLogOut, 
  FileDown, 
  Filter,
  CheckCircle,
  Clock as IconClock,
  XCircle,
  FileSpreadsheet as IconSpreadsheet,
  ShieldCheck
} from "lucide-react";

interface AdminDashboardProps {
  currentLang: "en" | "ar" | "fr";
}

export default function AdminDashboard({ currentLang }: AdminDashboardProps) {
  const t = translations[currentLang];
  const isRtl = currentLang === "ar";

  const [authorized, setAuthorized] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [bookings, setBookings] = React.useState<Booking[]>([]);
  const [filter, setFilter] = React.useState<"All" | "Pending" | "Confirmed" | "Completed">("All");

  React.useEffect(() => {
    const isAuth = localStorage.getItem("ghader_admin_auth") === "true";
    if (isAuth) {
      setAuthorized(true);
    }
    loadBookings();
  }, []);

  const loadBookings = () => {
    const stored = localStorage.getItem("ghader_bookings");
    if (stored) {
      setBookings(JSON.parse(stored));
    } else {
      // Create some beautiful mock bookings to look exceptionally professional out-of-the-box
      const initialMock: Booking[] = [
        {
          id: "GT-4029-26",
          name: "Dr. Charles Dupont",
          email: "charles.dupont@sorbonne.fr",
          phone: "+33 612 34 56 78",
          whatsapp: "+33 612 34 56 78",
          passengers: 2,
          vehicleType: "Executive Sedan (Mercedes-Benz E-Class)",
          serviceType: "airport_transfer",
          pickupLocation: "Beirut Int'l Airport (Flight ME212)",
          destination: "Le Gray Hotel, Beirut Downtown",
          date: new Date().toISOString().split("T")[0],
          time: "14:30",
          flightNumber: "ME212",
          specialRequests: "Needs French speaking chauffeur, infant safety seat requested.",
          createdAt: new Date(Date.now() - 3600000).toISOString(),
          status: "Pending"
        },
        {
          id: "GT-9283-26",
          name: "Mariam Al-Khashab",
          email: "mariam.kh@riyadhbank.com.sa",
          phone: "+966 50 123 4567",
          whatsapp: "+966 50 123 4567",
          passengers: 4,
          vehicleType: "Minivan (Honda Odyssey)",
          serviceType: "tour",
          pickupLocation: "Movenpick Hotel Beirut",
          destination: "Byblos & Batroun Tour",
          date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
          time: "09:00",
          createdAt: new Date(Date.now() - 7200000).toISOString(),
          status: "Confirmed"
        },
        {
          id: "GT-1823-26",
          name: "James Wilson",
          email: "j.wilson@chevron.com",
          phone: "+1 (713) 555-8291",
          whatsapp: "+1 (713) 555-8291",
          passengers: 1,
          vehicleType: "Luxury Vehicle (Mercedes-Benz S-Class)",
          serviceType: "chauffeur",
          pickupLocation: "Beirut Airport VIP Terminal",
          destination: "Beirut Downtown Executive Meeting Area",
          date: new Date().toISOString().split("T")[0],
          time: "10:00",
          specialRequests: "Chauffeur with suit required. Discreet high-profile security VIP package.",
          createdAt: new Date(Date.now() - 28000000).toISOString(),
          status: "Completed"
        }
      ];
      setBookings(initialMock);
      localStorage.setItem("ghader_bookings", JSON.stringify(initialMock));
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "ghader2026") {
      setAuthorized(true);
      localStorage.setItem("ghader_admin_auth", "true");
      setPassword("");
    } else {
      alert("Invalid Security Password. Please use 'ghader2026' to log in.");
    }
  };

  const handleLogout = () => {
    setAuthorized(false);
    localStorage.removeItem("ghader_admin_auth");
  };

  const handleStatusChange = (bookingId: string, nextStatus: "Pending" | "Confirmed" | "Completed" | "Cancelled") => {
    const updated = bookings.map(b => b.id === bookingId ? { ...b, status: nextStatus } : b);
    setBookings(updated);
    localStorage.setItem("ghader_bookings", JSON.stringify(updated));
  };

  const handleDelete = (bookingId: string) => {
    if (window.confirm(`Are you sure you want to delete reservation ${bookingId}?`)) {
      const updated = bookings.filter(b => b.id !== bookingId);
      setBookings(updated);
      localStorage.setItem("ghader_bookings", JSON.stringify(updated));
    }
  };

  const exportToCSV = () => {
    const headers = "BookingID,CustomerName,Email,Phone,ServiceType,Pickup,Destination,Date,Time,Status\n";
    const rows = bookings.map(b => 
      `"${b.id}","${b.name}","${b.email}","${b.phone}","${b.serviceType}","${b.pickupLocation}","${b.destination}","${b.date}","${b.time}","${b.status}"`
    ).join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", `Ghader_Tourism_Bookings_${new Date().toISOString().split("T")[0]}.csv`);
    a.click();
  };

  const filteredBookings = bookings.filter(b => filter === "All" ? true : b.status === filter);

  if (!authorized) {
    return (
      <div className="max-w-md mx-auto my-16 bg-[#141414] border border-neutral-800 p-8 rounded-[32px] shadow-2xl text-center space-y-6" id="admin-login-card">
        <div className="w-12 h-12 rounded-full bg-brand-accent/15 flex items-center justify-center text-brand-accent border border-brand-accent/30 mx-auto">
          <Lock className="w-5 h-5" />
        </div>

        <div className="space-y-1.5">
          <h3 className="text-lg font-bold text-brand-text font-sans">{t.navAdmin} Access</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Please enter your administrator security password to manage and dispatch vehicle reservations in Lebanon.
          </p>
          <div className="bg-neutral-950 p-2.5 rounded border border-neutral-850 text-[10px] text-neutral-400 font-mono mt-2">
            🔑 Guest Demo Code: <span className="text-brand-accent font-bold">ghader2026</span>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Security Password"
            className="w-full bg-neutral-950 border border-neutral-850 rounded-xl p-3 text-center text-sm text-white focus:outline-none focus:border-brand-accent tracking-widest font-mono"
            required
            id="admin-password-input"
          />

          <button
            type="submit"
            className="w-full bg-brand-accent hover:bg-brand-accent-hover text-black font-extrabold text-xs py-3 rounded-xl cursor-pointer"
            id="admin-login-submit"
          >
            Authenticate Portal
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-[#141414] border border-neutral-800 rounded-[32px] p-6 md:p-8 space-y-6 text-left" id="admin-dashboard-container">
      {/* Dashboard Top Header */}
      <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-900 pb-5 ${isRtl ? "sm:flex-row-reverse text-right" : "text-left"}`}>
        <div className="space-y-1">
          <div className={`flex items-center gap-2 ${isRtl ? "flex-row-reverse" : ""}`}>
            <ShieldCheck className="w-5 h-5 text-brand-accent" />
            <h2 className="text-lg font-black text-brand-text uppercase tracking-wider font-sans">
              Ghader Tourism Management & Dispatch
            </h2>
          </div>
          <p className="text-xs text-neutral-400">
            Real-time ride tracking, customer support, and secure travel planning.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={exportToCSV}
            className="bg-neutral-900 hover:bg-neutral-850 text-white border border-neutral-800 hover:border-brand-accent text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <IconSpreadsheet className="w-3.5 h-3.5 text-brand-accent" />
            <span>CSV Export</span>
          </button>

          <button
            onClick={handleLogout}
            className="bg-neutral-950 text-rose-400 border border-rose-500/30 hover:bg-rose-500/10 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <IconLogOut className="w-3.5 h-3.5" />
            <span>Log out</span>
          </button>
        </div>
      </div>

      {/* Analytics stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-neutral-900/40 border border-neutral-850 p-4 rounded-2xl text-center">
          <span className="text-[10px] uppercase text-neutral-400 font-mono tracking-wider">Total Bookings</span>
          <span className="text-xl font-bold text-brand-text block mt-0.5">{bookings.length}</span>
        </div>
        <div className="bg-brand-accent/10 border border-brand-accent/20 p-4 rounded-2xl text-center text-brand-accent">
          <span className="text-[10px] uppercase text-neutral-400 font-mono tracking-wider">Confirmed Rides</span>
          <span className="text-xl font-bold block mt-0.5">{bookings.filter(b => b.status === "Confirmed").length}</span>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl text-center text-amber-400">
          <span className="text-[10px] uppercase text-neutral-400 font-mono tracking-wider">Pending Approvals</span>
          <span className="text-xl font-bold block mt-0.5">{bookings.filter(b => b.status === "Pending").length}</span>
        </div>
        <div className="bg-neutral-950 p-4 rounded-2xl text-center border border-neutral-850 text-neutral-400">
          <span className="text-[10px] uppercase text-neutral-400 font-mono tracking-wider">Completed Tours</span>
          <span className="text-xl font-bold text-neutral-400 block mt-0.5">{bookings.filter(b => b.status === "Completed").length}</span>
        </div>
      </div>

      {/* Filters bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-905 pb-4">
        <div className="flex gap-1.5">
          {(["All", "Pending", "Confirmed", "Completed"] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filter === f
                  ? "bg-brand-accent text-black"
                  : "bg-neutral-900 text-neutral-400 hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <button
          onClick={loadBookings}
          className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-lg cursor-pointer transition-colors"
          title="Refresh Data"
        >
          <IconRefresh className="w-4 h-4" />
        </button>
      </div>

      {/* Bookings Table / List */}
      <div className="overflow-x-auto border border-neutral-850 rounded-2xl bg-neutral-950/40">
        <table className="w-full text-xs text-left text-neutral-300">
          <thead className="text-[10px] bg-neutral-900/80 text-neutral-400 uppercase tracking-wider font-mono border-b border-neutral-850">
            <tr>
              <th className="px-4 py-3">Ref ID / Client</th>
              <th className="px-4 py-3">Trip Specifications</th>
              <th className="px-4 py-3">Pickup & Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-900">
            {filteredBookings.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-10 text-neutral-500 font-sans text-xs italic">
                  No reservations found matching this criteria.
                </td>
              </tr>
            ) : (
              filteredBookings.map((b) => (
                <tr key={b.id} className="hover:bg-neutral-900/45 transition-colors">
                  <td className="px-4 py-4 space-y-1 font-sans">
                    <span className="font-mono text-xs font-black text-brand-accent block">{b.id}</span>
                    <span className="font-bold text-white block">{b.name}</span>
                    <span className="text-[10px] text-neutral-500 block font-mono" dir="ltr">{b.phone}</span>
                    <span className="text-[10px] text-neutral-500 block truncate" style={{ maxWidth: "160px" }}>{b.email}</span>
                  </td>

                  <td className="px-4 py-4 space-y-1">
                    <span className="text-[10px] bg-neutral-900 text-neutral-300 border border-neutral-850 px-2 py-0.5 rounded font-bold">
                      {b.serviceType === "airport_transfer" ? "Airport Transfer" : b.serviceType === "tour" ? "Tour" : "Executive Driver"}
                    </span>
                    <p className="font-bold text-white pt-1">{b.vehicleType}</p>
                    <p className="text-neutral-400 text-[11px] leading-relaxed italic max-w-xs">{b.specialRequests || "No special requests."}</p>
                  </td>

                  <td className="px-4 py-4 space-y-1 font-mono">
                    <p className="text-white font-bold">{b.date} @ {b.time}</p>
                    <p className="text-neutral-400 text-[11px]">📍 {b.pickupLocation} → {b.destination}</p>
                    {b.flightNumber && <p className="text-[10px] text-sky-400">✈️ Flight: {b.flightNumber}</p>}
                  </td>

                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      b.status === "Confirmed" 
                        ? "bg-emerald-500/15 text-emerald-400"
                        : b.status === "Pending"
                        ? "bg-amber-500/15 text-amber-400"
                        : b.status === "Completed"
                        ? "bg-neutral-800 text-neutral-400"
                        : "bg-rose-500/15 text-rose-400"
                    }`}>
                      {b.status === "Confirmed" && <CheckCircle className="w-3 h-3" />}
                      {b.status === "Pending" && <IconClock className="w-3 h-3" />}
                      {b.status === "Completed" && <CheckCircle className="w-3 h-3 text-neutral-400" />}
                      {b.status === "Cancelled" && <XCircle className="w-3 h-3" />}
                      {b.status}
                    </span>
                  </td>

                  <td className="px-4 py-4 text-right space-y-1.5">
                    <div className="flex justify-end gap-1.5">
                      <button
                        onClick={() => handleStatusChange(b.id, "Confirmed")}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white p-1 rounded transition-colors cursor-pointer"
                        title="Confirm Booking"
                      >
                        <IconCheck className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleStatusChange(b.id, "Completed")}
                        className="bg-neutral-800 hover:bg-neutral-700 text-brand-accent p-1 rounded transition-colors cursor-pointer"
                        title="Mark Completed"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(b.id)}
                        className="bg-neutral-950 text-rose-500 hover:bg-rose-500/10 p-1 rounded border border-rose-500/20 transition-colors cursor-pointer"
                        title="Delete Records"
                      >
                        <Trash className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <a
                      href={`https://wa.me/${b.whatsapp.replace(/\+/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-[10px] text-emerald-400 underline hover:text-emerald-300 font-bold"
                    >
                      WhatsApp Client
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
