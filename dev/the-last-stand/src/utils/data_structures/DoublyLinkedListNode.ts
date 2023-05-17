/**
 * Represents a node in a doubly linked list.
 */
export default class DoublyLinkedListNode<T> {
    private _data: T;
    private _prev: DoublyLinkedListNode<T> | null;
    private _next: DoublyLinkedListNode<T> | null;
    private _key : T | null;

    /**
     * Creates a new instance of DoublyLinkedListNode.
     * @param data The data value to be stored in the node.
     */
    constructor(data: T) {
        this._data = data;
        this._prev = null;
        this._next = null;
        this._key = null;
    }

    /**
     * Gets the data value stored in the node.
     */
    get data(): T {
        return this._data;
    }

    /**
     * Sets the data value stored in the node.
     * @param data The data value to be stored in the node.
     */
    set data(data: T) {
        this._data = data;
    }

    /**
     * Gets the next node in the doubly linked list.
     */
    get next(): DoublyLinkedListNode<T> | null {
        return this._next;
    }

    /**
     * Gets the key value stored in the node.
     */
    get key(): T | null {
        return this._key;
    }

    /**
     * Sets the key value stored in the node.
     */
    set key(key: T | null) {
        this._key = key;
    }

    /**
     * Sets the next node in the doubly linked list.
     * @param node the data value to be stored in the node.
     */
    set next(node: DoublyLinkedListNode<T> | null) {
        this._next = node;
    }

    /**
     * Gets the previous node in the doubly linked list.
     */
    get prev(): DoublyLinkedListNode<T> | null {
        return this._prev;
    }

    /**
     * Sets the previous node in the doubly linked list.
     * @param node the data value to be stored in the node.
     */
    set prev(node: DoublyLinkedListNode<T> | null) {
        this._prev = node;
    }
}