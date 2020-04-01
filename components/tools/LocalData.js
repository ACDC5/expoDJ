import * as SecureStore from 'expo-secure-store';

class DeviceStorage{
    static get(key) {
        return SecureStore.getItemAsync(key).then((value) => {
          const jsonValue = JSON.parse(value);
          return jsonValue;
        });
    }

    static save(key,value) {
        try {
            return SecureStore.setItemAsync(key,JSON.stringify(value));
        } catch (error) {
            console.log("保存数据出错" + error);
        }
    }

    // static update(key,value) {
    //     return DeviceStorage.get(key).then((item) => {
    //         value = typeof value === 'string' ? value : Object.assign({},item,value);
    //         return AsyncStorage.setItem(key,JSON.stringify(value));
    //     });
    // }

    static delete(key) {
        return SecureStore.deleteItemAsync(key)
    }
};

export default DeviceStorage;
