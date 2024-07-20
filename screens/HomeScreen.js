import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const JobCard = ({ job, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Image source={{ uri: job.hiringOrganizationLogo }} style={styles.logo} />
    <View style={styles.jobInfo}>
      <Text style={styles.jobTitle}>{job.title}</Text>
      <Text style={styles.companyName}>{job.hiringOrganizationName}</Text>
      <View style={styles.jobDetails}>
        <Ionicons name="location-outline" size={16} color="#666" />
        <Text style={styles.jobDetailText}>{job.location}</Text>
        <Ionicons
          name="briefcase-outline"
          size={16}
          color="#666"
          style={styles.workModeIcon}
        />
        <Text style={styles.jobDetailText}>{job.workMode}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [jobs, setJobs] = useState([]);

  // Static job data
  const staticJobData = [
    {
      id: "66379fb86e9d493dae9761d1",
      title: "Executive Assistant",
      hiringOrganizationName: "Later",
      hiringOrganizationLogo:
        "https://s2-recruiting.cdn.greenhouse.io/external_greenhouse_job_boards/logos/401/064/900/resized/later-logo.jpg?1707860884",
      datePosted: "2024-05-02T00:00:00.000Z",
      workMode: "Hybrid",
      location: "New York, NY",
      description:
        "We are seeking an experienced Executive Assistant to support our leadership team...",
    },
    {
      id: "66379fbf6e9d493dae9761f4",
      title: "Senior Product Manager",
      hiringOrganizationName: "Later",
      hiringOrganizationLogo:
        "https://s2-recruiting.cdn.greenhouse.io/external_greenhouse_job_boards/logos/401/064/900/resized/later-logo.jpg?1707860884",
      datePosted: "2024-05-02T00:00:00.000Z",
      workMode: "Remote",
      location: "Anywhere",
      description:
        "We're looking for a Senior Product Manager to lead our product development initiatives...",
    },
    {
      id: "66379fb66e9d493dae9761c6",
      title: "Senior DevOps Engineer",
      hiringOrganizationName: "Later",
      hiringOrganizationLogo:
        "https://s2-recruiting.cdn.greenhouse.io/external_greenhouse_job_boards/logos/401/064/900/resized/later-logo.jpg?1707860884",
      datePosted: "2024-05-01T00:00:00.000Z",
      workMode: "On-site",
      location: "San Francisco, CA",
      description:
        "Join our team as a Senior DevOps Engineer to help us scale our infrastructure...",
    },
  ];

  const searchJobs = () => {
    const filteredJobs = staticJobData.filter(
      (job) =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.hiringOrganizationName
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
    );
    setJobs(filteredJobs);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Naukri Nest</Text>
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={24}
            color="gray"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for jobs..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={searchJobs}
          />
        </View>
        <FlatList
          data={jobs.length > 0 ? jobs : staticJobData}
          renderItem={({ item }) => (
            <JobCard
              job={item}
              onPress={() => navigation.navigate("JobDetails", { job: item })}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.jobList}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  jobList: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  companyName: {
    fontSize: 16,
    color: "#666",
    marginBottom: 4,
  },
  jobDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  jobDetailText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
    marginRight: 12,
  },
  workModeIcon: {
    marginLeft: 12,
  },
});
