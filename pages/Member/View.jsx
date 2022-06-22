import React, { useState } from "react";
import { View, Text } from "react-native";

export default ({ route }) => {
  const [data, setData] = useState(route?.params?.data);

  return (
    <View>
      <Text>Member View</Text>
      <Text>{JSON.stringify(data)}</Text>
    </View>
  )
}