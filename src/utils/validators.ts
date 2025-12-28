export const isRequired = (val: string) => val.trim() !== '';

export const isCourseCodeValid = (code: string) => {
  return /^CS\d{3}$/.test(code);
};
