import { retiredStaffRoster, getInstitutionData } from "../lib/site-data";

export const EXPECTED_RETIRED_STAFF = [
  { sno: 1, name: "MR. EV SUBBA RAO", department: "PHYSICS", doa: "1974", dor: "1997" },
  { sno: 2, name: "MR. JAYATEERTH KATTI", department: "MATHEMATICS", doa: "1981", dor: "2004" },
  { sno: 3, name: "MS. MANIKYAMMA", department: "SUP.STAFF", doa: "1984", dor: "2001" },
  { sno: 4, name: "MS. B D M SAKUNTHALA", department: "BOTANY", doa: "1974", dor: "2005" },
  { sno: 5, name: "MS. U SARASWATHI", department: "ENGLISH", doa: "1995", dor: "2005" },
  { sno: 6, name: "MR. K JYOTHI RAM", department: "ADMN", doa: "1990", dor: "2005" },
  { sno: 7, name: "MS. KANCHANA SRIVASTAVA", department: "ENGLISH", doa: "1983", dor: "2008" },
  { sno: 8, name: "MR. K NAGARAJ KUMAR", department: "PHYSICS", doa: "1982", dor: "2010" },
  { sno: 9, name: "MR. B NARAYANA", department: "SUP. STAFF", doa: "1989", dor: "2007" },
  { sno: 10, name: "MS. SUDHESHNA CHATTOPADHYAY", department: "FRENCH", doa: "1982", dor: "2013" },
  { sno: 11, name: "DR. K PESAVACHARYULU", department: "TELUGU", doa: "1982", dor: "2013" },
  { sno: 12, name: "MR. T RAJESHWARA REDDY", department: "SANSKRIT", doa: "1982", dor: "2013" },
  { sno: 13, name: "MS. SAVITHRI NARAYANAN", department: "LIBRARY", doa: "1999", dor: "2014" },
  { sno: 14, name: "MS. B SHAILA TANUJA", department: "ZOOLOGY", doa: "1983", dor: "2016" },
  { sno: 15, name: "MR. G BHEESHMA CHARY", department: "SUP.STAFF", doa: "1987", dor: "2016" },
  { sno: 16, name: "MR. DAVID JOSEPH", department: "ADMN", doa: "1982", dor: "2016" },
  { sno: 17, name: "DR. RIYAZ UL ANSARI", department: "HINDI", doa: "1991", dor: "2016" },
  { sno: 18, name: "MS. P USHA", department: "CHEMISTRY", doa: "1983", dor: "2017" },
  { sno: 19, name: "MR. CHABBILAL", department: "SUP.STAFF", doa: "1983", dor: "2018" },
  { sno: 20, name: "MR. A RAMA NARASIMHA RAO", department: "PHYSICS", doa: "1985", dor: "2017" },
  { sno: 21, name: "MS. J MEENAKSHI", department: "SANSKRIT", doa: "2000", dor: "2017" },
  { sno: 22, name: "MR. MOHD. JEHANGIR", department: "SUP.STAFF", doa: "1982", dor: "2018" },
  { sno: 23, name: "MS. K SUSHEELAMMA", department: "SUP.STAFF", doa: "1987", dor: "2018" },
  { sno: 24, name: "MR. K SRINIVAS DEV", department: "PHYSICS", doa: "1991", dor: "2019" },
  { sno: 25, name: "DR. ANITHA LINCOLN", department: "CHEMISTRY", doa: "1986", dor: "2020" },
  { sno: 26, name: "MR. S BALAIAH", department: "SUP.STAFF(BIOLOGY)", doa: "1985", dor: "2020" },
  { sno: 27, name: "MS. RACHEL OOMMEN", department: "ENGLISH", doa: "1988", dor: "2020" },
  { sno: 28, name: "MR. TD BABU", department: "SUP.STAFF", doa: "1989", dor: "2022" },
  { sno: 29, name: "MS. SABIHA FATHIMA", department: "CHEMISTRY", doa: "1987", dor: "2023" },
  { sno: 30, name: "MR. SHAIK LATEEF", department: "SUP.STAFF (CHEMISTRY)", doa: "1983", dor: "2023" },
  { sno: 31, name: "MR. B PAUL RAJU", department: "MATHEMATICS", doa: "2000", dor: "2023" },
  { sno: 32, name: "MR. M AMARNATH", department: "COMPUTER SCIENCE", doa: "1996", dor: "2023" },
  { sno: 33, name: "MR. C DEVENDER", department: "SUP.STAFF (PHYSICS)", doa: "1985", dor: "2023" },
  { sno: 34, name: "MS. JAYASHREE GOPALANKUTTY", department: "BOTANY", doa: "1990", dor: "2024" },
  { sno: 35, name: "MS. PADMASANI", department: "MATHEMATICS", doa: "1995", dor: "2025" },
  { sno: 36, name: "MR. RAJASEKHAR NARAYANA DAS (LATE)", department: "COMMERCE", doa: "2010", dor: "2025" },
  { sno: 37, name: "MR. CH. MALLESH (LATE)", department: "SUP. STAFF", doa: "1992", dor: "2025" },
  { sno: 38, name: "MR. MILIND PATHAK", department: "LIBRARY", doa: "1995", dor: "2026" },
  { sno: 39, name: "MR. S. NAGARJUNA KUMAR", department: "COMMERCE", doa: "1993", dor: "2026" },
];

function runValidation() {
  console.log("=== RETIRED STAFF ORDER LOCK VALIDATION ===");
  
  // 1. Check retiredStaffRoster count
  console.log(`1. Total count in roster: ${retiredStaffRoster.length}`);
  if (retiredStaffRoster.length !== 39) {
    throw new Error(`FAIL: Expected exactly 39 entries, got ${retiredStaffRoster.length}`);
  }
  console.log("   -> PASS: Count is exactly 39");

  // 2. Check getInstitutionData("lfjc") retired staff count
  const instData = getInstitutionData("lfjc");
  const filteredFromFaculty = instData.faculty.filter(f => f.category === "retired");
  console.log(`2. Total retired staff in instData.faculty: ${filteredFromFaculty.length}`);
  if (filteredFromFaculty.length !== 39) {
    throw new Error(`FAIL: Expected 39 retired staff in faculty array, got ${filteredFromFaculty.length}`);
  }
  console.log("   -> PASS: Filtered count is exactly 39");

  // 3. Verify sequential order from 1 to 39
  console.log("3. Verifying sequential numbers 1 to 39...");
  const seenSnos = new Set<number>();
  for (let i = 0; i < retiredStaffRoster.length; i++) {
    const item = retiredStaffRoster[i];
    const expectedNum = i + 1;
    if (item.sno !== expectedNum) {
      throw new Error(`FAIL at index ${i}: Expected sno ${expectedNum}, got ${item.sno}`);
    }
    if (item.order !== expectedNum) {
      throw new Error(`FAIL at index ${i}: Expected order ${expectedNum}, got ${item.order}`);
    }
    if (seenSnos.has(item.sno)) {
      throw new Error(`FAIL: Duplicate sno detected: ${item.sno}`);
    }
    seenSnos.add(item.sno);
  }
  console.log("   -> PASS: Every number 1..39 appears exactly once in consecutive order");

  // 4. Verify S.No. 1 is MR. EV SUBBA RAO
  console.log("4. Verifying S.No. 1...");
  if (retiredStaffRoster[0].name !== "MR. EV SUBBA RAO") {
    throw new Error(`FAIL: S.No. 1 is ${retiredStaffRoster[0].name}, expected MR. EV SUBBA RAO`);
  }
  console.log("   -> PASS: S.No. 1 is MR. EV SUBBA RAO");

  // 5. Verify S.No. 39 is MR. S. NAGARJUNA KUMAR
  console.log("5. Verifying S.No. 39...");
  if (retiredStaffRoster[38].name !== "MR. S. NAGARJUNA KUMAR") {
    throw new Error(`FAIL: S.No. 39 is ${retiredStaffRoster[38].name}, expected MR. S. NAGARJUNA KUMAR`);
  }
  console.log("   -> PASS: S.No. 39 is MR. S. NAGARJUNA KUMAR");

  // 6. Verify each and every entry against expected reference data
  console.log("6. Verifying all 39 entries verbatim against reference truth...");
  for (let i = 0; i < EXPECTED_RETIRED_STAFF.length; i++) {
    const exp = EXPECTED_RETIRED_STAFF[i];
    const act = retiredStaffRoster[i];
    const actFaculty = filteredFromFaculty[i];

    if (act.name !== exp.name) {
      throw new Error(`FAIL: Entry ${exp.sno} name mismatch: expected "${exp.name}", got "${act.name}"`);
    }
    if (act.department !== exp.department) {
      throw new Error(`FAIL: Entry ${exp.sno} department mismatch: expected "${exp.department}", got "${act.department}"`);
    }
    if (act.doa !== exp.doa) {
      throw new Error(`FAIL: Entry ${exp.sno} DOA mismatch: expected "${exp.doa}", got "${act.doa}"`);
    }
    if (act.dor !== exp.dor) {
      throw new Error(`FAIL: Entry ${exp.sno} DOR mismatch: expected "${exp.dor}", got "${act.dor}"`);
    }
    if (actFaculty.name !== exp.name) {
      throw new Error(`FAIL in faculty array: Entry ${exp.sno} name mismatch: expected "${exp.name}", got "${actFaculty.name}"`);
    }
    console.log(`   [${String(exp.sno).padStart(2, " ")}] ${act.name.padEnd(36, " ")} | ${act.department.padEnd(24, " ")} | DOA ${act.doa} | DOR ${act.dor}`);
  }

  console.log("\n>>> ALL 8 VALIDATION CHECKS PASSED PERFECTLY! <<<");
}

runValidation();
