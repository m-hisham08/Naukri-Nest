import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HTML from "react-native-render-html";

export default function JobDetailsScreen({ route }) {
  const { job } = route.params;
  const { width } = useWindowDimensions();

  const handleApply = () => {
    if (job.job_url_direct) {
      Linking.openURL(job.job_url_direct).catch((err) =>
        console.error("Couldn't open URL: ", err)
      );
    }
  };

  const formatDescription = (description) => {
    if (!description) return "";

    // Convert markdown-like syntax to HTML
    let formatted = description
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold text
      .replace(/\*(.*?)\*/g, "<em>$1</em>") // Italic text
      .replace(/^- (.*)/gm, "<li>$1</li>") // Unordered list items
      .replace(/\n\n/g, "<br><br>"); // Paragraphs

    // Wrap list items in <ul> tags
    formatted = formatted.replace(/(<li>.*<\/li>)/s, "<ul>$1</ul>");

    return formatted;
  };

  const formattedDescription = formatDescription(job.description);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: job.logo_photo_url || "https://via.placeholder.com/150",
          }}
          style={styles.logo}
        />
        <Text style={styles.title}>{job.title}</Text>
        <Text style={styles.company}>{job.company}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <DetailItem icon="location-outline" text={job.location} />
        <DetailItem icon="globe-outline" text={job.site} />
      </View>
      <Text style={styles.descriptionTitle}>Job Description</Text>
      {job.description ? (
        <HTML
          source={{ html: formattedDescription }}
          contentWidth={width}
          baseStyle={styles.description}
        />
      ) : (
        <Text style={styles.noDescription}>No description available.</Text>
      )}
      <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
        <Text style={styles.applyButtonText}>Apply on {job.site}</Text>
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
  noDescription: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#666",
    padding: 20,
    paddingTop: 0,
  },
  applyButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    padding: 20,
    paddingTop: 0,
  },
});
