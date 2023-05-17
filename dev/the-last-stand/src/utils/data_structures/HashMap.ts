import DoublyLinkedList from "./DoublyLinkedList";



export default class HashMap<K, V> {

    private _buckets: DoublyLinkedList<[K, V]>[];
    private _size: number;
    private _capacity: number;
    private _loadFactor: number;


    constructor(capacity: number = 10, loadFactor: number = 0.75) {
        this._buckets = new Array<DoublyLinkedList<[K, V]>>(capacity);
        this._size = 0;
        this._capacity = capacity;
        this._loadFactor = loadFactor;
    }


    private _hash(key: K): number {
        const stringKey = String(key);
        let hash = 0;
        for (let i = 0; i < stringKey.length; i++) {
            const charCode = stringKey.charCodeAt(i);
            hash = (hash << 5) - hash + charCode;
            hash |= 0;
        }
        return hash % this._capacity;
    }

    private _resize(): void {
        const oldBuckets = this._buckets;
        this._capacity *= 2;
        this._buckets = new Array<DoublyLinkedList<[K, V]>>(this._capacity);
        this._size = 0;
        for (let i = 0; i < oldBuckets.length; i++) {
            let currentNode = oldBuckets[i]?.head;
            while (currentNode) {
                this.set(currentNode.data[0], currentNode.data[1]);
                currentNode = currentNode.next;
            }
        }
    }

    set(key: K, value: V): void {
        const index = this._hash(key)
        if (!this._buckets[index]) {
            this._buckets[index] = new DoublyLinkedList<[K, V]>();
        } else {
            for (let currentNode of this._buckets[index]) {
                if (currentNode.data[0] === key) {
                    currentNode.data[1] = value;
                    return;
                }
            }
        }
        this._buckets[index].addLast([key, value]);
        this._size++;
        if (this._size / this._capacity > this._loadFactor) {
            this._resize();
        }
    }

    get(key: K): V | null {
        const index = this._hash(key);
        const bucket = this._buckets[index];
        if (!bucket || bucket.size === 0) {
            return null;
        }
        for (let currentNode of bucket) {
            if (currentNode.data[0] === key) {
                return currentNode.data[1];
            }
        }
        return null;
    }

    delete(key: K): boolean {
        const index = this._hash(key);
        const bucket = this._buckets[index];
        if (!bucket || bucket.size === 0) {
            return false;
        }
        for (let currentNode of bucket) {
            if (currentNode.data[0] === key) {
                bucket.remove(currentNode);
                this._size--;
                return true;
            }
        }
        return false;
    }

    *[Symbol.iterator](): Iterator<[K, V]> {
        for (let i = 0; i < this._buckets.length; i++) {
            if (this._buckets[i]) {
                for (let currentNode of this._buckets[i]) {
                    yield currentNode.data;
                }
            }
        }
    }
}

