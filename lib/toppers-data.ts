export interface Topper {
  name: string;
  marks: number;
  maxMarks: number;
  rank: number;
  group: "MPC" | "BiPC" | "MEC" | "CEC";
  image?: string;
}

export interface SubjectStat {
  subject: string;
  highest: number;
  count: number;
  description: string;
}

// 100% OFFICIAL IPE 1ST YEAR TOPPERS (From Official LFJC Results Poster `top3.jpeg`)
export const firstYearToppers: Topper[] = [
  // MPC (Total: 470)
  { name: "N. Sriram Sampath", marks: 467, maxMarks: 470, rank: 1, group: "MPC" },
  { name: "Endrakanti Rishitha", marks: 467, maxMarks: 470, rank: 1, group: "MPC" },
  { name: "K. Bhavya Reddy", marks: 467, maxMarks: 470, rank: 1, group: "MPC" },
  { name: "K. Chaitra Hasini", marks: 466, maxMarks: 470, rank: 2, group: "MPC" },
  { name: "Kagula Keerthana", marks: 466, maxMarks: 470, rank: 2, group: "MPC" },
  { name: "Bisnojith Panda", marks: 466, maxMarks: 470, rank: 2, group: "MPC" },
  { name: "Tipparaju Akshaya", marks: 465, maxMarks: 470, rank: 3, group: "MPC" },
  { name: "Ridha Fatema", marks: 465, maxMarks: 470, rank: 3, group: "MPC" },
  { name: "Hanumanthu Avinash Reddy", marks: 464, maxMarks: 470, rank: 4, group: "MPC" },

  // BiPC (Total: 440)
  { name: "Putta Bhuwaneshwari", marks: 436, maxMarks: 440, rank: 1, group: "BiPC" },
  { name: "Rayala Chinmayee", marks: 436, maxMarks: 440, rank: 1, group: "BiPC" },
  { name: "Syeda Rafath Jahan", marks: 436, maxMarks: 440, rank: 1, group: "BiPC" },
  { name: "Dornala Jahnavi", marks: 434, maxMarks: 440, rank: 2, group: "BiPC" },
  { name: "Bushra Fatema", marks: 433, maxMarks: 440, rank: 3, group: "BiPC" },
  { name: "M. Sai Sahiti", marks: 432, maxMarks: 440, rank: 4, group: "BiPC" },

  // MEC (Total: 500)
  { name: "Konda Taanya Ram", marks: 491, maxMarks: 500, rank: 1, group: "MEC" },
  { name: "Renita Adlin V", marks: 491, maxMarks: 500, rank: 1, group: "MEC" },
  { name: "Vaishnavi Kumari", marks: 490, maxMarks: 500, rank: 2, group: "MEC" },
  { name: "Mohammed Sarim", marks: 489, maxMarks: 500, rank: 3, group: "MEC" },
  { name: "G. Ananya", marks: 488, maxMarks: 500, rank: 4, group: "MEC" },

  // CEC (Total: 500)
  { name: "K. Naga Sahithi", marks: 480, maxMarks: 500, rank: 1, group: "CEC" },
  { name: "Siddi Shankhla", marks: 478, maxMarks: 500, rank: 2, group: "CEC" },
  { name: "Tarun Choudhary", marks: 478, maxMarks: 500, rank: 2, group: "CEC" },
  { name: "Janki Ben Pokar", marks: 478, maxMarks: 500, rank: 2, group: "CEC" },
  { name: "R. Harshitha", marks: 476, maxMarks: 500, rank: 3, group: "CEC" },
];

// 100% OFFICIAL SUBJECT-WISE EXCELLENCE COUNTS (From Official Poster `top3.jpeg`)
export const firstYearSubjectStats: SubjectStat[] = [
  { subject: "Physics", highest: 60, count: 125, description: "Scored 60/60 Centum in Physics" },
  { subject: "Chemistry", highest: 60, count: 121, description: "Scored 60/60 Centum in Chemistry" },
  { subject: "Hindi", highest: 99, count: 109, description: "Scored 99/100 in Second Language Hindi" },
  { subject: "Maths-A", highest: 75, count: 44, description: "Scored 75/75 Centum in Mathematics-A" },
  { subject: "Maths-B", highest: 75, count: 42, description: "Scored 75/75 Centum in Mathematics-B" },
  { subject: "Sanskrit", highest: 99, count: 39, description: "Scored 99/100 in Second Language Sanskrit" },
  { subject: "Botany", highest: 60, count: 28, description: "Scored 60/60 Centum in Botany" },
  { subject: "Zoology", highest: 60, count: 25, description: "Scored 60/60 Centum in Zoology" },
  { subject: "Telugu", highest: 99, count: 19, description: "Scored 99/100 in Second Language Telugu" },
  { subject: "English", highest: 98, count: 14, description: "Scored 98/100 in General English" },
  { subject: "Commerce", highest: 100, count: 18, description: "Scored 100/100 Centum in Commerce" },
  { subject: "Economics", highest: 99, count: 12, description: "Scored 99/100 in Economics" },
];

// Fallback interface compatibility
export const secondYearToppers: Topper[] = [];
