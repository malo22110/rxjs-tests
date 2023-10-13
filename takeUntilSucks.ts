import {
  Subject,
  switchMap,
  interval,
  tap,
  takeUntil,
} from 'rxjs';

const destroyed$ = new Subject<void>();
destroyed$.asObservable().subscribe(() => console.log('destroy emited'))

const first$ = interval(1000).pipe(
  tap(() => console.log('first'))
);

const secondObs$ = interval(1000).pipe(
  tap(() => console.log('second'))
);

first$
  .pipe(
    takeUntil(destroyed$),
    switchMap(() => secondObs$)
  ).subscribe();

  

setTimeout(() => {
  destroyed$.next();
  destroyed$.complete();
  console.log('destroyed');
}, 5000);