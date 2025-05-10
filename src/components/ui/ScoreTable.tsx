import React from 'react';
import { Round, Team } from '../../types';

interface ScoreTableProps {
  rounds: Round[];
  teams: Team[];
  showTotals?: boolean;
}

export const ScoreTable: React.FC<ScoreTableProps> = ({
  rounds,
  teams,
  showTotals = true,
}) => {
  // Calculate total scores
  const totalScores = teams.reduce((acc, team) => {
    acc[team.id] = rounds.reduce(
      (sum, round) => sum + (round.scores[team.id] || 0), 
      0
    );
    return acc;
  }, {} as Record<string, number>);

  if (rounds.length === 0) {
    return (
      <div className="text-center p-4 text-gray-500 dark:text-gray-400 italic">
        No rounds recorded yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Round
            </th>
            {teams.map((team) => (
              <th
                key={team.id}
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                {team.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
          {rounds.map((round, index) => (
            <tr key={round.id} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : ''}>
              <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                {index + 1}
              </td>
              {teams.map((team) => (
                <td
                  key={team.id}
                  className="px-4 py-2 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300"
                >
                  {round.scores[team.id] || 0}
                </td>
              ))}
            </tr>
          ))}
          {showTotals && (
            <tr className="bg-gray-100 dark:bg-gray-700 font-bold">
              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                Total
              </td>
              {teams.map((team) => (
                <td
                  key={team.id}
                  className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100"
                >
                  {totalScores[team.id] || 0}
                </td>
              ))}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};