import React from 'react';
import { Link } from 'react-router-dom';
import { GoIssueOpened, GoIssueClosed, GoComment } from 'react-icons/go';
import { relativeDate } from '../helpers/relativeDate';
import { useUserData } from '../helpers/useUserData';

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
  return (
    <li>
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
            <span key={label} className={`label red`}>
              {label}
            </span>
          ))}
        </span>
        <small>
          #{number} opened {relativeDate(createdDate)}{' '}
          {createdByUser.isSuccess ? `by ${createdByUser.data.name}` : null}
        </small>
      </div>
      {assigneeUser.isSuccess ? (
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
