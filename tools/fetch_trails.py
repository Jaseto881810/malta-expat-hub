"""Routes each hiking trail along real OpenStreetMap paths with the BRouter walking router.
Waypoints are (lat, lng). Output: trails.json {slug: {"coords": [[lng, lat], ...], "km": n, "profile": p}}"""
import json, math, time, urllib.request, urllib.parse

T = {
 "victoria-lines-trail": [(35.9030,14.3530),(35.9085,14.3800),(35.9160,14.4140),(35.9240,14.4400),(35.9280,14.4530),(35.9330,14.4630)],
 "dingli-cliffs-to-wied-iz-zurrieq": [(35.8565,14.3830),(35.8487,14.3829),(35.8270,14.4240),(35.8279,14.4420),(35.8210,14.4550)],
 "marfa-ridge-the-red-tower": [(35.9640,14.3530),(35.9681,14.3546),(35.9827,14.3343),(35.9877,14.3291)],
 "majjistral-nature-park": [(35.9300,14.3460),(35.9333,14.3442),(35.9420,14.3570),(35.9608,14.3418)],
 "buskett-girgenti": [(35.8600,14.3985),(35.8570,14.3950),(35.8540,14.4110),(35.8470,14.4270),(35.8555,14.4365)],
 "rabat-mdina-mtarfa-walk": [(35.8836,14.4016),(35.8910,14.3970),(35.8865,14.4045),(35.8836,14.4016)],
 "xemxija-heritage-trail": [(35.9530,14.3830),(35.9545,14.3800),(35.9525,14.3780),(35.9530,14.3830)],
 "st-paul-s-bay-to-mellieha-bay": [(35.9470,14.3980),(35.9520,14.3850),(35.9575,14.3880),(35.9590,14.3790),(35.9615,14.3560)],
 "three-villages-walk": [(35.8957,14.4505),(35.9005,14.4470),(35.8990,14.4545),(35.8905,14.4440),(35.8957,14.4505)],
 "bahrija-the-western-cliffs": [(35.8855,14.3775),(35.8960,14.3480),(35.9030,14.3530),(35.8855,14.3775)],
 "maqluba-sinkhole-walk": [(35.8545,14.4385),(35.8325,14.4590),(35.8345,14.4580)],
 "hal-millieri-walk": [(35.8345,14.4580),(35.8325,14.4780),(35.8290,14.4800)],
 "windmills-walk": [(35.8310,14.4745),(35.8290,14.4800),(35.8330,14.4850),(35.8310,14.4745)],
 "delimara-st-peter-s-pool": [(35.8580,14.5660),(35.8530,14.5680),(35.8326,14.5622),(35.8296,14.5609)],
 "sliema-to-st-julian-s-promenade": [(35.9085,14.5100),(35.9130,14.5040),(35.9143,14.4925),(35.9193,14.4905)],
 "ta-cenc-cliffs": [(36.0255,14.2725),(36.0150,14.2480),(36.0295,14.2160)],
 "salt-pans-wied-il-ghasri": [(36.0800,14.2490),(36.0810,14.2400),(36.0782,14.2232)],
 "marsalforn-to-ramla-bay": [(36.0715,14.2620),(36.0500,14.2650),(36.0473,14.2690),(36.0625,14.2840)],
 "hondoq-ir-rummien-walk": [(36.0250,14.2980),(36.0330,14.3140),(36.0306,14.3055),(36.0250,14.2980)],
 "dahlet-qorrot-walk": [(36.0395,14.2985),(36.0420,14.3060),(36.0600,14.2960),(36.0395,14.2985)],
 "ta-gurdan-walk": [(36.0598,14.2088),(36.0680,14.1930),(36.0720,14.1925),(36.0720,14.2190),(36.0616,14.2128),(36.0598,14.2088)],
 "comino-walk": [(36.0145,14.3275),(36.0090,14.3340),(36.0182,14.3392),(36.0105,14.3320),(36.0145,14.3275)],
}

def km(c):
    d = 0
    for (a, b), (x, y) in zip(c, c[1:]):
        d += math.hypot((y - b) * 111.2, (x - a) * 111.2 * math.cos(math.radians(b)))
    return round(d, 1)

out = {}
for slug, wps in T.items():
    lonlats = '|'.join(f'{lng},{lat}' for lat, lng in wps)
    for profile in ('hiking-mountain', 'trekking', 'shortest'):
        url = 'https://brouter.de/brouter?' + urllib.parse.urlencode({'lonlats': lonlats, 'profile': profile, 'alternativeidx': 0, 'format': 'geojson'})
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'maltaexpatguide.com trail builder (one-off)'})
            data = json.load(urllib.request.urlopen(req, timeout=60))
            coords = [[round(p[0], 5), round(p[1], 5)] for p in data['features'][0]['geometry']['coordinates']]
            out[slug] = {'coords': coords, 'km': km(coords), 'profile': profile}
            print(f'{slug}: {out[slug]["km"]} km ({profile}, {len(coords)} pts)')
            break
        except Exception as e:
            print(f'{slug}: {profile} failed: {e}')
        time.sleep(2)
    time.sleep(2)
json.dump(out, open('trails.json', 'w'))
print(len(out), 'of', len(T), 'trails routed')
