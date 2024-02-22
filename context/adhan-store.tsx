import { create } from "zustand";

interface Timings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Sunset: string;
  Maghrib: string;
  Isha: string;
  Imsak: string;
  Midnight: string;
  Firstthird: string;
  Lastthird: string;
}

interface GregorianDate {
  date: string;
  format: string;
  day: string;
  weekday: {
    en: string;
  };
  month: {
    number: number;
    en: string;
  };
  year: string;
  designation: {
    abbreviated: string;
    expanded: string;
  };
}

interface HijriDate {
  date: string;
  format: string;
  day: string;
  weekday: {
    en: string;
    ar: string;
  };
  month: {
    number: number;
    en: string;
    ar: string;
  };
  year: string;
  designation: {
    abbreviated: string;
    expanded: string;
  };
  holidays: any[]; // Update with actual holiday type if needed
}

interface DateInfo {
  readable: string;
  timestamp: string;
  gregorian: GregorianDate;
  hijri: HijriDate;
}

interface PrayerTimesData {
  timings: Partial<Timings>;
  date: DateInfo;
}

interface AdhanStore {
  prayerTimes: PrayerTimesData[]; // Adjust the type based on the Adhan API response structure
  todayData: PrayerTimesData[] | null;
  setPrayerTimes: (prayerTimes: PrayerTimesData[]) => void;
  fetchPrayerTimes: (
    year: number,
    month: number,
    city: string,
    country: string,
    method: number
  ) => Promise<void>;
}

const useAdhanStore = create<AdhanStore>((set) => ({
  prayerTimes: [],
  todayData: [],
  setPrayerTimes: (prayerTimes) => set({ prayerTimes }),
  fetchPrayerTimes: async (
    year: number,
    month: number,
    city: string,
    country: string,
    method: number
  ) => {
    try {
      const response = await fetch(
        `http://api.aladhan.com/v1/calendarByCity/${year}/${month}?city=${city}&country=${country}&method=${method}`
      );
      const data = await response.json();
      set({ prayerTimes: data.data });

      const prayerTimeTimestamps: Record<string, number> = {};

      const currentTimestamp = new Date().getTime();
      const currentTimestampSeconds = Math.floor(currentTimestamp / 1000); // Convert to seconds

      const currentDay = new Date().getDate();
      const todayPrayerTimes: PrayerTimesData[] = data.data?.filter(
        (prayerTime: PrayerTimesData) =>
          Number(prayerTime.date.gregorian.day) === currentDay
      );

      Object.entries(todayPrayerTimes[0].timings).forEach(([prayer, time]) => {
        const [hh, mm] = time.split(":").map((part) => parseInt(part, 10));
        const prayerTimestamp = new Date();
        prayerTimestamp.setHours(hh, mm, 0, 0);
        prayerTimeTimestamps[prayer] = prayerTimestamp.getTime();
      });

      console.log("Prayer time timestamps:", prayerTimeTimestamps);

      const currentPrayer = Object.keys(prayerTimeTimestamps).find((prayer) => {
        const prayerTimestamp = prayerTimeTimestamps[prayer];
        return currentTimestampSeconds < prayerTimestamp;
      });

      console.log("Current prayer:", currentPrayer);

      set({ todayData: todayPrayerTimes });
    } catch (error) {
      console.error("Error fetching prayer times:", error);
    }
  },
}));

export default useAdhanStore;
