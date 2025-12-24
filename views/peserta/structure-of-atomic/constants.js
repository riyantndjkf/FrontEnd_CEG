export const QUESTIONS = [
  {
    id: 1,
    type: "mcq",
    question: "Apa partikel subatomik yang bermuatan positif?",
    options: ["Elektron", "Proton", "Neutron", "Positron"],
    correctAnswer: "Proton",
  },
  {
    id: 2,
    type: "construct",
    question: "Susun molekul Air (H2O). Tempatkan atom pada posisi yang benar.",
    slots: [
      { id: "slot-1", label: "1", style: { top: "40%", left: "20%" } }, // H
      { id: "slot-2", label: "2", style: { top: "40%", left: "50%" } }, // O
      { id: "slot-3", label: "3", style: { top: "40%", left: "80%" } }, // H
    ],
    correctMapping: {
      "slot-1": "H",
      "slot-2": "O",
      "slot-3": "H",
    },
  },
  {
    id: 3,
    type: "mcq",
    question:
      "Ikatan kimia apa yang terjadi antara atom Karbon dan Hidrogen dalam Metana?",
    options: [
      "Ikatan Ion",
      "Ikatan Kovalen",
      "Ikatan Logam",
      "Ikatan Hidrogen",
    ],
    correctAnswer: "Ikatan Kovalen",
  },
];

export const INVENTORY_ITEMS = [
  { id: "C", label: "C", color: "bg-zinc-800 border-zinc-600" },
  { id: "H", label: "H", color: "bg-cyan-900/50 border-cyan-500" },
  { id: "O", label: "O", color: "bg-red-900/50 border-red-500" },
  { id: "N", label: "N", color: "bg-blue-900/50 border-blue-500" },
  { id: "Bond", label: "—", color: "bg-zinc-500 border-zinc-400" },
];
