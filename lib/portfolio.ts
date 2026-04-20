export type Photo = {
  src: string;
  alt: string;
  category:
    | "Landscape"
    | "Severe Weather"
    | "Storms USA"
    | "Coastal"
    | "Woodland"
    | "Astro";
};

// Assets courtesy of stushort.com — production deployments should self-host
// these files (download into /public and reference by local path) rather than
// hotlinking from WordPress.
export const portfolio: Photo[] = [
  {
    src: "https://stushort.com/wp-content/uploads/2025/08/lightning-strike-st-marys-lighthouse-sunset-storm.webp",
    alt: "Lightning strike over St Mary's Lighthouse at sunset",
    category: "Severe Weather"
  },
  {
    src: "https://stushort.com/wp-content/uploads/2025/12/coquetvale-misty-dawn-road-valley.webp",
    alt: "Misty dawn in Coquetvale, Northumberland",
    category: "Landscape"
  },
  {
    src: "https://stushort.com/wp-content/uploads/2025/08/storm-babet-tynemouth-lighthouse-towering-spray-crown.webp",
    alt: "Storm Babet crowning Tynemouth Lighthouse in spray",
    category: "Coastal"
  },
  {
    src: "https://stushort.com/wp-content/uploads/2025/12/ghosts-flee-dawn-valley-sunrise-mist.webp",
    alt: "Ghosts of mist fleeing a Northumberland valley at sunrise",
    category: "Landscape"
  },
  {
    src: "https://stushort.com/wp-content/uploads/2025/08/cheviot-view-heather-panorama-moorland.webp",
    alt: "Heather panorama across the Cheviot moorland",
    category: "Landscape"
  },
  {
    src: "https://stushort.com/wp-content/uploads/2025/12/storm-wave-explosive-spray-seabird-monochrome.webp",
    alt: "Monochrome storm wave with explosive spray and lone seabird",
    category: "Coastal"
  },
  {
    src: "https://stushort.com/wp-content/uploads/2025/06/it-never-ends-snowstorm-wall-winter.webp",
    alt: "A lone drystone wall vanishing into a Northumberland snowstorm",
    category: "Severe Weather"
  },
  {
    src: "https://stushort.com/wp-content/uploads/2025/05/deathly-still-kielder-dawn-frost-boat.webp",
    alt: "Deathly still frost-bound boat at Kielder at dawn",
    category: "Landscape"
  },
  {
    src: "https://stushort.com/wp-content/uploads/2025/08/charcoal-epic-ditchling-sunset-dramatic-sky.webp",
    alt: "Dramatic charcoal sunset sky above Ditchling",
    category: "Landscape"
  }
];
