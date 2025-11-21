import React, { useEffect, useRef } from "react";
import { View, Text, Button, Animated } from "react-native";

export default function AccountAvengers({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        opacity: fadeAnim,
        backgroundColor: "#0D1B2A",
      }}
    >
      <Text
        style={{
          fontSize: 36,
          fontWeight: "bold",
          marginBottom: 20,
          color: "#E0E6ED",
          textAlign: "center",
        }}
      >
        ⚡ Account Avengers ⚡
      </Text>

      <Text
        style={{
          fontSize: 18,
          marginBottom: 40,
          textAlign: "center",
          color: "#B4BCC5",
        }}
      >
        Secure • Fast • Intelligent Digital Banking
      </Text>

      <Button title="Continue" onPress={() => navigation.navigate("Login")} />
    </Animated.View>
  );
}
