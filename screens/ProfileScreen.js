import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProfileSection = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/women/17.jpg" }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>Jane Doe</Text>
        <Text style={styles.title}>Senior Software Developer</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <ProfileSection title="About">
        <Text style={styles.aboutText}>
          Passionate software developer with 5+ years of experience in building
          scalable web and mobile applications. Skilled in React, React Native,
          and Node.js.
        </Text>
      </ProfileSection>

      <ProfileSection title="Experience">
        <View style={styles.experienceItem}>
          <Text style={styles.companyName}>TechCorp</Text>
          <Text style={styles.jobTitle}>Senior Developer</Text>
          <Text style={styles.duration}>2019 - Present</Text>
        </View>
        <View style={styles.experienceItem}>
          <Text style={styles.companyName}>StartupXYZ</Text>
          <Text style={styles.jobTitle}>Frontend Developer</Text>
          <Text style={styles.duration}>2017 - 2019</Text>
        </View>
      </ProfileSection>

      <ProfileSection title="Skills">
        <View style={styles.skillsContainer}>
          {["React", "React Native", "JavaScript", "Node.js", "GraphQL"].map(
            (skill) => (
              <View key={skill} style={styles.skillBadge}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            )
          )}
        </View>
      </ProfileSection>

      <TouchableOpacity style={styles.logoutButton}>
        <Ionicons name="log-out-outline" size={24} color="#FFF" />
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  header: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFF",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  editButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#007AFF",
    borderRadius: 20,
  },
  editButtonText: {
    color: "#FFF",
    fontWeight: "600",
  },
  section: {
    backgroundColor: "#FFF",
    padding: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },
  experienceItem: {
    marginBottom: 16,
  },
  companyName: {
    fontSize: 18,
    fontWeight: "600",
  },
  jobTitle: {
    fontSize: 16,
    color: "#666",
  },
  duration: {
    fontSize: 14,
    color: "#8E8E93",
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  skillBadge: {
    backgroundColor: "#E5E5EA",
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: {
    fontSize: 14,
    color: "#333",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF3B30",
    padding: 16,
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 12,
  },
  logoutButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
  },
});
