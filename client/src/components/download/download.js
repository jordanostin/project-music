import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const Download = () => {
    const { musicId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
        };

        fetch(`http://localhost:9200/user/download/${musicId}`, {
            headers,
            method: "GET",
            responseType: "blob",
        })
            .then((response) => {
                // Créer un objet URL à partir de la réponse blob
                const url = window.URL.createObjectURL(new Blob([response.data]));

                // Créer un lien <a> temporaire pour télécharger le fichier
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", `music-${musicId}.mp3`);

                // Ajouter le lien à la page et cliquer dessus pour télécharger
                document.body.appendChild(link);
                link.click();

                // Nettoyer l'objet URL et le lien après le téléchargement
                URL.revokeObjectURL(url);
                link.remove();
                navigate("/");
            })
            .catch((err) => console.log(err));
    }, []);

    return null;
};
