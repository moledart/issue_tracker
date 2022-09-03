import React from 'react';
import { GoIssueClosed, GoIssueOpened } from 'react-icons/go';
import { possibleStatus } from '../helpers/defaultData';
import { useUserData } from '../helpers/useUserData';
import { relativeDate } from '../helpers/relativeDate';

interface Props {
  title: string;
  number: string;
  status: string;
  createdBy: string;
  createdDate: string;
  comments: string[];
}
export const IssueHeader = ({
  title,
  number,
  status,
  createdBy,
  createdDate,
  comments,
}: Props) => {
  const statusObject = possibleStatus.find((ps) => ps.id === status);
  const createdUser = useUserData(createdBy);

  return (
    <header>
      <h2>
        {title} <span># {number}</span>
      </h2>
      <div>
        <span
          className={
            status === 'done' || status === 'cancelled' ? 'closed' : 'open'
          }
        >
          {status === 'done' || status === 'closed' ? (
            <GoIssueClosed />
          ) : (
            <GoIssueOpened />
          )}
          {statusObject?.label}
        </span>
        <span className="created-by">
          {createdUser?.isLoading ? '...' : createdUser?.data?.name}
        </span>{' '}
        opened this issue {relativeDate(createdDate)} | {comments.length}{' '}
        comments
      </div>
    </header>
  );
};
