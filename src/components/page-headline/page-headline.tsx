import { component$, useStyles$ } from "@builder.io/qwik";
import styles from "./page-headline.module.css?inline";
import type { RegisteredComponent } from "@builder.io/sdk-qwik";

interface Props {
  title: string;
  subtitle?: string;
}

export const PageHeadline = component$((props: Props) => {
  useStyles$(styles);

  return (
    <header class="container">
      <h1 class="title">{props.title}</h1>
      {props.subtitle && <h2 class="subtitle">{props.subtitle}</h2>}
    </header>
  );
});

export const PageHeadlineRegistryDefinition: RegisteredComponent = {
  component: PageHeadline,
  name: "PageHeadline",
  inputs: [
    {
      name: "title",
      friendlyName: "Title",
      type: "string",
      required: true,
    },
    {
      name: "subtitle",
      friendlyName: "Subtitle",
      type: "string",
      required: false,
    },
  ],
};
