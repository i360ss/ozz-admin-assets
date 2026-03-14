import { send } from "../utils/Fetch";

export default () => {
  const form = document.querySelector('form[name=ozzUpdateForm]');
  if (!form) return;

  const notifyDOM = document.querySelector('.ozz-update-notification');
  const button = form.querySelector('input[type="submit"]');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    button.setAttribute('disabled', true);
    notifyDOM.querySelector('.content').innerHTML = '<span class="loader-text"><span class="loader"></span> Updating...</span>';

    const getResult = send(form.action, 'POST');
    getResult.then(response => {
      notifyDOM.classList.remove('info');
      if (response.success) {
        notifyDOM.innerHTML = response.message || 'Update failed';
        notifyDOM.classList.add('success');
      } else {
        notifyDOM.innerHTML = response.message || 'Update failed';
        notifyDOM.classList.add('danger');
      }
    });
  });
};