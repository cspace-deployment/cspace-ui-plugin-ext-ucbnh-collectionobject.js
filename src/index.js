import cspaceUIPluginExtLocality from 'cspace-ui-plugin-ext-locality';
import fields from './fields';
import messages from './messages';
import optionLists from './optionLists';

// This extension needs to be loaded after the locality extension, so make an inner plugin that
// follows locality in the plugins array.

const plugin = () => configContext => ({
  optionLists,
  extensions: {
    'ucbnh-collectionobject': {
      fields: fields(configContext),
      messages: messages(configContext),
    },
  },
});

module.exports = () => ({
  plugins: [
    cspaceUIPluginExtLocality(),
    plugin(),
  ],
});
