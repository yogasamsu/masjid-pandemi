
use "D:\KERJA-2023\survey masjid\data masjid jogja_7Agustus2023_v8.dta", clear 

label var k01 "INKLUSIVITAS,Jamaah diberi kesempatan sampaikan preferensi/pendapat"
label var k02 "KEADILAN, Kenyamanan dan kebutuhan jamaah dalam pelaksanaan ibadah" 
label var k03 "KINERJA, Proses pengambilan keputusan masjid dilakukan efektif" 
label var k04 "TRANSPARANSI, Jamaah tahu informasi program pengelolaan masjid?"
label var k05 "LEGITIMASI, Kepercayaan jamaah thd pengurus masjid dlm proses pengambilan keputusan"
label var k06 "AKUNTABILITAS, Pengurus memperbarui informasi pd jamaah ttg perubahan pengelolaan masjid" 
label var k07 "ARAH KEBIJAKAN, Rencana pengelolaan masjid mempertimbangkan dampak jangka panjang" 
label var k08 "KEMAMPUAN, Pengurus mempunyai SDM yg punya pengetahuan keuangan & pengelolaan masjid"

label define k0 1 "Sangat Tidak Setuju" 2 "Tidak Setuju" 3 "Ragu-ragu" 4 "Setuju" 5 "Sangat Setuju"
for var k01 k02 k03 k04 k05 k06 k07 k08 : replace X=. if X==999999
for var k01 k02 k03 k04 k05 k06 k07 k08 : label value X k0

save "D:\KERJA-2023\survey masjid\data masjid jogja_7Agustus2023_v9.dta", replace

log using "D:\KERJA-2023\survey masjid\test 8.log", replace 
for var k* : tab X, m 

log close






 

 



