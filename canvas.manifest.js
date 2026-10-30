export const manifest = {
  screens: {
    scr_82ebh7: { name: "Home · Minimal", route: "/", state: { "tab": "tidy" }, position: { "x": 160, "y": 220 } },
    scr_m2gec1: { name: "Home · Detailed (saved)", route: "/", state: { "tab": "tidy", "homeVariant": "detailed" }, position: { "x": 1560, "y": 220 } },
    scr_yjio9i: { name: "Blurry pile · All photos", route: "/", state: { "tab": "tidy", "pileId": "blurry", "pileStep": "overview" }, position: { "x": 160, "y": 2200 } },
    scr_sznkge: { name: "Blurry pile · One by one", route: "/", state: { "tab": "tidy", "pileId": "blurry", "pileStep": "review" }, position: { "x": 1560, "y": 2200 } },
    scr_kc98kh: { name: "Duplicates · All sets", route: "/", state: { "tab": "tidy", "pileId": "duplicates", "pileStep": "overview" }, position: { "x": 160, "y": 4180 } },
    scr_jge9uw: { name: "Duplicates · One by one", route: "/", state: { "tab": "tidy", "pileId": "duplicates", "pileStep": "review" }, position: { "x": 1560, "y": 4180 } },
    scr_cwzwoq: { name: "Screenshots · All photos", route: "/", state: { "tab": "tidy", "pileId": "screenshots", "pileStep": "overview" }, position: { "x": 160, "y": 6160 } },
    scr_4s14yc: { name: "Receipts & whiteboards · All photos", route: "/", state: { "tab": "tidy", "pileId": "paperwork", "pileStep": "overview" }, position: { "x": 160, "y": 16060 } },
    scr_24rh37: { name: "Receipts & whiteboards · One by one", route: "/", state: { "tab": "tidy", "pileId": "paperwork", "pileStep": "review" }, position: { "x": 1560, "y": 16060 } },
    scr_ezy8gf: { name: "Videos · All videos", route: "/", state: { "tab": "tidy", "pileId": "videos", "pileStep": "overview" }, position: { "x": 160, "y": 8140 } },
    scr_bl0hz8: { name: "Find · Ask", route: "/", state: { "tab": "find" }, position: { "x": 160, "y": 10120 } },
    scr_nycmnr: { name: "Find · Results", route: "/", state: { "tab": "find", "findQuery": "photos I took at this house" }, position: { "x": 1560, "y": 10120 } },
    scr_y29pjr: { name: "Find · No matches", route: "/", state: { "tab": "find", "findQuery": "purple bicycles in Lisbon" }, position: { "x": 2960, "y": 10120 } },
    scr_56yo0a: { name: "Share · Pick people", route: "/", state: { "tab": "share", "shareStatus": "editing" }, position: { "x": 160, "y": 12100 } },
    scr_q2tiee: { name: "Share · Sent", route: "/", state: { "tab": "share", "shareStatus": "sent" }, position: { "x": 1560, "y": 12100 } },
    scr_zsaw8g: { name: "Summary · Page 1 (Landing)", route: "/summary#overview", position: { "x": 218.02, "y": 17736.22 } },
    scr_swb7li: { name: "Summary · Page 2 (Features)", route: "/summary#features", position: { "x": 1618.02, "y": 17736.22 } }
  },
  sections: {
    sec_7t1hkl: { name: "Home", x: 0, y: 0, width: 2920, height: 1180 },
    sec_nfgb26: { name: "Blurry pile", x: 0, y: 1980, width: 2920, height: 1180 },
    sec_6f9tvr: { name: "Duplicates", x: 0, y: 3960, width: 2920, height: 1180 },
    sec_2or7xt: { name: "Screenshots", x: 0, y: 5940, width: 1520, height: 1180 },
    sec_rnckew: { name: "Videos", x: 0, y: 7920, width: 1520, height: 1180 },
    sec_7xrbhj: { name: "Find", x: 0, y: 9900, width: 4320, height: 1180 },
    sec_ym52l6: { name: "Share", x: 0, y: 11880, width: 2920, height: 1180 },
    sec_fefcsu: { name: "Welcome", x: 0, y: 13860, width: 1520, height: 1180 },
    sec_tdbn5v: { name: "Receipts & whiteboards", x: 0, y: 15840, width: 2920, height: 1180 },
    sec_vpllg3: { name: "Summary", x: 58.02, y: 17516.22, width: 2920, height: 1180 }
  },
  layers: [
  { kind: "section", id: "sec_7t1hkl", children: [
    { kind: "screen", id: "scr_82ebh7" },
    { kind: "screen", id: "scr_m2gec1" }]
  },
  { kind: "section", id: "sec_nfgb26", children: [
    { kind: "screen", id: "scr_yjio9i" },
    { kind: "screen", id: "scr_sznkge" }]
  },
  { kind: "section", id: "sec_6f9tvr", children: [
    { kind: "screen", id: "scr_kc98kh" },
    { kind: "screen", id: "scr_jge9uw" }]
  },
  { kind: "section", id: "sec_2or7xt", children: [
    { kind: "screen", id: "scr_cwzwoq" }]
  },
  { kind: "section", id: "sec_rnckew", children: [
    { kind: "screen", id: "scr_ezy8gf" }]
  },
  { kind: "section", id: "sec_7xrbhj", children: [
    { kind: "screen", id: "scr_bl0hz8" },
    { kind: "screen", id: "scr_nycmnr" },
    { kind: "screen", id: "scr_y29pjr" }]
  },
  { kind: "section", id: "sec_ym52l6", children: [
    { kind: "screen", id: "scr_56yo0a" },
    { kind: "screen", id: "scr_q2tiee" }]
  },
  { kind: "section", id: "sec_fefcsu", children: [] },
  { kind: "section", id: "sec_tdbn5v", children: [
    { kind: "screen", id: "scr_4s14yc" },
    { kind: "screen", id: "scr_24rh37" }]
  },
  { kind: "section", id: "sec_vpllg3", children: [
    { kind: "screen", id: "scr_zsaw8g" },
    { kind: "screen", id: "scr_swb7li" }]
  }]

};