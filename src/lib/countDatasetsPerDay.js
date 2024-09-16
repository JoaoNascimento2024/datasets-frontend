/* eslint-disable no-unused-vars */
import { format, getDay } from "date-fns";


export const countDatasetsPerDay = (datasets = []) => {
  if (!datasets || datasets.length === 0) {
    return [];
  }

  const daysOfWeek = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];


  const counts = Array(7).fill(0);

  datasets.forEach((dataset) => {
    const day = getDay(new Date(dataset.createdAt)); 
    counts[day]++;
  });

  return daysOfWeek.map((day, index) => ({
    day,
    Upload: counts[index],
  }));
};
