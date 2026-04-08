import { useEffect, useState } from "react";
import "./App.css";
import UserProfile from "./UserProfile";
import WithLoadingButton from "./WithLoadingButton";
import { type Settings } from "./types/settings";
import { type User } from "./types/user";
import FilterableList from "./FilterableList";

function App() {
  const [count, setCount] = useState(0);
  const [currentUser, setUser] = useState<User>({ name: "", email: "" });
  const [settings, setSettings] = useState<Settings>({
    theme: "light",
    fontSize: 14,
  });
  const [hugeList, setHugeList] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/api/user").then((res) =>
      res.json().then((data) => {
        setUser(data);
      }),
    );
  }, []);

  useEffect(() => {
    fetch(`/api/huge-list?search=${searchTerm}`)
      .then((res) => res.json())
      .then((data) => setHugeList(data));
  }, [searchTerm]);

  function handleSearchChange(value: string) {
    setSearchTerm(value);
  }

  async function sendUserToAPI(newUser: User) {
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    const updatedUser = await response.json();
    setUser(updatedUser);
  }

  const handleUserUpdate = (fields: Partial<User>) => {
    setUser((prev) => ({ ...prev, ...fields }));
  };

  async function toggleThemeWithDelay() {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    toggleTheme();
  }

  function toggleTheme() {
    console.log("before theme, new settings: ", settings);
    setSettings((settings) => ({
      ...settings,
      theme: settings.theme === "light" ? "dark" : "light",
    }));
  }

  async function increaseCountWithDelay() {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    increaseCount();
  }

  function increaseCount() {
    setCount((count) => count + 1);
  }

  function decreaseCount() {
    setCount((count) => count - 1);
  }

  function submitFormToExternalProvider() {
    console.log("I am definitely submitting " + count + " to a provider");
  }

  return (
    <div className={`appdiv ${settings.theme}`}>
      <WithLoadingButton onClick={toggleThemeWithDelay} theme={settings.theme}>
        Click me to toggle theme.
      </WithLoadingButton>

      <UserProfile
        currentUser={currentUser}
        handleUserUpdate={handleUserUpdate}
        sendToApIFunction={sendUserToAPI}
        theme={settings.theme}
      />
      <WithLoadingButton
        onClick={increaseCountWithDelay}
        theme={settings.theme}
      >
        Click me to increase {count} with a delay.
      </WithLoadingButton>
      <WithLoadingButton onClick={decreaseCount} theme={settings.theme}>
        Click me to decrease {count}.
      </WithLoadingButton>
      <WithLoadingButton
        onClick={submitFormToExternalProvider}
        theme={settings.theme}
      >
        Click me to submit count to external provider.
      </WithLoadingButton>
      <div>Count is also here: {count}</div>

      <FilterableList
        searchTerm={searchTerm}
        updateSearchTerm={handleSearchChange}
        elements={hugeList}
        theme={settings.theme}
      />
    </div>
  );
}

export default App;
