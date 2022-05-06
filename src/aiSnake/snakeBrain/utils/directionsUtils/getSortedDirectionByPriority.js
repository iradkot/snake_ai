
const getSortedDirectionByPriority = (directionsMap) => Object.values(directionsMap)?.sort((a,b) => b.priority - a.priority);

export default getSortedDirectionByPriority;
