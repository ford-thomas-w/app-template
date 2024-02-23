import React from "react";
import { Icon, IconName } from "./icon";
import { FontAwesome } from '@expo/vector-icons';

export type FaIconName = "list-ul" | "dashboard";
const faIcons: string[] = ["list-ul", "dashboard"];

export function makeIcon(name: IconName|FaIconName) {
  return (props: { focused?: boolean; style?: any; color: string }) => (
    <TabBarIcon name={name} {...props} />
  );
}

export function TabBarIcon({
  focused,
  ...props
}: {
  name: IconName | FaIconName;
  focused?: boolean;
  color: string;
  style?: any;
}) {
  let resolvedName: any = props.name;

  if (focused!) {
    // resolvedName = props.name + "Active";

  }
  let faName: any;
  let iconName: IconName;
  if (faIcons.includes(props.name)) {
    faName = props.name as FaIconName;
  }
  if (props.style?.length) {
    props.style.push({opacity: focused?0.8:0.4})
  }
  const opacity = focused ? 0.8: 0.4;
console.log(resolvedName, opacity)
  return <>
    {faName ?
      <FontAwesome name={faName} size={22} color={props.color} style={{opacity: opacity}} />
      :
      <Icon
        style={props.style}
        {...props}
        name={resolvedName}
        opacity={opacity}
        fill={props.color}
      />
    }
  </>
}
