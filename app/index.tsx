import useAdhanStore from "@/context/adhan-store";
import { useEffect } from "react";
import { Button, ScrollView, Text, View } from "react-native";

export default function Page() {
  const { prayerTimes, fetchPrayerTimes, todayData } = useAdhanStore();

  useEffect(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Month is 0-based in JavaScript

    fetchPrayerTimes(currentYear, currentMonth, "Taroudant", "Maroc", 3); // Adjust city, country, and method as needed
  }, [fetchPrayerTimes]);

  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <Button
          title="Islamic Society of North America"
          onPress={() => fetchPrayerTimes(2024, 2, "Taroudant", "Maroc", 2)}
        />
      </View>
      {prayerTimes && prayerTimes.length > 0 && (
        <ScrollView>
          <Text>
            Today's Prayer Times:
            {JSON.stringify(todayData, null, 2)}
          </Text>
          <View>
            {prayerTimes
              .filter((prayerTime) => {
                const currentDay = new Date().getDate();
                return Number(prayerTime.date.gregorian.day) === currentDay;
              })
              .map((prayerTime, index) => (
                <View key={index}>
                  <Text>{prayerTime.date.gregorian.date}</Text>
                  <Text>{JSON.stringify(prayerTime.timings, null, 2)}</Text>
                  {/* Add other prayer timings as needed */}
                </View>
              ))}
          </View>
          <Text>Closest Prayer Time: {prayerTimes[21].timings.Dhuhr}</Text>
        </ScrollView>
      )}
    </View>
  );
}
