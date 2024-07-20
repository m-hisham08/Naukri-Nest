import React from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const messages = [
  {
    id: "1",
    sender: "TechCorp HR",
    avatar: "https://randomuser.me/api/portraits/women/17.jpg",
    message:
      "Weve reviewed your application and would like to schedule an interview.",
    time: "10:30 AM",
    unread: true,
  },
  {
    id: "2",
    sender: "DesignHub Team",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    message: "Thank you for your interest. We have a few follow-up questions.",
    time: "Yesterday",
    unread: false,
  },
  // Add more messages as needed
];

const MessageItem = ({ item, onPress }) => (
  <TouchableOpacity style={styles.messageItem} onPress={onPress}>
    <Image source={{ uri: item.avatar }} style={styles.avatar} />
    <View style={styles.messageContent}>
      <View style={styles.messageHeader}>
        <Text style={[styles.senderName, item.unread && styles.unreadText]}>
          {item.sender}
        </Text>
        <Text style={styles.messageTime}>{item.time}</Text>
      </View>
      <Text
        style={[styles.messagePreview, item.unread && styles.unreadText]}
        numberOfLines={2}
      >
        {item.message}
      </Text>
    </View>
    {item.unread && <View style={styles.unreadDot} />}
  </TouchableOpacity>
);

export default function InboxScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Inbox</Text>
        <TouchableOpacity style={styles.composeButton}>
          <Ionicons name="create-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <MessageItem item={item} onPress={() => {}} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
  },
  composeButton: {
    padding: 8,
  },
  listContainer: {
    padding: 16,
  },
  messageItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  senderName: {
    fontSize: 16,
    fontWeight: "600",
  },
  messageTime: {
    fontSize: 14,
    color: "#8E8E93",
  },
  messagePreview: {
    fontSize: 14,
    color: "#8E8E93",
  },
  unreadText: {
    fontWeight: "700",
    color: "#000",
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#007AFF",
    marginLeft: 8,
  },
});
