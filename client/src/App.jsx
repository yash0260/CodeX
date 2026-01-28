import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Code, Copy, Trash2, Moon, Sun, Menu } from 'lucide-react';
import CodeEditor from './components/CodeEditor';
import AnalysisResults from './components/AnalysisResults';
import LanguageSelector from './components/LanguageSelector';
import HistorySidebar from './components/HistorySidebar';
import { analyzeCode } from './services/api';
import { useAuth } from './context/AuthContext';
import { useTheme } from './context/ThemeContext';
import { saveHistory } from './services/api';

export default function App() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const saveToHistory = async (code, language) => {
    try {
      await saveHistory(user.id, code, language);
    } catch (err) {
      console.error('Failed to save history:', err);
    }
  };

  const handleAnalyze = async () => {
    if (!code.trim()) {
      toast.error('Please enter some code to analyze.');
      return;
    }
    setLoading(true);
    try {
      const data = await analyzeCode(code, language);
      setResults(data);
      toast.success('✅ Analysis Complete!');
      await saveToHistory(code, language);
    } catch (err) {
      toast.error(err.message || '❌ Analysis Failed');
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast.success('📋 Code copied to clipboard!');
  };

  const handleClear = () => {
    setCode('');
    setResults(null);
    toast.success('🧹 Code cleared!');
  };

  const handleSelectHistory = (historyItem) => {
    setCode(historyItem.code);
    setLanguage(historyItem.language);
    setResults(null);
    toast.success('📜 History loaded!');
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('👋 Logged out successfully!');
    } catch (err) {
      toast.error('Logout failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors duration-300">
      <Toaster position="top-right" />

      <HistorySidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onSelectHistory={handleSelectHistory}
      />

      
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 text-white px-4 py-4 sm:px-6 sm:py-5 flex flex-wrap justify-between items-center gap-3 flex-shrink-0 shadow-lg">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-white/10 rounded-lg transition"
            aria-label="Toggle history"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
              <Code className="w-8 h-8" />
              CodeX
            </h1>
            <p className="text-blue-100 text-xs sm:text-sm">
              Suggestions, optimization, complexity & algorithm detection
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap justify-end">
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-white/10 rounded-lg transition"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <span className="text-xs sm:text-sm hidden xs:inline">
            {user?.user_metadata?.full_name || user?.email}
          </span>
          <button
            onClick={handleLogout}
            className="bg-white/20 hover:bg-white/30 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm transition font-medium"
          >
            Logout
          </button>
        </div>
      </header>

    
      <main className="flex-1 px-4 py-4 sm:px-6 sm:py-6 overflow-y-auto">
        <div className="grid gap-4 lg:gap-6 grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          
         
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 flex flex-col h-full border border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap justify-between items-center mb-3 sm:mb-4 gap-3 flex-shrink-0">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Code className="w-5 h-5" />
                Code Input
              </h2>
              <LanguageSelector value={language} onChange={setLanguage} />
            </div>

            
            <div className="flex flex-wrap gap-2 mb-4 flex-shrink-0">
              <button
                onClick={handleCopy}
                disabled={!code}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <Copy className="w-4 h-4" />
                Copy
              </button>
              <button
                onClick={handleClear}
                disabled={!code}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <Trash2 className="w-4 h-4" />
                Clear
              </button>
            </div>

           
            <div className="flex-1 min-h-[220px] mb-4 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              <CodeEditor code={code} onChange={setCode} language={language} />
            </div>

           
            <div className="flex-shrink-0">
              <button
                onClick={handleAnalyze}
                disabled={loading || !code.trim()}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Code className="w-5 h-5" />
                    Analyze Code
                  </>
                )}
              </button>
            </div>
          </div>

          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 flex flex-col h-full border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex-shrink-0 text-gray-900 dark:text-white flex items-center gap-2">
              <Code className="w-5 h-5" />
              Analysis Results
            </h2>
            <div className="flex-1 min-h-[220px] overflow-hidden">
              {results ? (
                <AnalysisResults results={results} />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-32 h-32 mb-6 text-gray-300 dark:text-gray-600">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="w-full h-full"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-2">
                    No Analysis Yet
                  </p>
                  <p className="text-gray-400 dark:text-gray-500 text-sm max-w-xs">
                    Enter your code in the editor and click &quot;Analyze Code&quot; to see detailed insights
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
