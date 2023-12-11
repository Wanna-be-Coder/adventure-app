import { View, Text, StyleSheet } from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

const adventureCategories = [
  { name: "Camping", icon: "campfire" },
  { name: "Mountain", icon: "bike" },
  { name: "Hiking", icon: "slope-uphill" },
  { name: "Kayaking", icon: "sail-boat" },
  { name: "Exploration", icon: "compass" },
];

interface Props {
  onCategoryChange: (category: string) => void;
}

const Exploreheader = ({ onCategoryChange }: Props) => {
  const scrollRef = useRef<ScrollView | null>(null);
  const itemsRef = useRef<Array<TouchableOpacity | null>>([]);
  const [active, setActive] = useState(0);

  const selectCategory = (index: number) => {
    //const selected = itemsRef.current[index];
    setActive(index);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onCategoryChange(adventureCategories[index].name);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <View style={style.container}>
          <View style={style.actionRow}>
            <Link href={"/(modals)/booking"} asChild>
              <TouchableOpacity style={style.searchBtn}>
                <MaterialCommunityIcons name='map-search-outline' size={20} />
                <View>
                  <Text style={{ fontFamily: "Nova", fontSize: 18 }}>
                    Ready to start and Adventure?
                  </Text>
                  <Text style={{ fontFamily: "Nova", fontSize: 16 }}>
                    Let's get started
                  </Text>
                </View>
              </TouchableOpacity>
            </Link>
            <TouchableOpacity style={style.filterBtn}>
              <MaterialCommunityIcons name='filter-menu-outline' size={24} />
            </TouchableOpacity>
          </View>
          <ScrollView
            ref={scrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: "center",
              gap: 30,
              paddingHorizontal: 16,
            }}
          >
            {adventureCategories.map((item, index) => (
              <TouchableOpacity
                key={index}
                ref={(el) => (itemsRef.current[index] = el)}
                style={
                  active === index
                    ? style.categoriesActiveBtn
                    : style.categoriesBtn
                }
                onPress={() => selectCategory(index)}
              >
                <MaterialCommunityIcons
                  style={active === index && { color: Colors.primary }}
                  name={item.icon as any}
                  size={24}
                />
                <Text
                  style={
                    active === index
                      ? style.activeCategoryText
                      : style.categoryText
                  }
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    height: 130,
    backgroundColor: "#fff",
  },
  actionRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingBottom: 16,
    gap: 10,
  },
  filterBtn: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 24,
  },
  searchBtn: {
    flex: 1,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderColor: "#c2c2c2",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 30,

    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  categoryText: {
    fontFamily: "Nova",
    fontSize: 14,
    color: Colors.grey,
  },
  activeCategoryText: {
    fontFamily: "Nova",
    fontSize: 14,
    color: Colors.primary,
  },
  categoriesBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 8,
  },
  categoriesActiveBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 8,
    borderBlockColor: Colors.primary,
    borderBottomWidth: 2,
  },
});

export default Exploreheader;
