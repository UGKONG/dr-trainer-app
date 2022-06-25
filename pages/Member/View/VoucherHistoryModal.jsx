import { View, Text } from "react-native";
import Styled from 'styled-components/native';

export default ({ list }) => {

  return (
    <>
      {list?.map((item, idx) => (
        <Li key={idx}>
          <Header>
            <Category>{item?.FUND_TYPE_NM ?? item?.ATTENDANCE_TYPE_NM ?? '-'}</Category>
            <Date>{item?.PAYED_DATE ?? '-'}</Date>
          </Header>
          <Description>{item?.PAY_AMOUNT ?? item?.DESCRIPTION ?? '-'}</Description>
        </Li>
      ))}
    </>
  )
}

const Li = Styled.View`
  display: flex;
  width: 100%;
  margin-bottom: 10px;
  border-radius: 8px;
  padding: 10px;
`;
const Header = Styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
`
const Category = Styled.Text`
  font-size: 16px;
  font-weight: 700;
`
const Date = Styled.Text`
  
`
const Description = Styled.Text`
  
`