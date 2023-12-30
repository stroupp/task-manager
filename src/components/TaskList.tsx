// src/components/TaskList.tsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TaskItem from "./TaskItem";
import {
  fetchTasks,
  updateTask,
  deleteTask,
  Task,
} from "../services/taskService";

const ListContainer = styled.div`
  margin: 0 auto;
  max-width: 800px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const SearchInput = styled.input`
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
`;

const FilterSelect = styled.select`
  padding: 10px;
  margin-left: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

interface TaskListProps {
  tasks: Task[];
  onTaskUpdate: (updatedTask: Task) => void; // Callback for when a task is updated
  onTaskDelete: (taskId: number) => void; // Callback for when a task is deleted
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  useEffect(() => {
    const loadTasks = async () => {
      try {
        let fetchedTasks = await fetchTasks();
        // Randomly assign priority and category since JSONPlaceholder doesn't provide these fields
        fetchedTasks = fetchedTasks.map((task) => ({
          ...task,
          priority: ["High", "Medium", "Low"][Math.floor(Math.random() * 3)],
          category: ["Work", "Personal", "Other"][
            Math.floor(Math.random() * 3)
          ],
        }));
        setTasks(fetchedTasks);
        setLoading(false);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  const handleUpdate = async (id: number, taskData: Partial<Task>) => {
    try {
      const updatedTask = await updateTask(id, taskData);
      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === id ? { ...task, ...updatedTask } : task
        )
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    }
  };
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterPriority ? task.priority === filterPriority : true) &&
      (filterCategory ? task.category === filterCategory : true)
  );

  return (
    <ListContainer>
      <h1>Task List</h1>
      <FilterContainer>
        <SearchInput
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FilterSelect
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
        >
          <option value="">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </FilterSelect>
        <FilterSelect
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Other">Other</option>
        </FilterSelect>
      </FilterContainer>
      {loading && <div>Loading tasks...</div>}
      {error && <div>Error: {error}</div>}
      {!loading &&
        !error &&
        filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
    </ListContainer>
  );
};

export default TaskList;
