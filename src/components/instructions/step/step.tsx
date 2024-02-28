import { component$, useStyles$ } from "@builder.io/qwik";
import styles from "./step.module.css?inline";
import { formatHtmlText } from "../../../utils/formatHtmlText";
import { ExpandableImage } from "../../expandable-image/expandable-image";

export interface StepProps {
  index: number;
  title: string;
  description: string;
  image?: string;
}
export const Step = component$<StepProps>((props) => {
  useStyles$(styles);
  const formattedDescription = formatHtmlText(props.description);

  return (
    <section>
      <h3 class="index">Step {props.index}</h3>
      <h2 class="title">{props.title}</h2>
      {props.image && <ExpandableImage src={props.image} class="image" />}
      <div dangerouslySetInnerHTML={formattedDescription} class="content" />
    </section>
  );
});
