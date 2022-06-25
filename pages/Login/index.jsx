import React, { useEffect, useRef, useState } from "react";
import { Platform, SafeAreaView, View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import sha256 from 'sha256';
import Styled from 'styled-components/native';
import logo from '../../assets/logo.jpg';
import useAxios from '../../hooks/useAxios';
import useStore from '../../hooks/useStore';

const os = Platform.OS;

export default () => {
  const dispatch = useStore(x => x?.setState);
  const idInputRef = useRef(null);
  const pwInputRef = useRef(null);
  const [idValue, setIdValue] = useState('');
  const [pwValue, setPwValue] = useState('');
  
  const validate = () => {
    if (!idValue) return idInputRef.current.focus();
    if (!pwValue) return pwInputRef.current.focus();

    signin();
  }

  const signin = (id, pw) => {
    let form = new FormData();
        form.append('uID', id ?? idValue);
        form.append('uPW', pw ?? pwValue);
        form.append('os', os);
        form.append('pwd_encrypted', sha256(pw ?? pwValue));

    useAxios.post('flow_controller.php?task=staff_login', form).then(({ data }) => {
      if (!data || data?.result === 'Fail') return alert('서버의 상태가 원활하지 않습니다.');
      let result = data?.indexOf('$USER_SQ = ') > -1;
      if (!result) return alert('일치하는 강사가 없습니다.');
      let userId = data?.split('$USER_SQ = ')[1]?.split(';')[0];
      dispatch('isLogin', { id: userId });
    }).catch(err => {
      alert('서버의 상태가 원활하지 않습니다.');
      // console.log(err);
    });
  }

  // Development Login
  // useEffect(() => signin('admin', '0915'), []);

  return (
    <Container>
      <Form>
        <Logo />
        <IdInput 
          ref={idInputRef}
          value={idValue} 
          onChangeText={setIdValue} 
          placeholder='아이디를 입력해주세요.' 
          autoFocus={false} 
          keyboardType='email-address'
          onSubmitEditing={() => pwInputRef.current.focus()}
        />
        <PwInput 
          ref={pwInputRef}
          value={pwValue} 
          onChangeText={setPwValue} 
          placeholder='비밀번호를 입력해주세요.' 
          secureTextEntry={true}
          onSubmitEditing={() => validate()}
        />
        <Submit onPress={() => validate()}>
          <SubmitText>SIGN IN</SubmitText>
        </Submit>
      </Form>
    </Container>
  )
}
// ImageBackground
const Container = Styled.SafeAreaView`
  align-items: center;
  justify-content: center;
  flex: 1;
`
const Logo = Styled.Image.attrs({ source: logo })`
  margin: -100px auto 80px;
`
const Form = Styled.View`
  width: 220px;
  min-width: 220px;
`
const Input = Styled.TextInput`
  border: 1px solid #1b8e5f88;
  height: 46px;
  padding: 0 10px;
  width: 100%;
`
const IdInput = Styled(Input)`
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom-width: 0;
`
const PwInput = Styled(Input)`
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`
const Submit = Styled.TouchableOpacity`
  width: 100%;
  height: 46px;
  margin-top: 50px;
  background-color: #1b8e5f;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`
const SubmitText = Styled.Text`
  color: #fff;
`