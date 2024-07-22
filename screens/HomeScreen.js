// HomeScreen.js
import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
  RefreshControl,
  ActivityIndicator,
  Modal,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import AnimatedLoader from "./AnimatedLoader";

const API_BASE_URL = "https://d1d5-103-157-238-248.ngrok-free.app";

const getIconForJob = (title) => {
  switch (title.toLowerCase()) {
    case "software developer":
      return "code-slash-outline";
    case "digital marketer":
      return "megaphone-outline";
    case "data scientist":
      return "analytics-outline";
    case "ux designer":
      return "color-palette-outline";
    case "product manager":
      return "briefcase-outline";
    case "full stack developer":
      return "layers-outline";
    case "ai/ml engineer":
      return "hardware-chip-outline";
    case "cloud architect":
      return "cloud-outline";
    case "cybersecurity analyst":
      return "shield-checkmark-outline";
    case "devops engineer":
      return "git-network-outline";
    default:
      return "briefcase-outline";
  }
};

const JobCard = ({ job, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Image
      source={{ uri: job.logo_photo_url || "https://via.placeholder.com/150" }}
      style={styles.logo}
    />
    <View style={styles.jobInfo}>
      <Text style={styles.jobTitle}>{job.title}</Text>
      <Text style={styles.companyName}>{job.company}</Text>
      <View style={styles.jobDetails}>
        <Ionicons name="location-outline" size={16} color="#666" />
        <Text style={styles.jobDetailText}>{job.location}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const PopularJobCard = ({ title, onPress }) => (
  <TouchableOpacity style={styles.popularCard} onPress={onPress}>
    <View style={styles.popularCardContent}>
      <View style={styles.iconContainer}>
        <Ionicons name={getIconForJob(title)} size={24} color="#007AFF" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.popularJobTitle}>{title}</Text>
        <Text style={styles.exploreText}>Explore opportunities</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#007AFF" />
    </View>
  </TouchableOpacity>
);

const countries = ["India", "United Arab Emirates"];

const statesByCountry = {
  India: [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Delhi (NCT)",
    "Jammu and Kashmir",
    "Ladakh",
    "Puducherry",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Lakshadweep",
  ],
  "United Arab Emirates": [
    "Abu Dhabi",
    "Dubai",
    "Sharjah",
    "Ajman",
    "Umm Al Quwain",
    "Ras Al Khaimah",
    "Fujairah",
  ],
};

const citiesByState = {
  "Andhra Pradesh": [
    "Visakhapatnam",
    "Vijayawada",
    "Guntur",
    "Nellore",
    "Kurnool",
    "Tirupati",
    "Kakinada",
    "Rajahmundry",
    "Kadapa",
    "Anantapur",
  ],
  "Arunachal Pradesh": [
    "Itanagar",
    "Naharlagun",
    "Pasighat",
    "Namsai",
    "Tawang",
    "Ziro",
    "Bomdila",
    "Aalo",
    "Tezu",
    "Roing",
  ],
  Assam: [
    "Guwahati",
    "Silchar",
    "Dibrugarh",
    "Jorhat",
    "Nagaon",
    "Tinsukia",
    "Tezpur",
    "Bongaigaon",
    "Dhubri",
    "Diphu",
  ],
  Bihar: [
    "Patna",
    "Gaya",
    "Bhagalpur",
    "Muzaffarpur",
    "Purnia",
    "Darbhanga",
    "Bihar Sharif",
    "Arrah",
    "Begusarai",
    "Katihar",
  ],
  Chhattisgarh: [
    "Raipur",
    "Bhilai",
    "Bilaspur",
    "Korba",
    "Durg",
    "Rajnandgaon",
    "Raigarh",
    "Jagdalpur",
    "Ambikapur",
    "Dhamtari",
  ],
  Goa: [
    "Panaji",
    "Margao",
    "Vasco da Gama",
    "Mapusa",
    "Ponda",
    "Bicholim",
    "Curchorem",
    "Cuncolim",
    "Valpoi",
    "Sanquelim",
  ],
  Gujarat: [
    "Ahmedabad",
    "Surat",
    "Vadodara",
    "Rajkot",
    "Bhavnagar",
    "Jamnagar",
    "Junagadh",
    "Gandhinagar",
    "Nadiad",
    "Mehsana",
  ],
  Haryana: [
    "Faridabad",
    "Gurgaon",
    "Panipat",
    "Ambala",
    "Yamunanagar",
    "Rohtak",
    "Hisar",
    "Karnal",
    "Sonipat",
    "Panchkula",
  ],
  "Himachal Pradesh": [
    "Shimla",
    "Mandi",
    "Solan",
    "Dharamshala",
    "Kullu",
    "Baddi",
    "Nahan",
    "Hamirpur",
    "Una",
    "Palampur",
  ],
  Jharkhand: [
    "Ranchi",
    "Jamshedpur",
    "Dhanbad",
    "Bokaro Steel City",
    "Deoghar",
    "Hazaribagh",
    "Giridih",
    "Ramgarh",
    "Phusro",
    "Chirkunda",
  ],
  Karnataka: [
    "Bengaluru",
    "Mysuru",
    "Hubballi-Dharwad",
    "Mangaluru",
    "Belagavi",
    "Kalaburagi",
    "Ballari",
    "Vijayapura",
    "Shivamogga",
    "Tumakuru",
  ],
  Kerala: [
    "Thiruvananthapuram",
    "Kochi",
    "Kozhikode",
    "Thrissur",
    "Kollam",
    "Alappuzha",
    "Kannur",
    "Palakkad",
    "Kottayam",
    "Malappuram",
  ],
  "Madhya Pradesh": [
    "Indore",
    "Bhopal",
    "Jabalpur",
    "Gwalior",
    "Ujjain",
    "Sagar",
    "Dewas",
    "Satna",
    "Ratlam",
    "Rewa",
  ],
  Maharashtra: [
    "Mumbai",
    "Pune",
    "Nagpur",
    "Thane",
    "Nashik",
    "Aurangabad",
    "Solapur",
    "Kolhapur",
    "Navi Mumbai",
    "Amravati",
  ],
  Manipur: [
    "Imphal",
    "Thoubal",
    "Kakching",
    "Ukhrul",
    "Churachandpur",
    "Bishnupur",
    "Senapati",
    "Jiribam",
    "Chandel",
    "Tamenglong",
  ],
  Meghalaya: [
    "Shillong",
    "Tura",
    "Jowai",
    "Nongstoin",
    "Williamnagar",
    "Baghmara",
    "Resubelpara",
    "Nongpoh",
    "Khliehriat",
    "Mawkyrwat",
  ],
  Mizoram: [
    "Aizawl",
    "Lunglei",
    "Champhai",
    "Serchhip",
    "Kolasib",
    "Lawngtlai",
    "Saitual",
    "Khawzawl",
    "Hnahthial",
    "Mamit",
  ],
  Nagaland: [
    "Kohima",
    "Dimapur",
    "Mokokchung",
    "Tuensang",
    "Wokha",
    "Zunheboto",
    "Mon",
    "Phek",
    "Kiphire",
    "Longleng",
  ],
  Odisha: [
    "Bhubaneswar",
    "Cuttack",
    "Rourkela",
    "Berhampur",
    "Sambalpur",
    "Puri",
    "Balasore",
    "Bhadrak",
    "Baripada",
    "Jharsuguda",
  ],
  Punjab: [
    "Ludhiana",
    "Amritsar",
    "Jalandhar",
    "Patiala",
    "Bathinda",
    "Mohali",
    "Pathankot",
    "Hoshiarpur",
    "Batala",
    "Moga",
  ],
  Rajasthan: [
    "Jaipur",
    "Jodhpur",
    "Udaipur",
    "Kota",
    "Bikaner",
    "Ajmer",
    "Bhilwara",
    "Alwar",
    "Sikar",
    "Sri Ganganagar",
  ],
  Sikkim: [
    "Gangtok",
    "Namchi",
    "Gyalshing",
    "Mangan",
    "Rangpo",
    "Singtam",
    "Jorethang",
    "Nayabazar",
    "Ravangla",
    "Chungthang",
  ],
  "Tamil Nadu": [
    "Chennai",
    "Coimbatore",
    "Madurai",
    "Tiruchirappalli",
    "Salem",
    "Tirunelveli",
    "Tiruppur",
    "Vellore",
    "Erode",
    "Thoothukkudi",
  ],
  Telangana: [
    "Hyderabad",
    "Warangal",
    "Nizamabad",
    "Karimnagar",
    "Ramagundam",
    "Khammam",
    "Mahbubnagar",
    "Nalgonda",
    "Adilabad",
    "Suryapet",
  ],
  Tripura: [
    "Agartala",
    "Udaipur",
    "Dharmanagar",
    "Kailasahar",
    "Belonia",
    "Khowai",
    "Ambassa",
    "Kumarghat",
    "Sabroom",
    "Amarpur",
  ],
  "Uttar Pradesh": [
    "Lucknow",
    "Kanpur",
    "Ghaziabad",
    "Agra",
    "Varanasi",
    "Meerut",
    "Prayagraj",
    "Bareilly",
    "Aligarh",
    "Moradabad",
  ],
  Uttarakhand: [
    "Dehradun",
    "Haridwar",
    "Rishikesh",
    "Haldwani",
    "Rudrapur",
    "Kashipur",
    "Roorkee",
    "Pithoragarh",
    "Ramnagar",
    "Khatima",
  ],
  "West Bengal": [
    "Kolkata",
    "Asansol",
    "Siliguri",
    "Durgapur",
    "Bardhaman",
    "Malda City",
    "Baharampur",
    "Habra",
    "Kharagpur",
    "Shantipur",
  ],
  "Delhi (NCT)": [
    "New Delhi",
    "Delhi",
    "Najafgarh",
    "Nangloi Jat",
    "Narela",
    "Karol Bagh",
    "Paharganj",
    "Connaught Place",
    "Mehrauli",
    "Dwarka",
  ],
  "Jammu and Kashmir": [
    "Srinagar",
    "Jammu",
    "Anantnag",
    "Baramulla",
    "Udhampur",
    "Kathua",
    "Sopore",
    "Kupwara",
    "Pulwama",
    "Poonch",
  ],
  Ladakh: [
    "Leh",
    "Kargil",
    "Diskit",
    "Khalsi",
    "Shey",
    "Zanskar",
    "Nubra",
    "Nyoma",
    "Drass",
    "Likir",
  ],
  Puducherry: [
    "Puducherry",
    "Karaikal",
    "Yanam",
    "Mahe",
    "Ozhukarai",
    "Villianur",
    "Ariyankuppam",
    "Bahour",
    "Mannadipet",
    "Nettapakkam",
  ],
  "Andaman and Nicobar Islands": [
    "Port Blair",
    "Diglipur",
    "Mayabunder",
    "Rangat",
    "Havelock Island",
    "Car Nicobar",
    "Little Andaman",
    "Neil Island",
    "Kamorta",
    "Campbell Bay",
  ],
  Chandigarh: ["Chandigarh"],
  "Dadra and Nagar Haveli and Daman and Diu": [
    "Daman",
    "Diu",
    "Silvassa",
    "Amli",
    "Dadra",
    "Naroli",
    "Samarvarni",
    "Khanvel",
    "Kadaiya",
    "Rakholi",
  ],
  Lakshadweep: [
    "Kavaratti",
    "Agatti",
    "Amini",
    "Andrott",
    "Minicoy",
    "Kalpeni",
    "Kiltan",
    "Chetlat",
    "Kadmat",
    "Bitra",
  ],

  // United Arab Emirates
  "Abu Dhabi": [
    "Abu Dhabi City",
    "Al Ain",
    "Madinat Zayed",
    "Ruwais",
    "Ghayathi",
    "Liwa Oasis",
    "Delma Island",
    "Al Mirfa",
    "Al Sila",
    "Habshan",
  ],
  Dubai: [
    "Dubai City",
    "Deira",
    "Bur Dubai",
    "Jumeirah",
    "Al Barsha",
    "Dubai Marina",
    "Palm Jumeirah",
    "Dubai Silicon Oasis",
    "Dubai Investment Park",
    "Jebel Ali",
  ],
  Sharjah: [
    "Sharjah City",
    "Al Dhaid",
    "Khor Fakkan",
    "Kalba",
    "Dibba Al-Hisn",
    "Al Hamriyah",
    "Al Madam",
    "Mleiha",
    "Al Batayeh",
    "Nahwa",
  ],
  Ajman: ["Ajman City", "Masfout", "Manama"],
  "Umm Al Quwain": [
    "Umm Al Quwain City",
    "Falaj Al Mualla",
    "Al Rafaah",
    "Al Rashidiya",
    "Al Riqqah",
    "Al Medfouna",
  ],
  "Ras Al Khaimah": [
    "Ras Al Khaimah City",
    "Al Jazirah Al Hamra",
    "Digdaga",
    "Khatt",
    "Masafi",
    "Rams",
    "Al Nakheel",
  ],
  Fujairah: [
    "Fujairah City",
    "Dibba Al-Fujairah",
    "Al Bidya",
    "Masafi",
    "Qidfa",
    "Al Siji",
    "Al Taween",
  ],
};

const popularJobs = [
  "Software Developer",
  "Digital Marketer",
  "Data Scientist",
  "UX Designer",
  "Product Manager",
  "Full Stack Developer",
  "AI/ML Engineer",
  "Cloud Architect",
  "Cybersecurity Analyst",
  "DevOps Engineer",
  "Business Analyst",
  "Frontend Developer",
  "Backend Developer",
  "Mobile App Developer",
  "Blockchain Developer",
];

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);

  const fetchJobs = async (query, loc) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/jobs/?search=${encodeURIComponent(
          query
        )}&location=${encodeURIComponent(loc)}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (query = searchQuery) => {
    if (query.trim()) {
      const location = [city, state, country].filter(Boolean).join(", ");
      fetchJobs(query, location);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    if (searchQuery) {
      handleSearch();
    }
    setRefreshing(false);
  }, [searchQuery, city, state, country]);

  const handleLocationSelect = () => {
    setShowLocationModal(false);
    if (searchQuery.trim()) {
      handleSearch();
    }
  };

  const handlePopularJobSelect = (job) => {
    setSearchQuery(job);
    handleSearch(job);
  };

  useEffect(() => {
    setCountry("India");
  }, []);

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
            onSubmitEditing={() => handleSearch()}
          />
          <TouchableOpacity onPress={() => setShowLocationModal(true)}>
            <Ionicons
              name="location-outline"
              size={24}
              color={country ? "blue" : "gray"}
              style={styles.locationIcon}
            />
          </TouchableOpacity>
        </View>
        {country && (
          <Text style={styles.selectedLocation}>
            Location: {[city, state, country].filter(Boolean).join(", ")}
          </Text>
        )}
        {isLoading ? (
          <View style={styles.loaderContainer}>
            <AnimatedLoader />
            <Text style={styles.loaderText}>
              Searching for your dream job...
            </Text>
          </View>
        ) : searchQuery ? (
          <FlatList
            data={jobs}
            renderItem={({ item }) => (
              <JobCard
                job={item}
                onPress={() => navigation.navigate("JobDetails", { job: item })}
              />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.jobList}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListEmptyComponent={
              <Text style={styles.emptyListText}>
                No jobs found. Try a different search or location.
              </Text>
            }
          />
        ) : (
          <View>
            <Text style={styles.popularJobsHeader}>Popular Job Roles</Text>
            <FlatList
              data={popularJobs}
              renderItem={({ item }) => (
                <PopularJobCard
                  title={item}
                  onPress={() => handlePopularJobSelect(item)}
                />
              )}
              keyExtractor={(item) => item}
              contentContainerStyle={styles.popularJobList}
            />
          </View>
        )}
      </View>
      <Modal
        visible={showLocationModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Select Location</Text>
            <ScrollView>
              <Text style={styles.pickerLabel}>Country</Text>
              <Picker
                selectedValue={country}
                onValueChange={(itemValue) => {
                  setCountry(itemValue);
                  setState("");
                  setCity("");
                }}
              >
                <Picker.Item label="Select a country" value="" />
                {countries.map((c) => (
                  <Picker.Item key={c} label={c} value={c} />
                ))}
              </Picker>

              {country && (
                <>
                  <Text style={styles.pickerLabel}>State</Text>
                  <Picker
                    selectedValue={state}
                    onValueChange={(itemValue) => {
                      setState(itemValue);
                      setCity("");
                    }}
                  >
                    <Picker.Item label="Select a state" value="" />
                    {statesByCountry[country].map((s) => (
                      <Picker.Item key={s} label={s} value={s} />
                    ))}
                  </Picker>
                </>
              )}

              {state && citiesByState[state] && (
                <>
                  <Text style={styles.pickerLabel}>City</Text>
                  <Picker
                    selectedValue={city}
                    onValueChange={(itemValue) => setCity(itemValue)}
                  >
                    <Picker.Item label="Select a city" value="" />
                    {citiesByState[state].map((c) => (
                      <Picker.Item key={c} label={c} value={c} />
                    ))}
                  </Picker>
                </>
              )}

              <TouchableOpacity
                style={styles.applyButton}
                onPress={handleLocationSelect}
              >
                <Text style={styles.applyButtonText}>Apply</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowLocationModal(false)}
              >
                <Text style={styles.closeButtonText}>Cancel</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  },
  emptyListText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#666",
  },
  loader: {
    marginTop: 20,
  },
  locationIcon: {
    marginLeft: 10,
  },
  selectedLocation: {
    marginBottom: 10,
    color: "blue",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    maxHeight: "80%",
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  applyButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  applyButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 10,
    alignItems: "center",
  },
  closeButtonText: {
    color: "blue",
    fontWeight: "bold",
  },
  popularJobsHeader: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  popularJobList: {
    paddingBottom: 20,
  },
  popularCard: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: "hidden",
  },
  popularCardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  popularJobTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  arrowContainer: {
    backgroundColor: "#F0F8FF",
    borderRadius: 20,
    padding: 8,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderText: {
    marginTop: 20,
    fontSize: 16,
    color: "#007AFF",
    textAlign: "center",
  },
  popularCard: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: "hidden",
  },
  popularCardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  iconContainer: {
    backgroundColor: "#F0F8FF",
    borderRadius: 12,
    padding: 10,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  popularJobTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  exploreText: {
    fontSize: 14,
    color: "#666",
  },
});
