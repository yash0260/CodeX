const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

console.log('🔗 API URL:', API_URL); 

export const analyzeCode = async (code, language) => {
  console.log('📤 Sending POST to:', `${API_URL}/analyze`);
  
  const response = await fetch(`${API_URL}/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code, language })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Analysis failed');
  }

  return response.json();
};

export const fetchHistory = async (userId) => {
  const response = await fetch(`${API_URL}/history/${userId}`);

  if (!response.ok) {
    throw new Error('Failed to fetch history');
  }

  return response.json();
};

export const saveHistory = async (userId, code, language) => {
  const response = await fetch(`${API_URL}/history`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      user_id: userId,  
      code, 
      language 
    })
  });

  if (!response.ok) {
    throw new Error('Failed to save history');
  }

  return response.json();
};

export const deleteHistoryItem = async (id) => {
  const response = await fetch(`${API_URL}/history/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete history');
  }

  return response.json();
};
