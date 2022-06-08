import React, { useState } from 'react';

import { NavModel, AppPlugin } from '@grafana/data';

import Page from 'app/core/components/Page/Page';
import PageLoader from 'app/core/components/PageLoader/PageLoader';

import { useImportAppPlugin } from '../hooks/useImportAppPlugin';

type AppPluginLoaderProps = {
  // The id of the app plugin to be loaded
  id: string;
  // The base URL path
  basePath: string;
};

export const AppPluginLoader = ({ id, basePath }: AppPluginLoaderProps) => {
  const [nav, setNav] = useState<NavModel | null>(null);
  const { value: plugin, error, loading } = useImportAppPlugin(id);

  if (loading) {
    return <div>Plugin is loading...</div>;
  }

  if (error) {
    return <pre>{JSON.stringify(error, null, 4)}</pre>;
  }

  if (nav) {
    <Page navModel={nav}>
      <Page.Contents isLoading={loading}>
        {plugin && plugin.root && (
          <plugin.root meta={plugin.meta} basename={basePath} onNavChanged={setNav} query={{}} path={''} />
        )}
      </Page.Contents>
    </Page>;
  }

  return (
    <Page>
      {loading && <PageLoader />}
      {!loading && plugin && plugin.root && (
        <plugin.root meta={plugin.meta} basename={basePath} onNavChanged={setNav} query={{}} path={''} />
      )}
    </Page>
  );
};
