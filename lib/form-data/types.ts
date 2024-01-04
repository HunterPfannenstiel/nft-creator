import { FeatureDetails } from "@/components/ui/contract-gen/types";

export type FormData<T = any> = { [label: string]: T };

export type DeepObjectUpdate<T, K extends any[]> = K extends [infer FirstKey]
  ? FirstKey extends keyof T
    ? T[FirstKey]
    : never
  : K extends [infer FirstKey, ...infer RestKeys]
  ? FirstKey extends keyof T
    ? DeepObjectUpdate<NonNullable<T[FirstKey]>, RestKeys> //NonNullable allows for undefined fields in objects
    : never
  : T;

/*type ValidKeys<T, K extends string[]> = K extends [
    infer FirstKey,
    ...infer RestKeys
  ]
    ? FirstKey extends keyof T
      ? RestKeys extends string[]
        ? ValidKeys<T[FirstKey], RestKeys>
        : never
      : never
    : keyof T;
    */

// type ValidKeys<T, K extends string[]> = K extends [infer FirstKey, ...infer RestKeys]
// ? FirstKey extends keyof T
//   ? RestKeys extends string[]
//     ? ValidKeys<T[FirstKey], RestKeys>
//     : ValidKeys<T[FirstKey], []>
//   : never
// : keyof T;

const obj = { hello: { hi: true } };

const func = <T extends string[]>(
  value: DeepObjectUpdate<typeof obj, T>,
  ...keys: T
) => {};

func(false, "hello", "hi");
