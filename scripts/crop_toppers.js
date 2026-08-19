const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const img1Path = 'C:/Users/LFDC/.gemini/antigravity-ide/brain/03a8720b-c874-494a-b6da-6c3a4fc26473/media__1787026204094.jpg';
const img2Path = 'C:/Users/LFDC/.gemini/antigravity-ide/brain/03a8720b-c874-494a-b6da-6c3a4fc26473/media__1787026217657.jpg';

const dir1 = path.join(process.cwd(), 'public', 'images', 'toppers', '1st-year');
const dir2 = path.join(process.cwd(), 'public', 'images', 'toppers', '2nd-year');

fs.mkdirSync(dir1, { recursive: true });
fs.mkdirSync(dir2, { recursive: true });

// Width = 34, Height = 46 for crisp portrait crops
const W = 34;
const H = 46;

const toppers1st = [
  // Row 1 (MPC) - top = 208
  { id: '1st_mpc_1_tipparaju_akshaya', left: 122, top: 208 },
  { id: '1st_mpc_2_ridha_fatema', left: 259, top: 208 },
  { id: '1st_mpc_3_hanumanthu_avinash_reddy', left: 396, top: 208 },
  { id: '1st_mpc_4_neesala_joel_austin', left: 533, top: 208 },
  { id: '1st_mpc_5_kavya_swargam', left: 670, top: 208 },
  { id: '1st_mpc_6_rayabaghi_raghavendra_lochan', left: 807, top: 208 },

  // Row 2 (MPC) - top = 274
  { id: '1st_mpc_7_cheela_shrijani', left: 112, top: 274 },
  { id: '1st_mpc_8_moganti_srinidhi', left: 231, top: 274 },
  { id: '1st_mpc_9_daggumati_amal', left: 350, top: 274 },
  { id: '1st_mpc_10_ponnapaty_edward_wesley', left: 468, top: 274 },
  { id: '1st_mpc_11_r_aravindh', left: 587, top: 274 },
  { id: '1st_mpc_12_mohammed_amaan', left: 706, top: 274 },
  { id: '1st_mpc_13_atharva_namdev_potdar', left: 825, top: 274 },

  // Row 3 (BiPC) - top = 340
  { id: '1st_bipc_14_gudla_sahasra', left: 54, top: 340 },
  { id: '1st_bipc_15_konkotti_keerthana', left: 195, top: 340 },
  { id: '1st_bipc_16_jakkula_vaishnavi', left: 334, top: 340 },
  { id: '1st_bipc_17_ashwathi_nair', left: 472, top: 340 },
  { id: '1st_bipc_18_samantha_d_silva', left: 611, top: 340 },
  { id: '1st_bipc_19_deekonda_mayabodhi', left: 749, top: 340 },
  { id: '1st_bipc_20_jecinthamary_b', left: 888, top: 340 },

  // Row 4 (MEC) - top = 406
  { id: '1st_mec_21_madhipally_ekshitha', left: 58, top: 406 },
  { id: '1st_mec_22_gunmedelli_nithya', left: 176, top: 406 },
  { id: '1st_mec_23_sai_suhas_jilla', left: 293, top: 406 },
  { id: '1st_mec_24_devunoori_sai_sudhamshu', left: 411, top: 406 },
  { id: '1st_mec_25_khushi_heda', left: 528, top: 406 },
  { id: '1st_mec_26_arra_anushna', left: 645, top: 406 },
  { id: '1st_mec_27_keerthana_rajesh', left: 763, top: 406 },
  { id: '1st_mec_28_ramani_shrushti_patel', left: 880, top: 406 },

  // Row 5 (CEC) - top = 472
  { id: '1st_cec_29_kavathi_yashaswini_reddy', left: 219, top: 472 },
  { id: '1st_cec_30_dusari_karishma_goud', left: 337, top: 472 },
  { id: '1st_cec_31_bandi_apoorva', left: 455, top: 472 },
  { id: '1st_cec_32_marneni_nirmiti_mary', left: 572, top: 472 },
  { id: '1st_cec_33_joannie_livingstone_kondapalli', left: 690, top: 472 },
];

const toppers2nd = [
  // Row 1 (MPC) - top = 208
  { id: '2nd_mpc_1_gyara_akshara_sindhu', left: 94, top: 208 },
  { id: '2nd_mpc_2_goriga_akash_goud', left: 246, top: 208 },
  { id: '2nd_mpc_3_chhavi_jain', left: 398, top: 208 },
  { id: '2nd_mpc_4_katakam_yashaswini_sreenayi', left: 551, top: 208 },
  { id: '2nd_mpc_5_konatham_charith_reddy', left: 703, top: 208 },
  { id: '2nd_mpc_6_nadapa_sushna_reddy', left: 856, top: 208 },

  // Row 2 (MPC) - top = 274
  { id: '2nd_mpc_7_sarabudla_shrasha', left: 94, top: 274 },
  { id: '2nd_mpc_8_j_jeffrey', left: 246, top: 274 },
  { id: '2nd_mpc_9_sofia_naaz', left: 398, top: 274 },
  { id: '2nd_mpc_10_kurapati_sathwik', left: 551, top: 274 },
  { id: '2nd_mpc_11_thirumala_reddy_venkata_keerthana_reddy', left: 703, top: 274 },
  { id: '2nd_mpc_12_lattupalli_sai_ganesh_reddy', left: 856, top: 274 },

  // Row 3 (BiPC) - top = 340
  { id: '2nd_bipc_13_bangari_rishika_swathi', left: 169, top: 340 },
  { id: '2nd_bipc_14_aditi_upadhyay', left: 321, top: 340 },
  { id: '2nd_bipc_15_alivia_mary_thomas', left: 474, top: 340 },
  { id: '2nd_bipc_16_syeda_sufia_jahan', left: 626, top: 340 },
  { id: '2nd_bipc_17_hemanshi_choudary', left: 778, top: 340 },

  // Row 4 (MEC) - top = 406
  { id: '2nd_mec_18_leela', left: 169, top: 406 },
  { id: '2nd_mec_19_g_achutha_sree', left: 321, top: 406 },
  { id: '2nd_mec_20_bandari_shri_vedha', left: 474, top: 406 },
  { id: '2nd_mec_21_godugupally_sai_sanvi', left: 626, top: 406 },
  { id: '2nd_mec_22_nethikar_kalash', left: 778, top: 406 },

  // Row 5 (CEC) - top = 472
  { id: '2nd_cec_23_ginodiya_nikhitha', left: 169, top: 472 },
  { id: '2nd_cec_24_shaik_owais', left: 321, top: 472 },
  { id: '2nd_cec_25_tammareddy_ashrita', left: 474, top: 472 },
  { id: '2nd_cec_26_nakka_vani', left: 626, top: 472 },
  { id: '2nd_cec_27_mohamed_ibrahim', left: 778, top: 472 },
];

async function extractAll() {
  console.log('Extracting 33 1st year toppers...');
  for (const t of toppers1st) {
    const outPath = path.join(dir1, `${t.id}.png`);
    await sharp(img1Path)
      .extract({ left: t.left, top: t.top, width: W, height: H })
      .resize(120, 160, { fit: 'fill' }) // High-res upscale for avatar display
      .toFile(outPath);
  }

  console.log('Extracting 27 2nd year toppers...');
  for (const t of toppers2nd) {
    const outPath = path.join(dir2, `${t.id}.png`);
    await sharp(img2Path)
      .extract({ left: t.left, top: t.top, width: W, height: H })
      .resize(120, 160, { fit: 'fill' })
      .toFile(outPath);
  }

  console.log('All 60 student photos cropped cleanly!');
}

extractAll().catch(err => console.error(err));
