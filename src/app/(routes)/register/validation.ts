import { Errors } from "./page";

export const validation = (form: { firstName: string; lastName: string; email: string; password: string }) => {
  const errors: Errors = {};

  if (!form.firstName) {
    errors.firstName = "Debe ingresar su nombre";
  } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/.test(form.firstName)) {
    errors.firstName = "El nombre solo puede contener letras y espacios";
  }

  if (!form.lastName) {
    errors.lastName = "Debe ingresar su apellido";
  } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/.test(form.lastName)) {
    errors.lastName = "El apellido solo puede contener letras y espacios";
  }

  if (!form.email) {
    errors.email = "Debe ingresar un email";
  } else if (
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.email)
  ) {
    errors.email = "Verifique su email";
  }

  if (!form.password) {
    errors.password = "Debe ingresar una contraseña";
  } else if (form.password.length < 6) {
    errors.password = "La contraseña debe tener al menos 6 caracteres";
  }

  return errors;
};