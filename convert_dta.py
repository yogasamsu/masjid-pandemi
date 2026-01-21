import os
import pandas as pd
import glob

def convert_dta_to_csv():
    # Find all .dta files in the current directory
    dta_files = glob.glob("*.dta")
    
    if not dta_files:
        print("No .dta files found.")
        return

    print(f"Found {len(dta_files)} .dta files.")

    for file in dta_files:
        try:
            print(f"Converting {file}...")
            # Read the Stata file
            df = pd.read_stata(file)
            
            # Create csv filename
            csv_file = os.path.splitext(file)[0] + ".csv"
            
            # Export to CSV
            df.to_csv(csv_file, index=False)
            print(f"Successfully converted {file} to {csv_file}")
            
        except Exception as e:
            print(f"Error converting {file}: {e}")

if __name__ == "__main__":
    convert_dta_to_csv()
