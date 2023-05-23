import {test, expect } from 'vitest'

import DoublyLinkedListNode from './DoublyLinkedListNode'

// Test with numbers
test('should create node with correct number data', () => {
    const node = new DoublyLinkedListNode<number>(5)
    expect(node.data).toBe(5)
})

test('should allow setting number data', () => {
    const node = new DoublyLinkedListNode<number>(5)
    node.data = 10
    expect(node.data).toBe(10)
})

// Test with strings
test('should create node with correct string data', () => {
    const node = new DoublyLinkedListNode<string>('test')
    expect(node.data).toBe('test')
})

test('should allow setting string data', () => {
    const node = new DoublyLinkedListNode<string>('test')
    node.data = 'newTest'
    expect(node.data).toBe('newTest')
})

// Test with objects
test('should create node with correct object data', () => {
    const node = new DoublyLinkedListNode<object>({key: 'value'})
    expect(node.data).toEqual({key: 'value'})
})

test('should allow setting object data', () => {
    const node = new DoublyLinkedListNode<object>({key: 'value'})
    node.data = {newKey: 'newValue'}
    expect(node.data).toEqual({newKey: 'newValue'})
})

// Test with arrays
test('should create node with correct array data', () => {
    const node = new DoublyLinkedListNode<Array<number>>([1, 2, 3])
    expect(node.data).toEqual([1, 2, 3])
})

test('should allow setting array data', () => {
    const node = new DoublyLinkedListNode<Array<number>>([1, 2, 3])
    node.data = [4, 5, 6]
    expect(node.data).toEqual([4, 5, 6])
})

// Test next and prev properties with different types of data
test('should allow setting next and prev with different types of data', () => {
    const node = new DoublyLinkedListNode<number>(5)
    const node2 = new DoublyLinkedListNode<number>(10)
    node.next = node2
    node2.prev = node
    expect(node.next).toBe(node2)
    expect(node2.prev).toBe(node)

    const node3 = new DoublyLinkedListNode<string>('test')
    const node4 = new DoublyLinkedListNode<string>('newTest')
    node3.next = node4
    node4.prev = node3
    expect(node3.next).toBe(node4)
    expect(node4.prev).toBe(node3)

    const node5 = new DoublyLinkedListNode<object>({key: 'value'})
    const node6 = new DoublyLinkedListNode<object>({newKey: 'newValue'})
    node5.next = node6
    node6.prev = node5
    expect(node5.next).toBe(node6)
    expect(node6.prev).toBe(node5)
})
test('should initialize next and prev as null', () => {
    const node = new DoublyLinkedListNode<number>(5)
    expect(node.next).toBeNull()
    expect(node.prev).toBeNull()
})
test('should update next and prev when linked node is removed', () => {
    const node1 = new DoublyLinkedListNode<number>(1)
    const node2 = new DoublyLinkedListNode<number>(2)
    const node3 = new DoublyLinkedListNode<number>(3)
    
    node1.next = node2
    node2.prev = node1
    node2.next = node3
    node3.prev = node2

    // delete node2
    node1.next = node3
    node3.prev = node1

    expect(node1.next).toBe(node3)
    expect(node3.prev).toBe(node1)
})
test('should exist independently', () => {
    const node = new DoublyLinkedListNode<number>(5)
    expect(node.data).toBe(5)
    expect(node.next).toBeNull()
    expect(node.prev).toBeNull()
})



