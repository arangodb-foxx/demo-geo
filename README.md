# demo-geo
A minimalistic Foxx geo example using leaflet.js

# Preparations

To use the foxx service, please import the needed datasets from `data` folder.
```
./arangoimp restaurants.json --collection restaurants
./arangoimp neighborhoods.json --collection neighborhoods
```

# Usage

Buttons:

* Random restaurant: Draw and point to a random restaurant
* Random neighborhood: Draw and point to a random neighborhood

Click on a drawn neighborhood to also draw all included restaurants.
