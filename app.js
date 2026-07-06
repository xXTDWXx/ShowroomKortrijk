(() => {
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const STORAGE_KEY = 'showroom-bouwer-kortrijk-v1';
  const svg = document.getElementById('plan');
  const board = document.getElementById('board');
  const itemsLayer = document.getElementById('items');
  const selectionLayer = svgEl('g', { id: 'selectionLayer' });
  const catalog = document.getElementById('catalog');
  const selectedTitle = document.getElementById('selectedTitle');
  const selectedMeta = document.getElementById('selectedMeta');
  const rotateLeftBtn = document.getElementById('rotateLeftBtn');
  const rotateRightBtn = document.getElementById('rotateRightBtn');
  const copyBtn = document.getElementById('copyBtn');
  const deleteBtn = document.getElementById('deleteBtn');
  const clearBtn = document.getElementById('clearBtn');
  const savePngBtn = document.getElementById('savePngBtn');

  const colors = {
    infra: 'var(--infra)',
    hc: 'var(--hc)',
    classic: 'var(--classic)',
    barrel: 'url(#wood)',
    spa: 'url(#spaWater)',
    hottub: 'url(#wood)',
    canopy: 'rgba(111, 127, 141, 0.12)',
    grass: 'url(#grass)'
  };

  const products = [
    { id: 'infra-160', group: 'Infra4Health', name: '160 glass front', dims: '160 x 120 x 195 cm', w: 1.60, d: 1.20, h: 1.95, kind: 'rect', color: 'infra', glass: 'left' },
    { id: 'infra-130', group: 'Infra4Health', name: '130 glass front', dims: '130 x 120 x 195 cm', w: 1.30, d: 1.20, h: 1.95, kind: 'rect', color: 'infra', glass: 'left' },
    { id: 'infra-corner-160', group: 'Infra4Health', name: '160 hoek cabine', dims: '160 x 160 x 200 cm', w: 1.60, d: 1.60, h: 2.00, kind: 'corner', color: 'infra', glass: 'angled' },
    { id: 'i150', group: 'Infra4Health', name: 'i150', dims: '150 x 110 x 200 cm', w: 1.50, d: 1.10, h: 2.00, kind: 'rect', color: 'infra', glass: 'left' },
    { id: 'i120', group: 'Infra4Health', name: 'i120', dims: '120 x 110 x 200 cm', w: 1.20, d: 1.10, h: 2.00, kind: 'rect', color: 'infra', glass: 'left' },
    { id: 'i100', group: 'Infra4Health', name: 'i100', dims: '100 x 100 x 200 cm', w: 1.00, d: 1.00, h: 2.00, kind: 'rect', color: 'infra', glass: 'left' },
    { id: 'hc-90', group: 'Health Company', name: 'HC 90', dims: '90 x 90 x 200 cm', w: 0.90, d: 0.90, h: 2.00, kind: 'rect', color: 'hc', glass: 'left' },
    { id: 'hc-110', group: 'Health Company', name: 'HC 110', dims: '110 x 100 x 200 cm', w: 1.10, d: 1.00, h: 2.00, kind: 'rect', color: 'hc', glass: 'left' },
    { id: 'hc-150', group: 'Health Company', name: 'HC 150', dims: '150 x 100 x 200 cm', w: 1.50, d: 1.00, h: 2.00, kind: 'rect', color: 'hc', glass: 'left' },
    { id: '9101c', group: 'Health Company', name: '9101C', dims: '100 x 90 x 190 cm', w: 1.00, d: 0.90, h: 1.90, kind: 'rect', color: 'hc', glass: 'left' },
    { id: 'discovery', group: 'Finse sauna\'s', name: 'Discovery sauna', dims: '206 x 205 x 204 cm', w: 2.06, d: 2.05, h: 2.04, kind: 'rect', color: 'classic', glass: 'right' },
    { id: 'finse', group: 'Finse sauna\'s', name: 'Traditionele Finse sauna', dims: '200 x 175 x 190 cm', w: 2.00, d: 1.75, h: 1.90, kind: 'rect', color: 'classic', glass: 'right' },
    { id: 'chaleur', group: 'Finse sauna\'s', name: 'Chaleur sauna', dims: '220 x 120 x 200 cm', w: 2.20, d: 1.20, h: 2.00, kind: 'rect', color: 'classic', glass: 'right' },
    { id: 'icombi', group: 'Combi sauna', name: 'Infra4Health iCombi', dims: '220 x 200 x 210 cm', w: 2.20, d: 2.00, h: 2.10, kind: 'rect', color: 'infra', glass: 'left' },
    { id: 'trad-combi-small', group: 'Combi sauna', name: 'Traditionele kleine combi', dims: '180 x 140 cm', w: 1.80, d: 1.40, kind: 'rect', color: 'classic', glass: 'right' },
    { id: 'tr230', group: 'Barrels', name: 'TR230 Halfglas', dims: '230 diep, diam. 185, h 205 cm', w: 1.85, d: 2.30, h: 2.05, kind: 'barrel', color: 'barrel' },
    { id: 'tr300', group: 'Barrels', name: 'TR300 Halfglas', dims: '286 diep, diam. 214, h 230 cm', w: 2.14, d: 2.86, h: 2.30, kind: 'barrel', color: 'barrel' },
    { id: 'alicante', group: 'Zwemspa\'s', name: 'Zwemspa Alicante', dims: '594 x 228 x 137 cm', w: 2.28, d: 5.94, h: 1.37, kind: 'spa', color: 'spa' },
    { id: 'a7l', group: 'Bullfrog', name: 'Bullfrog A7L', dims: '224 x 224 cm', w: 2.24, d: 2.24, kind: 'spa', color: 'spa' },
    { id: 'moraira', group: 'Spa\'s', name: 'Moraira', dims: 'ELT1600-2CL | 160 x 213 cm', w: 1.60, d: 2.13, kind: 'spa', color: 'spa' },
    { id: 'granada', group: 'Spa\'s', name: 'Granada', dims: 'ELT2000-2CL | 200 x 200 cm', w: 2.00, d: 2.00, kind: 'spa', color: 'spa' },
    { id: 'formentera', group: 'Spa\'s', name: 'Formentera', dims: 'ELT2100-2CL | 213 x 213 cm', w: 2.13, d: 2.13, kind: 'spa', color: 'spa' },
    { id: 'majorca', group: 'Spa\'s', name: 'Majorca', dims: 'ELT2600-2CL | 227 x 227 cm', w: 2.27, d: 2.27, kind: 'spa', color: 'spa' },
    { id: 'denia', group: 'Spa\'s', name: 'Denia', dims: 'ELT2600-2CL | 227 x 227 cm', w: 2.27, d: 2.27, kind: 'spa', color: 'spa' },
    { id: 'majesty', group: 'Spa\'s', name: 'MAJESTY', dims: 'BUK1600-2CL | 160 x 213 cm', w: 1.60, d: 2.13, kind: 'spa', color: 'spa' },
    { id: 'angora', group: 'Spa\'s', name: 'ANGORA', dims: 'BUK2000-2CL | 200 x 200 cm', w: 2.00, d: 2.00, kind: 'spa', color: 'spa' },
    { id: 'classic-spa', group: 'Spa\'s', name: 'CLASSIC', dims: 'BUK2100-2CL | 213 x 213 cm', w: 2.13, d: 2.13, kind: 'spa', color: 'spa' },
    { id: 'dynasty', group: 'Spa\'s', name: 'DYNASTY', dims: 'BUK2600-2CL | 228 x 228 cm', w: 2.28, d: 2.28, kind: 'spa', color: 'spa' },
    { id: 'discovery-spa', group: 'Spa\'s', name: 'DISCOVERY', dims: 'BUK2500-2CL | 227 x 227 cm', w: 2.27, d: 2.27, kind: 'spa', color: 'spa' },
    { id: 'gold-line', group: 'Spa\'s', name: 'GOLD LINE', dims: 'CP2000-2CL | 200 x 200 cm', w: 2.00, d: 2.00, kind: 'spa', color: 'spa' },
    { id: 'aquavera', group: 'Spa\'s', name: 'AQUAVERA', dims: 'BJ2000 + CIRC | 200 x 200 cm', w: 2.00, d: 2.00, kind: 'spa', color: 'spa' },
    { id: 'python', group: 'Spa\'s', name: 'Python hottub spa', dims: 'diam. 203 cm, h 90 cm', w: 2.03, d: 2.03, h: 0.90, kind: 'circle', color: 'hottub' },
    { id: 'canopy-3x6', group: 'Overkappingen', name: 'Overkapping 3 x 6 m', dims: '300 x 600 cm', w: 3.00, d: 6.00, kind: 'canopy', color: 'canopy' },
    { id: 'canopy-4x4', group: 'Overkappingen', name: 'Overkapping 4 x 4 m', dims: '400 x 400 cm', w: 4.00, d: 4.00, kind: 'canopy', color: 'canopy' },
    { id: 'grass-4x4', group: 'Overkappingen', name: 'Kunstgras bodem 4 x 4 m', dims: '400 x 400 cm', w: 4.00, d: 4.00, kind: 'grass', color: 'grass' }
  ];

  let placed = load();
  let selectedIds = new Set();
  let dragState = null;

  svg.appendChild(selectionLayer);

  renderCatalog();
  renderItems();
  updateSelection();

  catalog.addEventListener('dragstart', (event) => {
    const card = event.target.closest('.product');
    if (!card) return;
    event.dataTransfer.setData('text/plain', card.dataset.productId);
    event.dataTransfer.effectAllowed = 'copy';
  });

  board.addEventListener('dragover', (event) => {
    event.preventDefault();
    board.classList.add('drag-target');
    event.dataTransfer.dropEffect = 'copy';
  });

  board.addEventListener('dragleave', () => {
    board.classList.remove('drag-target');
  });

  board.addEventListener('drop', (event) => {
    event.preventDefault();
    board.classList.remove('drag-target');
    const productId = event.dataTransfer.getData('text/plain');
    const point = clientToSvg(event.clientX, event.clientY);
    addProduct(productId, point.x, point.y);
  });

  svg.addEventListener('pointerdown', (event) => {
    if (event.button !== 0) return;
    const group = event.target.closest('[data-item-id]');
    if (!group) {
      const point = clientToSvg(event.clientX, event.clientY);
      dragState = {
        type: 'select',
        startX: point.x,
        startY: point.y,
        currentX: point.x,
        currentY: point.y,
        moved: false,
        rect: svgEl('rect', { class: 'marquee-selection', x: point.x, y: point.y, width: 0, height: 0 })
      };
      selectionLayer.appendChild(dragState.rect);
      svg.setPointerCapture(event.pointerId);
      return;
    }
    event.preventDefault();
    const item = placed.find((entry) => entry.uid === group.dataset.itemId);
    if (!item) return;

    if (event.shiftKey) {
      if (selectedIds.has(item.uid)) selectedIds.delete(item.uid);
      else selectedIds.add(item.uid);
    } else if (!selectedIds.has(item.uid)) {
      selectedIds = new Set([item.uid]);
    }
    updateSelection();
    renderItems();
    const point = clientToSvg(event.clientX, event.clientY);
    dragState = {
      type: 'move',
      ids: [...selectedIds],
      startX: point.x,
      startY: point.y,
      originals: [...selectedIds].map((id) => {
        const selected = placed.find((entry) => entry.uid === id);
        return selected ? { id, x: selected.x, y: selected.y } : null;
      }).filter(Boolean)
    };
    svg.setPointerCapture(event.pointerId);
  });

  svg.addEventListener('pointermove', (event) => {
    if (!dragState) return;
    const point = clientToSvg(event.clientX, event.clientY);
    const dx = point.x - dragState.startX;
    const dy = point.y - dragState.startY;

    if (dragState.type === 'select') {
      dragState.currentX = point.x;
      dragState.currentY = point.y;
      dragState.moved = dragState.moved || Math.abs(dx) > 0.05 || Math.abs(dy) > 0.05;
      updateMarquee(dragState);
      if (dragState.moved) {
        selectedIds = idsInRect(rectFromPoints(dragState.startX, dragState.startY, point.x, point.y));
        renderItems(false);
        updateSelection();
      }
      return;
    }

    if (dragState.type === 'move') {
      dragState.originals.forEach((original) => {
        const item = placed.find((entry) => entry.uid === original.id);
        if (!item) return;
        item.x = clamp(original.x + dx, 0, 15.7);
        item.y = clamp(original.y + dy, 0, 34.7);
      });
      renderItems(false);
      save();
    }
  });

  svg.addEventListener('pointerup', (event) => {
    if (dragState) {
      if (dragState.type === 'select') {
        if (!dragState.moved) selectedIds = new Set();
        selectionLayer.innerHTML = '';
        renderItems();
        updateSelection();
      }
      dragState = null;
      save();
    }
    if (svg.hasPointerCapture(event.pointerId)) svg.releasePointerCapture(event.pointerId);
  });

  rotateLeftBtn.addEventListener('click', () => rotateSelected(-90));
  rotateRightBtn.addEventListener('click', () => rotateSelected(90));

  copyBtn.addEventListener('click', () => {
    const items = selectedItems();
    if (!items.length) return;
    const clones = items.map((item) => ({ ...item, uid: uid(), x: item.x + 0.35, y: item.y + 0.35 }));
    placed.push(...clones);
    selectedIds = new Set(clones.map((clone) => clone.uid));
    renderItems();
    updateSelection();
    save();
  });

  deleteBtn.addEventListener('click', () => {
    if (!selectedIds.size) return;
    placed = placed.filter((item) => !selectedIds.has(item.uid));
    selectedIds = new Set();
    renderItems();
    updateSelection();
    save();
  });

  clearBtn.addEventListener('click', () => {
    if (!window.confirm('Alle geplaatste producten verwijderen?')) return;
    placed = [];
    selectedIds = new Set();
    renderItems();
    updateSelection();
    save();
  });

  savePngBtn.addEventListener('click', exportPng);

  window.addEventListener('keydown', (event) => {
    if (!selectedIds.size) return;
    const target = event.target;
    const isTyping = target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);
    if (isTyping) return;

    if (event.key.toLowerCase() === 'r') {
      event.preventDefault();
      rotateSelected(event.shiftKey ? -90 : 90);
    }
    if (event.key === 'Delete' || event.key === 'Backspace') {
      event.preventDefault();
      placed = placed.filter((item) => !selectedIds.has(item.uid));
      selectedIds = new Set();
      renderItems();
      updateSelection();
      save();
    }
  });

  function renderCatalog() {
    const groups = [...new Set(products.map((product) => product.group))];
    catalog.innerHTML = '';
    groups.forEach((group) => {
      const title = document.createElement('h3');
      title.className = 'group-title';
      title.textContent = group;
      catalog.appendChild(title);

      products.filter((product) => product.group === group).forEach((product) => {
        const card = document.createElement('div');
        card.className = 'product';
        card.draggable = true;
        card.dataset.productId = product.id;

        const swatch = document.createElement('span');
        swatch.className = 'swatch';
        swatch.style.background = cssColor(product.color);

        const text = document.createElement('span');
        const name = document.createElement('span');
        name.className = 'name';
        name.textContent = product.name;
        const dims = document.createElement('span');
        dims.className = 'dims';
        dims.textContent = product.dims;
        text.append(name, dims);

        const add = document.createElement('button');
        add.type = 'button';
        add.className = 'add';
        add.textContent = '+';
        add.title = 'Plaats op plan';
        add.addEventListener('click', () => addProduct(product.id, 7.85, 17.35));

        card.append(swatch, text, add);
        catalog.appendChild(card);
      });
    });
  }

  function renderItems(updatePanel = true) {
    itemsLayer.innerHTML = '';
    placed.forEach((item) => {
      const product = productById(item.productId);
      if (!product) return;
      const group = svgEl('g', {
        transform: `translate(${item.x} ${item.y}) rotate(${item.r || 0})`,
        'data-item-id': item.uid,
        tabindex: 0
      });
      group.appendChild(drawProduct(product, selectedIds.has(item.uid)));
      itemsLayer.appendChild(group);
    });
    if (updatePanel) updateSelection();
  }

  function drawProduct(product, selected) {
    const group = svgEl('g');
    const w = product.w;
    const d = product.d;
    const fill = colors[product.color] || colors.infra;
    const stroke = product.color === 'hc' ? '#853f31' : product.color === 'spa' ? '#1e668e' : product.color === 'classic' ? '#6f4e2b' : '#69401f';

    if (product.kind === 'circle') {
      group.appendChild(svgEl('circle', { cx: 0, cy: 0, r: w / 2, fill, stroke, class: 'product-shape' }));
      group.appendChild(svgEl('circle', { cx: 0, cy: 0, r: w * 0.36, fill: 'url(#spaWater)', stroke: '#d5f5ff', 'stroke-width': 0.05 }));
    } else if (product.kind === 'barrel') {
      const path = `M ${-w / 2} ${-d / 2 + w / 2} C ${-w / 2} ${-d / 2} ${w / 2} ${-d / 2} ${w / 2} ${-d / 2 + w / 2} L ${w / 2} ${d / 2} L ${-w / 2} ${d / 2} Z`;
      group.appendChild(svgEl('path', { d: path, fill, stroke, class: 'product-shape' }));
      group.appendChild(svgEl('line', { x1: -w * 0.35, y1: d / 2, x2: w * 0.35, y2: d / 2, class: 'glass' }));
    } else if (product.kind === 'corner') {
      const points = cornerPoints(w, d).map(([x, y]) => `${x},${y}`).join(' ');
      group.appendChild(svgEl('polygon', { points, fill, stroke, class: 'product-shape' }));
      group.appendChild(svgEl('line', { x1: w / 2, y1: d * 0.18, x2: w * 0.18, y2: d / 2, class: 'glass' }));
    } else {
      const opacity = product.kind === 'canopy' ? 0.92 : 1;
      const rectFill = product.kind === 'grass' ? 'url(#grass)' : fill;
      group.appendChild(svgEl('rect', { x: -w / 2, y: -d / 2, width: w, height: d, rx: product.kind === 'spa' ? 0.25 : 0.05, fill: rectFill, stroke, opacity, class: 'product-shape' }));

      if (product.kind === 'spa') {
        group.appendChild(svgEl('rect', { x: -w * 0.38, y: -d * 0.38, width: w * 0.76, height: d * 0.76, rx: 0.18, fill: 'none', stroke: '#d5f5ff', 'stroke-width': 0.045, opacity: 0.85 }));
      }

      if (product.kind === 'canopy') {
        group.appendChild(svgEl('rect', { x: -w / 2, y: -d / 2, width: w, height: d, rx: 0.08, fill: 'none', stroke: 'var(--canopy)', 'stroke-width': 0.055, 'stroke-dasharray': '0.18 0.12' }));
        [[-w / 2, -d / 2], [w / 2, -d / 2], [-w / 2, d / 2], [w / 2, d / 2]].forEach(([x, y]) => {
          group.appendChild(svgEl('rect', { x: x - 0.08, y: y - 0.08, width: 0.16, height: 0.16, fill: '#586674', stroke: '#2f3943', 'stroke-width': 0.025 }));
        });
      }

      if (product.glass === 'left') {
        group.appendChild(svgEl('line', { x1: -w / 2, y1: -d * 0.36, x2: -w / 2, y2: d * 0.36, class: 'glass' }));
      }
      if (product.glass === 'right') {
        group.appendChild(svgEl('line', { x1: w / 2, y1: -d * 0.36, x2: w / 2, y2: d * 0.36, class: 'glass' }));
      }
    }

    group.appendChild(productText(product));

    if (selected) {
      const r = product.kind === 'circle' ? product.w / 2 : null;
      if (r) {
        group.appendChild(svgEl('circle', { cx: 0, cy: 0, r: r + 0.08, class: 'selection-box' }));
      } else {
        group.appendChild(selectionShape(product));
      }
    }
    return group;
  }

  function addProduct(productId, x, y) {
    const product = productById(productId);
    if (!product) return;
    const item = {
      uid: uid(),
      productId,
      x: clamp(x, 0.2, 15.5),
      y: clamp(y, 0.2, 34.5),
      r: 0
    };
    placed.push(item);
    selectedIds = new Set([item.uid]);
    renderItems();
    save();
  }

  function updateSelection() {
    const items = selectedItems();
    const product = items.length === 1 ? productById(items[0].productId) : null;
    rotateLeftBtn.disabled = !items.length;
    rotateRightBtn.disabled = !items.length;
    copyBtn.disabled = !items.length;
    deleteBtn.disabled = !items.length;
    if (!items.length) {
      selectedTitle.textContent = 'Geen product geselecteerd';
      selectedMeta.textContent = 'Sleep op het plan om meerdere producten te selecteren.';
      return;
    }
    if (items.length > 1) {
      selectedTitle.textContent = `${items.length} producten geselecteerd`;
      selectedMeta.textContent = 'Sleep een geselecteerd product om de hele selectie te verplaatsen.';
      return;
    }
    selectedTitle.textContent = product.name;
    selectedMeta.textContent = `${product.dims} | positie ${items[0].x.toFixed(2)} m, ${items[0].y.toFixed(2)} m | rotatie ${items[0].r || 0} graden`;
  }

  function rotateSelected(degrees) {
    const items = selectedItems();
    if (!items.length) return;
    items.forEach((item) => {
      item.r = normalizeRotation((item.r || 0) + degrees);
    });
    renderItems();
    updateSelection();
    save();
  }

  function normalizeRotation(value) {
    return ((value % 360) + 360) % 360;
  }

  function productText(product) {
    const group = svgEl('g');
    const innerW = Math.max(0.35, product.w * (product.kind === 'circle' ? 0.66 : 0.82));
    const innerH = Math.max(0.30, product.d * (product.kind === 'circle' ? 0.58 : 0.62));
    const maxChars = Math.max(5, Math.floor(innerW / 0.085));
    const nameLines = splitLabel(product.name, maxChars).slice(0, 3);
    const dimLines = splitDims(product.dims, maxChars);
    const lines = [
      ...nameLines.map((text) => ({ text, kind: 'name' })),
      ...dimLines.map((text) => ({ text, kind: 'dims' }))
    ];
    const longest = Math.max(...lines.map((line) => line.text.length), 1);
    const byWidth = innerW / (longest * 0.56);
    const byHeight = innerH / (lines.length * 1.24);
    const fontSize = Math.max(0.075, Math.min(0.18, byWidth, byHeight));
    const lineHeight = fontSize * 1.22;
    const yStart = -((lines.length - 1) * lineHeight) / 2;

    lines.forEach((line, index) => {
      group.appendChild(svgEl('text', {
        x: 0,
        y: yStart + index * lineHeight,
        class: 'product-label',
        style: `font-size:${fontSize.toFixed(3)}px;fill:${line.kind === 'dims' ? '#334150' : '#1f2933'};font-weight:${line.kind === 'name' ? 700 : 400};`
      }, line.text));
    });
    return group;
  }

  function cornerPoints(w, d) {
    return [
      [-w / 2, -d / 2],
      [w / 2, -d / 2],
      [w / 2, d * 0.18],
      [w * 0.18, d / 2],
      [-w / 2, d / 2]
    ];
  }

  function selectionShape(product) {
    if (product.kind === 'corner') {
      const points = cornerPoints(product.w, product.d)
        .map(([x, y]) => `${x},${y}`)
        .join(' ');
      return svgEl('polygon', { points, class: 'selection-box' });
    }
    return svgEl('rect', { x: -product.w / 2 - 0.08, y: -product.d / 2 - 0.08, width: product.w + 0.16, height: product.d + 0.16, class: 'selection-box' });
  }

  function updateMarquee(state) {
    const rect = rectFromPoints(state.startX, state.startY, state.currentX, state.currentY);
    state.rect.setAttribute('x', rect.x);
    state.rect.setAttribute('y', rect.y);
    state.rect.setAttribute('width', rect.width);
    state.rect.setAttribute('height', rect.height);
  }

  function rectFromPoints(x1, y1, x2, y2) {
    return {
      x: Math.min(x1, x2),
      y: Math.min(y1, y2),
      width: Math.abs(x2 - x1),
      height: Math.abs(y2 - y1)
    };
  }

  function idsInRect(rect) {
    return new Set(placed.filter((item) => {
      const bounds = itemBounds(item);
      return bounds.x1 <= rect.x + rect.width &&
        bounds.x2 >= rect.x &&
        bounds.y1 <= rect.y + rect.height &&
        bounds.y2 >= rect.y;
    }).map((item) => item.uid));
  }

  function itemBounds(item) {
    const product = productById(item.productId);
    if (!product) return { x1: item.x, y1: item.y, x2: item.x, y2: item.y };
    const halfW = product.w / 2;
    const halfD = product.d / 2;
    const radians = ((item.r || 0) * Math.PI) / 180;
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    const corners = [
      [-halfW, -halfD],
      [halfW, -halfD],
      [halfW, halfD],
      [-halfW, halfD]
    ].map(([x, y]) => ({
      x: item.x + x * cos - y * sin,
      y: item.y + x * sin + y * cos
    }));
    return {
      x1: Math.min(...corners.map((point) => point.x)),
      y1: Math.min(...corners.map((point) => point.y)),
      x2: Math.max(...corners.map((point) => point.x)),
      y2: Math.max(...corners.map((point) => point.y))
    };
  }

  function splitDims(dims, maxChars) {
    const cleaned = dims
      .split('|')
      .pop()
      .trim()
      .replace(/\s*cm\b/gi, '')
      .replace(/,\s*/g, '|')
      .replace(/\s+/g, ' ');

    if (cleaned.includes('|')) {
      return cleaned.split('|').map((part) => part.trim()).filter(Boolean).slice(0, 3);
    }

    const parts = cleaned.split(' x ').map((part) => part.trim());
    if (parts.length >= 3) {
      return [`${parts[0]} x ${parts[1]}`, `x ${parts.slice(2).join(' x ')}`];
    }
    if (cleaned.length > maxChars && parts.length === 2) {
      return [parts[0], `x ${parts[1]}`];
    }
    return [cleaned];
  }

  function selectedItem() {
    return selectedItems()[0];
  }

  function selectedItems() {
    return placed.filter((item) => selectedIds.has(item.uid));
  }

  function productById(id) {
    return products.find((product) => product.id === id);
  }

  function clientToSvg(clientX, clientY) {
    const point = svg.createSVGPoint();
    point.x = clientX;
    point.y = clientY;
    return point.matrixTransform(svg.getScreenCTM().inverse());
  }

  function svgEl(tag, attrs = {}, text = null) {
    const el = document.createElementNS(SVG_NS, tag);
    Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
    if (text !== null) el.textContent = text;
    return el;
  }

  function splitLabel(name, maxChars = 13) {
    if (name.length <= maxChars) return [name];
    const parts = name.split(' ');
    const lines = [];
    let current = '';
    parts.forEach((part) => {
      if ((current + ' ' + part).trim().length > maxChars && current) {
        lines.push(current);
        current = part;
      } else {
        current = (current + ' ' + part).trim();
      }
    });
    if (current) lines.push(current);
    return lines.slice(0, 3);
  }

  function uid() {
    return `item-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(placed));
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function cssColor(key) {
    const map = {
      infra: '#f4b860',
      hc: '#e7826b',
      classic: '#c99b5c',
      barrel: '#9b6a3d',
      spa: '#4f9fc9',
      hottub: '#b77a3e',
      canopy: '#6f7f8d',
      grass: '#6aa06a'
    };
    return map[key] || '#f4b860';
  }

  function exportPng() {
    const clone = svg.cloneNode(true);
    clone.setAttribute('xmlns', SVG_NS);
    const styles = [...document.styleSheets].map((sheet) => {
      try {
        return [...sheet.cssRules].map((rule) => rule.cssText).join('\n');
      } catch {
        return '';
      }
    }).join('\n');
    const styleNode = document.createElementNS(SVG_NS, 'style');
    styleNode.textContent = styles;
    clone.insertBefore(styleNode, clone.firstChild);

    const data = new XMLSerializer().serializeToString(clone);
    const blob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1600;
      canvas.height = 3150;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#fffdf8';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      const link = document.createElement('a');
      link.download = 'showroom-plan.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
    image.src = url;
  }
})();

