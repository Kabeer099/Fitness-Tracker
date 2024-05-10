import React from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import  Button  from "./Button";

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;
const Title = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.text_primary};
`;
const Span = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 90};
`;

const SignUp = () => {
  return (
    <Container>
      <div>
        <Title>Create New Account</Title>
        <Span>Please Enter Your Details to Create a New Account </Span>
      </div>
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexDirection: "column",
        }}
      >
        <TextInput
          label="Full Name"
          placeholder="Enter Your Full Name"
        />
        <TextInput
          label="Email Address"
          placeholder="Enter Your Email Address"
        />
        <TextInput
          label="Password"
          placeholder="Enter Your Password"
        />
        <Button text="SignUp" />
      </div>
    </Container>
  );
};

export default SignUp;
