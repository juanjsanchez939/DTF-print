import { test } from 'node:test';
import assert from 'node:assert/strict';
import { clampQty } from '../src/lib/qty.js';

// clampQty(value, stock) -> entero, mínimo 1, nunca mayor al stock (0 si no hay stock).

test('recorta la cantidad al stock disponible', () => {
  assert.equal(clampQty(16, 12), 12);
});

test('sube a 1 una cantidad menor a 1', () => {
  assert.equal(clampQty(0, 12), 1);
  assert.equal(clampQty(-3, 12), 1);
});

test('devuelve 0 si el producto no tiene stock', () => {
  assert.equal(clampQty(2, 0), 0);
});

test('devuelve enteros', () => {
  assert.equal(clampQty(2.7, 5), 2);
});

test('acepta strings numéricos', () => {
  assert.equal(clampQty('4', 5), 4);
});

test('no recorta cuando el stock es desconocido', () => {
  assert.equal(clampQty(37, undefined), 37);
});
