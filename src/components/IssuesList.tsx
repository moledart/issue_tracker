import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { IssueItem } from './IssueItem';

export default function IssuesList({
  labels,
  status,
}: {
  labels: string[];
  status: string;
}) {
  const issuesQuery = useQuery(['issues', { labels, status }], () => {
    const statusString = status ? `&status=${status}` : '';
    const labelsString = labels.map((label) => `labels[]=${label}`).join('&');
    return fetch(`/api/issues?${labelsString}${statusString}`).then((res) =>
      res.json()
    );
  });
  return (
    <div>
      <h2>Issues List</h2>
      {issuesQuery.isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="issues-list">
          {issuesQuery.data.map((issue) => (
            <IssueItem key={issue.id} {...issue} />
          ))}
        </ul>
      )}
    </div>
  );
}
