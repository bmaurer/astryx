// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {CodeBlock} from '@astryxdesign/core/CodeBlock';

export function NeutralSyntaxColors() {
  return (
    <section>
      <h3 style={{fontSize: 18, margin: '0 0 6px'}}>Syntax colors</h3>
      <p
        style={{
          margin: '0 0 12px',
          color: 'var(--color-text-secondary)',
          fontSize: 12,
          lineHeight: 1.5,
        }}>
        Code foregrounds use the neutral theme’s syntax palette rather than
        component status treatments.
      </p>
      <CodeBlock
        language="typescript"
        title="theme.ts"
        code={`const palette = {
  success: '#098123',
  warning: '#f6d168',
  error: '#ca3f3e',
};`}
      />
    </section>
  );
}
