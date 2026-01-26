import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from scipy.stats import chi2_contingency

def analyze_alignment():
    print("Loading data...")
    df = pd.read_csv("analisa_sanggabiz.csv")

    # --- Preprocessing (Recreating Variables) ---
    def map_binary(val):
        if str(val).lower().startswith('ya'): return 1
        if str(val).lower().startswith('tidak'): return 0
        return 0 # Treat NaN or others as 0 for strictness

    # 1. Tanggap Pandemi
    df['active_pandemic'] = df['f08'].apply(map_binary)

    # 2. Siap Bencana (Min 1 Fisik & 1 Program)
    df['ready_quake'] = df['f03'].apply(map_binary)
    df['has_apar'] = df['f04e'].apply(map_binary)
    df['has_meeting_point'] = df['f04b'].apply(map_binary)
    df['is_evac_site'] = df['f04c'].apply(map_binary)
    df['has_sop'] = df['f04d'].apply(map_binary)
    
    df['score_physical'] = df[['ready_quake', 'has_apar']].sum(axis=1)
    df['score_program'] = df[['has_meeting_point', 'is_evac_site', 'has_sop']].sum(axis=1)
    
    df['is_ready_disaster'] = ((df['score_physical'] >= 1) & (df['score_program'] >= 1)).astype(int)

    # --- Crosstab Analysis ---
    print("\n--- Crosstab: Pandemic (Rows) vs Disaster Readiness (Cols) ---")
    crosstab = pd.crosstab(df['active_pandemic'], df['is_ready_disaster'], margins=True)
    crosstab.index = ["Tidak Tanggap Pandemi", "Tanggap Pandemi", "Total"]
    crosstab.columns = ["Belum Siap Bencana", "Siap Bencana", "Total"]
    print(crosstab)

    # --- Statistical Test (Chi-Square) ---
    # Use raw crosstab without margins for test
    ct_test = pd.crosstab(df['active_pandemic'], df['is_ready_disaster'])
    chi2, p, dof, expected = chi2_contingency(ct_test)
    
    print(f"\nChi-Square Statistic: {chi2:.4f}")
    print(f"P-Value: {p:.6f}")
    
    if p < 0.05:
        print("=> SIGNIFICANT! Ada hubungan kuat antara Tanggap Pandemi dan Kesiapan Bencana.")
    else:
        print("=> NOT SIGNIFICANT. Tidak ada bukti bahwa masjid yang tanggap pandemi jg siap bencana.")

    # --- Correlation (Phi Coefficient) ---
    # Phi = sqrt(chi2 / n)
    phi = np.sqrt(chi2 / len(df))
    print(f"Phi Coefficient (Correlation Strength): {phi:.4f}")

    # --- Visualization (Stacked Bar / Mosaic) ---
    # Normalize to show % of Readiness within each Pandemic Group
    ct_norm = pd.crosstab(df['active_pandemic'], df['is_ready_disaster'], normalize='index') * 100
    
    plt.figure(figsize=(8, 6))
    ax = ct_norm.plot(kind='bar', stacked=True, color=['#d3d3d3', '#2ca02c'], rot=0)
    
    plt.title("Apakah 'Tanggap Pandemi' = 'Siap Bencana'?", fontsize=14)
    plt.xlabel("Status Tanggap Pandemi")
    plt.ylabel("Persentase Kesiapan Bencana (%)")
    plt.xticks([0, 1], ["Tidak Tanggap Pandemi", "Tanggap Pandemi"])
    plt.legend(["Belum Siap Bencana", "Siap Bencana"], loc='upper left', bbox_to_anchor=(1, 1))
    
    # Add labels
    for c in ax.containers:
        ax.bar_label(c, fmt='%.1f%%', label_type='center', color='black', weight='bold')

    plt.tight_layout()
    plt.savefig("alignment_chart.png")
    print("Saved alignment_chart.png")

    # --- New Visualization: 2x2 Matrix (Quadrant Style) ---
    print("Generating 2x2 Matrix...")
    
    # 0 = No, 1 = Yes
    # Crosstab order: [0, 0], [0, 1], [1, 0], [1, 1]
    # counts = crosstab (without margins)
    #               Not Ready (0)   Ready (1)
    # Not Active (0)    Q3             Q2
    # Active (1)        Q4             Q1
    
    counts = pd.crosstab(df['active_pandemic'], df['is_ready_disaster'])
    
    # Extract counts safely
    try:
        n_not_active_not_ready = counts.loc[0, 0]
    except: n_not_active_not_ready = 0
    
    try:
        n_not_active_ready = counts.loc[0, 1]
    except: n_not_active_ready = 0
    
    try:
        n_active_not_ready = counts.loc[1, 0]
    except: n_active_not_ready = 0
    
    try:
        n_active_ready = counts.loc[1, 1]
    except: n_active_ready = 0

    plt.figure(figsize=(10, 8))
    
    # Draw 4 Quadrants
    # X: 0-1 (Pandemic), Y: 0-1 (Disaster)
    # But we want to display it as boxes.
    
    # Define text and colors
    # Q1: Active & Ready (Top Right)
    plt.text(0.75, 0.75, f"IDEAL\n(Tanggap & Siap)\nn={n_active_ready}\n({n_active_ready/len(df)*100:.1f}%)", 
             ha='center', va='center', fontsize=14, weight='bold', color='green')
    
    # Q2: Not Active & Ready (Top Left)
    plt.text(0.25, 0.75, f"HANYA SIAP BENCANA\n(Tidak Tanggap Pandemi)\nn={n_not_active_ready}\n({n_not_active_ready/len(df)*100:.1f}%)", 
             ha='center', va='center', fontsize=12, weight='bold', color='blue')
             
    # Q3: Not Active & Not Ready (Bottom Left)
    plt.text(0.25, 0.25, f"BELUM SIAP APAPUN\nn={n_not_active_not_ready}\n({n_not_active_not_ready/len(df)*100:.1f}%)", 
             ha='center', va='center', fontsize=12, weight='bold', color='gray')
             
    # Q4: Active & Not Ready (Bottom Right)
    plt.text(0.75, 0.25, f"HANYA TANGGAP PANDEMI\n(Belum Siap Bencana)\nn={n_active_not_ready}\n({n_active_not_ready/len(df)*100:.1f}%)", 
             ha='center', va='center', fontsize=14, weight='bold', color='orange')

    # Draw dividers
    plt.axvline(x=0.5, color='black', linestyle='-', linewidth=2)
    plt.axhline(y=0.5, color='black', linestyle='-', linewidth=2)
    
    # Set aesthetics
    plt.xlim(0, 1)
    plt.ylim(0, 1)
    
    # Custom ticks
    plt.xticks([0.25, 0.75], [" TIDAK Tanggap Pandemi ", " TANGGAP Pandemi "], fontsize=12, weight='bold')
    plt.yticks([0.25, 0.75], [" BELUM Siap Bencana ", " SIAP Bencana "], fontsize=12, weight='bold', rotation=90, va='center')
    
    plt.title("Matriks Posisi Masjid: Pandemi vs Bencana", fontsize=16, pad=20)
    
    # Add colored backgrounds
    plt.axvspan(0.5, 1, 0.5, 1, color='#e6ffe6', alpha=0.3) # Top right green
    plt.axvspan(0, 0.5, 0.5, 1, color='#e6f2ff', alpha=0.3) # Top left blue
    plt.axvspan(0, 0.5, 0, 0.5, color='#f2f2f2', alpha=0.3) # Bot left gray
    plt.axvspan(0.5, 1, 0, 0.5, color='#fff2e6', alpha=0.3) # Bot right orange

    plt.tight_layout()
    plt.savefig("pandemic_vs_disaster_matrix.png")
    print("Saved pandemic_vs_disaster_matrix.png")

if __name__ == "__main__":
    analyze_alignment()
