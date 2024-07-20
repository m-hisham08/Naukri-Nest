import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function JobDetailsScreen({ route }) {
  const { job } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: job.hiringOrganizationLogo }}
          style={styles.logo}
        />
        <Text style={styles.title}>{job.title}</Text>
        <Text style={styles.company}>{job.hiringOrganizationName}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <DetailItem icon="location" text={job.location} />
        <DetailItem icon="business" text={job.workMode} />
        <DetailItem
          icon="calendar"
          text={new Date(job.datePosted).toLocaleDateString()}
        />
      </View>
      <Text style={styles.descriptionTitle}>Job Description</Text>
      <Text style={styles.description}>{job.description}</Text>
      <TouchableOpacity style={styles.applyButton}>
        <Text style={styles.applyButtonText}>Apply Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function DetailItem({ icon, text }) {
  return (
    <View style={styles.detailItem}>
      <Ionicons name={icon} size={20} color="#007AFF" />
      <Text style={styles.detailText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  company: {
    fontSize: 18,
    color: "#666",
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailText: {
    marginLeft: 5,
    fontSize: 16,
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 20,
    paddingBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    padding: 20,
    paddingTop: 0,
  },
  applyButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 25,
    margin: 20,
    alignItems: "center",
  },
  applyButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
