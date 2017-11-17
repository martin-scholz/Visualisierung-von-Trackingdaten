var geoJsonLayer = L.geoJson(berlin_bezirke, {
  style: function(feature) {
    switch (feature.properties.name) {
      case 'Mitte':
        return {
          color: "#ff0000"
        };
      case 'Friedrichshain-Kreuzberg':
        return {
          color: "#0000ff"
        };
      case 'Pankow':
        return {
          color: "#ff0000"
        };
      case 'Charlottenburg-Wilmersdorf':
        return {
          color: "#0000ff"
        };
      case 'Spandau':
        return {
          color: "#ff0000"
        };
      case 'Steglitz-Zehlendorf':
        return {
          color: "#0000ff"
        };
      case 'Tempelhof-Schöneberg':
        return {
          color: "#ff0000"
        };
      case 'Neukölln':
        return {
          color: "#0000ff"
        };
      case 'Treptow-Köpenick':
        return {
          color: "#ff0000"
        };
      case 'Marzahn-Hellersdorf':
        return {
          color: "#0000ff"
        };
      case 'Reinickendorf':
        return {
          color: "#0000ff"
        };
      case 'Lichtenberg':
        return {
          color: "#ff0000"
        };

    }
  }
});
