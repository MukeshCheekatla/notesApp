const API_URL = 'http://localhost:5000';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const notesAPI = {
  // Get all notes
  getNotes: async (archived = false) => {
    const response = await fetch(`${API_URL}/api/notes?archived=${archived}`, {
      headers: getAuthHeader()
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch notes');
    }
    
    return response.json();
  },

  // Get a specific note
  getNote: async (id) => {
    const response = await fetch(`${API_URL}/api/notes/${id}`, {
      headers: getAuthHeader()
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch note');
    }
    
    return response.json();
  },

  // Create a new note
  createNote: async (noteData) => {
    const response = await fetch(`${API_URL}/api/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(noteData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to create note');
    }
    
    return response.json();
  },

  // Update a note
  updateNote: async (id, updates) => {
    const response = await fetch(`${API_URL}/api/notes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(updates)
    });
    
    if (!response.ok) {
      throw new Error('Failed to update note');
    }
    
    return response.json();
  },

  // Delete a note
  deleteNote: async (id) => {
    const response = await fetch(`${API_URL}/api/notes/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete note');
    }
    
    return response.json();
  },

  // Toggle pin status
  togglePin: async (id) => {
    const response = await fetch(`${API_URL}/api/notes/${id}/pin`, {
      method: 'PATCH',
      headers: getAuthHeader()
    });
    
    if (!response.ok) {
      throw new Error('Failed to toggle pin');
    }
    
    return response.json();
  },

  // Toggle archive status
  toggleArchive: async (id) => {
    const response = await fetch(`${API_URL}/api/notes/${id}/archive`, {
      method: 'PATCH',
      headers: getAuthHeader()
    });
    
    if (!response.ok) {
      throw new Error('Failed to toggle archive');
    }
    
    return response.json();
  }
};