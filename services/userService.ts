import { UserData, SavedCalculation, PageData } from '../types';
import { useAuth } from '../context/AuthContext'; // We'll need this to get the user context in the future

// NOTE: This service is currently a placeholder using localStorage.
// All functions should be updated to make authenticated API calls
// to a backend service to store user-specific data (bookmarks, calculations).

const getUserId = (): string | null => {
    // In a real app, you would get this from the AuthContext.
    // For now, we'll use the username from localStorage as a key.
    try {
        const token = localStorage.getItem('authToken');
        if (token) {
            // A simple (and insecure) way to get username for this mock setup.
            // A real JWT would be decoded on the server.
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.data.user.id; // Or username if that's the key
        }
        return null;
    } catch (e) {
        return null;
    }
}


// --- Data Management for Logged-in User ---
// This entire section needs to be replaced with API calls.

const getUserData = (): UserData | null => {
    const userId = getUserId();
    if (!userId) return null;
    try {
        const data = localStorage.getItem(`userData_${userId}`);
        return data ? JSON.parse(data) : { user: { username: '' }, bookmarks: [], calculations: [] };
    } catch (error) {
        return { user: { username: '' }, bookmarks: [], calculations: [] };
    }
};

const saveUserData = (data: UserData) => {
    const userId = getUserId();
    if (!userId) return;
    try {
        localStorage.setItem(`userData_${userId}`, JSON.stringify(data));
    } catch (error) {
        console.error("Error saving user data", error);
    }
};

// Bookmarks
export const getBookmarks = (): string[] => {
    // API_CALL: GET /api/user/bookmarks
    const data = getUserData();
    return data ? data.bookmarks : [];
};

export const isBookmarked = (path: string): boolean => {
    // API_CALL: This could be part of the initial page load data or a separate check.
    const bookmarks = getBookmarks();
    return bookmarks.includes(path);
};

export const addBookmark = (path: string) => {
    // API_CALL: POST /api/user/bookmarks { path }
    const data = getUserData();
    if (data && !data.bookmarks.includes(path)) {
        data.bookmarks.push(path);
        saveUserData(data);
    }
};

export const removeBookmark = (path: string) => {
    // API_CALL: DELETE /api/user/bookmarks { path }
    const data = getUserData();
    if (data) {
        data.bookmarks = data.bookmarks.filter(b => b !== path);
        saveUserData(data);
    }
};


// Saved Calculations
export const getSavedCalculations = (): SavedCalculation[] => {
    // API_CALL: GET /api/user/calculations
    const data = getUserData();
    return data ? data.calculations : [];
};

export const saveCalculation = (pageData: PageData, inputs: Record<string, any>) => {
    // API_CALL: POST /api/user/calculations { pageData, inputs }
    const data = getUserData();
    if (data) {
        const newCalculation: SavedCalculation = {
            id: Date.now().toString(),
            path: pageData.path,
            pageTitle: pageData.title,
            inputs,
            date: new Date().toLocaleDateString('en-IN'),
        };
        data.calculations.unshift(newCalculation); // Add to the top
        saveUserData(data);
    }
};

export const deleteCalculation = (id: string) => {
    // API_CALL: DELETE /api/user/calculations/{id}
    const data = getUserData();
    if (data) {
        data.calculations = data.calculations.filter(c => c.id !== id);
        saveUserData(data);
    }
};
