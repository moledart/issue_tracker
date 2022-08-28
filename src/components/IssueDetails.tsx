import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { IssueHeader } from './IssueHeader';
import { useUserData } from '../helpers/useUserData';
import { relativeDate } from '../helpers/relativeDate';

function useIssueData(issueNumber: string | undefined) {
  return useQuery(['issues', issueNumber], () =>
    fetch(`/api/issues/${issueNumber}`).then((res) => res.json())
  );
}

function useIssueComents(issueNumber: string | undefined) {
  return useQuery(['issues', issueNumber, 'comments'], () =>
    fetch(`/api/issues/${issueNumber}/comments`).then((res) => res.json())
  );
}

interface Props {
  comment: string;
  createdBy: string;
  createdDate: string;
}

function Comment({ comment, createdBy, createdDate }: Props) {
  const userQuery = useUserData(createdBy);

  if (userQuery.isLoading)
    return (
      <div className="comment">
        <div>
          <div className="comment-header">Loading...</div>
        </div>
      </div>
    );

  return (
    <div className="comment">
      <img
        src={userQuery.data.profilePictureUrl}
        alt={`${userQuery.data.name} avatar`}
      />
      <div>
        <div className="comment-header">
          <span>{userQuery.data.name}</span> commented{' '}
          <span>{relativeDate(createdDate)}</span>
        </div>
        <div className="comment-body">{comment}</div>
      </div>
    </div>
  );
}

export default function IssueDetails() {
  const { number } = useParams();
  const issueQuery = useIssueData(number);
  const commentsQuery = useIssueComents(number);

  return (
    <div className="issue-details">
      {issueQuery.isLoading ? (
        <p>Loading issue...</p>
      ) : (
        <>
          <IssueHeader {...issueQuery.data} />
          <main>
            <section>
              {commentsQuery.isLoading ? (
                <p>Loading...</p>
              ) : (
                commentsQuery.data.map((comment) => (
                  <Comment key={comment.id} {...comment} />
                ))
              )}
            </section>
            <aside></aside>
          </main>
        </>
      )}{' '}
    </div>
  );
}
