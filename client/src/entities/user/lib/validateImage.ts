export const isImageValidation = (file: File | null) => {
  return file && file.type.startsWith("image/")
    ? true
    : "Debes subir una imagen como foto de perfil";
};