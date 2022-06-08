import React, { ReactElement } from 'react';

import { AppPluginLoader } from 'app/features/plugins/components/AppPluginLoader';

export function CloudIntegrations(): ReactElement | null {
  return (
    <div>
      Cloud Integrations
      <div>
        <AppPluginLoader id="grafana-synthetic-monitoring-app" basePath="/" />
      </div>
    </div>
  );
}
