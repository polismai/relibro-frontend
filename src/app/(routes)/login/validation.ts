import { Errors } from "./page";

export const validation = (form: { email: string; password: string }) => {
  const errors: Errors = {};

  if (!form.email) {
    errors.email = "Debe introducir el email";
  } else if (
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.email)
  ) {
    errors.email = "Verifique su email";
  }

  if (!form.password) {
    errors.password = "Debe introducir la contraseña";
  } else if (form.password.length < 6) {
    errors.password = "La contraseña debe tener al menos 6 caracteres";
  }

  return errors;
};
  
