import localityExtensionPlugin from 'cspace-ui-plugin-ext-locality';
import fields from './fields';
import messages from './messages';
import optionLists from './optionLists';

module.exports = () => configContext => ({
  optionLists,
  extensions: {
    'ucbnh-collectionobject': {
      messages,
      fields: fields(configContext),
    },
  },
  plugins: [
    localityExtensionPlugin(),
  ],
});
