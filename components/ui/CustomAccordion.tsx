import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";

const Accordion = ({ data }: any) => {
  const [expandedIndex, setExpandedIndex] = useState<any>(null);

  const toggleExpand = (index: number | null) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <View style={styles.container}>
      {data.map((item: any, index: number) => (
        <View key={index} style={styles.accordionItem}>
          {/* Header */}
          <TouchableOpacity
            style={styles.header}
            onPress={() => toggleExpand(index)}
          >
            <Text style={styles.headerText}>{item.title}</Text>
            <Text style={styles.icon}>
              {expandedIndex === index ? (
                <Icon name="chevron-small-up" size={25} color="#000000" />
              ) : (
                <Icon name="chevron-small-right" size={25} color="#000000" />
              )}
            </Text>
          </TouchableOpacity>

          {/* Body */}
          {expandedIndex === index && (
            <View style={styles.body}>
              <Text style={styles.bodyText}>{item.content}</Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    width: "100%",
  },
  accordionItem: {
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    width: "95%",
    margin: "auto",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  icon: {
    fontSize: 20,
    fontWeight: "bold",
  },
  body: {
    padding: 16,
    backgroundColor: "#fff",
  },
  bodyText: {
    fontSize: 14,
    color: "#555",
  },
});

export default Accordion;
