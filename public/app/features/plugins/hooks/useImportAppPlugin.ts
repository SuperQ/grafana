import useAsync from 'react-use/lib/useAsync';

import { PluginType } from '@grafana/data';

import { getPluginSettings } from '../pluginSettings';
import { importAppPlugin } from '../plugin_loader';

export const useImportAppPlugin = (id: string) => {
  return useAsync(async () => {
    const pluginMeta = await getPluginSettings(id);

    if (!pluginMeta) {
      throw new Error('Unknown Plugin');
    }

    if (pluginMeta.type !== PluginType.app) {
      throw new Error('Plugin must be an app');
    }

    if (!pluginMeta.enabled) {
      throw new Error('Application Not Enabled');
    }

    return await importAppPlugin(pluginMeta);
  });
};
