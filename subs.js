"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const first$ = (0, rxjs_1.interval)(1000).pipe((0, rxjs_1.tap)(() => console.log('first')));
const secondObs$ = (0, rxjs_1.interval)(1000).pipe((0, rxjs_1.tap)(() => console.log('second')));
const worklow$ = first$
    .pipe((0, rxjs_1.switchMap)(() => secondObs$)).subscribe();
const subs = new rxjs_1.Subscription();
subs.add(worklow$);
setTimeout(() => {
    subs.unsubscribe();
    console.log('destroyed');
}, 5000);
