import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import geopandas as gpd
import requests

def analyze_masjid_data():
    print("Loading data...")
    df = pd.read_csv("analisa_sanggabiz.csv")

    # --- Preprocessing ---
    # Rename 'Kabupaten' to 'SLEMAN' (Based on Godean finding)
    df['c05'] = df['c05'].replace({'Kabupaten': 'SLEMAN'})

    def map_binary(val):
        if str(val).lower().startswith('ya'): return 1
        if str(val).lower().startswith('tidak'): return 0
        return np.nan
        
    likert_map = {
        'Sangat Tidak Setuju': 1, 'Tidak Setuju': 2,
        'Ragu-Ragu': 3, 'Setuju': 4, 'Sangat Setuju': 5
    }
    def map_likert(val):
        return likert_map.get(str(val).strip(), np.nan)
    
    # Q1: Participation (f08)
    df['active_pandemic'] = df['f08'].apply(map_binary)
    
    # Q3/Q4: Scores (Max 2 Fisik, Max 3 Program)
    df['ready_quake'] = df['f03'].apply(map_binary)
    df['has_apar'] = df['f04e'].apply(map_binary)
    df['has_meeting_point'] = df['f04b'].apply(map_binary)
    df['is_evac_site'] = df['f04c'].apply(map_binary)
    df['has_sop'] = df['f04d'].apply(map_binary)
    
    df['score_physical'] = df[['ready_quake', 'has_apar']].fillna(0).sum(axis=1)
    df['score_program'] = df[['has_meeting_point', 'is_evac_site', 'has_sop']].fillna(0).sum(axis=1)
    
    # Governance
    gov_cols = ['inklusivitas', 'transparansi', 'legitimasi']
    for col in gov_cols:
        if col in df.columns:
            df[col] = df[col].apply(map_likert)

    # --- Q1: Heatmap by Region (Bar Chart Refined) ---
    print("\n--- Q1: Participation by Region ---")
    try:
        region_grp = df.groupby('c05')['active_pandemic'].mean().sort_values(ascending=False) * 100
        print(region_grp)
        
        plt.figure(figsize=(10, 6))
        
        # Color Map: Darker = Higher Value
        # Normalize 0-60 (or min-max)
        norm = plt.Normalize(region_grp.min(), region_grp.max())
        colors = plt.cm.Reds(norm(region_grp.values))
        
        ax = sns.barplot(x=region_grp.index, y=region_grp.values, palette=list(colors))
        
        # Add labels
        for container in ax.containers:
            ax.bar_label(container, fmt='%.1f%%', padding=3, fontsize=10, weight='bold')
        
        plt.title("Persentase Masjid yang Berperan Menghadapi Pandami")
        plt.ylabel("Persentase (%)")
        plt.xlabel("Wilayah")
        plt.xticks(rotation=45)
        plt.ylim(0, 60)
        plt.tight_layout()
        plt.savefig("heatmap_participation.png")
        print("Saved heatmap_participation.png (Refined)")
        
    except Exception as e:
        print(f"Error generating Q1 heatmap: {e}")

    # --- Map Visualization (Q1 Map) ---
    print("\n--- Generating Map ---")
    try:
        # Download DIY GeoJSON
        url = "https://raw.githubusercontent.com/thetrisatria/geojson-indonesia/master/province/id-yo.geojson"
        print(f"Downloading GeoJSON from {url}...")
        gdf = gpd.read_file(url)
        
        # Determine Name Column (usually 'name' or 'NAME_2' or 'alt_name')
        # Inspect columns if needed, but let's try standardizing
        # Check first column or 'name'
        # Normalize GeoJSON names to match CSV (UPPERCASE)
        # GeoJSON likely has 'KABUPATEN SLEMAN' or 'Sleman'
        
        # Create a mapping helper
        # My CSV index: SLEMAN, BANTUL, KOTA YOGYAKARTA, GUNUNG KIDUL, KULON PROGO
        # GeoJSON names: Let's assume title case or Upper.
        
        # print("GeoJSON Columns:", gdf.columns)
        # print("First few names:", gdf.iloc[:, 1].head()) # 2nd col usually name
        
        # Try to uppercase the name column
        name_col = 'name' if 'name' in gdf.columns else gdf.columns[1]
        gdf['upper_name'] = gdf[name_col].str.upper()
        
        # Fix specific matches
        # Map: KABUPATEN BANTUL -> BANTUL
        # Map: KOTA YOGYAKARTA -> KOTA YOGYAKARTA
        def clean_geo_name(n):
            n = n.replace('KABUPATEN ', '').replace('KOTA ', 'KOTA ')
            return n.strip()
            
        gdf['join_key'] = gdf['upper_name'].apply(clean_geo_name)
        
        # We need to map CSV index to this join_key
        # region_grp index is: SLEMAN, BANTUL, KOTA YOGYAKARTA, GUNUNG KIDUL, KULON PROGO
        # Check output names from GeoJSON later if this fails, but likelihood is high.
        
        # Prepare Data for Merge
        df_map = pd.DataFrame({'join_key': region_grp.index, 'value': region_grp.values})
        
        merged = gdf.merge(df_map, on='join_key', how='left')
        
        # Plot
        fig, ax = plt.subplots(1, 1, figsize=(10, 8))
        merged.plot(column='value', ax=ax, legend=True,
                    legend_kwds={'label': "Tingkat Partisipasi (%)", 'orientation': "horizontal"},
                    cmap='Reds', edgecolor='black')
        
        # Add labels
        merged['coords'] = merged['geometry'].apply(lambda x: x.representative_point().coords[:])
        merged['coords'] = [coords[0] for coords in merged['coords']]
        for idx, row in merged.iterrows():
            if pd.notnull(row['value']):
                # Text color white for dark backgrounds (Sleman, Yogya, Bantul)
                text_color = 'white' if row['join_key'] in ['SLEMAN', 'KOTA YOGYAKARTA', 'BANTUL'] else 'black'
                
                plt.annotate(text=f"{row['join_key']}\n{row['value']:.1f}%", xy=row['coords'],
                             horizontalalignment='center', fontsize=8, color=text_color, weight='bold')

        plt.title('Persentase Masjid yang Berperan Menghadapi Pandami')
        plt.axis('off')
        plt.savefig("map_distribution.png")
        print("Saved map_distribution.png")
        
    except Exception as e:
        print(f"Error generating Map: {e}")

    # --- Q2: Factors ---
    # (Same as before but suppressing output for brevity if needed)
    print("\n--- Q2: Factors (Skipped detailed output for brevity) ---")

    # --- Q4: Clustering (Keep existing logic) ---
    print("\n--- Q4: Clustering Analysis ---")
    try:
        plt.figure(figsize=(9, 9))
        jitter_x = df['score_physical'] + np.random.normal(0, 0.1, len(df))
        jitter_y = df['score_program'] + np.random.normal(0, 0.1, len(df))
        
        plt.scatter(jitter_x, jitter_y, alpha=0.5, c='blue', s=30)
        
        thresh = 0.5
        plt.axvline(x=thresh, color='red', linestyle='--') 
        plt.axhline(y=thresh, color='red', linestyle='--')
        
        q1_count = len(df[(df['score_physical'] >= 1) & (df['score_program'] >= 1)])
        q2_count = len(df[(df['score_physical'] < 1) & (df['score_program'] >= 1)])
        q3_count = len(df[(df['score_physical'] < 1) & (df['score_program'] < 1)])
        q4_count = len(df[(df['score_physical'] >= 1) & (df['score_program'] < 1)])
        
        plt.text(0.1, 2.5, f"Siap Program (II)\nn={q2_count}", fontsize=11, color='red', weight='bold')
        plt.text(1.5, 2.5, f"Paripurna (I)\nn={q1_count}", fontsize=11, color='green', weight='bold')
        plt.text(0.1, 0.2, f"Belum Siap (III)\nn={q3_count}", fontsize=11, color='gray', weight='bold')
        plt.text(1.5, 0.2, f"Siap Fisik (IV)\nn={q4_count}", fontsize=11, color='orange', weight='bold')
        
        plt.xlabel("Kesiapan Fisik\n(Contoh: Struktur Tahan Gempa, Memiliki APAR)")
        plt.ylabel("Kesiapan Program\n(Contoh: Memiliki SOP, Titik Kumpul, Jalur Evakuasi)")
        plt.title("Kuadran Kesiapan Masjid (Fisik vs Program)\nTotal n=" + str(len(df)))
        plt.tight_layout()
        plt.savefig("quadrant_clusters_v2.png")
        print("Saved quadrant_clusters_v2.png")
        
    except Exception as e:
         print(f"Error generating Q4 cluster chart: {e}")

if __name__ == "__main__":
    analyze_masjid_data()
