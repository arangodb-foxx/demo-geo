# demo-geo
A minimalistic Foxx geo example using leaflet.js
![Alt text](/images/geo-screenshot.png?raw=true "Data via Foxx shown via leaflet.js")

# Preparations

First install the foxx service. Then import the needed datasets from `data` folder.

```
./arangoimp restaurants.json --collection restaurants
./arangoimp neighborhoods.json --collection neighborhoods
```

# Usage

Buttons:

* Random restaurant: Draw and point to a random restaurant
* Random neighborhood: Draw and point to a random neighborhood

Click on a drawn neighborhood to also draw all included restaurants.
