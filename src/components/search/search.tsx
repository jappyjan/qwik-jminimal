import type { IntrinsicElements } from "@builder.io/qwik";
import { component$, useStyles$ } from "@builder.io/qwik";
import SearchIcon from "./search.svg?jsx";
import styles from "./search.module.css?inline";
import classNames from "classnames";

export const Search = component$<IntrinsicElements["button"]>((props) => {
  useStyles$(styles);

  return (
    <>
      <button {...props} class={classNames("button", props.class)}>
        <SearchIcon class="searchIcon" />
      </button>
      <dialog>
        <form>
          <input type="search" />
        </form>
      </dialog>
    </>
  );
});
