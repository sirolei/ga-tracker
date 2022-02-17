/**
 * 生成cid
 * @return string
 * */
import {HitType, SystemInfoType} from "../type";
import HitBuilder from "../core/HitBuilder";
import CampaignParams from "../core/CampaignParams";
import GoogleAnalytics from "../core/GoogleAnalytics";

export function getUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
        function (c: string) {
            const r: number = Math.random() * 16 | 0,
                v: number = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
}

/**
 * 获取getStorageSync方法
 * @return string
 * @param key
 * */
export function getStorageSync(key: string): string | undefined {
    if (!key) return;
    /* eslint-disable */
    // @ts-ignore
    if (typeof uni == 'object' && typeof uni.getStorageSync == 'function') {
        // @ts-ignore
        return uni.getStorageSync(key)
    }

    // @ts-ignore
    if (typeof wx == 'object' && typeof wx.getStorageSync == 'function') {
        // @ts-ignore
        return wx.getStorageSync(key)
    }
    // @ts-ignore
    if (typeof my == 'object' && typeof my.getStorageSync == 'function') {
        // @ts-ignore
        const result = my.getStorageSync({ key: key });
        if (result) {
            return result.data;
        }
        return;
    }
    // @ts-ignore
    if (typeof window == 'object' && typeof window.localStorage == 'object') {
        // @ts-ignore
        return localStorage.getItem(key)
    }
    /* eslint-enable */
}

/**
 * 获取setStorageSync方法
 * @return string
 * @param key
 * @param value
 * */
export function setStorageSync(key: string, value: string) {
    if (!key) return;
    /* eslint-disable */
    // @ts-ignore
    if (typeof uni == 'object' && typeof uni.setStorageSync == 'function') {
        // @ts-ignore
        return uni.setStorageSync(key, value)
    }
    // @ts-ignore
    if (typeof wx == 'object' && typeof wx.setStorageSync == 'function') {
        // @ts-ignore
        return wx.setStorageSync(key, value)
    }

    // @ts-ignore
    if (typeof my == 'object' && typeof my.setStorageSync == 'function' ){
        // @ts-ignore
        const result = my.setStorageSync({ key : key, data:value})
        console.log
        return result;
    }
     // @ts-ignore
    if (typeof window == 'object' && typeof window.localStorage == 'object') {
        // @ts-ignore
        return localStorage.setItem(key, value)
    }

    /* eslint-enable */
}

/**
 * 获取getSystemInfo方法
 * @return object
 * */
export function getSystemInfo(): SystemInfoType {
    /* eslint-disable */
    // @ts-ignore
    if (typeof uni == 'object' && typeof uni.getSystemInfo == 'function') {
        // @ts-ignore
        return uni.getSystemInfoSync()
    }
    // @ts-ignore
    if (typeof wx == 'object' && typeof wx.setStorageSync == 'function'){
        // @ts-ignore
        return wx.getSystemInfoSync()
    }
    // @ts-ignore
    if (typeof my == 'object' && typeof my.setStorageSync == 'function'){
        // @ts-ignore
        return my.getSystemInfoSync()
    }
    /* eslint-enable */

    return {
        brand: "unknown",
        screenWidth: 0,
        screenHeight: 0,
        windowWidth: 0,
        windowHeight: 0,
        pixelRatio: 1,
        language: "zh_CN",
        system: "unknown",
        model: "unknown",
        version: "unknown",
        platform: "unknown",
        fontSizeSetting: 0,
        SDKVersion: "unknown",
    };
}

/**
 * 获取getSystemInfo方法
 * @param options
 * */
export function request(options: object) {
    /* eslint-disable */
    // @ts-ignore
    if (typeof uni == 'object' && typeof uni.getSystemInfo == 'function') {
        // @ts-ignore
        return uni.request(options)
        // @ts-ignore
    } else if (typeof wx == 'object' && typeof wx.getSystemInfo == 'function'){
        // @ts-ignore
        return wx.request(options)
        // @ts-ignore
    }else if (typeof my == 'object' && typeof my.getSystemInfo == 'function'){
        // @ts-ignore
        return my.request(options)
    }
    /* eslint-enable */
}

// 支持Measurement Protocol“&”符号语法
export function hit_param_fix(paramName: string): string {
    return String(paramName).replace(/^&/, '');
}

// 将URL转换为hit
export function parseUtmParams(url: string): HitType {
    const cp = CampaignParams.parseFromUrl(url);
    const map: any = cp.params_map;
    const hit: any = {};
    for (const k in cp.params) {
        hit[map[k]] = cp.params[k];
    }
    return hit;
}

// 删除一些无效的可选参数
export function hit_delete_if(hitBuilder: HitBuilder, paramName: string, condValue: string | number | undefined) {
    if (hitBuilder.hit[paramName] == condValue) {
        delete hitBuilder.hit[paramName];
    }
}

