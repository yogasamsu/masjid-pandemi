import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import statsmodels.api as sm

def analyze_success_factors():
    print("Loading data for Success Factor Analysis...")
    df = pd.read_csv("analisa_sanggabiz.csv")

    # --- 1. Define 'Ideal' Mosque ---
    def map_binary_std(val):
        s = str(val).lower()
        if 'ya' in s: return 1
        return 0

    # Target
    df['active_pandemic'] = df['f08'].apply(map_binary_std)
    
    # Readiness Scores
    df['ready_quake'] = df['f03'].apply(map_binary_std)
    df['has_apar'] = df['f04e'].apply(map_binary_std)
    df['has_meeting_point'] = df['f04b'].apply(map_binary_std)
    df['is_evac_site'] = df['f04c'].apply(map_binary_std)
    df['has_sop'] = df['f04d'].apply(map_binary_std)
    
    df['score_physical'] = df[['ready_quake', 'has_apar']].sum(axis=1)
    df['score_program'] = df[['has_meeting_point', 'is_evac_site', 'has_sop']].sum(axis=1)
    
    df['is_ideal'] = ((df['active_pandemic'] == 1) & (df['score_physical'] >= 1) & (df['score_program'] >= 1)).astype(int)
    
    # --- 2. Prepare Predictors (Features) ---
    # We want to know what DRIVES ideal-ness.
    # Candidates:
    # - Institutional: Planning Doc, Finance Doc, Bank Acct, SIMAS
    # - Community: TPA, Youth Org, Remaja Study, Mothers Study
    # - Digital: Media, QRIS
    # - Inclusivity: Difabel Facility (We know this is strong, include to control or verify)
    
    # Map all to 0/1
    feature_map = {
        'dokumen_peren': 'Punya Dokumen Perencanaan',
        'dokumen_keuan': 'Punya Dokumen Keuangan',
        'rekening': 'Punya Rekening Bank',
        'badaninfaq': 'Punya Badan Infaq',
        'media': 'Punya Media Komunikasi',
        'd02': 'Punya QRIS',
        'tpa22': 'Ada TPA (2022)',
        'remajamasjid': 'Ada Remaja Masjid',
        'kajianremaja22': 'Ada Kajian Remaja',
        'kajianibu22': 'Ada Kajian Ibu-ibu',
        'f02': 'Ada Fasilitas Difabel'
    }
    
    X_data = pd.DataFrame()
    
    def map_feature(col, val):
        s = str(val).lower()
        # Media Special Case: 9 = Tidak Punya
        if col == 'media':
            if '9' in s and '1' not in s and '2' not in s: return 0 
            return 1 if (len(s) > 0 and s != 'nan') else 0
            
        # Standard: Ya / Memiliki
        if 'ya' in s or 'memiliki' in s: return 1
        return 0

    print("\n--- Feature Distribution ---")
    for col, label in feature_map.items():
        if col not in df.columns:
            print(f"Warning: {col} not in columns.")
            continue
            
        # Clean
        X_data[col] = df[col].apply(lambda x: map_feature(col, x))
        
        # Check dist
        count = X_data[col].sum()
        pct = count / len(df) * 100
        print(f"{label}: {count} ({pct:.1f}%)")

    # Add features to dataset
    X = X_data.copy()
    y = df['is_ideal']
    
    # --- 2b. Drop Constant Columns (Zero Variance) ---
    # These cause Singular Matrix errors in Logit
    drop_cols = [c for c in X.columns if X[c].nunique() <= 1]
    if drop_cols:
        print(f"\nDROPPING CONSTANT COLUMNS: {drop_cols}")
        X = X.drop(columns=drop_cols)
    
    # Add Constant for Intercept
    X = sm.add_constant(X)
    
    # --- 3. Run Logistic Regression ---
    try:
        model = sm.Logit(y, X)
        result = model.fit()
        print(result.summary())
        
        # Extract Odds Ratios
        params = result.params
        conf = result.conf_int()
        conf['OR'] = params
        conf.columns = ['Lower CI', 'Upper CI', 'Odds Ratio']
        
        # Convert Log-Odds to Intepretable Odds Ratios
        odds_ratios = np.exp(conf)
        odds_ratios['P-Value'] = result.pvalues
        
        print("\n--- Odds Ratios (Significant Contributors) ---")
        significant_drivers = odds_ratios[odds_ratios['P-Value'] < 0.1].sort_values(by='Odds Ratio', ascending=False) # Borderline 0.1 allowed
        print(significant_drivers)
        
        # --- 4. Visualization: Forest Plot of Odds Ratios ---
        # Filter for plotting (remove constant)
        plot_data = odds_ratios.drop('const', errors='ignore')
        plot_data['Label'] = [feature_map.get(c, c) for c in plot_data.index]
        plot_data = plot_data.sort_values(by='Odds Ratio', ascending=True)
        
        plt.figure(figsize=(10, 8))
        
        # Calculate asymmetric errors for log scale or linear scale
        # lower_error = OR - exp(Lower CI)
        # upper_error = exp(Upper CI) - OR
        lower_error = plot_data['Odds Ratio'] - np.exp(conf.loc[plot_data.index, 'Lower CI'])
        upper_error = np.exp(conf.loc[plot_data.index, 'Upper CI']) - plot_data['Odds Ratio']
        
        errors = [lower_error, upper_error]
        
        plt.errorbar(plot_data['Odds Ratio'], plot_data['Label'], xerr=errors, fmt='o', color='blue', capsize=5)
        plt.axvline(x=1, color='red', linestyle='--') # No Effect Line
        plt.xlabel("Odds Ratio (Multiplier of Probability)")
        plt.title("Faktor Penentu 'Masjid Ideal' (Logistic Regression)\nOdds Ratio > 1 means Positive Impact")
        plt.grid(True, linestyle='--', alpha=0.5)
        
        # Annotate values
        for i, (idx, row) in enumerate(plot_data.iterrows()):
            or_val = row['Odds Ratio']
            p_val = row['P-Value']
            sig = "**" if p_val < 0.05 else ("*" if p_val < 0.1 else "")
            plt.text(or_val, i, f" {or_val:.2f}{sig}", va='center', fontsize=10)

        plt.tight_layout()
        plt.savefig("success_factors_forest_plot.png")
        print("Saved success_factors_forest_plot.png")
        
    except Exception as e:
        print(f"Regression Failed: {e}")

if __name__ == "__main__":
    analyze_success_factors()
