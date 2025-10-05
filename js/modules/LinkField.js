export default () => {
  const linkFields = document.querySelectorAll('[data-ozz-link-field]');
  if (!linkFields) return;

  const setLinkFieldTypes = (field) => {
    const linkType = field.querySelector('[data-link-type]'),
      linkPost = field.querySelector('[data-link-post]'),
      linkTitle = field.querySelector('[data-link-title]'),
      linkUrl = field.querySelector('[data-link-url]'),
      linkTarget = field.querySelector('[data-link-target]'),
      linkRel = field.querySelector('[data-link-rel]'),
      linkAria = field.querySelector('[data-link-aria]'),
      linkClass = field.querySelector('[data-link-class]'),
      actualJSONField = field.querySelector('[data-link-actual-value-json]');

    const realValues = {
      'type': linkType.value,
      'post_id': linkPost.value,
      'title': linkTitle.value,
      'url': linkUrl.value,
      'target': linkTarget.value,
      'rel': linkRel.value,
      'aria_label': linkAria.value,
      'class': linkClass.value
    };

    if (linkType.value === 'internal') {
      linkPost.closest('.sub-field-wrapper').classList.remove('hide');
      linkPost.closest('.sub-field-wrapper').classList.add('show');
      linkTitle.closest('.sub-field-wrapper').classList.remove('show');
      linkTitle.closest('.sub-field-wrapper').classList.add('hide');
      linkUrl.closest('.sub-field-wrapper').classList.remove('show');
      linkUrl.closest('.sub-field-wrapper').classList.add('hide');
    } else {
      linkPost.closest('.sub-field-wrapper').classList.remove('show');
      linkPost.closest('.sub-field-wrapper').classList.add('hide');
      linkTitle.closest('.sub-field-wrapper').classList.remove('hide');
      linkTitle.closest('.sub-field-wrapper').classList.add('show');
      linkUrl.closest('.sub-field-wrapper').classList.remove('hide');
      linkUrl.closest('.sub-field-wrapper').classList.add('show');
    }

    actualJSONField.value = JSON.stringify(realValues);
  };

  linkFields.forEach(field => {
    field.addEventListener('load', setLinkFieldTypes(field));
    field.addEventListener('input', (e) => {
      e.preventDefault();
      setLinkFieldTypes(field);
    });
  });
}