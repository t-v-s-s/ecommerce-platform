import express from "express";


import {
    getPropertyTypes,
    getPropertyTypeById,
    addPropertyType,
    updatePropertyType,
    deletePropertyType
} from "../controllers/Master/propertyTypeController.js";

import {
    getCities,
    getCityById,
    addCity,
    updateCity,
    deleteCity
} from "../controllers/Master/cityController.js";

import {
    getAreas,
    getAreaById,
    addArea,
    updateArea,
    deleteArea
} from "../controllers/Master/areaController.js";

const router = express.Router();

// Property Type
router.get("/property-type", getPropertyTypes);
router.get("/property-type/:id", getPropertyTypeById);
router.post("/property-type", addPropertyType);
router.put("/property-type/:id", updatePropertyType);
router.delete("/property-type/:id", deletePropertyType);

// City
router.get("/city", getCities);
router.get("/city/:id", getCityById);
router.post("/city", addCity);
router.put("/city/:id", updateCity);
router.delete("/city/:id", deleteCity);

// Area
router.get("/area", getAreas);
router.get("/area/:id", getAreaById);
router.post("/area", addArea);
router.put("/area/:id", updateArea);
router.delete("/area/:id", deleteArea);

export default router;