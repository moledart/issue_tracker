import React from 'react';
import { Link } from 'react-router-dom';
import { GoIssueOpened, GoIssueClosed, GoComment } from 'react-icons/go';
import { relativeDate } from '../helpers/relativeDate';

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
          #{number} opened {relativeDate(createdDate)} by {createdBy}
        </small>
      </div>
      {assignee ? <div>{assignee}</div> : null}
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
