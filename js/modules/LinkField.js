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
      linkPost.closest('.ozz-fm__field').classList.remove('hide');
      linkPost.closest('.ozz-fm__field').classList.add('show');
      linkTitle.closest('.ozz-fm__field').classList.remove('show');
      linkTitle.closest('.ozz-fm__field').classList.add('hide');
      linkUrl.closest('.ozz-fm__field').classList.remove('show');
      linkUrl.closest('.ozz-fm__field').classList.add('hide');
    } else {
      linkPost.closest('.ozz-fm__field').classList.remove('show');
      linkPost.closest('.ozz-fm__field').classList.add('hide');
      linkTitle.closest('.ozz-fm__field').classList.remove('hide');
      linkTitle.closest('.ozz-fm__field').classList.add('show');
      linkUrl.closest('.ozz-fm__field').classList.remove('hide');
      linkUrl.closest('.ozz-fm__field').classList.add('show');
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