const lerp = (start: number, end: number, amt: number) => (1 - amt) * start + amt * end;

const VELOCITY_MOMENTUM_FACTOR = 15;
const DRAG_EASE = 1;
const MOMENTUM_EASE = 0.09;
const SETTLED_THRESHOLD = 0.01;

export function mousePan(
  element: HTMLElement,
  params: { onCancel?: (fn: () => void) => void } = {}
) {
  let rafId: number | null = null;
  let hasSnap = false;
  let isPanning = false;
  let shouldPreventClick = false;

  const mouse = { initial: { x: 0, y: 0 } };
  const scroll = {
    initial: { x: 0, y: 0 },
    current: { x: 0, y: 0 },
    target: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    axis: { x: false, y: false }
  };

  const onPanFinish = () => {
    element.style.removeProperty('scroll-snap-type');
  };

  const cancelTick = () => {
    if (rafId) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }
  };

  const tick = () => {
    rafId = null;
    const previousScroll = { ...scroll.current };
    const ease = isPanning ? DRAG_EASE : MOMENTUM_EASE;

    scroll.current = {
      x: lerp(scroll.current.x, scroll.target.x, ease),
      y: lerp(scroll.current.y, scroll.target.y, ease)
    };

    scroll.velocity = {
      x: scroll.current.x - previousScroll.x,
      y: scroll.current.y - previousScroll.y
    };

    const isSettled =
      Math.abs(scroll.current.x - scroll.target.x) < SETTLED_THRESHOLD &&
      Math.abs(scroll.current.y - scroll.target.y) < SETTLED_THRESHOLD;

    if (isSettled) {
      scroll.current = {
        x: Math.ceil(scroll.target.x),
        y: Math.ceil(scroll.target.y)
      };
      if (!isPanning) onPanFinish();
    }

    if (scroll.axis.x) element.scrollLeft = scroll.current.x;
    if (scroll.axis.y) element.scrollTop = scroll.current.y;

    if (!isSettled) rafId = window.requestAnimationFrame(tick);
  };

  const onMouseDown = (event: MouseEvent) => {
    isPanning = true;
    shouldPreventClick = false;

    element.style.removeProperty('scroll-snap-type');
    hasSnap = window.getComputedStyle(element).scrollSnapType !== 'none';
    if (hasSnap) element.style.setProperty('scroll-snap-type', 'none');

    mouse.initial = {
      x: event.pageX - element.offsetLeft,
      y: event.pageY - element.offsetTop
    };

    scroll.axis = {
      x: element.scrollWidth > element.clientWidth,
      y: element.scrollHeight > element.clientHeight
    };

    scroll.initial = {
      x: element.scrollLeft,
      y: element.scrollTop
    };

    scroll.target = { ...scroll.initial };
    scroll.current = { ...scroll.initial };
    scroll.velocity = { x: 0, y: 0 };
    cancelTick();
  };

  const onMouseMove = (event: MouseEvent) => {
    if (!isPanning) return;

    const currentMouseX = event.pageX - element.offsetLeft;
    const currentMouseY = event.pageY - element.offsetTop;

    const walkX = currentMouseX - mouse.initial.x;
    const walkY = currentMouseY - mouse.initial.y;

    if (Math.abs(walkX) + Math.abs(walkY) > 0) {
      shouldPreventClick = true;
    }

    scroll.target = {
      x: scroll.initial.x - walkX,
      y: scroll.initial.y - walkY
    };

    if (!rafId) rafId = window.requestAnimationFrame(tick);
  };

  const onMouseUp = () => {
    if (!isPanning) return;
    isPanning = false;

    const unsnappedScrollTarget = {
      x: scroll.target.x + scroll.velocity.x * VELOCITY_MOMENTUM_FACTOR,
      y: scroll.target.y + scroll.velocity.y * VELOCITY_MOMENTUM_FACTOR
    };

    if (hasSnap) {
      const cloneContainer = document.createElement('div');
      cloneContainer.style.cssText = `position:absolute;visibility:hidden;pointer-events:none;`;

      const clone = element.cloneNode(true) as HTMLElement;
      clone.style.cssText = `${element.style.cssText.replace(
        /scroll-snap-type:.+?;/g,
        'scroll-snap-type: auto;'
      )}width:${element.clientWidth}px;height:${element.clientHeight}px;`;

      cloneContainer.appendChild(clone);
      (element.parentElement ?? element).appendChild(cloneContainer);

      clone.scrollLeft = unsnappedScrollTarget.x;
      clone.scrollTop = unsnappedScrollTarget.y;
      scroll.target = { x: clone.scrollLeft, y: clone.scrollTop };
      cloneContainer.remove();
    } else {
      scroll.target = { ...unsnappedScrollTarget };
    }

    if (scroll.current.x === scroll.target.x && scroll.current.y === scroll.target.y) {
      onPanFinish();
    } else {
      if (!rafId) rafId = window.requestAnimationFrame(tick);
    }
  };

  const onClick = (event: MouseEvent) => {
    if (shouldPreventClick) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const cancelCurrent = () => {
    cancelTick();
    onPanFinish();
    scroll.velocity = { x: 0, y: 0 };
    scroll.current = { x: element.scrollLeft, y: element.scrollTop };
  };

  if (params.onCancel) params.onCancel(cancelCurrent);

  const controller = new AbortController();
  const { signal } = controller;

  element.addEventListener('mousedown', onMouseDown, { signal });
  window.addEventListener('mousemove', onMouseMove, { signal });
  window.addEventListener('mouseup', onMouseUp, { signal });
  element.addEventListener('wheel', cancelCurrent, { signal });
  element.addEventListener('click', onClick, { signal, capture: true });

  return {
    destroy() {
      controller.abort();
      cancelTick();
    }
  };
}
