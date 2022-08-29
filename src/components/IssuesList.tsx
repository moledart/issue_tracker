import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IssueItem } from './IssueItem';

export default function IssuesList({
  labels,
  status,
}: {
  labels: string[];
  status: string;
}) {
  const [searchValue, setSearchValue] = useState('');
  const issuesQuery = useQuery(['issues', { labels, status }], () => {
    const statusString = status ? `&status=${status}` : '';
    const labelsString = labels.map((label) => `labels[]=${label}`).join('&');
    return fetch(`/api/issues?${labelsString}${statusString}`).then((res) =>
      res.json()
    );
  });

  const searchQuery = useQuery(
    ['issues', 'search', searchValue],
    () =>
      fetch(`/api/search/issues?q=${searchValue}`).then((res) => res.json()),
    {
      enabled: searchValue.length > 0,
    }
  );

  return (
    <div>
      <form
        onSubmit={(event: any) => {
          event.preventDefault();
          setSearchValue(event.target.elements.search.value);
        }}
      >
        <label htmlFor="search">Search Issues</label>
        <input
          type="search"
          placeholder="Search"
          name="search"
          id="search"
          onChange={(event) => {
            if (event.target.value.length === 0) {
              setSearchValue('');
            }
          }}
        />
      </form>
      <h2>Issues List</h2>
      {issuesQuery.isLoading ? (
        <p>Loading...</p>
      ) : searchQuery.fetchStatus === 'idle' && searchQuery.isLoading ? (
        <ul className="issues-list">
          {issuesQuery.data.map((issue) => (
            <IssueItem key={issue.id} {...issue} />
          ))}
        </ul>
      ) : (
        <>
          <h2>Search results</h2>
          {searchQuery.isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <p>{searchQuery.data.count} Results</p>
              <ul className="issues-list">
                {searchQuery.data.items.map((issue) => (
                  <IssueItem key={issue.id} {...issue} />
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  );
}
