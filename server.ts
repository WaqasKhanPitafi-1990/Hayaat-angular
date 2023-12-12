// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { enableProdMode } from '@angular/core';

import * as express from 'express';
import { join } from 'path';
// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main.bundle');

// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

// TODO: implement data requests securely
app.get('/api/*', (req, res) => {
  res.status(404).send('data requests are not supported');
});

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));

// Server redirects
app.get('/donors',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/blood-donors');});
app.get('/doctors',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/find-a-doctor');});
app.get('/question',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/ask-questions');});
app.get('/doctors/GwDVg/Dr-Shafqat-Rasool-Gastroenterologist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Gastroenterologist/Dr-Shafqat-Rasool');});
app.get('/doctors/zxP58/Dr-M-Ashfaq-Gastroenterologist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Gastroenterologist/Dr-M-Ashfaq');});
app.get('/doctors/I54t0/Dr-Zubair-Qayum-Gastroenterologist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Gastroenterologist/Dr-Zubair-Qayum');});
app.get('/doctors/C9GZv/Dr-Adeel-Qamar-Gastroenterologist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Gastroenterologist/Dr-Adeel-Qamar');});
app.get('/doctors/JV0QZ/Dr-Fateh-Khan-Akhtar-Urologist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Urologist/Dr-Fateh-Khan-Akhtar');});
app.get('/doctors/kFgTZ/Dr-Prof-Khalid-Javed-Rabbani-Urologist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Urologist/Dr-Prof-Khalid-Javed-Rabbani');});
app.get('/doctors/rdo8D/Dr-Khizer-Hayat-Gondal-Urologist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Urologist/Dr-Khizer-Hayat-Gondal');});
app.get('/doctors/VCIQw/Dr-Shoukat-Zubair-Urologist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Urologist/Dr-Shoukat-Zubair');});
app.get('/doctors/ljoyR/Dr-Asad-Ali-Shah-Urologist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Urologist/Dr-Asad-Ali-Shah');});
app.get('/doctors/IciOZ/Dr-Shah-Jehan-Khan-Urologist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Urologist/Dr-Shah-Jehan-Khan');});
app.get('/doctors/tn7Gq/Dr-Imtiaz-Bajwa-Urologist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Urologist/Dr-Imtiaz-Bajwa');});
app.get('/doctors/5Dzo0/Dr-Ramzan-Urologist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Urologist/Dr-Ramzan');});
app.get('/doctors/TfeMF/Dr-Salman-Urologist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Urologist/Dr-Salman');});
app.get('/doctors/gVC0L/Dr-Ramzan-Chohdhary-Urologist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Urologist/Dr-Ramzan-Chohdhary');});
app.get('/doctors/FcdZl/Dr-Saleem-Akhtar-Urologist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Urologist/Dr-Saleem-Akhtar');});
app.get('/doctors/SbJpV/Dr-Junaid-Habib-Khan-Urologist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Urologist/Dr-Junaid-Habib-Khan');});
app.get('/doctors/V6MMF/Dr-Farooq-Hameed-Urologist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Urologist/Dr-Farooq-Hameed');});
app.get('/doctors/vEv8V/Dr-Naveed-Iqbal-Urologist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Urologist/Dr-Naveed-Iqbal');});
app.get('/doctors/bIStG/Dr-Manzoor-Ahmad-ENTphysician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/ENT-physician/Dr-Manzoor-Ahmad');});
app.get('/doctors/hoNeI/Dr-Mohammad-Illyas-ENTphysician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/ENT-physician/Dr-Mohammad-Illyas');});
app.get('/doctors/nZ4xs/Dr-Arshad-Chohan-ENTphysician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/ENT-physician/Dr-Arshad-Chohan');});
app.get('/doctors/4mQVp/Dr-Farina-Latif-ENTphysician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/ENT-physician/Dr-Farina-Latif');});
app.get('/doctors/5p0U6/Dr-Faisal-Rafiq-ENTphysician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/ENT-physician/Dr-Faisal-Rafiq');});
app.get('/doctors/aeteT/Dr-Muhammad-Amjad-ENTphysician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/ENT-physician/Dr-Muhammad-Amjad');});
app.get('/doctors/95lsM/Dr-Bakht-Aziz-ENTphysician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/ENT-physician/Dr-Bakht-Aziz');});
app.get('/doctors/NsUUi/Dr-Khursheed-Anwar-Mian-ENTphysician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/ENT-physician/Dr-Khursheed-Anwar-Mian');});
app.get('/doctors/XUw33/Dr-Muhammad-Adeel-ENTphysician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/ENT-physician/Dr-Muhammad-Adeel');});
app.get('/doctors/aqUnx/Dr-Qazi-ENTphysician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/ENT-physician/Dr-Qazi');});
app.get('/doctors/Nu18e/Dr-Khurshid-Alam-ENTphysician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/ENT-physician/Dr-Khurshid-Alam');});
app.get('/doctors/Bajql/Dr-Prof-Brig-Zubair-Ahmed-ENTphysician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/ENT-physician/Dr-Prof-Brig-Zubair-Ahmed');});
app.get('/doctors/OuIeL/Dr-Muhammad-Riaz-Ch-ENTphysician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/ENT-physician/Dr-Muhammad-Riaz-Ch');});
app.get('/doctors/LNjPg/Dr-Asif-Manzoor-ENTphysician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/ENT-physician/Dr-Asif-Manzoor');});
app.get('/doctors/syHNb/Dr-Mateen-Amir-Eyespecialist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Eyes-pecialist/Dr-Mateen-Amir');});
app.get('/doctors/7DoT7/Dr-Muhammad-Iqbal-Eyespecialist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Eyes-pecialist/Dr-Muhammad-Iqbal');});
app.get('/doctors/QEPBg/Dr-Zahid-Choudry-Eyespecialist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Eyes-pecialist/Dr-Zahid-Choudry');});
app.get('/doctors/Ekgyp/Dr-Khalid-Mahmood-Eyespecialist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Eyes-pecialist/Dr-Khalid-Mahmood');});
app.get('/doctors/4k29j/Dr-Mujahid-Raza-Eyespecialist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Eyes-pecialist/Dr-Mujahid-Raza');});
app.get('/doctors/NCq8G/Dr-Muhammad-Akram-Eyespecialist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Eyes-pecialist/Dr-Muhammad-Akram');});
app.get('/doctors/aYA39/Dr-Rizwan-Ahmad-Ch-Eyespecialist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Eyes-pecialist/Dr-Rizwan-Ahmad-Ch');});
app.get('/doctors/ytYqq/Dr-Qamar-Ul-Islam-Lodhi-Eyespecialist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Eyes-pecialist/Dr-Qamar-Ul-Islam-Lodhi');});
app.get('/doctors/YhFMo/Dr-Nadeem-Riaz-Eyespecialist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Eyes-pecialist/Dr-Nadeem-Riaz');});
app.get('/doctors/RkD7W/Dr-Abdul-Hameed-Eyespecialist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Eyes-pecialist/Dr-Abdul-Hameed');});
app.get('/doctors/Kv3k2/Dr-Intazar-Hussain-Butt-Eyespecialist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Eyes-pecialist/Dr-Intazar-Hussain-Butt');});
app.get('/doctors/7OyEW/Dr-Maqbool-Ashraf-Eyespecialist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Eyes-pecialist/Dr-Maqbool-Ashraf');});
app.get('/doctors/i4TLA/Dr-Nadeem-Hafeez-Butt-Eyespecialist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Eyes-pecialist/Dr-Nadeem-Hafeez-Butt');});
app.get('/doctors/LFCgt/Dr-Asif-Mehmood-Eyespecialist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Eyes-pecialist/Dr-Asif-Mehmood');});
app.get('/doctors/7WFRy/Dr-Khawaja-Khalid-Shoaib-Eyespecialist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Eyes-pecialist/Dr-Khawaja-Khalid-Shoaib');});
app.get('/doctors/Q6UZf/Dr-Abid-Butt-Sahab-Eyespecialist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Eyes-pecialist/Dr-Abid-Butt-Sahab');});
app.get('/doctors/Tum6F/Dr-Waleed-Eyespecialist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Eyes-pecialist/Dr-Waleed');});
app.get('/doctors/Gg5QJ/Dr-Khalid-Mahmood-Najmi-Eyespecialist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Eyes-pecialist/Dr-Khalid-Mahmood-Najmi');});
app.get('/doctors/ZHq7G/Dr-Ijaz-Siddiqui-Eyespecialist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Eyes-pecialist/Dr-Ijaz-Siddiqui');});
app.get('/doctors/HDaxD/Dr-Qasim-Latif-Eyespecialist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Eyes-pecialist/Dr-Qasim-Latif');});
app.get('/doctors/kuQBc/Dr-Naeem-Rustam-Eyespecialist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Eyes-pecialist/Dr-Naeem-Rustam');});
app.get('/doctors/gKnGG/Dr-Asad-Rehman-Eyespecialist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Eyes-pecialist/Dr-Asad-Rehman');});
app.get('/doctors/TWtbs/Dr-Sofia-Lateef-Chaudhry-Eyespecialist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Eyes-pecialist/Dr-Sofia-Lateef-Chaudhry');});
app.get('/doctors/X3R5y/Dr-Umair-Abu-Bakar-Siddiuqe-OrthopedicPhysician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Orthopedic-Physician/Dr-Umair-Abu-Bakar-Siddiuqe');});
app.get('/doctors/0jsWZ/Dr-Kamran-Butt-OrthopedicPhysician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Orthopedic-Physician/Dr-Umair-Abu-Bakar-Siddiuqe');});
app.get('/doctors/3pVbc/Dr-Atiq-Durrani-OrthopedicPhysician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Orthopedic-Physician/Dr-Atiq-Durrani');});
app.get('/doctors/POCDh/Dr-Rashid-Saeed-OrthopedicPhysician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Orthopedic-Physician/Dr-Rashid-Saeed');});
app.get('/doctors/CRNnX/Dr-Abdullah-Shah-OrthopedicPhysician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Orthopedic-Physician/Dr-Abdullah-Shah');});
app.get('/doctors/vvouP/Dr-Prof-Amer-Aziz-OrthopedicPhysician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Orthopedic-Physician/Dr-Prof-Amer-Aziz');});
app.get('/doctors/DgbNx/Dr-Mazhar-Iqbal-Chaudhry-OrthopedicPhysician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Orthopedic-Physician/Dr-Mazhar-Iqbal-Chaudhry');});
app.get('/doctors/wm2sU/Dr-Naseer-Mehmood-Akhtar-OrthopedicPhysician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Orthopedic-Physician/Dr-Naseer-Mehmood-Akhtar');});
app.get('/doctors/w6NPQ/Dr-Shafqat-Waseem-Chaudhry-OrthopedicPhysician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Orthopedic-Physician/Dr-Shafqat-Waseem');});
app.get('/doctors/lKJl6/Dr-Shoaib-Anwar-OrthopedicPhysician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Orthopedic-Physician/Dr-Shoaib-Anwar');});
app.get('/doctors/vW3Zy/Dr-Faisal-Qamar-OrthopedicPhysician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Orthopedic-Physician/Dr-Faisal-Qamar');});
app.get('/doctors/cBR15/Dr-Imran-Saleem-Malik-OrthopedicPhysician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Orthopedic-Physician/Dr-Imran-Saleem-Malik');});
app.get('/doctors/bGl0Q/Dr-Zahid-H-Malik-OrthopedicPhysician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Orthopedic-Physician/Dr-Zahid-H-Malik');});
app.get('/doctors/Yy9VI/Dr-Naseer-Akhter-OrthopedicPhysician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Orthopedic-Physician/Dr-Naseer-Akhter');});
app.get('/doctors/8Uw5O/Dr-Asif-Ali-Shah-OrthopedicPhysician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Orthopedic-Physician/Dr-Asif-Ali-Shah');});
app.get('/doctors/VGws6/Dr-Imran-Manzoor-OrthopedicPhysician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Orthopedic-Physician/Dr-Imran-Manzoor');});
app.get('/doctors/ebmyT/Dr-Maqsood-Ahmad-OrthopedicPhysician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Orthopedic-Physician/Dr-Maqsood-Ahmad');});
app.get('/doctors/TWR49/Dr-Faheem-Saeed-NeuroPhysician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Neuro-Physician/Dr-Faheem-Saeed');});
app.get('/doctors/hViVp/Dr-Muhammad-Athar-Javed-NeuroPhysician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Neuro-Physician/Dr-Muhammad-Athar-Javed');});
app.get('/doctors/jcCLc/Dr-Shahid-Mukhtar-NeuroPhysician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Neuro-Physician/Dr-Shahid-Mukhtar');});
app.get('/doctors/WMQhK/Dr-Abubakar-Siddique-NeuroPhysician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Neuro-Physician/Dr-Abubakar-Siddique');});
app.get('/doctors/G93QY/Dr-Rashid-Imran-NeuroPhysician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Neuro-Physician/Dr-Rashid-Imran');});
app.get('/doctors/9b0zB/Dr-Khadija-Irfan-Endocrinologist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Endocrinologist/Dr-Khadija-Irfan');});
app.get('/doctors/8mVoP/Dr-Mian-Muzaffar-Mehdi-Endocrinologist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Endocrinologist/Dr-Mian-Muzaffar-Mehdi');});
app.get('/doctors/kTUcM/Dr-Taeed-Ahmed-Butt-Endocrinologist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Endocrinologist/Dr-Taeed-Ahmed-Butt');});
app.get('/doctors/KmBvC/Dr-Zaar-Endocrinologist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Endocrinologist/Dr-Zaar');});
app.get('/doctors/DdtUw/Dr-Awais-Masood-Endocrinologist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Endocrinologist/Dr-Awais-Masood');});
app.get('/doctors/D6ym2/Dr-Munir-Ahmad-Khan-Psychiatrist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Psychiatrist/Dr-Munir-Ahmad-Khan');});
app.get('/doctors/Idb4S/Dr-Muhammad-Ismail-Tariq-Psychiatrist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Psychiatrist/Dr-Muhammad-Ismail-Tariq');});
app.get('/doctors/SaYjM/Dr-Muratib-Ali-BreastSurgery-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Breast-Surgery/Dr-Muratib-Ali');});
app.get('/doctors/qTTzV/Dr-Mansab-BreastSurgery-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Breast-Surgery/Dr-Mansab');});
app.get('/doctors/XN99t/Dr-Afsar-Ali-Bhatti-BreastSurgery-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Breast-Surgery/Dr-Afsar-Ali-Bhatti');});
app.get('/doctors/hNVGw/Dr-Amjad-Shahbaz-Khan-Durrani-CancerSpecialist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Cancer-Specialist/Dr-Amjad-Shahbaz-Khan-Durrani');});
app.get('/doctors/MxN5p/Dr-Rehan-Abdullah-CancerSpecialist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Cancer-Specialist/Dr-Rehan-Abdullah');});
app.get('/doctors/zlJWG/Dr-Prof-Ghulam-Sarwar-CancerSpecialist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Cancer-Specialist/Dr-Prof-Ghulam-Sarwar');});
app.get('/doctors/QMbMS/Dr-Muhammad-Haris-Khan-Psychiatrist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Psychiatrist/Dr-Muhammad-Haris-Khan');});
app.get('/doctors/PF7qt/Dr-Mazhar-Ali-Shah-CancerSpecialist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Cancer-Specialist/Dr-Mazhar-Ali-Shah');});
app.get('/doctors/hA16O/Dr-Neelam-CancerSpecialist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Cancer-Specialist/Dr-Neelam');});
app.get('/doctors/48wXc/Dr-Umm-e-Kalsoom-CancerSpecialist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Cancer-Specialist/Dr-Umm-e-Kalsoom');});
app.get('/doctors/RNhCa/Dr-Shahid-Hameed-CancerSpecialist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Cancer-Specialist/Dr-Shahid-Hameed');});
app.get('/doctors/7GR2m/Dr-Imtiaz-Randhawa-CancerSpecialist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Cancer-Specialist/Dr-Imtiaz-Randhawa');});
app.get('/doctors/czG3H/Dr-Mohammad-Ali-Sheikh-Pediatrician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Pediatrician/Dr-Mohammad-Ali-Sheikh');});
app.get('/doctors/aIiIH/Dr-Mohammad-Nasir-Rana-Pediatrician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Pediatrician/Dr-Mohammad-Nasir-Rana');});
app.get('/doctors/75PYB/Dr-Nadeem-Saqib-Pediatrician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Pediatrician/Dr-Nadeem-Saqib');});
app.get('/doctors/pkSH6/Dr-Rasheed-Khawar-Pediatrician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Pediatrician/Dr-Rasheed-Khawar');});
app.get('/doctors/4cFrO/Dr-Khalid-Pervaiz-Pediatrician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Pediatrician/Dr-Khalid-Pervaiz');});
app.get('/doctors/CgL5A/Dr-Mansoor-Ahmed-Mazari-CancerSpecialist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Cancer-Specialist/Dr-Mansoor-Ahmed-Mazari');});
app.get('/doctors/9fTTm/Dr-Nadeem-Zia-CancerSpecialist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Cancer-Specialist/Dr-Nadeem-Zia');});
app.get('/doctors/HVGRW/Dr-Mohammad-Mohsin-Acupuncture-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Acupuncture/Dr-Mohammad-Mohsin');});
app.get('/doctors/z8XsC/Dr-Saulat-Ullah-Khan-ChestSpecialist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Chest-Specialist/Dr-Saulat-Ullah-Khan');});
app.get('/doctors/gaSL0/Dr-Talha-Mahmud-Pulmonologist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Pulmonologist/Dr-Talha-Mahmud');});
app.get('/doctors/qDyyl/Dr-Faria-Asad-Dermatologist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Dermatologist/Dr-Faria-Asad');});
app.get('/doctors/rr4M7/Dr-Naeem-Ahmad-Baig-Dentist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Dentist/Dr-Naeem-Ahmad-Baig');});
app.get('/doctors/bG45d/Dr-Saad-Naveed-Dentist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Dentist/Dr-Saad-Naveed');});
app.get('/doctors/fdfMC/Dr-Abdul-Hameed-Suleman-GeneralPhysician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/General-Physician/Dr-Abdul-Hameed-Suleman');});
app.get('/doctors/lwjzj/Dr-Ata-Ur-Rehman-PhysicalTherapy-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Physical-Therapy/Dr-Ata-Ur-Rehman');});
app.get('/doctors/fbUXq/Dr-Mirza-Kaleem-Ahmed-Baig-PhysicalTherapy-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Physical-Therapy/Dr-Mirza-Kaleem-Ahmed-Baig');});
app.get('/doctors/QuFQA/Dr-Khalida-Ilyas-PhysicalTherapy-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Physical-Therapy/Dr-Khalida-Ilyas');});
app.get('/doctors/lhfmr/Dr-M-Waqar-Afzal-PhysicalTherapy-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Physical-Therapy/Dr-M-Waqar-Afzal');});
app.get('/doctors/dLodD/Dr-Khurram-Sarfraz-PhysicalTherapy-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Physical-Therapy/Dr-Khurram-Sarfraz');});
app.get('/doctors/tQ9aa/Dr-Waseem-Sarwar-PhysicalTherapy-Lahore', (req, res, next) => {res.redirect(301, ' https:hayaat.pk/doctors/Lahore/Physical-Therapy/Dr-Waseem-Sarwar');});
app.get('/doctors/Ut5oE/Dr-Kazim-Dermatologist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Dermatologist/Dr-Kazim');});
app.get('/doctors/Rdpl8/Dr-Saira-Younas-Dentist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Dentist/Dr-Saira');});
app.get('/doctors/4VQgR/Dr-Anjum-Rana-Cardiologist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Cardiologist/Dr-Anjum-Rana');});
app.get('/doctors/V6OIm/Dr-Mushtaq-Ahmad-Anesthesiology-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Anesthesiology/Dr-Mushtaq-Ahmad');});
app.get('/doctors/SVerk/Dr-Maj-Anjum-Saleem-GeneralPhysician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/General-Physician/Dr-Maj-Anjum-Saleem');});
app.get('/doctors/q6XO2/Dr-Tariq-Mehmood-Chishti-GeneralPhysician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/General-Physician/Dr-Tariq-Mehmood-Chishti');});
app.get('/doctors/YmDsx/Dr-Omer-Rasheed-GeneralPhysician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/General-Physician/Dr-Omer-Rasheed');});
app.get('/doctors/bsEPP/Dr-Zaheer-Akhter-Malik-GeneralPhysician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/General-Physician/Dr-Zaheer-Akhter-Malik');});
app.get('/doctors/lzvdL/Dr-Zain-ul-Abideen-GeneralPhysician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/General-Physician/Dr-Zain-ul-Abideen');});
app.get('/doctors/C2kCB/Dr-Zahid-Saleem-GeneralPhysician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/General-Physician/Dr-Zahid-Saleem');});
app.get('/doctors/VjX1j/Dr-Abdul-Hafeez-Gastroenterologist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Gastroenterologist/Dr-Abdul-Hafeez');});
app.get('/doctors/cTtWn/Dr-Syed-Asif-Raza-Shah-Gastroenterologist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Gastroenterologist/Dr-Syed-Asif-Raza-Shah');});
app.get('/doctors/ylRGa/Dr-Faisal-Urologist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Urologist/Dr-Faisal');});
app.get('/doctors/fP7nQ/Dr-Farooq-Ahmed-Urologist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Urologist/Dr-Farooq-Ahmed');});
app.get('/doctors/HHxBB/Dr-Sabir-Ali-Urologist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Urologist/Dr-Sabir-Ali');});
app.get('/doctors/Z23MX/Dr-Hafiz-Shahzad-Ashraf-Urologist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Urologist/Dr-Hafiz-Shahzad-Ashraf');});
app.get('/doctors/i8mSF/Dr-Abdul-Mannan-Urologist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Urologist/Dr-Abdul-Mannan');});
app.get('/doctors/9VW8v/Dr-Wajid-Ali-Urologist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Urologist/Dr-Wajid-Ali');});
app.get('/doctors/fmNtx/Dr-Shokat-Mohammad-Zubair-Urologist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Urologist/Dr-Shokat-Mohammad-Zubair');});
app.get('/doctors/gBcBQ/Dr-Sayyad-Ahmad-Shakeel-ENTphysician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/ENT-physician/Dr-Sayyad-Ahmad-Shakeel');});
app.get('/doctors/WWJlT/Dr-Imran-Saeed-ENTphysician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/ENT-physician/Dr-Imran-Saeed');});
app.get('/doctors/DZtmi/Dr-Sabeeh-ENTphysician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/ENT-physician/Dr-Sabeeh');});
app.get('/doctors/qCwhG/Dr-Farrah-Eyespecialist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Eyes-pecialist/Dr-Farrah');});
app.get('/doctors/ojmj3/Dr-Rashid-Nawaz-Eyespecialist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Eyes-pecialist/Dr-Rashid-Nawaz');});
app.get('/doctors/yXLnY/Dr-Shubana-Chodhary-Eyespecialist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Eyes-pecialist/Dr-Shubana-Chodhary');});
app.get('/doctors/rnfkF/Dr-Zubair-Kaleem-Eyespecialist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Eyes-pecialist/Dr-Zubair-Kaleem');});
app.get('/doctors/gSX9C/Dr-Sohail-Arif-OrthopedicPhysician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Orthopedic-Physician/Dr-Sohail-Arif');});
app.get('/doctors/i1Tae/Dr-Ahmad-Masood-OrthopedicPhysician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Orthopedic-Physician/Dr-Ahmad-Masood');});
app.get('/doctors/dRyKb/Dr-Waqas-Saleem-Farooki-OrthopedicPhysician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Orthopedic-Physician/Dr-Waqas-Saleem-Farooki');});
app.get('/doctors/4k4IP/Dr-Khalid-Kazmii-OrthopedicPhysician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Orthopedic-Physician/Dr-Khalid-Kazmii');});
app.get('/doctors/vI46S/Dr-Irfan-Hamed-OrthopedicPhysician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Orthopedic-Physician/Dr-Irfan-Hamed');});
app.get('/doctors/xYkhe/Dr-Noman-Naseer-OrthopedicPhysician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Orthopedic-Physician/Dr-Noman-Naseer');});
app.get('/doctors/ezFJq/Dr-Javaid-Habib-OrthopedicPhysician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Orthopedic-Physician/Dr-Javaid-Habib');});
app.get('/doctors/Yhfu5/Dr-Tehsin-Riaz-OrthopedicPhysician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Orthopedic-Physician/Dr-Tehsin-Riaz');});
app.get('/doctors/8muja/Dr-Mohsin-Zaheer-NeuroPhysician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Neuro-Physician/Dr-Mohsin-Zaheer');});
app.get('/doctors/SycB6/Dr-Humayun-Iqbal-Khan-Pediatrician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Pediatrician/Dr-Humayun-Iqbal-Khan');});
app.get('/doctors/pHyXk/Dr-Mohammad-Zia-Ul-Miraj-Ahmad-Pediatrician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Pediatrician/Dr-Mohammad-Zia-Ul-Miraj-Ahmad');});
app.get('/doctors/ZO25r/Dr-Sajjad-Rafique-Pediatrician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Pediatrician/Dr-Sajjad-Rafique');});
app.get('/doctors/IP7za/Dr-Rasid-Ayub-Pediatrician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Pediatrician/Dr-Rasid-Ayub');});
app.get('/doctors/cWGbR/Dr-Syed-Arshad-Abbas-Zaidi-Pediatrician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Pediatrician/Dr-Syed-Arshad-Abbas-Zaidi');});
app.get('/doctors/H4Rmo/Dr-Mohammad-Afzal-Hayyat-Pediatrician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Pediatrician/Dr-Mohammad-Afzal');});
app.get('/doctors/iflw1/Dr-Tausif-Ahmad-Leghari-Pediatrician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Pediatrician/Dr-Tausif-Ahmad-Leghari');});
app.get('/doctors/kAkuX/Dr-Muneeb-ChestSpecialist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Chest-Specialist/Dr-Muneeb');});
app.get('/doctors/vY9B2/Dr-Shamshad-Rasool-Awan-Pulmonologist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Pulmonologist/Dr-Shamshad-Rasool-Awan');});
app.get('/doctors/pxDDl/Dr-Ruidong-Zhang-PhysicalTherapy-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Physical-Therapy/Dr-Ruidong-Zhang');});
app.get('/doctors/BLPhr/Dr-Atoofa-Chudhary-PhysicalTherapy-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Physical-Therapy/Dr-Atoofa-Chudhary');});
app.get('/doctors/BIbhB/Dr-Iffat-PhysicalTherapy-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Physical-Therapy/Dr-Iffat');});
app.get('/doctors/eJM1Y/Dr-Mohsin-PhysicalTherapy-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Physical-Therapy/Dr-Mohsin');});
app.get('/doctors/dCaw5/Dr-Mohammad-Zafar-PhysicalTherapy-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Physical-Therapy/Dr-Mohammad-Zafar');});
app.get('/doctors/3bLjp/Dr-Sajid-PhysicalTherapy-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Physical-Therapy/Dr-Sajid');});
app.get('/doctors/JrdfJ/Dr-Haseeb-Dentist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Dentist/Dr-Haseeb');});
app.get('/doctors/EVXh5/Dr-Maryam-Rafat-Dermatologist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Dermatologist/Dr-Maryam-Rafat');});
app.get('/doctors/wuOe8/Dr-Samina-Siddique-Gynecologist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Gynecologist/Dr-Samina-Siddique');});
app.get('/doctors/7DFSq/Dr-Salman-Javed-Gastroenterologist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Gastroenterologist/Dr-Salman-Javed');});
app.get('/Dr-Safdar-Ali-Khan-OrthopedicPhysician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Orthopedic-Physician/Dr-Safdar-Ali-Khan');});
app.get('/doctors/1H3bD/Dr-Asifa-Abbas-Gynecologist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Gynecologist/Dr-Asifa-Abbas');});
app.get('/doctors/KWLNc/Dr-Bushra-Saeed-Gynecologist-Lahore ',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Gynecologist/Dr-Bushra-Saeed');});
app.get('/doctors/9PeJl/Dr-Col-Shahida-Arshad-Gynecologist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Gynecologist/Dr-Col-Shahida-Arshad');});
app.get('/doctors/tMPBT/Dr-Bilquis-Yusuf-Gynecologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Gynecologist/Dr-Bilquis-Yusuf');});
app.get('/doctors/2J1WX/Dr-Shahida-Khalid-Gynecologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Gynecologist/Dr-Shahida-Khalid');});
app.get('/doctors/HjDYp/Dr-Syeda-Rabia-Gynecologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Gynecologist/Dr-Syeda-Rabia');});
app.get('/doctors/Pq5ph/Dr-Shazia-Masheer-Gynecologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Gynecologist/Dr-Shazia-Masheer');});
app.get('/doctors/3v0ZD/Dr-Anjum-Afshan-Gynecologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Gynecologist/Dr-Anjum-Afshan');});
app.get('/doctors/bJZGl/Dr-Asma-Safdar-Gynecologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Gynecologist/Dr-Asma-Safdar');});
app.get('/doctors/hxhlz/Dr-Kharunnisa-Karim-Gynecologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Gynecologist/Dr-Kharunnisa-Karim');});
app.get('/doctors/fhAQ6/Dr-Musarrat-Aga-Gynecologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Gynecologist/Dr-Musarrat-Aga');});
app.get('/doctors/odexA/Dr-Luna-Pereira-Gynecologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Gynecologist/Dr-Luna-Pereira');});
app.get('/doctors/oikxk/Dr-Zarka-Sheikh-Gynecologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Gynecologist/Dr-Zarka-Sheikh');});
app.get('/doctors/9Bi7s/Dr-Razia-Korejo-Gynecologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Gynecologist/Dr-Razia-Korejo');});
app.get('/doctors/qKskp/Dr-Farah-Naz-Gynecologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Gynecologist/Dr-Farah-Naz');});
app.get('/doctors/hxhGK/Dr-Uzma-Baqi-Gynecologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Gynecologist/Dr-Uzma-Baqi');});
app.get('/doctors/cfOj6/Dr-Tahira-Jabeen-Gynecologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Gynecologist/Dr-Tahira-Jabeen');});
app.get('/doctors/jRmQz/Dr-Nighat-Shah-Gynecologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Gynecologist/Dr-Nighat-Shah');});
app.get('/doctors/ADLDa/Dr-Urooj-Malik-Gynecologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Gynecologist/Dr-Urooj-Malik');});
app.get('/doctors/ZUmuz/Dr-Sareeka-Rathore-Gynecologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Gynecologist/Dr-Sareeka');});
app.get('/doctors/jIl83/Dr-Shazia-Mughal-Gynecologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Gynecologist/Dr-Shazia');});
app.get('/doctors/30Jn7/Dr-Aziza-Kapadia-Gynecologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Gynecologist/Dr-Aziza-Kapadia');});
app.get('/doctors/N2EVD/Dr-Zaheena-Shams-ul-Islam-Gynecologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Gynecologist/Dr-Zaheena-Shams-ul-Islam');});
app.get('/doctors/NBHsZ/Dr-Sumaira-Naz-Gynecologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Gynecologist/Dr-Sumaira-Naz');});
app.get('/doctors/4lvSs/Dr-Ghulam-Zainab-Gynecologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Gynecologist/Dr-Ghulam-Zainab');});
app.get('/doctors/tTIzj/Dr-Mehar-un-Nisa-Khursheed-Gynecologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Gynecologist/Dr-Mehar-un-Nisa-Khursheed');});
app.get('/doctors/tTIzj/Dr-Mehar-un-Nisa-Khursheed-Gynecologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Gynecologist/Dr-Rasheeda-Azmat');});
app.get('/doctors/ZPbpM/Dr-Azra-Ahsan-Gynecologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Gynecologist/Dr-Azra-Ahsan');});
app.get('/doctors/HKXLB/Dr-Sadiah-Ahsan-Pal-Gynecologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Gynecologist/Dr-Sadiah-Ahsan-Pal');});
app.get('/doctors/8h96c/Dr-Farah-Naz-Raza-Gynecologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Gynecologist/Dr-Farah-Naz-Raza');});
app.get('/doctors/Bb6P4/Dr-Rozina-Sikandar-Sultan-Ali-Gynecologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Gynecologist/Dr-Rozina-Sikandar-Sultan-Ali');});
app.get('/doctors/WGGxP/Dr-Rukhsana-Mughal-Gynecologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Gynecologist/Dr-Rukhsana-Mughal');});
app.get('/doctors/SIwK9/Dr-Nida-Najmi-Gynecologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Gynecologist/Dr-Nida-Najmi');});
app.get('/doctors/IdaX6/Dr-Iffat-Ahmed-Gynecologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Gynecologist/Dr-Iffat-Ahmed');});
app.get('/doctors/Jntes/Dr-Munazza-A-Khalid-Gynecologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Gynecologist/Dr-Munazza-A-Khalid');});
app.get('/doctors/5Jrvw/Dr-Nadeem-F-Zuberi-Gynecologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Gynecologist/Dr-Nadeem-F-Zuberi');});
app.get('/doctors/o4XBr/Dr-Shama-Munim-Gynecologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Gynecologist/Dr-Shama-Munim');});
app.get('/doctors/3rGSA/Dr-Saima-Ghayas-Gynecologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Gynecologist/Dr-Saima-Ghayas');});
app.get('/doctors/kGaSX/Dr-Nazli-Hussain-Gynecologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Gynecologist/Dr-Nazli-Hussain');});
app.get('/doctors/1Xxrk/Dr-Nasim-Asif-Gynecologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Gynecologist/Dr-Nasim-Asif');});
app.get('/doctors/mra05/Dr-Jawed-Dars-Psychiatrist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Psychiatrist/Dr-Jawed-Dars');});
app.get('/doctors/M02SC/Dr-Iqtidar-Taufiq-Psychiatrist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Psychiatrist/Dr-Iqtidar-Taufiq');});
app.get('/doctors/xaqe8/Dr-Nasir-Ali-Radiologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Radiologist/Dr-Nasir-Ali');});
app.get('/doctors/hA6fN/Dr-Aga-Ghulam-Mustafa-Urologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Urologist/Dr-Aga-Ghulam-Mustafa');});
app.get('/doctors/uc3Ug/Dr-M-Nasir-Sulaiman-Urologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Urologist/Dr-M-Nasir-Sulaiman');});
app.get('/doctors/wIZ4t/Dr-M-Hammad-Ather-Urologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Urologist/Dr-M-Hammad-Ather');});
app.get('/doctors/LWMrX/Dr-Ahmed-Fawad-Urologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Urologist/Dr-Ahmed-Fawad');});
app.get('/doctors/sL1cR/Dr-Aziz-Abdullah-Urologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Urologist/Dr-Aziz-Abdullah');});
app.get('/doctors/H5nzp/Dr-Mumtaz-Ud-Din-Haider-Urologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Urologist/Dr-Mumtaz-Ud-Din-Haider');});
app.get('/doctors/sL1cR/Dr-Aziz-Abdullah-Urologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Urologist/Dr-Aziz-Abdullah');});
app.get('/doctors/evcFZ/Dr-Naveed-Haroon-Urologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Urologist/Dr-Naveed-Haroon');});
app.get('/doctors/KlQYr/Dr-Atif-Javaid-Urologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Urologist/Dr-Atif-Javaid');});
app.get('/doctors/TTQZt/Dr-Mohammad-Aslam-Sofi-Urologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Urologist/Dr-Mohammad-Aslam-Sofi');});
app.get('/doctors/RI9Dn/Dr-Mohammad-Mansoor-Urologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Urologist/Dr-Mohammad-Mansoor');});
app.get('/doctors/VOmia/Dr-Tofail-Bawa-Urologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Urologist/Dr-Tofail-Bawa');});
app.get('/doctors/peuB9/Dr-Zeeshan-Arshad-Urologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Urologist/Dr-Zeeshan-Arshad');});
app.get('/doctors/9b55h/Dr-Shahnawaz-Urologist-Karachihttps',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Urologist/Dr-Shahnawaz');});
app.get('/doctors/tpY0n/Dr-Faiza-Imtiaz-Dentist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Dentist/Dr-Faiza-Imtiaz');});
app.get('/doctors/Sm9TI/Dr-Iffat-Naheed-Gynecologist-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Gynecologist/Dr-Iffat-Naheed');});
app.get('/doctors/JruvO/Dr-Shamim-Ara-Dermatologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Dermatologist/Dr-Shamim-Ara');});
app.get('/doctors/E54XG/Dr-Rabia-Ghafoor-Dermatologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Dermatologist/Dr-Rabia-Ghafoor');});
app.get('/doctors/pq3TA/Dr-Syeda-Shahmoona-Tirmizi-Dermatologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Dermatologist/Dr-Syeda-Shahmoona-Tirmiz');});
app.get('/doctors/8i45k/Dr-Najia-Ashraf-Dermatologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Dermatologist/Dr-Najia-Ashraf');});
app.get('/doctors/UMnxI/Dr-Parshoutum-Lal-Cardiologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Cardiologist/Dr-Parshoutum-Lal');});
app.get('/doctors/1G3b4/Dr-Abdul-Sattar-Shaikh-Cardiologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Cardiologist/Dr-Abdul-Sattar-Shaikh');});
app.get('/doctors/oo44H/Dr-Ahmed-Salman-Cardiologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Cardiologist/Dr-Ahmed-Salman');});
app.get('/doctors/hhC7e/Dr-Syed-Imran-Ahmad-Cardiologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Cardiologist/Dr-Syed-Imran-Ahmad');});
app.get('/doctors/Fwa3r/Dr-Abu-Bakar-Shaikh-Cardiologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Cardiologist/Dr-Abu-Bakar-Shaikh');});
app.get('/doctors/O61v5/Dr-Javed-Majid-Tai-Cardiologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Cardiologist/Dr-Javed-Majid-Tai');});
app.get('/doctors/e0pth/Dr-Khawar-Abbas-Kazmi-Cardiologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Cardiologist/Dr-Khawar-Abbas-Kazmi');});
app.get('/doctors/edmvR/Dr-Abid-Hussein-Laghari-Cardiologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Cardiologist/Dr-Abid-Hussein-Laghari');});
app.get('/doctors/OZAoZ/Dr-Mohammad-Nageeb-Basir-Cardiologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Cardiologist/Dr-Mohammad-Nageeb-Basir');});
app.get('/doctors/TSBKo/Dr-Mohammad-Ishaq-Cardiologist-Karachi ',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Cardiologist//Dr-Mohammad-Ishaq');});
app.get('/doctors/qJhc9/Dr-Mohammad-Nasir-Rahman-Cardiologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Cardiologist/Dr-Mohammad-Nasir-Rahman');});
app.get('/doctors/1Y5A6/Dr-Babar-Hasan-Cardiologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Cardiologist/Dr-Babar-Hasan');});
app.get('/doctors/yWAeb/Dr-Mehnaz-Atiq-Ahmed-Cardiologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Cardiologist/Dr-Mehnaz-Atiq-Ahmed');});
app.get('/doctors/ckIQo/Dr-Saleem-Akhtar-Cardiologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Cardiologist/Dr-Saleem-Akhta');});
app.get('/doctors/k3DrN/Dr-Abdul-Rehman-Cardiologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Cardiologist/Dr-Abdul-Rehman');});
app.get('/doctors/pSw51/Dr-Faisal-Memon-Cardiologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Cardiologist/Dr-Faisal-Memon');});
app.get('/doctors/ehbDk/Dr-Mansoor-Ahmed-Cardiologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Cardiologist/Dr-Mansoor-Ahmed');});
app.get('/doctors/VTDOY/Dr-Nadeem-Rizvi-Cardiologist-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/Cardiologist/Dr-Nadeem-Rizvi');});
app.get('/doctors/bjpZX/Dr-Marie-Andrades-GeneralPhysician-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/General-Physician/Dr-Marie-Andrades');});
app.get('/doctors/m95i9/Dr-Nayyar-ul-Islam-GeneralPhysician-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/General-Physician/Dr-Nayyar-ul-Islam');});
app.get('/doctors/wUrDR/Dr-Mehmood-Jilani-GeneralPhysician-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/General-Physician/Dr-Mehmood-Jilani');});
app.get('/doctors/unlNU/Dr-Imtiaz-Khalid-GeneralPhysician-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/General-Physician/Dr-Imtiaz-Khalid');});
app.get('/doctors/IThAf/Dr-Amanullah-Abbasi-GeneralPhysician-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/General-Physician/Dr-Amanullah-Abbasi');});
app.get('/doctors/JRyQW/Dr-Shahina-Shahab-GeneralPhysician-Karachi',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/General-Physician/Dr-Shahina-Shahab');});
app.get('/doctors/O6Uav/Dr-Bilal-Ahmad-Cardiologist-GeneralPhysician-PhysicalTherapy-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/General-Physician/Dr-Bilal-Ahmad');});
app.get('/doctors/S39Ax/Dr-Javaid-Iqbal-ENTphysician-Lahore',  (req, res, next) => {res.redirect(301, 'https://hayaat.pk/doctors/Lahore/ent-physician/Dr-Javaid-Iqbal');});

// Server redirects


// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render(join(DIST_FOLDER, 'browser', 'index.html'), { req });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});
