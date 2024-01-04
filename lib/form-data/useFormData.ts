import { useState } from "react";
import { DeepObjectUpdate, FormData } from "./types";

const useFormData = <T extends FormData>(initalData: T) => {
  const [formData, setFormData] = useState(initalData);

  const updateFormData = <K extends any[]>(
    value: DeepObjectUpdate<T, K>,
    ...keys: K
  ) => {
    setFormData((prevState) => {
      return updateData(prevState, value, ...keys);
    });
  };

  const updateData = <U, K extends string[]>(
    object: U,
    value: DeepObjectUpdate<U, K>,
    ...keys: K
  ) => {
    if (keys.length === 0) {
      return value;
    } else {
      const copiedObject = { ...object };

      const key = keys.splice(0, 1)[0] as keyof U;
      copiedObject[key] = updateData(
        copiedObject[key] || ({} as U[keyof U]),
        value as DeepObjectUpdate<U[keyof U], K>,
        ...keys
      );
      return copiedObject;
    }
  };

  return [formData, updateFormData] as [T, typeof updateFormData];
};

export default useFormData;
