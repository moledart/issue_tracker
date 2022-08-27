import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { IssueItem } from './IssueItem';

export default function IssuesList() {
  const issuesQuery = useQuery(['issues'], () =>
    fetch('/api/issues').then((res) => res.json())
  );
  console.log(issuesQuery.data);
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
