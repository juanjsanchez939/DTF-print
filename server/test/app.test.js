import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createApp } from '../app.js';
import { setInMemory } from '../routes/api.js';

// Sin MongoDB: las rutas de la API responden con el seed en memoria.
setInMemory(true);

const DIST_HTML = '<!doctype html><html><body><div id="root">DIST_MARKER</div></body></html>';

function fakeDist({ withIndex = true } = {}) {
  const dir = mkdtempSync(join(tmpdir(), 'dtf-dist-'));
  if (withIndex) writeFileSync(join(dir, 'index.html'), DIST_HTML);
  return dir;
}

async function withServer(clientDist, fn) {
  const server = createApp({ clientDist }).listen(0);
  const base = `http://127.0.0.1:${server.address().port}`;
  try {
    await fn(base);
  } finally {
    server.close();
  }
}

test('sirve el cliente compilado en la raíz', async () => {
  const dir = fakeDist();
  try {
    await withServer(dir, async (base) => {
      const res = await fetch(`${base}/`);
      assert.equal(res.status, 200);
      assert.match(res.headers.get('content-type'), /text\/html/);
      assert.match(await res.text(), /DIST_MARKER/);
    });
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('devuelve el index del SPA en rutas desconocidas', async () => {
  const dir = fakeDist();
  try {
    await withServer(dir, async (base) => {
      const res = await fetch(`${base}/catalogo/taza-01`);
      assert.equal(res.status, 200);
      assert.match(await res.text(), /DIST_MARKER/);
    });
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('el fallback del SPA no se come las rutas de la API', async () => {
  const dir = fakeDist();
  try {
    await withServer(dir, async (base) => {
      const res = await fetch(`${base}/api/no-existe`);
      assert.equal(res.status, 404);
      assert.doesNotMatch(await res.text(), /DIST_MARKER/);
    });
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('la API sigue respondiendo con el cliente compilado presente', async () => {
  const dir = fakeDist();
  try {
    await withServer(dir, async (base) => {
      const health = await fetch(`${base}/api/health`);
      assert.equal(health.status, 200);
      assert.deepEqual(await health.json(), { ok: true });

      const products = await fetch(`${base}/api/products`);
      assert.equal(products.status, 200);
      assert.equal((await products.json()).length, 24);
    });
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('sirve las imágenes de productos', async () => {
  await withServer(fakeDist(), async (base) => {
    const res = await fetch(`${base}/products/01.webp`);
    assert.equal(res.status, 200);
    assert.match(res.headers.get('content-type'), /image\/webp/);
  });
});

test('sin build del cliente no sirve la raíz (y no rompe)', async () => {
  const dir = fakeDist({ withIndex: false });
  try {
    await withServer(dir, async (base) => {
      const root = await fetch(`${base}/`);
      assert.equal(root.status, 404);
      const health = await fetch(`${base}/api/health`);
      assert.equal(health.status, 200);
    });
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
