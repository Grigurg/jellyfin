/* Korn Jellyfin family add UI. Generated from portal app jellyfinAddClientScript; edit here for Jellyfin-web integration. */
(function jellyfinAddClientScript() {
  if (window.__familyAddLoaded) return;
  window.__familyAddLoaded = true;
  function leaveNativeLogin() {
    if (/^#\/login(?:\?|$)/i.test(window.location.hash || '')) {
      window.location.replace('/sso');
      return true;
    }
    return false;
  }
  if (leaveNativeLogin()) return;
  window.addEventListener('hashchange', leaveNativeLogin);
  const api = '/family-add/api';
  const style = document.createElement('style');
  style.textContent = `
.family-add-fab{position:fixed;right:22px;bottom:22px;z-index:99999;width:58px;height:58px;border-radius:50%;border:0;background:#2f6b57;color:#fff;font-size:34px;line-height:58px;box-shadow:0 14px 34px rgba(0,0,0,.32);cursor:pointer}
.family-add-jobs{position:fixed;right:22px;bottom:92px;z-index:99999;border:0;border-radius:999px;background:rgba(20,20,20,.86);color:#fff;padding:10px 14px;font:700 14px system-ui;cursor:pointer}
.family-add-hidden{display:none!important}
.family-add-dialog{position:fixed;inset:0;z-index:100000;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,.58);padding:18px}
.family-add-dialog.open{display:flex}
.family-add-card{width:min(560px,calc(100vw - 32px));max-height:min(760px,92vh);overflow-x:hidden;overflow-y:auto;background:#151515;color:#fff;border:1px solid rgba(255,255,255,.16);border-radius:18px;box-shadow:0 30px 90px rgba(0,0,0,.55);font-family:system-ui,-apple-system,Segoe UI,sans-serif}
.family-add-head{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:18px 20px;border-bottom:1px solid rgba(255,255,255,.12)}
.family-add-head h2{margin:0;font-size:20px}
.family-add-close{border:0;background:transparent;color:#fff;font-size:28px;cursor:pointer}
.family-add-body{padding:18px 18px 20px;display:grid;gap:14px;overflow-x:hidden}
.family-add-tabs{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.family-add-tabs button,.family-add-submit{border:1px solid rgba(255,255,255,.18);border-radius:12px;background:#252525;color:#fff;padding:11px 12px;font:700 15px system-ui;cursor:pointer}
.family-add-tabs button.active,.family-add-submit{background:#2f6b57;border-color:#2f6b57}
.family-add-field{display:grid;gap:7px}
.family-add-field label{font-weight:700}
.family-add-field input,.family-add-field textarea,.family-add-field select{width:100%;max-width:100%;box-sizing:border-box;border:1px solid rgba(255,255,255,.18);border-radius:12px;background:#202020;color:#fff;padding:12px;font:15px system-ui}
.family-add-field textarea{min-height:92px;resize:vertical}
.family-add-muted{color:rgba(255,255,255,.62);font-size:13px}
.family-add-error{color:#ffb4a8;font-weight:700}
.family-add-list{display:grid;gap:10px}
.family-add-job{border:1px solid rgba(255,255,255,.13);border-radius:12px;padding:10px;background:#202020}
.family-add-job-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:6px}
.family-add-job-title{font-weight:800}
.family-add-cancel{width:32px;height:32px;border:1px solid rgba(255,255,255,.18);border-radius:50%;background:#3a2424;color:#ffcdc7;font:900 20px/28px system-ui;cursor:pointer}
.family-add-bar{height:8px;background:#343434;border-radius:999px;overflow:hidden}
.family-add-bar span{display:block;height:100%;background:#2f6b57;width:0}
.family-add-row{display:flex;justify-content:space-between;gap:10px;color:rgba(255,255,255,.7);font-size:13px;margin-top:6px}
.family-owner-filter{z-index:99998;display:none;align-items:center;gap:7px;color:#fff;font:700 13px system-ui}
.family-owner-filter.visible{display:inline-flex}
.family-owner-filter.floating{position:fixed}
.family-owner-filter select{width:auto;max-width:min(220px,45vw);box-sizing:border-box;border:1px solid rgba(255,255,255,.45);border-radius:8px;background:#202020;color:#fff;padding:7px 28px 7px 9px;font:700 13px system-ui;box-shadow:0 8px 24px rgba(0,0,0,.25)}
.family-owner-filter option{background:#202020;color:#fff}
@media(max-width:640px){.family-add-fab{right:14px;bottom:14px}.family-add-jobs{right:14px;bottom:82px}.family-add-card{border-radius:14px}}
`;
  document.head.appendChild(style);

  function el(tag, attrs = {}, children = []) {
    const node = document.createElement(tag);
    for (const [key, value] of Object.entries(attrs)) {
      if (key === 'class') node.className = value;
      else if (key === 'text') node.textContent = value;
      else node.setAttribute(key, value);
    }
    for (const child of children) node.append(child);
    return node;
  }

  const fab = el('button', { class: 'family-add-fab', type: 'button', title: 'Добавить' });
  fab.textContent = '+';
  const jobsButton = el('button', { class: 'family-add-jobs', type: 'button' }, [document.createTextNode('Мои загрузки')]);
  const ownerFilter = el('div', { class: 'family-owner-filter' });
  const ownerSelect = el('select', { title: 'Фильтр по владельцу фото' });
  ownerFilter.append(ownerSelect);
  const dialog = el('div', { class: 'family-add-dialog' });
  const card = el('section', { class: 'family-add-card' });
  const close = el('button', { class: 'family-add-close', type: 'button', title: 'Закрыть', text: '×' });
  const sectionLabel = el('div', { class: 'family-add-muted' });
  const title = el('input', { name: 'title', placeholder: 'Например, Интерстеллар' });
  const showTitle = el('input', { name: 'showTitle', placeholder: 'Например, Шерлок' });
  const existingShow = el('select', { name: 'existingShow' });
  const seasonNumber = el('input', { name: 'seasonNumber', type: 'number', min: '1', max: '999', step: '1', value: '1' });
  const episodeTitle = el('input', { name: 'episodeTitle', placeholder: 'Например, Серия 5' });
  const archiveTitle = el('input', { name: 'archiveTitle', placeholder: 'Например, Карелия' });
  const existingAlbum = el('select', { name: 'existingAlbum' });
  const archiveFolderTitle = el('input', { name: 'archiveFolderTitle', placeholder: 'Например, Света' });
  const archiveOwner = el('input', { name: 'archiveOwner', placeholder: 'Например, Света', value: 'Корнишины', required: 'required' });
  const file = el('input', { name: 'file', type: 'file', accept: 'video/*,.mkv,.avi,.mp4,.mov,.webm,.m4v,.mts,.m2ts,.ts' });
  const archiveFiles = el('input', { name: 'archiveFiles', type: 'file', multiple: 'multiple', accept: 'image/*,video/*,.jpg,.jpeg,.png,.webp,.heic,.heif,.gif,.mp4,.mov,.m4v,.mkv,.avi,.mts,.m2ts,.ts' });
  const folder = el('input', { name: 'folder', type: 'file', multiple: 'multiple', webkitdirectory: 'webkitdirectory', directory: 'directory' });
  const torrentFile = el('input', { name: 'torrent', type: 'file', accept: '.torrent,application/x-bittorrent' });
  const url = el('textarea', { name: 'url', placeholder: 'magnet:?xt=urn:btih:...' });
  const error = el('div', { class: 'family-add-error' });
  const jobsList = el('div', { class: 'family-add-list' });
  let mode = 'file';
  let library = 'movies';
  let showMode = 'new';
  let archiveMode = 'newAlbum';
  let knownShows = [];
  let knownAlbums = [];
  let archiveOwners = null;
  let archiveOwnersAlbum = '';
  let archiveAlbumCacheKey = '';
  let archiveAlbumCacheValue = '';
  let selectedArchiveOwner = localStorage.getItem('familyArchiveOwnerFilter') || '';
  let activeJobs = 0;
  let busy = false;
  let titleWasAutofilled = false;
  let refreshInFlight = false;
  let visibilityTimer = 0;
  let filterTimer = 0;
  const localUploads = new Map();

  function itemIdFromDeleteRequest(input, method) {
    if (String(method || 'GET').toUpperCase() !== 'DELETE') return '';
    const raw = typeof input === 'string' ? input : input?.url || '';
    try {
      const url = new URL(raw, window.location.origin);
      if (url.origin !== window.location.origin) return '';
      const match = url.pathname.match(/^\/Items\/([0-9a-fA-F-]+)$/);
      return match?.[1] || '';
    } catch {
      return '';
    }
  }

  function requestHeaders(init = {}) {
    try {
      return new Headers(init?.headers || {});
    } catch {
      return new Headers();
    }
  }

  function archiveItemsRequest(input, init = {}) {
    const method = String(init?.method || input?.method || 'GET').toUpperCase();
    if (method !== 'GET') return null;
    const headers = requestHeaders(init);
    if (headers.get('X-Family-Archive-Bypass')) return null;
    const raw = typeof input === 'string' ? input : input?.url || '';
    let url;
    try {
      url = new URL(raw, window.location.origin);
    } catch {
      return null;
    }
    if (url.origin !== window.location.origin) return null;
    if (!/^\/(?:Users\/[0-9a-fA-F-]+\/)?Items$/i.test(url.pathname)) return null;
    const parentId = url.searchParams.get('ParentId') || '';
    if (!parentId || parentId.toLowerCase() !== currentItemId().toLowerCase()) return null;
    if (!isArchiveView()) return null;
    const rootArchive = !currentArchiveAlbumSync();
    if (!rootArchive && !selectedArchiveOwner) return null;
    const originalStart = Number.parseInt(url.searchParams.get('StartIndex') || '0', 10) || 0;
    const originalLimit = Number.parseInt(url.searchParams.get('Limit') || '100', 10) || 100;
    const fields = new Set(String(url.searchParams.get('Fields') || '').split(',').map((item) => item.trim()).filter(Boolean));
    fields.add('Path');
    url.searchParams.set('Fields', Array.from(fields).join(','));
    url.searchParams.set('StartIndex', '0');
    url.searchParams.set('Limit', '5000');
    if (rootArchive) {
      url.searchParams.set('Recursive', 'false');
      url.searchParams.delete('IncludeItemTypes');
      url.searchParams.delete('IsPlayed');
      url.searchParams.delete('IsFavorite');
    }
    return { url, originalStart, originalLimit, rootArchive };
  }

  async function filteredArchiveItemsResponse(nativeFetch, input, init, requestInfo) {
    await loadArchiveOwners(requestInfo.rootArchive ? '' : await currentArchiveAlbum());
    const response = await nativeFetch(requestInfo.url.toString(), init);
    if (!response.ok) return response;
    const data = await response.clone().json().catch(() => null);
    if (!data || !Array.isArray(data.Items)) return response;
    const owner = selectedArchiveOwner;
    const filtered = requestInfo.rootArchive
      ? data.Items.filter((item) => {
        const itemPath = item.Path || item.path || '';
        const itemType = item.Type || item.type || '';
        if (!itemPath.includes('/media/FamilyArchive/')) return false;
        if (owner && !ownerMatchesPath(itemPath, owner)) return false;
        return itemType.includes('PhotoAlbum') || item.IsFolder || item.isFolder || !pathBasename(itemPath).includes('.');
      })
      : data.Items.filter((item) => ownerMatchesPath(item.Path || item.path || '', owner));
    data.TotalRecordCount = filtered.length;
    data.StartIndex = requestInfo.originalStart;
    data.Items = filtered.slice(requestInfo.originalStart, requestInfo.originalStart + requestInfo.originalLimit);
    const headers = new Headers(response.headers);
    headers.set('Content-Type', 'application/json; charset=utf-8');
    headers.delete('Content-Length');
    return new Response(JSON.stringify(data), {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  }

  function afterTrashRequest(request) {
    request.catch((err) => {
      console.error('Family trash delete failed', err);
      alert(err?.message || 'Не удалось переместить в корзину.');
    }).finally(() => {
      setTimeout(() => {
        try {
          window.dispatchEvent(new HashChangeEvent('hashchange'));
          refreshJobs();
        } catch {}
      }, 800);
    });
  }

  function installTrashRequestInterceptors() {
    if (window.__familyTrashInterceptorsLoaded) return;
    window.__familyTrashInterceptorsLoaded = true;
    const nativeFetch = window.fetch?.bind(window);
    if (nativeFetch) {
      window.fetch = function familyFetch(input, init = {}) {
        const method = init?.method || input?.method || 'GET';
        const itemId = itemIdFromDeleteRequest(input, method);
        if (itemId) {
          afterTrashRequest(nativeFetch(`${api}/trash/${encodeURIComponent(itemId)}`, {
            method: 'POST',
            credentials: 'same-origin',
          }).then((response) => {
            if (!response.ok) return jsonError(response, 'Не удалось переместить в корзину.');
            return response;
          }));
          return Promise.resolve(new Response(null, { status: 204, statusText: 'No Content' }));
        }
        const archiveRequest = archiveItemsRequest(input, init);
        if (archiveRequest) return filteredArchiveItemsResponse(nativeFetch, input, init, archiveRequest);
        return nativeFetch(input, init);
      };
    }
    const NativeXHR = window.XMLHttpRequest;
    if (NativeXHR?.prototype?.open) {
      const nativeOpen = NativeXHR.prototype.open;
      NativeXHR.prototype.open = function familyXhrOpen(method, url, ...rest) {
        const itemId = itemIdFromDeleteRequest(url, method);
        if (itemId) {
          this.__familyTrashDelete = true;
          return nativeOpen.call(this, 'POST', `${api}/trash/${encodeURIComponent(itemId)}`, ...rest);
        }
        return nativeOpen.call(this, method, url, ...rest);
      };
    }
  }

  function tabButton(name, label) {
    const button = el('button', { type: 'button', text: label });
    button.onclick = () => {
      mode = name;
      renderMode();
    };
    return button;
  }
  const fileTab = tabButton('file', 'Файл');
  const folderTab = tabButton('folder', 'Папка');
  const linkTab = tabButton('torrent', 'Торрент');
  const showModeHolder = el('div');
  const sourceHolder = el('div');
  const sourceTabs = el('div', { class: 'family-add-tabs' }, [fileTab, folderTab, linkTab]);
  const submitButton = el('button', { class: 'family-add-submit', type: 'submit', text: 'Добавить' });
  const form = el('form', { class: 'family-add-body', novalidate: 'novalidate' });
  form.append(
    el('div', { class: 'family-add-field' }, [el('label', { text: 'Раздел' }), sectionLabel]),
    showModeHolder,
    el('div', { class: 'family-add-field' }, [el('label', { text: 'Название' }), title]),
    sourceTabs,
    sourceHolder,
    error,
    submitButton,
    el('div', { class: 'family-add-muted', text: 'Материал появится в Jellyfin после завершения загрузки и обновления библиотеки.' }),
    jobsList
  );
  card.append(el('header', { class: 'family-add-head' }, [el('h2', { text: 'Добавить в Jellyfin' }), close]), form);
  dialog.append(card);

  function renderMode() {
    normalizeSourceMode();
    renderSourceTabs();
    fileTab.classList.toggle('active', mode === 'file');
    folderTab.classList.toggle('active', mode === 'folder');
    linkTab.classList.toggle('active', mode === 'torrent');
    renderSourceHolder();
    renderLibraryFields();
  }

  function renderSourceHolder() {
    if (mode === 'folder') {
      const label = library === 'archive' ? 'Папка с фотографиями и видео' : 'Папка с видео';
      const hint = library === 'archive'
        ? 'Папка будет добавлена как новый альбом или подпапка внутри выбранного альбома.'
        : 'Для сериалов папка переносится целиком, с сериями и субтитрами.';
      sourceHolder.replaceChildren(el('div', { class: 'family-add-field' }, [el('label', { text: label }), folder, el('div', { class: 'family-add-muted', text: hint })]));
    } else if (mode === 'file') {
      if (library === 'archive') {
        sourceHolder.replaceChildren(el('div', { class: 'family-add-field' }, [el('label', { text: 'Фотографии и видео' }), archiveFiles, el('div', { class: 'family-add-muted', text: 'Можно выбрать сразу несколько файлов для текущего альбома.' })]));
      } else {
        const label = library === 'hiking' ? 'Походный фильм' : 'Видео с устройства';
        sourceHolder.replaceChildren(el('div', { class: 'family-add-field' }, [el('label', { text: label }), file, el('div', { class: 'family-add-muted', text: 'Можно вставить файл через Ctrl+V, если браузер передал его из буфера обмена.' })]));
      }
    } else {
      sourceHolder.replaceChildren(el('div', { class: 'family-add-field' }, [el('label', { text: 'Magnet-ссылка' }), url, el('label', { text: '.torrent файл' }), torrentFile, el('div', { class: 'family-add-muted', text: 'HTTP-ссылки здесь не запускаются: скачайте .torrent файл и прикрепите его, либо вставьте magnet.' })]));
    }
  }

  function allowedSourceModes() {
    if (library === 'hiking') return ['file'];
    if (library === 'archive') return archiveMode === 'albumItems' ? ['file', 'folder'] : ['folder'];
    if (library !== 'shows') return ['file', 'torrent'];
    if (showMode === 'episode') return ['file', 'torrent'];
    return ['folder', 'torrent'];
  }

  function normalizeSourceMode() {
    const allowed = allowedSourceModes();
    if (!allowed.includes(mode)) mode = allowed[0];
  }

  function renderSourceTabs() {
    const allowed = allowedSourceModes();
    fileTab.classList.toggle('family-add-hidden', !allowed.includes('file'));
    folderTab.classList.toggle('family-add-hidden', !allowed.includes('folder'));
    linkTab.classList.toggle('family-add-hidden', !allowed.includes('torrent'));
  }

  function renderLibraryFields() {
    const isShows = library === 'shows';
    sourceTabs.classList.toggle('family-add-hidden', library === 'archive');
    title.parentElement.classList.toggle('family-add-hidden', isShows || library === 'archive');
    sectionLabel.textContent = isShows
      ? showMode === 'episode'
        ? 'Сериалы: добавить серию в сезон.'
        : showMode === 'season'
          ? 'Сериалы: добавить сезон к существующему сериалу.'
          : 'Сериалы: добавить новый сериал целиком.'
      : library === 'archive' ? 'Семейный Архив' : library === 'hiking' ? 'Походные фильмы' : 'Фильмы';
    if (library === 'hiking') {
      showModeHolder.replaceChildren();
      submitButton.textContent = 'Добавить походный фильм';
      normalizeSourceMode();
      renderSourceTabs();
      renderSourceHolder();
      return;
    }
    if (library === 'archive') {
      const newAlbumButton = tabButton('archive-new-album', 'Новый альбом');
      const existingAlbumButton = tabButton('archive-existing-album', 'В существующий альбом');

      newAlbumButton.onclick = () => {
        archiveMode = 'newAlbum';
        renderLibraryFields();
      };

      existingAlbumButton.onclick = () => {
        archiveMode = 'albumItems';
        renderLibraryFields();
      };

      newAlbumButton.classList.toggle('active', archiveMode === 'newAlbum');
      existingAlbumButton.classList.toggle('active', archiveMode === 'albumItems');

      const fields = [el('div', { class: 'family-add-tabs' }, [newAlbumButton, existingAlbumButton])];
      if (archiveMode === 'newAlbum') {
        fields.push(el('div', { class: 'family-add-field' }, [el('label', { text: 'Название альбома' }), archiveTitle]));
      } else {
        fields.push(el('div', { class: 'family-add-field' }, [el('label', { text: 'Альбом' }), existingAlbum]));
      }
      fields.push(el('div', { class: 'family-add-field' }, [el('label', { text: 'Чьи фото?' }), archiveOwner]));
      showModeHolder.replaceChildren(...fields);

      sourceHolder.replaceChildren(el('div', { class: 'family-add-field' }, [
        el('label', { text: 'Фотографии и видео' }),
        archiveFiles,
        el('div', { class: 'family-add-muted', text: 'Можно выбрать сразу много файлов.' }),
        el('label', { text: 'Папка с фотографиями и видео' }),
        folder,
        el('div', { class: 'family-add-muted', text: 'Можно выбрать целую папку. Все подходящие фото и видео будут добавлены в альбом.' }),
      ]));

      submitButton.textContent = archiveMode === 'newAlbum' ? 'Добавить альбом' : 'Добавить в альбом';
      return;
    }
    if (!isShows) {
      showModeHolder.replaceChildren();
      submitButton.textContent = 'Добавить фильм';
      normalizeSourceMode();
      renderSourceTabs();
      renderSourceHolder();
      return;
    }
    const newButton = tabButton('show-new', 'Новый сериал');
    const seasonButton = tabButton('show-season', 'Сезон');
    const episodeButton = tabButton('show-episode', 'Серия');
    newButton.onclick = () => { showMode = 'new'; renderLibraryFields(); };
    seasonButton.onclick = () => { showMode = 'season'; renderLibraryFields(); };
    episodeButton.onclick = () => { showMode = 'episode'; renderLibraryFields(); };
    newButton.classList.toggle('active', showMode === 'new');
    seasonButton.classList.toggle('active', showMode === 'season');
    episodeButton.classList.toggle('active', showMode === 'episode');
    const fields = [el('div', { class: 'family-add-tabs' }, [newButton, seasonButton, episodeButton])];
    if (showMode === 'season' || showMode === 'episode') {
      fields.push(el('div', { class: 'family-add-field' }, [el('label', { text: 'Сериал' }), existingShow, el('div', { class: 'family-add-muted', text: 'Если нужного сериала нет в списке, переключитесь на новый сериал.' })]));
      fields.push(el('div', { class: 'family-add-field' }, [el('label', { text: 'Номер сезона' }), seasonNumber]));
      if (showMode === 'episode') {
        fields.push(el('div', { class: 'family-add-field' }, [el('label', { text: 'Название серии' }), episodeTitle]));
      }
    } else {
      fields.push(el('div', { class: 'family-add-field' }, [el('label', { text: 'Название сериала' }), showTitle]));
    }
    showModeHolder.replaceChildren(...fields);
    submitButton.textContent = showMode === 'episode' ? 'Добавить серию' : showMode === 'season' ? 'Добавить сезон' : 'Добавить сериал';
    normalizeSourceMode();
    renderSourceTabs();
    renderSourceHolder();
  }

  function titleFromFilename(name) {
    return (name || '')
      .replace(/\.[^.]+$/, '')
      .replace(/[._-]+/g, ' ')
      .replace(/\b(720p|1080p|2160p|4k|bluray|brrip|webrip|web-dl|x264|x265|h264|h265|yify|aac|dts)\b/gi, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function fillTitleFromFile(input, force = false) {
    if (!input.files?.[0]) return;
    const targetInput = library === 'shows' ? (showMode === 'episode' ? episodeTitle : showTitle) : title;
    if (force || !targetInput.value.trim() || titleWasAutofilled) {
      targetInput.value = titleFromFilename(input.files[0].name);
      titleWasAutofilled = true;
    }
  }

  function resetAddForm() {
    title.value = '';
    showTitle.value = '';
    episodeTitle.value = '';
    archiveTitle.value = '';
    archiveFolderTitle.value = '';
    archiveOwner.value = 'Корнишины';
    titleWasAutofilled = false;
    file.value = '';
    archiveFiles.value = '';
    folder.value = '';
    torrentFile.value = '';
    url.value = '';
    error.textContent = '';
  }

  function visibleText(node) {
    return (node.textContent || '').replace(/\s+/g, ' ').trim();
  }

  function isMoviesView() {
    const route = decodeURIComponent(location.href).toLowerCase();
    if (route.includes('movie') || route.includes('movies')) return true;
    const nodes = document.querySelectorAll('h1,h2,h3,.pageTitle,.sectionTitle,.MuiTypography-root,.Mui-selected,.navMenuOption-selected,.selected');
    return Array.from(nodes).some((node) => node.offsetParent !== null && visibleText(node) === 'Фильмы');
  }

  function isShowsView() {
    const route = decodeURIComponent(location.href).toLowerCase();
    if (route.includes('series') || route.includes('shows') || route.includes('tvshows')) return true;
    const nodes = document.querySelectorAll('h1,h2,h3,.pageTitle,.sectionTitle,.MuiTypography-root,.Mui-selected,.navMenuOption-selected,.selected');
    return Array.from(nodes).some((node) => node.offsetParent !== null && ['Сериалы', 'Сериал'].includes(visibleText(node)));
  }

  function isHikingView() {
    const route = decodeURIComponent(location.href).toLowerCase();
    if (route.includes('hikingmovies')) return true;
    const nodes = document.querySelectorAll('h1,h2,h3,.pageTitle,.sectionTitle,.MuiTypography-root,.Mui-selected,.navMenuOption-selected,.selected');
    return Array.from(nodes).some((node) => node.offsetParent !== null && visibleText(node) === 'Походные фильмы');
  }

  function isArchiveView() {
    const route = decodeURIComponent(location.href).toLowerCase();
    if (route.includes('familyarchive') || route.includes('homevideos')) return true;
    const nodes = document.querySelectorAll('h1,h2,h3,.pageTitle,.sectionTitle,.MuiTypography-root,.Mui-selected,.navMenuOption-selected,.selected');
    return Array.from(nodes).some((node) => node.offsetParent !== null && ['Семейный Архив', 'Семейный архив'].includes(visibleText(node)));
  }

  function currentShowTitle() {
    const nodes = document.querySelectorAll('h1,.itemName,.pageTitle');
    for (const node of nodes) {
      if (node.offsetParent === null) continue;
      const text = visibleText(node);
      if (text && !['Сериалы', 'Фильмы'].includes(text)) return text;
    }
    return '';
  }

  function currentItemId() {
    const raw = `${location.hash || ''}&${location.search || ''}`;
    const match = raw.match(/[?&](?:id|itemId|parentId)=([0-9a-fA-F-]{16,})/);
    return match?.[1] || '';
  }

  function normalizeLookupText(value) {
    return String(value || '').replace(/\.[^.]+$/, '').replace(/\s+/g, ' ').trim().toLowerCase();
  }

  function jellyfinCredentials() {
    try {
      const data = JSON.parse(localStorage.getItem('jellyfin_credentials') || '{}');
      const server = Array.isArray(data.Servers) ? data.Servers.find((item) => item.AccessToken) : null;
      return server ? { token: server.AccessToken, userId: server.UserId || data.User?.Id || '' } : null;
    } catch {
      return null;
    }
  }

  async function currentJellyfinItem() {
    const id = currentItemId();
    if (!id) return null;
    try {
      const contextResponse = await fetch(`${api}/item-context/${encodeURIComponent(id)}`, { credentials: 'same-origin' });
      if (contextResponse.ok) return (await contextResponse.json()).item || null;
    } catch {}
    const credentials = jellyfinCredentials();
    if (!credentials?.token) return null;
    const url = credentials.userId ? `/Users/${encodeURIComponent(credentials.userId)}/Items/${encodeURIComponent(id)}` : `/Items/${encodeURIComponent(id)}`;
    const response = await fetch(url, { headers: { 'X-Emby-Token': credentials.token }, credentials: 'same-origin' });
    if (!response.ok) return null;
    return response.json();
  }

  function setExistingShowValue(value) {
    const name = String(value || '').trim();
    if (!name) return;
    if (![...existingShow.options].some((option) => option.value === name)) {
      existingShow.prepend(new Option(name, name));
    }
    existingShow.value = name;
  }

  function setSeasonValue(value) {
    const number = Number.parseInt(String(value || '').replace(/\D+/g, ''), 10);
    if (Number.isFinite(number) && number > 0) seasonNumber.value = String(number);
  }

  function detectLibrary() {
    if (isArchiveView()) return 'archive';
    if (isHikingView()) return 'hiking';
    if (isShowsView()) return 'shows';
    if (isMoviesView()) return 'movies';
    return '';
  }

  async function applyPageContext() {
    const nextLibrary = detectLibrary();
    if (nextLibrary) library = nextLibrary;
    if (library === 'shows') {
      try {
        const item = await currentJellyfinItem();
        const itemType = item?.Type || item?.type || '';
        const itemName = item?.Name || item?.name || '';
        if (itemType === 'Series') {
          showMode = 'season';
          setExistingShowValue(itemName);
        } else if (itemType === 'Season') {
          showMode = 'episode';
          setExistingShowValue(item.SeriesName || item.seriesName || item.Series?.Name || currentShowTitle());
          setSeasonValue(item.IndexNumber || item.indexNumber || itemName);
        } else if (itemType === 'Episode') {
          showMode = 'episode';
          setExistingShowValue(item.SeriesName || item.seriesName || currentShowTitle());
          setSeasonValue(item.ParentIndexNumber || item.parentIndexNumber || item.SeasonName);
        } else {
          const current = currentShowTitle();
          if (current) {
            showMode = 'season';
            setExistingShowValue(current);
          }
        }
      } catch {
        const current = currentShowTitle();
        if (current) {
          showMode = 'season';
          setExistingShowValue(current);
        }
      }
    } else if (library === 'archive') {
      archiveMode = 'newAlbum';
      try {
        const item = await currentJellyfinItem();
        const itemPath = item?.path || item?.Path || '';
        const itemName = item?.name || item?.Name || '';
        const relative = itemPath.includes('/media/FamilyArchive/')
          ? itemPath.split('/media/FamilyArchive/')[1]
          : '';
        const album = relative ? relative.split('/').filter(Boolean)[0] : '';
        if (album) {
          archiveMode = 'albumItems';
          setExistingAlbumValue(album);
        } else if (itemName && !['Семейный Архив', 'Семейный архив'].includes(itemName)) {
          archiveMode = 'albumItems';
          setExistingAlbumValue(itemName);
        }
      } catch {}
    }
    renderLibraryFields();
  }

  function pageScrollTop() {
    const selectors = ['.mainAnimatedPage:not(.hide)', '.page:not(.hide)', '.scrollFrameY', '.mainScrollSlider', '[data-scrollcontainer="true"]'];
    const values = [document.scrollingElement?.scrollTop || 0, window.scrollY || 0];
    for (const node of document.querySelectorAll(selectors.join(','))) values.push(node.scrollTop || 0);
    return Math.max(...values);
  }

  async function currentArchiveAlbum() {
    const key = location.href;
    if (archiveAlbumCacheKey === key && archiveAlbumCacheValue) return archiveAlbumCacheValue;
    archiveAlbumCacheKey = key;
    archiveAlbumCacheValue = '';
    try {
      const item = await currentJellyfinItem();
      const itemPath = item?.path || item?.Path || '';
      const relative = itemPath.includes('/media/FamilyArchive/')
        ? itemPath.split('/media/FamilyArchive/')[1]
        : '';
      const album = relative ? relative.split('/').filter(Boolean)[0] : '';
      if (album) archiveAlbumCacheValue = decodeURIComponent(album);
    } catch {}
    if (!archiveAlbumCacheValue && isArchiveView()) {
      const title = currentShowTitle();
      if (title && !['Семейный Архив', 'Семейный архив'].includes(title)) archiveAlbumCacheValue = title;
    }
    return archiveAlbumCacheValue;
  }

  function archiveFilterButton() {
    const nodes = document.querySelectorAll('button,a,.emby-button,.paper-icon-button');
    for (const node of nodes) {
      if (node.offsetParent === null) continue;
      if (!['Filter', 'Фильтр'].includes(visibleText(node))) continue;
      return node;
    }
    return null;
  }

  function currentArchiveAlbumSync() {
    if (!isArchiveView()) return '';
    const title = currentShowTitle();
    if (title && !['Семейный Архив', 'Семейный архив'].includes(title)) return title;
    if (archiveAlbumCacheKey !== location.href) return '';
    return archiveAlbumCacheValue || '';
  }

  function positionArchiveOwnerFilter() {
    const button = archiveFilterButton();
    if (!button) return;
    const rect = button.getBoundingClientRect();
    const width = ownerFilter.offsetWidth || 130;
    const left = Math.max(8, Math.min(window.innerWidth - width - 8, rect.right + 8));
    const top = Math.max(8, Math.min(window.innerHeight - 44, rect.top + (rect.height / 2) - 17));
    ownerFilter.style.left = `${Math.round(left)}px`;
    ownerFilter.style.top = `${Math.round(top)}px`;
  }

  function archiveToolbarHost() {
    const nodes = document.querySelectorAll('button,a,.emby-button,.paper-icon-button,select');
    for (const node of nodes) {
      if (node.offsetParent === null) continue;
      const label = visibleText(node) || node.getAttribute?.('aria-label') || node.getAttribute?.('title') || '';
      if (!/Filter|Фильтр|Sort|Сорт|Play All|Shuffle|⋮/i.test(label)) continue;
      let host = node.parentElement;
      for (let i = 0; i < 7 && host; i += 1) {
        const buttons = host.querySelectorAll('button,a,.emby-button,.paper-icon-button,select');
        const rect = host.getBoundingClientRect();
        if (buttons.length >= 2 && rect.width > 120 && rect.height < 96) return host;
        host = host.parentElement;
      }
    }
    return null;
  }

  function mountArchiveOwnerFilter() {
    const host = archiveToolbarHost();
    if (host) {
      ownerFilter.classList.remove('floating');
      ownerFilter.style.left = '';
      ownerFilter.style.top = '';
      if (ownerFilter.parentElement !== host) host.append(ownerFilter);
      return;
    }
    ownerFilter.classList.add('floating');
    if (!document.body.contains(ownerFilter)) document.body.append(ownerFilter);
    positionArchiveOwnerFilter();
  }

  async function loadArchiveOwners(album) {
    if (archiveOwners && archiveOwnersAlbum === album) return archiveOwners;
    try {
      const response = await fetch(`${api}/archive/owners?album=${encodeURIComponent(album || '')}`, { credentials: 'same-origin' });
      if (!response.ok) throw new Error('owners');
      archiveOwners = await response.json();
      archiveOwnersAlbum = album;
    } catch {
      archiveOwners = { owners: [], files: {} };
      archiveOwnersAlbum = album;
    }
    ownerSelect.replaceChildren(new Option('Все', ''), ...(archiveOwners.owners || []).map((name) => new Option(name, name)));
    if ([...ownerSelect.options].some((option) => option.value === selectedArchiveOwner)) ownerSelect.value = selectedArchiveOwner;
    else selectedArchiveOwner = '';
    return archiveOwners;
  }

  function ownerMatchesPath(itemPath, owner) {
    if (!owner) return true;
    const marker = '/media/FamilyArchive/';
    const relative = String(itemPath || '').includes(marker) ? String(itemPath).split(marker)[1] : '';
    const parts = relative.split('/').filter(Boolean);
    if (!parts.length) return false;
    const album = decodeURIComponent(parts[0]);
    const fileName = decodeURIComponent(parts.slice(1).join('/'));
    const albumMeta = archiveOwners?.files?.[album];
    if (!albumMeta) return false;
    if (!fileName) return (albumMeta.owners || []).includes(owner);
    return albumMeta.files?.[fileName] === owner || albumMeta.files?.[pathBasename(fileName)] === owner;
  }

  function pathBasename(value) {
    return String(value || '').replace(/\\/g, '/').split('/').filter(Boolean).pop() || '';
  }

  function itemIdFromCard(card) {
    const values = [
      card.getAttribute?.('data-id'),
      card.getAttribute?.('data-itemid'),
      card.querySelector?.('a[href*="id="],a[href*="itemId="],a[href*="/details"]')?.getAttribute('href'),
      card.querySelector?.('img[src*="/Items/"]')?.getAttribute('src'),
      card.querySelector?.('[style*="/Items/"]')?.getAttribute('style'),
    ].filter(Boolean);
    for (const raw of values) {
      const match = String(raw).match(/[?&](?:id|itemId)=([0-9a-fA-F-]{16,})/)
        || String(raw).match(/\/details\/([0-9a-fA-F-]{16,})/)
        || String(raw).match(/\/Items\/([0-9a-fA-F-]{16,})\//);
      if (match?.[1]) return match[1];
    }
    return '';
  }

  async function currentArchiveItems() {
    const parentId = currentItemId();
    const credentials = jellyfinCredentials();
    if (!parentId || !credentials?.token) return [];
    const userPrefix = credentials.userId ? `/Users/${encodeURIComponent(credentials.userId)}` : '';
    const url = `${userPrefix}/Items?ParentId=${encodeURIComponent(parentId)}&Fields=Path&Recursive=false&Limit=5000`;
    try {
      const response = await fetch(url, { headers: { 'X-Emby-Token': credentials.token, 'X-Family-Archive-Bypass': '1' }, credentials: 'same-origin' });
      if (!response.ok) return [];
      const data = await response.json();
      return Array.isArray(data.Items) ? data.Items : [];
    } catch {
      return [];
    }
  }

  function cardLookupNames(card) {
    const values = [
      card.getAttribute?.('title'),
      card.getAttribute?.('aria-label'),
      card.querySelector?.('[title]')?.getAttribute('title'),
      card.querySelector?.('.cardText')?.textContent,
      card.querySelector?.('.cardText-first')?.textContent,
      card.querySelector?.('.listItemBodyText')?.textContent,
      card.querySelector?.('.listItemBodyText-secondary')?.textContent,
      visibleText(card),
    ];
    return values.map(normalizeLookupText).filter(Boolean);
  }

  async function updateArchiveOwnerControl() {
    const album = await currentArchiveAlbum();
    const showOwnerFilter = isArchiveView();
    ownerFilter.classList.toggle('visible', showOwnerFilter);
    if (!showOwnerFilter) {
      ownerFilter.classList.remove('floating');
      ownerFilter.style.left = '';
      ownerFilter.style.top = '';
      document.querySelectorAll('[data-family-owner-hidden="1"]').forEach((node) => {
        node.style.display = '';
        node.removeAttribute('data-family-owner-hidden');
      });
      selectedArchiveOwner = '';
      ownerSelect.value = '';
      return;
    }
    mountArchiveOwnerFilter();
    await loadArchiveOwners(album);
  }

  async function applyArchiveOwnerFilter() {
    await updateArchiveOwnerControl();
    const album = archiveOwnersAlbum || await currentArchiveAlbum();
    if (!album) return;
    const owner = selectedArchiveOwner;
    const cards = Array.from(document.querySelectorAll('.card,.itemCard,.visualCardBox-card,.listItem,.posterCard,.squareCard')).filter((node) => node.offsetParent !== null);
    if (!owner) {
      for (const card of cards) {
        card.style.display = '';
        card.removeAttribute('data-family-owner-hidden');
      }
      return;
    }
    const archiveItems = await currentArchiveItems();
    const pathById = new Map();
    const pathByName = new Map();
    for (const item of archiveItems) {
      const itemPath = item.Path || item.path || '';
      if (!itemPath) continue;
      if (item.Id) pathById.set(String(item.Id).toLowerCase(), itemPath);
      for (const name of [item.Name, pathBasename(itemPath)]) {
        const key = normalizeLookupText(name);
        if (key && !pathByName.has(key)) pathByName.set(key, itemPath);
      }
    }
    for (const card of cards) {
      const id = itemIdFromCard(card);
      if (id && pathById.has(id.toLowerCase())) {
        card.dataset.familyOwnerPath = pathById.get(id.toLowerCase());
        continue;
      }
      const matchedName = cardLookupNames(card).find((name) => pathByName.has(name));
      if (matchedName) {
        card.dataset.familyOwnerPath = pathByName.get(matchedName);
        continue;
      }
      if (id && card.dataset.familyOwnerChecked !== id) {
        card.dataset.familyOwnerChecked = id;
        try {
          const response = await fetch(`${api}/item-context/${encodeURIComponent(id)}`, { credentials: 'same-origin' });
          if (!response.ok) continue;
          const data = await response.json();
          card.dataset.familyOwnerPath = data.item?.path || '';
        } catch {}
      }
    }
    for (const card of cards) {
      const itemPath = card.dataset.familyOwnerPath || '';
      if (!itemPath) {
        card.style.display = '';
        card.removeAttribute('data-family-owner-hidden');
        continue;
      }
      const matches = ownerMatchesPath(itemPath, owner);
      card.style.display = matches ? '' : 'none';
      if (matches) card.removeAttribute('data-family-owner-hidden');
      else card.setAttribute('data-family-owner-hidden', '1');
    }
  }

  function updateVisibility() {
    const showFab = Boolean(detectLibrary()) && pageScrollTop() < 120;
    fab.classList.toggle('family-add-hidden', !showFab);
    jobsButton.classList.toggle('family-add-hidden', activeJobs < 1);
    if (ownerFilter.classList.contains('visible')) positionArchiveOwnerFilter();
    updateArchiveOwnerControl();
  }

  function scheduleVisibilityUpdate() {
    if (visibilityTimer) return;
    visibilityTimer = window.setTimeout(() => {
      visibilityTimer = 0;
      updateVisibility();
    }, 120);
  }

  function scheduleArchiveOwnerFilter() {
    if (filterTimer) window.clearTimeout(filterTimer);
    filterTimer = window.setTimeout(() => {
      filterTimer = 0;
      applyArchiveOwnerFilter();
    }, 450);
  }

  function ensureMounted() {
    if (!document.body.contains(fab)) document.body.append(fab);
    if (!document.body.contains(jobsButton)) document.body.append(jobsButton);
    if (!document.body.contains(ownerFilter)) document.body.append(ownerFilter);
    if (!document.body.contains(dialog)) document.body.append(dialog);
    updateVisibility();
  }

  async function openDialog() {
    ensureMounted();
    const nextLibrary = detectLibrary();
    if (nextLibrary) library = nextLibrary;
    if (library === 'shows') await loadShows();
    else if (library === 'archive') await loadAlbums();
    await applyPageContext();
    dialog.classList.add('open');
    refreshJobs();
    setTimeout(() => {
      if (library === 'shows') (showMode === 'new' ? showTitle : seasonNumber).focus();
      else if (library === 'archive') (archiveMode === 'newAlbum' ? archiveTitle : existingAlbum).focus();
      else title.focus();
    }, 50);
  }

  function closeDialog() {
    dialog.classList.remove('open');
    error.textContent = '';
  }

  function statusText(job) {
    if (job.status === 'complete') return 'готово';
    if (job.status === 'error') return job.error || 'ошибка';
    if (job.status === 'uploading') return 'отправляется на сервер';
    if (job.status === 'finalizing') return 'добавляется в Jellyfin';
    if (job.status === 'active' || job.status === 'downloading') return 'загружается';
    if (job.status === 'waiting' || job.status === 'queued') return 'в очереди';
    return job.status || 'обработка';
  }

  function jsonError(response, fallback) {
    return response.json().catch(() => ({})).then((body) => {
      throw new Error(body.error || fallback);
    });
  }

  async function loadShows() {
    if (knownShows.length) return;
    try {
      const response = await fetch(`${api}/shows`, { credentials: 'same-origin' });
      const data = await response.json();
      knownShows = data.shows || [];
      existingShow.replaceChildren(...knownShows.map((name) => new Option(name, name)));
      const current = currentShowTitle();
      if (current) {
        if (!knownShows.includes(current)) existingShow.prepend(new Option(current, current));
        existingShow.value = current;
      }
    } catch {}
  }

  async function loadAlbums() {
    if (knownAlbums.length) return;
    try {
      const response = await fetch(`${api}/archive/albums`, { credentials: 'same-origin' });
      const data = await response.json();
      knownAlbums = data.albums || [];
      existingAlbum.replaceChildren(...knownAlbums.map((name) => new Option(name, name)));
      const current = currentShowTitle();
      if (current && !['Семейный Архив', 'Семейный архив'].includes(current)) {
        if (!knownAlbums.includes(current)) existingAlbum.prepend(new Option(current, current));
        existingAlbum.value = current;
      }
    } catch {}
  }

  function setExistingAlbumValue(value) {
    const name = String(value || '').trim();
    if (!name) return;
    if (![...existingAlbum.options].some((option) => option.value === name)) {
      existingAlbum.prepend(new Option(name, name));
    }
    existingAlbum.value = name;
  }

  async function refreshShowMetadata() {
    error.textContent = 'Запускаю обновление обложек сериалов...';
    try {
      const response = await fetch(`${api}/shows/refresh-metadata`, { method: 'POST', credentials: 'same-origin' });
      if (!response.ok) return jsonError(response, 'Не удалось запустить обновление обложек.');
      const data = await response.json();
      error.textContent = data.message || 'Обновление обложек запущено.';
    } catch (err) {
      error.textContent = err.message || String(err);
    }
  }

  function appendTargetFields(body, itemTitle = '') {
    body.set('library', library);
    if (library === 'shows') {
      body.set('showMode', showMode);
      body.set('showTitle', showMode === 'new' ? showTitle.value.trim() : existingShow.value.trim());
      body.set('seasonNumber', seasonNumber.value || '1');
      body.set('title', showMode === 'new' ? showTitle.value.trim() : existingShow.value.trim());
      body.set('itemTitle', itemTitle || episodeTitle.value.trim());
    } else if (library === 'archive') {
      body.set('archiveMode', archiveMode);
      body.set('albumTitle', archiveMode === 'newAlbum' ? archiveTitle.value.trim() : existingAlbum.value.trim());
      body.set('folderTitle', '');
      body.set('archiveOwner', archiveOwner.value.trim());
      body.set('title', archiveMode === 'newAlbum' ? archiveTitle.value.trim() : existingAlbum.value.trim());
    } else {
      body.set('title', title.value.trim());
    }
  }

  function localUploadJob(titleText, uploadFile) {
    const id = `local-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const job = {
      id,
      title: titleText,
      status: 'uploading',
      progress: 0,
      canCancel: true,
      xhr: new XMLHttpRequest(),
    };
    const body = new FormData();
    appendTargetFields(body, titleFromFilename(uploadFile.name));
    body.set('file', uploadFile);
    job.xhr.upload.onprogress = (event) => {
      if (!event.lengthComputable) return;
      job.progress = Math.max(1, Math.min(99, Math.round((event.loaded / event.total) * 100)));
      refreshJobs();
    };
    job.xhr.onload = async () => {
      if (job.xhr.status < 200 || job.xhr.status >= 300) {
        let message = 'Не удалось загрузить файл.';
        try {
          message = JSON.parse(job.xhr.responseText || '{}').error || message;
        } catch {}
        localUploads.delete(id);
        refreshJobs();
        alert(message);
        return;
      }
      job.progress = 100;
      job.status = 'complete';
      localUploads.delete(id);
      await refreshJobs();
    };
    job.xhr.onerror = () => {
      localUploads.delete(id);
      refreshJobs();
      alert('Не удалось отправить файл на сервер.');
    };
    job.xhr.onabort = () => {
      localUploads.delete(id);
      refreshJobs();
    };
    localUploads.set(id, job);
    job.xhr.open('POST', `${api}/upload`);
    job.xhr.withCredentials = true;
    job.xhr.send(body);
    refreshJobs();
    return job;
  }

  function localFolderUploadJob(titleText, files) {
    const id = `local-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const job = {
      id,
      title: titleText,
      status: 'uploading',
      progress: 0,
      canCancel: true,
      xhr: new XMLHttpRequest(),
    };
    const body = new FormData();
    appendTargetFields(body);
    for (const picked of files) body.append('files', picked, picked.webkitRelativePath || picked.name);
    job.xhr.upload.onprogress = (event) => {
      if (!event.lengthComputable) return;
      job.progress = Math.max(1, Math.min(99, Math.round((event.loaded / event.total) * 100)));
      refreshJobs();
    };
    job.xhr.onload = async () => {
      localUploads.delete(id);
      if (job.xhr.status < 200 || job.xhr.status >= 300) {
        let message = 'Не удалось загрузить папку.';
        try {
          message = JSON.parse(job.xhr.responseText || '{}').error || message;
        } catch {}
        refreshJobs();
        alert(message);
        return;
      }
      job.progress = 100;
      job.status = 'complete';
      await refreshJobs();
    };
    job.xhr.onerror = () => {
      localUploads.delete(id);
      refreshJobs();
      alert('Не удалось отправить папку на сервер.');
    };
    job.xhr.onabort = () => {
      localUploads.delete(id);
      refreshJobs();
    };
    localUploads.set(id, job);
    job.xhr.open('POST', `${api}/upload-folder`);
    job.xhr.withCredentials = true;
    job.xhr.send(body);
    refreshJobs();
    return job;
  }

  function localArchiveFilesJob(titleText, files) {
    const id = `local-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const job = {
      id,
      title: titleText,
      status: 'uploading',
      progress: 0,
      canCancel: true,
      xhr: new XMLHttpRequest(),
    };
    const body = new FormData();
    appendTargetFields(body);
    for (const picked of files) body.append('files', picked, picked.name);
    job.xhr.upload.onprogress = (event) => {
      if (!event.lengthComputable) return;
      job.progress = Math.max(1, Math.min(99, Math.round((event.loaded / event.total) * 100)));
      refreshJobs();
    };
    job.xhr.onload = async () => {
      localUploads.delete(id);
      if (job.xhr.status < 200 || job.xhr.status >= 300) {
        let message = 'Не удалось загрузить файлы.';
        try {
          message = JSON.parse(job.xhr.responseText || '{}').error || message;
        } catch {}
        refreshJobs();
        alert(message);
        return;
      }
      job.progress = 100;
      job.status = 'complete';
      await refreshJobs();
    };
    job.xhr.onerror = () => {
      localUploads.delete(id);
      refreshJobs();
      alert('Не удалось отправить файлы на сервер.');
    };
    job.xhr.onabort = () => {
      localUploads.delete(id);
      refreshJobs();
    };
    localUploads.set(id, job);
    job.xhr.open('POST', `${api}/archive-files`);
    job.xhr.withCredentials = true;
    job.xhr.send(body);
    refreshJobs();
    return job;
  }

  async function refreshJobs() {
    if (refreshInFlight) return;
    refreshInFlight = true;
    try {
      const response = await fetch(`${api}/jobs`, { credentials: 'same-origin' });
      const data = await response.json();
      const remoteJobs = (data.jobs || []).filter((job) => !['complete', 'error', 'canceled', 'removed'].includes(job.status));
      const jobs = [...localUploads.values(), ...remoteJobs];
      activeJobs = jobs.length;
      jobsButton.textContent = activeJobs ? `Мои загрузки: ${activeJobs}` : 'Мои загрузки';
      jobsList.replaceChildren(...jobs.slice(0, 8).map((job) => {
        const bar = el('span');
        bar.style.width = `${job.progress || 0}%`;
        const cancel = el('button', { class: 'family-add-cancel', type: 'button', title: 'Отменить загрузку', text: '×' });
        cancel.onclick = async () => {
          cancel.disabled = true;
          if (job.xhr) job.xhr.abort();
          else await fetch(`${api}/jobs/${encodeURIComponent(job.id)}`, { method: 'DELETE', credentials: 'same-origin' });
          await refreshJobs();
        };
        const headChildren = [el('div', { class: 'family-add-job-title', text: job.title })];
        if (job.canCancel) headChildren.push(cancel);
        return el('div', { class: 'family-add-job' }, [
          el('div', { class: 'family-add-job-head' }, headChildren),
          el('div', { class: 'family-add-bar' }, [bar]),
          el('div', { class: 'family-add-row' }, [el('span', { text: statusText(job) }), el('span', { text: `${job.progress || 0}%` })])
        ]);
      }));
      updateVisibility();
    } catch {
    } finally {
      refreshInFlight = false;
    }
  }

  form.onsubmit = async (event) => {
    event.preventDefault();
    if (busy) return;
    busy = true;
    submitButton.disabled = true;
    submitButton.textContent = mode === 'torrent' ? 'Добавляю торрент...' : 'Загружаю...';
    error.textContent = '';
    try {
      // Do not call applyPageContext() here.
      // It can reset user's selected archive mode from "existing album" back to "new album".
      const baseTitle = library === 'shows'
        ? (showMode === 'new' ? showTitle.value.trim() : existingShow.value.trim())
        : library === 'archive'
          ? (archiveMode === 'newAlbum' ? archiveTitle.value.trim() : existingAlbum.value.trim())
          : title.value.trim();
      if (!baseTitle) {
        if (library === 'shows') throw new Error('Введите название сериала.');
        if (library === 'archive') throw new Error('Введите название альбома.');
        if (library === 'hiking') throw new Error('Введите название походного фильма.');
        throw new Error('Введите название фильма.');
      }
      if (library === 'archive' && !archiveOwner.value.trim()) throw new Error('Укажите, чьи это фото.');
      if (library === 'archive') {
        const folderFiles = Array.from(folder.files || []);
        const pickedFiles = Array.from(archiveFiles.files || []);
        if (folderFiles.length && pickedFiles.length) throw new Error('Выберите либо файлы, либо папку — не оба варианта сразу.');
        if (folderFiles.length) {
          localFolderUploadJob(baseTitle, folderFiles);
        } else if (pickedFiles.length) {
          localArchiveFilesJob(baseTitle, pickedFiles);
        } else {
          throw new Error('Выберите фотографии, видео или папку.');
        }
        resetAddForm();
        closeDialog();
        return;
      }
      if (mode === 'folder') {
        const files = Array.from(folder.files || []);
        if (!files.length) throw new Error('Выберите папку.');
        localFolderUploadJob(baseTitle, files);
        resetAddForm();
        closeDialog();
      } else if (mode === 'file') {
        if (library === 'archive') {
          const files = Array.from(archiveFiles.files || []);
          if (!files.length) throw new Error('Выберите фотографии или видео.');
          localArchiveFilesJob(baseTitle, files);
        } else {
          if (!file.files[0]) throw new Error('Выберите видеофайл.');
          fillTitleFromFile(file);
          localUploadJob(baseTitle, file.files[0]);
        }
        resetAddForm();
        closeDialog();
      } else {
        fillTitleFromFile(torrentFile);
        if (torrentFile.files[0]) {
          const body = new FormData();
          appendTargetFields(body);
          body.set('torrent', torrentFile.files[0]);
          await fetch(`${api}/torrent`, { method: 'POST', body, credentials: 'same-origin' }).then(async (response) => {
            if (!response.ok) return jsonError(response, 'Не удалось добавить torrent.');
          });
        } else {
          if (!url.value.trim()) throw new Error('Вставьте magnet-ссылку или выберите .torrent файл.');
          if (!url.value.trim().startsWith('magnet:?')) throw new Error('Нужна magnet-ссылка. Если у вас HTTP-ссылка на torrent, скачайте .torrent файл и прикрепите его.');
          await fetch(`${api}/jobs`, {
            method: 'POST',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              library,
              showMode,
              showTitle: showMode === 'new' ? showTitle.value.trim() : existingShow.value.trim(),
              seasonNumber: seasonNumber.value || '1',
              itemTitle: episodeTitle.value.trim(),
              title: library === 'shows' ? baseTitle : title.value.trim(),
              archiveMode,
              albumTitle: archiveMode === 'newAlbum' ? archiveTitle.value.trim() : existingAlbum.value.trim(),
              folderTitle: '',
              archiveOwner: archiveOwner.value.trim(),
              url: url.value.trim(),
            }),
          }).then(async (response) => {
            if (!response.ok) return jsonError(response, 'Не удалось добавить загрузку.');
          });
        }
        resetAddForm();
        await refreshJobs();
        closeDialog();
      }
    } catch (err) {
      error.textContent = err.message || String(err);
    } finally {
      busy = false;
      submitButton.disabled = false;
      renderLibraryFields();
    }
  };

  title.addEventListener('input', () => { titleWasAutofilled = false; });
  showTitle.addEventListener('input', () => { titleWasAutofilled = false; });
  episodeTitle.addEventListener('input', () => { titleWasAutofilled = false; });
  archiveTitle.addEventListener('input', () => { titleWasAutofilled = false; });
  archiveFolderTitle.addEventListener('input', () => { titleWasAutofilled = false; });
  archiveOwner.addEventListener('input', () => { titleWasAutofilled = false; });
  file.addEventListener('change', () => fillTitleFromFile(file, true));
  archiveFiles.addEventListener('change', () => {
    if (library === 'archive' && archiveFiles.files?.length) folder.value = '';
  });
  folder.addEventListener('change', () => {
    if (library === 'archive' && folder.files?.length) archiveFiles.value = '';
    const first = folder.files?.[0]?.webkitRelativePath?.split('/')?.[0] || folder.files?.[0]?.name || '';
    if (library === 'shows' && showMode === 'new' && first && (!showTitle.value.trim() || titleWasAutofilled)) {
      showTitle.value = titleFromFilename(first);
      titleWasAutofilled = true;
    } else if (library === 'archive' && archiveMode === 'newAlbum' && first && (!archiveTitle.value.trim() || titleWasAutofilled)) {
      archiveTitle.value = first;
      titleWasAutofilled = true;
    }
  });
  torrentFile.addEventListener('change', () => fillTitleFromFile(torrentFile, true));

  document.addEventListener('paste', (event) => {
    const files = Array.from(event.clipboardData?.files || []);
    const text = event.clipboardData?.getData('text/plain')?.trim() || '';
    if (!dialog.classList.contains('open') && !detectLibrary()) return;
    if (files.length) {
      const picked = files[0];
      const transfer = new DataTransfer();
      for (const pickedFile of files) transfer.items.add(pickedFile);
      if (/\.torrent$/i.test(picked.name || '') || /bittorrent|x-torrent/i.test(picked.type || '')) {
        mode = 'torrent';
        renderMode();
        torrentFile.files = transfer.files;
        fillTitleFromFile(torrentFile, true);
      } else {
        mode = 'file';
        renderMode();
        if (library === 'archive') {
          archiveMode = 'albumItems';
          archiveFiles.files = transfer.files;
        } else {
          file.files = transfer.files;
          fillTitleFromFile(file, true);
        }
      }
      openDialog();
      event.preventDefault();
    } else if (text.startsWith('magnet:?')) {
      mode = 'torrent';
      renderMode();
      url.value = text;
      openDialog();
      event.preventDefault();
    }
  });

  fab.onclick = openDialog;
  jobsButton.onclick = openDialog;
  ownerSelect.onchange = () => {
    selectedArchiveOwner = ownerSelect.value;
    localStorage.setItem('familyArchiveOwnerFilter', selectedArchiveOwner);
    document.querySelectorAll('[data-family-owner-hidden="1"]').forEach((node) => {
      node.style.display = '';
      node.removeAttribute('data-family-owner-hidden');
    });
    scheduleArchiveOwnerFilter();
    try {
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    } catch {}
  };
  close.onclick = closeDialog;
  dialog.onclick = (event) => { if (event.target === dialog) closeDialog(); };
  installTrashRequestInterceptors();
  renderMode();
  ensureMounted();
  window.addEventListener('scroll', scheduleVisibilityUpdate, true);
  new MutationObserver(scheduleVisibilityUpdate).observe(document.body, { childList: true, subtree: true });
  setInterval(() => {
    ensureMounted();
    if (!document.hidden && (activeJobs > 0 || dialog.classList.contains('open'))) refreshJobs();
  }, 15000);
  if (selectedArchiveOwner) scheduleArchiveOwnerFilter();
  const refreshWhenIdle = () => {
    if (!document.hidden) refreshJobs();
  };
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(refreshWhenIdle, { timeout: 2500 });
  } else {
    window.setTimeout(refreshWhenIdle, 1200);
  }
})();
