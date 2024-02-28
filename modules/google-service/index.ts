import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to GoogleService.web.ts
// and on native platforms to GoogleService.ts
import GoogleServiceModule from './src/GoogleServiceModule';
import GoogleServiceView from './src/GoogleServiceView';
import { ChangeEventPayload, GoogleServiceViewProps } from './src/GoogleService.types';

// Get the native constant value.
export const PI = GoogleServiceModule.PI;

export function hello(): string {
  return GoogleServiceModule.hello();
}

export async function setValueAsync(value: string) {
  return await GoogleServiceModule.setValueAsync(value);
}

const emitter = new EventEmitter(GoogleServiceModule ?? NativeModulesProxy.GoogleService);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { GoogleServiceView, GoogleServiceViewProps, ChangeEventPayload };
