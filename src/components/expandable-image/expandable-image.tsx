import type { QwikIntrinsicElements } from "@builder.io/qwik";
import {
  component$,
  useSignal,
  $,
  useOnWindow,
  useStyles$,
} from "@builder.io/qwik";
import { Dialog } from "../dialog/dialog";
import styles from "./expandable-image.module.css?inline";
import classNames from "classnames";
import { Link } from "@builder.io/qwik-city";
import type { RegisteredComponent } from "@builder.io/sdk-qwik";
import { srcToSrcSet } from "../../utils/srcToSrcSet";

interface Props {
  onClick$?: () => void;
}
export const ExpandableImage = component$<
  Omit<QwikIntrinsicElements["img"], "onClick$"> & Props
>((props) => {
  useStyles$(styles);

  const dialogRef = useSignal<HTMLDialogElement>();

  const openDialog = $(() => {
    if (!dialogRef.value) {
      console.warn("Dialog ref not set");
      return;
    }

    dialogRef.value.showModal();
  });

  useOnWindow(
    "keydown",
    $((event) => {
      if (event.key === "Escape") {
        dialogRef.value?.close();
      }
    }),
  );

  const srcSet =
    props.srcset ?? (props.src ? srcToSrcSet(props.src) : undefined);

  return (
    <div class={classNames("container", "clickable")}>
      <img
        loading="lazy"
        {...props}
        class={classNames("image", props.class)}
        onClick$={openDialog}
        srcset={srcSet}
      />
      <span class="label">Click to enlarge</span>

      <Dialog ref={dialogRef} onClick$={() => dialogRef.value?.close()}>
        <div class="dialogContentContainer">
          <img
            loading="lazy"
            src={props.src}
            alt={props.alt}
            width={props.width}
            height={props.height}
            class="dialogImage"
            srcset={srcSet}
          />
          <Link href={props.src} target="_blank">
            <div class="openInNewTabLinkContainer">
              <span class="anchor">Open in new tab</span>
            </div>
          </Link>
        </div>
      </Dialog>
    </div>
  );
});

export const ExpandableImageRegistryDefinition: RegisteredComponent = {
  component: ExpandableImage,
  name: "ExpandableImage",
  inputs: [
    {
      name: "src",
      friendlyName: "Image",
      type: "file",
      required: true,
      allowedFileTypes: ["jpeg", "png", "jpg", "svg", "gif", "webp"],
    },
    {
      name: "alt",
      friendlyName: "Alt Text",
      type: "string",
      required: true,
    },
  ],
};
