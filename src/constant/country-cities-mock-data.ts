import countriesJson from "./country-cities.json"; // adjust path

// Transform into mockData format
const mockData = Object.entries(countriesJson).map(([country, cities], countryId) => ({
    id: countryId + 1,
    name: country,
    value: country,
    cities: cities.map((city, cityId) => ({
        id: cityId + 1,
        name: city,
        value: city,
    })),
}));

export default mockData;
