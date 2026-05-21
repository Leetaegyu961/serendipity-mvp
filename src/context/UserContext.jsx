import { createContext, useContext, useState } from 'react';
import { autoNicknames } from '../constants/mockUsers';

const UserContext = createContext(null);

const randomNickname = () =>
  autoNicknames[Math.floor(Math.random() * autoNicknames.length)];

export function UserProvider({ children }) {
  const [nickname, setNickname] = useState(randomNickname());
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [notificationEnabled, setNotificationEnabled] = useState(false);

  const toggleTag = (tag) => {
    setSelectedTags((prev) => {
      if (prev.includes(tag)) return prev.filter((t) => t !== tag);
      if (prev.length >= 3) return prev;
      return [...prev, tag];
    });
  };

  return (
    <UserContext.Provider value={{
      nickname, setNickname,
      selectedTags, toggleTag,
      selectedTopic, setSelectedTopic,
      selectedMeeting, setSelectedMeeting,
      isCheckedIn, setIsCheckedIn,
      notificationEnabled, setNotificationEnabled,
    }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
