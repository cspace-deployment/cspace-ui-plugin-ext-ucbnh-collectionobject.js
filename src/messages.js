import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    extensions,
  } = configContext.config;

  return {
    inputTable: {
      ...defineMessages({
        donor: {
          id: 'inputTable.ext.ucbnh-collectionobject.donor',
          defaultMessage: 'Donor',
        },
        taxonIdent: {
          id: 'inputTable.ext.ucbnh-collectionobject.taxonIdent',
          defaultMessage: 'Identified',
        },
        taxonRef: {
          id: 'inputTable.ext.ucbnh-collectionobject.taxonRef',
          defaultMessage: 'Reference',
        },
      }),
      ...extensions.locality.messages.inputTable,
    },
    panel: extensions.locality.messages.panel,
  };
};
