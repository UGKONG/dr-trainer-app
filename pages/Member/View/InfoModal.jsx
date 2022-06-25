import { useState, useRef } from "react";
import { ScrollView, View, Text, Modal } from "react-native";
import { AntDesign } from '@expo/vector-icons';

export default ({ data }) => {

  const [modifyData, setModifyData] = useState({...data});

  return (
    <>
      <Text>{JSON.stringify(modifyData)}</Text>
    </>
  )
}