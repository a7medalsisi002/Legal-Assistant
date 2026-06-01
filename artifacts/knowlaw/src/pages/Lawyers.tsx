import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Star, MapPin, Clock, X, Calendar } from "lucide-react";

const lawyers = [
  { id: 1, name: "Dr. Amira El-Sayed", arName: "د. أميرة السيد", specialty: "Family Law", arSpecialty: "قانون الأسرة", city: "Cairo", arCity: "القاهرة", rating: 4.9, years: 15, price: 600 },
  { id: 2, name: "Adv. Karim Mansour", arName: "أ. كريم منصور", specialty: "Criminal Law", arSpecialty: "قانون جنائي", city: "Alexandria", arCity: "الإسكندرية", rating: 4.7, years: 20, price: 800 },
  { id: 3, name: "Dr. Nour Abdel-Fattah", arName: "د. نور عبد الفتاح", specialty: "Civil Law", arSpecialty: "قانون مدني", city: "Giza", arCity: "الجيزة", rating: 4.8, years: 12, price: 500 },
  { id: 4, name: "Adv. Hossam El-Din", arName: "أ. حسام الدين", specialty: "Labor Law", arSpecialty: "قانون العمل", city: "Cairo", arCity: "القاهرة", rating: 4.6, years: 8, price: 400 },
  { id: 5, name: "Dr. Layla Ibrahim", arName: "د. ليلى إبراهيم", specialty: "Investment Law", arSpecialty: "قانون الاستثمار", city: "Cairo", arCity: "القاهرة", rating: 5.0, years: 25, price: 1200 },
  { id: 6, name: "Adv. Tarek Hassan", arName: "أ. طارق حسن", specialty: "Real Estate", arSpecialty: "عقارات", city: "Alexandria", arCity: "الإسكندرية", rating: 4.5, years: 10, price: 450 },
];

const specialties = ["All", "Family Law", "Criminal Law", "Civil Law", "Labor Law", "Investment Law", "Real Estate", "Commercial Law"];
const cities = ["All", "Cairo", "Alexandria", "Giza", "Luxor", "Aswan", "Sharm El-Sheikh"];

const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"];

export default function Lawyers() {
  const { language } = useAppContext();
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("All");
  const [city, setCity] = useState("All");
  const [bookingLawyer, setBookingLawyer] = useState<typeof lawyers[0] | null>(null);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const tx = {
    en: {
      title: "Find a Lawyer",
      sub: "Connect with verified Egyptian legal professionals",
      search_ph: "Search by name...",
      specialty_label: "Specialty",
      city_label: "City",
      all: "All",
      experience: "yrs exp.",
      per_hour: "/ hr",
      view: "View Profile",
      book: "Book Appointment",
      book_title: "Book Appointment with",
      select_date: "Select Date",
      select_time: "Select Time",
      confirm: "Confirm Booking",
      confirmed: "Appointment Booked!",
      confirmed_msg: "Your appointment has been confirmed. You will receive a confirmation email shortly.",
      close: "Close",
      no_results: "No lawyers match your search.",
    },
    ar: {
      title: "ابحث عن محامٍ",
      sub: "تواصل مع متخصصين قانونيين مصريين معتمدين",
      search_ph: "البحث بالاسم...",
      specialty_label: "التخصص",
      city_label: "المدينة",
      all: "الكل",
      experience: "سنة خبرة",
      per_hour: "/ ساعة",
      view: "عرض الملف",
      book: "حجز موعد",
      book_title: "حجز موعد مع",
      select_date: "اختر التاريخ",
      select_time: "اختر الوقت",
      confirm: "تأكيد الحجز",
      confirmed: "تم تأكيد الموعد!",
      confirmed_msg: "تم تأكيد موعدك. ستصلك رسالة تأكيد بالبريد الإلكتروني قريباً.",
      close: "إغلاق",
      no_results: "لا يوجد محامون يطابقون بحثك.",
    }
  }[language];

  const arSpecialtyMap: Record<string, string> = { "Family Law": "قانون الأسرة", "Criminal Law": "قانون جنائي", "Civil Law": "قانون مدني", "Labor Law": "قانون العمل", "Investment Law": "قانون الاستثمار", "Real Estate": "عقارات", "Commercial Law": "قانون تجاري" };
  const arCityMap: Record<string, string> = { Cairo: "القاهرة", Alexandria: "الإسكندرية", Giza: "الجيزة", Luxor: "الأقصر", Aswan: "أسوان", "Sharm El-Sheikh": "شرم الشيخ" };

  const filtered = lawyers.filter(l => {
    const nameMatch = l.name.toLowerCase().includes(search.toLowerCase()) || l.arName.includes(search);
    const specMatch = specialty === "All" || l.specialty === specialty;
    const cityMatch = city === "All" || l.city === city;
    return nameMatch && specMatch && cityMatch;
  });

  const nextDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return d;
  });

  const initials = (name: string) => name.split(" ").filter(w => w !== "Dr." && w !== "Adv.").slice(0, 2).map(w => w[0]).join("");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 py-10 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-secondary mb-2">{tx.title}</h1>
            <p className="text-muted-foreground">{tx.sub}</p>
          </div>

          {/* Filters */}
          <div className="bg-card border border-border rounded-xl p-4 mb-8 flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={search} onChange={e => setSearch(e.target.value)} placeholder={tx.search_ph} className="ps-9" data-testid="input-lawyer-search" />
            </div>
            <select value={specialty} onChange={e => setSpecialty(e.target.value)} className="rounded-md border border-input bg-background px-3 py-2 text-sm min-w-[160px]" data-testid="select-specialty">
              {specialties.map(s => <option key={s} value={s}>{s === "All" ? tx.all : (language === 'ar' ? arSpecialtyMap[s] || s : s)}</option>)}
            </select>
            <select value={city} onChange={e => setCity(e.target.value)} className="rounded-md border border-input bg-background px-3 py-2 text-sm min-w-[140px]" data-testid="select-city">
              {cities.map(c => <option key={c} value={c}>{c === "All" ? tx.all : (language === 'ar' ? arCityMap[c] || c : c)}</option>)}
            </select>
          </div>

          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">{tx.no_results}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map(l => (
                <div key={l.id} className="bg-card border border-border rounded-xl p-5 hover:shadow-md hover:border-primary/30 transition-all" data-testid={`lawyer-card-${l.id}`}>
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-white font-bold text-sm shrink-0">{initials(l.name)}</div>
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground text-sm truncate">{language === 'en' ? l.name : l.arName}</p>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary mt-0.5">
                        {language === 'en' ? l.specialty : l.arSpecialty}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      <span>{language === 'en' ? l.city : l.arCity}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-3.5 w-3.5 shrink-0" />
                      <span>{l.years} {tx.experience}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">{Array.from({ length: 5 }, (_, i) => <Star key={i} className={`h-3.5 w-3.5 ${i < Math.floor(l.rating) ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />)}</div>
                      <span className="text-sm font-medium text-foreground">{l.rating.toFixed(1)}</span>
                    </div>
                    <p className="text-primary font-semibold">{l.price} EGP {tx.per_hour}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 text-xs border-border" data-testid={`button-view-${l.id}`}>{tx.view}</Button>
                    <Button size="sm" className="flex-1 text-xs bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => { setBookingLawyer(l); setSelectedDate(null); setSelectedTime(null); setConfirmed(false); }} data-testid={`button-book-${l.id}`}>
                      <Calendar className="h-3.5 w-3.5 me-1" />{tx.book}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />

      {/* Booking Modal */}
      {bookingLawyer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" data-testid="booking-modal">
          <div className="bg-card rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="bg-secondary text-secondary-foreground p-5 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-300 mb-0.5">{tx.book_title}</p>
                <p className="font-semibold text-white">{language === 'en' ? bookingLawyer.name : bookingLawyer.arName}</p>
              </div>
              <button onClick={() => setBookingLawyer(null)} className="text-gray-300 hover:text-white" data-testid="button-close-modal"><X className="h-5 w-5" /></button>
            </div>
            <div className="p-5">
              {confirmed ? (
                <div className="text-center py-4">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3"><Star className="h-7 w-7 text-green-600" /></div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{tx.confirmed}</h3>
                  <p className="text-sm text-muted-foreground mb-5">{tx.confirmed_msg}</p>
                  <Button onClick={() => setBookingLawyer(null)} className="bg-primary text-primary-foreground hover:bg-primary/90">{tx.close}</Button>
                </div>
              ) : (
                <>
                  <p className="text-sm font-medium text-foreground mb-3">{tx.select_date}</p>
                  <div className="grid grid-cols-4 gap-2 mb-5">
                    {nextDates.map((d, i) => (
                      <button key={i} onClick={() => setSelectedDate(i)}
                        className={`p-2 rounded-lg border text-center text-xs transition-all ${selectedDate === i ? 'border-primary bg-primary/5 text-primary' : 'border-border text-foreground hover:border-primary/40'}`}
                        data-testid={`date-slot-${i}`}>
                        <p className="font-medium">{d.toLocaleDateString('en', { weekday: 'short' })}</p>
                        <p className="text-muted-foreground">{d.getDate()}</p>
                      </button>
                    ))}
                  </div>
                  <p className="text-sm font-medium text-foreground mb-3">{tx.select_time}</p>
                  <div className="grid grid-cols-3 gap-2 mb-5">
                    {timeSlots.map((slot, i) => (
                      <button key={i} onClick={() => setSelectedTime(slot)}
                        className={`p-2 rounded-lg border text-xs font-medium transition-all ${selectedTime === slot ? 'border-primary bg-primary/5 text-primary' : 'border-border text-foreground hover:border-primary/40'}`}
                        data-testid={`time-slot-${i}`}>
                        {slot}
                      </button>
                    ))}
                  </div>
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold" disabled={selectedDate === null || !selectedTime} onClick={() => setConfirmed(true)} data-testid="button-confirm-booking">
                    {tx.confirm}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
