import { ClassValidatorFields } from "@/domain/enterprise/validators/class-validator-fields";
import { FieldsErrors } from "@/domain/enterprise/validators/class-validator-interface";
import { EntityValidationError } from "@/domain/enterprise/validators/errors/validation.error";
import { expect } from "vitest";

type Expected =
  | {
      validator: ClassValidatorFields<any>;
      data: any;
    }
  | (() => any);

expect.extend({
  containsErrorMessage(expected: Expected, recieved: FieldsErrors) {
    if (typeof expected === "function") {
      try {
        expected();
        return isValid();
      } catch (e) {
        const error = e as EntityValidationError;
        return assertContainsErrorsMessages(error.error, recieved);
      }
    }

    const { validator, data } = expected;

    const validated = validator.validate(data);

    if (validated) {
      return isValid();
    }

    return assertContainsErrorsMessages(
      validator.errors as FieldsErrors,
      recieved
    );
  },
});

function assertContainsErrorsMessages(
  expected: FieldsErrors,
  recieved: FieldsErrors
) {
  const isMatch = expect.objectContaining(recieved).asymmetricMatch(expected);

  return isMatch
    ? isValid()
    : {
        pass: false,
        message: () =>
          `The validation errors not contains ${JSON.stringify(
            recieved
          )}. Current: ${JSON.stringify(expected)}`,
      };
}

function isValid() {
  return { pass: true, message: () => "" };
}
