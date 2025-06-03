import { useState, useEffect } from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet, Pressable, Text } from "react-native";

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
      <Pressable style={styles.addButton}>
        <Text style={styles.addButtonText}>
          +
        </Text>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    bottom: 20,
    
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4287f5',

    display: 'flex',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 40,
  }
});
