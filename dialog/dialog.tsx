import type { QRL } from "@builder.io/qwik";
import { Slot, component$ } from "@builder.io/qwik";
import classNames from "classnames";
import styles from "./dialog.module.css";

interface Props {
  onClose?: QRL<() => void>;
  class?: string;
}
export const Dialog = component$<Props>((props) => {
  const { onClose, ...rest } = props;

  return (
    <dialog {...rest} class={classNames(props.class, styles.dialog)}>
      <div
        class={styles.backdrop}
        onClick$={() => {
          if (typeof onClose !== "function") {
            return;
          }

          onClose();
        }}
      />
      <div class={styles.content}>
        <Slot />
      </div>
    </dialog>
  );
});
