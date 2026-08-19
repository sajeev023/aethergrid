export interface TopperRecord {
  id: string;
  name: string;
  marks: string; // e.g. "467 / 470" or "988 / 1000"
  score: number;
  maxMarks: number;
  group: 'MPC' | 'BiPC' | 'MEC' | 'CEC';
  year: '1st Year' | '2nd Year';
  image: string;
}

export interface SubjectStat {
  subject: string;
  highestMarks: number;
  studentCount: number;
}

export const firstYearToppers: TopperRecord[] = [
  // MPC Group
  { id: '1st_mpc_1', name: 'Tipparaju Akshaya', marks: '467 / 470', score: 467, maxMarks: 470, group: 'MPC', year: '1st Year', image: '/images/toppers/1st-year/1st_mpc_1_tipparaju_akshaya.png' },
  { id: '1st_mpc_2', name: 'Ridha Fatema', marks: '467 / 470', score: 467, maxMarks: 470, group: 'MPC', year: '1st Year', image: '/images/toppers/1st-year/1st_mpc_2_ridha_fatema.png' },
  { id: '1st_mpc_3', name: 'Hanumanthu Avinash Reddy', marks: '466 / 470', score: 466, maxMarks: 470, group: 'MPC', year: '1st Year', image: '/images/toppers/1st-year/1st_mpc_3_hanumanthu_avinash_reddy.png' },
  { id: '1st_mpc_4', name: 'Neesala Joel Austin', marks: '466 / 470', score: 466, maxMarks: 470, group: 'MPC', year: '1st Year', image: '/images/toppers/1st-year/1st_mpc_4_neesala_joel_austin.png' },
  { id: '1st_mpc_5', name: 'Kavya Swargam', marks: '465 / 470', score: 465, maxMarks: 470, group: 'MPC', year: '1st Year', image: '/images/toppers/1st-year/1st_mpc_5_kavya_swargam.png' },
  { id: '1st_mpc_6', name: 'Rayabaghi Raghavendra Lochan', marks: '465 / 470', score: 465, maxMarks: 470, group: 'MPC', year: '1st Year', image: '/images/toppers/1st-year/1st_mpc_6_rayabaghi_raghavendra_lochan.png' },
  { id: '1st_mpc_7', name: 'Cheela Shrijani', marks: '463 / 470', score: 463, maxMarks: 470, group: 'MPC', year: '1st Year', image: '/images/toppers/1st-year/1st_mpc_7_cheela_shrijani.png' },
  { id: '1st_mpc_8', name: 'Moganti Srinidhi', marks: '463 / 470', score: 463, maxMarks: 470, group: 'MPC', year: '1st Year', image: '/images/toppers/1st-year/1st_mpc_8_moganti_srinidhi.png' },
  { id: '1st_mpc_9', name: 'Daggumati Amal', marks: '463 / 470', score: 463, maxMarks: 470, group: 'MPC', year: '1st Year', image: '/images/toppers/1st-year/1st_mpc_9_daggumati_amal.png' },
  { id: '1st_mpc_10', name: 'Ponnapaty Edward Wesley', marks: '463 / 470', score: 463, maxMarks: 470, group: 'MPC', year: '1st Year', image: '/images/toppers/1st-year/1st_mpc_10_ponnapaty_edward_wesley.png' },
  { id: '1st_mpc_11', name: 'R Aravindh', marks: '462 / 470', score: 462, maxMarks: 470, group: 'MPC', year: '1st Year', image: '/images/toppers/1st-year/1st_mpc_11_r_aravindh.png' },
  { id: '1st_mpc_12', name: 'Mohammed Amaan', marks: '462 / 470', score: 462, maxMarks: 470, group: 'MPC', year: '1st Year', image: '/images/toppers/1st-year/1st_mpc_12_mohammed_amaan.png' },
  { id: '1st_mpc_13', name: 'Atharva Namdev Potdar', marks: '462 / 470', score: 462, maxMarks: 470, group: 'MPC', year: '1st Year', image: '/images/toppers/1st-year/1st_mpc_13_atharva_namdev_potdar.png' },

  // BiPC Group
  { id: '1st_bipc_14', name: 'Gudla Sahasra', marks: '435 / 440', score: 435, maxMarks: 440, group: 'BiPC', year: '1st Year', image: '/images/toppers/1st-year/1st_bipc_14_gudla_sahasra.png' },
  { id: '1st_bipc_15', name: 'Konkotti Keerthana', marks: '435 / 440', score: 435, maxMarks: 440, group: 'BiPC', year: '1st Year', image: '/images/toppers/1st-year/1st_bipc_15_konkotti_keerthana.png' },
  { id: '1st_bipc_16', name: 'Jakkula Vaishnavi', marks: '434 / 440', score: 434, maxMarks: 440, group: 'BiPC', year: '1st Year', image: '/images/toppers/1st-year/1st_bipc_16_jakkula_vaishnavi.png' },
  { id: '1st_bipc_17', name: 'Ashwathi Nair', marks: '433 / 440', score: 433, maxMarks: 440, group: 'BiPC', year: '1st Year', image: '/images/toppers/1st-year/1st_bipc_17_ashwathi_nair.png' },
  { id: '1st_bipc_18', name: 'Samantha D Silva', marks: '432 / 440', score: 432, maxMarks: 440, group: 'BiPC', year: '1st Year', image: '/images/toppers/1st-year/1st_bipc_18_samantha_d_silva.png' },
  { id: '1st_bipc_19', name: 'Deekonda Mayabodhi', marks: '430 / 440', score: 430, maxMarks: 440, group: 'BiPC', year: '1st Year', image: '/images/toppers/1st-year/1st_bipc_19_deekonda_mayabodhi.png' },
  { id: '1st_bipc_20', name: 'Jecinthamary B', marks: '430 / 440', score: 430, maxMarks: 440, group: 'BiPC', year: '1st Year', image: '/images/toppers/1st-year/1st_bipc_20_jecinthamary_b.png' },

  // MEC Group
  { id: '1st_mec_21', name: 'Madhipally Ekshitha', marks: '494 / 500', score: 494, maxMarks: 500, group: 'MEC', year: '1st Year', image: '/images/toppers/1st-year/1st_mec_21_madhipally_ekshitha.png' },
  { id: '1st_mec_22', name: 'Gunmedelli Nithya', marks: '494 / 500', score: 494, maxMarks: 500, group: 'MEC', year: '1st Year', image: '/images/toppers/1st-year/1st_mec_22_gunmedelli_nithya.png' },
  { id: '1st_mec_23', name: 'Sai Suhas Jilla', marks: '493 / 500', score: 493, maxMarks: 500, group: 'MEC', year: '1st Year', image: '/images/toppers/1st-year/1st_mec_23_sai_suhas_jilla.png' },
  { id: '1st_mec_24', name: 'Devunoori Sai Sudhamshu', marks: '491 / 500', score: 491, maxMarks: 500, group: 'MEC', year: '1st Year', image: '/images/toppers/1st-year/1st_mec_24_devunoori_sai_sudhamshu.png' },
  { id: '1st_mec_25', name: 'Khushi Heda', marks: '491 / 500', score: 491, maxMarks: 500, group: 'MEC', year: '1st Year', image: '/images/toppers/1st-year/1st_mec_25_khushi_heda.png' },
  { id: '1st_mec_26', name: 'Arra Anushna', marks: '486 / 500', score: 486, maxMarks: 500, group: 'MEC', year: '1st Year', image: '/images/toppers/1st-year/1st_mec_26_arra_anushna.png' },
  { id: '1st_mec_27', name: 'Keerthana Rajesh', marks: '484 / 500', score: 484, maxMarks: 500, group: 'MEC', year: '1st Year', image: '/images/toppers/1st-year/1st_mec_27_keerthana_rajesh.png' },
  { id: '1st_mec_28', name: 'Ramani Shrushti Patel', marks: '484 / 500', score: 484, maxMarks: 500, group: 'MEC', year: '1st Year', image: '/images/toppers/1st-year/1st_mec_28_ramani_shrushti_patel.png' },

  // CEC Group
  { id: '1st_cec_29', name: 'Kavathi Yashaswini Reddy', marks: '489 / 500', score: 489, maxMarks: 500, group: 'CEC', year: '1st Year', image: '/images/toppers/1st-year/1st_cec_29_kavathi_yashaswini_reddy.png' },
  { id: '1st_cec_30', name: 'Dusari Karishma Goud', marks: '484 / 500', score: 484, maxMarks: 500, group: 'CEC', year: '1st Year', image: '/images/toppers/1st-year/1st_cec_30_dusari_karishma_goud.png' },
  { id: '1st_cec_31', name: 'Bandi Apoorva', marks: '481 / 500', score: 481, maxMarks: 500, group: 'CEC', year: '1st Year', image: '/images/toppers/1st-year/1st_cec_31_bandi_apoorva.png' },
  { id: '1st_cec_32', name: 'Marneni Nirmiti Mary', marks: '478 / 500', score: 478, maxMarks: 500, group: 'CEC', year: '1st Year', image: '/images/toppers/1st-year/1st_cec_32_marneni_nirmiti_mary.png' },
  { id: '1st_cec_33', name: 'Joannie Livingstone Kondapalli', marks: '475 / 500', score: 475, maxMarks: 500, group: 'CEC', year: '1st Year', image: '/images/toppers/1st-year/1st_cec_33_joannie_livingstone_kondapalli.png' },
];

export const secondYearToppers: TopperRecord[] = [
  // MPC Group
  { id: '2nd_mpc_1', name: 'Gyara Akshara Sindhu', marks: '988 / 1000', score: 988, maxMarks: 1000, group: 'MPC', year: '2nd Year', image: '/images/toppers/2nd-year/2nd_mpc_1_gyara_akshara_sindhu.png' },
  { id: '2nd_mpc_2', name: 'Goriga Akash Goud', marks: '987 / 1000', score: 987, maxMarks: 1000, group: 'MPC', year: '2nd Year', image: '/images/toppers/2nd-year/2nd_mpc_2_goriga_akash_goud.png' },
  { id: '2nd_mpc_3', name: 'Chhavi Jain', marks: '986 / 1000', score: 986, maxMarks: 1000, group: 'MPC', year: '2nd Year', image: '/images/toppers/2nd-year/2nd_mpc_3_chhavi_jain.png' },
  { id: '2nd_mpc_4', name: 'Katakam Yashaswini Sreenayi', marks: '984 / 1000', score: 984, maxMarks: 1000, group: 'MPC', year: '2nd Year', image: '/images/toppers/2nd-year/2nd_mpc_4_katakam_yashaswini_sreenayi.png' },
  { id: '2nd_mpc_5', name: 'Konatham Charith Reddy', marks: '982 / 1000', score: 982, maxMarks: 1000, group: 'MPC', year: '2nd Year', image: '/images/toppers/2nd-year/2nd_mpc_5_konatham_charith_reddy.png' },
  { id: '2nd_mpc_6', name: 'Nadapa Sushna Reddy', marks: '979 / 1000', score: 979, maxMarks: 1000, group: 'MPC', year: '2nd Year', image: '/images/toppers/2nd-year/2nd_mpc_6_nadapa_sushna_reddy.png' },
  { id: '2nd_mpc_7', name: 'Sarabudla Shrasha', marks: '978 / 1000', score: 978, maxMarks: 1000, group: 'MPC', year: '2nd Year', image: '/images/toppers/2nd-year/2nd_mpc_7_sarabudla_shrasha.png' },
  { id: '2nd_mpc_8', name: 'J Jeffrey', marks: '977 / 1000', score: 977, maxMarks: 1000, group: 'MPC', year: '2nd Year', image: '/images/toppers/2nd-year/2nd_mpc_8_j_jeffrey.png' },
  { id: '2nd_mpc_9', name: 'Sofia Naaz', marks: '977 / 1000', score: 977, maxMarks: 1000, group: 'MPC', year: '2nd Year', image: '/images/toppers/2nd-year/2nd_mpc_9_sofia_naaz.png' },
  { id: '2nd_mpc_10', name: 'Kurapati Sathwik', marks: '976 / 1000', score: 976, maxMarks: 1000, group: 'MPC', year: '2nd Year', image: '/images/toppers/2nd-year/2nd_mpc_10_kurapati_sathwik.png' },
  { id: '2nd_mpc_11', name: 'Thirumala Reddy Venkata Keerthana Reddy', marks: '975 / 1000', score: 975, maxMarks: 1000, group: 'MPC', year: '2nd Year', image: '/images/toppers/2nd-year/2nd_mpc_11_thirumala_reddy_venkata_keerthana_reddy.png' },
  { id: '2nd_mpc_12', name: 'Lattupalli Sai Ganesh Reddy', marks: '975 / 1000', score: 975, maxMarks: 1000, group: 'MPC', year: '2nd Year', image: '/images/toppers/2nd-year/2nd_mpc_12_lattupalli_sai_ganesh_reddy.png' },

  // BiPC Group
  { id: '2nd_bipc_13', name: 'Bangari Rishika Swathi', marks: '976 / 1000', score: 976, maxMarks: 1000, group: 'BiPC', year: '2nd Year', image: '/images/toppers/2nd-year/2nd_bipc_13_bangari_rishika_swathi.png' },
  { id: '2nd_bipc_14', name: 'Aditi Upadhyay', marks: '975 / 1000', score: 975, maxMarks: 1000, group: 'BiPC', year: '2nd Year', image: '/images/toppers/2nd-year/2nd_bipc_14_aditi_upadhyay.png' },
  { id: '2nd_bipc_15', name: 'Alivia Mary Thomas', marks: '975 / 1000', score: 975, maxMarks: 1000, group: 'BiPC', year: '2nd Year', image: '/images/toppers/2nd-year/2nd_bipc_15_alivia_mary_thomas.png' },
  { id: '2nd_bipc_16', name: 'Syeda Sufia Jahan', marks: '971 / 1000', score: 971, maxMarks: 1000, group: 'BiPC', year: '2nd Year', image: '/images/toppers/2nd-year/2nd_bipc_16_syeda_sufia_jahan.png' },
  { id: '2nd_bipc_17', name: 'Hemanshi Choudary', marks: '963 / 1000', score: 963, maxMarks: 1000, group: 'BiPC', year: '2nd Year', image: '/images/toppers/2nd-year/2nd_bipc_17_hemanshi_choudary.png' },

  // MEC Group
  { id: '2nd_mec_18', name: 'Leela', marks: '984 / 1000', score: 984, maxMarks: 1000, group: 'MEC', year: '2nd Year', image: '/images/toppers/2nd-year/2nd_mec_18_leela.png' },
  { id: '2nd_mec_19', name: 'G Achutha Sree', marks: '979 / 1000', score: 979, maxMarks: 1000, group: 'MEC', year: '2nd Year', image: '/images/toppers/2nd-year/2nd_mec_19_g_achutha_sree.png' },
  { id: '2nd_mec_20', name: 'Bandari Shri Vedha', marks: '978 / 1000', score: 978, maxMarks: 1000, group: 'MEC', year: '2nd Year', image: '/images/toppers/2nd-year/2nd_mec_20_bandari_shri_vedha.png' },
  { id: '2nd_mec_21', name: 'Godugupally Sai Sanvi', marks: '968 / 1000', score: 968, maxMarks: 1000, group: 'MEC', year: '2nd Year', image: '/images/toppers/2nd-year/2nd_mec_21_godugupally_sai_sanvi.png' },
  { id: '2nd_mec_22', name: 'Nethikar Kalash', marks: '965 / 1000', score: 965, maxMarks: 1000, group: 'MEC', year: '2nd Year', image: '/images/toppers/2nd-year/2nd_mec_22_nethikar_kalash.png' },

  // CEC Group
  { id: '2nd_cec_23', name: 'Ginodiya Nikhitha', marks: '974 / 1000', score: 974, maxMarks: 1000, group: 'CEC', year: '2nd Year', image: '/images/toppers/2nd-year/2nd_cec_23_ginodiya_nikhitha.png' },
  { id: '2nd_cec_24', name: 'Shaik Owais', marks: '959 / 1000', score: 959, maxMarks: 1000, group: 'CEC', year: '2nd Year', image: '/images/toppers/2nd-year/2nd_cec_24_shaik_owais.png' },
  { id: '2nd_cec_25', name: 'Tammareddy Ashrita', marks: '959 / 1000', score: 959, maxMarks: 1000, group: 'CEC', year: '2nd Year', image: '/images/toppers/2nd-year/2nd_cec_25_tammareddy_ashrita.png' },
  { id: '2nd_cec_26', name: 'Nakka Vani', marks: '957 / 1000', score: 957, maxMarks: 1000, group: 'CEC', year: '2nd Year', image: '/images/toppers/2nd-year/2nd_cec_26_nakka_vani.png' },
  { id: '2nd_cec_27', name: 'Mohamed Ibrahim', marks: '956 / 1000', score: 956, maxMarks: 1000, group: 'CEC', year: '2nd Year', image: '/images/toppers/2nd-year/2nd_cec_27_mohamed_ibrahim.png' },
];

export const firstYearSubjectStats: SubjectStat[] = [
  { subject: 'English', highestMarks: 99, studentCount: 3 },
  { subject: 'Telugu', highestMarks: 99, studentCount: 20 },
  { subject: 'Hindi', highestMarks: 99, studentCount: 40 },
  { subject: 'Sanskrit', highestMarks: 99, studentCount: 41 },
  { subject: 'French', highestMarks: 99, studentCount: 15 },
  { subject: 'Maths-A', highestMarks: 75, studentCount: 15 },
  { subject: 'Maths-B', highestMarks: 75, studentCount: 44 },
  { subject: 'Physics', highestMarks: 60, studentCount: 62 },
  { subject: 'Chemistry', highestMarks: 60, studentCount: 62 },
  { subject: 'Botany', highestMarks: 60, studentCount: 10 },
  { subject: 'Zoology', highestMarks: 60, studentCount: 10 },
  { subject: 'Economics', highestMarks: 99, studentCount: 8 },
  { subject: 'Commerce', highestMarks: 99, studentCount: 10 },
  { subject: 'Political Science', highestMarks: 99, studentCount: 2 },
];

export const secondYearSubjectStats: SubjectStat[] = [
  { subject: 'English', highestMarks: 98, studentCount: 6 },
  { subject: 'Telugu', highestMarks: 99, studentCount: 24 },
  { subject: 'Hindi', highestMarks: 99, studentCount: 70 },
  { subject: 'Sanskrit', highestMarks: 99, studentCount: 59 },
  { subject: 'French', highestMarks: 99, studentCount: 19 },
  { subject: 'Maths-A', highestMarks: 75, studentCount: 26 },
  { subject: 'Maths-B', highestMarks: 75, studentCount: 26 },
  { subject: 'Physics', highestMarks: 60, studentCount: 43 },
  { subject: 'Chemistry', highestMarks: 60, studentCount: 38 },
  { subject: 'Botany', highestMarks: 60, studentCount: 13 },
  { subject: 'Zoology', highestMarks: 60, studentCount: 10 },
  { subject: 'Economics', highestMarks: 99, studentCount: 17 },
  { subject: 'Commerce', highestMarks: 99, studentCount: 32 },
  { subject: 'Political Science', highestMarks: 99, studentCount: 8 },
];
