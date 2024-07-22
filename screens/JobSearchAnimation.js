// JobSearchAnimation.js
import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Easing, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const JobRoleIcon = ({ name, style }) => (
  <Animated.View style={style}>
    <Ionicons name={name} size={40} color="#007AFF" />
  </Animated.View>
);

const JobSearchAnimation = () => {
  const characterPosition = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  const jobRoles = [
    { name: "laptop-outline", label: "Developer" },
    { name: "bar-chart-outline", label: "Analyst" },
    { name: "color-palette-outline", label: "Designer" },
    { name: "megaphone-outline", label: "Marketer" },
    { name: "people-outline", label: "Manager" },
  ];

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(characterPosition, {
          toValue: 1,
          duration: 5000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(characterPosition, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.5,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const characterStyle = {
    transform: [
      {
        translateX: characterPosition.interpolate({
          inputRange: [0, 1],
          outputRange: [-50, 300],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.roadContainer}>
        {jobRoles.map((role, index) => (
          <View key={index} style={styles.jobRoleContainer}>
            <JobRoleIcon
              name={role.name}
              style={[styles.jobRoleIcon, { left: index * 70 + 10 }]}
            />
            <Text style={styles.jobRoleLabel}>{role.label}</Text>
          </View>
        ))}
        <Animated.View style={[styles.character, characterStyle]}>
          <Ionicons name="person" size={30} color="#FF6B6B" />
        </Animated.View>
      </View>
      <Animated.Text
        style={[
          styles.searchingText,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        Searching for your perfect job...
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: 200,
  },
  roadContainer: {
    width: "100%",
    height: 100,
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
  },
  character: {
    position: "absolute",
    bottom: 10,
  },
  jobRoleContainer: {
    position: "absolute",
    alignItems: "center",
  },
  jobRoleIcon: {
    position: "absolute",
    top: 10,
  },
  jobRoleLabel: {
    position: "absolute",
    top: 60,
    fontSize: 12,
    color: "#333",
  },
  searchingText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "#007AFF",
  },
});

export default JobSearchAnimation;
