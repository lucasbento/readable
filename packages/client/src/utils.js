
const suffixes = ['REQUEST', 'FULFILLED'];

export const getTypes = (type) =>
  suffixes.reduce((prev, curr) => ({
    ...prev,
    [`${type}_${curr}`]: `${type}_${curr}`,
  }), {});


export const sortByScore = array => array.length ?
  array.sort((item, compareItem) => compareItem.voteScore - item.voteScore) : [];
