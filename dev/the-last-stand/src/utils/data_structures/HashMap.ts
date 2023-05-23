//  Nom du fichier : HashMap.ts
//  Contexte : Une structure de données qui permet de stocker des paires clé-valeur.
//  Nom de l'auteur : Jonathan Robinson
//  Autres étudiants : Andrzej Wisniowski
//  Références : https://chat.openai.com/

import DoublyLinkedList from "./DoublyLinkedList";


/**
 * Represents a HashMap data structure.
 */
export default class HashMap<K, V> {

    private _buckets: DoublyLinkedList<[K, V]>[];
    private _size: number;
    private _capacity: number;
    private _loadFactor: number;

    /**
     * Creates a new instance of HashMap.
     * @param capacity - The initial capacity of the HashMap (default: 10).
     * @param loadFactor - The load factor threshold for resizing the HashMap (default: 0.75).
     */
    constructor(capacity: number = 10, loadFactor: number = 0.75) {
        this._buckets = new Array<DoublyLinkedList<[K, V]>>(capacity);
        this._size = 0;
        this._capacity = capacity;
        this._loadFactor = loadFactor;
    }


    /**
     * Gets the current number of key-value pairs in the HashMap.
     */
    get size(): number {
        return this._size;
    }

     /**
     * Gets the current capacity of the HashMap.
     */
    get capacity(): number {
        return this._capacity;
    }

    /**
     * Hashes the provided key to determine the bucket index.
     * @param key - The key to hash.
     * @returns The bucket index for the key.
     */
    private _hash(key: K): number {
        const stringKey = String(key);
        let hash = 0;
        for (let i = 0; i < stringKey.length; i++) {
            const charCode = stringKey.charCodeAt(i);
            hash = (hash << 5) - hash + charCode;
            hash |= 0;
        }
        return Math.abs(hash) % this._capacity;
    }

    /**
     * Resizes the HashMap by doubling its capacity and rehashing all key-value pairs.
     */
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

     /**
     * Sets the value associated with the specified key in the HashMap.
     * @param key - The key.
     * @param value - The value.
     */
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

    /**
     * Retrieves the value associated with the specified key from the HashMap.
     * @param key - The key.
     * @returns The value associated with the key, or null if the key is not found.
     */
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

    /**
     * Deletes the key-value pair associated with the specified key from the HashMap.
     * @param key - The key.
     * @returns True if the key-value pair is found and deleted, false otherwise.
     */
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

    
    /**
     * Returns an iterator that iterates over the key-value pairs in the HashMap.
     * @returns An iterator for key-value pairs in the HashMap.
     */
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

