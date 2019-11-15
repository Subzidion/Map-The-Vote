export const config = {
    options: [
        {
            value: "seattle_neighborhoods",
            label: "Neighborhoods"
        },
        {
            value: "seattle_council_districts",
            label: "Districts"
        },
        {
            value: "washington_counties",
            label: "Counties"
        }
    ],
    seattle_neighborhoods: {
        geometry_source: "https://opendata.arcgis.com/datasets/b76cdd45f7b54f2a96c5e97f2dda3408_2.geojson",
        colors: {},
        label: "Neighborhood",
        identifier: "S_HOOD"
    },
    seattle_council_districts: {
        geometry_source: "https://opendata.arcgis.com/datasets/f14766ecd6274702bd786b214cb916e7_0.geojson",
        colors: {
            "1": "#440000",
            "2": "#004400",
            "3": "#000044",
            "4": "#444400",
            "5": "#440044",
            "6": "#004444",
            "7": "#444444"
        },
        label: "District",
        identifier: "C_DISTRICT"
    },
    washington_counties: {
        geometry_source: "https://opendata.arcgis.com/datasets/12712f465fc44fb58328c6e0255ca27e_11.geojson",
        colors:  {},
        label: "",
        identifier: "JURISDICT_NM"
    },
};