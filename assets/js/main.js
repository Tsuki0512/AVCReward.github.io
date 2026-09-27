(() => {
  const rewardCases = [
    {
      scene: 'Live jazz band on stage', video: '1817_1.mp4',
      scores: ['1.00', '1.00', '1.00'], overall: '1.00', human: '1.00',
      conclusion: '...the audio-video consistency is exceptionally high across all dimensions. The content is perfectly coherent, synchronized, and semantically aligned ...'
    },
    {
      scene: 'Choir with a conductor', video: '575_1.mp4',
      scores: ['1.00', '0.90', '0.90'], overall: '0.93', human: '0.93',
      conclusion: '... represents a standard concert recording where the audio track is a direct recording of the visual performance....'
    },
    {
      scene: 'Puppet speaking in a factory scene', video: '684_4.mp4',
      scores: ['1.00', '1.00', '0.90'], overall: '0.97', human: '0.93',
      conclusion: '...the ambient background music and drone. This is a common convention in film and animation and does not significantly detract from the overall coherence ...'
    },
    {
      scene: 'Two people on screen, one clear speech track', video: '1175_3.mp4',
      scores: ['0.40', '0.40', '0.40'], overall: '0.40', human: '0.48',
      conclusion: '... The only point of minor connection is the presence of a feminine-like voice that matches one of the two anime characters on screen ...'
    },
    {
      scene: 'Orchestra with a dubbed soundtrack', video: '1084_4.mp4',
      scores: ['1.00', '0.70', '0.70'], overall: '0.80', human: '0.67',
      conclusion: '...The musicians are miming to a studio recording, which breaks the authentic physical connection between their actions and the sound produced. ...'
    },
    {
      scene: 'Blacksmith striking an anvil', video: '16_3.mp4',
      scores: ['1.00', '0.40', '0.40'], overall: '0.60', human: '0.50',
      conclusion: '...While the general atmosphere is cohesive, the lack of precise timing between the hammer impacts and the resulting sounds ...'
    }
  ];

  const generationCases = [
    { prompt: 'A political campaign montage moves between title cards, a sneaker stepping over chalk lettering, a candidate, and animated slogans.', key: 'avgenbench_0002' },
    { prompt: 'A close-up piano tutorial shows a hand playing and releasing an A-minor chord.', key: 'avgenbench_0163' },
    { prompt: 'A dog on one side of a room barks, then a cat on the other side answers.', key: 'avphysbench_0061' },
    { prompt: 'A person speaks beside a powerful waterfall.', key: 'avphysbench_0095' },
    { prompt: 'Water fills a clear glass pot as the requested pouring sound becomes lower in pitch.', key: 'avphysbench_0271' },
    { prompt: 'An overhead cooking tutorial shows hands slicing a tomato beside a simmering pot while a narrator gives instructions.', key: 'gen_added_P49', oursModel: 'omninft_step876' },
  ];

  const additionalCases = [
    { key: 'avgenbench_0010', prompt: 'A close-up of a branded takeout box transitions to a black title card and smiling mascot illustration.' },
    { key: 'avgenbench_0046', prompt: 'A fizzy drink is poured over ice spheres as the camera closes in on the rising bubbles and foam.' },
    { key: 'avgenbench_0079', prompt: 'A sealed flask is shaken, then the liquid cycles through visible color changes while it rests.' },
    { key: 'avgenbench_0113', prompt: 'A cockpit view follows a small plane accelerating down a runway, lifting off, and retracting its landing gear.' },
    { key: 'avgenbench_0152', prompt: 'A close-up follows fingers moving rapidly over the keys of a saxophone.' },
    { key: 'avgenbench_0195', prompt: 'A magnet descends slowly through a vertical copper tube in a physics classroom demonstration.' },
    { key: 'avphysbench_0161', prompt: 'A mallet moves along a xylophone from longer bars to shorter bars.' },
    { key: 'avphysbench_0195', prompt: 'A ping-pong ball bounces first on a wooden table, then on carpet.' },
    { key: 'avphysbench_0308', prompt: 'A person leaves a busy street and enters a building lobby through a heavy door.' },
    { key: 'vabench_0268', prompt: 'A reader turns the final page of a book and closes it with a satisfied smile.' },
    { key: 'vabench_0315', prompt: 'A bride repeatedly tries on her veil and smiles nervously at the mirror.' },
    { key: 'vabench_0380', prompt: 'A first-person subway scene follows someone using over-ear headphones to reduce the surrounding rumble.' },
    { key: 'vabench_0454', prompt: 'Water is poured into a glass as the pitch of taps on its side rises with the water level.' },
    { key: 'vabench_0666', prompt: 'A chef chops and seasons ingredients at the lower edge of the frame while preparing a hot dish.' },
    { key: 'vabench_0537', prompt: 'A surreal time bank shows golden liquid flowing through glass tubes.', folder: 'ref/case/02_gen' }
  ];

  const createText = (tag, className, value) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    node.textContent = value;
    return node;
  };

  const createVideo = (src, label) => {
    const video = document.createElement('video');
    video.controls = true;
    video.preload = 'none';
    video.playsInline = true;
    video.setAttribute('aria-label', label);
    const source = document.createElement('source');
    source.src = src;
    source.type = 'video/mp4';
    video.append(source);
    video.append('Your browser does not support embedded video.');
    return video;
  };

  const renderRewardCases = () => {
    const tbody = document.getElementById('reward-cases');
    if (!tbody) return;
    rewardCases.forEach((item) => {
      const row = document.createElement('tr');
      const caseCell = document.createElement('td');
      caseCell.className = 'reward-case-cell';
      caseCell.append(createText('strong', 'case-scene', item.scene));
      caseCell.append(createVideo('ref/case/01_rewardmodel/videos/' + item.video, item.scene + ' audio-video clip'));
      const scoreCells = item.scores.map((score, index) => {
        const label = ['Macro-semantic alignment', 'Temporal synchronization', 'Fine-grained event correspondence'][index];
        const cell = createText('td', 'score-cell', score);
        cell.setAttribute('aria-label', label + ': ' + score);
        return cell;
      });
      const conclusionCell = document.createElement('td');
      conclusionCell.className = 'conclusion-cell';
      conclusionCell.append(createText('strong', 'overall-score', 'AVC-Reward ' + item.overall));
      conclusionCell.append(createText('span', 'human-score', 'Human avg ' + item.human));
      conclusionCell.append(createText('p', 'conclusion-excerpt', 'Conclusion: "' + item.conclusion + '"'));
      row.append(caseCell, ...scoreCells, conclusionCell);
      tbody.append(row);
    });
  };

  const renderVideoCases = (tbodyId, cases, folder) => {
    const tbody = document.getElementById(tbodyId);
    if (!tbody) return;
    cases.forEach((item) => {
      const row = document.createElement('tr');
      const prompt = createText('td', 'prompt-cell', item.prompt);
      row.append(prompt);
      ['ltx2', 'omninft', item.oursModel || 'ours_step876'].forEach((model, index) => {
        const cell = document.createElement('td');
        cell.className = 'video-cell';
        const label = index === 2 ? 'Ours' : model === 'ltx2' ? 'LTX-2' : 'OmniNFT';
        cell.append(createVideo((item.folder || folder) + '/' + item.key + '_' + model + '.mp4', label + ' audio-video clip'));
        row.append(cell);
      });
      tbody.append(row);
    });
  };

  renderRewardCases();
  renderVideoCases('generation-cases', generationCases, 'ref/case/02_gen');
  renderVideoCases('additional-cases', additionalCases, 'ref/adding_case');

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
})();
