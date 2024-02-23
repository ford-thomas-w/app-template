import React from 'react';
import { SvgProps } from 'react-native-svg';
// Manually import your SVG components
import Logo from '@/assets/icons/logo.svg';
import More from '@/assets/icons/more.svg';
import LogoSmall from '@/assets/icons/logo-small.svg';
import ExploreActive from '@/assets/icons/explore-active.svg';
import Explore from '@/assets/icons/explore.svg';
// import HomeActive from '@/assets/icons/home-active.svg';
import Home from '@/assets/icons/home.svg.jsx';
import Messages from '@/assets/icons/messages.svg';
import MessagesActive from '@/assets/icons/messages-active.svg';
import Notifications from '@/assets/icons/notifications.svg';
// Map for easier access
const iconComponents = {
  logo: Logo,
  more: More,
  logoSmall: LogoSmall,
  exploreActive: ExploreActive,
  explore: Explore,
  home: Home,
  // homeActive: HomeActive,
  messages: Messages,
  messagesActive: MessagesActive,
  notifications: Notifications
};
export type IconName = keyof typeof iconComponents;

export function Icon({
  name,
  fill,
  style,
  width,
  height,
  opacity,
}: {
  name: IconName;
  fill: string;
  opacity?: number;
  style?: any;
  width?: number;
  height?: number;
}) {
  console.log('Icon name: ', name);
  const SvgComponent = iconComponents[name];
  console.log(SvgComponent)
  if (!SvgComponent) {
    console.error(`Icon not found: ${name}.`);
    return null; // Or render a default/fallback icon
  }
  console.log(name, 'Icon style:', style)

  return <SvgComponent size={22} color={fill} opacity={opacity||1} style={style} />;
}