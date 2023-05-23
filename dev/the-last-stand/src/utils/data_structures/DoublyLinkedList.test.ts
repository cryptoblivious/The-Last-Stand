import {test, expect } from 'vitest'

import DoublyLinkedList from './DoublyLinkedList'
import DoublyLinkedListNode from './DoublyLinkedListNode'

test('should create an empty linked list', () => {
    const list = new DoublyLinkedList<number>()
    expect(list.size).toBe(0)
    expect(list.isEmpty()).toBe(true)
})

test('should properly get and set head and tail', () => {
    const list = new DoublyLinkedList<number>()
    const node = new DoublyLinkedListNode<number>(5)
    list.head = node
    list.tail = node
    expect(list.head).toBe(node)
    expect(list.tail).toBe(node)
})

test('should find a node in the list', () => {
    const list = new DoublyLinkedList<number>()
    const node = new DoublyLinkedListNode<number>(5)
    list.head = node
    list.tail = node
    list.size = 1
    expect(list.find(5)).toBe(node)
    expect(list.find(10)).toBeNull()
})

test('should iterate over the list', () => {
    const list = new DoublyLinkedList<number>()
    const node1 = new DoublyLinkedListNode<number>(5)
    const node2 = new DoublyLinkedListNode<number>(10)
    node1.next = node2
    node2.prev = node1
    list.head = node1
    list.tail = node2
    list.size = 2
    let sum = 0
    for (let node of list) {
        sum += node.data
    }
    expect(sum).toBe(15)
})

test('should swap nodes in the list', () => {
    const list = new DoublyLinkedList<number>()
    const node1 = new DoublyLinkedListNode<number>(5)
    const node2 = new DoublyLinkedListNode<number>(10)
    node1.next = node2
    node2.prev = node1
    list.head = node1
    list.tail = node2
    list.size = 2
    expect(list.swapNodes(0, 1)).toBe(true)
    expect(list.head).toBe(node2)
    expect(list.tail).toBe(node1)
    expect(list.swapNodes(0, 0)).toBe(false)
    expect(list.swapNodes(-1, 1)).toBe(false)
    expect(list.swapNodes(0, 2)).toBe(false)
})

test('should get nodes with value', () => {
    const list = new DoublyLinkedList<number>()
    list.addLast(5)
    list.addLast(10)
    list.addLast(5)
    expect(list.getNodesWithValue(5)).toEqual([5, 5])
    expect(list.getNodesWithValue(10)).toEqual([10])
    expect(list.getNodesWithValue(15)).toEqual([])
})

test('should add first node', () => {
    const list = new DoublyLinkedList<number>()
    expect(list.addFirst(5)).toBe(true)
    expect(list.head?.data).toBe(5)
    expect(list.tail?.data).toBe(5)
    list.addFirst(10)
    expect(list.head?.data).toBe(10)
    expect(list.tail?.data).toBe(5)
})

test('should add last node', () => {
    const list = new DoublyLinkedList<number>()
    expect(list.addLast(5)).toBe(true)
    expect(list.head?.data).toBe(5)
    expect(list.tail?.data).toBe(5)
    list.addLast(10)
    expect(list.head?.data).toBe(5)
    expect(list.tail?.data).toBe(10)
})

test('should remove first node', () => {
    const list = new DoublyLinkedList<number>()
    list.addLast(5)
    list.addLast(10)
    expect(list.removeFirst()).toBe(5)
    expect(list.head?.data).toBe(10)
    expect(list.removeFirst()).toBe(10)
    expect(list.head).toBeNull()
    expect(list.removeFirst()).toBeNull()
})

test('should remove last node', () => {
    const list = new DoublyLinkedList<number>()
    list.addLast(5)
    list.addLast(10)
    expect(list.removeLast()).toBe(10)
    expect(list.tail?.data).toBe(5)
    expect(list.removeLast()).toBe(5)
    expect(list.tail).toBeNull()
    expect(list.removeLast()).toBeNull()
})

test('should insert node at given index', () => {
    const list = new DoublyLinkedList<number>()
    expect(list.insertAt(0, 5)).toBe(true)
    expect(list.insertAt(1, 10)).toBe(true)
    expect(list.insertAt(1, 15)).toBe(true)
    expect(list.insertAt(10, 20)).toBe(false)
})

test('should remove node at given index', () => {
    const list = new DoublyLinkedList<number>()
    list.addLast(5)
    list.addLast(10)
    expect(list.removeAt(0)).toBe(5)
    expect(list.removeAt(0)).toBe(10)
    expect(list.removeAt(0)).toBeNull()
})

test('should return index of first occurrence', () => {
    const list = new DoublyLinkedList<number>()
    list.addLast(5)
    list.addLast(10)
    list.addLast(5)
    expect(list.indexOf(5)).toBe(0)
    expect(list.indexOf(10)).toBe(1)
    expect(list.indexOf(15)).toBe(-1)
})

test('should check if contains data', () => {
    const list = new DoublyLinkedList<number>()
    list.addLast(5)
    expect(list.contains(5)).toBe(true)
    expect(list.contains(10)).toBe(false)
})

test('should convert to array', () => {
    const list = new DoublyLinkedList<number>()
    list.addLast(5)
    list.addLast(10)
    expect(list.toArray()).toEqual([5, 10])
})

test('should remove a node', () => {
    const list = new DoublyLinkedList<number>()
    list.addLast(5)
    list.addLast(10)
    const node = list.find(10) // Assumes that findNodeWithValue returns a node with the given value.
    if (node) {
        list.remove(node)
    }
    expect(list.contains(10)).toBe(false)
})


test('should reverse linked list', () => {
    const list = new DoublyLinkedList<number>()
    list.addLast(5)
    list.addLast(10)
    list.reverse()
    expect(list.toArray()).toEqual([10, 5])
})

test('should get node at index', () => {
    const list = new DoublyLinkedList<number>()
    list.addLast(5)
    list.addLast(10)
    list.addLast(15)
    expect(list.getNodeAt(0)?.data).toBe(5)
    expect(list.getNodeAt(1)?.data).toBe(10)
    expect(list.getNodeAt(2)?.data).toBe(15)
    expect(list.getNodeAt(3)).toBeNull()
})

test('should get head and tail', () => {
    const list = new DoublyLinkedList<number>()
    list.addLast(5)
    list.addLast(10)
    expect(list.getHead()?.data).toBe(5)
    expect(list.getTail()?.data).toBe(10)
    list.addFirst(0)
    list.addLast(15)
    expect(list.getHead()?.data).toBe(0)
    expect(list.getTail()?.data).toBe(15)
})

test('should shuffle the list', () => {
    const list = new DoublyLinkedList<number>();
    for(let i = 0; i < 10; i++){
        list.addLast(i);
    }
    list.shuffle();
    const arrayBefore = list.toArray();
    list.shuffle();
    const arrayAfter = list.toArray();
    expect(arrayBefore).not.toEqual(arrayAfter);
});

test('should clear the list', () => {
    const list = new DoublyLinkedList<number>();
    list.addLast(5);
    list.addLast(10);
    list.clear();
    expect(list.size).toBe(0);
});

test('should filter the list', () => {
    const list = new DoublyLinkedList<number>();
    list.addLast(5);
    list.addLast(10);
    const filteredList = list.filter((value, index) => value > 5);
    expect(filteredList.size).toBe(1);
});

test('should map the list', () => {
    const list = new DoublyLinkedList<number>();
    list.addLast(5);
    list.addLast(10);
    const mappedList = list.map((value, index) => value * 2);
    expect(mappedList.toArray()).toEqual([10, 20]);
});

test('should reduce the list', () => {
    const list = new DoublyLinkedList<number>();
    list.addLast(5);
    list.addLast(10);
    const reducedValue = list.reduce((acc, value, index) => acc + value, 0);
    expect(reducedValue).toBe(15);
});

test('should return true if some values satisfy the condition', () => {
    const list = new DoublyLinkedList<number>();
    list.addLast(5);
    list.addLast(10);
    const someResult = list.some((value, index) => value > 7);
    expect(someResult).toBe(true);
});

test('should return false if not all values satisfy the condition', () => {
    const list = new DoublyLinkedList<number>();
    list.addLast(5);
    list.addLast(10);
    const everyResult = list.every((value, index) => value > 7);
    expect(everyResult).toBe(false);
});
