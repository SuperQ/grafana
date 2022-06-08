import React, { ReactElement } from 'react';

import { AppPluginLoader } from 'app/features/plugins/components/AppPluginLoader';

export function CloudIntegrations(): ReactElement | null {
  return (
    <div>
      <AppPluginLoader id="grafana-easystart-app" basePath="/" />
    </div>
  );
}
