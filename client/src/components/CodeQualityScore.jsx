import { TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function CodeQualityScore({ complexity, cyclomatic }) {
  const [animatedScore, setAnimatedScore] = useState(0);

  const score = complexity?.qualityScore || 0;
  const readabilityStars = complexity?.readability || 0;
  const efficiencyStars = complexity?.efficiency || 0;
  const maintainabilityStars = complexity?.maintainability || 0;

  useEffect(() => {
    let current = 0;
    const increment = score / 30;
    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(current));
      }
    }, 20);
    
    return () => clearInterval(timer);
  }, [score]);

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Improvement';
  };

  const renderStars = (count) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < count ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}>
        ⭐
      </span>
    ));
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 p-4 rounded-xl border border-blue-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          Code Quality Score
        </h3>
        {score >= 80 ? (
          <CheckCircle className="w-5 h-5 text-green-500" />
        ) : (
          <AlertCircle className="w-5 h-5 text-yellow-500" />
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="relative w-24 h-24">
          <svg className="transform -rotate-90 w-24 h-24">
            <circle
              cx="48"
              cy="48"
              r="42"
              stroke="currentColor"
              strokeWidth="6"
              fill="none"
              className="text-gray-200 dark:text-gray-700"
            />
            <circle
              cx="48"
              cy="48"
              r="42"
              stroke="currentColor"
              strokeWidth="6"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 42}`}
              strokeDashoffset={`${2 * Math.PI * 42 * (1 - animatedScore / 100)}`}
              className={`${getScoreColor(score)} transition-all duration-1000 ease-out`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-2xl font-bold ${getScoreColor(score)}`}>
              {animatedScore}
            </span>
            <span className="text-xs text-gray-600 dark:text-gray-400">/ 100</span>
          </div>
        </div>

        <div className="flex-1">
          <div className="text-base font-semibold text-gray-900 dark:text-white mb-2">
            {getScoreLabel(score)}
          </div>
          
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600 dark:text-gray-400">Readability:</span>
              <div className="flex gap-0.5 text-sm">{renderStars(readabilityStars)}</div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600 dark:text-gray-400">Efficiency:</span>
              <div className="flex gap-0.5 text-sm">{renderStars(efficiencyStars)}</div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600 dark:text-gray-400">Maintainability:</span>
              <div className="flex gap-0.5 text-sm">{renderStars(maintainabilityStars)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
