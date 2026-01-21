///OLAH DATA SURVEI MASJID PKEBS///

***----------------------------SET UP-------------------------------***
clear all
set more off
global datamasjid "D:\ASSISTANT\PKEBS\Survei Masjid\Olah Data"

***-----------------------------START-------------------------------***
use "$datamasjid\data_masjid_jogja_7Agustus2023_v9",clear

use "$datamasjid\olahanhuda", clear

///RENAME VARIABLE///
*No #34*
rename j01a zakat19
rename j01b zakat20
rename j01c zakat21
rename j01d zakat22

*No #35*
rename j02a wakaf19
rename j02b wakaf20
rename j02c wakaf21
rename j02d wakaf22

*No #36*
rename j03 badaninfaq

*No #37*
rename j05a simpanfilantropi
rename j05b lembagasimpan

*No #38*
rename j06aa tpa19
rename j06ab tpa20
rename j06ac tpa21
rename j06ad tpa22

rename j06ba intensitastpa19
rename j06bb intensitastpa20
rename j06bc intensitastpa21
rename j06bd intensitastpa22

rename j06ca pesertatpa19
rename j06cb pesertatpa20
rename j06cc pesertatpa21
rename j06cd pesertatpa22

*No #39*
rename j07aa kajianremaja19
rename j07ab kajianremaja20
rename j07ac kajianremaja21
rename j07ad kajianremaja22

*No #40*
rename j08 remajamasjid

*No #41*
rename j09a kajianbapak19
rename j09b kajianbapak20
rename j09c kajianbapak21
rename j09d kajianbapak22

*No #42*
rename j10a kajianibu19
rename j10b kajianibu20
rename j10c kajianibu21
rename j10d kajianibu22

*No #43*
rename k01 inklusivitas
rename k02 keadilan
rename k03 kinerja
rename k04 transparansi
rename k05 legitimasi
rename k06 akuntabilitas
rename k07 arahkebijakan
rename k08 kemampuan

preserve

keep zakat19 zakat20 zakat21 zakat22 wakaf19 wakaf20 wakaf21 wakaf22 badaninfaq simpanfilantropi lembagasimpan tpa19 tpa20 tpa21 tpa22 intensitastpa19 intensitastpa20 intensitastpa21 intensitastpa22 pesertatpa19 pesertatpa20 pesertatpa21 pesertatpa22 kajianremaja19 kajianremaja20 kajianremaja21 kajianremaja22 remajamasjid kajianbapak19 kajianbapak20 kajianbapak21 kajianbapak22 kajianibu19 kajianibu20 kajianibu21 kajianibu22 inklusivitas keadilan kinerja transparansi legitimasi akuntabilitas arahkebijakan kemampuan


save "$datamasjid\olahanhuda", replace

///GRAPHING///
*No #34*
*->2019
graph bar (count), over(zakat19) blabel(total) ytitle(Jumlah Masjid) title(Penerimaan Zakat) subtitle(2019)

graph pie, over(zakat19) plabel(_all percent, color(white)) title(Persentase Penerimaan Zakat) subtitle(2019) legend(on)
*->2020
graph bar (count), over(zakat20) blabel(total) ytitle(Jumlah Masjid) title(Penerimaan Zakat) subtitle(2020 (PSBB))

graph pie, over(zakat20) plabel(_all percent, color(white)) title(Persentase Penerimaan Zakat) subtitle(2020 (PSBB)) legend(on)
*->2021
graph bar (count), over(zakat21) blabel(total) ytitle(Jumlah Masjid) title(Penerimaan Zakat) subtitle(2021 (PPKM))

graph pie, over(zakat21) plabel(_all percent, color(white)) title(Persentase Penerimaan Zakat) subtitle(2021 (PPKM)) legend(on)
*->2022
graph bar (count), over(zakat22) blabel(total) ytitle(Jumlah Masjid) title(Penerimaan Zakat) subtitle(2022)

graph pie, over(zakat22) plabel(_all percent, color(white)) title(Persentase Penerimaan Zakat) subtitle(2022) legend(on)

*No #35*
*->2019
graph bar (count), over(wakaf19) blabel(total) ytitle(Jumlah Masjid) title(Penerimaan Wakaf) subtitle(2019)

graph pie, over(wakaf19) plabel(_all percent, color(white)) title(Persentase Penerimaan wakaf) subtitle(2019) legend(on)
*->2020
graph bar (count), over(wakaf20) blabel(total) ytitle(Jumlah Masjid) title(Penerimaan Wakaf) subtitle(2020 (PSBB))

graph pie, over(wakaf20) plabel(_all percent, color(white)) title(Persentase Penerimaan Wakaf) subtitle(2020 (PSBB)) legend(on)
*->2021
graph bar (count), over(wakaf21) blabel(total) ytitle(Jumlah Masjid) title(Penerimaan Wakaf) subtitle(2021 (PPKM))

graph pie, over(wakaf21) plabel(_all percent, color(white)) title(Persentase Penerimaan Wakaf) subtitle(2021 (PPKM)) legend(on)
*->2022
graph bar (count), over(wakaf22) blabel(total) ytitle(Jumlah Masjid) title(Penerimaan Wakaf) subtitle(2022)

graph pie, over(wakaf22) plabel(_all percent, color(white)) title(Persentase Penerimaan Wakaf) subtitle(2022) legend(on)

*No #36*
graph pie, over(badaninfaq) plabel(_all percent, color(white)) title(Persentase Kepemilikan Badan Pengelola Infaq & Sedekah) legend(on)

*No #37*
graph pie, over(simpanfilantropi) plabel(_all percent, color(white)) title(Persentase Penyimpanan Keuangan di Lembaga Keuangan) legend(on)

graph bar (count), over(lembagasimpan) blabel(total) ytitle(Jumlah Masjid) title(Jenis Lembaga Simpanan Keuangan Masjid) 

*No #38*
*->2019
graph pie, over(tpa19) plabel(_all percent, color(white)) title(Persentase Keaktifan TPA) subtitle(2019) legend(on)

graph bar (count), over(intensitastpa19) blabel(total) ytitle(Jumlah Masjid) title(Intensitas TPA) subtitle(2019)

graph bar (count), over(pesertatpa19) blabel(total) ytitle(Jumlah Masjid) title(Jumlah Peserta TPA TPA) subtitle(2019)

*->2020
graph pie, over(tpa20) plabel(_all percent, color(white)) title(Persentase Keaktifan TPA) subtitle(2020 (PSBB)) legend(on)

graph bar (count), over(intensitastpa20) blabel(total) ytitle(Jumlah Masjid) title(Intensitas TPA) subtitle(2020 (PSBB))

graph bar (count), over(pesertatpa20) blabel(total) ytitle(Jumlah Masjid) title(Jumlah Peserta TPA TPA) subtitle(2020 (PSBB))

*->2021
graph pie, over(tpa21) plabel(_all percent, color(white)) title(Persentase Keaktifan TPA) subtitle(2021 (PPKM)) legend(on)

graph bar (count), over(intensitastpa21) blabel(total) ytitle(Jumlah Masjid) title(Intensitas TPA) subtitle(2021 (PPKM))

graph bar (count), over(pesertatpa21) blabel(total) ytitle(Jumlah Masjid) title(Jumlah Peserta TPA TPA) subtitle(2021 (PPKM))

*->2022
graph pie, over(tpa22) plabel(_all percent, color(white)) title(Persentase Keaktifan TPA) subtitle(2022) legend(on)

graph bar (count), over(intensitastpa22) blabel(total) ytitle(Jumlah Masjid) title(Intensitas TPA) subtitle(2022)

graph bar (count), over(pesertatpa22) blabel(total) ytitle(Jumlah Masjid) title(Jumlah Peserta TPA TPA) subtitle(2022)

*No #39*
graph pie, over(kajianremaja19) plabel(_all percent, color(white)) title(Persentase Keaktifan Kajian Remaja) subtitle(2019) legend(on)

graph pie, over(kajianremaja20) plabel(_all percent, color(white)) title(Persentase Keaktifan Kajian Remaja) subtitle(2020 (PSBB)) legend(on)

graph pie, over(kajianremaja21) plabel(_all percent, color(white)) title(Persentase Keaktifan Kajian Remaja) subtitle(2021 (PPKM)) legend(on)

graph pie, over(kajianremaja22) plabel(_all percent, color(white)) title(Persentase Keaktifan Kajian Remaja) subtitle(2022) legend(on)

*No #40*
graph pie, over(remajamasjid) plabel(_all percent, color(white)) title(Persentase Keberadaan Remaja Masjid) legend(on)

*No #41*
graph pie, over(kajianbapak19) plabel(_all percent, color(white)) title(Persentase Keaktifan Kajian Bapak) subtitle(2019) legend(on)

graph pie, over(kajianbapak20) plabel(_all percent, color(white)) title(Persentase Keaktifan Kajian Bapak) subtitle(2020 (PSBB)) legend(on)

graph pie, over(kajianbapak21) plabel(_all percent, color(white)) title(Persentase Keaktifan Kajian Bapak) subtitle(2021 (PPKM)) legend(on)

graph pie, over(kajianbapak22) plabel(_all percent, color(white)) title(Persentase Keaktifan Kajian Bapak) subtitle(2022) legend(on)

*No #42*
graph pie, over(kajianibu19) plabel(_all percent, color(white)) title(Persentase Keaktifan Kajian Ibu) subtitle(2019) legend(on)

graph pie, over(kajianibu20) plabel(_all percent, color(white)) title(Persentase Keaktifan Kajian Ibu) subtitle(2020 (PSBB)) legend(on)

graph pie, over(kajianibu21) plabel(_all percent, color(white)) title(Persentase Keaktifan Kajian Ibu) subtitle(2021 (PPKM)) legend(on)

graph pie, over(kajianibu22) plabel(_all percent, color(white)) title(Persentase Keaktifan Kajian Ibu) subtitle(2022) legend(on)

*No #43*
graph bar (count), over(inklusivitas) blabel(total) ytitle(Jumlah Masjid) title(Skor Inklusivitas)

graph bar (count), over(keadilan) blabel(total) ytitle(Jumlah Masjid) title(Skor Keadilan)

graph bar (count), over(kinerja) blabel(total) ytitle(Jumlah Masjid) title(Skor Kinerja)

graph bar (count), over(transparansi) blabel(total) ytitle(Jumlah Masjid) title(Skor Transparansi)

graph bar (count), over(legitimasi) blabel(total) ytitle(Jumlah Masjid) title(Skor Legitimasi)

graph bar (count), over(akuntabilitas) blabel(total) ytitle(Jumlah Masjid) title(Skor Akuntabilitas)

graph bar (count), over(arahkebijakan) blabel(total) ytitle(Jumlah Masjid) title(Skor Arah Kebijakan)

graph bar (count), over(kemampuan) blabel(total) ytitle(Jumlah Masjid) title(Skor Kemampuan SDM)

///Import Data Placebo Panel///
import excel "D:\ASSISTANT\PKEBS\Survei Masjid\Olah Data\summarypanel.xlsx", sheet("Sheet1") firstrow clear

save "$datamasjid\summarypanel", replace

use "$datamasjid\summarypanel", clear

replace persen_zakat = round(persen_zakat, 1.0)
replace persen_wakaf = round(persen_wakaf, 1.0)
replace persen_tpa = round(persen_tpa, 1.0)
replace persen_kajianremaja = round(persen_kajianremaja, 1.0)
replace persen_kajianbapak = round(persen_kajianbapak, 1.0)
replace persen_kajianibu = round(persen_kajianibu, 1.0)

twoway (connected persen_zakat tahun) (connected persen_wakaf tahun), ytitle(Persentase) ylabel(50(5)90, grid) xtitle(Tahun) title(Persentase Masjid Penerima Zakat dan Wakaf) legend(on size(small) box)
//revised
twoway (connected persen_zakat tahun, mlabel(persen_zakat) mlabposition(6)) (connected persen_wakaf tahun, mlabel(persen_wakaf) mlabposition(6)), ytitle(Persentase) ymtick(50(5)90, grid) xtitle(Tahun) title(Persentase Masjid Penerima Zakat dan Wakaf)

twoway (connected persen_tpa tahun) (connected persen_kajianremaja tahun) (connected persen_kajianbapak tahun) (connected persen_kajianibu tahun), ytitle(Persentase) ylabel(20(5)85, grid) xtitle(Tahun) title(Tingkat Keaktifan Kegiatan Masjid) legend(on size(small) box)
//revised
twoway (connected persen_tpa tahun, mlabel(persen_tpa) mlabposition(12)) (connected persen_kajianremaja tahun, mlabel(persen_kajianremaja) mlabposition(12)) (connected persen_kajianbapak tahun, mlabel(persen_kajianbapak) mlabposition(6)) (connected persen_kajianibu tahun, mlabel(persen_kajianibu) mlabposition(12)), ytitle(Persentase) ylabel(85(10)20) ymtick(20(5)85, grid) xtitle(Tahun) title(Tingkat Keaktifan Kegiatan Masjid)