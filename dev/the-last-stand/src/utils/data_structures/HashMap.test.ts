//  Nom du fichier : HashMap.test.ts
//  Contexte : un fichier de test pour la structure de données HashMap
//  Nom de l'auteur : Jonathan Robinson
//  Autres étudiants : Andrzej Wisniowski
//  Références : https://chat.openai.com/ - https://vitest.dev/

import { describe, test, expect  } from 'vitest';
import HashMap from './HashMap';

describe('HashMap', () => {
    test('should set and get values', () => {
        const map = new HashMap<string, number>();

        map.set('apple', 1);
        map.set('banana', 2);
        map.set('cherry', 3);

        expect(map.get('apple')).toBe(1);
        expect(map.get('banana')).toBe(2);
        expect(map.get('cherry')).toBe(3);
    });

    test('should overwrite existing value for the same key', () => {
        const map = new HashMap<string, number>();

        map.set('apple', 1);
        map.set('banana', 2);
        map.set('apple', 3);

        expect(map.get('apple')).toBe(3);
        expect(map.get('banana')).toBe(2);
    });

    test('should handle collisions', () => {
        const map = new HashMap<string, number>(3 , 0.5);

        map.set('apple', 1);
        map.set('papel', 2); // collision with 'apple'
        map.set('banana', 3);

        expect(map.get('apple')).toBe(1);
        expect(map.get('papel')).toBe(2);
        expect(map.get('banana')).toBe(3);
    });

    test('should delete values', () => {
        const map = new HashMap<string, number>();

        map.set('apple', 1);
        map.set('banana', 2);
        map.set('cherry', 3);

        expect(map.delete('apple')).toBe(true);
        expect(map.delete('banana')).toBe(true);
        expect(map.delete('nonexistent')).toBe(false);

        expect(map.get('apple')).toBe(null);
        expect(map.get('banana')).toBe(null);
        expect(map.get('cherry')).toBe(3);
    });

    test('should iterate over key-value pairs', () => {
        const map = new HashMap<string, number>();

        map.set('apple', 1);
        map.set('banana', 2);
        map.set('cherry', 3);

        const entries = [...map];

        // expect(entries.length).toBe(3);
        expect(entries).toContainEqual(['apple', 1]);
        expect(entries).toContainEqual(['banana', 2]);
        expect(entries).toContainEqual(['cherry', 3]);
    });

    test('should handle resizing', () => {
        const map = new HashMap<number, number>(3, 0.5);

        // Initially, the capacity is 3
        expect(map.capacity).toBe(3);

        // Adding 2 key-value pairs should trigger a resize to a capacity of 6
        map.set(1, 10);
        map.set(2, 20);
        expect(map.capacity).toBe(6);

        // Adding another key-value pair should not trigger a resize
        map.set(3, 30);
        map.set(4, 40);
        expect(map.capacity).toBe(12);

        // Check if all values are retrievable after resizing
        expect(map.get(1)).toBe(10);
        expect(map.get(2)).toBe(20);
        expect(map.get(3)).toBe(30);
        expect(map.get(4)).toBe(40);
    });

    test('should handle empty map', () => {
        const map = new HashMap<string, number>();

        expect(map.get('apple')).toBe(null);
        expect(map.delete('apple')).toBe(false);

        const entries = [...map];
        expect(entries.length).toBe(0);
    });
});
