import { Stack } from "expo-router";
import { View } from "../../components/Themed";
import Exploreheader from "../../components/Exploreheader";
import Listings from "../../components/Listings";
import { useMemo, useState } from "react";
import listingsData from "../../assets/data/airbnb-listings.json";

export default function TabOneScreen() {
  const [category, setCategory] = useState("Camping");
  const items = useMemo(() => listingsData as any, []);

  const onCategoryChange = (category: string) => {
    console.log(category);
    setCategory(category);
  };
  return (
    <View style={{ flex: 1, marginTop: 120 }}>
      <Stack.Screen
        options={{
          header: () => <Exploreheader onCategoryChange={onCategoryChange} />,
        }}
      />
      <Listings category={category} lists={items} />
    </View>
  );
}
