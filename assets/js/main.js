(() => {
  const caseSets = {
    'human-cases': {
      folder: 'ref/case/01_human_annotation',
      models: [
        { key: 'ltx2', label: 'LTX-2' },
        { key: 'omninft', label: 'OmniNFT' },
        { key: 'ours_step876', label: 'AVC-Reward · step 876' }
      ],
      cases: [
        { key: 'avgenbench_0010', description: 'A takeout box is revealed before the scene cuts to a title card.' },
        { key: 'avgenbench_0195', description: 'A magnet is dropped through a copper tube during an electromagnetism demonstration.' },
        { key: 'avphysbench_0135', description: 'A person claps, but the sound arrives before their hands meet.' },
        { key: 'avphysbench_0203', description: 'A person blows across two bottles, producing a low tone and then a higher one.' },
        { key: 'vabench_0666', description: 'A cook rapidly chops and seasons ingredients in a busy kitchen scene.' },
        { key: 'vabench_0769', description: 'A dreamlike sequence jumps between scenes and changing events.' }
      ]
    },
    'generation-cases': {
      folder: 'ref/case/02_review_selected',
      models: [
        { key: 'ltx2', label: 'LTX-2' },
        { key: 'omninft', label: 'OmniNFT' },
        { key: 'ours_step876', label: 'AVC-Reward · step 876' }
      ],
      cases: [
        { key: 'avgenbench_0047', description: 'A close-up ASMR scene follows a makeup brush moving gently around a silicone ear.' },
        { key: 'avgenbench_0057', description: 'A microphone windscreen is scratched in a slow, circular motion.' },
        { key: 'avphysbench_0123', description: 'A person faces the camera and counts from one to ten.' },
        { key: 'avphysbench_0130', description: 'A cat opens its mouth to vocalize, but produces a dog bark.' },
        { key: 'avphysbench_0271', description: 'Water is poured into a clear vessel as its level rises.' },
        { key: 'avphysbench_0289', description: 'A stadium crowd scene cuts to a quieter view outside the venue.' }
      ]
    },
    'additional-cases': {
      folder: 'ref/case/03_gen_added',
      models: [
        { key: 'ltx2', label: 'LTX-2' },
        { key: 'omninft', label: 'OmniNFT' },
        { key: 'omninft_step876', label: 'Ours · OmniNFT step 876' }
      ],
      cases: [
        { key: 'gen_added_P10', description: 'A carpenter drives one nail into a plank with two hammer strikes.', prompt: true },
        { key: 'gen_added_P21', description: 'A resident turns toward the front door after the doorbell rings.', prompt: true },
        { key: 'gen_added_P34', description: 'Diners speak while a server sets down a plate; the server reacts to a kitchen bell.', prompt: true },
        { key: 'gen_added_P43', description: 'A person slices bread as a toaster pops and a kettle begins to whistle.', prompt: true },
        { key: 'gen_added_P45', description: 'A groomer dries a dog, which reacts when another dog barks nearby.', prompt: true },
        { key: 'gen_added_P48', description: 'An artist shapes clay on a spinning wheel and turns toward a sudden crash.', prompt: true }
      ]
    }
  };

  const createText = (tag, className, value) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    node.textContent = value;
    return node;
  };

  const makeVideoGroup = (caseSet, item) => {
    const details = document.createElement('details');
    details.className = 'media-details';
    const summary = document.createElement('summary');
    summary.textContent = 'Play 3 clips';
    details.append(summary);

    let loaded = false;
    details.addEventListener('toggle', () => {
      if (!details.open || loaded) return;
      loaded = true;
      const grid = document.createElement('div');
      grid.className = 'clip-grid';

      caseSet.models.forEach((model) => {
        const card = document.createElement('div');
        card.className = 'clip-card';
        card.append(createText('strong', '', model.label));
        const video = document.createElement('video');
        video.controls = true;
        video.preload = 'none';
        video.playsInline = true;
        video.setAttribute('aria-label', model.label + ' case video');
        const source = document.createElement('source');
        source.src = caseSet.folder + '/' + item.key + '_' + model.key + '.mp4';
        source.type = 'video/mp4';
        video.append(source);
        video.append('Your browser does not support embedded video.');
        card.append(video);
        grid.append(card);
      });
      details.append(grid);
    });
    return details;
  };

  const renderCaseTable = (targetId, caseSet) => {
    const tbody = document.getElementById(targetId);
    if (!tbody) return;

    caseSet.cases.forEach((item) => {
      const row = document.createElement('tr');
      const summaryCell = document.createElement('td');
      const summary = document.createElement('p');
      summary.className = 'case-summary';
      if (item.prompt) summary.append(createText('span', 'prompt-label', 'Prompt (abbreviated)'));
      summary.append(document.createTextNode(item.description));
      summaryCell.append(summary);

      const modelsCell = document.createElement('td');
      const modelList = document.createElement('div');
      modelList.className = 'model-list';
      caseSet.models.forEach((model) => modelList.append(createText('span', 'model-chip', model.label)));
      modelsCell.append(modelList);

      const mediaCell = document.createElement('td');
      mediaCell.append(makeVideoGroup(caseSet, item));
      row.append(summaryCell, modelsCell, mediaCell);
      tbody.append(row);
    });
  };

  Object.entries(caseSets).forEach(([targetId, caseSet]) => renderCaseTable(targetId, caseSet));

  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('#site-nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());

  document.querySelectorAll('[data-copy-target]').forEach((button) => {
    button.addEventListener('click', async () => {
      const target = document.getElementById(button.dataset.copyTarget);
      if (!target) return;
      const originalText = button.textContent;
      try {
        await navigator.clipboard.writeText(target.innerText);
        button.textContent = 'Copied';
      } catch (_) {
        button.textContent = 'Select and copy';
      }
      window.setTimeout(() => { button.textContent = originalText; }, 1600);
    });
  });
})();
