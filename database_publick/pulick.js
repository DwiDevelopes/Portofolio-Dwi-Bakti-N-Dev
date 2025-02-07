const forge = require('node-forge');
const fs = require('fs');

// Langkah 1: Buat Kunci Privat (private-key.pem)
const privateKey = forge.pki.rsa.generateKeyPair(2048);

// Simpan Kunci Privat ke file PEM
fs.writeFileSync('private-key.pem', forge.pki.privateKeyToPem(privateKey.privateKey));

// Langkah 2: Buat Sertifikat Self-Signed (certificate.pem)
const cert = forge.pki.createCertificate();
cert.publicKey = privateKey.publicKey;
cert.serialNumber = '01';
cert.validFrom = new Date();
cert.validTo = new Date();
cert.validTo.setFullYear(cert.validTo.getFullYear() + 1); // Berlaku 1 tahun

// Tentukan subjek dan penerbit sertifikat (self-signed)
const attrs = [
  { name: 'commonName', value: 'www.Royhtml.com' },
  { name: 'countryName', value: 'ID' },
  { name: 'stateOrProvinceName', value: 'DKI Jakarta' },
  { name: 'localityName', value: 'Jakarta' },
  { name: 'organizationName', value: 'Royhtml.com' },
  { shortName: 'OU', value: 'IT Department' },
  { name: 'emailAddress', value: 'dwigames17@gmail.com' }
];

cert.setSubject(attrs);
cert.setIssuer(attrs);

// Tandatangani sertifikat dengan kunci privat
cert.sign(privateKey.privateKey, forge.md.sha256.create());

// Simpan Sertifikat ke file PEM
fs.writeFileSync('certificate.pem', forge.pki.certificateToPem(cert));

// Langkah 3: Buat dan Simpan Public Key dalam Format X.509 dan PKCS#1
const publicKey = privateKey.publicKey;

// 1. Public Key dalam Format X.509
const publicKeyX509 = forge.pki.publicKeyToPem(publicKey);
fs.writeFileSync('public-key-x509.pem', publicKeyX509);

// 2. Public Key dalam Format PKCS#1
const publicKeyPKCS1 = forge.pki.publicKeyToPem(publicKey);
fs.writeFileSync('public-key-pkcs1.pem', publicKeyPKCS1);

console.log('private-key.pem, certificate.pem, public-key-x509.pem, dan public-key-pkcs1.pem telah dibuat.');
