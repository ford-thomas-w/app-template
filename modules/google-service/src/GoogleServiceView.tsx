import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { GoogleServiceViewProps } from './GoogleService.types';

const NativeView: React.ComponentType<GoogleServiceViewProps> =
  requireNativeViewManager('GoogleService');

export default function GoogleServiceView(props: GoogleServiceViewProps) {
  return <NativeView {...props} />;
}
