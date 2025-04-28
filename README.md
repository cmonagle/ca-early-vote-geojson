# Repository Archived

Early voting for the 2025 Canadian election has concluded. This repository is now archived and will no longer be updated.

Le vote d'avance pour l'élection canadienne de 2025 est terminé. Ce repo est maintenant archivé et ne sera plus mis à jour.

# Bureaux d'Élections Canada / Election Canada Offices

This repo contains a script (`index.ts`) that runs every night (around 1am) on a GitHub action. It fetches early vote locations from [Elections Canada](https://elections.ca) and converts the office locations to the GeoJSON format.

Ce repo contient un script (`index.ts`) qui s'exécute chaque nuit à 1h ET via une action GitHub. Il récupère les lieux de vote anticipé auprès d'[Élections Canada](https://elections.ca) et convertit les emplacements des bureaux au format GeoJSON.


## Avertissement / A Warning

Please note: the data included here may be out of date, or incorrect. All data belongs to Elections Canada. If you intend to use this data to provide information to voters, make sure to *always* direct them to Elections Canada directly.

À noter : les données ici peuvent être obsolètes ou erronées. Toutes les données appartiennent à Élections Canada. Si vous souhaitez les utiliser pour informer les électeurs, assurez-vous de les rediriger toujours vers Élections Canada pour confirmer.

## Les données / Accessing the data

With the above caveats, you can access the GeoJSON files directly from Github:

Avec les avertissements ci-dessus, vous pouvez accéder aux fichiers GeoJSON directement depuis Github :

- [Canada](https://cmonagle.github.io/ca-early-vote-geojson/early-vote-locations/canada.geojson)
- [Alberta](https://cmonagle.github.io/ca-early-vote-geojson/early-vote-locations/AB.geojson)
- [British Columbia](https://cmonagle.github.io/ca-early-vote-geojson/early-vote-locations/BC.geojson)
- [Manitoba](https://cmonagle.github.io/ca-early-vote-geojson/early-vote-locations/MB.geojson)
- [New Brunswick](https://cmonagle.github.io/ca-early-vote-geojson/early-vote-locations/NB.geojson)
- [Newfoundland and Labrador](https://cmonagle.github.io/ca-early-vote-geojson/early-vote-locations/NL.geojson)
- [Nova Scotia](https://cmonagle.github.io/ca-early-vote-geojson/early-vote-locations/NS.geojson)
- [Northwest Territories](https://cmonagle.github.io/ca-early-vote-geojson/early-vote-locations/NT.geojson)
- [Nunavut](https://cmonagle.github.io/ca-early-vote-geojson/early-vote-locations/NU.geojson)
- [Ontario](https://cmonagle.github.io/ca-early-vote-geojson/early-vote-locations/ON.geojson)
- [Prince Edward Island](https://cmonagle.github.io/ca-early-vote-geojson/early-vote-locations/PE.geojson)
- [Québec](https://cmonagle.github.io/ca-early-vote-geojson/early-vote-locations/QC.geojson)
- [Saskatchewan](https://cmonagle.github.io/ca-early-vote-geojson/early-vote-locations/SK.geojson)
- [Yukon](https://cmonagle.github.io/ca-early-vote-geojson/early-vote-locations/YT.geojson)
