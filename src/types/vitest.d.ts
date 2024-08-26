import { FieldsErrors } from "@/domain/enterprise/validators/class-validator-interface";
import "vitest";

interface CustomMatchers<R = unknown> {
  containsErrorMessage: (expected: FieldsErrors) => R;
}

declare module "vitest" {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}
