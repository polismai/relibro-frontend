import { BookType } from "@/types/product";
import { Errors } from "./page";

export const validation = (form: BookType) => {
  const errors: Errors = {};
  
  if (!form.title || form.title.trim().length === 0) {
    errors.title = "Debe introducir un título";
  }
  if (form.title.length < 2) {
    errors.title = "El título debe tener al menos 2 caracteres";
  }
  if (form.title.length > 100) {
    errors.title = "El título no puede superar los 100 caracteres";
  }
  const regexTitle = /^[A-Za-z0-9ÁÉÍÓÚáéíóúÑñ\s.,:;!?()'"-]{2,100}$/;
  if (!regexTitle.test(form.title)) {
    errors.title = "El título contiene caracteres inválidos";
  }

  if (form.author && form.author.trim() !== "") {
    if (form.author.length < 2) {
      errors.author = "El autor debe tener al menos 2 caracteres";
    } else if (form.author.length > 100) {
      errors.author = "El autor no puede superar los 100 caracteres";
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(form.author)) {
      errors.author = "El autor solo puede contener letras y espacios";
    }
  }

  if (form.description && form.description.length < 10) {
    errors.description = "La descripción debe tener al menos 10 caracteres";
  } else if (form.description && form.description.length > 500) {
    errors.description = "La descripción no puede superar los 500 caracteres";
  }

  if (form.conditionNote && form.conditionNote.length < 2) {
    errors.conditionNote = "La condición del libro debe tener al menos 2 caracteres";
  } else if (form.conditionNote && form.conditionNote.length > 200) {
    errors.conditionNote = "La condición del libro no puede superar los 200 caracteres";
  }

  if (!form.price) {
    errors.price = "El precio es obligatorio";
  } else if (isNaN(Number(form.price))) {
    errors.price = "El precio debe ser un número válido";
  } else if (Number(form.price) <= 0) {
    errors.price = "El precio debe ser mayor que 0";
  } else if (Number(form.price) > 4000) {
    errors.price = "El precio no puede superar 4.000";
  }

  if (!form.category || form.category === "default") {
    errors.category = "La categoría es obligatoria";
  }

  return errors;
}