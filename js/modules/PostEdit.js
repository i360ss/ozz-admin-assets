import FormHandler from "./FormHandler";

export default (e) => {
    const forms = document.querySelectorAll('form.ozz-fm');
    if (forms.length === 0) return;

    forms.forEach(form => {
        form.addEventListener('submit', FormHandler);
    });
}