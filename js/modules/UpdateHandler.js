import { send } from "../utils/Fetch";

export default () => {
  const form = document.querySelector('form[name=ozzUpdateForm]');
  if (!form) return;

  const notifyDOM = document.querySelector('.ozz-update-notification');
  const button = form.querySelector('input[type="submit"]');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    button.disabled = true;
    button.value = 'Updating framework...';

    const getResult = send(form.action, 'POST');
    getResult.then(response => {
      notifyDOM.classList.remove('info');
      if (response.success) {
        notifyDOM.textContent = 'Framework updated successfully ✓';
        notifyDOM.classList.add('success');
      } else {
        notifyDOM.textContent = response.message || 'Update failed';
        notifyDOM.classList.add('danger');
      }
    });
  });
};