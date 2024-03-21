import { component$ } from "@builder.io/qwik";
import EmojiSvg from "./emoji.svg?jsx";
import styles from "./button.module.css";
import type { RegisteredComponent } from "@builder.io/sdk-qwik";
import classNames from "classnames";

interface Props {
  slug: string;
  text: string;
}
export const BuyMeACoffeButton = component$((props: Props) => {
  return (
    <div class={classNames("button", styles.wrapper)}>
      <a
        class={styles.bmcButton}
        target="_blank"
        href={`https://buymeacoffee.com/${props.slug}`}
      >
        <EmojiSvg class={styles.bmcButtonSvg} />
        <span class={styles.bmcButtonText}>{props.text}</span>
      </a>
    </div>
  );
});

export const BuyMeACoffeeButtonRegistryDefinition = (
  defaultSlug: string,
  defaultText: string
): RegisteredComponent => ({
  component: BuyMeACoffeButton,
  name: "BuyMeACoffe Button",
  inputs: [
    {
      name: "slug",
      friendlyName: "BMC Slug",
      type: "string",
      required: true,
      defaultValue: defaultSlug,
    },
    {
      name: "text",
      friendlyName: "Label",
      type: "string",
      required: true,
      defaultValue: defaultText,
    },
  ],
});
