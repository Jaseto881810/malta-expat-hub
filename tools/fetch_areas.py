"""Downloads Malta's local council boundaries (OpenStreetMap, admin_level 8) and saves simplified polygons."""
import json, subprocess, urllib.request, urllib.parse
from shapely.geometry import shape, mapping

Q = """[out:json][timeout:180];
area["ISO3166-1"="MT"]["admin_level"="2"]->.mt;
rel(area.mt)["boundary"="administrative"]["admin_level"~"^(7|8|9)$"];
out geom;"""
for url in ('https://overpass-api.de/api/interpreter', 'https://overpass.kumi.systems/api/interpreter'):
    try:
        req = urllib.request.Request(url, data=urllib.parse.urlencode({'data': Q}).encode(), headers={'User-Agent': 'maltaexpatguide.com boundary fetch (one-off)'})
        raw = urllib.request.urlopen(req, timeout=300).read()
        break
    except Exception as e:
        print('overpass failed', url, e)
open('osm.json', 'wb').write(raw)
gj = json.loads(subprocess.run(['npx', '--yes', 'osmtogeojson@3.0.0-beta.5', 'osm.json'], capture_output=True, check=True).stdout)
out = []
for f in gj['features']:
    if f['geometry']['type'] not in ('Polygon', 'MultiPolygon'):
        continue
    p = f['properties']
    g = shape(f['geometry']).buffer(0).simplify(0.00015, preserve_topology=True)
    out.append({'type': 'Feature', 'properties': {'name': p.get('name'), 'name_en': p.get('name:en'), 'admin_level': p.get('admin_level'),
                'id': p.get('id')}, 'geometry': json.loads(json.dumps(mapping(g)))})
    print(p.get('admin_level'), '|', p.get('name'), '|', p.get('name:en'), '|', round(g.area * 1e4, 2))
json.dump({'type': 'FeatureCollection', 'features': out}, open('areas_all.geojson', 'w'))
print(len(out), 'areas')
