import EncryptedStorage from 'react-native-encrypted-storage';

export async function storeData(itemName, itemData) {
    try {
        await EncryptedStorage.setItem(
            itemName,
            itemData
        );
    } catch (error) {
        alert('Unexpected error');
    }
}

export async function getData(itemName) {
    try {
        const session = await EncryptedStorage.getItem(itemName);

        if (session !== undefined) {
            return session;
        }
    } catch (error) {
        alert('Unexpected error');
    }
}