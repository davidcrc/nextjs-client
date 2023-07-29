## Setup apollo

```bash
npm install @apollo/client@rc @apollo/experimental-nextjs-app-support
```

-Doc: https://www.apollographql.com/blog/apollo-client/next-js/how-to-use-apollo-client-with-next-js-13/

### add codegen

```bash
npm i -D @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-graphql-request @graphql-codegen/typescript-operations @graphql-codegen/typescript-react-apollo
```

- create a codegen.ts

```ts
import type { CodegenConfig } from "@graphql-codegen/cli";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

const config: CodegenConfig = {
  schema: `${process.env.DB_HOST}/graphql`,
  documents: ["./src/graphql/**/*.graphql"],
  generates: {
    "./src/generated/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
    },
  },
};

export default config;
```

- add generate to package.json

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "generate": "graphql-codegen --config codegen.ts" 👈 here
},
```

- then , you can use, for this example and server components:

```ts
const { data, loading, error } = await getClient().query({
  query: ProjectsDocument,
});
```

- and for client components, use loading.tsx to display load:

```ts
const { data } = useSuspenseQuery<ProjectsQuery>(ProjectsDocument);
```
