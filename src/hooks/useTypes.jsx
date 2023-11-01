import { useEffect, useState } from "react";

export const useTypes = () => {

    const [types, setTypes] = useState([]);

    useEffect(() => {

        const fetchTypes = async () => {

            try {

                const response = await fetch('https://pokeapi.co/api/v2/type');
                if (!response.ok) {
                    throw new Error('Error al obtener tipos');
                }

                const { results } = await response.json();

                const typeNames = results.map((result) => result.name);

                // Elimino de la lista los types "shadow" y "unknown" que no pertenecen a ningún Pokémon (solo a movimientos de variantes especiales)
                const filteredTypes = typeNames.filter(type => type !== "shadow" && type !== "unknown");


                setTypes(filteredTypes);
            } catch (error) {
                console.log(error);
            }
        }

        fetchTypes();
    }, [])

    return { types };

}