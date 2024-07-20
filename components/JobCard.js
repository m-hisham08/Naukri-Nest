import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function JobCard({ job, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: job.hiringOrganizationLogo }} style={styles.logo} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{job.title}</Text>
        <Text style={styles.company}>{job.hiringOrganizationName}</Text>
        <View style={styles.detailsContainer}>
          <DetailItem icon="location" text={job.location} />
          <DetailItem icon="business" text={job.workMode} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

function DetailItem({ icon, text }) {
  return (
    <View style={styles.detailItem}>
      <Ionicons name={icon} size={14} color="#666" />
      <Text style={styles.detailText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  company: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  detailsContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  detailText: {
    marginLeft: 5,
    fontSize: 14,
    color: "#666",
  },
});
