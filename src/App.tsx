// src/App.tsx
import React, { useState } from "react";
import TaskList from "./components/TaskList";
import AddTaskForm from "./components/AddTaskForm";
import styled from "styled-components";
import { Task } from "./services/taskService";

const AppContainer = styled.div`
  text-align: center;
`;

const AddTaskButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  margin: 20px 0;
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const App: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleAddTask = (newTask: Task) => {
    // Logic to add the new task to the state
    setShowModal(false);
  };

  return (
    <AppContainer>
      <AddTaskButton onClick={() => setShowModal(true)}>Add Task</AddTaskButton>
      <TaskList />
      {showModal && (
        <ModalBackground onClick={() => setShowModal(false)}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <AddTaskForm onAddTask={handleAddTask} />
          </Modal>
        </ModalBackground>
      )}
    </AppContainer>
  );
};

export default App;
