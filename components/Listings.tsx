import {
  View,
  Image,
  Text,
  ListRenderItem,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { defaultStyles } from "../constants/Styles";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import Animated, { FadeInRight, FadeOutRight } from "react-native-reanimated";

interface Props {
  category: string;
  lists: any;
}

const Listings = ({ lists, category }: Props) => {
  const [loading, setLoading] = useState(true);
  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    console.log(`Reload List ${lists.length}`);
    setTimeout(() => setLoading(false), 200);
  }, [category]);

  const renderRow: ListRenderItem<any> = ({ item }) => (
    <Link
      href={`/listing/${item.id}`}
      asChild
      style={{ ...defaultStyles.container, fontFamily: "Nova" }}
    >
      <TouchableOpacity>
        <Animated.View
          style={styles.listing}
          entering={FadeInRight}
          exiting={FadeOutRight}
        >
          <Image source={{ uri: item.medium_url }} style={styles.image} />
          <TouchableOpacity style={styles.heartIcon}>
            <Ionicons name='heart-outline' size={24} color={Colors.primary} />
          </TouchableOpacity>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontStyle: "italic", fontSize: 20 }}>
              {item.name}
            </Text>

            <View style={{ flexDirection: "row", gap: 4 }}>
              <Ionicons name='star' size={16} />
              <Text style={styles.randomText}>{item.review_scores_rating}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", gap: 4 }}>
            <Text style={styles.randomText}>৳{item.price}</Text>
            <Text style={styles.randomText}>Per Night</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View style={defaultStyles.container}>
      <FlatList
        data={loading ? [] : lists}
        ref={listRef}
        renderItem={renderRow}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listing: {
    padding: 16,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
  heartIcon: {
    position: "absolute",
    right: 30,
    top: 30,
  },
  randomText: {
    fontSize: 15,
  },
});

export default Listings;
