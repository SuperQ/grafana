import useAsync from 'react-use/lib/useAsync';

import { getPluginSettings } from '../pluginSettings';

export const usePluginSettings = (id: string) => {
  return useAsync(() => getPluginSettings(id));
};
