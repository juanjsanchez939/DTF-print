import { test } from 'node:test';
import assert from 'node:assert/strict';
import { addItem, setItemQty } from '../src/lib/cart.js';

const prod = (extra = {}) => ({ id: '01', name: 'Taza', price: 1000, image: '/products/01.webp', stock: 12, ...extra });

test('agrega un producto nuevo con la cantidad pedida', () => {
  const items = addItem([], prod(), 3);
  assert.equal(items.length, 1);
  assert.equal(items[0].quantity, 3);
});

test('fusiona la cantidad si el producto ya está en el carrito', () => {
  const items = addItem(addItem([], prod(), 2), prod(), 3);
  assert.equal(items.length, 1);
  assert.equal(items[0].quantity, 5);
});

test('nunca supera el stock del producto', () => {
  const items = addItem([], prod(), 20);
  assert.equal(items[0].quantity, 12);
});

test('nunca supera el stock al fusionar', () => {
  const items = addItem(addItem([], prod(), 10), prod(), 5);
  assert.equal(items[0].quantity, 12);
});

test('no agrega productos sin stock', () => {
  assert.deepEqual(addItem([], prod({ stock: 0 }), 1), []);
});

test('guarda el stock en la línea del carrito', () => {
  assert.equal(addItem([], prod(), 1)[0].stock, 12);
});

test('no toca las otras líneas del carrito', () => {
  const otro = { id: '02', name: 'Vaso', price: 500, image: '', stock: 5, quantity: 2 };
  const items = addItem([otro], prod(), 1);
  assert.equal(items[0].quantity, 2);
  assert.equal(items[1].id, '01');
});

test('devuelve el mismo array cuando la cantidad ya está en el tope del stock', () => {
  const items = addItem([], prod(), 12);
  assert.equal(addItem(items, prod(), 1), items);
});

test('devuelve otro array cuando sí agrega', () => {
  const items = addItem([], prod(), 1);
  assert.notEqual(addItem(items, prod(), 1), items);
});

test('setItemQty recorta al stock de la línea', () => {
  const items = addItem([], prod(), 1);
  assert.equal(setItemQty(items, '01', 20)[0].quantity, 12);
});

test('setItemQty elimina la línea con cantidad 0', () => {
  assert.deepEqual(setItemQty(addItem([], prod(), 1), '01', 0), []);
});

test('setItemQty deja pasar la cantidad válida', () => {
  assert.equal(setItemQty(addItem([], prod(), 1), '01', 4)[0].quantity, 4);
});

test('setItemQty no recorta si la línea no trae stock', () => {
  const items = [{ id: '09', quantity: 1 }];
  assert.equal(setItemQty(items, '09', 30)[0].quantity, 30);
});

test('setItemQty devuelve el mismo array si la cantidad no cambia', () => {
  const items = addItem([], prod(), 4);
  assert.equal(setItemQty(items, '01', 4), items);
});

test('setItemQty ignora un id que no está en el carrito', () => {
  const items = addItem([], prod(), 1);
  assert.equal(setItemQty(items, 'zzz', 5), items);
});
