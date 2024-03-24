import { component$ } from "@builder.io/qwik";
import { formatHtmlText } from "~/utils/formatHtmlText";
import styles from './tip-card.module.css';
import type { RegisteredComponent } from "@builder.io/sdk-qwik";

interface Props {
  content?: string;
}
export const TipCard = component$((props: Props) => {
  const contentHtml = formatHtmlText(props.content ?? "");

  return <div class={styles.tipCard}>
    <b>Tip:</b>
    <div dangerouslySetInnerHTML={contentHtml}></div>
  </div>;
});

export const TipCardRegistryDefinition: RegisteredComponent = {
    component: TipCard,
    name: 'TipCard',
    friendlyName: 'Tip',
    inputs: [
        {
            name: 'content',
            friendlyName: 'Content',
            type: 'richText',
            required: true,
        }
    ]
}