// Ozz form
import './ozz-form';

// Modules
import OzzWyg from './vendor/ozz-wyg';
import NavBar from './modules/NavBar';
import GlobalSearch from './modules/GlobalSearch';
import AlertBar from './modules/AlertBar';
import PostTabs from './modules/PostTabs';
import BlockEditor from './modules/BlockEditor';
import MediaManager from './modules/MediaManager';
import MediaManagerPopup from './modules/MediaManagerPopup';
import MultiSelector from './modules/MultiSelector';
import ChangeTheme from './modules/ChangeTheme';
import SlugUpdate from './modules/SlugUpdate';
import RelocatePostInfoComp from './modules/RelocatePostInfoComp';
import InitOzzWyg from './modules/InitOzzWyg';
import LinkField from './modules/LinkField';
import Taxonomy from './modules/Taxonomy';
import Forms from './modules/Forms';
import UpdateHandler from './modules/UpdateHandler';
import FormHandler from "./modules/FormHandler";
import { initPopups } from './utils/Popup';

(() => {
  // Ozz CMS Modules
  NavBar();
  GlobalSearch();
  AlertBar();
  PostTabs();
  BlockEditor();
  MediaManager();
  MediaManagerPopup();
  MultiSelector();
  ChangeTheme();
  SlugUpdate();
  RelocatePostInfoComp();
  InitOzzWyg();
  Taxonomy();
  Forms();
  LinkField();
  UpdateHandler();
  FormHandler();
  initPopups();

  // Initi once repeater item added
  document.addEventListener('ozzRepeater:add', (e) => {
    MediaManagerPopup();
    LinkField();

    const editors = [
      ...e.detail.item.querySelectorAll('[data-ozz-wyg]'),
      ...[...e.detail.item.querySelectorAll('template')].flatMap(template =>
        [...template.content.querySelectorAll('[data-ozz-wyg]')]
      )
    ];
    
    console.log(editors);
    
    if (editors.length) {
      editors.forEach(editor => {
        console.log(editor);
        
        editor.setAttribute('data-value', '');
        new OzzWyg({ selector: editor });
      });
    }
  });
})();
