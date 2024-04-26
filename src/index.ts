import type {
  MockGenerator,
  ShkoOnline,
} from "@shko.online/componentframework-mock";

const mockLookupObjects = <
  TInputs extends ShkoOnline.PropertyTypes<TInputs>,
  TOutputs extends ShkoOnline.KnownTypes<TOutputs>
>(
  mockGenerator: MockGenerator<TInputs, TOutputs>
) => {
  mockGenerator.context.utils.lookupObjects.callsFake((lookupOptions) => {
    return new Promise((resolve) => {
      resolve([]);
    });
  });
  console.log(mockGenerator);
};

export default mockLookupObjects;
