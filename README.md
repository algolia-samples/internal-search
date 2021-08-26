# Internal search with Google Drive, Salesforce and Confluence

This sample app allows you to index and search content from Google Drive, Salesforce and Confluence in a single interface.

## Features

The sample app uses the following features:

- Easily index content from Google Drive, Salesforce and Confluence to Algolia using [Tray.io](https://tray.io/) with little code
- Search all your content in a single search interface built with [React InstantSearch](https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/react/)
- Dynamically display facets using [DynamicWidgets](https://www.algolia.com/doc/api-reference/widgets/dynamic-facets/react/)

## Demo (Try it yourself!)

<img src="demo/demo_internal_search.gif?raw=true" alt="A short video clip displaying the Algolia internal search application" align="center">

[Access the demo](https://preview.algolia.com/internal-search-demo/)

## How to run the sample app locally

The [client](client) is a React app using [React InstantSearch](https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/react/).

This sample app collects data from Google Drive, Salesforce, and Confluence. The indexing for each data source is implemented in three different [Tray.io](https://tray.io/) workflows.

### 1. Clone this repository

```
git clone git@github.com:algolia-samples/internal-search.git
```

Copy the file `.env.example` to the directory of the [client](client) and rename it to `.env`.

```bash
cp .env.example client/.env
```

### 2. Set up Algolia

To use this sample app, you need an Algolia account. If you don't have one already, [create an account for free](https://www.algolia.com/users/sign-up). Note your [Application ID](https://deploy-preview-5789--algolia-docs.netlify.app/doc/guides/sending-and-managing-data/send-and-update-your-data/how-to/importing-with-the-api/#application-id).

In the `.env` file, set the environment variables `ALGOLIA_APP_ID`:

```bash
ALGOLIA_APP_ID=<replace-with-your-algolia-app-id>
```

### 3. Create your Algolia index

After you set up your Algolia account and Algolia application, [create and populate an index](https://www.algolia.com/doc/guides/sending-and-managing-data/prepare-your-data/).

To upload your data, you can use the [Algolia dashboard](https://www.algolia.com/doc/guides/sending-and-managing-data/send-and-update-your-data/how-to/importing-from-the-dashboard/) or use one of Algolia's [API clients](https://www.algolia.com/developers/#integrations).

After creating the index, set the environment variables `ALGOLIA_INDEX_NAME` and `ALGOLIA_API_KEY` in the `.env` file:

```bash
ALGOLIA_INDEX_NAME=<replace-with-your-algolia-index-name>
ALGOLIA_API_KEY=<replace-with-your-algolia-api-key>
```

### 6. Populate your index using Tray.io

We provide three Tray.io [workflows](https://tray.io/documentation/platform/version-control/importing-exporting-workflows/) for indexing the content, one for each data source:

- [Google Drive](workflows/workflow_google-drive-algolia.json)
- [Salesforce](workflows/workflow_salesforce-algolia.json)
- [Confluence](workflows/confluence-algolia.json)

For example, if you want to index content from **Salesforce**:

1. Create an account on [Tray.io](https://tray.io) (They offer a 14 days trial period).
2. Upload the workflow JSON file (Tray.io will ask you to authenticate against Algolia and Salesforce).
3. On Tray.io, set the `indexName` in the project's [config data](https://tray.io/documentation/embedded/core-topics/config-data/setting-config-data/).
4. Run the workflow!

### 7. Start the [client](client)

**Requirements**

- Node.js, at least version 10
- Configured `.env` file

**How to run**

1. Install dependencies

```
npm install
```

2. Run the app

```
npm start
```

3. Go to [localhost:3000](http://localhost:3000)

## Resources

- [Tray.io documentation](https://tray.io/documentation/)
- [GitHub's repository template](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template) functionality

## Contributing

This template is open source and welcomes contributions. All contributions are subject to our [Code of Conduct](https://github.com/algolia-samples/.github/blob/master/CODE_OF_CONDUCT.md).

## Authors

- [@cdenoix](https://twitter.com/cdenoix)
