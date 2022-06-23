import { ScrollView, Text, View } from "react-native";
import Styled from "styled-components/native";

export default ({ navigation }) => {

  return (
    <Container>
      <Text>설정 스크린</Text>
    </Container>
  )
}

const Container = Styled.ScrollView`
  padding: 10px;
`