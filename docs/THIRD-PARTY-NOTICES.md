# Reference and prototype provenance

## Reference imagery and design notes

`design/reference/assets/example_capword.jpg` and `example_capword_2.jpg` show
CapWords interfaces. `design/reference/REFERENCE-DESIGN.md` attributes the reference
language to CapWords and LittleBites. These are reference materials, not Paulo
product screenshots. Their original acquisition URLs and a separate redistribution
license were not recorded in this checkout; no ownership or blanket reuse license
is claimed here. Existing attribution is retained.

The mockup helper files `image-slot.js` and `ios-frame.jsx` identify themselves as
copied Omelette starter components; `support.js` identifies itself as generated
from `dc-runtime`. Those provenance comments remain intact. No additional license
for those helper files was present in this checkout.

## Libraries embedded in the standalone mockup

The 2026-10-29 review decoded the standalone HTML manifest: three local helper
scripts, React, React DOM, Babel and nine font subsets. It contains no embedded
photo or audio assets. Preserve the upstream notices below with this artifact.

| Component | Recorded source | Included license |
|---|---|---|
| React 18.3.1 | https://unpkg.com/react@18.3.1/LICENSE | [MIT](licenses/react-MIT.txt) |
| React DOM 18.3.1 | https://unpkg.com/react-dom@18.3.1/LICENSE | [MIT](licenses/react-dom-MIT.txt) |
| Babel standalone 7.29.0 | https://unpkg.com/@babel/standalone@7.29.0/LICENSE | [MIT](licenses/babel-MIT.txt) |
| Baloo 2 | https://raw.githubusercontent.com/google/fonts/main/ofl/baloo2/OFL.txt | [SIL OFL](licenses/baloo2-OFL.txt) |
| Nunito | https://raw.githubusercontent.com/google/fonts/main/ofl/nunito/OFL.txt | [SIL OFL](licenses/nunito-OFL.txt) |

License texts were retrieved from these upstream locations on 2026-10-29. Font
family names come from the embedded CSS; the original export does not record an
exact font revision. The font license snapshots do not establish binary provenance.

## Shipped on the website

| Component | Where | Source | License |
|---|---|---|---|
| Fraunces (variable, Latin subset) | `public/fonts/fraunces-vf.woff2` | Paulo app bundle, `PauloApp/Paulo/Resources/Fraunces-VF.ttf` | [SIL OFL](licenses/fraunces-OFL.txt) |
| Film sound effects | `public/media/paulo-film.mp4` | Freesound: “whoosh.soft.wav” by junggle (CC BY 4.0), “Whoosh Simpler” by original_sound (CC BY 3.0), “BUBBLE POP .wav” by Ch0cchi (CC BY 3.0), “Bubble pop” by daalvinz (CC BY 4.0) | CC BY; credited under the film in `src/components/FilmDialog.astro` |
| Film music | `public/media/paulo-film.mp4` | Generated with Lyria for the App Store preview | — |
