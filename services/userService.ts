import { User, UserData, SavedCalculation, PageData } from '../types';

const USER_DATA_KEY_PREFIX = 'userData_';
const CURRENT_USER_KEY = 'currentUser';

// --- Auth ---

export const signup = (username: string): boolean => {
  const key = `${USER_DATA_KEY_PREFIX}${username}`;
  if (localStorage.getItem(key)) {
    return false; // User already exists
  }
  const newUser: User = { username };
  const newUserDate: UserData = {
    user: newUser,
    bookmarks: [],
    calculations: [],
  };
  localStorage.setItem(key, JSON.stringify(newUserDate));
  localStorage.setItem(CURRENT_USER_KEY, username);
  return true;
};

export const login = (username: string): boolean => {
  const key = `${USER_DATA_KEY_PREFIX}${username}`;
  if (localStorage.getItem(key)) {
    localStorage.setItem(CURRENT_USER_KEY, username);
    return true;
  }
  return false; // User does not exist
};

export const logout = (): void => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const getCurrentUser = (): User | null => {
  const username = localStorage.getItem(CURRENT_USER_KEY);
  return username ? { username } : null;
};

// --- User Data Management ---

const getUserData = (username: string): UserData | null => {
  const key = `${USER_DATA_KEY_PREFIX}${username}`;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

const saveUserData = (username: string, data: UserData): void => {
  const key = `${USER_DATA_KEY_PREFIX}${username}`;
  localStorage.setItem(key, JSON.stringify(data));
};

// --- Bookmarks ---

export const getBookmarks = (): string[] => {
  const user = getCurrentUser();
  if (!user) return [];
  const data = getUserData(user.username);
  return data?.bookmarks || [];
};

export const addBookmark = (path: string): void => {
  const user = getCurrentUser();
  if (!user) return;
  const data = getUserData(user.username);
  if (data && !data.bookmarks.includes(path)) {
    data.bookmarks.push(path);
    saveUserData(user.username, data);
  }
};

export const removeBookmark = (path: string): void => {
  const user = getCurrentUser();
  if (!user) return;
  const data = getUserData(user.username);
  if (data) {
    data.bookmarks = data.bookmarks.filter(b => b !== path);
    saveUserData(user.username, data);
  }
};

export const isBookmarked = (path: string): boolean => {
  const bookmarks = getBookmarks();
  return bookmarks.includes(path);
};

// --- Saved Calculations ---

export const getSavedCalculations = (): SavedCalculation[] => {
  const user = getCurrentUser();
  if (!user) return [];
  const data = getUserData(user.username);
  return data?.calculations || [];
};

export const saveCalculation = (pageData: PageData, inputs: Record<string, any>): void => {
  const user = getCurrentUser();
  if (!user) return;
  const data = getUserData(user.username);
  if (data) {
    const newCalculation: SavedCalculation = {
      id: Date.now().toString(),
      path: pageData.path,
      pageTitle: pageData.title,
      inputs,
      date: new Date().toLocaleDateString('en-IN'),
    };
    data.calculations.unshift(newCalculation); // Add to the beginning
    if (data.calculations.length > 20) { // Limit to 20 saved calculations
        data.calculations.pop();
    }
    saveUserData(user.username, data);
  }
};

export const deleteCalculation = (id: string): void => {
    const user = getCurrentUser();
    if (!user) return;
    const data = getUserData(user.username);
    if (data) {
        data.calculations = data.calculations.filter(c => c.id !== id);
        saveUserData(user.username, data);
    }
};