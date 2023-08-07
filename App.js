import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native";

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    fetch("https://synth.hackerearth.com/api/employees/")
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.last_name.toLowerCase().includes(searchInput.toLowerCase())
  );

  if (isLoading) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  if (error) {
    return (
      <Text style={styles.errorText}>
        Error: {error.message}
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Employee List</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by last name"
        onChangeText={(text) => setSearchInput(text)}
      />
      <ScrollView>
        {filteredEmployees.map((employee) => (
          <View key={employee.id} style={styles.employeeContainer}>
            <Text style={styles.employeeName}>
              Name: {`${employee.first_name} ${employee.last_name}`}
            </Text>
            <Text style={styles.jobTitle}>
              Job title: {employee.job_title}
            </Text>
            <Text style={styles.address}>
              Address: {employee.address}
            </Text>
            <Text style={styles.dob}>
              DOB: {employee.personal_details.date_of_birth}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "grey",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 16,
    color: "white",
    textAlign: "center",
  },
  searchInput: {
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
  },
  employeeContainer: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    padding: 16,
  },
  employeeName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  address: {
    fontSize: 16,
    marginBottom: 4,
  },
  dob: {
    fontSize: 16,
  },
  loadingText: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 100,
  },
  errorText: {
    fontSize: 20,
    color: "red",
    textAlign: "center",
    marginTop: 100,
  },
});

export default App;
