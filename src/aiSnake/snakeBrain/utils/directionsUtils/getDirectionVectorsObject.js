import cloneDeep from "lodash/cloneDeep";
import {DIRECTIONS_STRINGS, DIRECTIONS_VECTORS_MAP} from "../../../variables/DIRECTIONS";


/**
 *

 * @return {directionVectorsObject} directionVectorsObject
 */
const getDirectionVectorsObject = () => {
    const newDirectionsMap = cloneDeep(DIRECTIONS_VECTORS_MAP);
    // add priority to all vectors
    const formattedDirectionsMap = Object.entries(newDirectionsMap).reduce(function (directionVectorsMap, directionVectorsPair) {
        const [key, value] = directionVectorsPair;
        directionVectorsMap[key] = {...value, priority: 0, key: key};
        return directionVectorsMap;
    }, newDirectionsMap);
    // noinspection JSValidateTypes
    return formattedDirectionsMap;
}

export default getDirectionVectorsObject
