import { Component, OnDestroy, OnInit } from '@angular/core';
import { from, Observable, Subscription } from 'rxjs';
import { map, filter, first, find, take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  sub = new Subscription();

  ngOnInit(): void {
    const observable = new Observable((item) => {
      console.log('just have data');
      item.next(1);
      item.next(2);
      item.next(3);
      console.log('end data');
    });

    observable.subscribe((x) => {
      console.log('got value', x);
    });

    console.log('------------Even number--------------');

    from([1, 2, 3, 4, 5, 6, 7, 8])
      .pipe(
        filter((x) => x % 2 === 0) // so chan
      )
      .subscribe((x) => {
        console.log(x); // 2,4,6,8
      });

    // pipe with first() : it will get two propety optional: predicate and defaultvalue
    // if condition -> true -> get value first. else false -> show EmptyError
    console.log('------------First(x > 3)---------------')
    from([1, 2, 3, 4, 5, 6, 7, 8])
      .pipe(
        first((x) => x > 3) // get value first x > 3
      )
      .subscribe((x) => {
        console.log(x);
      });

    // last() : even get 2 propety: predicate and defaultvalue
    // it witll get value last -> complete or show Error when not value


    // find :the same array.prototype.find() of js, find() emmit value first
    console.log('------------------Find(% 5---------------)');
    from([1, 2, 3, 4, 5, 6, 7])
      .pipe(
        find((x) => x % 5 === 0) // % 5
      )
      .subscribe((x) => {
        console.log(x);
      })

    // single() -> just emmit first value. If > 1 value -> false -> show Error

    // take() : nhận vào 1 tham số count để dùng cho số lần lấy giá trị được emit từ Observable sau đó sẽ complete.
    console.log('------------------take()--------------');

    from([1, 2, 3, 4, 5])
      .pipe(
        take(1)
      )
      .subscribe((x) => {
        console.log(x);
      })

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
