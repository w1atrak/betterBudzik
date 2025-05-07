import { useState, useEffect } from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function Clock() {
  const [time, setTime] = useState("");
  const [utcOffset, setUtcOffset] = useState("");

  useEffect(() => {
    let interval: NodeJS.Timeout;
    const updateTime = () => setTime(new Date().toLocaleTimeString(undefined, { hour12: false }));

    setTimeout(() => {
      updateTime();
      interval = setInterval(updateTime, 1000);
    }, 1000 - new Date().getMilliseconds())
    updateTime();

    const offset = -new Date().getTimezoneOffset() / 60;
    setUtcOffset(offset === 0 ? "UTC" : `UTC${offset > 0 ? "+" : ""}${offset}`);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <ThemedView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <ThemedText type="title">{time}</ThemedText>
      <ThemedText type="subtitle">
        {Intl.DateTimeFormat().resolvedOptions().timeZone} ({utcOffset})
      </ThemedText>
    </ThemedView>
  );
}
