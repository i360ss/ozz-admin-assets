import { SetState, GetState } from '../utils/State';

export default () => {
  const
  appBody = document.querySelector('body.ozz-cms'),
  changeTrigger = document.getElementById('ozz-color-theme-switcher');

  changeTrigger.addEventListener('change', (e) => {
    SetState('theme', e.target.checked ? 'dark' : 'light');
    appBody.setAttribute('data-theme', GetState('theme'));

    // Update OzzWyg editors theme
    document.querySelectorAll('[data-ozz-wyg')?.forEach(editor => {
      editor.setAttribute('data-theme', GetState('theme'));
    });
  });

  appBody.setAttribute('data-theme', GetState('theme'));
  if (GetState('theme') == 'dark') {
    changeTrigger.checked = true;
  }

  const editors = [
    ...document.querySelectorAll('[data-ozz-wyg]'),
    ...[...document.querySelectorAll('template')].flatMap(template =>
      [...template.content.querySelectorAll('[data-ozz-wyg]')]
    )
  ];

  editors?.forEach(editor => {
    editor.setAttribute('data-theme', GetState('theme'));
  });
}
