export default FormHandler = () => {
  const forms = document.querySelectorAll('form.ozz-fm');
  if (forms.length === 0) return;

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const thisForm = e.target;

    // Store OzzWyg data in a hidden field
    const ozzWygEditors = thisForm.querySelectorAll('[data-ozz-wyg]');

    if (ozzWygEditors.length > 0) {
      ozzWygEditors.forEach(wygEditor => {
        const name = wygEditor.getAttribute('data-field-name');
        const editorArea = wygEditor.querySelector('[data-editor-area]');
        if (!name || !editorArea) return; 

        const value = editorArea.innerHTML;
        let hiddenField = thisForm.querySelector(`input[type="hidden"][name="${name}"]`);

        // Create or update the hidden field
        if (!hiddenField) {
          hiddenField = document.createElement('input');
          hiddenField.type = 'hidden';
          hiddenField.name = name;
          thisForm.appendChild(hiddenField);
        }

        hiddenField.value = value;
      });
    }

    HTMLFormElement.prototype.submit.call(thisForm);
  };

  // Bind submit event
  forms.forEach(form => {
    form.addEventListener('submit', handleSubmit);
  });
}