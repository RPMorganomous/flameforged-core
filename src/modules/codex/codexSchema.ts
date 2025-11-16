export const codexSchema = {
  requiredFields: ["id", "type", "content"]
};

export const validateCodexEntry = (entry: any): string[] => {
  const errors: string[] = [];
  for (const field of codexSchema.requiredFields) {
    if (!(field in entry)) errors.push(`Missing field: ${field}`);
  }
  return errors;
};
