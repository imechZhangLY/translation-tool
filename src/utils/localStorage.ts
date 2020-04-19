/**
 * @file 读写localStorage操作
 * @author zhangluyao
 */
import {hashCode} from './hashCode';
const key1 = 'originText';

export const setLocalStorage = (value: string) => {
    localStorage.setItem(key1, value)
}

export const getLocalStorage = () => {
    return localStorage.getItem(key1);
}

interface TranslateTextStorageItem {
    hash: number,
    text: string[]
}

const key2 = 'translateText';
export const saveTranslateTextToLocalStorage = (text: string[]) => {
    const originText = localStorage.getItem(key1);

    if (!originText) {
        return;
    }

    const hash = hashCode(originText);

    const translateTextStorageStr = localStorage.getItem(key2);
    let translateTextStorage: TranslateTextStorageItem[] = [];

    try {
        translateTextStorage = JSON.parse(translateTextStorageStr) || [];
    }
    catch (error) {}
    finally {
        const targetItem = translateTextStorage.find(item => item.hash === hash);

        targetItem ? targetItem.text = text : translateTextStorage.push({hash, text});

        // 最多保留5项
        if (translateTextStorage.length > 5) {
            translateTextStorage.shift();
        }

        localStorage.setItem(key2, JSON.stringify(translateTextStorage));
    }
}

export const getTranslateTextFromLocalStorage = (): string[] => {
    const originText = localStorage.getItem(key1);

    if (!originText) {
        return [];
    }

    const hash = hashCode(originText);

    const translateTextStorageStr = localStorage.getItem(key2);
    let translateTextStorage: TranslateTextStorageItem[] = [];
    let targetItem: TranslateTextStorageItem;

    try {
        translateTextStorage = JSON.parse(translateTextStorageStr);
        targetItem = translateTextStorage.find(item => item.hash === hash)
    }
    catch (error) {}
    finally {
        return targetItem ? targetItem.text : [];
    }
}
