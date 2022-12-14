import React from 'react';
import { Link } from 'react-router-dom';
import { GoIssueOpened, GoIssueClosed, GoComment } from 'react-icons/go';
import { relativeDate } from '../helpers/relativeDate';
import { useUserData } from '../helpers/useUserData';
import { Label } from './Label';
import { useQueryClient } from '@tanstack/react-query';
import fetchWithError from '../helpers/fetchWithError';

interface IssueItemProps {
  assignee: string;
  comments: string[];
  completedDate: string | null;
  createdBy: string;
  createdDate: string;
  dueDate: string | null;
  id: string;
  labels: string[];
  number: number;
  status: string;
  title: string;
}
export function IssueItem({
  title,
  number,
  assignee,
  comments,
  createdBy,
  createdDate,
  labels,
  status,
}: IssueItemProps) {
  const assigneeUser = useUserData(assignee);
  const createdByUser = useUserData(createdBy);
  const queryClient = useQueryClient();
  return (
    <li
      onMouseEnter={() => {
        queryClient.prefetchQuery(['issues', number.toString()], () =>
          fetchWithError(`/api/issues/${number}`)
        );
        queryClient.prefetchQuery(
          ['issues', number.toString(), 'comments'],
          () => fetchWithError(`/api/issues/${number}/comments`)
        );
      }}
    >
      <div>
        {status === 'done' || status === 'closed' ? (
          <GoIssueClosed style={{ color: 'red' }} />
        ) : (
          <GoIssueOpened style={{ color: 'green' }} />
        )}
      </div>
      <div className="issue-content">
        <span>
          <Link to={`/issue/${number}`}>{title}</Link>
          {labels.map((label) => (
            <Label key={label} label={label} />
          ))}
        </span>
        <small>
          #{number} opened {relativeDate(createdDate)}{' '}
          {createdByUser?.isSuccess ? `by ${createdByUser.data.name}` : null}
        </small>
      </div>
      {assignee && assigneeUser?.isSuccess ? (
        <img
          src={assigneeUser.data.profilePictureUrl}
          className="assigned-to"
          alt={`Assigned to ${assigneeUser.data.name}`}
        />
      ) : null}
      <span className="comment-count">
        {comments.length > 0 ? (
          <>
            {' '}
            <GoComment />
            {comments.length}
          </>
        ) : null}
      </span>
    </li>
  );
}
