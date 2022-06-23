import { ScrollView, View, Text, Modal } from 'react-native';
import Styled from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';

export default ({ data }) => {

  return (
    <Container visible={data?.state}>
      <Header>
        <Title>{data?.name || '정보'}</Title>
        <CloseBtn onPress={() => data?.setState(false)}>
          <AntDesign name='arrowdown' size={24} color='#1b8e5f' />
        </CloseBtn>
      </Header>
      <Contents>
        {data?.component ?? null}
      </Contents>
    </Container>
  )
}

const Container = Styled.Modal.attrs(
  ({ visible }) => ({
    visible: visible,
    animationType: 'slide', 
    presentationStyle: 'pageSheet'
  })
)`

`
const Header = Styled.View`
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`
const Title = Styled.Text`
  font-size: 24px;
  font-weight: 700;
  color: #1b8e5f;
`
const CloseBtn = Styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  justify-content: center;
  align-items: center;
`
const Contents = Styled.ScrollView`
  padding: 20px;
`