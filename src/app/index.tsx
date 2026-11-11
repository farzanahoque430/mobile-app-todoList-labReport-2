import { Stack } from "expo-router";

import TodoList from "../../components/TodoList";

export default function Index() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "index",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "#ffffff" },
          headerTitleStyle: { fontSize: 18, fontWeight: "500", color: "#111827" },
        }}
      />
      <TodoList />
    </>
  );
}
