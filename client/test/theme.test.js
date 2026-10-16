import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolveInitialTheme } from '../src/lib/theme.js';

// resolveInitialTheme(stored, prefersDark) -> 'dark' | 'light'

test('respeta el tema guardado por el usuario', () => {
  assert.equal(resolveInitialTheme('dark', false), 'dark');
  assert.equal(resolveInitialTheme('light', true), 'light');
});

test('usa la preferencia del sistema si no hay tema guardado', () => {
  assert.equal(resolveInitialTheme(null, true), 'dark');
  assert.equal(resolveInitialTheme(null, false), 'light');
});

test('ignora valores inválidos y cae a la preferencia del sistema', () => {
  assert.equal(resolveInitialTheme('basura', true), 'dark');
  assert.equal(resolveInitialTheme(undefined, false), 'light');
});
