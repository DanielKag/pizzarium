import * as get from 'lodash.get'
import * as isObject from 'lodash.isobject'
import * as isFunction from 'lodash.isfunction'
import * as isEqual from 'lodash.isequal'
import * as range from 'lodash.range'

const newLineSeparator = `\n${range(100).map(x => '=').join('')}\n`;
const YELLOW_COLOR_CONSOLE = '\x1b[33m';
const RED_COLOR_CONSOLE =  '\x1b[31m';
const RESET_CONSOLE = '\x1b[0m';

export const objectHasCycles = (obj: any): boolean => {
    try {
      JSON.stringify(obj);
      return false;
    } catch (e) {
      return e.message.includes('cyclic');
    }
  }

export const generateDiffBetweenObjectsAsMessage = (actualObject: any, expectedObject: any): string => {
    const diffsBetweenActualAndExpected =  diffKeysBetweenObjects(actualObject, expectedObject)
     .map(prop => `${prop} = ${getProp(actualObject, prop)} And should be: ${getProp(expectedObject, prop)}`)
      .join('\n');

    return addLineSeparatorToMessage(diffsBetweenActualAndExpected);
  }

const addLineSeparatorToMessage = msg =>
    msg 
     ? redify(newLineSeparator) + msg + redify(newLineSeparator)
     : ""

const getProp = (obj: any, prop: string): string =>
    yellowify(get<string>(obj, prop));

const yellowify = (text: string) : string =>
    YELLOW_COLOR_CONSOLE + text + RESET_CONSOLE;
  
const redify = (text: string) : string =>
    RED_COLOR_CONSOLE + text + RESET_CONSOLE;

const diffKeysBetweenObjects = (obj1: any, obj2: any, path: string = null): string[] => {
    //const _self: any = this;
    obj1 = obj1 || {};
    obj2 = obj2 || {};

    const union_keys: string[] = Object.keys(obj1)
                                  .concat(Object.keys(obj2)
                                            .filter(key => !obj1.hasOwnProperty || !obj1.hasOwnProperty((key))));
    return union_keys.reduce((result, key) => {
      const value1: any = obj1[key];
      const value2: any = obj2[key];
      const nextPath: string = path ? path + '.' + key : key;

      if (isObject(value1) || isObject(value2)) {
        const diff: string[] = diffKeysBetweenObjects(value1, value2, nextPath);
        return diff.length ? result.concat(diff) : result;
      }
      return isEqual(value1, value2) ? result : result.concat(nextPath);
    }, []);
  }