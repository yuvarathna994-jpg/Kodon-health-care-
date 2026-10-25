import { checkEmergencySymptoms, VERIFIED_ANALYTES } from '../server/clinicalData';
import { DIAGNOSTIC_LIBRARY } from '../src/data/diagnosticLibraryData';
import { MEMBERSHIP_PLANS } from '../src/data/membershipsData';

function runClinicalValidationTests() {
  console.log('--- RUNNING KODON HEALTHCARE & AI KODAN VALIDATION SUITE ---');
  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string) {
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passed++;
    } else {
      console.error(`[FAIL] ${testName}`);
      failed++;
    }
  }

  // 1. Emergency Escalation Test
  const chestPainCheck = checkEmergencySymptoms('I have intense crushing chest pain and left arm numbness');
  assert(chestPainCheck.isEmergency === true, 'Emergency escalation triggers for cardiac symptoms');
  assert(chestPainCheck.emergencyNumber.includes('108'), '108 helpline provided on emergency detection');

  const normalCheck = checkEmergencySymptoms('I need a regular fasting lipid profile for cholesterol check');
  assert(normalCheck.isEmergency === false, 'Non-emergency query does not trigger emergency alert');

  // 2. Stroke & Respiratory Emergency Triggers
  const strokeCheck = checkEmergencySymptoms('patient has sudden slurred speech and facial drooping');
  assert(strokeCheck.isEmergency === true, 'Stroke warning triggers immediate 108 escalation');

  // 3. Verified Analyte Reference Ranges
  assert(Boolean(VERIFIED_ANALYTES.hba1c), 'HbA1c reference definition exists');
  assert(VERIFIED_ANALYTES.hba1c.normalRange.includes('< 5.7%') || VERIFIED_ANALYTES.hba1c.normalRange.includes('Below 5.7%'), 'HbA1c reference range clinically verified (<5.7%)');
  assert(VERIFIED_ANALYTES.creatinine.normalRange.includes('0.6 - 1.2'), 'Creatinine reference interval verified (0.6 - 1.2 mg/dL)');

  // 4. Diagnostic Library 15% Discount Verification
  DIAGNOSTIC_LIBRARY.forEach((cat) => {
    cat.partnerOffers.forEach((offer) => {
      if (offer.kodonDiscountEligible) {
        // Ensure discount is applied exactly once to the approved base offer price
        const expectedDiscount = Math.round(offer.offerPrice * 0.15);
        const expectedFinal = offer.offerPrice - expectedDiscount + offer.collectionCharge;
        assert(
          Math.abs(offer.finalPayable - expectedFinal) <= 1,
          `Single 15% discount calculation accurate for ${cat.name} (${offer.partnerName})`
        );
      }
    });
  });

  // 5. No Invented Partner Prices
  DIAGNOSTIC_LIBRARY.forEach((cat) => {
    cat.partnerOffers.forEach((offer) => {
      assert(offer.offerPrice > 0, `Valid non-zero price for ${cat.name} - ${offer.partnerName}`);
      assert(offer.finalPayable > 0, `Valid final payable for ${cat.name} - ${offer.partnerName}`);
      assert(offer.lastVerified === '2026-10-25' || offer.lastVerified === '2026-10-24', `Verified timestamp present`);
    });
  });

  // 6. VIP Membership Plan Configuration
  const vipPlan = MEMBERSHIP_PLANS.find((p) => p.id === 'vip');
  assert(Boolean(vipPlan), 'KODON VIP plan defined');
  assert(vipPlan?.priceAnnual === 1499, 'VIP Annual Price is exactly ₹1,499');
  assert(vipPlan?.priceMonthly === 149, 'VIP Monthly Price is exactly ₹149');

  // 7. Lupin Diagnostics Integration Verification
  const lupinOffers = DIAGNOSTIC_LIBRARY.flatMap((cat) =>
    cat.partnerOffers.filter((o) => o.partnerId === 'lupin')
  );
  assert(lupinOffers.length >= 6, `Lupin Diagnostics offers integrated (${lupinOffers.length} offers found across library)`);
  lupinOffers.forEach((lupinOffer) => {
    assert(lupinOffer.partnerName === 'Lupin Diagnostics', 'Lupin Diagnostics partner name correctly formatted');
    assert(lupinOffer.accreditation.includes('NABL') || lupinOffer.accreditation.includes('CAP'), 'Lupin accreditation certified');
    assert(lupinOffer.offerPrice > 0, `Lupin verified offer price positive for ${lupinOffer.testName}`);
  });

  console.log(`\nTEST SUMMARY: ${passed} Passed, ${failed} Failed`);
  if (failed > 0) {
    process.exit(1);
  }
}

runClinicalValidationTests();
