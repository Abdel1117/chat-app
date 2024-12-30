import { useState } from "react";
import { DropBox } from "../../components/DropBox/DropBox";
import { FormExtention } from "../../components/FormExtention/FormExtention";
export const Accueil = () => {
    const [extentionToConvert, setExtentionToConvert] = useState<string | null>(null);
    
    return (
    

    <section className="container mx-auto p-4">
        <h1 className="block mx-auto text-center text-2xl font-bold">
            Convertir des images en JPG{" "}
        </h1>
        <div className="block mx-auto mt-4">
        <FormExtention  setExtentionToConvert={setExtentionToConvert}/>
        <DropBox extentionToConvert={extentionToConvert} />
        </div>
    </section>
)};
