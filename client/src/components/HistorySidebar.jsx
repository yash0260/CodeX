import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchHistory, deleteHistoryItem } from '../services/api';

export default function HistorySidebar({ isOpen, onToggle, onSelectHistory }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (isOpen && user) {
      loadHistory();
    }
  }, [isOpen, user]);

  const loadHistory = async () => {
    setLoading(true);
    try {
      const data = await fetchHistory(user.id);
      setHistory(data);
    } catch (err) {
      console.error('Failed to fetch history:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    try {
      await deleteHistoryItem(id);
      setHistory(prev => prev.filter(item => item._id !== id));
    } catch (err) {
      console.error('Failed to delete history:', err);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Recent'; 
    const date = new Date(dateString);
    return date.toString() !== 'Invalid Date' 
      ? date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
      : 'Recent';
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } w-72`}
      >
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-semibold">History</h2>
          <button
            onClick={onToggle}
            className="p-2 hover:bg-gray-800 rounded"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-64px)] p-3">
          {loading ? (
            <div className="text-center py-8 text-gray-400">Loading...</div>
          ) : history.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-sm">
              No history yet.
            </div>
          ) : (
            history.map(item => (
              <div
                key={item._id}
                onClick={() => {
                  onSelectHistory(item);
                  onToggle();
                }}
                className="p-3 mb-2 rounded-lg hover:bg-gray-800 cursor-pointer group"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm font-medium truncate">
                      {item.title || 'Previous analysis'}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {item.language} · {formatDate(item.created_at)}
                    </div>
                  </div>
                  <button
                    onClick={(e) => handleDelete(item._id, e)}
                    className="text-xs text-red-400 opacity-0 group-hover:opacity-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
