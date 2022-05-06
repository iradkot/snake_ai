import KeyCodes from "../../../utils/KeyCodes";

const getKeyPressEventByKeyName = (key) => {
    return ({
        keyCode: KeyCodes[key]
    });
}
export default getKeyPressEventByKeyName;
