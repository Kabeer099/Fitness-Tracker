import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "./Button";
import TextInput from "./TextInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Card = styled.div`
  flex: 1;
  min-width: 280px;
  max-width: 600px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.primary};
`;

const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const AddProgress = () => {
  const [weight, setWeight] = useState("");
  const [bodyMeasurements, setBodyMeasurements] = useState("");
  const [runTime, setRunTime] = useState("");
  const [liftWeight, setLiftWeight] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRecordMetrics = async () => {
    setIsLoading(true);

    const metricsData = {
      weight: parseFloat(weight),
      bodyMeasurements,
      runTime,
      liftWeight,
      recordedAt: new Date().toISOString(),
    };

    const token = "frtgertyeryeryrt"; // Replace with your actual JWT token

    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/progress",
        metricsData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Adjust content type if necessary
          },
        }
      );

      console.log("API Response:", response.data);
      // Clear inputs after recording
      setWeight("");
      setBodyMeasurements("");
      setRunTime("");
      setLiftWeight("");
      setError("");
    } catch (error) {
      console.error("Error recording metrics:", error);
      if (error.response) {
        console.error("Response Data:", error.response.data);
        console.error("Response Status:", error.response.status);
      }
      setError("Failed to record metrics. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
      <Card>
        <Title>Record Your Fitness Progress</Title>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <FormItem>
          <label>Weight (lbs/kg):</label>
          <TextInput
            type="text"
            value={weight}
            handelChange={(e) => setWeight(e.target.value)}
            placeholder="100 kg"
          />
        </FormItem>
        <FormItem>
          <label>Body Measurements:</label>
          <TextInput
            type="text"
            value={bodyMeasurements}
            handelChange={(e) => setBodyMeasurements(e.target.value)}
            placeholder="Chest: 42 inches, Waist: 32 inches"
          />
        </FormItem>
        <FormItem>
          <label>Run Time:</label>
          <TextInput
            type="text"
            value={runTime}
            handelChange={(e) => setRunTime(e.target.value)}
            placeholder="30 minutes"
          />
        </FormItem>
        <FormItem>
          <label>Lift Weight:</label>
          <TextInput
            type="text"
            value={liftWeight}
            handelChange={(e) => setLiftWeight(e.target.value)}
            placeholder="100 kg"
          />
        </FormItem>
        <Button
          text="Record Metrics"
          onClick={handleRecordMetrics}
          isLoading={isLoading}
          disabled={isLoading}
        />
      </Card>
    </div>
  );
};

export default AddProgress;
