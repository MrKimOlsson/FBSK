import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Funktion för att skapa anpassade ikoner
const createIcon = (iconHtml, color) => {
  return L.divIcon({
    className: 'custom-icon', // CSS-klass för att styla ikonen
    html: `<div style="font-size: 24px; color: ${color};">${iconHtml}</div>`,
    iconSize: [30, 30], // Anpassa storleken efter behov
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });
};

// Funktion för att generera ikoner som HTML-strängar
const getIconHtml = (icon) => {
  switch (icon) {
    case 'target':
      return '&#x1F3AF;'; // Emoji för måltavla
    case 'grill':
      return '&#x1F525;'; // Emoji för eld (grillplats)
    default:
      return ''; // Standardfall
  }
}

const RouteMap = () => {
  const center = [59.25668277085213, 18.160852111251256];

  const targetLocations = [
    { 
      position: [59.25455750379977, 18.162315466058388], 
      name: 'Måltavla 1', 
      icon: 'target', 
      imageUrl: 'https://via.placeholder.com/150' // Ersätt med verklig bild-URL
    },
    { 
      position: [59.25481578532522, 18.161738068339197], 
      name: 'Måltavla 2', 
      icon: 'target', 
      imageUrl: 'https://via.placeholder.com/150' // Ersätt med verklig bild-URL
    },
    { 
      position: [59.25720724921575, 18.160306154803628], 
      name: 'Grillplats', 
      icon: 'grill', 
      imageUrl: 'https://via.placeholder.com/150' // Ersätt med verklig bild-URL
    },
    // Lägg till fler måltavlor och intressanta punkter här
  ];

  const pathCoordinates = [
    [59.25455750379977, 18.162315466058388], // Startpunkt
    [59.25481578532522, 18.161738068339197], // Nästa punkt
    [59.25546378659275, 18.16163431718801], // Nästa punkt
    // Lägg till fler punkter i stigen
  ];

  return (
    <MapContainer
      center={center}
      zoom={15}
      style={{ height: '100vh', width: '100vw', margin: '0', zIndex: '0', position: 'absolute', left: '0', top: '0', }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {targetLocations.map((location, index) => (
        <Marker 
          key={index} 
          position={location.position} 
          icon={createIcon(getIconHtml(location.icon), location.icon === 'grill' ? 'orange' : 'red')} // Skapa och tilldela ikonen
        >
          <Popup>
            <div>
              <h3>{location.name}</h3>
              <p>Koordinater: {location.position[0]}, {location.position[1]}</p>
              {location.imageUrl && <img src={location.imageUrl} alt={location.name} style={{ width: '100px', height: 'auto' }} />}
            </div>
          </Popup>
        </Marker>
      ))}

      <Polyline positions={pathCoordinates} color="blue" />
    </MapContainer>
  );
};

// Gör en default export för RouteMap-komponenten
export default RouteMap;




// import React from 'react';
// import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';

// // Funktion för att skapa anpassade ikoner
// const createIcon = (iconHtml, color) => {
//   return L.divIcon({
//     className: 'custom-icon', // CSS-klass för att styla ikonen
//     html: `<div style="font-size: 24px; color: ${color};">${iconHtml}</div>`,
//     iconSize: [30, 30], // Anpassa storleken efter behov
//     iconAnchor: [15, 30],
//     popupAnchor: [0, -30],
//   });
// };

// // Funktion för att generera ikoner som HTML-strängar
// const getIconHtml = (icon) => {
//   switch (icon) {
//     case 'target':
//       return '&#x1F3AF;'; // Emoji för måltavla
//     case 'grill':
//       return '&#x1F525;'; // Emoji för eld (grillplats)
//     default:
//       return ''; // Standardfall
//   }
// }

// const RouteMap = () => {
//   const center = [59.25668277085213, 18.160852111251256];

//   const targetLocations = [
//     { position: [59.25455750379977, 18.162315466058388], name: 'Måltavla 1', icon: 'target' },
//     { position: [59.25481578532522, 18.161738068339197], name: 'Måltavla 2', icon: 'target' },

//     // Grillplats
//     { position: [59.25720724921575, 18.160306154803628], name: 'Grillplats', icon: 'grill' },
//     // Lägg till fler måltavlor och intressanta punkter här
//   ];

//   const pathCoordinates = [
//     [59.25455750379977, 18.162315466058388], // Startpunkt
//     [59.25481578532522, 18.161738068339197], // Nästa punkt
//     [59.25546378659275, 18.16163431718801], // Nästa punkt
//     // Lägg till fler punkter i stigen
//   ];

//   return (
//     <MapContainer
//       center={center}
//       zoom={15}
//       style={{ height: '100vh', width: '100vw', margin: '0', zIndex: '0', position: 'absolute', left: '0' }}
//     >
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />

//       {targetLocations.map((location, index) => (
//         <Marker 
//           key={index} 
//           position={location.position} 
//           icon={createIcon(getIconHtml(location.icon), location.icon === 'grill' ? 'orange' : 'red')} // Skapa och tilldela ikonen
//         >
//           <Popup>{location.name}</Popup>
//         </Marker>
//       ))}

//       <Polyline positions={pathCoordinates} color="blue" />
//     </MapContainer>
//   );
// };

// // Gör en default export för RouteMap-komponenten
// export default RouteMap;
