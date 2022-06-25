import { useEffect, useMemo, useState } from "react";
import { ScrollView, View, TextInput } from "react-native";
import Styled from "styled-components/native";
import useAxios from "../../../hooks/useAxios";
import MemberLi from "./MemberLi";

export default ({ navigation }) => {
  const [text, setText] = useState('');
  const [list, setList] = useState([]);

  const getList = () => {
    useAxios.get('/flow_controller.php?task=getUserList').then(({ data }) => {
      let _data = JSON.parse(data?.split('|')[0]);
      _data = _data?.filter(x => x?.VOUCHER_NAME);
      setList(_data);
    }).catch(() => alert('서버의 상태가 원활하지 않습니다.'));
  }

  const filterList = useMemo(() => {
    if (text === '') return list;
    let filter = list?.filter(x => x?.USER_NM?.indexOf(text) > -1);
    return filter;
  }, [text, list]);

  useEffect(getList, []);

  return (
    <>
      <Option>
        <SearchBox value={text} onChangeText={setText} placeholder='회원명 검색' />
      </Option>
      <List>
        {filterList?.map(item => <MemberLi key={item?.USER_SQ} data={item} navigation={navigation} />)}
      </List>
    </>
  )
}

const List = Styled.ScrollView`
  padding: 10px;
`
const Option = Styled.View`
  padding: 10px;
`
const SearchBox = Styled.TextInput`
  border-width: 1px;
  border-color: #ddd;
  border-radius: 4px;
  width: 100%;
  height: 36px;
  padding: 0 8px;
`