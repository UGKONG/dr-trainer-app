import { useRef } from "react";
import { TouchableOpacity, ScrollView, Text, View } from "react-native";
import Styled from "styled-components/native";
import useAxios from "../../hooks/useAxios";
import useStore from '../../hooks/useStore';

export default ({ navigation }) => {
  const dispatch = useStore(x => x?.setState);

  const signout = () => {
    dispatch('isLogin', null);
    alert('로그아웃되었습니다.');
    useAxios.get('flow_controller.php?task=user_logout');
  }

  const btns = useRef([
    { id: 1, name: '로그아웃', onClick: () => signout() }
  ]);

  return (
    <Container>
      {btns?.current?.map(item => (
        <Li key={item?.id} onPress={() => item?.onClick()}>
          <LiText>{item?.name}</LiText>
        </Li>
      ))}
    </Container>
  )
}

const Container = Styled.ScrollView`
  padding: 10px;
`
const Li = Styled.TouchableOpacity.attrs(
  () => ({ activeOpacity: 0.8 })
)`
  width: 100%;
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 6px;
  background-color: #1b8e5f;
  flex-direction: row;
  align-items: center;
`
const LiText = Styled.Text`
  color: #fff;
  font-size: 14px;
`