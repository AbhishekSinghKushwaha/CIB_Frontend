import { BankModel } from '../../domain/bank.model';
import { CountryModel } from '../../domain/country.model';
import { StatementListModel } from '../../domain/statement-list.model';
import { FavouriteBeneficiaryModel } from './../../domain/favourites-beneficiary.model';
import { SelectAccountModel } from './../../domain/select-account.model';

const accounts: SelectAccountModel[] = [{
  name: 'Loot',
  balance: 999999999.99,
  currency: 'KES',
  type: 'Savings'
}, {
  name: '0700000000',
  balance: 30000,
  currency: 'KES',
  type: 'Mobile account'
}, {
  name: '073019380132',
  balance: 4430000,
  currency: 'KES',
  type: 'Current'
}];

const favourites: FavouriteBeneficiaryModel[] = [{
  id: 1,
  name: 'June Lowela',
  phoneNumber: '+254 700 111 111',
  channel: 'Safaricom',
  country: 'Kenya'
}, {
  id: 2,
  name: 'Kevin Libega',
  phoneNumber: '+256 700 019 019',
  channel: 'MTN',
  country: 'Uganda'
}];

const banks: BankModel[] = [{
  id: 1,
  name: 'Barclays Bank Kenya',
}, {
  id: 2,
  name: 'Commercial Bank of Africa',
}, {
  id: 3,
  name: 'Equity Bank Kenya',
}];

const countries: CountryModel[] = [
  { name: 'Kenya', flag: 'https://flagcdn.com/h60/ke.png' },
  { name: 'Democratic Republic of Congo', flag: 'https://flagcdn.com/h60/cd.png' },
  { name: 'Rwanda', flag: 'https://flagcdn.com/h60/rw.png' },
  { name: 'South Sudan', flag: 'https://flagcdn.com/h60/ss.png' },
  { name: 'Tanzania', flag: 'https://flagcdn.com/h60/tz.png' }
]

const statementList: StatementListModel[] = [{ transactionDate: '1/17/2021', valueDate: '10/7/2021', narrative: 'Insertion of Bone Growth Stimulator into Facial Bone, Percutaneous Approach', transactionReference: '3601957868', debit: 8787, credit: 853, runningBalance: 3086 },
{ transactionDate: '5/16/2021', valueDate: '1/23/2021', narrative: 'Detachment at Right Lower Arm, Mid, Open Approach', transactionReference: '0223966185', debit: 9301, credit: 8902, runningBalance: 3586 },
{ transactionDate: '6/5/2021', valueDate: '9/22/2021', narrative: 'Destruction of Right Sclera, External Approach', transactionReference: '0583576710', debit: 2887, credit: 5014, runningBalance: 7001 },
{ transactionDate: '10/1/2021', valueDate: '11/1/2021', narrative: 'Beam Radiation of Axillary Lymphatics using Photons 1 - 10 MeV', transactionReference: '7340586660', debit: 8709, credit: 447, runningBalance: 4258 },
{ transactionDate: '8/13/2021', valueDate: '1/20/2021', narrative: 'Repair Right Elbow Bursa and Ligament, Percutaneous Approach', transactionReference: '6657179065', debit: 8888, credit: 2895, runningBalance: 4781 },
{ transactionDate: '1/25/2021', valueDate: '4/2/2021', narrative: 'Excision of Right Thorax Muscle, Percutaneous Endoscopic Approach', transactionReference: '8671283100', debit: 8979, credit: 2573, runningBalance: 6220 },
{ transactionDate: '1/28/2021', valueDate: '11/11/2021', narrative: 'Dilation of Left Hand Artery with Three Intraluminal Devices, Percutaneous Endoscopic Approach', transactionReference: '7745217849', debit: 1375, credit: 6881, runningBalance: 1745 },
{ transactionDate: '7/2/2021', valueDate: '12/5/2020', narrative: 'Removal of Drainage Device from Upper Jaw, Open Approach', transactionReference: '0779038509', debit: 2352, credit: 7444, runningBalance: 4879 },
{ transactionDate: '4/9/2021', valueDate: '6/17/2021', narrative: 'Supplement Right Internal Carotid Artery with Synthetic Substitute, Percutaneous Approach', transactionReference: '6104566901', debit: 5186, credit: 9572, runningBalance: 2291 },
{ transactionDate: '2/6/2021', valueDate: '1/16/2021', narrative: 'Tomographic (Tomo) Nuclear Medicine Imaging of Bilateral Lower Extremities using Technetium 99m (Tc-99m)', transactionReference: '3347078780', debit: 5287, credit: 2000, runningBalance: 7304 },
{ transactionDate: '2/6/2021', valueDate: '2/16/2021', narrative: 'Excision of Male Perineum, External Approach', transactionReference: '9439657820', debit: 4881, credit: 293, runningBalance: 4789 },
{ transactionDate: '3/27/2021', valueDate: '10/24/2021', narrative: 'Replacement of Right Occipital Bone with Synthetic Substitute, Open Approach', transactionReference: '4267064539', debit: 4601, credit: 2941, runningBalance: 9101 },
{ transactionDate: '5/11/2021', valueDate: '3/3/2021', narrative: 'Insertion of Limb Lengthening External Fixation Device into Right Upper Femur, Open Approach', transactionReference: '6806832008', debit: 934, credit: 7821, runningBalance: 3330 },
{ transactionDate: '5/23/2021', valueDate: '1/13/2021', narrative: 'Insertion of Intraluminal Device into Intracranial Vein, Percutaneous Endoscopic Approach', transactionReference: '6055332043', debit: 3120, credit: 7613, runningBalance: 3040 },
{ transactionDate: '10/11/2021', valueDate: '6/10/2021', narrative: 'Extirpation of Matter from Right Ankle Tendon, Open Approach', transactionReference: '5110877114', debit: 9084, credit: 2983, runningBalance: 7668 },
{ transactionDate: '8/29/2021', valueDate: '10/16/2021', narrative: 'Caregiver Training in Feeding and Eating using Assistive, Adaptive, Supportive or Protective Equipment', transactionReference: '9554528167', debit: 8080, credit: 6699, runningBalance: 9597 },
{ transactionDate: '4/16/2021', valueDate: '1/7/2021', narrative: 'Alteration of Abdominal Wall with Synthetic Substitute, Open Approach', transactionReference: '4965846486', debit: 5692, credit: 4570, runningBalance: 6807 },
{ transactionDate: '10/28/2021', valueDate: '10/26/2021', narrative: 'Dilation of Right Femoral Artery with Three Drug-eluting Intraluminal Devices, Percutaneous Endoscopic Approach', transactionReference: '9280740253', debit: 5013, credit: 9176, runningBalance: 1394 },
{ transactionDate: '6/15/2021', valueDate: '9/24/2021', narrative: 'Reposition Left External Jugular Vein, Percutaneous Approach', transactionReference: '7632157492', debit: 6151, credit: 8411, runningBalance: 7569 },
{ transactionDate: '8/3/2021', valueDate: '7/16/2021', narrative: 'Supplement Left Basilic Vein with Nonautologous Tissue Substitute, Percutaneous Approach', transactionReference: '3193376892', debit: 7668, credit: 667, runningBalance: 9134 },
{ transactionDate: '2/7/2021', valueDate: '2/8/2021', narrative: 'Transfer Left Upper Arm Tendon, Percutaneous Endoscopic Approach', transactionReference: '3468339755', debit: 7034, credit: 2741, runningBalance: 7635 },
{ transactionDate: '11/26/2021', valueDate: '9/20/2021', narrative: 'Excision of Male Perineum, External Approach', transactionReference: '8980825463', debit: 9203, credit: 7315, runningBalance: 3801 },
{ transactionDate: '8/8/2021', valueDate: '10/31/2021', narrative: 'Monitoring of Cardiac Rate, Percutaneous Approach', transactionReference: '6505985522', debit: 3407, credit: 7444, runningBalance: 1370 },
{ transactionDate: '2/25/2021', valueDate: '10/17/2021', narrative: 'Bypass Descending Colon to Cutaneous, Percutaneous Endoscopic Approach', transactionReference: '6011780873', debit: 7205, credit: 614, runningBalance: 6576 },
{ transactionDate: '7/14/2021', valueDate: '10/12/2021', narrative: 'Drainage of Left Axilla, Percutaneous Approach, Diagnostic', transactionReference: '2824176660', debit: 5520, credit: 4765, runningBalance: 5756 },
{ transactionDate: '9/24/2021', valueDate: '1/27/2021', narrative: 'Bypass Right Pulmonary Artery from Subclavian with Synthetic Substitute, Open Approach', transactionReference: '7887517427', debit: 8924, credit: 6659, runningBalance: 2982 },
{ transactionDate: '4/18/2021', valueDate: '3/1/2021', narrative: 'Beam Radiation of Tongue using Photons >10 MeV', transactionReference: '3779910535', debit: 3843, credit: 1123, runningBalance: 6575 },
{ transactionDate: '12/6/2020', valueDate: '7/9/2021', narrative: 'Revision of Synthetic Substitute in Left Knee Joint, Patellar Surface, Open Approach', transactionReference: '3456507860', debit: 6250, credit: 1387, runningBalance: 7994 },
{ transactionDate: '2/23/2021', valueDate: '7/5/2021', narrative: 'Introduction of Serum, Toxoid and Vaccine into Peripheral Vein, Percutaneous Approach', transactionReference: '6177110134', debit: 5198, credit: 3981, runningBalance: 7300 },
{ transactionDate: '10/13/2021', valueDate: '7/22/2021', narrative: 'Inspection of Upper Bursa and Ligament, Percutaneous Approach', transactionReference: '9695617190', debit: 251, credit: 1750, runningBalance: 966 },
{ transactionDate: '9/6/2021', valueDate: '2/8/2021', narrative: 'Replacement of Left Lower Eyelid with Synthetic Substitute, External Approach', transactionReference: '9564282012', debit: 6834, credit: 9970, runningBalance: 1702 },
{ transactionDate: '5/12/2021', valueDate: '5/9/2021', narrative: 'Repair of Upper Tooth, Multiple, Open Approach', transactionReference: '9643563545', debit: 3199, credit: 5655, runningBalance: 4979 },
{ transactionDate: '6/24/2021', valueDate: '9/3/2021', narrative: 'Alteration of Left Lower Arm with Synthetic Substitute, Open Approach', transactionReference: '1392394503', debit: 8136, credit: 6063, runningBalance: 1927 },
{ transactionDate: '8/11/2021', valueDate: '6/2/2021', narrative: 'Drainage of Right Shoulder Bursa and Ligament, Percutaneous Endoscopic Approach', transactionReference: '8470829963', debit: 4402, credit: 5080, runningBalance: 6347 },
{ transactionDate: '1/15/2021', valueDate: '6/20/2021', narrative: 'Removal of Radioactive Element from Face, External Approach', transactionReference: '1143500067', debit: 6878, credit: 2104, runningBalance: 5428 },
{ transactionDate: '7/12/2021', valueDate: '7/19/2021', narrative: 'Replacement of Right External Ear with Autologous Tissue Substitute, External Approach', transactionReference: '6523770192', debit: 7000, credit: 8695, runningBalance: 8097 },
{ transactionDate: '10/8/2021', valueDate: '3/21/2021', narrative: 'Supplement Right Parietal Bone with Nonautologous Tissue Substitute, Percutaneous Endoscopic Approach', transactionReference: '8346584385', debit: 5927, credit: 3941, runningBalance: 5393 },
{ transactionDate: '4/1/2021', valueDate: '2/3/2021', narrative: 'Muscle Performance Treatment of Neurological System - Lower Back / Lower Extremity using Orthosis', transactionReference: '9900136683', debit: 5565, credit: 8901, runningBalance: 6536 },
{ transactionDate: '4/30/2021', valueDate: '5/1/2021', narrative: 'Restriction of Jejunum with Intraluminal Device, Via Natural or Artificial Opening Endoscopic', transactionReference: '3950069135', debit: 2951, credit: 3603, runningBalance: 1936 },
{ transactionDate: '3/2/2021', valueDate: '2/5/2021', narrative: 'Beam Radiation of Larynx using Heavy Particles (Protons,Ions)', transactionReference: '6079951975', debit: 9446, credit: 888, runningBalance: 7829 },
{ transactionDate: '6/26/2021', valueDate: '8/19/2021', narrative: 'Replacement of Right Foot Skin with Nonautologous Tissue Substitute, Partial Thickness, External Approach', transactionReference: '4728798569', debit: 5212, credit: 5008, runningBalance: 8578 },
{ transactionDate: '4/12/2021', valueDate: '2/3/2021', narrative: 'Repair Left Mastoid Sinus, Percutaneous Approach', transactionReference: '7704994778', debit: 7165, credit: 3798, runningBalance: 8689 },
{ transactionDate: '11/28/2021', valueDate: '6/16/2021', narrative: 'High Dose Rate (HDR) Brachytherapy of Nose using Palladium 103 (Pd-103)', transactionReference: '9496856012', debit: 9848, credit: 2953, runningBalance: 3339 },
{ transactionDate: '1/18/2021', valueDate: '3/30/2021', narrative: 'Drainage of Cervicothoracic Vertebral Disc, Open Approach, Diagnostic', transactionReference: '5628364592', debit: 5479, credit: 376, runningBalance: 6309 },
{ transactionDate: '3/24/2021', valueDate: '9/30/2021', narrative: 'Replacement of Larynx with Nonautologous Tissue Substitute, Via Natural or Artificial Opening Endoscopic', transactionReference: '7772618239', debit: 9125, credit: 8043, runningBalance: 6406 },
{ transactionDate: '2/20/2021', valueDate: '10/29/2021', narrative: 'Removal of Infusion Device from Upper Jaw, Percutaneous Endoscopic Approach', transactionReference: '9603452009', debit: 920, credit: 3993, runningBalance: 9479 },
{ transactionDate: '7/8/2021', valueDate: '4/17/2021', narrative: 'Drainage of Right Radius with Drainage Device, Percutaneous Endoscopic Approach', transactionReference: '6301657063', debit: 1405, credit: 9338, runningBalance: 827 },
{ transactionDate: '4/13/2021', valueDate: '11/1/2021', narrative: 'Drainage of Right Vocal Cord with Drainage Device, Percutaneous Approach', transactionReference: '0566913445', debit: 8654, credit: 9371, runningBalance: 601 },
{ transactionDate: '5/24/2021', valueDate: '10/23/2021', narrative: 'Destruction of Left Anterior Tibial Artery, Percutaneous Approach', transactionReference: '3133341146', debit: 5340, credit: 9099, runningBalance: 7138 },
{ transactionDate: '5/25/2021', valueDate: '12/23/2020', narrative: 'Drainage of Right Brachial Artery, Percutaneous Endoscopic Approach', transactionReference: '0358611474', debit: 1775, credit: 9461, runningBalance: 5836 }];

export const mockData = {
  accounts, favourites, banks, countries, statementList
}
