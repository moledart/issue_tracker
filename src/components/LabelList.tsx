import React from 'react';
import { useLabelsData } from '../helpers/useLabels';
import { Label } from './Label';

interface Props {
  selected: string[];
  toggle: (label: string) => void;
}

export default function LabelList({ selected, toggle }: Props) {
  const labelsQuery = useLabelsData();
  return (
    <div className="labels">
      <h3>Labels</h3>
      {labelsQuery.isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {labelsQuery.data.map((label) => (
            <li key={label.id}>
              <button
                className={`label ${
                  selected.includes(label.id) ? 'selected' : ''
                } ${label.color}`}
                onClick={() => toggle(label.name)}
              >
                {label.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
