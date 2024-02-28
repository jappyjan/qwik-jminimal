import {
  Resource,
  Slot,
  component$,
  useResource$,
  useSignal,
  useStyles$,
} from "@builder.io/qwik";
import styles from "./page-grid.module.css?inline";
import classnames from "classnames";
import { Card, CardVariant } from "../card/card";
import type { RegisteredComponent } from "@builder.io/sdk-qwik";
import { fetchEntries } from "@builder.io/sdk-qwik";
import { Link } from "@builder.io/qwik-city";
import classNames from "classnames";

enum PageRowVariant {
  one = "one",
  two = "two",
}

interface PageRowProps {
  variant: PageRowVariant;
}
const PageRow = component$((props: PageRowProps) => {
  useStyles$(styles);

  return (
    <div
      class={classnames(
        "gridRow",
        props.variant === PageRowVariant.one ? "variantOne" : "variantTwo",
      )}
    >
      <Slot />
    </div>
  );
});

enum PageType {
  Page = "page",
  Guide = "guide",
  Product = "product",
  Tool = "tool",
}

interface PageGridProps {
  pageType: PageType;
  title?: string;
  hideTitleIfEmpty?: boolean;
  href?: string;
}

interface Page {
  id: string;
  data: {
    type: PageType;
    title: string;
    description?: string;
    previewImage: string;
    url: string;
  };
}

const LoadingState = component$(() => {
  return (
    <PageRow variant={PageRowVariant.one}>
      <Card title="" variant={CardVariant.large} isLoading />
      <Card title="" variant={CardVariant.small} isLoading />
      <Card title="" variant={CardVariant.small} isLoading />
    </PageRow>
  );
});

export const PageGrid = component$((props: PageGridProps) => {
  const showTitle = useSignal(!!props.title);
  const hideTitleIfEmpty = props.hideTitleIfEmpty ?? false;

  const matches = useResource$(() =>
    fetchEntries({
      model: "page",
      apiKey: import.meta.env.PUBLIC_BUILDER_API_KEY,
      query: {
        data: {
          type: props.pageType,
        },
      },
    }).then((_rawPages) => {
      const pages = _rawPages as { results?: Page[] } | undefined;
      if (pages?.results?.length === 0 && hideTitleIfEmpty) {
        showTitle.value = false;
      }

      const rows: Array<Page[]> = [];

      pages?.results?.forEach((page, index) => {
        if (index % 3 === 0) {
          rows.push([]);
        }
        rows[rows.length - 1].push(page);
      });

      return rows;
    }),
  );

  return (
    <div class="grid">
      {showTitle.value &&
        (props.href ? (
          <Link class={classNames("anchor", "title")} href={props.href}>
            {props.title}
          </Link>
        ) : (
          <span class="title">{props.title}</span>
        ))}
      <Resource
        value={matches}
        onPending={() => <LoadingState />}
        onRejected={(error) => <>Error: {error.message}</>}
        onResolved={(rows) => (
          <>
            {(rows as Array<Page[]>).map((row, rowIndex) => (
              <PageRow
                key={`row-${rowIndex}`}
                variant={
                  rowIndex % 2 === 0 ? PageRowVariant.one : PageRowVariant.two
                }
              >
                {row.map((page, pageIndex) => {
                  let variant = CardVariant.small;

                  if (rowIndex % 2 === 0 && pageIndex === 0) {
                    variant = CardVariant.large;
                  }

                  if (rowIndex % 2 !== 0 && pageIndex === 2) {
                    variant = CardVariant.large;
                  }

                  return (
                    <Card
                      key={`page-${page.id}`}
                      variant={variant}
                      title={page.data.title}
                      headerImageSrc={page.data.previewImage}
                      description={page.data.description}
                      href={page.data.url}
                    />
                  );
                })}
              </PageRow>
            ))}
          </>
        )}
      />
    </div>
  );
});

export const PageGridRegistryDefinition: RegisteredComponent = {
  component: PageGrid,
  name: "PageGrid",
  inputs: [
    {
      name: "pageType",
      friendlyName: "Type",
      type: "string",
      enum: Object.values(PageType),
      required: true,
    },
    {
      name: "title",
      friendlyName: "Title",
      type: "string",
      required: false,
    },
    {
      name: "hideTitleIfEmpty",
      friendlyName: "Hide if title is empty?",
      type: "boolean",
      required: false,
    },
    {
      name: "href",
      friendlyName: "href",
      type: "string",
      required: false,
    },
  ],
};
