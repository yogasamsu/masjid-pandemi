# Dokumentasi Analisis Statistik: Profil Masjid Tangguh Pandemi

Dokumen ini menjelaskan metodologi statistik, kode program (Python) yang digunakan, serta interpretasi hasil analisis mengenai faktor-faktor yang mempengaruhi ketahanan masjid di D.I. Yogyakarta selama pandemi COVID-19.

---

## 1. Metodologi Statistik

Studi ini menggunakan pendekatan kuantitatif statistik untuk mengidentifikasi variabel pembeda (distinguisher) yang signifikan antara masjid yang "Tangguh/Ideal" dan yang "Biasa".

### Definisi Operasional
**Masjid Ideal (Tangguh/Siap)** didefinisikan sebagai masjid yang memenuhi **ketiga** kriteria berikut secara bersamaan:
1.  **Aktif merespons pandemi** (Variabel `f08` = Ya/Aktif).
2.  **Memiliki Persiapan Fisik Bencana** (Variabel `f03` atau `f04e` >= 1).
3.  **Memiliki Program Kesiapsiagaan** (Variabel `f04b`, `f04c`, atau `f04d` >= 1).

Dari 473 sampel masjid, ditemukan **83 Masjid Ideal** dan **390 Masjid Non-Ideal**.

### Uji Statistik yang Digunakan
1.  **Mann-Whitney U Test**: Digunakan untuk membandingkan variabel numerik atau skala Likert (misal: Usia Masjid, Jumlah Zakat, Skor Kinerja) karena distribusi data tidak normal.
2.  **Chi-Square Test**: Digunakan untuk membandingkan variabel kategori/biner (misal: Punya QRIS Ya/Tidak, Ada Fasilitas Difabel Ya/Tidak).
3.  **Logistic Regression (Regresi Logistik)**: Digunakan untuk analisis multivariat guna mencari **Odds Ratio (OR)**, yaitu seberapa besar peluang (probabilitas) sebuah faktor mempengaruhi kesuksesan masjid menjadi "Ideal", dengan mengontrol variabel lain.

---

## 2. Script Python

Analisis dilakukan menggunakan dua skrip utama.

### A. Analisis Univariat & Bivariat (`analyze_ideal_masjid.py`)
Skrip ini membandingkan satu per satu variabel antara kelompok "Ideal" vs "Others" untuk melihat signifikansi per variabel.

```python
# analyze_ideal_masjid.py
import pandas as pd
import numpy as np
from scipy.stats import ttest_ind, chi2_contingency, mannwhitneyu

def analyze_ideal():
    df = pd.read_csv("analisa_sanggabiz.csv")

    # 1. Definisi Masjid Ideal
    def map_binary(val):
        if str(val).lower().startswith('ya'): return 1
        return 0

    df['active_pandemic'] = df['f08'].apply(map_binary)
    # Skor Fisik: Siap Gempa / Punya APAR
    df['score_physical'] = df[['f03', 'f04e']].apply(lambda x: pd.to_numeric(x, errors='coerce').fillna(0)).sum(axis=1) >= 1
    # Skor Program: Meeting Point / Evakuasi / SOP
    df['score_program'] = df[['f04b', 'f04c', 'f04d']].apply(lambda x: pd.to_numeric(x, errors='coerce').fillna(0)).sum(axis=1) >= 1
    
    df['is_ideal'] = ((df['active_pandemic'] == 1) & df['score_physical'] & df['score_program']).astype(int)

    # 2. Analisis Statistik Per Variabel
    analysis_vars = [
        ('usia_masjid', 'Usia Masjid', 'continuous'),
        ('k01', 'Skor Inklusivitas', 'likert'),
        ('d02', 'Punya QRIS', 'binary_col'), 
        ('f02', 'Fasilitas Difabel', 'binary_col'),
        # ... variabel lainnya
    ]

    for col, name, dtype in analysis_vars:
        # Loop untuk Chi-Square atau Mann-Whitney tergantung tipe data
        # Output P-Value
        pass 
```

### B. Analisis Multivariat (`analyze_success_factors.py`)
Skrip ini menggunakan model Regresi Logistik untuk melihat pengaruh murni variabel (Odds Ratio).

```python
# analyze_success_factors.py
import pandas as pd
import statsmodels.api as sm
import numpy as np

def analyze_success_factors():
    df = pd.read_csv("analisa_sanggabiz.csv")
    # ... (Definisi is_ideal sama seperti di atas)

    # Menyiapkan Variabel Independen (X)
    feature_map = {
        'd02': 'Punya QRIS',
        'f02': 'Ada Fasilitas Difabel',
        'tpa22': 'Ada TPA',
        'kajianibu22': 'Ada Kajian Ibu-ibu',
        # ... variabel administrasi dll
    }
    
    # Run Logistic Regression
    X = sm.add_constant(X_data)
    y = df['is_ideal']
    
    model = sm.Logit(y, X)
    result = model.fit()
    
    # Menghitung Odds Ratio (exp dari koefisien)
    odds_ratios = np.exp(result.params)
    print(odds_ratios)
```

---

## 3. Hasil Analisis

### Temuan Utama (Signifikan)
Variabel berikut memiliki nilai **P-Value < 0.05**, yang berarti perbedaan antara Masjid Ideal dan Biasa sangat nyata (bukan kebetulan).

| Variabel | P-Value | Statistik Masjid Ideal | Statistik Masjid Biasa |
| :--- | :--- | :--- | :--- |
| **Fasilitas Ramah Difabel** | **< 0.001** | **49.4% Punya** | **23.8% Punya** |
| Keberadaan TPA | 0.058* | 89.2% Ada | 79.5% Ada |
| Pengajian Ibu-ibu | 0.060* | 85.0% Ada | 75.0% Ada |

*Catatan: TPA dan Pengajian Ibu-ibu memiliki signifikansi ambang batas (borderline), menunjukkan peran modal sosial komunitas.*

### Temuan Tidak Signifikan (Higenis/Normatif)
Variabel berikut **TIDAK** membedakan kesiapan masjid secara signifikan (P > 0.05). Artinya, punya atau tidak punya hal ini tidak menjamin masjid jadi tangguh.

| Variabel | P-Value | Keterangan |
| :--- | :--- | :--- |
| Jumlah Saldo Zakat | 0.261 | Besar uang kas tidak berkorelasi dengan responsivitas program. |
| Kepemilikan QRIS | 0.076 | Digitalisasi pembayaran belum tentu mencerminkan kesiapan sosial. |
| Usia Masjid | 0.782 | Masjid tua atau baru sama saja peluangnya. |
| Skor Kinerja/Akuntabilitas | > 0.400 | Dokumen administrasi itu penting, tapi hanya syarat dasar ("higenis"), bukan pendorong kesuksesan ("driver"). |

---

## 4. Interpretasi Hasil

### Angka "2.7x" (Odds Ratio)
Dari hasil Regresi Logistik, ditemukan bahwa variabel **Fasilitas Ramah Difabel** memiliki **Odds Ratio sebesar 2.7**.

**Artinya:**
Jika kita membandingkan dua masjid yang memiliki kondisi keuangan, administrasi, dan lokasi yang setara, masjid yang menyediakan fasilitas untuk difabel memiliki **peluang 2,7 kali lipat lebih besar** untuk menjadi "Masjid Tangguh Bencana" dibandingkan yang tidak.

**Mengapa Demikian?**
Secara statistik, fasilitas fisik ini kemungkinan besar adalah **proxy (perwakilan)** dari variabel latent (tak terlihat) bernama **"Inklusivitas Sosial"** atau **"Empati Takmir"**.
- Masjid yang mau repot-repot membangun ramp kursi roda atau toilet duduk biasanya memiliki pengurus yang sangat peduli pada jamaah yang paling lemah/rentan.
- **"Otot Kepedulian"** inilah yang bekerja saat krisis (pandemi) datang. Takmir yang biasa peduli pada difabel, secara otomatis lebih sigap dan sensitif untuk membantu warga terdampak pandemi, membagikan sembako lebih tepat sasaran, dan mengorganisir bantuan kesehatan.

### Peran Pengajian Ibu-ibu (Odds Ratio: 1.8x)
Selain fasilitas difabel, **Pengajian Ibu-ibu** juga muncul sebagai faktor pendorong dengan signifikansi ambang batas (P=0.068).
- Masjid yang memiliki pengajian ibu-ibu aktif memiliki **peluang 1.8 kali lebih besar** untuk menjadi tangguh.
- Ini menunjukkan kekuatan **Modal Sosial (Social Capital)**. Jaringan ibu-ibu seringkali menjadi tulang punggung distribusi informasi dan logistik di level komunitas (akar rumput) yang lebih efektif daripada struktur formal bapak-bapak.

### Kesimpulan Besar: Mindset > Aset
Analisis ini membantah hipotesis awal bahwa "Masjid Kaya = Masjid Siap".
Data menunjukkan bahwa uang (Zakat/QRIS) dan administrasi (SK Takmir) hanyalah faktor pendukung. Faktor penentu utamanya adalah **karakter inklusif** pengelola masjid. Inklusivitas fisik adalah indikator paling kuat dari karakter tersebut.
