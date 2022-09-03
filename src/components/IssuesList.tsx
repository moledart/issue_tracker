import React, { useState } from 'react';
import {
  useQuery,
  useIsFetching,
  QueryClient,
  useQueryClient,
} from '@tanstack/react-query';
import { IssueItem } from './IssueItem';
import fetchWithError from '../helpers/fetchWithError';
import Loader from './Loader';

export default function IssuesList({
  labels,
  status,
}: {
  labels: string[];
  status: string;
}) {
  const [searchValue, setSearchValue] = useState('');
  const queryClient = useQueryClient();

  const issuesQuery = useQuery(
    ['issues', { labels, status }],
    async ({ signal }) => {
      const statusString = status ? `&status=${status}` : '';
      const labelsString = labels.map((label) => `labels[]=${label}`).join('&');
      const results = await fetchWithError(
        `/api/issues?${labelsString}${statusString}`,
        {
          signal,
        }
      );

      results.forEach((issue) =>
        queryClient.setQueryData(['issues', issue.number.toString()], issue)
      );

      return results;
    }
  );

  const searchQuery = useQuery(
    ['issues', 'search', searchValue],
    ({ signal }) =>
      fetch(`/api/search/issues?q=${searchValue}`, { signal }).then((res) =>
        res.json()
      ),
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
      <h2>Issues List {issuesQuery.isFetching ? <Loader /> : null}</h2>
      {issuesQuery.isLoading ? (
        <p>Loading...</p>
      ) : issuesQuery.isError && issuesQuery.error instanceof Error ? (
        <p>{issuesQuery.error.message}</p>
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
