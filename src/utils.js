/* global document */

export const computeHybridName = ({ data }, Immutable, formatRefName) => {
  const taxonGroup = data.getIn(['taxonomicIdentGroupList', 'taxonomicIdentGroup']);

  const newTaxonGroup = [];

  for (let taxon = 0; taxon < taxonGroup.size; taxon += 1) {
    let taxonomicIdentHybridName = '';
    const taxonomicIdentGroup = data.getIn(['taxonomicIdentGroupList', 'taxonomicIdentGroup', taxon]);

    const hybridFlag = taxonomicIdentGroup.get('hybridFlag') || '';
    const affinityTaxon = formatRefName(taxonomicIdentGroup.get('affinityTaxon')) || '';
    const taxonName = formatRefName(taxonomicIdentGroup.get('taxon')) || '';

    if (hybridFlag !== 'true' && hybridFlag !== true) {
      // if (affinityTaxon === null || affinityTaxon === '') {
        // taxonomicIdentHybridName = taxonName;
      // } else {
        taxonomicIdentHybridName = '';
      // }
    } else {
      // Get the parent group
      const parentGroupList = taxonomicIdentGroup.getIn(['taxonomicIdentHybridParentGroupList', 'taxonomicIdentHybridParentGroup']);

      const firstParentName = formatRefName(parentGroupList.getIn([0, 'taxonomicIdentHybridParent'])) || '';
      const firstParentSex = parentGroupList.getIn([0, 'taxonomicIdentHybridParentQualifier']);

      const secondParentName = formatRefName(parentGroupList.getIn([1, 'taxonomicIdentHybridParent'])) || '';

      const maleParent = firstParentSex === 'male' ? firstParentName : secondParentName;
      const femaleParent = firstParentSex === 'female' ? firstParentName : secondParentName;

      const [maleParentGenus, femaleParentGenus] = [maleParent, femaleParent]
                                                    .map(part => (part.indexOf(' ') !== -1 ? part.slice(0, part.indexOf(' ')) : part));

      const maleParentRest = maleParent.indexOf(' ') !== -1 ? maleParent.slice(maleParent.indexOf(' ') + 1) : maleParent;

      if (affinityTaxon === null || affinityTaxon === '') {
        if (femaleParent === null || femaleParent === '') {
          taxonomicIdentHybridName = '';
        } else if (maleParent === null || maleParent === '') {
          taxonomicIdentHybridName = '';
        } else if (femaleParentGenus === maleParentGenus) {
          taxonomicIdentHybridName = `${femaleParent} × ${maleParentGenus[0]}. ${maleParentRest}`;
        } else {
          taxonomicIdentHybridName = `${femaleParent} × ${maleParent}`;
        }
      } else {
        /* eslint-disable no-lonely-if */
        if (maleParent === null || maleParent === '') {
          taxonomicIdentHybridName = '';
        } else if (femaleParentGenus === maleParentGenus) {
          taxonomicIdentHybridName = `${affinityTaxon} × ${maleParentGenus[0]}. ${maleParentRest}`;
        } else {
          taxonomicIdentHybridName = `${affinityTaxon} × ${maleParent}`;
        }
      }
    }
    const updatedTaxonomicGroupMap = Immutable.fromJS({
      taxonomicIdentHybridName,
    });
    newTaxonGroup.push(taxonomicIdentGroup.merge(updatedTaxonomicGroupMap));
  }

  return Immutable.fromJS({
    taxonomicIdentGroupList: {
      taxonomicIdentGroup: Immutable.List(newTaxonGroup),
    },
  });
};

export default computeHybridName;
