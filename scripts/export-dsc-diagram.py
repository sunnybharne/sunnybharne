"""Export the simple DSC draw.io shapes as accessible animated and static SVGs."""
from pathlib import Path
import base64
import html
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'drawio/dsc.drawio'
OUT = ROOT / 'public/learning-assets/dsc'
OUT.mkdir(parents=True, exist_ok=True)
cells = ET.parse(SOURCE).findall('.//mxCell')
vertices = {c.get('id'): c for c in cells if c.get('vertex') == '1'}

def style(cell):
    return dict(item.split('=', 1) for item in cell.get('style', '').split(';') if '=' in item)

def geometry(cell):
    g = cell.find('mxGeometry')
    return [float(g.get(key, 0)) for key in ('x', 'y', 'width', 'height')]

parts = ['<svg xmlns="http://www.w3.org/2000/svg" width="910" height="460" viewBox="0 0 910 460" role="img" aria-labelledby="title desc">',
         '<title id="title">DSC inside Azure Machine Configuration</title>',
         '<desc id="desc">Azure Policy deploys an assignment. The VM agent downloads a package and runs DSC to check and optionally apply the desired settings.</desc>',
         '<defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#2583b3"/></marker>',
         '<style>.flow{stroke-dasharray:7 5;animation:flow 2.4s linear infinite}@keyframes flow{to{stroke-dashoffset:-48}}@media(prefers-reduced-motion:reduce){.flow{animation:none}}</style></defs>',
         '<rect width="910" height="460" fill="white"/>']
# Shapes first, then connectors, then labels.
for cell in vertices.values():
    s = style(cell)
    if 'fillColor' in s:
        x,y,w,h = geometry(cell)
        parts.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="12" fill="{s["fillColor"]}" stroke="#cadbe6"/>')
for cell in cells:
    if cell.get('edge') != '1':
        continue
    s=style(cell); x,y,w,h=geometry(vertices[cell.get('source')]); a,b,c,d=geometry(vertices[cell.get('target')])
    start=(x+w*float(s.get('exitX',1)), y+h*float(s.get('exitY',.5)))
    end=(a+c*float(s.get('entryX',0)), b+d*float(s.get('entryY',.5)))
    mid=(start[0]+end[0])/2
    route=f'M {start[0]} {start[1]} H {mid} V {end[1]} H {end[0]}'
    parts.append(f'<path class="flow" d="{route}" fill="none" stroke="#2583b3" stroke-width="1.8" marker-end="url(#arrow)"/>')
for cell in vertices.values():
    s=style(cell);x,y,w,h=geometry(cell)
    if s.get('shape') == 'image':
        # draw.io embeds SVG data in its own data-URI convention.
        data=s['image'].split(',',1)[1]
        base64.b64decode(data, validate=True)
        parts.append(f'<image x="{x}" y="{y}" width="{w}" height="{h}" href="data:image/svg+xml;base64,{data}"/>')
    value=cell.get('value','')
    if value:
        size=float(s.get('fontSize',16));lines=value.split('\n');line_height=size*1.35
        baseline=y+(h-line_height*len(lines))/2+size
        for i,line in enumerate(lines):
            weight='600' if s.get('fontStyle')=='1' else '400'
            parts.append(f'<text x="{x}" y="{baseline+i*line_height}" font-family="Arial,sans-serif" font-size="{size}" font-weight="{weight}" fill="#183951">{html.escape(line)}</text>')
parts.append('</svg>')
svg='\n'.join(parts)
(OUT/'diagram.svg').write_text(svg)
(OUT/'diagram-static.svg').write_text(svg.replace('animation:flow 2.4s linear infinite','animation:none'))
