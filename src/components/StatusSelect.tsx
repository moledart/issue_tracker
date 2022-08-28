import React from 'react';

interface Props {
  value: string;
  onChange: (e) => void;
}
const possibleStatus = [
  { id: 'backlog', label: 'backlog' },
  { id: 'todo', label: 'To-do' },
  { id: 'inProgress', label: 'In Progress' },
  { id: 'done', label: 'Done' },
  { id: 'cancelled', label: 'Cancelled' },
];
export function StatusSelect({ value, onChange }: Props) {
  return (
    <select value={value} onChange={onChange} className="status-select">
      <option value="">Select a status to filter</option>
      {possibleStatus.map((status) => (
        <option key={status.id} value={status.id}>
          {status.label}
        </option>
      ))}
    </select>
  );
}
