import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";
import { addNutrition } from "../api";
import { AlignHorizontalCenter } from "@mui/icons-material";

const Card = styled.div`
  flex: 1;
  min-width: 280px;
  max-width: 600px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  // box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
  display: flex;
  flex-direction: column;
  gap: 6px;
  @media (max-width: 600px) {
    padding: 16px;
  }
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.primary};
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const AddNutritionForm = () => {
  const [nutritionData, setNutritionData] = useState({
    mealType: "",
    foodItem: "",
    quantity: "",
    calories: "",
    macros: "",
  });

  // Function to handle changes in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNutritionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      console.log("Sending nutrition data:", nutritionData);
      await addNutrition(nutritionData);
      setNutritionData({
        mealType: "",
        foodItem: "",
        quantity: "",
        calories: "",
        macros: "",
      });
      console.log("Nutrition data added successfully");
    } catch (error) {
      console.error("Error adding nutrition:", error);
      if (error.response) {
        console.log("Server responded with:", error.response.data);
      }
      // Display user-friendly error message or handle error state in UI
      // Example: setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div style={{display:"flex",justifyContent:"center",padding:"20px"}}>
      <Card>
        <Title>Add New Nutrition</Title>
        <TextInput
          label="Meal Type"
          name="mealType"
          value={nutritionData.mealType}
          handelChange={handleChange}
          placeholder={"Breakfast"}
        />
        <TextInput
          label="Food Item"
          name="foodItem"
          value={nutritionData.foodItem}
          handelChange={handleChange}
          placeholder={"Oatmeal"}
        />
        <TextInput
          label="Quantity"
          name="quantity"
          value={nutritionData.quantity}
          handelChange={handleChange}
          placeholder={"1 bowl"}
        />
        <TextInput
          label="Calories"
          name="calories"
          value={nutritionData.calories}
          handelChange={handleChange}
          placeholder={"200"}
        />
        <TextInput
          label="Macros"
          name="macros"
          value={nutritionData.macros}
          handelChange={handleChange}
          placeholder={"Carbs: 40g, Protein: 6g, Fat: 3g"}
        />
        <Button text="Add Nutrition" onClick={handleSubmit} />
      </Card>
    </div>
  );
};

export default AddNutritionForm;
