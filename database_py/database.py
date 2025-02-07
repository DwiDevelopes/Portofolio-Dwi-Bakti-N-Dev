from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives import hashes
from cryptography.x509 import CertificateBuilder
from cryptography.x509.oid import NameOID
import datetime

# Langkah 1: Buat Kunci Privat (private-key.pem)
private_key = rsa.generate_private_key(
    public_exponent=65537,
    key_size=2048,
)

# Simpan Kunci Privat ke file PEM
with open("private-key.pem", "wb") as private_key_file:
    private_key_file.write(
        private_key.private_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PrivateFormat.TraditionalOpenSSL,
            encryption_algorithm=serialization.NoEncryption()
        )
    )

# Langkah 2: Buat Sertifikat Self-Signed (certificate.pem)

# Tentukan Subjek Sertifikat (misalnya, nama domain, organisasi, dll)
subject = issuer = x509.Name([
    x509.NameAttribute(NameOID.COUNTRY_NAME, u"ID"),
    x509.NameAttribute(NameOID.STATE_OR_PROVINCE_NAME, u"DKI Jakarta"),
    x509.NameAttribute(NameOID.LOCALITY_NAME, u"Jakarta"),
    x509.NameAttribute(NameOID.ORGANIZATION_NAME, u"BangRoy.com"),
    x509.NameAttribute(NameOID.COMMON_NAME, u"www.Bang Roy.com"),
])

# Bangun sertifikat
certificate = CertificateBuilder(
    subject_name=subject,
    issuer_name=issuer,
    public_key=private_key.public_key(),
    serial_number=1000,
    not_valid_before=datetime.datetime.utcnow(),
    not_valid_after=datetime.datetime.utcnow() + datetime.timedelta(days=365),  # 1 tahun
    extensions=[],
).sign(private_key, hashes.SHA256())

# Simpan Sertifikat ke file PEM
with open("certificate.pem", "wb") as cert_file:
    cert_file.write(certificate.public_bytes(encoding=serialization.Encoding.PEM))

print("private-key.pem dan certificate.pem telah dibuat.")
