import DoublyLinkedListNode from "./DoublyLinkedListNode";


/**
 * Represents a doubly linked list.
 * @template T - The type of elements stored in the list.
 * @implements {Iterator<DoublyLinkedListNode<T>>}
 */
export default class DoublyLinkedList<T> {
    private _head: DoublyLinkedListNode<T> | null;
    private _tail: DoublyLinkedListNode<T> | null;
    private _size: number;

    /**
     * Creates a new instance of DoublyLinkedList.
     */
    constructor() {
        this._head = null;
        this._tail = null;
        this._size = 0;
    }

    get head (): DoublyLinkedListNode<T> | null {
        return this._head;
    }

    set head(node: DoublyLinkedListNode<T> | null) {
        this._head = node;
    }

    get tail (): DoublyLinkedListNode<T> | null {
        return this._tail;
    }

    set tail(node: DoublyLinkedListNode<T> | null) {
        this._tail = node;
    }

    get size (): number {
        return this._size;
    }

    set size(size: number) {
        this._size = size;
    }


    /**
     * Checks if the linked list is empty.
     * @returns True if the linked list is empty, false otherwise.
     */
    public isEmpty(): boolean {
        return this._size === 0;
    }

    /**
   * Returns an iterator for iterating over the linked list.
   * @returns An iterator for the linked list.
   */
    public [Symbol.iterator](): Iterator<DoublyLinkedListNode<T>> {
        return new DoublyLinkedListIterator<T>(this._head);
    }

    /**
    * Finds the first node containing the specified data in the linked list.
    * @param data - The data to search for.
    * @returns The node containing the data, or null if not found.
    */
    public find(data: T): DoublyLinkedListNode<T> | null {

        for (const node of this) {
            if (node.data === data) {
                return node;
            }
        }
        return null;
    }

    /**
     * Swaps the positions of two nodes in the linked list based on their indices.
     * @param index1 - The index of the first node.
     * @param index2 - The index of the second node.
     * @returns True if the nodes were successfully swapped, false otherwise.
     */
    public swapNodes(index1: number, index2: number): boolean {
        if (index1 < 0 || index1 >= this._size || index2 < 0 || index2 >= this._size || index1 === index2) {
            return false;
        }

        // Ensure that index1 <= index2
        if (index1 > index2) {
            [index1, index2] = [index2, index1];
        }

        const node1 = this.getNodeAt(index1);
        const node2 = this.getNodeAt(index2);

        if (!node1 || !node2) {
            return false;
        }

        // Next and previous nodes for node1 and node2
        const prev1 = node1.prev;
        const prev2 = node2.prev;
        const next1 = node1.next;
        const next2 = node2.next;

        // Handle node1
        if (prev1) {
            prev1.next = node2;
        } else {
            this._head = node2;
        }
        if (next1) {
            next1.prev = node2;
        } else {
            this._tail = node2;
        }

        // Handle node2
        if (prev2) {
            if (prev2 !== node1) {
                prev2.next = node1;
            }
        } else {
            this._head = node1;
        }
        if (next2) {
            if (next2 !== node1) {
                next2.prev = node1;
            }
        } else {
            this._tail = node1;
        }

        // Swap the nodes
        if (node1.next === node2) {
            // node1 and node2 are adjacent
            node1.next = node2.next;
            node2.prev = node1.prev;
            node1.prev = node2;
            node2.next = node1;
        } else {
            // node1 and node2 are not adjacent
            node1.next = node2.next;
            node1.prev = node2.prev;
            node2.next = next1;
            node2.prev = prev1;
        }

        return true;
    }


    /**
     * Retrieves an array of nodes that contain the specified value.
     * @param data - The value to search for.
     * @returns An array of nodes that contain the specified value.
     */
    public getNodesWithValue(data: T): T[] {
        const nodesList = [];
        for (const node of this) {
            if (node.data === data) {
                nodesList.push(node.data);
            }
        }
        return nodesList;
    }

    /**
     * Adds a new node with the specified data at the beginning of the linked list.
     * @param data - The data to be stored in the new node.
     * @returns A boolean indicating whether the operation was successful.
     */
    public addFirst(data: T): boolean {
        const newNode = new DoublyLinkedListNode<T>(data);

        if (this.isEmpty()) {
            this._head = newNode;
            this._tail = newNode;
        } else {
            newNode.next = this._head;
            this._head!.prev = newNode;
            this._head = newNode;
        }
        ++this._size;
        return true;
    }

    /**
 * Adds a new node with the specified data at the end of the linked list.
 * @param data - The data to be stored in the new node.
 * @returns A boolean indicating whether the operation was successful.
 */
    public addLast(data: T): boolean {
        const newNode = new DoublyLinkedListNode<T>(data);

        if (this.isEmpty()) {
            this._head = newNode;
            this._tail = newNode;
        } else {
            newNode.prev = this._tail;
            this._tail!.next = newNode;
            this._tail = newNode;
        }
        ++this._size;
        return true;
    }

    /**
 * Removes the first node from the linked list and returns its data.
 * @returns The data of the removed node, or null if the linked list is empty.
 */
    public removeFirst(): T | null {
        if (this.isEmpty()) {
            return null;
        }
        const removedNode = this._head;
        if (this.size=== 1) {
            this._head = null;
            this._tail = null;
        } else {
            this._head = this._head!.next;
            this._head!.prev = null;
            removedNode!.next = null;
        }
        --this._size;
        return removedNode!.data;
    }

    /**
     * Removes the last node from the linked list and returns its data.
     * @returns The data of the removed node, or null if the linked list is empty.
     */
    public removeLast(): T | null {
        if (this.isEmpty()) {
            return null;
        }
        const removedNode = this._tail;
        if (this.size === 1) {
            this._head = null;
            this._tail = null;
        } else {
            this._tail = this._tail!.prev;
            this._tail!.next = null;
            removedNode!.prev = null;
        }
        --this._size;
        return removedNode!.data;
    }

    /**
 * Inserts a new node with the specified data at the given index in the linked list.
 * @param index - The index at which to insert the new node.
 * @param data - The data to be stored in the new node.
 * @returns A boolean indicating whether the operation was successful.
 */
    public insertAt(index: number, data: T): boolean {
        if (index < 0 || index > this._size) {
            return false
        }

        if (index === 0) {
            return this.addFirst(data)
        }

        if (index === this._size) {
            return this.addLast(data)
        }

        const node = new DoublyLinkedListNode<T>(data)
        const current = this.getNodeAt(index)
        const prev = current!.prev

        node.prev = prev
        node.next = current
        current!.prev = node
        prev!.next = node
        ++this._size

        return true
    }


    /**
 * Removes the node at the given index from the linked list and returns its data.
 * @param index - The index of the node to remove.
 * @returns The data of the removed node, or null if the index is out of bounds.
 */

    public removeAt(index: number): T | null {
        if (index < 0 || index >= this._size) {
            return null
        }

        let current = this.getNodeAt(index)
        const prev = current!.prev
        const next = current!.next

        if (current === this._head) {
            this._head = next
        } else {
            prev!.next = next
            current!.prev = null
        }

        if (current === this._tail) {
            this._tail = prev
        } else {
            next!.prev = prev
            current!.next = null
        }

        --this._size
        return current!.data
    }

    /**
 * Returns the index of the first occurrence of the specified data in the linked list.
 * @param data - The data to search for.
 * @returns The index of the first occurrence of the data, or -1 if the data is not found.
 */
    public indexOf(data: T): number {
        let index = 0;

        for (const node of this) {
            if (node.data === data) {
                return index;
            }
            ++index;
        }
        return -1;
    }

    /**
 * Checks whether the linked list contains the specified data.
 * @param data - The data to check for.
 * @returns A boolean indicating whether the data is present in the linked list.
 */

    public contains(data: T): boolean {
        return this.indexOf(data) !== -1;
    }

    /**
 * Converts the linked list to an array.
 * @returns An array containing the elements of the linked list in the same order.
 */
    public toArray(): T[] {
        const result: T[] = [];

        this.forEach((data) => {
            result.push(data);
        });
        return result;
    }

    /**
 * Removes the first occurrence of the specified data from the linked list.
 * @param data - The node to remove.
 * @returns A boolean indicating whether the data was successfully removed.
 */
    public remove(node: DoublyLinkedListNode<T>): void {
        if (node.prev) {
            node.prev.next = node.next;
        } else {
            this._head = node.next;
        }
    
        if (node.next) {
            node.next.prev = node.prev;
        } else {
            this._tail = node.prev;
        }
    
        node.prev = null;
        node.next = null;
        this._size--;
    }
    

    /**
     * Returns the _head node of the linked list.
     * @returns The _head node or null if the linked list is empty.
     */
    public getHead(): DoublyLinkedListNode<T> | null {
        return this._head;
    }

    /**
 * Returns the _tail node of the linked list.
 * @returns The _tail node or null if the linked list is empty.
 */
    public getTail(): DoublyLinkedListNode<T> | null {
        return this._tail;
    }

    /**
 * Returns the node at the specified index in the linked list.
 * @param index - The index of the node to retrieve.
 * @returns The node at the specified index or null if the index is out of bounds.
 */
    public getNodeAt(index: number): DoublyLinkedListNode<T> | null {
        if (index < 0 || index >= this._size) {
            return null;
        }
        let current: DoublyLinkedListNode<T> | null;
        if (index <= this._size / 2) {
            current = this._head;
            for (let i = 0; i < index; i++) {
                current = current!.next;
            }
        } else {
            current = this._tail;
            for (let i = this._size - 1; i > index; i--) {
                current = current!.prev;
            }
        }
        return current;
    }

    /**
 * Reverses the order of nodes in the linked list.
 * If the linked list is empty or contains only one node, no changes are made.
 */
    public reverse(): void {
        if (this._size <= 1) {
            return;
        }

        let current = this._head;
        this._head = this._tail;
        this._tail = current;

        while (current) {
            const next = current.next;
            current.next = current.prev;
            current.prev = next;
            current = next;
        }
    }

    /**
 * Shuffles the order of nodes in the linked list randomly.
 * If the linked list is empty or contains only one node, no changes are made.
 */
    public shuffle(): void {
        // Convert the linked list to an array of nodes
        let arr: DoublyLinkedListNode<T>[] = [];
        for (let node = this._head; node !== null; node = node.next) {
            arr.push(node);
        }

        // Shuffle the array using the Fisher-Yates shuffle algorithm
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }

        // Reconstruct the list with the shuffled nodes
        this._head = arr[0];
        this._tail = arr[arr.length - 1];
        this._head.prev = null;
        this._tail.next = null;

        for (let i = 1; i < arr.length; i++) {
            arr[i].prev = arr[i - 1];
            arr[i - 1].next = arr[i];
        }
    }

    /**
 * Executes a provided callback function once for each node in the linked list.
 * The callback function receives the node's data value and its index as arguments.
 *
 * @param callback - A function to be called for each node. It accepts the data value and index as arguments.
 */
    public forEach(callback: (data: T, index: number) => void): void {
        let index = 0;
        for (const node of this) {
            callback(node.data, index);
            index++;
        }
    }

    /**
 * Executes a provided callback function once for each node in the linked list in reverse order.
 * The callback function receives the node's data value and its index as arguments.
 *
 * @param callback - A function to be called for each node in reverse order. It accepts the data value and index as arguments.
 */
    public forEachReverse(callback: (data: T, index: number) => void): void {
        let index = this._size - 1;
        const reverseIterator = new DoublyLinkedListReverseIterator(this._tail!);
        for (const node of reverseIterator) {
            callback(node.data, index);
            index--;
        }
    }

    /**
 * Removes all nodes from the linked list, leaving it empty.
 */
    public clear(): void {
        for (const node of this) {
            node.prev = null;
            node.next = null;
        }
        this._head = null;
        this._tail = null;
        this._size = 0;
    }

    /**
 * Creates a new linked list containing nodes that pass the provided filtering condition.
 *
 * @param predicate - A filtering function that accepts the value and index of each node and returns a boolean indicating whether the node should be included in the new list.
 * @returns A new DoublyLinkedList instance containing the filtered nodes.
 */
    public filter(predicate: (value: T, index: number) => boolean): DoublyLinkedList<T> {
        const newList = new DoublyLinkedList<T>()

        this.forEach((value, index) => {
            if (predicate(value, index)) {
                newList.addLast(value)
            }
        })
        return newList
    }

    /**
 * Creates a new linked list by applying a transformation function to each node in the original list.
 *
 * @param callback - A transformation function that accepts the value and index of each node and returns a new value.
 * @returns A new DoublyLinkedList instance containing the transformed nodes.
 */
    public map<U>(callback: (value: T, index: number) => U): DoublyLinkedList<U> {
        const newList = new DoublyLinkedList<U>()

        this.forEach((value, index) => {
            newList.addLast(callback(value, index))
        })
        return newList
    }

    /**
 * Reduces the linked list to a single value by applying a reducer function to each node.
 *
 * @param callback - A reducer function that accepts an accumulator, the value of each node, and its index, and returns a new accumulator value.
 * @param initialValue - The initial value of the accumulator.
 * @returns The final value of the accumulator after applying the reducer function to each node.
 */
    public reduce<U>(callback: (accumulator: U, value: T, index: number) => U, initialValue: U): U {
        let accumulator = initialValue

        this.forEach((value, index) => {
            accumulator = callback(accumulator, value, index)
        })
        return accumulator
    }

    /**
 * Checks if at least one node in the linked list satisfies the provided condition.
 *
 * @param predicate - A condition function that accepts the value and index of each node and returns a boolean value.
 * @returns `true` if at least one node satisfies the condition, `false` otherwise.
 */
    public some(predicate: (value: T, index: number) => boolean): boolean {
        let index = 0
        for (const node of this) {
            if (predicate(node.data, index)) {
                return true
            }
            index++
        }
        return false
    }

    /**
 * Checks if all nodes in the linked list satisfy the provided condition.
 *
 * @param predicate - A condition function that accepts the value and index of each node and returns a boolean value.
 * @returns `true` if all nodes satisfy the condition, `false` otherwise.
 */
    public every(predicate: (value: T, index: number) => boolean): boolean {
        let index = 0
        for (const node of this) {
            if (!predicate(node.data, index)) {
                return false
            }
            index++
        }
        return true
    }
}


class DoublyLinkedListIterator<T> implements Iterator<DoublyLinkedListNode<T>> {
    private current: DoublyLinkedListNode<T> | null;

    constructor(startNode: DoublyLinkedListNode<T> | null) {
        this.current = startNode;
    }

    public next(): IteratorResult<DoublyLinkedListNode<T>> {
        if (this.current) {
            const value = this.current;
            this.current = this.current.next;
            return { done: false, value };
        } else {
            return { done: true, value: null };
        }
    }
}

class DoublyLinkedListReverseIterator<T> implements IterableIterator<DoublyLinkedListNode<T>> {
    private current: DoublyLinkedListNode<T> | null;

     /**
   * Creates a new iterator starting from the specified node.
   *
   * @param startNode - The node to start iterating from.
   */
    constructor(startNode: DoublyLinkedListNode<T>) {
        this.current = startNode;
    }

    /**
   * Returns the next node in the iteration.
   *
   * @returns An IteratorResult object containing the next node in the iteration sequence.
   *          The `done` property is `true` if the end of the iteration is reached, otherwise `false`.
   *          The `value` property contains the current node value.
   */

    public next(): IteratorResult<DoublyLinkedListNode<T>> {
        if (this.current === null) {
            return { done: true, value: null };
        }

        const value = this.current;
        this.current = this.current.prev;

        return { done: false, value: value };
    }

    [Symbol.iterator](): IterableIterator<DoublyLinkedListNode<T>> {
        return this;
    }
}

