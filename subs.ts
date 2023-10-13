import {
  switchMap,
  interval,
  tap,
  Subscription,
} from 'rxjs';

const first$ = interval(1000).pipe(
  tap(() => console.log('first'))
);

const secondObs$ = interval(1000).pipe(
  tap(() => console.log('second'))
);

const worklow$ = first$
  .pipe(
    switchMap(() => secondObs$)
  ).subscribe();


const subs = new Subscription();

subs.add(worklow$);
  

setTimeout(() => {
  subs.unsubscribe();
  console.log('destroyed');
}, 5000);