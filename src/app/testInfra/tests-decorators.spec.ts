import { Type } from '@angular/core';

class TestCallback {
    constructor(public expectation: string, public assertionTypeFunction: any,
                public assertion: (done: DoneFn) => void, public timeout?: number) {}
}

let beforeEachCallBack: (done: DoneFn) => void, beforeEachTimeout: number,
    afterEachCallBack: (done: DoneFn) => void, afterEachTimeout: number,
    beforeAllCallBack: (done: DoneFn) => void, beforeAllTimeout: number,
    afterAllCallBack: (done: DoneFn) => void, afterAllTimeout: number;

const testCallbacks: TestCallback[] = [];

type MethodDecoratorFunction = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;

export function TestClass(constructor: { new(): any }): void {
    describe(constructor.name, () => {
        if (beforeAllCallBack) {
            beforeAll(beforeAllCallBack, beforeAllTimeout);
        }

        if (afterAllCallBack) {
            afterAll(afterAllCallBack, afterAllTimeout);
        }
        if (beforeEachCallBack) {
            beforeEach(beforeEachCallBack, beforeEachTimeout);
        }

        if (afterEachCallBack) {
            afterEach(afterEachCallBack, afterEachTimeout);
        }

        testCallbacks.forEach((callback: TestCallback) => {
            callback.assertionTypeFunction(callback.expectation, callback.assertion, callback.timeout);
        });
    });
}

export function TestCase(expectation: string, ...args: any[]): MethodDecoratorFunction {
    return testCaseReturnFunction(expectation, args, it);
}

export function fTestCase(expectation: string, ...args: any[]): MethodDecoratorFunction {
    return testCaseReturnFunction(expectation, args, fit);
}

export function xTestCase(expectation: string, ...args: any[]): MethodDecoratorFunction {
    return testCaseReturnFunction(expectation, args, xit);
}

export function Test(expectation: string): MethodDecoratorFunction {
    return testReturnFunction(expectation, it);
}

export function fTest(expectation: string): MethodDecoratorFunction {
    return testReturnFunction(expectation, fit);
}

export function xTest(expectation: string): MethodDecoratorFunction  {
    return testReturnFunction(expectation, xit);
}

export function BeforeEach(timeout?: number): MethodDecoratorFunction  {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
        beforeEachCallBack = descriptor.value;
        beforeEachTimeout = timeout;
    };
}

export function AfterEach(timeout?: number): MethodDecoratorFunction {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
        afterEachCallBack = descriptor.value;
        afterEachTimeout  = timeout;
    };
}

export function BeforeAll(timeout?: number): MethodDecoratorFunction  {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
        beforeAllCallBack = descriptor.value;
        beforeAllTimeout = timeout;
    };
}

export function AfterAll(timeout?: number): MethodDecoratorFunction  {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
        afterAllCallBack = descriptor.value;
        afterAllTimeout  = timeout;
    };
}

export function TestHelperMethod(): MethodDecoratorFunction {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
        target.constructor[propertyKey] = descriptor.value;
    };
}

function testCaseReturnFunction(
    expectation: string,
    args: any[],
    checkFunction: (expectation: string, assertion?: (done: DoneFn) => void, timeout?: number) => void): MethodDecoratorFunction {

    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
        const method = descriptor.value;
        testCallbacks.push(new TestCallback(expectation, checkFunction, () => {method.apply(target.constructor, args); }));
    };
}

function testReturnFunction(
    expectation: string,
    checkFunction: (expectation: string, assertion?: (done: DoneFn) => void, timeout?: number) => void): MethodDecoratorFunction {

    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
        const method = descriptor.value;
        testCallbacks.push(new TestCallback(expectation, checkFunction, method.bind(target.constructor)));
    };
}
