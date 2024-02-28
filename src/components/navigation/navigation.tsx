import type { IntrinsicElements } from "@builder.io/qwik";
import { component$, useStyles$ } from "@builder.io/qwik";
import styles from "./navigation.module.css?inline";
import { DynamicLinkList } from "../dynamic-link-list/dynamic-link-list";
import classNames from "classnames";

export const Navigation = component$<IntrinsicElements["nav"]>((props) => {
  useStyles$(styles);

  return (
    <nav {...props} class={classNames("container", props.class)}>
      <DynamicLinkList linkModel="navigation-link" />
    </nav>
  );
});
