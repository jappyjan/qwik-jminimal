import type { QwikIntrinsicElements } from "@builder.io/qwik";
import { Slot, component$, useStyles$ } from "@builder.io/qwik";
import classNames from "classnames";
import styles from "./dialog.module.css?inline";

export const Dialog = component$<QwikIntrinsicElements["dialog"]>((props) => {
  useStyles$(styles);

  return (
    <dialog {...props} class={classNames("dialog", props.class)}>
      <Slot />
    </dialog>
  );
});
