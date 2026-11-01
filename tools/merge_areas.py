"""Merges council boundaries into one zone per neighbourhood. Output: areas/<place-slug>.json"""
import json, os
from shapely.geometry import shape, mapping
from shapely.ops import unary_union

M = {  # place file name -> councils, as (name_en) or ('name', <Maltese name>)
 'sliema': ['Sliema'], 'st-julian-s': ["Saint Julian's"], 'swieqi': ['Swieqi'], 'pembroke': ['Pembroke'],
 'gzira': ['Gżira'], 'ta-xbiex': [('name', "Ta' Xbiex")], 'msida': ['Msida'], 'pieta': ['Pietà'],
 'valletta': ['Valletta'], 'floriana': ['Floriana'], 'the-three-cities': ['Birgu', 'Senglea', 'Cospicua'],
 'paola': ['Paola'], 'fgura-zabbar': ['Fgura', 'Żabbar'], 'san-gwann': ['San Ġwann'], 'birkirkara': ['Birkirkara'],
 'qormi': ['Qormi'], 'mosta': ['Mosta'], 'naxxar': ['Naxxar'], 'iklin-gharghur': ['Iklin', 'Għargħur'],
 'attard-balzan-lija': ['Attard', 'Balzan', 'Lija'], 'zebbug': [('name', 'Ħaż-Żebbuġ')], 'siggiewi': ['Siġġiewi'],
 'rabat-mdina': [('name_en', 'Rabat'), 'Mdina'], 'mgarr': ['Mġarr'], 'st-paul-s-bay-bugibba-qawra': ["Saint Paul's Bay"],
 'mellieha': ['Mellieħa'], 'marsaskala': ['Marsaskala'], 'zejtun': ['Żejtun'], 'birzebbuga': ['Birżebbuġa'],
 'victoria-rabat-gozo': ['Victoria'], 'marsalforn-zebbug-gozo': [('name', 'Iż-Żebbuġ')], 'xaghra-gozo': ['Xagħra'],
 'nadur-qala-gozo': ['Nadur', 'Qala'], 'ghajnsielem-gozo': ['Għajnsielem'], 'hamrun-santa-venera': ['Ħamrun', 'Santa Venera'],
}
fc = json.load(open('areas_all.geojson'))
councils = [f for f in fc['features'] if f['properties']['admin_level'] == '8']
os.makedirs('areas', exist_ok=True)
for slug, names in M.items():
    parts = []
    for n in names:
        key, val = ('name_en', n) if isinstance(n, str) else n
        hit = [f for f in councils if f['properties'].get(key) == val]
        if len(hit) != 1:
            raise SystemExit(f'{slug}: {n} matched {len(hit)}')
        parts.append(shape(hit[0]['geometry']))
    g = unary_union(parts).simplify(0.0001, preserve_topology=True)
    geo = json.loads(json.dumps(mapping(g)))
    def rnd(x): return [rnd(i) for i in x] if isinstance(x[0], (list, tuple)) else [round(x[0], 5), round(x[1], 5)]
    geo['coordinates'] = rnd(geo['coordinates'])
    json.dump({'geometry': geo}, open(f'areas/{slug}.json', 'w'), separators=(',', ':'))
    print(slug, geo['type'], round(g.area * 1e4, 2))
