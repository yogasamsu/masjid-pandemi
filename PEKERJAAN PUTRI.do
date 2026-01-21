/// COMMAND PEMBUATAN GRAPH DATA SURVEY MASJID ///

*1. JENIS MASJID
tab c02
catplot c02, percent blabel(bar)
graph pie , over(c02) plabel(1 percent, ) plabel(2 percent, ) plabel(3 percent, ) plabel(4 percent, ) plabel(5 percent, ) plabel(6 percent, ) plabel(7 percent, )

*2. SIMAS KEMENAG
tab c03
gr bar (percent), over(c03) blabel(bar)
graph pie, over(c03) plabel(_all percent, color(white) size(medlarge) orientation(horizontal))

*3. ALASAN TIDAK SIMAS KEMENAG
tab c03x
graph pie, over(c03x) plabel(_all percent, color(white) size(medlarge) orientation(horizontal))
**LAINNYA
tab c03xo
///belum dirun karena bingung antara di generate 1 1 atau dijelaskan langsung

*4. STATUS TANAH
**WAQAF & NON-WAQAF
tab c08
graph pie, over(c08) plabel(_all percent, color(white) size(medium))

**LAINNYA
tab c09
graph pie, over(c09) plabel(_all percent, color(white) size(medium))
***Lainnya
tab c09x
graph pie, over(c09x) plabel(_all percent, color(white) size(medium))

*5. REKENING
tab c14
graph pie, over(c14) plabel(_all percent, color(white) size(medium))

**BANK SYARIAH BUKAN
tab c15a
graph pie, over(c15a) plabel(_all percent, color(white) size(medium))
tab c15b
catplot c15b, percent blabel(bar)

*QRIS
**6. PENGETAHUAN
tab d01
graph pie, over(d01) plabel(_all percent, color(white) size(medlarge) orientation(horizontal))

**7. PUNYA QRIS
tab d02
graph pie, over(d02) plabel(_all percent, color(white) size(medlarge) orientation(horizontal))

**8. ALASAN GA QRIS
tab d02x
graph pie, over(d02x) plabel(_all percent, color(white) size(medlarge) orientation(horizontal))

**9. QRIS digunakan untuk apa saja

**10. Apakah penggunaan QRIS efektif
tab d05a
graph pie, over(d05a) plabel(_all percent, color(white) size(medlarge) orientation(horizontal))

**11. Intensitas penggunaan QRIS
tab d05b
graph bar, over(d05b) blabel(_all percent, color(white) size(medium))

*12. Sumber dana operasional masjid
tab d06
graph pie, over(d06) plabel(_all sum, color(white) size(medlarge) orientation(horizontal))

*13. Kondisi dinding masjid
tab e01
graph pie, over(e01) plabel(_all sum, color(white) size(medlarge) orientation(horizontal))

*14. Kondisi atap masjid
tab e02
graph pie, over(e02) plabel(_all sum, color(white) size(medlarge) orientation(horizontal))

*15. Kondisi lantai masjid
tab e03
graph pie, over(e03) plabel(_all sum, color(white) size(medlarge) orientation(horizontal))




