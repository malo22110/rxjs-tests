"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const destroyed$ = new rxjs_1.Subject();
destroyed$.asObservable().subscribe(() => console.log('destroy emited'));
const first$ = (0, rxjs_1.interval)(1000).pipe((0, rxjs_1.tap)(() => console.log('first')));
const secondObs$ = (0, rxjs_1.interval)(1000).pipe((0, rxjs_1.tap)(() => console.log('second')));
first$
    .pipe((0, rxjs_1.takeUntil)(destroyed$), (0, rxjs_1.switchMap)(() => secondObs$)).subscribe();
setTimeout(() => {
    destroyed$.next();
    destroyed$.complete();
    console.log('destroyed');
}, 5000);
