import { component$, useStyles$ } from "@builder.io/qwik";
import styles from "./prerequesites.module.css?inline";
import classNames from "classnames";
import { ExpandableImage } from "../../expandable-image/expandable-image";

export interface PrerequesitesProps {
  class?: string;
  title?: string;
  items: Array<{ label: string }>;
  image?: string;
}
export const Prerequesites = component$<PrerequesitesProps>((props) => {
  useStyles$(styles);
  return (
    <section class={props.class}>
      <h2 class="title">{props.title ? props.title : "Prerequesites"}</h2>
      <div
        class={classNames(
          { contentContainer: !!props.image },
          { contentContainerNoImage: !props.image },
        )}
      >
        {
          // eslint-disable-next-line qwik/jsx-img
          props.image && <ExpandableImage class="image" src={props.image} />
        }
        <ul class="list">
          {props.items.map((item, index) => (
            <li key={`prerequesite-${index}`} class="listItem">
              <label class={classNames("clickable", "labelContainer")}>
                <input
                  type="checkbox"
                  class={classNames("checkbox", {
                    checkboxNoImage: !props.image,
                  })}
                />
                <span>{item.label}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
});
