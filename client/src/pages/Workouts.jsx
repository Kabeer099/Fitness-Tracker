import React from "react";
import style from "styled-components";
import WorkoutCard from "../components/cards/WorkoutCard";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers";

const Container = style.div`
  flex:1;
  height:100%;
  display:flex;
  justify-content: center;
  padding:22px 0px;
  overflow-y:scroll;
`;

const Wrapper = style.div`
flex: 1;
  max-width: 1600px;
  display: flex;
  gap: 22px;
  @media (max-width: 600px) {
    gap: 12px;
    flex-direction:column;
  }
`;

const Left = style.div`
  flex:0.2;
  padding:0px 16px;
  height:fit-content;
  padding:18px;
  border:1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius:14px;
  box-shadow:1px 6px 20px 0px ${({ theme }) => theme.text_primary + 15};
  `;

const Title = style.div`
  font-weight:600;
  font-size:16px;
  color: ${({ theme }) => theme.primary}
  @media(max-width:600px){
    font-size:14px;
  };

  `;

const Right = style.div`
flex:1;
`;
const CardWrapper = style.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
gap: 20px;
margin-bottom: 100px;
@media (max-width: 600px) {
  gap: 12px;
}
`;
const Section = style.div`
  display:flex;
  flex-direction: column;
  padding: 0px 16px;
  gap:22px;
  @media (max-width) {
    gap:12px;
  };
`;
const SecTitle = style.div`
font-weight:500;
color: ${({ theme }) => theme.text_primary}
font-size:22px;
`;

const Workouts = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <Title>Select Date</Title>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar />
          </LocalizationProvider>
        </Left>
        <Right>
          <Section>
            <SecTitle>Todays Workout</SecTitle>
            <CardWrapper>
              <WorkoutCard />
              <WorkoutCard />
              <WorkoutCard />
              <WorkoutCard />
              <WorkoutCard />
              <WorkoutCard />
              <WorkoutCard />
              <WorkoutCard />
              <WorkoutCard />
              <WorkoutCard />
              <WorkoutCard />
              <WorkoutCard />
              <WorkoutCard />
            </CardWrapper>
          </Section>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Workouts;
