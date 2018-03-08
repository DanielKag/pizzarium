import * as utils from './utils'
import * as merge from 'lodash.merge'
import * as isFunction from 'lodash.isfunction'
import * as isObject from 'lodash.isobject'

export interface IAction {
    type: string;
    payload?: any;
}

export class TestReducer {
  private reducer: (state: any, action: IAction) => any;
  private baseState: any;
  private initialState: any;
  private actualResult: any;

  constructor (reducer: (state: any, action: IAction) => any, baseState: any = {}) {
    if (!reducer) throw new Error('No reducer supplied to TestReducer');
    if (!isFunction(reducer)) throw new Error('The reducer must be a function');

    this.reducer = reducer;
    this.baseState = baseState;  
  }

  public givenState (initStateDiff: any = {}): TestReducer {
    if(!isObject(initStateDiff)) throw new Error('initState must be an object')
    
    this.initialState = merge({}, this.baseState, initStateDiff);
    Object.freeze(this.initialState);
    
    return this;
  }

  public whenActionIs (action: IAction): TestReducer {
    if (this.initialState === undefined) this.givenState();

    this.actualResult = this.reducer(this.initialState, action);
    if (utils.objectHasCycles(this.actualResult)) throw new Error('Actual state contains cyclic objects\n');
    
    return this;
  }

  public thenStateIs (nextStateDiff: any = {}): boolean {
    if (!this.actualResult) throw new Error('No actual state found. Must call "When" Before calling "Then"');
    
    const expected = merge({}, this.initialState, nextStateDiff);
    if (utils.objectHasCycles(expected)) throw new Error('Expect state contains cyclic objects\n');

    const diff = utils.generateDiffBetweenObjectsAsMessage(this.actualResult, expected);
    if(diff) throw new Error(diff);

    return true;
  }
  
  public thenStateIsExactly (expected: any = {}): boolean {
    if (!this.actualResult) throw new Error('No actual state found. Must call "When" Before calling "Then"');        
    if (utils.objectHasCycles(expected)) throw new Error('Expect state contains cyclic objects\n');

    const diff = utils.generateDiffBetweenObjectsAsMessage(this.actualResult, expected);
    if(diff) throw new Error(diff);

    return true;
  }

  public thenNoChange (): void {
    this.thenStateIs({});
  }
}