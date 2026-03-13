import { isImageValidation } from "../lib/validateImage";
import ErrorMessage from "@/shared/ui/error/ErrorMessage";
import React, { useRef, useState, type ChangeEvent } from "react";
import {
  useController,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

type LoadUserImgProfileProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  isEdit: boolean;
  currentImage?: string | undefined | null;
};

export default function LoadUserImgProfile<T extends FieldValues>({
  control,
  name,
  isEdit,
  currentImage,
}: LoadUserImgProfileProps<T>) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    control,
    name,
    rules: isEdit
      ? {}
      : {
          required: "La foto de perfil es obligatoria",
          validate: isImageValidation,
        },
  });

  const imageFile = value;
  const [isDragging, setIsDragging] = useState(false);

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const updateImageFromFile = (file: File | null) => {
    onChange(file);
  };

  const updateImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      updateImageFromFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const file = event.dataTransfer.files[0];
      updateImageFromFile(file);
    }
    setIsDragging(false);
  };

  return (
    <>
      <div
        onDragOver={handleDragOver}
        onDrop={handleFileDrop}
        onClick={handleImageUploadClick}
        onDragLeave={handleDragLeave}
        className={`
    p-3 rounded-lg border-5 flex flex-col gap-3 hover:cursor-pointer
    ${
      isDragging
        ? "bg-slate-800 border-cyan-600 text-white"
        : "bg-slate-200 border-slate-300"
    }
  `}
      >
        <div className="flex flex-col w-full h-full items-center justify-center relative">
          {imageFile || currentImage ? (
            <>
              <div className="rounded-full h-40 w-40 overflow-hidden">
                <img
                  src={
                    currentImage && !imageFile
                      ? currentImage
                      : URL.createObjectURL(imageFile)
                  }
                  alt="img"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-slate-500 text-xl font-bold text-center">
                  Foto de perfil cargada correctamente
                </p>
                <p className="text-sm font-semibold text-slate-500 text-center">
                  Para cambiar la imagen de tu foto de perfil puedes arrastrar
                  tu nueva imagen o hacer click
                </p>
              </div>
            </>
          ) : (
            <p className="text-slate-500 text-xl font-bold text-center">
              Sube tu foto de perfil
            </p>
          )}
        </div>

        <input
          ref={fileInputRef}
          className="hidden"
          type="file"
          accept="image/*"
          onChange={updateImage}
        />
      </div>
      <ErrorMessage>{error?.message}</ErrorMessage>
    </>
  );
}
