import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { NavModel } from '@grafana/data';
import { getWarningNav } from 'app/angular/services/nav_model_srv';
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
  const queryParams = useParams();
  const { pathname } = useLocation();

  if (loading) {
    return <div>Plugin is loading...</div>;
  }

  if (error) {
    return (
      <Page navModel={getWarningNav(error.message, error.stack)}>
        <div></div>
      </Page>
    );
  }

  if (nav) {
    <Page navModel={nav}>
      <Page.Contents isLoading={loading}>
        {plugin && plugin.root && (
          <plugin.root
            meta={plugin.meta}
            basename={basePath}
            onNavChanged={setNav}
            query={queryParams}
            path={pathname}
          />
        )}
      </Page.Contents>
    </Page>;
  }

  return (
    <Page>
      {loading && <PageLoader />}
      {!loading && plugin && plugin.root && (
        <plugin.root meta={plugin.meta} basename={basePath} onNavChanged={setNav} query={queryParams} path={pathname} />
      )}
    </Page>
  );
};
