import { useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';

type Task = {
  id: string;
  text: string;
  completed: boolean;
};

const INITIAL_TASKS: Task[] = [
  { id: '1', text: 'Learn Expo', completed: true },
  { id: '2', text: 'Learn React', completed: false },
];

const TodoList = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  const remaining = tasks.filter((t) => !t.completed).length;

  const addTask = () => {
    const text = task.trim();
    if (!text) return;
    setTasks((prev) => [...prev, { id: Date.now().toString(), text, completed: false }]);
    setTask('');
  };

  const toggleTask = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-gray-100"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View className="flex-1 px-5 pt-6">
        {/* Title */}
        <Text className="text-3xl font-bold text-emerald-600">My TodoList</Text>
        <Text className="text-sm text-gray-400 mt-1">Keep your task listed...</Text>

        {/* Remaining count */}
        <Text className="text-lg font-semibold text-gray-600 mt-8 mb-6">
          {remaining} Remaining
        </Text>

        {/* Input + Add button */}
        <View className="flex-row items-center mb-6">
          <TextInput
            value={task}
            onChangeText={setTask}
            onSubmitEditing={addTask}
            returnKeyType="done"
            placeholder="Enter your task.."
            placeholderTextColor="#6b7280"
            className="flex-1 bg-white rounded-xl px-4 py-3 text-base text-gray-900 shadow-sm"
          />
          <Pressable
            onPress={addTask}
            className="ml-3 bg-emerald-500 rounded-xl px-8 py-3.5 shadow-sm active:opacity-80">
            <Text className="text-white font-semibold">Add</Text>
          </Pressable>
        </View>

        {/* Task list */}
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          keyboardShouldPersistTaps="handled"
          contentContainerClassName="pb-10"
          ListEmptyComponent={
            <Text className="text-gray-400 text-center mt-10">No tasks yet. Add one above!</Text>
          }
          renderItem={({ item }) => (
            <View className="flex-row items-center bg-white rounded-xl px-4 py-4 mb-3 shadow-sm">
              <Pressable
                onPress={() => toggleTask(item.id)}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: item.completed }}
                className="flex-row items-center">
                <View
                  className={`w-7 h-7 rounded-full border items-center justify-center mr-3 ${
                    item.completed ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300'
                  }`}>
                  {item.completed && <Text className="text-white text-sm font-bold">✓</Text>}
                </View>
                <Text
                  className={`text-base ${
                    item.completed ? 'text-gray-400 line-through' : 'text-gray-800'
                  }`}>
                  {item.text}
                </Text>
              </Pressable>
              <Pressable onPress={() => deleteTask(item.id)} className="ml-3 active:opacity-60">
                <Text className="text-red-500 text-sm">Delete</Text>
              </Pressable>
            </View>
          )}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default TodoList;
