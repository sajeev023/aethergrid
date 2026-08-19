const fs = require('fs');
const path = require('path');

const analysis = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'scratch', 'pic_analysis.json'), 'utf8'));

const groups = {};

analysis.items.forEach(item => {
  if (item.isDuplicate) return;

  let groupName = 'Other';
  const fn = item.filename;

  if (fn.startsWith('1 st y') || fn.startsWith('2nd')) {
    groupName = 'Sports Awards Flyers';
  } else if (fn.startsWith('Meeting') || fn.startsWith('PTM')) {
    groupName = 'PTM Event Flyers';
  } else if (fn.startsWith('DSC_0')) {
    groupName = 'DSC_0xxx Series';
  } else if (fn.startsWith('DSC_53') || fn.startsWith('DSC_54') || fn.startsWith('DSC_55')) {
    groupName = 'DSC_53xx-55xx Series';
  } else if (fn.startsWith('DSC_56') || fn.startsWith('DSC_57') || fn.startsWith('DSC_58')) {
    groupName = 'DSC_56xx-58xx Series';
  } else if (fn.startsWith('DSC_59') || fn.startsWith('DSC_60') || fn.startsWith('DSC_61') || fn.startsWith('DSC_62')) {
    groupName = 'DSC_59xx-62xx Series';
  } else if (fn.startsWith('DSC_63') || fn.startsWith('DSC_64') || fn.startsWith('DSC_65')) {
    groupName = 'DSC_63xx-65xx Series';
  } else if (fn.startsWith('LFS_')) {
    groupName = 'LFS_2xxx Series';
  }

  if (!groups[groupName]) groups[groupName] = [];
  groups[groupName].push(item);
});

console.log('--- PHOTO GROUPS BREAKDOWN ---');
for (const [g, items] of Object.entries(groups)) {
  console.log(`\nGroup: ${g} (${items.length} items)`);
  items.forEach(it => console.log(`  - #${it.index} ${it.filename} (${it.width}x${it.height}, ${it.sizeMB}MB)`));
}
