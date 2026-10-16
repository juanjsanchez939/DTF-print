import { test } from 'node:test';
import assert from 'node:assert/strict';
import { escapeRegex } from '../lib/search.js';

test('deja intacto un texto sin caracteres especiales', () => {
  assert.equal(escapeRegex('taza'), 'taza');
  assert.equal(escapeRegex('Bandeja A3 de madera'), 'Bandeja A3 de madera');
});

test('escapa los metacaracteres de regex', () => {
  assert.equal(escapeRegex('('), '\\(');
  assert.equal(escapeRegex('a.b*c'), 'a\\.b\\*c');
  assert.equal(escapeRegex('[x]+?'), '\\[x\\]\\+\\?');
  assert.equal(escapeRegex('a\\b'), 'a\\\\b');
  assert.equal(escapeRegex('$^|{}'), '\\$\\^\\|\\{\\}');
});

test('el patrón resultante siempre compila', () => {
  const entradas = ['(', ')', '[', '*', '+', '?', '\\', '.', 'a(b', '((((', '{2,', '^$', '|'];
  for (const entrada of entradas) {
    assert.doesNotThrow(() => new RegExp(escapeRegex(entrada)), `no compila: ${entrada}`);
  }
});

test('el patrón escapa la búsqueda literal', () => {
  const re = new RegExp(escapeRegex('(pack 60)'), 'i');
  assert.equal(re.test('Posavasos de cartón blanco (pack 60)'), true);
  assert.equal(re.test('Pposavasos'), false);
});
