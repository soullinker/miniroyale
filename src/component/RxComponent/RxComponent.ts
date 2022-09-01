import { Component } from 'react';
import { Observable, Observer, Subscription } from 'rxjs';

class RxComponent<P, S> extends Component<P, S> {
    private subscriptionList: Array<Subscription> = [];

    subscribe<T>(observable: Observable<T>, observer: Partial<Observer<T>>): Subscription {
        const subscription = observable.subscribe(observer);
        this.subscriptionList.push(subscription);

        return subscription;
    }

    componentWillUnmount() {
        this.subscriptionList.forEach((subscription) => subscription.unsubscribe());
    }
}

export default RxComponent;
