/* eslint-disable no-unused-vars */
import { format, getDay, isThisWeek } from "date-fns";

export const countDatasetsPerDay = (datasets = []) => {
  if (!datasets || datasets.length === 0) {
    return [];
  }

  const daysOfWeek = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

  // Inicializa um array de contagem para os dias da semana
  const counts = Array(7).fill(0);

  // Filtra os datasets para incluir apenas os da semana atual
  datasets.forEach((dataset) => {
    const datasetDate = new Date(dataset.createdAt);

    if (isThisWeek(datasetDate)) { // Verifica se o dataset pertence à semana atual
      const day = getDay(datasetDate); 
      counts[day]++;
    }
  });

  // Mapeia os dias da semana e a contagem de uploads
  return daysOfWeek.map((day, index) => ({
    day,
    Upload: counts[index],
  }));
};
