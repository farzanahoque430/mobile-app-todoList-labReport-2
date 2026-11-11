import { useState } from 'react';
import { FlatList, Pressable, Text, TextInput, View } from 'react-native';

type Task = {
  id: string;
  task: string;
  completed: boolean;
};

const TodoList = () => {
  const [text, setText] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  const remaining = tasks.filter((t) => !t.completed).length;

  const addTask = () => {
    if (!text.trim()) return;
    setTasks([...tasks, { id: Date.now().toString(), task: text.trim(), completed: false }]);
    setText('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <View className="flex-1 bg-gray-100 px-5 pt-6">
      {/* Header */}
      <Text className="text-4xl font-bold text-emerald-600">My TodoList</Text>
      <Text className="text-base text-gray-500 mt-1">Keep your task listed.</Text>

      {/* Remaining count */}
      <Text className="text-lg font-semibold text-gray-700 mt-6 mb-4">{remaining} Remaining</Text>

      {/* Input row */}
      <View className="flex-row items-center mb-5">
        <TextInput
          value={text}
          onChangeText={setText}
          onSubmitEditing={addTask}
          placeholder="Enter your task.."
          placeholderTextColor="#9ca3af"
          className="flex-1 bg-white rounded-full px-5 py-3 text-base text-gray-900 border border-gray-200"
        />
        <Pressable
          onPress={addTask}
          className="ml-3 bg-emerald-600 rounded-full px-6 py-3 active:opacity-80">
          <Text className="text-white font-semibold text-base">Add</Text>
        </Pressable>
      </View>

      {/* Task list */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <Text className="text-gray-400 text-center mt-10">No tasks added yet..</Text>
        }
        renderItem={({ item }) => (
          <View className="flex-row items-center bg-white border border-gray-200 rounded-xl px-4 py-3 mb-3">
            {/* Checkbox */}
            <Pressable
              onPress={() => toggleTask(item.id)}
              className={`w-7 h-7 rounded-full border-2 items-center justify-center mr-3 ${
                item.completed ? 'bg-emerald-600 border-emerald-600' : 'border-gray-300'
              }`}>
              {item.completed && <Text className="text-white font-bold">✓</Text>}
            </Pressable>

            {/* Task text */}
            <Text
              className={`flex-1 text-base ${
                item.completed ? 'text-gray-400 line-through' : 'text-gray-800'
              }`}>
              {item.task}
            </Text>

            {/* Delete */}
            <Pressable
              onPress={() => deleteTask(item.id)}
              className="ml-3 bg-red-500 rounded-lg px-3 py-1.5 active:opacity-80">
              <Text className="text-white text-sm font-medium">Delete</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
};

export default TodoList;
