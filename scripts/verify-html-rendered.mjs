// ESM script to test live HTML from server
async function test() {
  const res = await fetch("http://localhost:3000/faculty/retired");
  const html = await res.text();

  const expectedList = [
    { sno: 1, name: "MR. EV SUBBA RAO" },
    { sno: 2, name: "MR. JAYATEERTH KATTI" },
    { sno: 3, name: "MS. MANIKYAMMA" },
    { sno: 4, name: "MS. B D M SAKUNTHALA" },
    { sno: 5, name: "MS. U SARASWATHI" },
    { sno: 6, name: "MR. K JYOTHI RAM" },
    { sno: 7, name: "MS. KANCHANA SRIVASTAVA" },
    { sno: 8, name: "MR. K NAGARAJ KUMAR" },
    { sno: 9, name: "MR. B NARAYANA" },
    { sno: 10, name: "MS. SUDHESHNA CHATTOPADHYAY" },
    { sno: 11, name: "DR. K PESAVACHARYULU" },
    { sno: 12, name: "MR. T RAJESHWARA REDDY" },
    { sno: 13, name: "MS. SAVITHRI NARAYANAN" },
    { sno: 14, name: "MS. B SHAILA TANUJA" },
    { sno: 15, name: "MR. G BHEESHMA CHARY" },
    { sno: 16, name: "MR. DAVID JOSEPH" },
    { sno: 17, name: "DR. RIYAZ UL ANSARI" },
    { sno: 18, name: "MS. P USHA" },
    { sno: 19, name: "MR. CHABBILAL" },
    { sno: 20, name: "MR. A RAMA NARASIMHA RAO" },
    { sno: 21, name: "MS. J MEENAKSHI" },
    { sno: 22, name: "MR. MOHD. JEHANGIR" },
    { sno: 23, name: "MS. K SUSHEELAMMA" },
    { sno: 24, name: "MR. K SRINIVAS DEV" },
    { sno: 25, name: "DR. ANITHA LINCOLN" },
    { sno: 26, name: "MR. S BALAIAH" },
    { sno: 27, name: "MS. RACHEL OOMMEN" },
    { sno: 28, name: "MR. TD BABU" },
    { sno: 29, name: "MS. SABIHA FATHIMA" },
    { sno: 30, name: "MR. SHAIK LATEEF" },
    { sno: 31, name: "MR. B PAUL RAJU" },
    { sno: 32, name: "MR. M AMARNATH" },
    { sno: 33, name: "MR. C DEVENDER" },
    { sno: 34, name: "MS. JAYASHREE GOPALANKUTTY" },
    { sno: 35, name: "MS. PADMASANI" },
    { sno: 36, name: "MR. RAJASEKHAR NARAYANA DAS (LATE)" },
    { sno: 37, name: "MR. CH. MALLESH (LATE)" },
    { sno: 38, name: "MR. MILIND PATHAK" },
    { sno: 39, name: "MR. S. NAGARJUNA KUMAR" },
  ];

  console.log("Checking HTML output from http://localhost:3000/faculty/retired...");
  console.log("HTML length:", html.length);

  let allFound = true;
  for (const item of expectedList) {
    if (!html.includes(item.name)) {
      console.error(`NOT FOUND: S.No. ${item.sno} ${item.name}`);
      allFound = false;
    }
  }

  if (allFound) {
    console.log("PASSED: All 39 staff members are present in the rendered HTML!");
  } else {
    process.exit(1);
  }

  let lastIdx = -1;
  let inOrder = true;
  for (const item of expectedList) {
    const idx = html.indexOf(item.name);
    if (idx < lastIdx) {
      console.error(`OUT OF ORDER: S.No. ${item.sno} ${item.name} appeared before preceding entry!`);
      inOrder = false;
    }
    lastIdx = idx;
  }

  if (inOrder) {
    console.log("PASSED: All 39 staff members appear in EXACT 1 -> 39 sequence in HTML!");
  } else {
    process.exit(1);
  }
}

test();
