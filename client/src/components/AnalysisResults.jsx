import { useState } from 'react';
import { BarChart3, Cpu, Zap, FileCode, AlertCircle } from 'lucide-react';
import CodeQualityScore from './CodeQualityScore';

export default function AnalysisResults({ results }) {
  if (!results) return null;

  const [activeTab, setActiveTab] = useState('complexity');

  const tabs = [
    { id: 'complexity', label: 'Complexity', icon: BarChart3 },
    { id: 'explanation', label: 'Explanation', icon: FileCode },
    { id: 'algos', label: 'Algorithms', icon: Cpu },
    { id: 'optimizations', label: 'Optimization', icon: Zap },
  ];

  const getComplexityColor = (complexity) => {
    if (complexity.includes('1') || complexity.includes('log')) {
      return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
    }
    if (complexity.includes('n)') && !complexity.includes('²')) {
      return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
    }
    if (complexity.includes('²')) {
      return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
    }
    return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
  };

  const getComplexityBadge = (complexity) => {
    if (complexity.includes('1') || complexity.includes('log')) return '✅ Excellent';
    if (complexity.includes('n)') && !complexity.includes('²')) return '✅ Good';
    if (complexity.includes('²')) return '⚠️ Fair';
    return '❌ Poor';
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4 flex-shrink-0">
        <CodeQualityScore
          complexity={results.complexity}
          cyclomatic={results.complexity.cyclomatic}
        />
      </div>
      <section className="mb-4 flex-shrink-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div
            className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg ${getComplexityColor(
              results.complexity.time
            )}`}
          >
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              <p className="text-xs font-medium text-gray-600 dark:text-gray-300">Time</p>
            </div>
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              {results.complexity.time.split(' ')[0]}
            </p>
            <p className="text-xs mt-1 text-gray-600 dark:text-gray-400">
              {getComplexityBadge(results.complexity.time)}
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 p-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <Cpu className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              <p className="text-xs font-medium text-gray-600 dark:text-gray-300">Space</p>
            </div>
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              {results.complexity.space.split(' ')[0]}
            </p>
            <p className="text-xs mt-1 text-gray-600 dark:text-gray-400">
              {getComplexityBadge(results.complexity.space)}
            </p>
          </div>
        </div>
      </section>
      <div className="flex-1 min-h-0 flex flex-col">
        <div className="flex gap-1 mb-3 flex-shrink-0 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 text-xs sm:text-sm font-medium rounded-md transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
        <div className="flex-1 min-h-0 bg-gray-50 dark:bg-gray-900 rounded-lg p-4 overflow-y-auto border border-gray-200 dark:border-gray-700">
          {activeTab === 'complexity' && (
            <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Time Complexity
                </h4>
                <p className="leading-relaxed">
                  Your code has a time complexity of{' '}
                  <span className="font-mono bg-blue-100 dark:bg-blue-900 px-1.5 py-0.5 rounded">
                    {results.complexity.time.split(' ')[0]}
                  </span>
                  , which means the execution time{' '}
                  {results.complexity.time.includes('²')
                    ? 'grows quadratically'
                    : results.complexity.time.includes('n')
                    ? 'scales linearly'
                    : 'is constant'}{' '}
                  with input size.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Space Complexity</h4>
                <p className="leading-relaxed">
                  Memory usage is{' '}
                  <span className="font-mono bg-green-100 dark:bg-green-900 px-1.5 py-0.5 rounded">
                    {results.complexity.space.split(' ')[0]}
                  </span>
                  .
                </p>
              </div>
            </div>
          )}

          {activeTab === 'explanation' && (
            <div className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {results.explanation}
            </div>
          )}

          {activeTab === 'algos' && (
            <div className="space-y-4">
              <div className="space-y-2">
                {results.algorithms.detected.map((algo, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                  >
                    <span className="font-medium text-gray-900 dark:text-white">{algo.name}</span>
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${
                        algo.confidence === 'High'
                          ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                          : 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                      }`}
                    >
                      {algo.confidence}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Details</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                  {results.algorithms.details}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'optimizations' && (
            <div className="space-y-4">
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-400 dark:border-yellow-600">
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                    {results.optimizations}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {results.errors && results.errors.length > 0 && (
        <section className="mt-4 flex-shrink-0">
          <h3 className="text-lg font-semibold mb-3 text-red-600 dark:text-red-400 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Syntax Errors
          </h3>
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800 text-sm max-h-40 overflow-y-auto">
            {results.errors.map((err, idx) => (
              <div key={idx} className="mb-2 text-red-900 dark:text-red-200">
                <span className="font-bold">
                  Line {err.line}, Col {err.column ?? 0}:
                </span>{' '}
                {err.message}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
