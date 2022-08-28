import React from 'react';
import { useLabelsData } from '../helpers/useLabels';

export function Label({ label }: { label: string }) {
  const labelsQuery = useLabelsData();
  if (labelsQuery.isLoading) return null;
  const labelObj = labelsQuery.data.find((el) => el.id === label);
  if (!labelObj) return null;
  return <span className={`label ${labelObj.color}`}>{labelObj.name}</span>;
}
