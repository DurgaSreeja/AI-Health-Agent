// userState.js
import { useState } from 'react';

// Initial state
let userData = '';

// Custom hook to manage userData state
export const useUserData = () => {
  const [state, setState] = useState(userData);

  const setUserData = (data) => {
    userData = data;
    setState(data);
  };

  return [state, setUserData];
};
