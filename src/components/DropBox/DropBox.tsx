import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ToastError } from "../ToastError/ToastError";
import { DropZoneIcon } from "../DropZoneIcon/DropZoneIcon";

interface DropBoxProps {
  extentionToConvert: string | null;
}
export const DropBox: React.FC<DropBoxProps> = ({ extentionToConvert }) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [extention, setExtention] = useState<string | null>(null);

  const apiUrl = import.meta.env.VITE_BACK_END_URL;

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const reader = new FileReader();
    reader.onabort = () => {
      setFile(null);
      setError("Lecture du fichier annulée");
    };
    reader.onerror = () => {
      setFile(null);
      setError("Erreur de lecture du fichier");
    };
    reader.onload = () => {
      setFile(file);
    };
    const file = acceptedFiles[0];
    if (file) {
      const ext = file.name.split(".").pop();
      if (ext) {
        setExtention(ext);
        if (ext !== "jpg" && ext !== "jpeg" && ext !== "png") {
          console.log("Erreur");
          setError("Seuls les fichiers JPG, JPEG et PNG sont autorisés");
          return;
        }
        if (file.size > 1000000) {
          setError("Le fichier est trop volumineux");
          return;
        }
      }
      reader.readAsArrayBuffer(file);
    }
  }, []);

  /* Function to validate the file */
  const validateFile = () => {
    if (!file) {
      setError("Veuillez sélectionner un fichier");
      return false;
    }
    if (extention === extentionToConvert) {
      setError(
        "Le fichier doit être différent de l'extention selectioner " +
          extentionToConvert?.toUpperCase()
      );
      return false;
    }
    return true;
  };

  /* Function to create the instance of formData and to add field and value  */
  const createFormData = () => {
    const formData = new FormData();
    if (extention) {
      formData.append("currentExtention", extention);
    }
    if (extentionToConvert) {
      formData.append("targetExtention", extentionToConvert);
    }
    formData.append("file", file!);
    return formData;
  };

  /* Function to handle the form */
  const handleForm = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!validateFile()) {
        return;
      }
      const formData = createFormData();
      const response = await fetch(`${apiUrl}/convert`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
      setError("Erreur lors de la conversion");
    } finally {
      setLoading(false);
    }
  };

  /* Function to reset the file */
  const resetAll = () => {
    setFile(null);
    setError(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <div
        {...getRootProps()}
        className={`flex flex-col items-center justify-center min-w-[300px] min-h-[400px] border rounded-lg shadow-xl p-2 lg:p-4 ${isDragActive ? "bg-gray-100" : "bg-gray-200"}`}
      >
        {loading ? (
          <div className="w-full">
            <div className="h-1.5 w-full bg-pink-100 overflow-hidden">
              <div className="animate-progress w-full h-full bg-blue-500 origin-left-right"></div>
            </div>
          </div>
        ) : (
          <>
            <DropZoneIcon />
            <input {...getInputProps()} />

            {file ? (
              <p className="text-xs lg:text-lg">
                Fichier sélectionné : {file.name}
              </p>
            ) : isDragActive ? (
              <p className="text-xs lg:text-lg">
                Déposez votre fichier ici ...
              </p>
            ) : (
              <p className="text-xs lg:text-lg">
                Faites glisser ou déposez un fichier ici, ou cliquez pour
                sélectionner des fichiers
              </p>
            )}
          </>
        )}
      </div>
      <div className="flex items-center justify-center">

        <button 
          onClick={() => {resetAll()}}
          className="block mx-auto mt-4 bg-red-700 text-white p-2 rounded-lg"
          >
          Réinitialiser
        </button>
        
        <button
          onClick={() => handleForm()}
          className="block mx-auto mt-4 bg-blue-500 text-white p-2 rounded-lg"
          >
          Convertir
        </button>

        {error && <ToastError errorMessage={error} setError={setError} />}
      </div>
    </>
  );
};
