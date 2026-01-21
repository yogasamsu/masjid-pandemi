import pandas as pd
import numpy as np
import re

def decode_survey_data():
    input_file = "data masjid jogja_7Agustus2023_v9.csv"
    output_file = "analisa_sanggabiz.csv"

    print(f"Reading {input_file}...")
    df = pd.read_csv(input_file)

    # --- 1. Renaming Columns (Based on User Feedback & Stata Script) ---
    rename_map = {
        # Validated from olahan34-42_huda.do
        'j01a': 'zakat19', 'j01b': 'zakat20', 'j01c': 'zakat21', 'j01d': 'zakat22',
        'j02a': 'wakaf19', 'j02b': 'wakaf20', 'j02c': 'wakaf21', 'j02d': 'wakaf22',
        'j03': 'badaninfaq', 'j05a': 'simpanfilantropi', 'j05b': 'lembagasimpan',
        'j06aa': 'tpa19', 'j06ab': 'tpa20', 'j06ac': 'tpa21', 'j06ad': 'tpa22',
        'j07aa': 'kajianremaja19', 'j07ab': 'kajianremaja20', 'j07ac': 'kajianremaja21', 'j07ad': 'kajianremaja22',
        'j08': 'remajamasjid',
        'j09a': 'kajianbapak19', 'j09b': 'kajianbapak20', 'j09c': 'kajianbapak21', 'j09d': 'kajianbapak22',
        'j10a': 'kajianibu19', 'j10b': 'kajianibu20', 'j10c': 'kajianibu21', 'j10d': 'kajianibu22',
        'k01': 'inklusivitas', 'k02': 'keadilan', 'k03': 'kinerja', 'k04': 'transparansi',
        'k05': 'legitimasi', 'k06': 'akuntabil', 'k07': 'arah_kebijakan', 'k08': 'kapasitas',
        
        # Inferred from User Image & Questionnaire
        'b208': 'keputusan_infon',  # Decision on infrastructure
        'b209': 'keputusan_dakw', # Decision on dakwah
        'c12': 'media',
        'c13a': 'dokumen_peren',
        'c13b': 'dokumen_keuan',
        'c14': 'rekening',
        # 'h03bd' is the amount of zakat in 2022 (latest data)
        'h03bd': 'jmlzakat', 
        'f05': 'kriminal',
    }
    
    # Apply renames
    df.rename(columns=rename_map, inplace=True)

    # --- 2. Derived Columns ---
    
    # usia_masjid: 2023 - c04 (Year Built)
    def calculate_age(year_str):
        try:
            match = re.search(r'\d{4}', str(year_str))
            if match:
                year = int(match.group(0))
                if 1000 < year <= 2023:
                    return 2023 - year
            return np.nan
        except:
            return np.nan

    if 'c04' in df.columns:
        df['usia_masjid'] = df['c04'].apply(calculate_age)
    
    # --- 3. Value Decoding (Maps) ---
    
    yes_no_map = {1: 'Ya', 3: 'Tidak', 9: 'Tidak tahu/Tidak jawab'}
    sex_map = {1: 'Laki-laki', 3: 'Perempuan'}
    education_map = {1: 'Tidak Sekolah', 2: 'SD/Sederajat', 3: 'SMP/Sederajat', 4: 'SMA/Sederajat', 5: 'Diploma', 6: 'S1', 7: 'S2', 8: 'S3'}
    job_map = {1: 'Tidak bekerja', 2: 'Wiraswasta', 5: 'Pegawai', 10: 'PNS', 11: 'TNI/Polri', 12: 'Pensiunan', 13: 'Lainnya'}
    
    col_maps = {
        'b103': sex_map, 'b202': sex_map,
        'b105': education_map, 'b205': education_map,
        'c03': {1: 'Ya', 3: 'Tidak', 5: 'Tidak tahu'},
        'c08': {1: 'Wakaf', 3: 'Non Wakaf'},
        'd06': {1: 'Infak Jamaah', 2: 'Yayasan', 3: 'Donatur', 4: 'Usaha', 5: 'Lainnya'},
    }

    def clean_and_map(val, mapping):
        if isinstance(val, str):
            if val.replace('.','',1).isdigit():
                val = float(val)
            else:
                return val 
        try:
            if pd.isna(val): return val
            val_int = int(float(val))
            return mapping.get(val_int, val)
        except:
            return val

    # Apply Specific Maps
    for col, mapping in col_maps.items():
        if col in df.columns:
            df[col] = df[col].apply(lambda x: clean_and_map(x, mapping))

    # List of renamed columns that are Yes/No
    renamed_yes_no = [
        'zakat19', 'zakat20', 'zakat21', 'zakat22',
        'wakaf19', 'wakaf20', 'wakaf21', 'wakaf22',
        'simpanfilantropi', # j05a
        'tpa19', 'tpa20', 'tpa21', 'tpa22', # j06a
        'kajianremaja19', 'kajianremaja20', # j07a
        'remajamasjid', # j08
        'kajianbapak19', 'kajianbapak20', # j09a
        'kajianibu19', 'kajianibu20', # j10a
        'rekening', # c14
        'dokumen_peren', 'dokumen_keuan', # c13a, c13b
        'kriminal' # f05
    ]
    
    prefixes = ['c03', 'd01', 'd02', 'd05a', 'e06', 'e09', 'e11', 'f01', 'f02', 'f03', 'f04', 'f08', 
                'g03', 'g04', 'h01', 'h02a', 'h03a', 'h04a', 'h05', 'h06', 'i01', 'i02a']

    for col in renamed_yes_no:
        if col in df.columns:
            df[col] = df[col].apply(lambda x: clean_and_map(x, yes_no_map))
            
    for col in df.columns:
        is_target_prefix = any(col.startswith(p) for p in prefixes)
        if is_target_prefix:
             df[col] = df[col].apply(lambda x: clean_and_map(x, yes_no_map))

    print(f"Saving to {output_file}...")
    df.to_csv(output_file, index=False)
    print("Done.")

if __name__ == "__main__":
    decode_survey_data()
