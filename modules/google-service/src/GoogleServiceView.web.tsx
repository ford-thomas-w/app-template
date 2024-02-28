import * as React from 'react';

import { GoogleServiceViewProps } from './GoogleService.types';

export default function GoogleServiceView(props: GoogleServiceViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
