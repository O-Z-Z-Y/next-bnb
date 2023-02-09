import React, { useState } from "react";
import styled from "styled-components";

import CloseXIcon from "../../public/static/svg/modal/modal_close_x_icon.svg"
import MailIcon from "../../public/static/svg/auth/mail.svg"
import PersonIcon from "../../public/static/svg/auth/person.svg"
import OpenedEyeIcon from "../../public/static/svg/auth/opened_eye.svg"
import ClosedEyeIcon from "../../public/static/svg/auth/closed_eye.svg"
import Input from "../common/Input";

const Container = styled.form`
  width: 568px;
  padding: 32px;
  background-color: white;
  z-index: 11;

  .modal-close-x-icon {
    cursor: pointer;
    display: block;
    margin: 0 0 40px auto;
  }

  .input-wrapper {
    position: relative;
    margin-bottom: 16px;
  }
`;

const SignUpModal: React.FC = () => {
  const [email, setEmail] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [password, setPassword] = useState("");

  const [hidePassword, setHidePassword] = useState(true);

  //* 비밀번호 숨김 토글하기
  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  }

  //* 이메일 주소 변경 시
  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  //* 성 변경 시
  const onChangeLastname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastname(event.target.value);
  };

  //* 이름 변경 시
  const onChangeFirstname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstname(event.target.value);
  };
  //* 비밀번호 변경시
  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  return (
  <Container>
    <CloseXIcon className="modal-close-x-icon" />
    <div className="input-wrapper">
      <Input type="email" name="email" placeholder="이메일 주소" 
      icon={<MailIcon/>} value={email} onChange={onChangeEmail} />
    </div>
    <div className="input-wrapper">
      <Input placeholder="이름(예: 길동)" icon={<PersonIcon />} value={firstname} onChange={onChangeFirstname} />
    </div>
    <div className="input-wrapper">
      <Input placeholder="성(예: 홍)" icon={<PersonIcon/>} value={lastname} onChange={onChangeLastname} />
    </div>
    <div className="input-wrapper sign-up-password-input-wrapper">
      <Input placeholder="비밀번호 설정하기"
      type={hidePassword ? "password" : "text"}
      icon={
        hidePassword ? (
          <ClosedEyeIcon onClick={toggleHidePassword} />
        ) : (
          <OpenedEyeIcon onClick={toggleHidePassword} />
        )
      }
      value={password}
      onChange={onChangePassword} />
    </div>
  </Container>
  );
};

export default SignUpModal;