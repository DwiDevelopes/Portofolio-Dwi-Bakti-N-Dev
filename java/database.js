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

console.log('private-key.pem dan certificate.pem telah dibuat.');
