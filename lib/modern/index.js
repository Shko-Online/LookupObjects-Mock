const mockLookupObjects = mockGenerator => {
  mockGenerator.context.utils.lookupObjects.callsFake(lookupOptions => {
    return new Promise(resolve => {
      resolve([]);
    });
  });
  console.log(mockGenerator);
};
export default mockLookupObjects;