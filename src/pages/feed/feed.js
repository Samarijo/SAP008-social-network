import {
  auth,
  logout,
} from '../../lib/auth.js';

import {
  createPost,
  printPosts,
} from '../../lib/firestore.js';

import { redirect } from '../../redirect.js';
import { validatePost } from '../../validations.js';

const sectionCreatePost = document.createElement('section');

const timeline = (arrPosts) => {
  const feedPostContainer = sectionCreatePost.querySelector('.feed');
  const postsTemplate = arrPosts.map((post) => `
  <div class="template-post">
  <div class="post-author">
    <span>${auth.currentUser.displayName}</span>
  </div>
  <article class="post-text">
     ${post.tip}
  </article>
  <div class="btn-actions">
    <button class="post-button like">🖤</button>
    <button class="post-button delete">🗑️</button>
  </div>
  </div>
  `).join('');
  feedPostContainer.innerHTML = postsTemplate;
};

export const mainFeed = async () => {
  sectionCreatePost.setAttribute('id', 'feed');
  sectionCreatePost.innerHTML = `
    <p>Olá, ${auth.currentUser.displayName}!
    <label class="feed-post" for="feed-post">Publique aqui:</label>
    <textarea class="input-post"></textarea>
    <p class="msg-error"></p>
    <button class="btn-post" type="button">Publicar</button>
    <a href="#login">
    <button class="btn-return" type="button">Sair</button>
  </a>
    <section class="feed"></section>    
  `;

  const btnPost = sectionCreatePost.querySelector('.btn-post');
  const inputPost = sectionCreatePost.querySelector('.input-post');
  const fillField = sectionCreatePost.querySelector('.msg-error');

  btnPost.addEventListener('click', async () => {
    const validation = validatePost(inputPost.value);
    if (validation === '') {
      createPost(inputPost.value)
        .then(async () => {
          inputPost.value = '';
          sectionCreatePost.style.display = 'none';
          const posts = await printPosts();
          timeline(posts);
        });
    } else {
      fillField.innerHTML = validation;
    }
  });

  /* btnPost.addEventListener('click', async () => {
    await createPost(inputPost.value);
  }); */

  const btnLogout = sectionCreatePost.querySelector('.btn-return');

  btnLogout.addEventListener('click', () => {
    logout()
      .then(() => {
        redirect('#login');
      });
  });

  const posts = await printPosts();
  timeline(posts);
  return sectionCreatePost;
};
