import type { IntrinsicElements } from "@builder.io/qwik";
import { component$, useSignal, $ } from "@builder.io/qwik";
import SearchIcon from "./search.svg?jsx";
import styles from "./search.module.css";
import classNames from "classnames";
import { Dialog } from "../dialog/dialog";

export const Search = component$<IntrinsicElements["button"]>((props) => {
  const showDialog = useSignal(false);

  const handleSearchClick = $(() => {
    showDialog.value = true;
  });

  return (
    <>
      <button
        {...props}
        class={classNames(styles.button, props.class)}
        onClick$={handleSearchClick}
      >
        <SearchIcon class={styles.searchIcon} />
      </button>

      <Dialog
        isOpen={showDialog.value}
        onClose={$(() => {
          showDialog.value = false;
        })}
      >
        <form>
          <input type="search" />
        </form>
      </Dialog>
    </>
  );
});
