import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from scipy.stats import ttest_ind, chi2_contingency, mannwhitneyu

def analyze_ideal():
    print("Loading data...")
    df = pd.read_csv("analisa_sanggabiz.csv")

    # --- 1. Define 'Ideal' vs 'Others' ---
    def map_binary(val):
        if str(val).lower().startswith('ya'): return 1
        if str(val).lower().startswith('tidak'): return 0
        return 0

    df['active_pandemic'] = df['f08'].apply(map_binary)

    # Readiness
    df['ready_quake'] = df['f03'].apply(map_binary)
    df['has_apar'] = df['f04e'].apply(map_binary)
    df['has_meeting_point'] = df['f04b'].apply(map_binary)
    df['is_evac_site'] = df['f04c'].apply(map_binary)
    df['has_sop'] = df['f04d'].apply(map_binary)
    
    df['score_physical'] = df[['ready_quake', 'has_apar']].sum(axis=1)
    df['score_program'] = df[['has_meeting_point', 'is_evac_site', 'has_sop']].sum(axis=1)
    
    # Ideal = Active Pandemic AND (Physical>=1 AND Program>=1)
    df['is_ideal'] = ((df['active_pandemic'] == 1) & (df['score_physical'] >= 1) & (df['score_program'] >= 1)).astype(int)
    
    print(f"Total Ideal Mosques: {df['is_ideal'].sum()}")
    print(f"Total Non-Ideal: {len(df) - df['is_ideal'].sum()}")

    # --- 2. Variable Mapping & Cleaning ---
    
    # Cleaning Helpers
    likert_map = {'Sangat Tidak Setuju': 1, 'Tidak Setuju': 2, 'Ragu-Ragu': 3, 'Setuju': 4, 'Sangat Setuju': 5}
    def map_likert(val): return likert_map.get(str(val).strip(), np.nan)
    
    # Variables to Analyze
    analysis_vars = [
        # (Column, Name, Type)
        ('usia_masjid', 'Usia Masjid', 'continuous'),
        ('jmlzakat', 'Jumlah Zakat', 'continuous'),
        ('k01', 'Skor Inklusivitas', 'likert'),
        ('k02', 'Skor Keadilan', 'likert'),
        ('k03', 'Skor Kinerja', 'likert'),
        ('k04', 'Skor Transparansi', 'likert'),
        ('k05', 'Skor Legitimasi', 'likert'),
        ('k06', 'Skor Akuntabilitas', 'likert'),
        ('b203', 'Usia Ketua Takmir', 'continuous'),
        ('d02', 'Punya QRIS', 'binary_col'), 
        ('f02', 'Fasilitas Difabel', 'binary_col'),
        ('tpa22', 'Ada TPA (2022)', 'binary_col'), # using tpa22 based on CSV inspection
        ('e09', 'Bangunan Bertingkat', 'binary_col'),
        ('c05', 'Kabupaten', 'categorical'),
        ('g01', 'Kapasitas', 'categorical'),
        ('b205', 'Pendidikan Takmir', 'categorical')
    ]
    
    # Clean specific coded columns
    # tpa22 is likely Yes/No string or coded. Check convert logic.
    # d02, f02, e09 are coded.
    clean_targets = ['d02', 'f02', 'tpa22', 'e09']
    for col in clean_targets:
        if col in df.columns:
            df[col] = df[col].astype(str).apply(lambda x: 1 if 'ya' in x.lower() else (0 if 'tidak' in x.lower() else np.nan))

    # Clean Likert
    rename_map = {'k01': 'inklusivitas', 'k02': 'keadilan', 'k03': 'kinerja', 
                  'k04': 'transparansi', 'k05': 'legitimasi', 'k06': 'akuntabil'} 
                  # Note: 'akuntabil' usually, check header. Header said 'akuntabil'.

    for k_code in ['k01','k02','k03','k04','k05','k06']:
        # If k_code not in df, try to find it via rename_map
        if k_code not in df.columns:
            # Check if value in rename_map exists
            mapped_name = rename_map.get(k_code)
            if mapped_name and mapped_name in df.columns:
                df[k_code] = df[mapped_name] # Restore to k_code for analysis loop
            else:
                print(f"Warning: {k_code} not found (mapped: {mapped_name})")
                continue
        
        # Now apply map
        df[k_code] = df[k_code].apply(map_likert)

    # --- 3. Statistical Loop ---
    significant_vars = []
    
    print("\n--- Statistical Analysis Results ---")
    for col, name, dtype in analysis_vars:
        if col not in df.columns:
            print(f"[skip] {name} ({col}) not found.")
            continue
            
        group_ideal = df[df['is_ideal'] == 1][col].dropna()
        group_others = df[df['is_ideal'] == 0][col].dropna()
        
        if len(group_ideal) < 5 or len(group_others) < 5:
            continue
            
        p_val = 1.0
        stat = 0
        test_name = ""
        
        if dtype == 'continuous' or dtype == 'likert':
            # T-Test (or Mann-Whitney better for limited samples/likert)
            stat, p_val = mannwhitneyu(group_ideal, group_others)
            test_name = "Mann-Whitney"
            avg_ideal = group_ideal.mean()
            avg_others = group_others.mean()
            diff = ((avg_ideal - avg_others) / avg_others) * 100 if avg_others != 0 else 0
            
            print(f"{name}: P={p_val:.4f} | Ideal={avg_ideal:.1f}, Others={avg_others:.1f} ({diff:+.1f}%)")
            
        elif dtype == 'binary_col' or dtype == 'categorical':
            # Chi Square
            ct = pd.crosstab(df['is_ideal'], df[col])
            if ct.size == 0: continue
            stat, p_val, dof, exp = chi2_contingency(ct)
            test_name = "Chi-Square"
            # Calculate % prevalence in Ideal vs Others
            # For binary: % of 1s
            if dtype == 'binary_col':
                prev_ideal = df[df['is_ideal']==1][col].mean() * 100
                prev_others = df[df['is_ideal']==0][col].mean() * 100
                print(f"{name}: P={p_val:.4f} | Ideal={prev_ideal:.1f}%, Others={prev_others:.1f}%")
            else:
                 print(f"{name}: P={p_val:.4f} (Categorical)")

        if p_val < 0.05:
            significant_vars.append({
                'name': name, 'p': p_val, 'type': dtype, 
                'col': col
            })
            print(f"   >>> SIGNIFICANT DISTINGUISHER! ({test_name})")

    # --- 4. Visualization of Significant Factors ---
    if significant_vars:
        print(f"\nplotting {len(significant_vars)} significant variables...")
        
        # Filter top 6 by p-value to avoid clutter
        significant_vars.sort(key=lambda x: x['p'])
        top_vars = significant_vars[:6]
        
        fig, axes = plt.subplots(nrows=len(top_vars), ncols=1, figsize=(8, 4 * len(top_vars)))
        if len(top_vars) == 1: axes = [axes]
        
        for i, var in enumerate(top_vars):
            col = var['col']
            dtype = var['type']
            ax = axes[i]
            
            if dtype in ['continuous', 'likert']:
                sns.boxplot(data=df, x='is_ideal', y=col, ax=ax, palette=['gray', 'green'])
                ax.set_xticklabels(['Others', 'Ideal Mosque'])
                ax.set_title(f"{var['name']} (P={var['p']:.4f})")
            else:
                # Bar chart of proportions
                ct = pd.crosstab(df[col], df['is_ideal'], normalize='columns') * 100
                ct.columns = ['Others', 'Ideal']
                ct.plot(kind='bar', ax=ax, color=['gray', 'green'])
                ax.set_ylabel("Percentage (%)")
                ax.set_title(f"{var['name']} Distribution (P={var['p']:.4f})")
                
        plt.tight_layout()
        plt.savefig("ideal_masjid_profile_v2.png")
        print("Saved ideal_masjid_profile_v2.png")
    else:
        print("\nNo statistically significant differences found to plot.")

if __name__ == "__main__":
    analyze_ideal()
