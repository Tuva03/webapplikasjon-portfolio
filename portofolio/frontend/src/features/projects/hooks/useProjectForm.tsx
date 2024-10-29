import { useState, type FormEvent } from "react";

type FieldState = {
  value: string | Date | boolean;
  isValid: boolean;
  isDirty: boolean;
  isTouched: boolean;
};

type UseFormProps<T> = {
  initialFields: T;
  onSubmit: (data: T) => void;
  validate: (field: keyof T, value: string | Date | boolean) => boolean;
};

export function useHabitForm<
  T extends Record<string, string | Date | boolean>
>({ initialFields, onSubmit, validate }: UseFormProps<T>) {
  const [fields, setFields] = useState<Record<keyof T, FieldState>>(
    Object.fromEntries(
      Object.keys(initialFields).map((key) => [
        key as keyof T,
        {
          value: initialFields[key as keyof T],
          isValid: false,
          isDirty: false,
          isTouched: false,
        } as FieldState,
      ])
    ) as Record<keyof T, FieldState>
  );

  const updateField = (field: keyof T, value: string | Date | boolean) => {
    setFields((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        value,
        isDirty: true,
        isValid: validate[field] ? validate[field](field, value) : true,
      },
    }));
  };

  const setFieldTouched = (field: keyof T) => {
    setFields((prev) => ({
      ...prev,
      [field]: { ...prev[field], isTouched: true },
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isFormValid = Object.values(fields).every((field) => field.isValid);

    if (!isFormValid) {
      console.log("Form not valid:", fields); // Debugging: Log invalid fields
      return;
    }

    const formData = Object.fromEntries(
      Object.keys(fields).map((key) => [key, fields[key as keyof T].value])
    ) as T;

    onSubmit(formData);
    resetForm();
  };

  const resetForm = () => {
    setFields(
      Object.fromEntries(
        Object.keys(initialFields).map((key) => [
          key,
          {
            value:
              typeof initialFields[key as keyof T] === "boolean" ? false : "",
            isValid: false,
            isDirty: false,
            isTouched: false,
          },
        ])
      ) as Record<keyof T, FieldState>
    );
  };

  const getFieldProps = (field: keyof T) => {
    const fieldValue = fields[field].value;
    return {
      value: typeof fieldValue === "boolean" ? fieldValue : String(fieldValue),
      //      checked: typeof fieldValue === "boolean" ? fieldValue : undefined,
      onChange: (event: FormEvent<HTMLInputElement>) => {
        const input = event.target as HTMLInputElement;
        const value = input.type === "checkbox" ? input.checked : input.value;
        updateField(field, value);
      },
      onBlur: () => setFieldTouched(field),
    };
  };

  // const isFieldInvalid = (field: keyof T) =>
  //   !fields[field].isValid && fields[field].isDirty;

  const isFieldInvalid = (field: keyof T) =>
    !(field === "isPublic" || field === "status")
      ? !fields[field].isValid && fields[field].isDirty
      : false;

  return {
    fields,
    handleSubmit,
    getFieldProps,
    isFieldInvalid,
  };
}

export default useHabitForm;
