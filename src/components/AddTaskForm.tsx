// src/components/AddTaskForm.tsx
import React, { useState } from "react";
import { Task, addTask } from "../services/taskService"; // Import the Task type and the addTask function
import styled from "styled-components";

const FormContainer = styled.div`
  margin: 20px auto;
  max-width: 600px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  padding: 12px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

const Select = styled.select`
  padding: 12px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

const Button = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  margin-top: 10px;
  width: 100%;
`;

// Define the props type for AddTaskForm
interface AddTaskFormProps {
  onAddTask: (task: Task) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium"); // Default priority
  const [category, setCategory] = useState("General"); // Default category

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const newTask = await addTask(title, priority, category);
      onAddTask(newTask); // Pass the new task up to the parent component
      // Reset the form
      setTitle("");
      setPriority("Medium");
      setCategory("General");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          required
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </Select>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Other">Other</option>
        </Select>
        <Button type="submit">Add Task</Button>
      </form>
    </FormContainer>
  );
};

export default AddTaskForm;
