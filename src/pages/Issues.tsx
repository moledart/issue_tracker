import React, { useState } from 'react';
import IssuesList from '../components/IssuesList';
import LabelList from '../components/LabelList';
import { StatusSelect } from '../components/StatusSelect';

export default function Issues() {
  const [labels, setLabels] = useState<string[]>([]);
  const [status, setStatus] = useState<string>('');
  const toggle = (label: string) => {
    setLabels((currentLabels) =>
      currentLabels.includes(label)
        ? currentLabels.filter((currentLabel) => currentLabel !== label)
        : [...currentLabels, label]
    );
  };
  return (
    <div>
      <main>
        <section>
          <h1>Issues</h1>
          <IssuesList labels={labels} status={status} />
        </section>
        <aside>
          <LabelList selected={labels} toggle={toggle} />
          <h3>Status</h3>
          <StatusSelect
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </aside>
      </main>
    </div>
  );
}
