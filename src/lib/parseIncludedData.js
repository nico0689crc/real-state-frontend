export const parseIncludedData = dataToParse => {
  const { data, included } = dataToParse;

  const productParsed = { ...data.attributes, id: data.id };

  for (const relationTag in data.relationships) {
    const isArray = Array.isArray(data.relationships[relationTag].data);

    if (!productParsed[relationTag]) {
      productParsed[relationTag] = isArray ? [] : null;
    }

    if (isArray) {
      for (const relation in data.relationships[relationTag].data) {
        const relationId = data.relationships[relationTag].data[relation].id;
        const index = included.findIndex(item => item.id === relationId);
        if (index >= 0) {
          productParsed[relationTag].push(included[index]);
        }
      }
    } else {
      const index = included.findIndex(
        item => data.relationships[relationTag].data.id === item.id
      );

      if (index >= 0) {
        productParsed[relationTag] = included[index];
      }
    }
  }

  return productParsed;
};
