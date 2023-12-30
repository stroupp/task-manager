// src/components/TaskItem.tsx
import React, { useState } from "react";
import styled from "styled-components";
import { Task } from "../services/taskService"; // Make sure this type is correctly defined in your service file

const ItemContainer = styled.div`
  background: #ffffff;
  border: 1px solid #e1e1e1;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const TaskDetails = styled.div`
  flex-grow: 1;
  margin-right: 15px;
`;

const TaskAttribute = styled.p`
  color: #333;
  margin: 5px 0;
  font-size: 0.9em;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
`;

const Button = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  margin-left: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    opacity: 0.8;
  }

  &:first-child {
    margin-left: 0;
  }
`;

const EditButton = styled(Button)`
  background-color: #ffc107; // A yellow color for caution
  color: black;

  &:hover {
    background-color: #e0a800; // A darker yellow on hover
  }
`;

const DeleteButton = styled(Button)`
  background-color: #dc3545; // A red color for danger
  color: white;

  &:hover {
    background-color: #c82333; // A darker red on hover
  }
`;

type TaskItemProps = {
  task: Task;
  onUpdate: (id: number, taskData: Partial<Task>) => void;
  onDelete: (id: number) => void;
};

const TaskItem: React.FC<TaskItemProps> = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedPriority, setEditedPriority] = useState(task.priority);
  const [editedCategory, setEditedCategory] = useState(task.category);

  const handleSave = () => {
    const updatedTask = {
      ...task,
      title: editedTitle,
      priority: editedPriority,
      category: editedCategory,
    };

    onUpdate(task.id, {
      title: editedTitle,
      priority: editedPriority,
      category: editedCategory,
    });
    setIsEditing(false);
  };

  return (
    <ItemContainer>
      {isEditing ? (
        <>
          <Input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <Select
            value={editedPriority}
            onChange={(e) => setEditedPriority(e.target.value)}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </Select>
          <Select
            value={editedCategory}
            onChange={(e) => setEditedCategory(e.target.value)}
          >
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Other">Other</option>
          </Select>
          <Button onClick={handleSave}>Save</Button>
          <EditButton onClick={() => setIsEditing(false)}>Cancel</EditButton>
        </>
      ) : (
        <>
          <TaskDetails>
            <strong>{task.title}</strong>
            <TaskAttribute>Priority: {task.priority}</TaskAttribute>
            <TaskAttribute>Category: {task.category}</TaskAttribute>
          </TaskDetails>
          <div>
            <Button onClick={() => setIsEditing(true)}>Edit</Button>
            <DeleteButton onClick={() => onDelete(task.id)}>
              Delete
            </DeleteButton>
          </div>
        </>
      )}
    </ItemContainer>
  );
};

export default TaskItem;
